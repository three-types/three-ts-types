import { PositionNode, TempNode } from '../Nodes.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class EquirectUVNode extends TempNode {
    constructor(dirNode?: Swizzable<PositionNode>);
}

export const equirectUV: Swizzable<EquirectUVNode>;
