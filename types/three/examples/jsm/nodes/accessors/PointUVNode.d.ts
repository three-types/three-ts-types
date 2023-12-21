import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class PointUVNode extends Node {
    isPointUVNode: true;

    constructor();
}

export const pointUV: Swizzable<PointUVNode>;
