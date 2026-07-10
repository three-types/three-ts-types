import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import * as url from 'node:url';

import ts from 'typescript6';

// Methods whose `this.x = ...` assignments must not be inferred as class members
// by declaration emit (e.g. Material#fromJSON assigns derived-class-only
// properties). Before running tsc, these are rewritten so the assignments go
// through an `any`-cast alias, which suppresses expando-property inference.
const targets = [
    { file: 'src/materials/Material.js', className: 'Material', methodName: 'fromJSON' },
];

const aliasName = '_this';
const aliasStatement = `const ${aliasName} = /** @type {any} */ ( this );`;

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const threeDir = path.join(dirname, '..', 'three.js');

function restoreTargets() {
    for (const target of targets) {
        const result = spawnSync('git', ['-C', threeDir, 'checkout', '--', target.file], { stdio: 'inherit' });
        if (result.status !== 0) {
            throw new Error(`Failed to restore ${target.file} in the three.js submodule.`);
        }
    }
}

function findMethod(sourceFile, className, methodName) {
    let method;
    const visit = node => {
        if (ts.isClassDeclaration(node) && node.name !== undefined && node.name.text === className) {
            for (const member of node.members) {
                if (ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) && member.name.text === methodName) {
                    method = member;
                    return;
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    return method;
}

function transformTarget(target) {
    const filePath = path.join(threeDir, target.file);
    const source = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

    const method = findMethod(sourceFile, target.className, target.methodName);
    if (method === undefined || method.body === undefined) {
        throw new Error(
            `Could not find method ${target.className}#${target.methodName} in ${target.file}. `
                + 'Update the targets list in build-declarations.js.',
        );
    }

    // The body span is `{ ... }`; transform only its inner text.
    const bodyStart = method.body.getStart(sourceFile) + 1;
    const bodyEnd = method.body.end - 1;
    const bodyText = source.slice(bodyStart, bodyEnd);

    if (bodyText.includes(aliasName)) {
        throw new Error(
            `${target.className}#${target.methodName} in ${target.file} already contains "${aliasName}".`,
        );
    }

    let replacements = 0;
    const transformedBody = bodyText.replace(/\bthis\./g, () => {
        replacements++;
        return `${aliasName}.`;
    });
    if (replacements === 0) {
        throw new Error(
            `No \`this.\` assignments found in ${target.className}#${target.methodName} in ${target.file}. `
                + 'The transform may no longer be needed; update the targets list in build-declarations.js.',
        );
    }

    const transformed = source.slice(0, bodyStart) + `\n\n\t\t${aliasStatement}` + transformedBody
        + source.slice(bodyEnd);
    fs.writeFileSync(filePath, transformed);
    console.log(`Transformed ${target.className}#${target.methodName} in ${target.file} (${replacements} replacements).`);
}

// Restore before transforming so a previously crashed run self-heals.
restoreTargets();

let exitCode;
try {
    for (const target of targets) {
        transformTarget(target);
    }

    const require = createRequire(import.meta.url);
    const tscPath = require.resolve('typescript/lib/tsc.js');
    const result = spawnSync(process.execPath, [tscPath, '--project', path.join(dirname, 'tsconfig.jsdoc.json')], {
        stdio: 'inherit',
        cwd: dirname,
    });
    exitCode = result.status === null ? 1 : result.status;
} finally {
    restoreTargets();
}

process.exit(exitCode);
