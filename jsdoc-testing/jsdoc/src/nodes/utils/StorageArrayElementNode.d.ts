export default StorageArrayElementNode;
/**
 * TSL function for creating a storage element node.
 *
 * @tsl
 * @function
 * @param {StorageBufferNode} storageBufferNode - The storage buffer node.
 * @param {Node} indexNode - The index node that defines the element access.
 * @returns {StorageArrayElementNode}
 */
export const storageElement: any;
/**
 * This class enables element access on instances of {@link StorageBufferNode}.
 * In most cases, it is indirectly used when accessing elements with the
 * {@link StorageBufferNode#element} method.
 *
 * ```js
 * const position = positionStorage.element( instanceIndex );
 * ```
 *
 * @augments ArrayElementNode
 */
declare class StorageArrayElementNode extends ArrayElementNode {
    /**
     * Constructs storage buffer element node.
     *
     * @param {StorageBufferNode} storageBufferNode - The storage buffer node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(storageBufferNode: StorageBufferNode, indexNode: Node);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageArrayElementNode: boolean;
    /**
     * The storage buffer node.
     *
     * @param {Node} value
     * @type {StorageBufferNode}
     */
    set storageBufferNode(value: Node);
    get storageBufferNode(): Node;
    getMemberType(builder: any, name: any): any;
    setup(builder: any): import("../Nodes.js").Node | null;
    generate(builder: any, output: any): any;
}
import ArrayElementNode from './ArrayElementNode.js';
