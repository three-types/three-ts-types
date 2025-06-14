export default PMREMNode;
/**
 * TSL function for creating a PMREM node.
 *
 * @tsl
 * @function
 * @param {Texture} value - The input texture.
 * @param {?Node<vec2>} [uvNode=null] - The uv node.
 * @param {?Node<float>} [levelNode=null] - The level node.
 * @returns {PMREMNode}
 */
export const pmremTexture: any;
/**
 * This node represents a PMREM which is a special type of preprocessed
 * environment map intended for PBR materials.
 *
 * ```js
 * const material = new MeshStandardNodeMaterial();
 * material.envNode = pmremTexture( envMap );
 * ```
 *
 * @augments TempNode
 */
declare class PMREMNode extends TempNode {
    /**
     * Constructs a new function overloading node.
     *
     * @param {Texture} value - The input texture.
     * @param {Node<vec2>} [uvNode=null] - The uv node.
     * @param {Node<float>} [levelNode=null] - The level node.
     */
    constructor(value: Texture, uvNode?: Node<vec2>, levelNode?: Node<float>);
    /**
     * Reference to the input texture.
     *
     * @private
     * @type {Texture}
     */
    private _value;
    /**
     * Reference to the generated PMREM.
     *
     * @private
     * @type {Texture | null}
     * @default null
     */
    private _pmrem;
    /**
     *  The uv node.
     *
     * @type {Node<vec2>}
     */
    uvNode: Node<vec2>;
    /**
     *  The level node.
     *
     * @type {Node<float>}
     */
    levelNode: Node<float>;
    /**
     * Reference to a PMREM generator.
     *
     * @private
     * @type {?PMREMGenerator}
     * @default null
     */
    private _generator;
    /**
     * The texture node holding the generated PMREM.
     *
     * @private
     * @type {TextureNode}
     */
    private _texture;
    /**
     * A uniform representing the PMREM's width.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _width;
    /**
     * A uniform representing the PMREM's height.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _height;
    /**
     * A uniform representing the PMREM's max Mip.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _maxMip;
    set value(value: Texture);
    /**
     * The node's texture value.
     *
     * @type {Texture}
     */
    get value(): Texture;
    /**
     * Uses the given PMREM texture to update internal values.
     *
     * @param {Texture} texture - The PMREM texture.
     */
    updateFromTexture(texture: Texture): void;
    updateBefore(frame: any): void;
    setup(builder: any): any;
}
import TempNode from '../core/TempNode.js';
import { Texture } from '../../textures/Texture.js';
