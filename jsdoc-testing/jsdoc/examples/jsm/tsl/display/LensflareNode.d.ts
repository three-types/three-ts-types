export default LensflareNode;
export function lensflare(node: TextureNode, params: {
    ghostTint?: Node<any> | Color;
    threshold?: Node<any> | number;
    ghostSamples?: Node<any> | number;
    ghostSpacing?: Node<any> | number;
    ghostAttenuationFactor?: Node<any> | number;
    downSampleRatio?: number | undefined;
}): LensflareNode;
/**
 * Post processing node for adding a bloom-based lens flare effect. This effect
 * requires that you extract the bloom of the scene via a bloom pass first.
 *
 * References:
 * - {@link https://john-chapman-graphics.blogspot.com/2013/02/pseudo-lens-flare.html}.
 * - {@link https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html}.
 *
 * @augments TempNode
 * @three_import import { lensflare } from 'three/addons/tsl/display/LensflareNode.js';
 */
declare class LensflareNode extends TempNode {
    /**
     * Constructs a new lens flare node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the scene's bloom.
     * @param {Object} params - The parameter object for configuring the effect.
     * @param {Node<vec3> | Color} [params.ghostTint=vec3(1, 1, 1)] - Defines the tint of the flare/ghosts.
     * @param {Node<float> | number} [params.threshold=float(0.5)] - Controls the size and strength of the effect. A higher threshold results in smaller flares.
     * @param {Node<float> | number} [params.ghostSamples=float(4)] - Represents the number of flares/ghosts per bright spot which pivot around the center.
     * @param {Node<float> | number} [params.ghostSpacing=float(0.25)] - Defines the spacing of the flares/ghosts.
     * @param {Node<float> | number} [params.ghostAttenuationFactor=float(25)] - Defines the attenuation factor of flares/ghosts.
     * @param {number} [params.downSampleRatio=4] - Defines how downsampling since the effect is usually not rendered at full resolution.
     */
    constructor(textureNode: TextureNode, params?: {
        ghostTint?: Node<any> | Color;
        threshold?: Node<any> | number;
        ghostSamples?: Node<any> | number;
        ghostSpacing?: Node<any> | number;
        ghostAttenuationFactor?: Node<any> | number;
        downSampleRatio?: number | undefined;
    });
    /**
     * The texture node that represents the scene's bloom.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * Defines the tint of the flare/ghosts.
     *
     * @type {Node<vec3>}
     */
    ghostTintNode: Node<any>;
    /**
     * Controls the size and strength of the effect. A higher threshold results in smaller flares.
     *
     * @type {Node<float>}
     */
    thresholdNode: Node<any>;
    /**
     * Represents the number of flares/ghosts per bright spot which pivot around the center.
     *
     * @type {Node<float>}
     */
    ghostSamplesNode: Node<any>;
    /**
     * Defines the spacing of the flares/ghosts.
     *
     * @type {Node<float>}
     */
    ghostSpacingNode: Node<any>;
    /**
     * Defines the attenuation factor of flares/ghosts.
     *
     * @type {Node<float>}
     */
    ghostAttenuationFactorNode: Node<any>;
    /**
     * Defines how downsampling since the effect is usually not rendered at full resolution.
     *
     * @type {number}
     */
    downSampleRatio: number;
    /**
     * The internal render target of the effect.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTarget;
    /**
     * The node material that holds the effect's TSL code.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _material;
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
}
import { TempNode } from 'three/webgpu';
