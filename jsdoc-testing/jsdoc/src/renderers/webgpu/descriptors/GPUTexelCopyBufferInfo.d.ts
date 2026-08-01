export default GPUTexelCopyBufferInfo;
/**
 * Reusable descriptor for `GPUTexelCopyBufferInfo`, the buffer side of
 * `GPUCommandEncoder.copyTextureToBuffer()` and `copyBufferToTexture()`.
 *
 * @private
 */
declare class GPUTexelCopyBufferInfo {
    /**
     * The target buffer.
     *
     * @type {?GPUBuffer}
     * @default null
     */
    buffer: GPUBuffer | null;
    /**
     * The byte offset within the buffer where the texel data begins.
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
