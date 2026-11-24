export default ArrayElementNode;
/**
 * Represents the element access on array-like nodes, e.g. vectors, matrices,
 * arrays, uniform arrays, storage buffers and workgroup arrays.
 *
 * @augments Node
 */
declare class ArrayElementNode extends Node {
    /**
     * Constructs an array element node.
     *
     * @param {Node} node - The array-like node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(node: Node, indexNode: Node);
    /**
     * The array-like node.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The index node that defines the element access.
     *
     * @type {Node}
     */
    indexNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayElementNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from the array-like node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the member type is inferred from the array-like node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The member name.
     * @return {string} The member type.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * A buffer-like array can be known only in the build, e.g. a storage buffer returned by a function
     * or the buffer of a reference node. The access is then redirected to an element of that array.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?Node} The redirected element, or `null` if the access is not redirected.
     */
    getOutputNode(builder: NodeBuilder): Node | null;
    setup(builder: any): Node | null;
    /**
     * Generates the element access with an index, e.g. `array[ index ]`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generateAccess(builder: NodeBuilder): string;
    /**
     * Generates the element access of a uniform array, whose elements are stored with a padded type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generateUniformArrayAccess(builder: NodeBuilder): string;
    /**
     * Generates the element access of a storage buffer without storage buffer support (WebGL).
     * The element is read from a PBO, otherwise the attribute of the buffer is used.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generateStorageAccess(builder: NodeBuilder): string;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
