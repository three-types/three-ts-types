/**
 * A loader for the TTF format.
 *
 * Loads TTF files and converts them into typeface JSON that can be used directly
 * to create THREE.Font objects.
 *
 * ```js
 * const loader = new TTFLoader();
 * const json = await loader.loadAsync( 'fonts/ttf/kenpixel.ttf' );
 * const font = new Font( json );
 * ```
 *
 * @augments Loader
 * @three_import import { TTFLoader } from 'three/addons/loaders/TTFLoader.js';
 */
export class TTFLoader extends Loader {
    /**
     * Constructs a new TTF loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Whether the TTF commands should be reversed or not.
     *
     * @type {boolean}
     * @default false
     */
    reversed: boolean;
    /**
     * Starts loading from the given URL and passes the loaded TTF asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Object) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given TTF data and returns a JSON for creating a font.
     *
     * @param {ArrayBuffer} arraybuffer - The raw TTF data as an array buffer.
     * @return {Object} The result JSON.
     */
    parse(arraybuffer: ArrayBuffer): Object;
}
import { Loader } from 'three';
