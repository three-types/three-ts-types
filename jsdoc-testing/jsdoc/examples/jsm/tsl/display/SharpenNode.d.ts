export default SharpenNode;
export function sharpen(node: Node<any>, sharpness?: (number | Node<any>), denoise?: (boolean | Node<bool>)): SharpenNode;
/**
 * Post processing node for contrast-adaptive sharpening (RCAS).
 *
 * Reference: {@link https://gpuopen.com/fidelityfx-superresolution/}.
 *
 * @augments TempNode
 * @three_import import { sharpen } from 'three/addons/tsl/display/SharpenNode.js';
 */
declare class SharpenNode extends TempNode {
    /**
     * Constructs a new sharpen node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<float>} [sharpness=0.2] - Sharpening strength. 0 = maximum sharpening, 2 = no sharpening.
     * @param {Node<bool>} [denoise=false] - Whether to attenuate sharpening in noisy areas.
     */
    constructor(textureNode: TextureNode, sharpness?: Node<any>, denoise?: Node<bool>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSharpenNode: boolean;
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * Sharpening strength. 0 = maximum, 2 = none.
     *
     * @type {Node<float>}
     * @default 0.2
     */
    sharpness: Node<any>;
    /**
     * Whether to attenuate sharpening in noisy areas.
     *
     * @type {Node<bool>}
     * @default false
     */
    denoise: Node<bool>;
    /**
     * The render target for the sharpening pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTarget;
    /**
     * The result of the effect as a texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * The material for the sharpening pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _material;
    /**
     * Sets the output size of the effect.
     *
     * @param {number} width - The width in pixels.
     * @param {number} height - The height in pixels.
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
}
import { TempNode } from 'three/webgpu';
