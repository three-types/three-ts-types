export default SplitNode;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * `SplitNode` represents a property access operation which means it is
 * used to implement any `.xyzw`, `.rgba` and `stpq` usage on node objects.
 * For example:
 * ```js
 * const redValue = color.r;
 * ```
 *
 * @augments Node
 */
declare class SplitNode extends Node {
    /**
     * Constructs a new split node.
     *
     * @param {Node} node - The node that should be accessed.
     * @param {string} [components='x'] - The components that should be accessed.
     */
    constructor(node: Node, components?: string);
    /**
     * The node that should be accessed.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The components that should be accessed.
     *
     * @type {string}
     */
    components: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSplitNode: boolean;
    /**
     * Returns the vector length which is computed based on the requested components.
     *
     * @return {number} The vector length.
     */
    getVectorLength(): number;
    /**
     * Returns the component type of the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The component type.
     */
    getComponentType(builder: NodeBuilder): string;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import Node from '../core/Node.js';
