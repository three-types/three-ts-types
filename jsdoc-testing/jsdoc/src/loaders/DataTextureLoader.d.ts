/**
 * ~TexData
 */
export type DataTextureLoader = {
    /**
     * - An object holding width, height and the texture data.
     */
    image?: Object | undefined;
    /**
     * - The width of the base mip.
     */
    width?: number | undefined;
    /**
     * - The width of the base mip.
     */
    height?: number | undefined;
    /**
     * - The texture data.
     */
    data?: TypedArray;
    /**
     * - The texture format.
     */
    format?: number | undefined;
    /**
     * - The texture type.
     */
    type?: number | undefined;
    /**
     * - If set to `true`, the texture is flipped along the vertical axis when uploaded to the GPU.
     */
    flipY?: boolean | undefined;
    /**
     * - The wrapS value.
     */
    wrapS?: number | undefined;
    /**
     * - The wrapT value.
     */
    wrapT?: number | undefined;
    /**
     * - The anisotropy value.
     */
    anisotropy?: number | undefined;
    /**
     * - Whether to generate mipmaps or not.
     */
    generateMipmaps?: boolean | undefined;
    /**
     * - The color space.
     */
    colorSpace?: string | undefined;
    /**
     * - The mag filter.
     */
    magFilter?: number | undefined;
    /**
     * - The min filter.
     */
    minFilter?: number | undefined;
    /**
     * - The mipmaps.
     */
    mipmaps?: Object[] | undefined;
};
/**
 * Abstract base class for loading binary texture formats RGBE, EXR or TGA.
 * Textures are internally loaded via {@link FileLoader}.
 *
 * Derived classes have to implement the `parse()` method which holds the parsing
 * for the respective format.
 *
 * @abstract
 * @augments Loader
 */
export class DataTextureLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded data texture
     * to the `onLoad()` callback. The method also returns a new texture object which can
     * directly be used for material creation. If you do it this way, the texture
     * may pop up in your scene once the respective loading process is finished.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(DataTexture)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @return {DataTexture} The data texture.
     */
    load(url: string, onLoad: (arg0: DataTexture) => any, onProgress: onProgressCallback, onError: onErrorCallback): DataTexture;
}
import { Loader } from './Loader.js';
import { DataTexture } from '../textures/DataTexture.js';
