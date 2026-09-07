/**
 * A loader for the KMZ format.
 *
 * ```js
 * const loader = new KMZLoader();
 * const kmz = await loader.loadAsync( './models/kmz/Box.kmz' );
 *
 * scene.add( kmz.scene );
 * ```
 *
 * @augments Loader
 * @three_import import { KMZLoader } from 'three/addons/loaders/KMZLoader.js';
 */
export class KMZLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded KMZ asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({scene:Group})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        scene: Group;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given KMZ data and returns an object holding the scene.
     *
     * @param {ArrayBuffer} data - The raw KMZ data as an array buffer.
     * @return {{scene:Group}} The parsed KMZ asset.
     */
    parse(data: ArrayBuffer): {
        scene: Group;
    };
}
import { Loader } from 'three';
import { Group } from 'three';
