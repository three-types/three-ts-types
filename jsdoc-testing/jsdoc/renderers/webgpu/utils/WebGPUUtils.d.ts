export default WebGPUUtils;
/**
 * A WebGPU backend utility module with common helpers.
 *
 * @private
 */
declare class WebGPUUtils {
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
     * Returns the depth/stencil GPU format for the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {string} The depth/stencil GPU texture format.
     */
    getCurrentDepthStencilFormat(renderContext: RenderContext): string;
    /**
     * Returns the GPU format for the given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {string} The GPU texture format.
     */
    getTextureFormatGPU(texture: Texture): string;
    /**
     * Returns an object that defines the multi-sampling state of the given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {Object} The multi-sampling state.
     */
    getTextureSampleData(texture: Texture): Object;
    /**
     * Returns the default color attachment's GPU format of the current render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {string} The GPU texture format of the default color attachment.
     */
    getCurrentColorFormat(renderContext: RenderContext): string;
    /**
     * Returns the GPU formats of all color attachments of the current render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {Array<string>} The GPU texture formats of all color attachments.
     */
    getCurrentColorFormats(renderContext: RenderContext): Array<string>;
    /**
     * Returns the output color space of the current render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {string} The output color space.
     */
    getCurrentColorSpace(renderContext: RenderContext): string;
    /**
     * Returns GPU primitive topology for the given object and material.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Material} material - The material.
     * @return {string} The GPU primitive topology.
     */
    getPrimitiveTopology(object: Object3D, material: Material): string;
    /**
     * Returns a modified sample count from the given sample count value.
     *
     * That is required since WebGPU only supports either 1 or 4.
     *
     * @param {number} sampleCount - The input sample count.
     * @return {number} The (potentially updated) output sample count.
     */
    getSampleCount(sampleCount: number): number;
    /**
     * Returns the sample count of the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {number} The sample count.
     */
    getSampleCountRenderContext(renderContext: RenderContext): number;
    /**
     * Returns the preferred canvas format.
     *
     * There is a separate method for this so it's possible to
     * honor edge cases for specific devices.
     *
     * @return {string} The GPU texture format of the canvas.
     */
    getPreferredCanvasFormat(): string;
}
