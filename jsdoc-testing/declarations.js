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
    'animation/AnimationUtils',
    'animation/KeyframeTrack',
    'animation/PropertyBinding',
    'animation/PropertyMixer',
    'materials/nodes/Line2NodeMaterial',
    'materials/nodes/LineBasicMaterial',
    'materials/nodes/LineDashedMaterial',
    'materials/nodes/MeshBasicNodeMaterial',
    'materials/nodes/MeshLambertNodeMaterial',
    'materials/nodes/MeshMatcapNodeMaterial',
    'materials/nodes/MeshNormalNodeMaterial',
    'materials/nodes/MeshPhongNodeMaterial',
    'materials/nodes/MeshPhysicalNodeMaterial',
    'materials/nodes/MeshSSSNodeMaterial',
    'materials/nodes/MeshStandardNodeMaterial',
    'materials/nodes/MeshToonNodeMaterial',
    'materials/nodes/MeshMaterial',
    'materials/nodes/MeshMaterials',
    'materials/nodes/PointsNodeMaterial',
    'materials/nodes/ShadowNodeMaterial',
    'materials/nodes/SpriteNodeMaterial',
    'materials/nodes/VolumeNodeMaterial',
    'materials/LineBasicMaterial',
    'materials/LineDashedMaterial',
    'materials/Material',
    'materials/Materials',
    'materials/MeshBasicMaterial',
    'materials/MeshDepthMaterial',
    'materials/MeshDistanceMaterial',
    'materials/MeshLambertMaterial',
    'materials/MeshMatcapMaterial',
    'materials/MeshNormalMaterial',
    'materials/MeshPhongMaterial',
    'materials/MeshPhysicalMaterial',
    'materials/MeshStandardMaterial',
    'materials/MeshToonMaterial',
    'materials/PointsMaterial',
    'materials/RawShaderMaterial',
    'materials/ShaderMaterial',
    'materials/ShadowMaterial',
    'materials/SpriteMaterial',
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
