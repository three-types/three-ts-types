export default FlipNode;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a flip operation during the shader generation process
 * meaning it flips normalized values with the following formula:
 * ```
 * x = 1 - x;
 * ```
 * `FlipNode` is internally used to implement any `flipXYZW()`, `flipRGBA()` and
 * `flipSTPQ()` method invocations on node objects. For example:
 * ```js
 * uvNode = uvNode.flipY();
 * ```
 *
 * @augments TempNode
 */
declare class FlipNode extends TempNode {
    /**
     * Constructs a new flip node.
     *
     * @param {Node} sourceNode - The node which component(s) should be flipped.
     * @param {string} components - The components that should be flipped e.g. `'x'` or `'xy'`.
     */
    constructor(sourceNode: Node, components: string);
    /**
     * The node which component(s) should be flipped.
     *
     * @type {Node}
     */
    sourceNode: Node;
    /**
     * The components that should be flipped e.g. `'x'` or `'xy'`.
     *
     * @type {string}
     */
    components: string;
    generate(builder: any): string;
}
import TempNode from '../core/TempNode.js';
