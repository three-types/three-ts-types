/**
 * This class represents a render pass. It takes a camera and a scene and produces
 * a beauty pass for subsequent post processing effects.
 *
 * ```js
 * const renderPass = new RenderPass( scene, camera );
 * composer.addPass( renderPass );
 * ```
 *
 * @augments Pass
 * @three_import import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
 */
export class RenderPass extends Pass {
    /**
     * Constructs a new render pass.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera.
     * @param {?Material} [overrideMaterial=null] - The override material. If set, this material is used
     * for all objects in the scene.
     * @param {?(number|Color|string)} [clearColor=null] - The clear color of the render pass.
     * @param {?number} [clearAlpha=null] - The clear alpha of the render pass.
     */
    constructor(scene: Scene, camera: Camera, overrideMaterial?: Material | null, clearColor?: (number | Color | string) | null, clearAlpha?: number | null);
    /**
     * The scene to render.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The override material. If set, this material is used
     * for all objects in the scene.
     *
     * @type {?Material}
     * @default null
     */
    overrideMaterial: Material | null;
    /**
     * The clear color of the render pass.
     *
     * @type {?(number|Color|string)}
     * @default null
     */
    clearColor: (number | Color | string) | null;
    /**
     * The clear alpha of the render pass.
     *
     * @type {?number}
     * @default null
     */
    clearAlpha: number | null;
    /**
     * If set to `true`, only the depth can be cleared when `clear` is to `false`.
     *
     * @type {boolean}
     * @default false
     */
    clearDepth: boolean;
    /**
     * This flag indicates that this pass renders the scene itself.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderPass: boolean;
    _oldClearColor: Color;
    /**
     * Performs a beauty pass with the configured scene and camera.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
}
import { Pass } from './Pass.js';
import { Color } from 'three';
