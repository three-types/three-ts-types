import * as fs from 'node:fs';
import * as path from 'node:path';
import { argv } from 'node:process';

const files = [
    'nodes/core/constants',
    'nodes/core/Node',
    'nodes/core/NodeAttribute',
    'nodes/core/NodeKeywords',
    'nodes/core/NodeParser',
    'nodes/core/NodeVar',
    'nodes/core/NodeVarying',
    'renderers/common/ChainMap',
    'renderers/common/Color4',
    'renderers/common/Constants',
    'renderers/common/DataMap',
    'renderers/common/Info',
    'renderers/common/RenderContexts',
    'renderers/common/Textures',
];

const inDir = './examples';
const outDir = '../types/three/examples/jsm';

for (const file of files) {
    console.log(file);
    const fileContents = fs.readFileSync(path.join(inDir, `${file}.d.ts`), { encoding: 'utf-8' });
    const outFile = path.join(outDir, `${file}.d.ts`);
    if (argv[2] === 'copy') {
        fs.writeFileSync(outFile, fileContents);
    } else if (argv[2] === 'check') {
        const outFileContents = fs.readFileSync(outFile, { encoding: 'utf-8' });
        if (fileContents !== outFileContents) {
            throw new Error(`The built declaration file for ${file} differs.`);
        }
    } else {
        throw new Error('Expected program argument.');
    }
}
