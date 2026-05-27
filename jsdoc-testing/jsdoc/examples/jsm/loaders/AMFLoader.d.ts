/**
 * A loader for the AMF format.
 *
 * The loader supports materials, color and ZIP compressed files.
 * No constellation support (yet).
 *
 * ```js
 * const loader = new AMFLoader();
 *
 * const object = await loader.loadAsync( './models/amf/rook.amf' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { AMFLoader } from 'three/addons/loaders/AMFLoader.js';
 */
export class AMFLoader extends Loader {
    /**
     * Constructs a new AMF loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded AMF asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given AMF data and returns the resulting group.
     *
     * @param {ArrayBuffer} data - The raw AMF asset data as an array buffer.
     * @return {Group} A group representing the parsed asset.
     */
    parse(data: ArrayBuffer): Group;
}
import { Loader } from 'three';
import { Group } from 'three';
