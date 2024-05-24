import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

const files = [
    'nodes/core/Node',
    'nodes/core/NodeBuilder',
    'nodes/core/NodeCache',
    'nodes/core/NodeFrame',
    'nodes/core/NodeKeywords',
    'nodes/core/NodeParser',
    'nodes/core/constants',
    'nodes/fog/FogNode',
    'nodes/lighting/EnvironmentNode',
    'nodes/lighting/LightsNode',
    'renderers/common/Renderer',
];

const inDir = '../three.js/examples/jsm';
const outDir = './examples';

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

for (const file of files) {
    console.log(file);
    const fileContents = fs.readFileSync(path.join(inDir, `${file}.js`), {
        encoding: 'utf-8',
    });
    const options = await prettier.resolveConfig(file);
    const formattedFile = await prettier.format(fileContents, { ...options, parser: 'babel' });
    const outPath = path.join(outDir, `${file}.ts`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, formattedFile);
}
