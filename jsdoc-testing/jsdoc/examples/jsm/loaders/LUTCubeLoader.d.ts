/**
 * A loader for the Cube LUT format.
 *
 * References:
 * - [Cube LUT Specification](https://web.archive.org/web/20220220033515/https://wwwimages2.adobe.com/content/dam/acom/en/products/speedgrade/cc/pdfs/cube-lut-specification-1.0.pdf)
 *
 * ```js
 * const loader = new LUTCubeLoader();
 * const map = loader.loadAsync( 'luts/Bourbon 64.CUBE' );
 * ```
 *
 * @augments Loader
 * @three_import import { LUTCubeLoader } from 'three/addons/loaders/LUTCubeLoader.js';
 */
export class LUTCubeLoader extends Loader {
    /**
     * Constructs a new Cube LUT loader.
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
     * @return {LUTCubeLoader} A reference to this loader.
     */
    setType(type: (number | FloatType)): LUTCubeLoader;
    /**
     * Starts loading from the given URL and passes the loaded Cube LUT asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({title:string,size:number,domainMin:Vector3,domainMax:Vector3,texture3D:Data3DTexture})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        title: string;
        size: number;
        domainMin: Vector3;
        domainMax: Vector3;
        texture3D: Data3DTexture;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given Cube LUT data and returns the resulting 3D data texture.
     *
     * @param {string} input - The raw Cube LUT data as a string.
     * @return {{title:string,size:number,domainMin:Vector3,domainMax:Vector3,texture3D:Data3DTexture}} The parsed Cube LUT.
     */
    parse(input: string): {
        title: string;
        size: number;
        domainMin: Vector3;
        domainMax: Vector3;
        texture3D: Data3DTexture;
    };
}
import { Loader } from 'three';
import { Vector3 } from 'three';
import { Data3DTexture } from 'three';
