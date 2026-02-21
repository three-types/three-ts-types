import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

const files = ['nodes/tsl/TSLCore'];

const inDir = '../three.js/src';
const outDir = './tsl-comments';

for (const file of files) {
    console.log(file);

    const fileContents = fs.readFileSync(path.join(inDir, `${file}.js`), {
        encoding: 'utf-8',
    });
    const options = await prettier.resolveConfig(import.meta.filename);
    const formattedFile = await prettier.format(fileContents, {
        ...options,
        parser: 'babel',
    });

    const outFile = path.join(outDir, `${file}.js`);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, formattedFile);
}
