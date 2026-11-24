export default ToneMappingNode;
export function toneMapping(mapping: number, exposure?: Node<float> | number, color?: Node<vec3> | Color): ToneMappingNode<vec3>;
/**
 * TSL object that represents the global tone mapping exposure of the renderer.
 *
 * @tsl
 * @type {RendererReferenceNode<float>}
 */
export const toneMappingExposure: RendererReferenceNode<float>;
/**
 * This node represents a tone mapping operation.
 *
 * @augments Node
 */
declare class ToneMappingNode extends Node {
    /**
     * Constructs a new tone mapping node.
     *
     * @param {number} toneMapping - The tone mapping type.
     * @param {Node} exposureNode - The tone mapping exposure.
     * @param {Node} [colorNode=null] - The color node to process.
     */
    constructor(toneMapping: number, exposureNode?: Node, colorNode?: Node);
    /**
     * The tone mapping type.
     *
     * @private
     * @type {number}
     */
    private _toneMapping;
    /**
     * The tone mapping exposure.
     *
     * @type {Node}
     * @default toneMappingExposure
     */
    exposureNode: Node;
    /**
     * Represents the color to process.
     *
     * @type {?Node}
     * @default null
     */
    colorNode: Node | null;
    /**
     * Sets the tone mapping type.
     *
     * @param {number} value - The tone mapping type.
     * @return {ToneMappingNode} A reference to this node.
     */
    setToneMapping(value: number): ToneMappingNode;
    /**
     * Gets the tone mapping type.
     *
     * @returns {number} The tone mapping type.
     */
    getToneMapping(): number;
    setup(builder: any): any;
}
import Node from '../core/Node.js';
