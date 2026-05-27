/**
 * Abstract base class for all post processing passes.
 *
 * This module is only relevant for post processing with {@link WebGLRenderer}.
 *
 * @abstract
 * @three_import import { Pass } from 'three/addons/postprocessing/Pass.js';
 */
export class Pass {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPass: boolean;
    /**
     * If set to `true`, the pass is processed by the composer.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * If set to `true`, the pass indicates to swap read and write buffer after rendering.
     *
     * @type {boolean}
     * @default true
     */
    needsSwap: boolean;
    /**
     * If set to `true`, the pass clears its buffer before rendering
     *
     * @type {boolean}
     * @default false
     */
    clear: boolean;
    /**
     * If set to `true`, the result of the pass is rendered to screen. The last pass in the composers
     * pass chain gets automatically rendered to screen, no matter how this property is configured.
     *
     * @type {boolean}
     * @default false
     */
    renderToScreen: boolean;
    /**
     * Sets the size of the pass.
     *
     * @abstract
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(): void;
    /**
     * This method holds the render logic of a pass. It must be implemented in all derived classes.
     *
     * @abstract
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the pass is no longer used in your app.
     *
     * @abstract
     */
    dispose(): void;
}
/**
 * This module is a helper for passes which need to render a full
 * screen effect which is quite common in context of post processing.
 *
 * The intended usage is to reuse a single full screen quad for rendering
 * subsequent passes by just reassigning the `material` reference.
 *
 * This module can only be used with {@link WebGLRenderer}.
 *
 * @augments Mesh
 * @three_import import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
 */
export class FullScreenQuad {
    /**
     * Constructs a new full screen quad.
     *
     * @param {?Material} material - The material to render te full screen quad with.
     */
    constructor(material: Material | null);
    _mesh: Mesh;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the instance is no longer used in your app.
     */
    dispose(): void;
    /**
     * Renders the full screen quad.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    render(renderer: WebGLRenderer): void;
    set material(value: Material | null);
    /**
     * The quad's material.
     *
     * @type {?Material}
     */
    get material(): Material | null;
}
import { Mesh } from 'three';
