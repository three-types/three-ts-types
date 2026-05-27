/**
 * Renders a sphere to visualize a light probe in the scene.
 *
 * This helper can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, import from `LightProbeHelperGPU.js`.
 *
 * ```js
 * const helper = new LightProbeHelper( lightProbe );
 * scene.add( helper );
 * ```
 *
 * @augments Mesh
 * @three_import import { LightProbeHelper } from 'three/addons/helpers/LightProbeHelper.js';
 */
export class LightProbeHelper extends Mesh {
    /**
     * Constructs a new light probe helper.
     *
     * @param {LightProbe} lightProbe - The light probe to visualize.
     * @param {number} [size=1] - The size of the helper.
     */
    constructor(lightProbe: LightProbe, size?: number);
    /**
     * The light probe to visualize.
     *
     * @type {LightProbe}
     */
    lightProbe: LightProbe;
    /**
     * The size of the helper.
     *
     * @type {number}
     * @default 1
     */
    size: number;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Mesh } from 'three';
