export default SampleNode;
export function sample(callback: Function, uv?: Node<vec2> | null): SampleNode;
/**
 * Class representing a node that samples a value using a provided callback function.
 *
 * @extends Node
 */
declare class SampleNode extends Node {
    /**
     * Creates an instance of SampleNode.
     *
     * @param {Function} callback - The function to be called when sampling. Should accept a UV node and return a value.
     * @param {?Node<vec2>} [uvNode=null] - The UV node to be used in the texture sampling.
     */
    constructor(callback: Function, uvNode?: Node<vec2> | null);
    callback: Function;
    /**
     * Represents the texture coordinates.
     *
     * @type {?Node<vec2|vec3>}
     * @default null
     */
    uvNode: Node<vec2 | vec3> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampleNode: boolean;
    /**
     * Sets up the node by sampling with the default UV accessor.
     *
     * @returns {Node} The result of the callback function when called with the UV node.
     */
    setup(): Node;
    /**
     * Calls the callback function with the provided UV node.
     *
     * @param {Node<vec2>} uv - The UV node or value to be passed to the callback.
     * @returns {Node} The result of the callback function.
     */
    sample(uv: Node<vec2>): Node;
}
import Node from '../core/Node.js';
