export function dualKawaseBloom(node: Node<any>, strength?: number, radius?: number, threshold?: number): DualKawaseBloomNode;
export default DualKawaseBloomNode;
/**
 * Post processing node for creating a bloom effect.
 *
 * The bloom is produced with a Dual Kawase blur: the bright areas are
 * progressively downsampled with a 5-tap filter and then upsampled with an
 * 8-tap filter, accumulating the levels back together.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 *
 * const bloomPass = dualKawaseBloom( scenePassColor );
 *
 * renderPipeline.outputNode = scenePassColor.add( bloomPass );
 * ```
 * By default, the node affects the entire image. For a selective bloom,
 * use the `emissive` material property to control which objects should
 * contribute to bloom or not. This can be achieved via MRT.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 * scenePass.setMRT( mrt( {
 * 	output,
 * 	emissive
 * } ) );
 *
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 * const emissivePass = scenePass.getTextureNode( 'emissive' );
 *
 * const bloomPass = dualKawaseBloom( emissivePass );
 * renderPipeline.outputNode = scenePassColor.add( bloomPass );
 * ```
 * @augments TempNode
 * @three_import import { dualKawaseBloom } from 'three/addons/tsl/display/DualKawaseBloomNode.js';
 */
declare class DualKawaseBloomNode extends TempNode {
    /**
     * Constructs a new bloom node.
     *
     * @param {Node<vec4>} inputNode - The node that represents the input of the effect.
     * @param {number} [strength=1] - The strength of the bloom.
     * @param {number} [radius=0] - The radius of the bloom.
     * @param {number} [threshold=0] - The luminance threshold limits which bright areas contribute to the bloom effect.
     */
    constructor(inputNode: Node<any>, strength?: number, radius?: number, threshold?: number);
    /**
     * The node that represents the input of the effect.
     *
     * @type {Node<vec4>}
     */
    inputNode: Node<any>;
    /**
     * The strength of the bloom.
     *
     * @type {UniformNode<float>}
     */
    strength: UniformNode<any>;
    /**
     * The radius of the bloom. Must be in the range `[0,1]`.
     *
     * @type {UniformNode<float>}
     */
    radius: UniformNode<any>;
    /**
     * The luminance threshold limits which bright areas contribute to the bloom effect.
     *
     * @type {UniformNode<float>}
     */
    threshold: UniformNode<any>;
    /**
     * Can be used to tweak the extracted luminance from the scene.
     *
     * @type {UniformNode<float>}
     */
    smoothWidth: UniformNode<any>;
    /**
     * Scale factor for the internal render targets.
     *
     * @private
     * @type {number}
     * @default 0.5
     */
    private _resolutionScale;
    /**
     * Can be used to inject a custom high pass filter (e.g., for anamorphic effects).
     *
     * @type {Function}
     */
    highPassFn: Function;
    /**
     * The number of downsample / upsample levels in the Dual Kawase pyramid.
     *
     * @private
     * @type {number}
     */
    private _nMips;
    /**
     * Sample spread of the Dual Kawase filters. Kept small so each level's kernel
     * stays round (a wide offset makes the diamond sampling pattern visible as a
     * square halo); the bloom width comes from the depth of the pyramid instead.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _offset;
    /**
     * Per-level mixing factors, redistributed by `radius` between a tight and a wide bloom.
     * A linear ramp from `1.0` to `0.2` (mean `0.6`) keeps the total bloom energy constant
     * as `radius` shifts weight between the fine and coarse levels.
     *
     * @private
     * @type {Array<number>}
     */
    private _bloomFactors;
    /**
     * The render target for the luminance pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetBright;
    /**
     * The render targets for the downsample chain.
     *
     * @private
     * @type {Array<RenderTarget>}
     */
    private _downsampleRTs;
    /**
     * The render targets for the upsample / accumulation chain.
     *
     * @private
     * @type {Array<RenderTarget>}
     */
    private _accumRTs;
    /**
     * The resolution of each pyramid level.
     *
     * @private
     * @type {Array<Vector2>}
     */
    private _levelSizes;
    /**
     * The resolution of the bright pass.
     *
     * @private
     * @type {Vector2}
     */
    private _brightSize;
    /**
     * The material for the luminance pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _highPassFilterMaterial;
    /**
     * The material for the downsample pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _downsampleMaterial;
    /**
     * The material for the upsample / accumulation pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _upsampleMaterial;
    /**
     * The result of the effect is represented as a separate texture node.
     * The finest accumulation target holds the composited bloom.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureOutput;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * Sets the resolution scale for the pass.
     * The resolution scale is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolutionScale - The resolution scale to set. A value of `1` means full resolution.
     * @return {DualKawaseBloomNode} A reference to this node.
     */
    setResolutionScale(resolutionScale: number): DualKawaseBloomNode;
    /**
     * Gets the current resolution scale of the pass.
     *
     * @return {number} The current resolution scale. A value of `1` means full resolution.
     */
    getResolutionScale(): number;
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
     * Creates the Dual Kawase downsample material. Each output texel reads the
     * center plus four diagonal corners of the source.
     *
     * @private
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeMaterial}
     */
    private _getDownsampleMaterial;
    /**
     * Creates the Dual Kawase upsample material. Each output texel reads four
     * edge centers and four diagonal corners of the source, then accumulates the
     * matching downsample level weighted by `radius`.
     *
     * @private
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeMaterial}
     */
    private _getUpsampleMaterial;
}
import { TempNode } from 'three/webgpu';
