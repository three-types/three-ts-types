import * as fs from 'node:fs';
import * as path from 'node:path';

import prettier from 'prettier';

const files = [
    'materials/nodes/manager/NodeMaterialObserver',
    'nodes/accessors/BufferAttributeNode',
    'nodes/core/constants',
    'nodes/core/Node',
    'nodes/core/NodeAttribute',
    'nodes/core/NodeCache',
    'nodes/core/NodeParser',
    'nodes/core/NodeUniform',
    'nodes/core/NodeVar',
    'nodes/core/NodeVarying',
    'nodes/core/StructType',
    'nodes/core/StructTypeNode',
    'nodes/core/UniformNode',
    'renderers/common/nodes/NodeBuilderState',
    'renderers/common/nodes/NodeLibrary',
    'renderers/common/nodes/NodeManager',
    'renderers/common/nodes/NodeUniform',
    'renderers/common/nodes/NodeUniformsGroup',
    'renderers/common/Animation',
    'renderers/common/Attributes',
    'renderers/common/Background',
    'renderers/common/BindGroup',
    'renderers/common/Binding',
    'renderers/common/Bindings',
    'renderers/common/Buffer',
    'renderers/common/BufferUtils',
    'renderers/common/BundleGroup',
    'renderers/common/CanvasTarget',
    'renderers/common/ChainMap',
    'renderers/common/ClippingContext',
    'renderers/common/Color4',
    'renderers/common/ComputePipeline',
    'renderers/common/Constants',
    'renderers/common/CubeRenderTarget',
    'renderers/common/DataMap',
    'renderers/common/Geometries',
    'renderers/common/Info',
    'renderers/common/InspectorBase',
    'renderers/common/Pipeline',
    'renderers/common/Pipelines',
    'renderers/common/ProgrammableStage',
    'renderers/common/RenderBundle',
    'renderers/common/RenderBundles',
    'renderers/common/RenderContext',
    'renderers/common/RenderContexts',
    'renderers/common/Renderer',
    'renderers/common/RenderList',
    'renderers/common/RenderLists',
    'renderers/common/RenderObject',
    'renderers/common/RenderObjectPipeline',
    'renderers/common/RenderObjects',
    'renderers/common/Textures',
    'renderers/common/TimestampQueryPool',
    'renderers/common/Uniform',
    'renderers/common/UniformBuffer',
    'renderers/common/UniformsGroup',
    'renderers/common/XRManager',
    'renderers/common/XRRenderTarget',
    'renderers/webgpu/nodes/BasicNodeLibrary',
    'renderers/webgpu/nodes/StandardNodeLibrary',
];

const javascriptInDir = '../three.js/src';
const typesInDir = '../types/three/src';
const outDir = './src';

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

fs.cpSync(typesInDir, outDir, { recursive: true });

for (const file of files) {
    console.log(file);
    const fileContents = fs.readFileSync(path.join(javascriptInDir, `${file}.js`), {
        encoding: 'utf-8',
    });
    const options = await prettier.resolveConfig(file);
    const formattedFile = await prettier.format(fileContents, { ...options, parser: 'babel' });

    const typescriptOutPath = path.join(outDir, `${file}.ts`);
    fs.mkdirSync(path.dirname(typescriptOutPath), { recursive: true });
    fs.writeFileSync(typescriptOutPath, formattedFile);

    const declarationOutPath = path.join(outDir, `${file}.d.ts`);
    if (fs.existsSync(declarationOutPath)) {
        fs.unlinkSync(declarationOutPath);
    }
}
