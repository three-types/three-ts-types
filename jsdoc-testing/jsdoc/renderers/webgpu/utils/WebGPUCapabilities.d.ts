export default WebGPUCapabilities;
/**
 * A WebGPU backend utility module for managing the device's capabilities.
 *
 * @private
 */
declare class WebGPUCapabilities {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * Returns the maximum anisotropy texture filtering value.
     *
     * @return {number} The maximum anisotropy texture filtering value.
     */
    getMaxAnisotropy(): number;
    /**
     * Returns the maximum number of bytes available for uniform buffers.
     *
     * @return {number} The maximum number of bytes available for uniform buffers.
     */
    getUniformBufferLimit(): number;
}
