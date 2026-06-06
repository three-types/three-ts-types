export default WebGPURenderer;
/**
 * This renderer is the new alternative of `WebGLRenderer`. `WebGPURenderer` has the ability
 * to target different backends. By default, the renderer tries to use a WebGPU backend if the
 * browser supports WebGPU. If not, `WebGPURenderer` falls backs to a WebGL 2 backend.
 *
 * @augments Renderer
 */
declare class WebGPURenderer extends Renderer {
    /**
     * WebGPURenderer options.
     *
     * @typedef {Object} WebGPURenderer~Options
     * @property {boolean} [logarithmicDepthBuffer=false] - Whether logarithmic depth buffer is enabled or not.
     * @property {boolean} [reversedDepthBuffer=false] - Whether reversed depth buffer is enabled or not.
     * @property {boolean} [alpha=true] - Whether the default framebuffer (which represents the final contents of the canvas) should be transparent or opaque.
     * @property {boolean} [depth=true] - Whether the default framebuffer should have a depth buffer or not.
     * @property {boolean} [stencil=false] - Whether the default framebuffer should have a stencil buffer or not.
     * @property {boolean} [antialias=false] - Whether MSAA as the default anti-aliasing should be enabled or not.
     * @property {number} [samples=0] - When `antialias` is `true`, `4` samples are used by default. Set this parameter to any other integer value than 0 to overwrite the default.
     * @property {boolean} [forceWebGL=false] - If set to `true`, the renderer uses a WebGL 2 backend no matter if WebGPU is supported or not.
     * @property {boolean} [multiview=false] - If set to `true`, the renderer will use multiview during WebXR rendering if supported.
     * @property {number} [outputType=undefined] - Texture type for output to canvas. By default, device's preferred format is used; other formats may incur overhead.
     * @property {number} [outputBufferType=HalfFloatType] - Defines the type of output buffers. The default `HalfFloatType` is recommend for best
     * quality. To save memory and bandwidth, `UnsignedByteType` might be used. This will reduce rendering quality though.
     */
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
