export default PointUVNode;
/**
 * TSL object that represents the uv coordinates of points.
 *
 * @tsl
 * @type {PointUVNode}
 */
export const pointUV: PointUVNode;
/**
 * A node for representing the uv coordinates of points.
 *
 * Can only be used with a WebGL backend. In WebGPU, point
 * primitives always have the size of one pixel and can thus
 * can't be used as sprite-like objects that display textures.
 *
 * @augments Node
 */
declare class PointUVNode extends Node {
    /**
     * Constructs a new point uv node.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPointUVNode: boolean;
    generate(): string;
}
import Node from '../core/Node.js';
