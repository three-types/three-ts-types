/**
 * ~TexData
 */
export type CompressedTextureLoader = {
    /**
     * - The width of the base mip.
     */
    width: number;
    /**
     * - The width of the base mip.
     */
    height: number;
    /**
     * - Whether the data represent a cubemap or not.
     */
    isCubemap: boolean;
    /**
     * - The mipmap count.
     */
    mipmapCount: number;
    /**
     * - An array holding the mipmaps.
     * Each entry holds the data and the dimensions for each level.
     */
    mipmaps: Array<{
        data: TypedArray;
        width: number;
        height: number;
    }>;
    /**
     * - The texture format.
     */
    format: number;
};
/**
 * Abstract base class for loading compressed texture formats S3TC, ASTC or ETC.
 * Textures are internally loaded via {@link FileLoader}.
 *
 * Derived classes have to implement the `parse()` method which holds the parsing
 * for the respective format.
 *
 * @abstract
 * @augments Loader
 */
export class CompressedTextureLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded compressed texture
     * to the `onLoad()` callback. The method also returns a new texture object which can
     * directly be used for material creation. If you do it this way, the texture
     * may pop up in your scene once the respective loading process is finished.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(CompressedTexture)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @return {CompressedTexture} The compressed texture.
     */
    load(url: string, onLoad: (arg0: CompressedTexture) => any, onProgress: onProgressCallback, onError: onErrorCallback): CompressedTexture;
}
import { Loader } from './Loader.js';
import { CompressedTexture } from '../textures/CompressedTexture.js';
