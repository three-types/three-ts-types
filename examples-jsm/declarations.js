import * as fs from 'node:fs';
import * as path from 'node:path';
import { argv } from 'node:process';

const files = [
    'nodes/core/constants',
    'nodes/core/ContextNode',
    'nodes/core/Node',
    'nodes/core/NodeAttribute',
    'nodes/core/NodeBuilder',
    'nodes/core/NodeCache',
    'nodes/core/NodeKeywords',
    'nodes/core/NodeParser',
    'nodes/core/NodeUniform',
    'nodes/core/NodeVar',
    'nodes/core/NodeVarying',
    'nodes/core/UniformNode',
    'renderers/common/nodes/NodeBuilderState',
    'renderers/common/nodes/Nodes',
    'renderers/common/nodes/NodeUniform',
    'renderers/common/nodes/NodeUniformsGroup',
    'renderers/common/Animation',
    'renderers/common/Attributes',
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
    'renderers/common/Renderer',
    'renderers/common/RenderList',
    'renderers/common/RenderLists',
    'renderers/common/RenderObject',
    'renderers/common/RenderObjects',
    'renderers/common/RenderPipeline',
    'renderers/common/Textures',
    'renderers/common/Uniform',
    'renderers/common/UniformBuffer',
    'renderers/common/UniformsGroup',
];

const inDir = './examples';
const outDir = '../types/three/examples/jsm';

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
