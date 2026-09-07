export default GPUTexelCopyTextureInfo;
/**
 * Reusable descriptor for `GPUTexelCopyTextureInfo`, the texture side of
 * `GPUCommandEncoder.copyTextureToTexture()`, `copyTextureToBuffer()` and
 * `GPUQueue.writeTexture()`.
 *
 * @private
 */
declare class GPUTexelCopyTextureInfo {
    /**
     * The target texture.
     *
     * @type {?GPUTexture}
     * @default null
     */
    texture: GPUTexture | null;
    /**
     * The mipmap level of the texture.
     *
     * @type {number}
     * @default 0
     */
    mipLevel: number;
    /**
     * The origin offset within the texture.
     *
     * @type {{x: number, y: number, z: number}}
     */
    origin: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Which aspect of the texture is referenced.
     *
     * @type {string}
     * @default 'all'
     */
    aspect: string;
    /**
     * Resets the descriptor to its default state.
     */
    reset(): void;
}
