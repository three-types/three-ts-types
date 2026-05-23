export default SSSNode;
export function sss(depthNode: TextureNode, camera: Camera, mainLight: DirectionalLight): SSSNode;
/**
 * Post processing node for applying Screen-Space Shadows (SSS) to a scene.
 *
 * Screen-Space Shadows (also known as Contact Shadows) should ideally be used to complement
 * traditional shadow maps. They are best suited for rendering detailed shadows of smaller
 * objects at a closer scale like intricate shadowing on highly detailed models. In other words:
 * Use Shadow Maps for the foundation and Screen-Space Shadows for the details.
 *
 * The shadows produced by this implementation might have too hard edges for certain use cases.
 * Use a box, gaussian or hash blur to soften the edges before doing the composite with the
 * beauty pass. Code example:
 *
 * ```js
 * const sssPass = sss( scenePassDepth, camera, mainLight );
 *
 * const sssBlur = boxBlur( sssPass.r, { size: 2, separation: 1 } ); // optional blur
 * ```
 *
 * Limitations:
 *
 * - Ideally the maximum shadow length should not exceed `1` meter. Otherwise the effect gets
 * computationally very expensive since more samples during the ray marching process are evaluated.
 * You can mitigate this issue by reducing the `quality` paramter.
 * - The effect can only be used with a single directional light, the main light of your scene.
 * This main light usually represents the sun or daylight.
 * - Like other Screen-Space techniques SSS can only honor objects in the shadowing computation that
 * are currently visible within the camera's view.
 *
 * References:
 * - {@link https://panoskarabelas.com/posts/screen_space_shadows/}.
 * - {@link https://www.bendstudio.com/blog/inside-bend-screen-space-shadows/}.
 *
 * @augments TempNode
 * @three_import import { sss } from 'three/addons/tsl/display/SSSNode.js';
 */
declare class SSSNode extends TempNode {
    /**
     * Constructs a new SSS node.
     *
     * @param {TextureNode} depthNode - A texture node that represents the scene's depth.
     * @param {Camera} camera - The camera the scene is rendered with.
     * @param {DirectionalLight} mainLight - The main directional light of the scene.
     */
    constructor(depthNode: TextureNode, camera: Camera, mainLight: DirectionalLight);
    /**
     * A node that represents the beauty pass's depth.
     *
     * @type {TextureNode}
     */
    depthNode: TextureNode;
    /**
     * Maximum shadow length in world units. Longer shadows result in more computational
     * overhead.
     *
     * @type {UniformNode<float>}
     * @default 0.1
     */
    maxDistance: UniformNode<any>;
    /**
     * Depth testing thickness.
     *
     * @type {UniformNode<float>}
     * @default 0.01
     */
    thickness: UniformNode<any>;
    /**
     * Shadow intensity. Must be in the range `[0, 1]`.
     *
     * @type {UniformNode<float>}
     * @default 1.0
     */
    shadowIntensity: UniformNode<any>;
    /**
     * This parameter controls how detailed the raymarching process works.
     * The value ranges is `[0,1]` where `1` means best quality (the maximum number
     * of raymarching iterations/samples) and `0` means no samples at all.
     *
     * A quality of `0.5` is usually sufficient for most use cases. Try to keep
     * this parameter as low as possible. Larger values result in noticeable more
     * overhead.
     *
     * @type {UniformNode<float>}
     * @default 0.5
     */
    quality: UniformNode<any>;
    /**
     * The resolution scale. Valid values are in the range
     * `[0,1]`. `1` means best quality but also results in
     * more computational overhead. Setting to `0.5` means
     * the effect is computed in half-resolution.
     *
     * @type {number}
     * @default 1
     */
    resolutionScale: number;
    /**
     * Whether to use temporal filtering or not. Setting this property to
     * `true` requires the usage of `TRAANode`. This will help to reduce noice
     * although it introduces typical TAA artifacts like ghosting and temporal
     * instabilities.
     *
     * @type {boolean}
     * @default false
     */
    useTemporalFiltering: boolean;
    /**
     * Represents the view matrix of the scene's camera.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraViewMatrix;
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
     * The resolution of the pass.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _resolution;
    /**
     * Temporal offset added to the initial ray step.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _temporalOffset;
    /**
     * The frame ID use when temporal filtering is enabled.
     *
     * @private
     * @type {UniformNode<uint>}
     */
    private _frameId;
    /**
     * A reference to the scene's main light.
     *
     * @private
     * @type {DirectionalLight}
     */
    private _mainLight;
    /**
     * The camera the scene is rendered with.
     *
     * @private
     * @type {Camera}
     */
    private _camera;
    /**
     * The render target the SSS is rendered into.
     *
     * @private
     * @type {RenderTarget}
     */
    private _sssRenderTarget;
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
