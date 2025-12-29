export default InstanceNode;
/**
 * TSL function for creating an instance node.
 *
 * @tsl
 * @function
 * @param {number} count - The number of instances.
 * @param {InstancedBufferAttribute|StorageInstancedBufferAttribute} instanceMatrix - Instanced buffer attribute representing the instance transformations.
 * @param {?InstancedBufferAttribute|StorageInstancedBufferAttribute} instanceColor - Instanced buffer attribute representing the instance colors.
 * @returns {InstanceNode}
 */
export const instance: any;
/**
 * This node implements the vertex shader logic which is required
 * when rendering 3D objects via instancing. The code makes sure
 * vertex positions, normals and colors can be modified via instanced
 * data.
 *
 * @augments Node
 */
declare class InstanceNode extends Node {
    /**
     * Constructs a new instance node.
     *
     * @param {number} count - The number of instances.
     * @param {InstancedBufferAttribute|StorageInstancedBufferAttribute} instanceMatrix - Instanced buffer attribute representing the instance transformations.
     * @param {?InstancedBufferAttribute|StorageInstancedBufferAttribute} instanceColor - Instanced buffer attribute representing the instance colors.
     */
    constructor(count: number, instanceMatrix: InstancedBufferAttribute | StorageInstancedBufferAttribute, instanceColor?: (InstancedBufferAttribute | StorageInstancedBufferAttribute) | null);
    /**
     * The number of instances.
     *
     * @type {number}
     */
    count: number;
    /**
     * Instanced buffer attribute representing the transformation of instances.
     *
     * @type {InstancedBufferAttribute}
     */
    instanceMatrix: InstancedBufferAttribute;
    /**
     * Instanced buffer attribute representing the color of instances.
     *
     * @type {InstancedBufferAttribute}
     */
    instanceColor: InstancedBufferAttribute;
    /**
     * The node that represents the instance matrix data.
     *
     * @type {?Node}
     */
    instanceMatrixNode: Node | null;
    /**
     * The node that represents the instance color data.
     *
     * @type {?Node}
     * @default null
     */
    instanceColorNode: Node | null;
    /**
     * A reference to a buffer that is used by `instanceMatrixNode`.
     *
     * @type {?InstancedInterleavedBuffer}
     */
    buffer: InstancedInterleavedBuffer | null;
    /**
     * A reference to a buffer that is used by `instanceColorNode`.
     *
     * @type {?InstancedBufferAttribute}
     */
    bufferColor: InstancedBufferAttribute | null;
    /**
     * The previous instance matrices. Required for computing motion vectors.
     *
     * @type {?Node}
     * @default null
     */
    previousInstanceMatrixNode: Node | null;
    /**
     * Tracks whether the matrix data is provided via a storage buffer.
     *
     * @type {boolean}
     */
    get isStorageMatrix(): boolean;
    /**
     * Tracks whether the color data is provided via a storage buffer.
     *
     * @type {boolean}
     */
    get isStorageColor(): boolean;
    /**
     * Setups the internal buffers and nodes and assigns the transformed vertex data
     * to predefined node variables for accumulation. That follows the same patterns
     * like with morph and skinning nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Checks if the internal buffers require an update.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Computes the transformed/instanced vertex position of the previous frame.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The instanced position from the previous frame.
     */
    getPreviousInstancedPosition(builder: NodeBuilder): Node<any>;
    /**
     * Creates a node representing the instance matrix data.
     *
     * @private
     * @param {boolean} assignBuffer - Whether the created interleaved buffer should be assigned to the `buffer` member or not.
     * @return {Node} The instance matrix node.
     */
    private _createInstanceMatrixNode;
}
import Node from '../core/Node.js';
import { InstancedBufferAttribute } from '../../core/InstancedBufferAttribute.js';
import { InstancedInterleavedBuffer } from '../../core/InstancedInterleavedBuffer.js';
