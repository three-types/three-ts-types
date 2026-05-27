export default BilateralBlurNode;
export function bilateralBlur(node: Node<any>, directionNode: Node<any | any>, sigma: number, sigmaColor: number): BilateralBlurNode;
/**
 * Post processing node for creating a bilateral blur effect.
 *
 * Bilateral blur smooths an image while preserving sharp edges. Unlike a
 * standard Gaussian blur which blurs everything equally, bilateral blur
 * analyzes the intensity/color of neighboring pixels. If a neighbor is too
 * different from the center pixel (indicating an edge), it is excluded
 * from the blurring process.
 *
 * Reference: {@link https://en.wikipedia.org/wiki/Bilateral_filter}
 *
 * @augments TempNode
 * @three_import import { bilateralBlur } from 'three/addons/tsl/display/BilateralBlurNode.js';
 */
declare class BilateralBlurNode extends TempNode {
    /**
     * Constructs a new bilateral blur node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<vec2|float>} directionNode - Defines the direction and radius of the blur.
     * @param {number} sigma - Controls the spatial kernel of the blur filter. Higher values mean a wider blur radius.
     * @param {number} sigmaColor - Controls the intensity kernel. Higher values allow more color difference to be blurred together.
     */
    constructor(textureNode: TextureNode, directionNode?: Node<any | any>, sigma?: number, sigmaColor?: number);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * Defines the direction and radius of the blur.
     *
     * @type {Node<vec2|float>}
     */
    directionNode: Node<any | any>;
    /**
     * Controls the spatial kernel of the blur filter. Higher values mean a wider blur radius.
     *
     * @type {number}
     */
    sigma: number;
    /**
     * Controls the color/intensity kernel. Higher values allow more color difference
     * to be blurred together. Lower values preserve edges more strictly.
     *
     * @type {number}
     */
    sigmaColor: number;
    /**
     * A uniform node holding the inverse resolution value.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * Bilateral blur is applied in two passes (horizontal, vertical).
     * This node controls the direction of each pass.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _passDirection;
    /**
     * The render target used for the horizontal pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _horizontalRT;
    /**
     * The render target used for the vertical pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _verticalRT;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * The material for the blur pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _material;
    /**
     * The resolution scale.
     *
     * @type {number}
     * @default 1
     */
    resolutionScale: number;
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
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
    /**
     * Computes spatial (Gaussian) coefficients depending on the given kernel radius.
     * These coefficients are used for the spatial component of the bilateral filter.
     *
     * @private
     * @param {number} kernelRadius - The kernel radius.
     * @return {Array<number>}
     */
    private _getSpatialCoefficients;
}
import { TempNode } from 'three/webgpu';
