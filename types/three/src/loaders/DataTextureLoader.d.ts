/**
 * ~TexData
 */
export interface DataTextureLoaderTexData {
    /**
     * - An object holding width, height and the texture data.
     */
    image?: DataTextureImageData | undefined;
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
    data?: TypedArray | undefined;
    /**
     * - The texture format.
     */
    format?: PixelFormat | undefined;
    /**
     * - The texture type.
     */
    type?: TextureDataType | undefined;
    /**
     * - If set to `true`, the texture is flipped along the vertical axis when uploaded to the GPU.
     */
    flipY?: boolean | undefined;
    /**
     * - The wrapS value.
     */
    wrapS?: Wrapping | undefined;
    /**
     * - The wrapT value.
     */
    wrapT?: Wrapping | undefined;
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
    colorSpace?: ColorSpace | undefined;
    /**
     * - The mag filter.
     */
    magFilter?: MagnificationTextureFilter | undefined;
    /**
     * - The min filter.
     */
    minFilter?: MinificationTextureFilter | undefined;
    /**
     * - The mipmaps.
     */
    mipmaps?: CompressedTextureMipmap[] | CubeTexture[] | HTMLCanvasElement[] | undefined;
    mipmapCount?: number | undefined;
}
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
export abstract class DataTextureLoader extends Loader<DataTexture> {
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
    load(
        url: string,
        onLoad?: (data: DataTexture, texData: DataTextureLoaderTexData) => void,
        onProgress?: OnProgressCallback,
        onError?: OnErrorCallback,
    ): DataTexture;
    abstract parse(buffer: ArrayBuffer): DataTextureLoaderTexData;
    /**
     * Parses the given buffer and returns a configured data texture. Use this method
     * for parsing texture data that is already in memory (e.g. drag and drop or data
     * loaded from a server) without going through {@link DataTextureLoader#load}.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @return {DataTexture} The data texture.
     */
    createDataTexture(buffer: ArrayBuffer): DataTexture;
    /**
     * Applies the given parsed texture data to the given data texture.
     *
     * @private
     * @param {DataTexture} texture - The data texture.
     * @param {DataTextureLoader~TexData} texData - The parsed texture data.
     */
    private _applyTexData;
}
import {
    ColorSpace,
    MagnificationTextureFilter,
    MinificationTextureFilter,
    PixelFormat,
    TextureDataType,
    Wrapping,
} from "../constants.js";
import { TypedArray } from "../core/BufferAttribute.js";
import { CompressedTextureMipmap } from "../textures/CompressedTexture.js";
import { CubeTexture } from "../textures/CubeTexture.js";
import { DataTexture, DataTextureImageData } from "../textures/DataTexture.js";
import { Loader, OnErrorCallback, OnProgressCallback } from "./Loader.js";
