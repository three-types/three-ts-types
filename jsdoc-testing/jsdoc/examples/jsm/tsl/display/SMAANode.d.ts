export default SMAANode;
export function smaa(node: Node<any>): SMAANode;
/**
 * Post processing node for applying SMAA. Unlike FXAA, this node
 * should be applied before converting colors to sRGB. SMAA should produce
 * better results than FXAA but is also more expensive to execute.
 *
 * Used Preset: SMAA 1x Medium (with color edge detection)
 * Reference: {@link https://github.com/iryoku/smaa/releases/tag/v2.8}.
 *
 * @augments TempNode
 * @three_import import { smaa } from 'three/addons/tsl/display/SMAANode.js';
 */
declare class SMAANode extends TempNode {
    /**
     * Constructs a new SMAA node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     */
    constructor(textureNode: TextureNode);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The render target used for the edges pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetEdges;
    /**
     * The render target used for the weights pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetWeights;
    /**
     * The render target used for the blend pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetBlend;
    /**
     * Represents the "area" texture used by the SMAA implementation.
     *
     * @private
     * @type {RenderTarget}
     */
    private _areaTexture;
    /**
     * Represents the "search" texture used by the SMAA implementation.
     *
     * @private
     * @type {RenderTarget}
     */
    private _searchTexture;
    /**
     * A uniform node holding the inverse resolution value.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * A uniform texture node holding the area texture.
     *
     * @private
     * @type {TextureNode}
     */
    private _areaTextureUniform;
    /**
     * A uniform texture node holding the search texture.
     *
     * @private
     * @type {TextureNode}
     */
    private _searchTextureUniform;
    /**
     * A uniform texture node representing the edges pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _edgesTextureUniform;
    /**
     * A uniform texture node representing the weights pass.
     *
     * @private
     * @type {TextureNode}
     */
    private _weightsTextureUniform;
    /**
     * The node material that holds the TSL for rendering the edges pass.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _materialEdges;
    /**
     * The node material that holds the TSL for rendering the weights pass.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _materialWeights;
    /**
     * The node material that holds the TSL for rendering the blend pass.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _materialBlend;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * Sets the size of the effect.
     *
     * @param {number} width - The width of the effect.
     * @param {number} height - The height of the effect.
     */
    setSize(width: number, height: number): void;
    /**
     * This method is used to render the effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
    /**
     * Returns the area texture as a Base64 string.
     *
     * @private
     * @return {string} The area texture.
     */
    private _getAreaTexture;
    /**
     * Returns the search texture as a Base64 string..
     *
     * @private
     * @return {string} The search texture.
     */
    private _getSearchTexture;
}
import { TempNode } from 'three/webgpu';
