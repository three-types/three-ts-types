export default ScreenNode;
/**
 * TSL object that represents normalized screen coordinates, unitless in `[0, 1]`.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const screenUV: ScreenNode<any>;
/**
 * TSL object that represents the screen resolution in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const screenSize: ScreenNode<any>;
/**
 * TSL object that represents the current `x`/`y` pixel position on the screen in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const screenCoordinate: ScreenNode<any>;
/**
 * TSL object that represents the viewport rectangle as `x`, `y`, `width` and `height` in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec4>}
 */
export const viewport: ScreenNode<vec4>;
/**
 * TSL object that represents the viewport resolution in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const viewportSize: ScreenNode<any>;
/**
 * TSL object that represents the current `x`/`y` pixel position on the viewport in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const viewportCoordinate: ScreenNode<any>;
/**
 * TSL object that represents normalized viewport coordinates, unitless in `[0, 1]`.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const viewportUV: ScreenNode<any>;
/**
 * @deprecated since r169. Use {@link screenSize} instead.
 */
export const viewportResolution: any;
/**
 * This node provides a collection of screen related metrics.
 * Depending on {@link ScreenNode#scope}, the nodes can represent
 * resolution or viewport data as well as fragment or uv coordinates.
 *
 * @augments Node
 */
declare class ScreenNode extends Node {
    /**
     * Constructs a new screen node.
     *
     * @param {('coordinate'|'viewport'|'size'|'uv')} scope - The node's scope.
     */
    constructor(scope: ("coordinate" | "viewport" | "size" | "uv"));
    /**
     * The node represents different metric depending on which scope is selected.
     *
     * - `ScreenNode.COORDINATE`: Window-relative coordinates of the current fragment according to WebGPU standards.
     * - `ScreenNode.VIEWPORT`: The current viewport defined as a four-dimensional vector.
     * - `ScreenNode.SIZE`: The dimensions of the current bound framebuffer.
     * - `ScreenNode.UV`: Normalized coordinates.
     *
     * @type {('coordinate'|'viewport'|'size'|'uv')}
     */
    scope: ("coordinate" | "viewport" | "size" | "uv");
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isViewportNode: boolean;
    /**
     * This method is overwritten since the node type depends on the selected scope.
     *
     * @return {('vec2'|'vec4')} The node type.
     */
    getNodeType(): ("vec2" | "vec4");
    /**
     * `ScreenNode` implements {@link Node#update} to retrieve viewport and size information
     * from the current renderer.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update({ renderer }: NodeFrame): void;
    setup(): any;
    generate(builder: any): any;
}
declare namespace ScreenNode {
    let COORDINATE: string;
    let VIEWPORT: string;
    let SIZE: string;
    let UV: string;
}
import Node from '../core/Node.js';
