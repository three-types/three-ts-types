export default TAAUNode;
export function taau(beautyNode: TextureNode, depthNode: TextureNode, velocityNode: TextureNode, camera: Camera): TAAUNode;
/**
 * A special node that performs Temporal Anti-Aliasing Upscaling (TAAU).
 *
 * Like TRAA, the node accumulates jittered samples over multiple frames and
 * reprojects history with motion vectors. Unlike TRAA, the input buffers
 * (beauty, depth, velocity) are expected to be rendered at a lower resolution
 * than the renderer's drawing buffer — typically by lowering the upstream
 * pass's resolution via {@link PassNode#setResolutionScale} — and the resolve
 * pass reconstructs an output-resolution image using a 9-tap Blackman-Harris
 * filter (Gaussian approximation) over the jittered input samples. The result
 * is an alternative to FSR2/3 that does anti-aliasing and upscaling in a
 * single pass.
 *
 * References:
 * - Karis, "High Quality Temporal Supersampling", SIGGRAPH 2014, {@link https://advances.realtimerendering.com/s2014/}
 * - Riley/Arcila, FidelityFX Super Resolution 2, GDC 2022, {@link https://gpuopen.com/download/GDC_FidelityFX_Super_Resolution_2_0.pdf}
 *
 * Note: MSAA must be disabled when TAAU is in use.
 *
 * @augments TempNode
 * @three_import import { taau } from 'three/addons/tsl/display/TAAUNode.js';
 */
declare class TAAUNode extends TempNode {
    /**
     * Constructs a new TAAU node.
     *
     * @param {TextureNode} beautyNode - The texture node that represents the input of the effect.
     * @param {TextureNode} depthNode - A node that represents the scene's depth.
     * @param {TextureNode} velocityNode - A node that represents the scene's velocity.
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    constructor(beautyNode: TextureNode, depthNode: TextureNode, velocityNode: TextureNode, camera: Camera);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTAAUNode: boolean;
    /**
     * The texture node that represents the input of the effect.
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
     * A node that represents the scene's velocity.
     *
     * @type {TextureNode}
     */
    velocityNode: TextureNode;
    /**
     * The camera the scene is rendered with.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * When the difference between the current and previous depth goes above this threshold,
     * the history is considered invalid.
     *
     * @type {number}
     * @default 0.0005
     */
    depthThreshold: number;
    /**
     * The depth difference within the 3×3 neighborhood to consider a pixel as an edge.
     *
     * @type {number}
     * @default 0.001
     */
    edgeDepthDiff: number;
    /**
     * The history becomes invalid as the pixel length of the velocity approaches this value.
     *
     * @type {number}
     * @default 128
     */
    maxVelocityLength: number;
    /**
     * Baseline weight applied to the current frame in the resolve. Lower
     * values produce smoother results with longer accumulation but slower
     * convergence on disoccluded regions; the motion factor is added on
     * top, so fast-moving pixels still respond quickly.
     *
     * @type {number}
     * @default 0.025
     */
    currentFrameWeight: number;
    /**
     * The jitter index selects the current camera offset value.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _jitterIndex;
    /**
     * A uniform node holding the current jitter offset in input-pixel
     * units. The shader needs this to know where each input sample was
     * actually rendered when computing per-tap reconstruction weights.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _jitterOffset;
    /**
     * The render target that represents the history of frame data.
     * Sized to the renderer's drawing buffer (the output resolution).
     *
     * @private
     * @type {?RenderTarget}
     */
    private _historyRenderTarget;
    /**
     * The render target for the resolve. Sized to the renderer's drawing
     * buffer (the output resolution).
     *
     * @private
     * @type {?RenderTarget}
     */
    private _resolveRenderTarget;
    /**
     * Render target whose depth attachment holds the previous frame's
     * depth buffer. The depth texture must be owned by a render target
     * so that `copyTextureToTexture` can copy into it on the WebGL
     * backend, which uses a framebuffer blit and therefore needs the
     * destination depth texture to be attached to a framebuffer. This
     * render target is sized independently of the history target so it
     * can match the (lower-resolution) input depth texture.
     *
     * @private
     * @type {RenderTarget}
     */
    private _previousDepthRenderTarget;
    /**
     * Material used for the resolve step.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _resolveMaterial;
    /**
     * Material used to seed the history render target on resize. It
     * performs a bilinear upscale of the current beauty buffer into the
     * output-sized history target so that the first frames after a
     * resize do not fade in from black.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _seedMaterial;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * Used to save the original/unjittered projection matrix.
     *
     * @private
     * @type {Matrix4}
     */
    private _originalProjectionMatrix;
    /**
     * A uniform node holding the camera's near and far.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _cameraNearFar;
    /**
     * A uniform node holding the camera world matrix.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraWorldMatrix;
    /**
     * A uniform node holding the camera world matrix inverse.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraWorldMatrixInverse;
    /**
     * A uniform node holding the camera projection matrix inverse.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _cameraProjectionMatrixInverse;
    /**
     * A uniform node holding the previous frame's view matrix.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _previousCameraWorldMatrix;
    /**
     * A uniform node holding the previous frame's projection matrix inverse.
     *
     * @private
     * @type {UniformNode<mat4>}
     */
    private _previousCameraProjectionMatrixInverse;
    /**
     * A texture node for the previous depth buffer.
     *
     * @private
     * @type {TextureNode}
     */
    private _previousDepthNode;
    /**
     * Sync the post processing stack with the TAAU node.
     *
     * @private
     * @type {boolean}
     */
    private _needsPostProcessingSync;
    /**
     * Returns the result of the effect as a texture node.
     *
     * @return {PassTextureNode} A texture node that represents the result of the effect.
     */
    getTextureNode(): PassTextureNode;
    /**
     * Sets the output size of the effect (history and resolve targets). The
     * previous-depth texture is sized independently in `updateBefore()` to
     * track the scene's current depth texture.
     *
     * @param {number} outputWidth - The output width (drawing buffer width).
     * @param {number} outputHeight - The output height (drawing buffer height).
     */
    setSize(outputWidth: number, outputHeight: number): void;
    /**
     * Defines the TAAU's current jitter as a view offset to the scene's
     * camera. The jitter is shrunk to one *output* pixel (rather than one
     * input pixel) so that the halton sequence gradually fills the output
     * sub-pixel grid over multiple frames.
     *
     * @param {number} inputWidth - The width of the input buffers the camera renders into.
     * @param {number} inputHeight - The height of the input buffers the camera renders into.
     */
    setViewOffset(inputWidth: number, inputHeight: number): void;
    /**
     * Clears the view offset from the scene's camera.
     */
    clearViewOffset(): void;
    /**
     * This method is used to render the effect once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * This method is used to setup the effect's render targets and TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {PassTextureNode}
     */
    setup(builder: NodeBuilder): PassTextureNode;
}
import { TempNode } from 'three/webgpu';
