export default TempNode;
/**
 * This module uses cache management to create temporary variables
 * if the node is used more than once to prevent duplicate calculations.
 *
 * The class acts as a base class for many other nodes types.
 *
 * @augments Node
 */
declare class TempNode extends Node {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTempNode: boolean;
    /**
     * Whether this node is used more than once in context of other nodes.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @return {boolean} A flag that indicates if there is more than one dependency to other nodes.
     */
    hasDependencies(builder: NodeBuilder): boolean;
    build(builder: any, output: any): any;
}
import Node from './Node.js';
