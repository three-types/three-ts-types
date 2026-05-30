/**
 * TSL function for creating a gaussian blur node for post processing with enabled premultiplied alpha.
 *
 * @tsl
 * @function
 * @deprecated  since r180. Use `gaussianBlur()` with `premultipliedAlpha: true` option instead.
 * @param {Node<vec4>} node - The node that represents the input of the effect.
 * @param {Node<vec2|float>} directionNode - Defines the direction and radius of the blur.
 * @param {number} sigma - Controls the kernel of the blur filter. Higher values mean a wider blur radius.
 * @returns {GaussianBlurNode}
 */
export function premultipliedGaussianBlur(node: Node<any>, directionNode: Node<any | any>, sigma: number): GaussianBlurNode;
export default GaussianBlurNode;
export function gaussianBlur(node: Node<any>, directionNode: Node<any | any>, sigma: number, options?: {
    premultipliedAlpha?: boolean | undefined;
    resolutionScale?: number | undefined;
}): GaussianBlurNode;
/**
 * Post processing node for creating a gaussian blur effect.
 *
 * @augments TempNode
 * @three_import import { gaussianBlur, premultipliedGaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js';
 */
declare class GaussianBlurNode extends TempNode {
    /**
     * Constructs a new gaussian blur node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<vec2|float>} directionNode - Defines the direction and radius of the blur.
     * @param {number} sigma - Controls the kernel of the blur filter. Higher values mean a wider blur radius.
     * @param {Object} [options={}] - Additional options for the gaussian blur effect.
     * @param {boolean} [options.premultipliedAlpha=false] - Whether to use premultiplied alpha for the blur effect.
     * @param {number} [options.resolutionScale=1] - The resolution of the effect. 0.5 means half the resolution of the texture node.
     */
    constructor(textureNode: TextureNode, directionNode?: Node<any | any>, sigma?: number, options?: {
        premultipliedAlpha?: boolean | undefined;
        resolutionScale?: number | undefined;
    });
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
     * Controls the kernel of the blur filter. Higher values mean a wider blur radius.
     *
     * @type {number}
     */
    sigma: number;
    /**
     * A uniform node holding the inverse resolution value.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * Gaussian blur is applied in two passes (horizontal, vertical).
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
     * @default (1)
     */
    resolutionScale: number;
    /**
     * Whether the effect should use premultiplied alpha or not. Set this to `true`
     * if you are going to blur texture input with transparency.
     *
     * @type {boolean}
     * @default false
     */
    premultipliedAlpha: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @default true
     * @readonly
     */
    readonly isGaussianBlurNode: boolean;
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
     * Computes gaussian coefficients depending on the given kernel radius.
     *
     * @private
     * @param {number} kernelRadius - The kernel radius.
     * @return {Array<number>}
     */
    private _getCoefficients;
    set resolution(value: Vector2);
    /**
     * The resolution scale.
     *
     * @deprecated
     * @type {Vector2}
     * @default {(1,1)}
     */
    get resolution(): Vector2;
}
import { TempNode } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
