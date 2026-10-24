export default GPUCopyExternalImageDestInfo;
/**
 * Reusable descriptor for `GPUCopyExternalImageDestInfo`, the destination
 * argument to `GPUQueue.copyExternalImageToTexture()`.
 *
 * @private
 * @augments GPUTexelCopyTextureInfo
 */
declare class GPUCopyExternalImageDestInfo extends GPUTexelCopyTextureInfo {
    /**
     * The predefined color space the destination texture is interpreted in.
     *
     * @type {string}
     * @default 'srgb'
     */
    colorSpace: string;
    /**
     * Whether the destination texture has premultiplied alpha.
     *
     * @type {boolean}
     * @default false
     */
    premultipliedAlpha: boolean;
}
import GPUTexelCopyTextureInfo from './GPUTexelCopyTextureInfo.js';
