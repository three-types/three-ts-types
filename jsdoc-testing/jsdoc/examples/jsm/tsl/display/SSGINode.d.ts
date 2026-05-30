export default SSGINode;
export function ssgi(beautyNode: TextureNode, depthNode: TextureNode, normalNode: TextureNode, camera: Camera): SSGINode;
/**
 * Post processing node for applying Screen Space Global Illumination (SSGI) to a scene.
 *
 * References:
 * - {@link https://github.com/cdrinmatane/SSRT3}.
 * - {@link https://cdrinmatane.github.io/posts/ssaovb-code/}.
 * - {@link https://cdrinmatane.github.io/cgspotlight-slides/ssilvb_slides.pdf}.
 *
 * The quality and performance of the effect mainly depend on `sliceCount` and `stepCount`.
 * The total number of samples taken per pixel is `sliceCount` * `stepCount` * `2`. Here are some
 * recommended presets depending on whether temporal filtering is used or not.
 *
 * With temporal filtering (recommended):
 *
 * - Low: `sliceCount` of `1`, `stepCount` of `12`.
 * - Medium: `sliceCount` of `2`, `stepCount` of `8`.
 * - High: `sliceCount` of `3`, `stepCount` of `16`.
 *
 * Use for a higher slice count if you notice temporal instabilities like flickering. Reduce the sample
 * count then to mitigate the performance lost.
 *
 * Without temporal filtering:
 *
 * - Low: `sliceCount` of `2`, `stepCount` of `6`.
 * - Medium: `sliceCount` of `3`, `stepCount` of `8`.
 * - High: `sliceCount` of `4`, `stepCount` of `12`.
 *
 * @augments TempNode
 * @three_import import { ssgi } from 'three/addons/tsl/display/SSGINode.js';
 */
declare class SSGINode extends TempNode {
    /**
     * Constructs a new SSGI node.
     *
     * @param {TextureNode} beautyNode - A texture node that represents the beauty or scene pass.
     * @param {TextureNode} depthNode - A texture node that represents the scene's depth.
     * @param {TextureNode} normalNode - A texture node that represents the scene's normals.
     * @param {PerspectiveCamera} camera - The camera the scene is rendered with.
     */
    constructor(beautyNode: TextureNode, depthNode: TextureNode, normalNode: TextureNode, camera: PerspectiveCamera);
    /**
     * A texture node that represents the beauty or scene pass.
     *
     * @type {TextureNode}
     */
    beautyNode: TextureNode;
    /**
     * A node that represents the scene's depth.
     *
     * @type {TextureNode}
     */
    depthNode: TextureNode;
    /**
     * A node that represents the scene's normals. If no normals are passed to the
     * constructor (because MRT is not available), normals can be automatically
     * reconstructed from depth values in the shader.
     *
     * @type {TextureNode}
     */
    normalNode: TextureNode;
    /**
     * Number of per-pixel hemisphere slices. This has a big performance cost and should be kept as low as possible.
     * Should be in the range `[1, 4]`.
     *
     * @type {UniformNode<uint>}
     * @default 1
     */
    sliceCount: UniformNode<any>;
    /**
     * Number of samples taken along one side of a given hemisphere slice. This has a big performance cost and should
     * be kept as low as possible.  Should be in the range `[1, 32]`.
     *
     * @type {UniformNode<uint>}
     * @default 12
     */
    stepCount: UniformNode<any>;
    /**
     * Power function applied to AO to make it appear darker/lighter. Should be in the range `[0, 4]`.
     *
     * @type {UniformNode<float>}
     * @default 1
     */
    aoIntensity: UniformNode<any>;
    /**
     * Intensity of the indirect diffuse light. Should be in the range `[0, 100]`.
     *
     * @type {UniformNode<float>}
     * @default 10
     */
    giIntensity: UniformNode<any>;
    /**
     * Effective sampling radius in world space. AO and GI can only have influence within that radius.
     * Should be in the range `[1, 25]`.
     *
     * @type {UniformNode<float>}
     * @default 12
     */
    radius: UniformNode<any>;
    /**
     * Makes the sample distance in screen space instead of world-space (helps having more detail up close).
     *
     * @type {UniformNode<bool>}
     * @default false
     */
    useScreenSpaceSampling: UniformNode<any>;
    /**
     * Controls samples distribution. It's an exponent applied at each step get increasing step size over the distance.
     * Should be in the range `[1, 3]`.
     *
     * @type {UniformNode<float>}
     * @default 2
     */
    expFactor: UniformNode<any>;
    /**
     * Constant thickness value of objects on the screen in world units. Allows light to pass behind surfaces past that thickness value.
     * Should be in the range `[0.01, 10]`.
     *
     * @type {UniformNode<float>}
     * @default 1
     */
    thickness: UniformNode<any>;
    /**
     * Whether to increase thickness linearly over distance or not (avoid losing detail over the distance).
     *
     * @type {UniformNode<bool>}
     * @default false
     */
    useLinearThickness: UniformNode<any>;
    /**
     * How much light backface surfaces emit.
     * Should be in the range `[0, 1]`.
     *
     * @type {UniformNode<float>}
     * @default 0
     */
    backfaceLighting: UniformNode<any>;
    /**
     * Whether to use temporal filtering or not. Setting this property to
     * `true` requires the usage of `TRAANode`. This will help to reduce noise
     * although it introduces typical TAA artifacts like ghosting and temporal
     * instabilities.
     *
     * If setting this property to `false`, a manual denoise via `DenoiseNode`
     * is required.
     *
     * @type {boolean}
     * @default true
     */
    useTemporalFiltering: boolean;
    /**
     * The resolution of the effect.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _resolution;
    /**
     * Used to compute the effective step radius when viewSpaceSampling is `false`.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _halfProjScale;
    /**
     * Temporal direction that influences the rotation angle for each slice.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _temporalDirection;
    /**
     * Temporal offset added to the initial ray step.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _temporalOffset;
    /**
     * Represents the projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrix;
    /**
     * Represents the inverse projection matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrixInverse;
    /**
     * Represents the near value of the scene's camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _cameraNear;
    /**
     * Represents the far value of the scene's camera.
     *
     * @private
     * @type {ReferenceNode<float>}
     */
    private _cameraFar;
    /**
     * A reference to the scene's camera.
     *
     * @private
     * @type {PerspectiveCamera}
     */
    private _camera;
    /**
     * The render target the GI is rendered into.
     *
     * @private
     * @type {RenderTarget}
     */
    private _ssgiRenderTarget;
    /**
     * The material that is used to render the effect.
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
