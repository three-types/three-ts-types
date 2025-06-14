export default InstanceNode;
/**
 * TSL function for creating an instance node.
 *
 * @tsl
 * @function
 * @param {number} count - The number of instances.
 * @param {InstancedBufferAttribute} instanceMatrix - Instanced buffer attribute representing the instance transformations.
 * @param {?InstancedBufferAttribute} instanceColor - Instanced buffer attribute representing the instance colors.
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
     * @param {InstancedBufferAttribute} instanceMatrix - Instanced buffer attribute representing the instance transformations.
     * @param {?InstancedBufferAttribute} instanceColor - Instanced buffer attribute representing the instance colors.
     */
    constructor(count: number, instanceMatrix: InstancedBufferAttribute, instanceColor?: InstancedBufferAttribute | null);
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
     * Setups the internal buffers and nodes and assigns the transformed vertex data
     * to predefined node variables for accumulation. That follows the same patterns
     * like with morph and skinning nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Checks if the internal buffers required an update.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(): void;
}
import Node from '../core/Node.js';
import { InstancedBufferAttribute } from '../../core/InstancedBufferAttribute.js';
import { InstancedInterleavedBuffer } from '../../core/InstancedInterleavedBuffer.js';
