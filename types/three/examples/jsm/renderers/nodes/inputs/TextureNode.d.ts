import { Texture } from '../../../../../src/Three';

import InputNode from '../core/InputNode';
import UVNode from '../accessors/UVNode';
import NodeBuilder from '../core/NodeBuilder';

export class TextureNode extends InputNode {
    value: Texture;
    uv: UVNode;
    isTextureNode: boolean;

    constructor(value: Texture, uv: UVNode);

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default TextureNode;
