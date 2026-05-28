export default SSRNode;
export function ssr(colorNode: Node<any>, depthNode: Node<any>, normalNode: Node<any>, metalnessNode: Node<any>, roughnessNode?: Node<any> | null, camera?: Camera | null): SSRNode;
/**
 * Post processing node for computing screen space reflections (SSR).
 *
 * Reference: {@link https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html}
 *
 * @augments TempNode
 * @three_import import { ssr } from 'three/addons/tsl/display/SSRNode.js';
 */
declare class SSRNode extends TempNode {
    /**
     * Constructs a new SSR node.
     *
     * @param {Node<vec4>} colorNode - The node that represents the beauty pass.
     * @param {Node<float>} depthNode - A node that represents the beauty pass's depth.
     * @param {Node<vec3>} normalNode - A node that represents the beauty pass's normals.
     * @param {Node<float>} metalnessNode - A node that represents the beauty pass's metalness.
     * @param {?Node<float>} [roughnessNode=null] - A node that represents the beauty pass's roughness.
     * @param {?Camera} [camera=null] - The camera the scene is rendered with.
     */
    constructor(colorNode: Node<any>, depthNode: Node<any>, normalNode: Node<any>, metalnessNode: Node<any>, roughnessNode?: Node<any> | null, camera?: Camera | null);
    /**
     * The node that represents the beauty pass.
     *
     * @type {Node<vec4>}
     */
    colorNode: Node<any>;
    /**
     * A node that represents the beauty pass's depth.
     *
     * @type {Node<float>}
     */
    depthNode: Node<any>;
    /**
     * A node that represents the beauty pass's normals.
     *
     * @type {Node<vec3>}
     */
    normalNode: Node<any>;
    /**
     * A node that represents the beauty pass's metalness.
     *
     * @type {Node<float>}
     */
    metalnessNode: Node<any>;
    /**
     * Whether the SSR reflections should be blurred or not. Blurring is a costly
     * operation so turn it off if you encounter performance issues on certain
     * devices.
     *
     * @private
     * @type {Node<float>}
     * @default false
     */
    private roughnessNode;
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
     * Controls how far a fragment can reflect. Increasing this value result in more
     * computational overhead but also increases the reflection distance.
     *
     * @type {UniformNode<float>}
     */
    maxDistance: UniformNode<any>;
    /**
     * Controls the cutoff between what counts as a possible reflection hit and what does not.
     *
     * @type {UniformNode<float>}
     */
    thickness: UniformNode<any>;
    /**
     * Controls how the SSR reflections are blended with the beauty pass.
     *
     * @type {UniformNode<float>}
     */
    opacity: UniformNode<any>;
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
     */
    quality: UniformNode<any>;
    /**
     * The quality of the blur. Must be an integer in the range `[1,3]`.
     *
     * @type {UniformNode<int>}
     */
    blurQuality: UniformNode<any>;
    /**
     * The camera the scene is rendered with.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The spread of the blur. Automatically set when generating mips.
     *
     * @private
     * @type {UniformNode<int>}
     */
    private _blurSpread;
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
     * Whether the scene's camera is perspective or orthographic.
     *
     * @private
     * @type {UniformNode<bool>}
     */
    private _isPerspectiveCamera;
    /**
     * The resolution of the pass.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _resolution;
    /**
     * The render target the SSR is rendered into.
     *
     * @private
     * @type {RenderTarget}
     */
    private _ssrRenderTarget;
    /**
     * The render target for the blurred SSR reflections.
     *
     * @private
     * @type {RenderTarget}
     */
    private _blurRenderTarget;
    /**
     * The material that is used to render the effect.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _ssrMaterial;
    /**
     * The blur material.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _blurMaterial;
    /**
     * The copy material.
     *
     * @private
     * @type {NodeMaterial}
     */
    private _copyMaterial;
    /**
     * The result of the effect is represented as a separate texture node.
     *
     * @private
     * @type {PassTextureNode}
     */
    private _textureNode;
    /**
     * Holds the blurred SSR reflections.
     *
     * @private
     * @type {?PassTextureNode}
     */
    private _blurredTextureNode;
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
