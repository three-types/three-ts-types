/**
 * A special type of render pass for implementing transition effects.
 * When active, the pass will transition from scene A to scene B.
 *
 * ```js
 * const renderTransitionPass = new RenderTransitionPass( fxSceneA.scene, fxSceneA.camera, fxSceneB.scene, fxSceneB.camera );
 * renderTransitionPass.setTexture( textures[ 0 ] );
 * composer.addPass( renderTransitionPass );
 * ```
 *
 * @augments Pass
 * @three_import import { RenderTransitionPass } from 'three/addons/postprocessing/RenderTransitionPass.js';
 */
export class RenderTransitionPass extends Pass {
    /**
     * Constructs a render transition pass.
     *
     * @param {Scene} sceneA - The first scene.
     * @param {Camera} cameraA - The camera of the first scene.
     * @param {Scene} sceneB - The second scene.
     * @param {Camera} cameraB - The camera of the second scene.
     */
    constructor(sceneA: Scene, cameraA: Camera, sceneB: Scene, cameraB: Camera);
    /**
     * The first scene.
     *
     * @type {Scene}
     */
    sceneA: Scene;
    /**
     * The camera of the first scene.
     *
     * @type {Camera}
     */
    cameraA: Camera;
    /**
     * The second scene.
     *
     * @type {Scene}
     */
    sceneB: Scene;
    /**
     * The camera of the second scene.
     *
     * @type {Camera}
     */
    cameraB: Camera;
    /**
     * The pass material.
     *
     * @type {ShaderMaterial}
     */
    material: ShaderMaterial;
    _renderTargetA: WebGLRenderTarget;
    _renderTargetB: WebGLRenderTarget;
    _fsQuad: FullScreenQuad;
    /**
     * Sets the transition factor. Must be in the range `[0,1]`.
     * This value determines to what degree both scenes are mixed.
     *
     * @param {boolean|number} value - The transition factor.
     */
    setTransition(value: boolean | number): void;
    /**
     * Toggles the usage of a texture for the effect.
     *
     * @param {boolean} value - Whether to use a texture for the transition effect or not.
     */
    useTexture(value: boolean): void;
    /**
     * Sets the effect texture.
     *
     * @param {Texture} value - The effect texture.
     */
    setTexture(value: Texture): void;
    /**
     * Sets the texture threshold. This value defines how strong the texture effects
     * the transition. Must be in the range `[0,1]` (0 means full effect, 1 means no effect).
     *
     * @param {boolean|number} value - The threshold value.
     */
    setTextureThreshold(value: boolean | number): void;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Performs the transition pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget): void;
    _createMaterial(): ShaderMaterial;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { WebGLRenderTarget } from 'three';
import { FullScreenQuad } from './Pass.js';
