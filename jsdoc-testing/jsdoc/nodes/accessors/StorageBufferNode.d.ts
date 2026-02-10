export default StorageBufferNode;
export function storage(value: StorageBufferAttribute | StorageInstancedBufferAttribute | BufferAttribute, type?: (string | Struct) | null, count?: number): StorageBufferNode;
/**
 * This node is used in context of compute shaders and allows to define a
 * storage buffer for data. A typical workflow is to create instances of
 * this node with the convenience functions `attributeArray()` or `instancedArray()`,
 * setup up a compute shader that writes into the buffers and then convert
 * the storage buffers to attribute nodes for rendering.
 *
 * ```js
 * const positionBuffer = instancedArray( particleCount, 'vec3' ); // the storage buffer node
 *
 * const computeInit = Fn( () => { // the compute shader
 *
 * 	const position = positionBuffer.element( instanceIndex );
 *
 * 	// compute position data
 *
 * 	position.x = 1;
 * 	position.y = 1;
 * 	position.z = 1;
 *
 * } )().compute( particleCount );
 *
 * const particleMaterial = new THREE.SpriteNodeMaterial();
 * particleMaterial.positionNode = positionBuffer.toAttribute();
 *
 * renderer.computeAsync( computeInit );
 *
 * ```
 *
 * @augments BufferNode
 */
declare class StorageBufferNode extends BufferNode {
    /**
     * Constructs a new storage buffer node.
     *
     * @param {StorageBufferAttribute|StorageInstancedBufferAttribute|BufferAttribute} value - The buffer data.
     * @param {?(string|Struct)} [bufferType=null] - The buffer type (e.g. `'vec3'`).
     * @param {number} [bufferCount=0] - The buffer count.
     */
    constructor(value: StorageBufferAttribute | StorageInstancedBufferAttribute | BufferAttribute, bufferType?: (string | Struct) | null, bufferCount?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageBufferNode: boolean;
    /**
     * The buffer struct type.
     *
     * @type {?StructTypeNode}
     * @default null
     */
    structTypeNode: StructTypeNode | null;
    /**
     * The access type of the texture node.
     *
     * @type {string}
     * @default 'readWrite'
     */
    access: string;
    /**
     * Whether the node is atomic or not.
     *
     * @type {boolean}
     * @default false
     */
    isAtomic: boolean;
    /**
     * Whether the node represents a PBO or not.
     * Only relevant for WebGL.
     *
     * @type {boolean}
     * @default false
     */
    isPBO: boolean;
    /**
     * A reference to the internal buffer attribute node.
     *
     * @private
     * @type {?BufferAttributeNode}
     * @default null
     */
    private _attribute;
    /**
     * A reference to the internal varying node.
     *
     * @private
     * @type {?VaryingNode}
     * @default null
     */
    private _varying;
    /**
     * This method is overwritten since the buffer data might be shared
     * and thus the hash should be shared as well.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * Enables element access with the given index node.
     *
     * @param {IndexNode} indexNode - The index node.
     * @return {StorageArrayElementNode} A node representing the element access.
     */
    element(indexNode: IndexNode): StorageArrayElementNode;
    /**
     * Defines whether this node is a PBO or not. Only relevant for WebGL.
     *
     * @param {boolean} value - The value so set.
     * @return {StorageBufferNode} A reference to this node.
     */
    setPBO(value: boolean): StorageBufferNode;
    /**
     * Returns the `isPBO` value.
     *
     * @return {boolean} Whether the node represents a PBO or not.
     */
    getPBO(): boolean;
    /**
     * Defines the node access.
     *
     * @param {string} value - The node access.
     * @return {StorageBufferNode} A reference to this node.
     */
    setAccess(value: string): StorageBufferNode;
    /**
     * Convenience method for configuring a read-only node access.
     *
     * @return {StorageBufferNode} A reference to this node.
     */
    toReadOnly(): StorageBufferNode;
    /**
     * Defines whether the node is atomic or not.
     *
     * @param {boolean} value - The atomic flag.
     * @return {StorageBufferNode} A reference to this node.
     */
    setAtomic(value: boolean): StorageBufferNode;
    /**
     * Convenience method for making this node atomic.
     *
     * @return {StorageBufferNode} A reference to this node.
     */
    toAtomic(): StorageBufferNode;
    /**
     * Returns attribute data for this storage buffer node.
     *
     * @return {{attribute: BufferAttributeNode, varying: VaryingNode}} The attribute data.
     */
    getAttributeData(): {
        attribute: BufferAttributeNode;
        varying: VaryingNode;
    };
    /**
     * This method is overwritten since the node type from the availability of storage buffers
     * and the attribute data.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    getNodeType(builder: NodeBuilder): string;
    /**
     * Returns the type of a member of the struct.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member.
     * @return {string} The type of the member.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * Generates the code snippet of the storage buffer node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder): string;
}
import BufferNode from './BufferNode.js';
