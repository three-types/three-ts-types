export default NodeStorageBuffer;
/**
 * A special form of storage buffer binding type.
 * It's buffer value is managed by a node object.
 *
 * @private
 * @augments StorageBuffer
 */
declare class NodeStorageBuffer extends StorageBuffer {
    /**
     * Constructs a new node-based storage buffer.
     *
     * @param {StorageBufferNode} nodeUniform - The storage buffer node.
     * @param {UniformGroupNode} groupNode - The uniform group node.
     */
    constructor(nodeUniform: StorageBufferNode, groupNode: UniformGroupNode);
    /**
     * The node uniform.
     *
     * @type {StorageBufferNode}
     */
    nodeUniform: StorageBufferNode;
    /**
     * The access type.
     *
     * @type {string}
     */
    access: string;
    /**
     * The uniform group node.
     *
     * @type {UniformGroupNode}
     */
    groupNode: UniformGroupNode;
}
import StorageBuffer from '../StorageBuffer.js';
