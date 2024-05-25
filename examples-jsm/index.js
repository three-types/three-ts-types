import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

const files = [
    'nodes/core/Node',
    'nodes/core/NodeAttribute',
    'nodes/core/NodeBuilder',
    'nodes/core/NodeCache',
    'nodes/core/NodeCode',
    'nodes/core/NodeFrame',
    'nodes/core/NodeKeywords',
    'nodes/core/NodeParser',
    'nodes/core/NodeUniform',
    'nodes/core/NodeUtils',
    'nodes/core/NodeVar',
    'nodes/core/NodeVarying',
    'nodes/core/constants',
    'nodes/fog/FogNode',
    'nodes/lighting/EnvironmentNode',
    'nodes/lighting/LightsNode',
    'renderers/common/nodes/NodeBuilderState',
    'renderers/common/nodes/Nodes',
    'renderers/common/Animation',
    'renderers/common/Attributes',
    'renderers/common/Backend',
    'renderers/common/Background',
    'renderers/common/Bindings',
    'renderers/common/BufferUtils',
    'renderers/common/ChainMap',
    'renderers/common/ClippingContext',
    'renderers/common/Color4',
    'renderers/common/ComputePipeline',
    'renderers/common/Constants',
    'renderers/common/DataMap',
    'renderers/common/Geometries',
    'renderers/common/Info',
    'renderers/common/Pipelines',
    'renderers/common/ProgrammableStage',
    'renderers/common/RenderBundles',
    'renderers/common/RenderContexts',
    'renderers/common/RenderLists',
    'renderers/common/Renderer',
    'renderers/common/RenderObject',
    'renderers/common/RenderObjects',
    'renderers/common/RenderPipeline',
    'renderers/common/Textures',
    'renderers/webgl/WebGLBackend',
    'renderers/webgpu/WebGPUBackend',
    'renderers/webgpu/WebGPURenderer',
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
