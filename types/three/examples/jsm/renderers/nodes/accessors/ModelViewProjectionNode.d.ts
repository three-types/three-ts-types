import Node from '../core/Node.js';
import OperatorNode from '../math/OperatorNode.js';
import PositionNode from './PositionNode.js';

export default class ModelViewProjectionNode extends Node {
    position: PositionNode;
    _mvpMatrix: OperatorNode;

    constructor(position: PositionNode);
}
