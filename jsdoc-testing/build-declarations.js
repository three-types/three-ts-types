import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import * as url from 'node:url';

import ts from 'typescript6';

// Functions whose `this.x = ...` assignments must not be inferred as members by
// declaration emit (e.g. Material#fromJSON assigns derived-class-only
// properties, and the assignments in LoadingManager#abort and Cache.clear make
// declaration emit fail with TS9005). Before running tsc, these are rewritten so
// the assignments go through an `any`-cast alias, which suppresses
// expando-property inference.
//
// A target is either:
// - { className, methodName }: a class method.
// - { className, constructorProperty }: a `this.name = function () {}` assignment in a class constructor.
// - { objectName, propertyName }: a function-valued property of an object literal assigned to a variable.
const targets = [
    { file: 'src/loaders/Cache.js', objectName: 'Cache', propertyName: 'clear' },
    { file: 'src/loaders/LoadingManager.js', className: 'LoadingManager', constructorProperty: 'abort' },
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

function describeTarget(target) {
    if (target.objectName !== undefined) return `${target.objectName}.${target.propertyName}`;
    return `${target.className}#${target.methodName ?? target.constructorProperty}`;
}

function isFunctionLike(node) {
    return node !== undefined && (ts.isFunctionExpression(node) || ts.isMethodDeclaration(node));
}

function findConstructorProperty(constructor, propertyName) {
    let found;
    const visit = node => {
        if (
            ts.isBinaryExpression(node)
            && node.operatorToken.kind === ts.SyntaxKind.EqualsToken
            && ts.isPropertyAccessExpression(node.left)
            && node.left.expression.kind === ts.SyntaxKind.ThisKeyword
            && node.left.name.text === propertyName
            && ts.isFunctionExpression(node.right)
        ) {
            found = node.right;
            return;
        }
        ts.forEachChild(node, visit);
    };
    if (constructor.body !== undefined) visit(constructor.body);
    return found;
}

function findFunction(sourceFile, target) {
    let fn;
    const visit = node => {
        if (fn !== undefined) return;
        if (
            target.className !== undefined && ts.isClassDeclaration(node) && node.name !== undefined
            && node.name.text === target.className
        ) {
            for (const member of node.members) {
                if (
                    target.methodName !== undefined && ts.isMethodDeclaration(member) && ts.isIdentifier(member.name)
                    && member.name.text === target.methodName
                ) {
                    fn = member;
                    return;
                }
                if (target.constructorProperty !== undefined && ts.isConstructorDeclaration(member)) {
                    fn = findConstructorProperty(member, target.constructorProperty);
                    if (fn !== undefined) return;
                }
            }
        }
        if (
            target.objectName !== undefined && ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)
            && node.name.text === target.objectName && node.initializer !== undefined
            && ts.isObjectLiteralExpression(node.initializer)
        ) {
            for (const property of node.initializer.properties) {
                if (property.name === undefined || !ts.isIdentifier(property.name)) continue;
                if (property.name.text !== target.propertyName) continue;
                const candidate = ts.isPropertyAssignment(property) ? property.initializer : property;
                if (isFunctionLike(candidate)) {
                    fn = candidate;
                    return;
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    return fn;
}

function transformTarget(target) {
    const filePath = path.join(threeDir, target.file);
    const source = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);
    const name = describeTarget(target);

    const method = findFunction(sourceFile, target);
    if (method === undefined || method.body === undefined) {
        throw new Error(
            `Could not find function ${name} in ${target.file}. `
                + 'Update the targets list in build-declarations.js.',
        );
    }

    // The body span is `{ ... }`; transform only its inner text.
    const bodyStart = method.body.getStart(sourceFile) + 1;
    const bodyEnd = method.body.end - 1;
    const bodyText = source.slice(bodyStart, bodyEnd);

    if (bodyText.includes(aliasName)) {
        throw new Error(
            `${name} in ${target.file} already contains "${aliasName}".`,
        );
    }

    let replacements = 0;
    const transformedBody = bodyText.replace(/\bthis\./g, () => {
        replacements++;
        return `${aliasName}.`;
    });
    if (replacements === 0) {
        throw new Error(
            `No \`this.\` assignments found in ${name} in ${target.file}. `
                + 'The transform may no longer be needed; update the targets list in build-declarations.js.',
        );
    }

    const transformed = source.slice(0, bodyStart) + `\n\n\t\t${aliasStatement}` + transformedBody
        + source.slice(bodyEnd);
    fs.writeFileSync(filePath, transformed);
    console.log(`Transformed ${name} in ${target.file} (${replacements} replacements).`);
}

// Restore before transforming so a previously crashed run self-heals.
restoreTargets();

let exitCode;
try {
    for (const target of targets) {
        transformTarget(target);
    }

    const require = createRequire(import.meta.url);
    const tscPath = require.resolve('typescript6/lib/tsc.js');
    const result = spawnSync(process.execPath, [tscPath, '--project', path.join(dirname, 'tsconfig.jsdoc.json')], {
        stdio: 'inherit',
        cwd: dirname,
    });
    exitCode = result.status === null ? 1 : result.status;
} finally {
    restoreTargets();
}

process.exit(exitCode);
