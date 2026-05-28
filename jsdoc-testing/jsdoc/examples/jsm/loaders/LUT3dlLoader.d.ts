/**
 * A loader for the 3DL LUT format.
 *
 * References:
 * - [3D LUTs](http://download.autodesk.com/us/systemdocs/help/2011/lustre/index.html?url=./files/WSc4e151a45a3b785a24c3d9a411df9298473-7ffd.htm,topicNumber=d0e9492)
 * - [Format Spec for .3dl](https://community.foundry.com/discuss/topic/103636/format-spec-for-3dl?mode=Post&postID=895258)
 *
 * ```js
 * const loader = new LUT3dlLoader();
 * const map = loader.loadAsync( 'luts/Presetpro-Cinematic.3dl' );
 * ```
 *
 * @augments Loader
 * @three_import import { LUT3dlLoader } from 'three/addons/loaders/LUT3dlLoader.js';
 */
export class LUT3dlLoader extends Loader {
    /**
     * Constructs a new 3DL LUT loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * The texture type.
     *
     * @type {(UnsignedByteType|FloatType)}
     * @default UnsignedByteType
     */
    type: (number | FloatType);
    /**
     * Sets the texture type.
     *
     * @param {(UnsignedByteType|FloatType)} type - The texture type to set.
     * @return {LUT3dlLoader} A reference to this loader.
     */
    setType(type: (number | FloatType)): LUT3dlLoader;
    /**
     * Starts loading from the given URL and passes the loaded 3DL LUT asset
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
     * Parses the given 3DL LUT data and returns the resulting 3D data texture.
     *
     * @param {string} input - The raw 3DL LUT data as a string.
     * @return {{size:number,texture3D:Data3DTexture}} The parsed 3DL LUT.
     */
    parse(input: string): {
        size: number;
        texture3D: Data3DTexture;
    };
}
import { Loader } from 'three';
import { Data3DTexture } from 'three';
