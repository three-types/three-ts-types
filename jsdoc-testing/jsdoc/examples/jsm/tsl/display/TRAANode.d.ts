export default TRAANode;
export function traa(beautyNode: TextureNode, depthNode: TextureNode, velocityNode: TextureNode, camera: Camera): TRAANode;
/**
 * A special node that applies TRAA (Temporal Reprojection Anti-Aliasing).
 *
 * References:
 * - {@link https://alextardif.com/TAA.html}
 * - {@link https://www.elopezr.com/temporal-aa-and-the-quest-for-the-holy-trail/}
 *
 * Note: MSAA must be disabled when TRAA is in use.
 *
 * @augments TempNode
 * @three_import import { traa } from 'three/addons/tsl/display/TRAANode.js';
 */
declare class TRAANode extends TempNode {
    /**
     * Constructs a new TRAA node.
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
    readonly isTRAANode: boolean;
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    beautyNode: TextureNode;
    /**
     * A node that represents the scene's velocity.
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
     * Whether to decrease the weight on the current frame when the velocity is more subpixel.
     * This reduces blurriness under motion, but can introduce a square pattern artifact.
     *
     * @type {boolean}
     * @default true
     */
    useSubpixelCorrection: boolean;
    /**
     * The jitter index selects the current camera offset value.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _jitterIndex;
    /**
     * A uniform node holding the inverse resolution value.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * The render target that represents the history of frame data.
     *
     * @private
     * @type {?RenderTarget}
     */
    private _historyRenderTarget;
    /**
     * The render target for the resolve.
     *
     * @private
     * @type {?RenderTarget}
     */
    private _resolveRenderTarget;
    /**
     * Material used for the resolve step.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _resolveMaterial;
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
     * Sync the post processing stack with the TRAA node.
     *
     * @private
     * @type {boolean}
     */
    private _needsPostProcessingSync;
    /**
     * The node used to render the scene's velocity.
     *
     * @private
     * @type {?VelocityNode}
     */
    private _velocityNode;
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
     * Defines the TRAA's current jitter as a view offset
     * to the scene's camera.
     *
     * @param {number} width - The width of the effect.
     * @param {number} height - The height of the effect.
     */
    setViewOffset(width: number, height: number): void;
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
