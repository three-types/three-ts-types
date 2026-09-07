/**
 * A class that creates an parallax barrier effect.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link ParallaxBarrierPassNode}.
 *
 * @three_import import { ParallaxBarrierEffect } from 'three/addons/effects/ParallaxBarrierEffect.js';
 */
export class ParallaxBarrierEffect {
    /**
     * Constructs a new parallax barrier effect.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    constructor(renderer: WebGLRenderer);
    /**
     * Resizes the effect.
     *
     * @param {number} width - The width of the effect in logical pixels.
     * @param {number} height - The height of the effect in logical pixels.
     */
    setSize: (width: number, height: number) => void;
    /**
     * When using this effect, this method should be called instead of the
     * default {@link WebGLRenderer#render}.
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * Frees internal resources. This method should be called
     * when the effect is no longer required.
     */
    dispose: () => void;
}
