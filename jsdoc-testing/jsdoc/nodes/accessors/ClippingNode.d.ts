export default ClippingNode;
export function clipping(): ClippingNode;
export function clippingAlpha(): ClippingNode;
export function hardwareClipping(): ClippingNode;
/**
 * This node is used in {@link NodeMaterial} to setup the clipping
 * which can happen hardware-accelerated (if supported) and optionally
 * use alpha-to-coverage for anti-aliasing clipped edges.
 *
 * @augments Node
 */
declare class ClippingNode extends Node {
    /**
     * Constructs a new clipping node.
     *
     * @param {('default'|'hardware'|'alphaToCoverage')} [scope='default'] - The node's scope. Similar to other nodes,
     * the selected scope influences the behavior of the node and what type of code is generated.
     */
    constructor(scope?: ("default" | "hardware" | "alphaToCoverage"));
    /**
     * The node's scope. Similar to other nodes, the selected scope influences
     * the behavior of the node and what type of code is generated.
     *
     * @type {('default'|'hardware'|'alphaToCoverage')}
     */
    scope: ("default" | "hardware" | "alphaToCoverage");
    /**
     * Setups the node depending on the selected scope.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The result node.
     */
    setup(builder: NodeBuilder): Node;
    hardwareClipping: any;
    /**
     * Setups alpha to coverage.
     *
     * @param {Array<Vector4>} intersectionPlanes - The intersection planes.
     * @param {Array<Vector4>} unionPlanes - The union planes.
     * @return {Node} The result node.
     */
    setupAlphaToCoverage(intersectionPlanes: Array<Vector4>, unionPlanes: Array<Vector4>): Node;
    /**
     * Setups the default clipping.
     *
     * @param {Array<Vector4>} intersectionPlanes - The intersection planes.
     * @param {Array<Vector4>} unionPlanes - The union planes.
     * @return {Node} The result node.
     */
    setupDefault(intersectionPlanes: Array<Vector4>, unionPlanes: Array<Vector4>): Node;
    /**
     * Setups hardware clipping.
     *
     * @param {Array<Vector4>} unionPlanes - The union planes.
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The result node.
     */
    setupHardwareClipping(unionPlanes: Array<Vector4>, builder: NodeBuilder): Node;
}
declare namespace ClippingNode {
    let ALPHA_TO_COVERAGE: string;
    let DEFAULT: string;
    let HARDWARE: string;
}
import Node from '../core/Node.js';
