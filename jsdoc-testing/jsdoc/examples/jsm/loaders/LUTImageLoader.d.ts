/**
 * A loader for loading LUT images.
 *
 * ```js
 * const loader = new LUTImageLoader();
 * const map = loader.loadAsync( 'luts/NeutralLUT.png' );
 * ```
 *
 * @augments Loader
 * @three_import import { LUTImageLoader } from 'three/addons/loaders/LUTImageLoader.js';
 */
export class LUTImageLoader extends Loader {
    /**
     * Constructs a new LUT loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Whether to vertically flip the LUT or not.
     *
     * Depending on the LUT's origin, the texture has green at the bottom (e.g. for Unreal)
     * or green at the top (e.g. for Unity URP Color Lookup). If you're using lut image strips
     * from a Unity pipeline, then set this property to `true`.
     *
     * @type {boolean}
     * @default false
     */
    flip: boolean;
    /**
     * Starts loading from the given URL and passes the loaded LUT
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({size:number,texture3D:Data3DTexture})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        size: number;
        texture3D: Data3DTexture;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given LUT data and returns the resulting 3D data texture.
     *
     * @param {Uint8ClampedArray} dataArray - The raw LUT data.
     * @param {number} size - The LUT size.
     * @return {{size:number,texture3D:Data3DTexture}} An object representing the parsed LUT.
     */
    parse(dataArray: Uint8ClampedArray, size: number): {
        size: number;
        texture3D: Data3DTexture;
    };
    _getImageData(texture: any): ImageData;
    _horz2Vert(texture: any): ImageData;
}
import { Loader } from 'three';
import { Data3DTexture } from 'three';
