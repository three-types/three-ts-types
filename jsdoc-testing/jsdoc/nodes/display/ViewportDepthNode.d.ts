export default ViewportDepthNode;
export function viewZToOrthographicDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
export function orthographicDepthToViewZ(depth: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
export function viewZToPerspectiveDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
export function viewZToReversedPerspectiveDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
export function perspectiveDepthToViewZ(depth: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
export function viewZToLogarithmicDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
export function logarithmicDepthToViewZ(depth: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * TSL object that represents the depth value for the current fragment.
 *
 * @tsl
 * @type {ViewportDepthNode}
 */
export const depth: ViewportDepthNode;
/**
 * TSL function for converting a perspective depth value to linear depth.
 *
 * @tsl
 * @function
 * @param {?Node<float>} [value=null] - The perspective depth. If `null` is provided, the current fragment's depth is used.
 * @returns {ViewportDepthNode<float>}
 */
export const linearDepth: any;
/**
 * TSL object that represents the linear (orthographic) depth value of the current fragment
 *
 * @tsl
 * @type {ViewportDepthNode}
 */
export const viewportLinearDepth: ViewportDepthNode;
/**
 * This node offers a collection of features in context of the depth logic in the fragment shader.
 * Depending on {@link ViewportDepthNode#scope}, it can be used to define a depth value for the current
 * fragment or for depth evaluation purposes.
 *
 * @augments Node
 */
declare class ViewportDepthNode extends Node {
    /**
     * Constructs a new viewport depth node.
     *
     * @param {('depth'|'depthBase'|'linearDepth')} scope - The node's scope.
     * @param {?Node} [valueNode=null] - The value node.
     */
    constructor(scope: ("depth" | "depthBase" | "linearDepth"), valueNode?: Node | null);
    /**
     * The node behaves differently depending on which scope is selected.
     *
     * - `ViewportDepthNode.DEPTH_BASE`: Allows to define a value for the current fragment's depth.
     * - `ViewportDepthNode.DEPTH`: Represents the depth value for the current fragment (`valueNode` is ignored).
     * - `ViewportDepthNode.LINEAR_DEPTH`: Represents the linear (orthographic) depth value of the current fragment.
     * If a `valueNode` is set, the scope can be used to convert perspective depth data to linear data.
     *
     * @type {('depth'|'depthBase'|'linearDepth')}
     */
    scope: ("depth" | "depthBase" | "linearDepth");
    /**
     * Can be used to define a custom depth value.
     * The property is ignored in the `ViewportDepthNode.DEPTH` scope.
     *
     * @type {?Node}
     * @default null
     */
    valueNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isViewportDepthNode: boolean;
    generate(builder: any): any;
    setup({ camera }: {
        camera: any;
    }): any;
}
declare namespace ViewportDepthNode {
    let DEPTH_BASE: string;
    let DEPTH: string;
    let LINEAR_DEPTH: string;
}
import Node from '../core/Node.js';
