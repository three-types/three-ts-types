import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

const files = [
    'nodes/accessors/TextureNode',
    'nodes/core/constants',
    'nodes/core/InputNode',
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
    'nodes/core/UniformGroupNode',
    'nodes/core/UniformNode',
    'nodes/fog/FogNode',
    'nodes/gpgpu/ComputeNode',
    'nodes/lighting/EnvironmentNode',
    'nodes/lighting/LightsNode',
    'nodes/shadernode/ShaderNode',
    'nodes/Nodes',
    'renderers/common/nodes/NodeBuilderState',
    'renderers/common/nodes/NodeUniformsGroup',
    'renderers/common/nodes/Nodes',
    'renderers/common/Animation',
    'renderers/common/Attributes',
    'renderers/common/Backend',
    'renderers/common/Background',
    'renderers/common/Binding',
    'renderers/common/Bindings',
    'renderers/common/Buffer',
    'renderers/common/BufferUtils',
    'renderers/common/ChainMap',
    'renderers/common/ClippingContext',
    'renderers/common/Color4',
    'renderers/common/ComputePipeline',
    'renderers/common/Constants',
    'renderers/common/DataMap',
    'renderers/common/Geometries',
    'renderers/common/Info',
    'renderers/common/Pipeline',
    'renderers/common/Pipelines',
    'renderers/common/ProgrammableStage',
    'renderers/common/RenderBundle',
    'renderers/common/RenderBundles',
    'renderers/common/RenderContext',
    'renderers/common/RenderContexts',
    'renderers/common/RenderList',
    'renderers/common/RenderLists',
    'renderers/common/Renderer',
    'renderers/common/RenderObject',
    'renderers/common/RenderObjects',
    'renderers/common/RenderPipeline',
    'renderers/common/Textures',
    'renderers/common/UniformBuffer',
    'renderers/common/UniformsGroup',
    'renderers/webgl/nodes/GLSLNodeBuilder',
    'renderers/webgl/WebGLBackend',
    'renderers/webgpu/nodes/WGSLNodeBuilder',
    'renderers/webgpu/nodes/WGSLNodeFunction',
    'renderers/webgpu/nodes/WGSLNodeParser',
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
