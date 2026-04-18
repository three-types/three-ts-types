export default VertexColorNode;
export function vertexColor(index?: number): VertexColorNode;
/**
 * An attribute node for representing vertex colors.
 *
 * @augments AttributeNode
 */
declare class VertexColorNode extends AttributeNode {
    /**
     * Constructs a new vertex color node.
     *
     * @param {number} index - The attribute index.
     */
    constructor(index: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVertexColorNode: boolean;
    /**
     * The attribute index to enable more than one sets of vertex colors.
     *
     * @type {number}
     * @default 0
     */
    index: number;
}
import AttributeNode from '../core/AttributeNode.js';
