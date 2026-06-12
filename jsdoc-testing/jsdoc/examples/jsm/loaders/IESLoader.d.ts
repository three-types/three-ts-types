/**
 * A loader for the IES format.
 *
 * The loaded texture should be assigned to {@link IESSpotLight#map}.
 *
 * ```js
 * const loader = new IESLoader();
 * const texture = await loader.loadAsync( 'ies/007cfb11e343e2f42e3b476be4ab684e.ies' );
 *
 * const spotLight = new THREE.IESSpotLight( 0xff0000, 500 );
 * spotLight.iesMap = texture;
 * ```
 *
 * @augments Loader
 * @three_import import { IESLoader } from 'three/addons/loaders/IESLoader.js';
 */
export class IESLoader extends Loader {
    /**
     * Constructs a new IES loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * The texture type.
     *
     * @type {(HalfFloatType|FloatType)}
     * @default HalfFloatType
     */
    type: (number | number);
    _getIESValues(iesLamp: any, type: any): Uint8Array<ArrayBuffer> | Uint16Array<ArrayBuffer> | Float32Array<ArrayBuffer> | null;
    /**
     * Starts loading from the given URL and passes the loaded IES texture
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(DataTexture)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: DataTexture) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given IES data.
     *
     * @param {string} text - The raw IES data.
     * @return {DataTexture} THE IES data as a texture.
     */
    parse(text: string): DataTexture;
}
import { Loader } from 'three';
import { DataTexture } from 'three';
