export default ColorSpaceNode;
export function workingToColorSpace(node: Node, targetColorSpace: string): ColorSpaceNode;
export function colorSpaceToWorking(node: Node, sourceColorSpace: string): ColorSpaceNode;
export function convertColorSpace(node: Node, sourceColorSpace: string, targetColorSpace: string): ColorSpaceNode;
/**
 * This node represents a color space conversion. Meaning it converts
 * a color value from a source to a target color space.
 *
 * @augments TempNode
 */
declare class ColorSpaceNode extends TempNode {
    /**
     * Constructs a new color space node.
     *
     * @param {Node} colorNode - Represents the color to convert.
     * @param {string} source - The source color space.
     * @param {string} target - The target color space.
     */
    constructor(colorNode: Node, source: string, target: string);
    /**
     * Represents the color to convert.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * The source color space.
     *
     * @type {string}
     */
    source: string;
    /**
     * The target color space.
     *
     * @type {string}
     */
    target: string;
    /**
     * This method resolves the constants `WORKING_COLOR_SPACE` and
     * `OUTPUT_COLOR_SPACE` based on the current configuration of the
     * color management and renderer.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} colorSpace - The color space to resolve.
     * @return {string} The resolved color space.
     */
    resolveColorSpace(builder: NodeBuilder, colorSpace: string): string;
    setup(builder: any): Node;
}
import TempNode from '../core/TempNode.js';
