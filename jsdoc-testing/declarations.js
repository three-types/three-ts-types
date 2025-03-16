import * as fs from 'node:fs';
import * as path from 'node:path';
import { argv } from 'node:process';

const files = [
    'animation/tracks/BooleanKeyframeTrack',
    'animation/tracks/ColorKeyframeTrack',
    'animation/tracks/NumberKeyframeTrack',
    'animation/tracks/QuaternionKeyframeTrack',
    'animation/tracks/StringKeyframeTrack',
    'animation/tracks/VectorKeyframeTrack',
    'animation/AnimationAction',
    'animation/AnimationClip',
    'animation/AnimationMixer',
    'animation/AnimationObjectGroup',
    'animation/KeyframeTrack',
];

const inDir = './jsdoc';
const outDir = '../types/three/src';

for (const file of files) {
    console.log(file);
    const fileContents = fs.readFileSync(path.join(inDir, `${file}.d.ts`), { encoding: 'utf-8' });
    const outFile = path.join(outDir, `${file}.d.ts`);
    if (argv[2] === 'copy') {
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
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
