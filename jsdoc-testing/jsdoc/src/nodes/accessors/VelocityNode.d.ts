export default VelocityNode;
/**
 * TSL object that represents the velocity of a render pass.
 *
 * @tsl
 * @type {VelocityNode}
 */
export const velocity: VelocityNode;
/**
 * A node for representing motion or velocity vectors. Foundation
 * for advanced post processing effects like motion blur or TRAA.
 *
 * The node keeps track of the model, view and projection matrices
 * of the previous frame and uses them to compute offsets in NDC space.
 * These offsets represent the final velocity.
 *
 * @augments TempNode
 */
declare class VelocityNode extends TempNode {
    /**
     * Constructs a new vertex color node.
     */
    constructor();
    /**
     * The current projection matrix.
     *
     * @type {?Matrix4}
     * @default null
     */
    projectionMatrix: Matrix4 | null;
    /**
     * Uniform node representing the previous model matrix in world space.
     *
     * @type {UniformNode<mat4>}
     * @default null
     */
    previousModelWorldMatrix: UniformNode<mat4>;
    /**
     * Uniform node representing the previous projection matrix.
     *
     * @type {UniformNode<mat4>}
     * @default null
     */
    previousProjectionMatrix: UniformNode<mat4>;
    /**
     * Uniform node representing the previous view matrix.
     *
     * @type {UniformNode<mat4>}
     * @default null
     */
    previousCameraViewMatrix: UniformNode<mat4>;
    /**
     * Sets the given projection matrix.
     *
     * @param {Matrix4} projectionMatrix - The projection matrix to set.
     */
    setProjectionMatrix(projectionMatrix: Matrix4): void;
    /**
     * Updates velocity specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update({ frameId, camera, object }: NodeFrame): void;
    /**
     * Overwritten to updated velocity specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateAfter({ object }: NodeFrame): void;
    /**
     * Implements the velocity computation based on the previous and current vertex data.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<vec2>} The motion vector.
     */
    setup(): Node<vec2>;
}
import TempNode from '../core/TempNode.js';
import { Matrix4 } from '../../math/Matrix4.js';
