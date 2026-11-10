export default StorageArrayTexture;
/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
declare class StorageArrayTexture extends Texture {
    /**
     * Constructs a new storage texture.
     *
     * @param {number} [width=1] - The storage texture's width.
     * @param {number} [height=1] - The storage texture's height.
     * @param {number} [depth=1] - The storage texture's depth.
     */
    constructor(width?: number, height?: number, depth?: number);
    isArrayTexture: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture: boolean;
    /**
     * Sets the size of the storage array texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     * @param {number} depth - The new depth of the storage texture.
     */
    setSize(width: number, height: number, depth: number): void;
}
import { Texture } from '../../textures/Texture.js';
