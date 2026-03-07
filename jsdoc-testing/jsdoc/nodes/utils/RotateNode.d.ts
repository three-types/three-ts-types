export default RotateNode;
/**
 * TSL function for creating a rotate node.
 *
 * @tsl
 * @function
 * @param {Node} positionNode - The position node.
 * @param {Node} rotationNode - Represents the rotation that is applied to the position node. Depending
 * on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
 * @returns {RotateNode}
 */
export const rotate: any;
/**
 * Applies a rotation to the given position node.
 *
 * @augments TempNode
 */
declare class RotateNode extends TempNode {
    /**
     * Constructs a new rotate node.
     *
     * @param {Node} positionNode - The position node.
     * @param {Node} rotationNode - Represents the rotation that is applied to the position node. Depending
     * on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     */
    constructor(positionNode: Node, rotationNode: Node);
    /**
     * The position node.
     *
     * @type {Node}
     */
    positionNode: Node;
    /**
     *  Represents the rotation that is applied to the position node.
     *  Depending on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     *
     * @type {Node}
     */
    rotationNode: Node;
    setup(builder: any): any;
}
import TempNode from '../core/TempNode.js';
