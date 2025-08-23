export default ArrayNode;
export function array(...params: any[]): ArrayNode;
/**
 * ArrayNode represents a collection of nodes, typically created using the {@link array} function.
 * ```js
 * const colors = array( [
 * 	vec3( 1, 0, 0 ),
 * 	vec3( 0, 1, 0 ),
 * 	vec3( 0, 0, 1 )
 * ] );
 *
 * const redColor = tintColors.element( 0 );
 *
 * @augments TempNode
 */
declare class ArrayNode extends TempNode {
    /**
     * Constructs a new array node.
     *
     * @param {?string} nodeType - The data type of the elements.
     * @param {number} count - Size of the array.
     * @param {?Array<Node>} [values=null] - Array default values.
     */
    constructor(nodeType: string | null, count: number, values?: Array<Node> | null);
    /**
     * Array size.
     *
     * @type {number}
     */
    count: number;
    /**
     * Array default values.
     *
     * @type {?Array<Node>}
     */
    values: Array<Node> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayNode: boolean;
    /**
     * Returns the number of elements in the node array.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {number} The number of elements in the node array.
     */
    getArrayCount(): number;
    /**
     * This method builds the output node and returns the resulting array as a shader string.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated shader string.
     */
    generate(builder: NodeBuilder): string;
}
import TempNode from './TempNode.js';
