/**
 * Maps the current frame to the previous one, for effects that reuse data of the
 * previous frame like temporal anti-aliasing, denoising or reflections.
 *
 * It holds the previous frame's depth and camera matrices for validating the history.
 *
 * Note: This class can only be used with `WebGPURenderer`.
 *
 * @private
 */
export class Reprojection {
    /**
     * Constructs a new reprojection.
     *
     * @param {TextureNode} depthNode - The scene's depth.
     * @param {TextureNode} velocityNode - The scene's velocity.
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    constructor(depthNode: TextureNode, velocityNode: TextureNode, camera: Camera);
    /**
     * The scene's depth.
     *
     * @type {TextureNode}
     */
    depthNode: TextureNode;
    /**
     * The scene's velocity.
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
     * The render target that holds the depth of the previous frame.
     *
     * @private
     * @type {RenderTarget}
     */
    private _previousDepthRenderTarget;
    /**
     * The previous frame's depth.
     *
     * @type {TextureNode}
     */
    previousDepthNode: TextureNode;
    /**
     * The camera's world matrix.
     *
     * @type {UniformNode<mat4>}
     */
    cameraWorldMatrix: UniformNode<mat4>;
    /**
     * The camera's view matrix.
     *
     * @type {UniformNode<mat4>}
     */
    cameraViewMatrix: UniformNode<mat4>;
    /**
     * The camera's projection matrix inverse.
     *
     * @type {UniformNode<mat4>}
     */
    cameraProjectionMatrixInverse: UniformNode<mat4>;
    /**
     * The previous frame's camera world matrix.
     *
     * @type {UniformNode<mat4>}
     */
    previousCameraWorldMatrix: UniformNode<mat4>;
    /**
     * The previous frame's camera view matrix.
     *
     * @type {UniformNode<mat4>}
     */
    previousCameraViewMatrix: UniformNode<mat4>;
    /**
     * The previous frame's camera projection matrix.
     *
     * @type {UniformNode<mat4>}
     */
    previousCameraProjectionMatrix: UniformNode<mat4>;
    /**
     * The previous frame's camera projection matrix inverse.
     *
     * @type {UniformNode<mat4>}
     */
    previousCameraProjectionMatrixInverse: UniformNode<mat4>;
    /**
     * Returns the UV the surface at the given UV had in the previous frame.
     *
     * @param {Node<vec2>} uvNode - The UV in the current frame.
     * @param {Node<ivec2>} texel - The texel to load the velocity from.
     * @return {Node<vec2>} The UV in the previous frame.
     */
    getHistoryUV(uvNode: Node<any>, texel: Node<ivec2>): Node<any>;
    /**
     * Samples the previous frame's depth at the given UV and reprojects it into the current view.
     *
     * @param {Node<vec2>} uvNode - The UV in the previous frame.
     * @param {Node<vec2>} cameraNearFar - The camera's near and far.
     * @return {Node<float>} The reprojected depth.
     */
    getPreviousDepth(uvNode: Node<any>, cameraNearFar: Node<any>): Node<float>;
    /**
     * Returns whether the stored depth has a different size, format or type from
     * the current depth. Check before rendering to restart incompatible history.
     *
     * @return {boolean} Whether the history needs to be reset.
     */
    needsHistoryReset(): boolean;
    /**
     * Stores the scene's depth and the camera matrices for the next frame. Call it
     * once per frame after the effect has rendered.
     *
     * @param {Renderer} renderer - The renderer.
     */
    update(renderer: Renderer): void;
    /**
     * Frees internal resources. This method should be called
     * when the reprojection is no longer required.
     */
    dispose(): void;
}
