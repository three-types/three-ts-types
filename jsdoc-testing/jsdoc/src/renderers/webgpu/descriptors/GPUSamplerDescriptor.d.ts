export default GPUSamplerDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createSampler()`.
 *
 * @private
 */
declare class GPUSamplerDescriptor {
    /**
     * The label of the sampler.
     *
     * @type {string}
     */
    label: string;
    /**
     * The address mode for the sampler's U coordinate.
     *
     * @type {string}
     * @default 'clamp-to-edge'
     */
    addressModeU: string;
    /**
     * The address mode for the sampler's V coordinate.
     *
     * @type {string}
     * @default 'clamp-to-edge'
     */
    addressModeV: string;
    /**
     * The address mode for the sampler's W coordinate.
     *
     * @type {string}
     * @default 'clamp-to-edge'
     */
    addressModeW: string;
    /**
     * The magnification filter mode.
     *
     * @type {string}
     * @default 'nearest'
     */
    magFilter: string;
    /**
     * The minification filter mode.
     *
     * @type {string}
     * @default 'nearest'
     */
    minFilter: string;
    /**
     * The mipmap filter mode.
     *
     * @type {string}
     * @default 'nearest'
     */
    mipmapFilter: string;
    /**
     * The minimum level of detail used to sample.
     *
     * @type {number}
     * @default 0
     */
    lodMinClamp: number;
    /**
     * The maximum level of detail used to sample.
     *
     * @type {number}
     * @default 32
     */
    lodMaxClamp: number;
    /**
     * The compare function used by the sampler.
     *
     * @type {string|undefined}
     */
    compare: string | undefined;
    /**
     * The maximum allowed anisotropic filtering.
     *
     * @type {number}
     * @default 1
     */
    maxAnisotropy: number;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
