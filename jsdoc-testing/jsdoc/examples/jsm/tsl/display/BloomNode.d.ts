export function bloom(node: Node<any>, strength?: number, radius?: number, threshold?: number): BloomNode;
export default BloomNode;
/**
 * Post processing node for creating a bloom effect.
 * ```js
 * const renderPipeline = new THREE.RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 * const scenePassColor = scenePass.getTextureNode( 'output' );
 *
 * const bloomPass = bloom( scenePassColor );
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
 * const bloomPass = bloom( emissivePass );
 * renderPipeline.outputNode = scenePassColor.add( bloomPass );
 * ```
 * @augments TempNode
 * @three_import import { bloom } from 'three/addons/tsl/display/BloomNode.js';
 */
declare class BloomNode extends TempNode {
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
     * An array that holds the render targets for the horizontal blur passes.
     *
     * @private
     * @type {Array<RenderTarget>}
     */
    private _renderTargetsHorizontal;
    /**
     * An array that holds the render targets for the vertical blur passes.
     *
     * @private
     * @type {Array<RenderTarget>}
     */
    private _renderTargetsVertical;
    /**
     * The number if blur mips.
     *
     * @private
     * @type {number}
     */
    private _nMips;
    /**
     * The render target for the luminance pass.
     *
     * @private
     * @type {RenderTarget}
     */
    private _renderTargetBright;
    /**
     * The material for the composite pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _compositeMaterial;
    /**
     * The material for the luminance pass.
     *
     * @private
     * @type {?NodeMaterial}
     */
    private _highPassFilterMaterial;
    /**
     * The materials for the blur pass.
     *
     * @private
     * @type {Array<NodeMaterial>}
     */
    private _separableBlurMaterials;
    /**
     * The result of the luminance pass as a texture node for further processing.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeBright;
    /**
     * The result of the first blur pass as a texture node for further processing.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeBlur0;
    /**
     * The result of the second blur pass as a texture node for further processing.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeBlur1;
    /**
     * The result of the third blur pass as a texture node for further processing.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeBlur2;
    /**
     * The result of the fourth blur pass as a texture node for further processing.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeBlur3;
    /**
     * The result of the fifth blur pass as a texture node for further processing.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNodeBlur4;
    /**
     * The result of the effect is represented as a separate texture node.
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
     * @return {BloomNode} A reference to this node.
     */
    setResolutionScale(resolutionScale: number): BloomNode;
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
     * Create a separable blur material for the given kernel radius.
     *
     * @private
     * @param {NodeBuilder} builder - The current node builder.
     * @param {number} kernelRadius - The kernel radius.
     * @return {NodeMaterial}
     */
    private _getSeparableBlurMaterial;
}
import { TempNode } from 'three/webgpu';
