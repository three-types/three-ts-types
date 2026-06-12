/**
 * A class that creates an stereo effect.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link StereoPassNode}.
 *
 * @three_import import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
 */
export class StereoEffect {
    /**
     * Constructs a new stereo effect.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    constructor(renderer: WebGLRenderer);
    /**
     * Sets the given eye separation.
     *
     * @param {number} eyeSep - The eye separation to set.
     */
    setEyeSeparation: (eyeSep: number) => void;
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
}
