export default StorageTexture;
/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
declare class StorageTexture extends Texture {
    /**
     * Constructs a new storage texture.
     *
     * @param {number} [width=1] - The storage texture's width.
     * @param {number} [height=1] - The storage texture's height.
     */
    constructor(width?: number, height?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture: boolean;
    /**
     * When `true`, mipmaps will be auto-generated after compute writes.
     * When `false`, mipmaps must be written manually via compute shaders.
     *
     * @type {boolean}
     * @default true
     */
    mipmapsAutoUpdate: boolean;
    /**
     * Sets the size of the storage texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     */
    setSize(width: number, height: number): void;
}
import { Texture } from '../../textures/Texture.js';
