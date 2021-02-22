import { Texture } from '../../../../../src/Three';

import InputNode from '../core/InputNode';
import UVNode from '../accessors/UVNode';

export default class TextureNode extends InputNode {
    value: Texture;
    uv: UVNode;
    isTextureNode: boolean;

    constructor(value: Texture, uv: UVNode);
}
