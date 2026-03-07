export default SetNode;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * `SetNode` represents a set operation which means it is used to implement any
 * `setXYZW()`, `setRGBA()` and `setSTPQ()` method invocations on node objects.
 * For example:
 * ```js
 * materialLine.colorNode = color( 0, 0, 0 ).setR( float( 1 ) );
 * ```
 *
 * @augments TempNode
 */
declare class SetNode extends TempNode {
    /**
     * Constructs a new set node.
     *
     * @param {Node} sourceNode - The node that should be updated.
     * @param {string} components - The components that should be updated.
     * @param {Node} targetNode - The value node.
     */
    constructor(sourceNode: Node, components: string, targetNode: Node);
    /**
     * The node that should be updated.
     *
     * @type {Node}
     */
    sourceNode: Node;
    /**
     * The components that should be updated.
     *
     * @type {string}
     */
    components: string;
    /**
     * The value node.
     *
     * @type {Node}
     */
    targetNode: Node;
    generate(builder: any): string;
}
import TempNode from '../core/TempNode.js';
