export default WebGPUTexturePassUtils;
/**
 * A WebGPU backend utility module used by {@link WebGPUTextureUtils}.
 *
 * @private
 */
declare class WebGPUTexturePassUtils extends DataMap {
    /**
     * Constructs a new utility object.
     *
     * @param {GPUDevice} device - The WebGPU device.
     */
    constructor(device: GPUDevice);
    /**
     * The WebGPU device.
     *
     * @type {GPUDevice}
     */
    device: GPUDevice;
    /**
     * The mipmap GPU sampler.
     *
     * @type {GPUSampler}
     */
    mipmapSampler: GPUSampler;
    /**
     * The flipY GPU sampler.
     *
     * @type {GPUSampler}
     */
    flipYSampler: GPUSampler;
    /**
     * flip uniform buffer
     * @type {GPUBuffer}
     */
    flipUniformBuffer: GPUBuffer;
    /**
     * no flip uniform buffer
     * @type {GPUBuffer}
     */
    noFlipUniformBuffer: GPUBuffer;
    /**
     * A cache for GPU render pipelines used for copy/transfer passes.
     * Every texture format and textureBindingViewDimension combo requires a unique pipeline.
     *
     * @type {Object<string,GPURenderPipeline>}
     */
    transferPipelines: {
        [x: string]: GPURenderPipeline;
    };
    /**
     * The mipmap shader module.
     *
     * @type {GPUShaderModule}
     */
    mipmapShaderModule: GPUShaderModule;
    /**
     * Returns a render pipeline for the internal copy render pass. The pass
     * requires a unique render pipeline for each texture format.
     *
     * @param {string} format - The GPU texture format
     * @param {string?} textureBindingViewDimension - The GPU texture binding view dimension
     * @return {GPURenderPipeline} The GPU render pipeline.
     */
    getTransferPipeline(format: string, textureBindingViewDimension: string | null): GPURenderPipeline;
    /**
     * Flip the contents of the given GPU texture along its vertical axis.
     *
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {Object} textureGPUDescriptor - The texture descriptor.
     * @param {number} [baseArrayLayer=0] - The index of the first array layer accessible to the texture view.
     */
    flipY(textureGPU: GPUTexture, textureGPUDescriptor: Object, baseArrayLayer?: number): void;
    /**
     * Generates mipmaps for the given GPU texture.
     *
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {?GPUCommandEncoder} [encoder=null] - An optional command encoder used to generate mipmaps.
     */
    generateMipmaps(textureGPU: GPUTexture, encoder?: GPUCommandEncoder | null): void;
    /**
     * Since multiple copy render passes are required to generate mipmaps, the passes
     * are managed as render bundles to improve performance.
     *
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @return {Array<Object>} An array of render bundles.
     */
    _mipmapCreateBundles(textureGPU: GPUTexture): Array<Object>;
    /**
     * Executes the render bundles.
     *
     * @param {GPUCommandEncoder} commandEncoder - The GPU command encoder.
     * @param {Array<Object>} passes - An array of render bundles.
     */
    _mipmapRunBundles(commandEncoder: GPUCommandEncoder, passes: Array<Object>): void;
}
import DataMap from '../../common/DataMap.js';
