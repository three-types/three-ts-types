import Node from '../core/Node.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class PosterizeNode extends Node {
    sourceNode: Node;
    stepsNode: Node;

    constructor(sourceNode: Node, stepsNode: Node);
}

export const posterize: (sourceNode: NodeRepresentation, stepsNode: NodeRepresentation) => Swizzable<PosterizeNode>;
