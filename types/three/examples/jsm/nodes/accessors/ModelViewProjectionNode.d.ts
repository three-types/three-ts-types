import Node from '../core/Node.js';
import PositionNode from './PositionNode.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class ModelViewProjectionNode extends Node {
    constructor(positionNode?: PositionNode);
}

export const modelViewProjection: (position?: NodeRepresentation) => Swizzable<ModelViewProjectionNode>;
