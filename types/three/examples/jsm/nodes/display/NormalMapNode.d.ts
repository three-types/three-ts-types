import { NormalMapTypes } from '../../../../src/Three.js';
import TempNode from '../core/TempNode.js';
import Node from '../core/Node.js';
import MathNode from '../math/MathNode.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class NormalMapNode extends TempNode {
    node: Node;
    scaleNode: Node | null;

    normalMapType: NormalMapTypes;

    constructor(node: Node, scaleNode?: Node | null);
}

export const normalMap: (node: Node, scaleNode?: Node) => Swizzable<NormalMapNode>;

export const TBNViewMatrix: Swizzable<MathNode>;
