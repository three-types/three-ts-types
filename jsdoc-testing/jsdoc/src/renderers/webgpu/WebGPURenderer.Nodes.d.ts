export default WebGPURenderer;
/**
 * This alternative version of {@link WebGPURenderer} only supports node materials.
 * So classes like `MeshBasicMaterial` are not compatible.
 *
 * @private
 * @augments Renderer
 */
declare class WebGPURenderer extends Renderer {
    /**
     * Constructs a new WebGPU renderer.
     *
     * @param {WebGPURenderer~Options} [parameters] - The configuration parameter.
     */
    constructor(parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGPURenderer: boolean;
}
import Renderer from '../common/Renderer.js';
