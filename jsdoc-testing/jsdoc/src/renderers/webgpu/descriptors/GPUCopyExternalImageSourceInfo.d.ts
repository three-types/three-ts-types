export default GPUCopyExternalImageSourceInfo;
/**
 * Reusable descriptor for `GPUCopyExternalImageSourceInfo`, the source argument
 * to `GPUQueue.copyExternalImageToTexture()`.
 *
 * @private
 */
declare class GPUCopyExternalImageSourceInfo {
    /**
     * The image-like source.
     *
     * @type {?(ImageBitmap|ImageData|HTMLImageElement|HTMLVideoElement|VideoFrame|HTMLCanvasElement|OffscreenCanvas)}
     * @default null
     */
    source: (ImageBitmap | ImageData | HTMLImageElement | HTMLVideoElement | VideoFrame | HTMLCanvasElement | OffscreenCanvas) | null;
    /**
     * The origin offset within the source.
     *
     * @type {{x: number, y: number}}
     */
    origin: {
        x: number;
        y: number;
    };
    /**
     * Whether the source is flipped vertically before copying.
     *
     * @type {boolean}
     * @default false
     */
    flipY: boolean;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
