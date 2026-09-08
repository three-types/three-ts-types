export default GPUTextureViewDescriptor;
/**
 * Reusable descriptor for `GPUTexture.createView()`.
 *
 * @private
 */
declare class GPUTextureViewDescriptor {
    /**
     * The label of the texture view.
     *
     * @type {string}
     */
    label: string;
    /**
     * The format of the texture view.
     *
     * @type {string|undefined}
     */
    format: string | undefined;
    /**
     * The dimension of the texture view.
     *
     * @type {string|undefined}
     */
    dimension: string | undefined;
    /**
     * The allowed usages for the texture view.
     *
     * @type {number}
     * @default 0
     */
    usage: number;
    /**
     * Which aspect of the texture is referenced.
     *
     * @type {string}
     * @default 'all'
     */
    aspect: string;
    /**
     * The first mip level accessible to the texture view.
     *
     * @type {number}
     * @default 0
     */
    baseMipLevel: number;
    /**
     * The number of mip levels accessible to the texture view.
     *
     * @type {number|undefined}
     */
    mipLevelCount: number | undefined;
    /**
     * The first array layer accessible to the texture view.
     *
     * @type {number}
     * @default 0
     */
    baseArrayLayer: number;
    /**
     * The number of array layers accessible to the texture view.
     *
     * @type {number|undefined}
     */
    arrayLayerCount: number | undefined;
    /**
     * The component swizzle to apply when sampling the texture view.
     * Requires the `'texture-component-swizzle'` feature; ignored otherwise.
     *
     * @type {string}
     * @default 'rgba'
     */
    swizzle: string;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
