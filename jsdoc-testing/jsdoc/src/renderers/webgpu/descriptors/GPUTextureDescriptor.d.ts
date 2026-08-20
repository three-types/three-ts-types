export default GPUTextureDescriptor;
/**
 * Reusable descriptor for `GPUDevice.createTexture()`.
 *
 * @private
 */
declare class GPUTextureDescriptor {
    /**
     * The label of the texture.
     *
     * @type {string}
     */
    label: string;
    /**
     * The size of the texture.
     *
     * @type {{width: number, height: number, depthOrArrayLayers: number}}
     */
    size: {
        width: number;
        height: number;
        depthOrArrayLayers: number;
    };
    /**
     * The number of mip levels the texture will contain.
     *
     * @type {number}
     * @default 1
     */
    mipLevelCount: number;
    /**
     * The sample count of the texture.
     *
     * @type {number}
     * @default 1
     */
    sampleCount: number;
    /**
     * The dimension of the set of texel coordinates.
     *
     * @type {string}
     * @default '2d'
     */
    dimension: string;
    /**
     * The format of the texture.
     *
     * @type {string|undefined}
     */
    format: string | undefined;
    /**
     * The allowed usages for the texture.
     *
     * @type {number|undefined}
     */
    usage: number | undefined;
    /**
     * The formats that views of this texture may use.
     *
     * @type {Array<string>}
     */
    viewFormats: Array<string>;
    /**
     * The view dimension to use when binding the texture (compatibility mode).
     *
     * @type {string|undefined}
     */
    textureBindingViewDimension: string | undefined;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
