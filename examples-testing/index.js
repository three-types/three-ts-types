import * as fs from 'node:fs';
import * as path from 'node:path';

import { format } from 'prettier';

const re = /<script type="module">((.|\r|\n)+)<\/script>/;

const inDir = '../../three.js/examples';
const outDir = './examples';

const files = fs.readdirSync(inDir);

let index = 0;

for (const file of files) {
    if (
        !file.endsWith('.html') ||
        file === 'index.html' ||
        file === 'webgl_multiple_elements_text.html' ||
        file.startsWith('physics_ammo')
    )
        continue;

    console.log(file);
    const fileContents = fs.readFileSync(path.join(inDir, file), {
        encoding: 'utf-8',
    });
    const results = re.exec(fileContents);
    const formattedFile = format(results[1], { parser: 'babel' });
    fs.writeFileSync(path.join(outDir, file.replace('.html', '.ts')), formattedFile);

    index++;

    if (index > 30) break;
}
