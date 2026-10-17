export default RotateNode;
/**
 * TSL function for creating a rotate node.
 *
 * @tsl
 * @function
 * @param {Node} positionNode - The position node.
 * @param {Node} rotationNode - Represents the rotation that is applied to the position node. Depending
 * on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
 * @param {string} [order='XYZ'] - The Euler rotation order. Only used for 3D rotation.
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
     * @param {string} [order='XYZ'] - The Euler rotation order. Only used for 3D rotation.
     */
    constructor(positionNode: Node, rotationNode: Node, order?: string);
    /**
     * The position node.
     *
     * @type {Node}
     */
    positionNode: Node;
    /**
     * Represents the rotation that is applied to the position node.
     * Depending on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     *
     * @type {Node}
     */
    rotationNode: Node;
    /**
     * The Euler rotation order.
     *
     * @private
     * @type {string}
     * @default 'XYZ'
     */
    private _order;
    /**
     * Sets the Euler rotation order.
     *
     * @param {string} value - The Euler rotation order.
     * @return {RotateNode} A reference to this node.
     */
    setOrder(value: string): RotateNode;
    /**
     * Gets the Euler rotation order.
     *
     * @return {string} The Euler rotation order.
     */
    getOrder(): string;
    /**
     * The type of the {@link RotateNode#positionNode} defines the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node's type.
     */
    generateNodeType(builder: NodeBuilder): string;
    setup(builder: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import TempNode from '../core/TempNode.js';
