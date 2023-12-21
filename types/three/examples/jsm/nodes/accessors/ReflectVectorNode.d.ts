import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class ReflectVectorNode extends Node {
    constructor();

    getHash(): 'reflectVector';
    setup(): Node;
}

export const reflectVector: Swizzable<ReflectVectorNode>;
