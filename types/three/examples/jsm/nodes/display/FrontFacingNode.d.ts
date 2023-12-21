import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class FrontFacingNode extends Node {
    isFrontFacingNode: true;
    constructor();
}

export const frontFacing: Swizzable<FrontFacingNode>;
export const faceDirection: Swizzable;
