export default FSR1Node;
export function fsr1(node: Node<any>, sharpness?: (number | Node<any>), denoise?: (boolean | Node<bool>)): FSR1Node;
/**
 * Post processing node for applying AMD FidelityFX Super Resolution 1 (FSR 1).
 *
 * Combines two passes:
 * - **EASU** (Edge-Adaptive Spatial Upsampling): Uses 12 texture samples in a cross pattern
 *   to detect local edge direction, then shapes an approximate Lanczos2 kernel into an
 *   ellipse aligned with the detected edge.
 * - **RCAS** (Robust Contrast-Adaptive Sharpening): Uses a 5-tap cross pattern to apply
 *   contrast-aware sharpening that is automatically limited per-pixel to avoid artifacts.
 *
 * Note: Only use FSR 1 if your application is fragment-shader bound and cannot afford to render
 * at full resolution. FSR 1 adds its own overhead, so simply shaded scenes will render faster
 * at native resolution without it. Besides, FSR 1 should always be used with an anti-aliased
 * source image.
 *
 * Reference: {@link https://gpuopen.com/fidelityfx-superresolution/}.
 *
 * @augments TempNode
 * @three_import import { fsr1 } from 'three/addons/tsl/display/fsr1/FSR1Node.js';
 */
declare class FSR1Node extends TempNode {
    /**
     * Constructs a new FSR 1 node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node<float>} [sharpness=0.2] - RCAS sharpening strength. 0 = maximum sharpening, 2 = no sharpening.
     * @param {Node<bool>} [denoise=false] - Whether to attenuate RCAS sharpening in noisy areas.
     */
    constructor(textureNode: TextureNode, sharpness?: Node<any>, denoise?: Node<bool>);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * RCAS sharpening strength. 0 = maximum, 2 = none.
     *
     * @type {Node<float>}
     */
    sharpness: Node<any>;
    /**
     * Whether to attenuate RCAS sharpening in noisy areas.
     *
     * @type {Node<bool>}
     */
    denoise: Node<bool>;
    /**
     * The render target for the EASU upscale pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _easuRT;
    /**
     * The render target for the RCAS sharpen pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _rcasRT;
    /**
     * The result of the effect as a texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * The material for the EASU pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _easuMaterial;
    /**
     * The material for the RCAS pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _rcasMaterial;
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
