export default GPUTexelCopyBufferLayout;
/**
 * Reusable descriptor for `GPUTexelCopyBufferLayout`, the data-layout argument
 * to `GPUQueue.writeTexture()`.
 *
 * @private
 */
declare class GPUTexelCopyBufferLayout {
    /**
     * The byte offset within the source data where the texel data begins.
     *
     * @type {number}
     * @default 0
     */
    offset: number;
    /**
     * The stride, in bytes, between rows of texel blocks.
     *
     * @type {number|undefined}
     */
    bytesPerRow: number | undefined;
    /**
     * The number of texel block rows per single image of the texture.
     *
     * @type {number|undefined}
     */
    rowsPerImage: number | undefined;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
