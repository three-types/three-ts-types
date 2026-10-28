export default NodeUniformBuffer;
/**
 * A special form of uniform buffer binding type.
 * It's buffer value is managed by a node object.
 *
 * @private
 * @augments UniformBuffer
 */
declare class NodeUniformBuffer extends UniformBuffer {
    /**
     * Constructs a new node-based uniform buffer.
     *
     * @param {BufferNode} nodeUniform - The uniform buffer node.
     * @param {UniformGroupNode} groupNode - The uniform group node.
     */
    constructor(nodeUniform: BufferNode, groupNode: UniformGroupNode);
    /**
     * The uniform buffer node.
     *
     * @type {BufferNode}
     */
    nodeUniform: BufferNode;
    /**
     * The uniform group node.
     *
     * @type {UniformGroupNode}
     */
    groupNode: UniformGroupNode;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeUniformBuffer: boolean;
    /**
     * The array of update ranges.
     *
     * @param {Array<{start: number, count: number}>} value - The update ranges.
     */
    set updateRanges(value: Array<{
        start: number;
        count: number;
    }>);
    /**
     * The array of update ranges.
     *
     * @type {Array<{start: number, count: number}>}
     */
    get updateRanges(): Array<{
        start: number;
        count: number;
    }>;
}
import UniformBuffer from '../UniformBuffer.js';
