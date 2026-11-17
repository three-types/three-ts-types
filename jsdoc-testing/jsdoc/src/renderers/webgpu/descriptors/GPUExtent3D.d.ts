export default GPUExtent3D;
/**
 * Reusable descriptor for `GPUExtent3D` in its dictionary form, used by
 * `GPUQueue.writeTexture()`, `GPUQueue.copyExternalImageToTexture()` and
 * the various `GPUCommandEncoder` copy methods.
 *
 * @private
 */
declare class GPUExtent3D {
    /**
     * The width of the extent.
     *
     * @type {number}
     * @default 0
     */
    width: number;
    /**
     * The height of the extent.
     *
     * @type {number}
     * @default 1
     */
    height: number;
    /**
     * The depth (for 3D textures) or number of array layers.
     *
     * @type {number}
     * @default 1
     */
    depthOrArrayLayers: number;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
