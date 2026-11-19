export default PMREMNode;
/**
 * TSL function for creating a PMREM node.
 *
 * @tsl
 * @function
 * @param {Texture} value - The input texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
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
 * @augments Node
 */
declare class PMREMNode extends Node {
    /**
     * Constructs a new PMREM node.
     *
     * @param {Texture} value - The input texture.
     * @param {Node<vec3>} [uvNode=null] - The uv node.
     * @param {Node<float>} [levelNode=null] - The level node.
     */
    constructor(value: Texture, uvNode?: Node<vec3>, levelNode?: Node<float>);
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
     * @type {Node<vec3>}
     */
    uvNode: Node<vec3>;
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
     * @type {CubeTextureNode}
     */
    private _texture;
    /**
     * A uniform representing the last mip level of the PMREM.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _maxLod;
    /**
     * A uniform representing the width of the sharpest mip level of the PMREM.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _size;
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
import Node from '../core/Node.js';
