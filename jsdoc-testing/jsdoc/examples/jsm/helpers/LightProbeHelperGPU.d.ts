/**
 * Renders a sphere to visualize a light probe in the scene.
 *
 * This helper can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, import from `LightProbeHelper.js`.
 *
 * ```js
 * const helper = new LightProbeHelper( lightProbe );
 * scene.add( helper );
 * ```
 *
 * @private
 * @augments Mesh
 * @three_import import { LightProbeHelper } from 'three/addons/helpers/LightProbeHelperGPU.js';
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
    _intensity: import("three/webgpu").UniformNode;
    _sh: import("three/webgpu").UniformArrayNode;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Mesh } from 'three/webgpu';
