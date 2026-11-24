/**
 * A loader for the NRRD format.
 *
 * ```js
 * const loader = new NRRDLoader();
 * const volume = await loader.loadAsync( 'models/nrrd/I.nrrd' );
 * ```
 *
 * @augments Loader
 * @three_import import { NRRDLoader } from 'three/addons/loaders/NRRDLoader.js';
 */
export class NRRDLoader extends Loader {
    /**
     * Constructs a new NRRD loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded NRRD asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Volume)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Volume) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Toggles the segmentation mode.
     *
     * @param {boolean} segmentation - Whether to use segmentation mode or not.
     */
    setSegmentation(segmentation: boolean): void;
    segmentation: boolean | undefined;
    /**
     * Parses the given NRRD data and returns the resulting volume data.
     *
     * @param {ArrayBuffer} data - The raw NRRD data as an array buffer.
     * @return {Volume} The parsed volume.
     */
    parse(data: ArrayBuffer): Volume;
    _parseChars(array: any, start: any, end: any): string;
}
import { Loader } from 'three';
import { Volume } from '../misc/Volume.js';
