export default BatchNode;
/**
 * TSL function for creating a batch node.
 *
 * @tsl
 * @function
 * @param {BatchedMesh} batchMesh - A reference to batched mesh.
 * @returns {BatchNode}
 */
export const batch: any;
/**
 * This node implements the vertex shader logic which is required
 * when rendering 3D objects via batching. `BatchNode` must be used
 * with instances of {@link BatchedMesh}.
 *
 * @augments Node
 */
declare class BatchNode extends Node {
    /**
     * Constructs a new batch node.
     *
     * @param {BatchedMesh} batchMesh - A reference to batched mesh.
     */
    constructor(batchMesh: BatchedMesh);
    /**
     * A reference to batched mesh.
     *
     * @type {BatchedMesh}
     */
    batchMesh: BatchedMesh;
    /**
     * The batching index node.
     *
     * @type {?IndexNode}
     * @default null
     */
    batchingIdNode: IndexNode | null;
    /**
     * Setups the internal buffers and nodes and assigns the transformed vertex data
     * to predefined node variables for accumulation. That follows the same patterns
     * like with morph and skinning nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
}
import Node from '../core/Node.js';
