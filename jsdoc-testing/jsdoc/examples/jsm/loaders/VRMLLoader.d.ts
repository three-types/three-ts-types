/**
 * A loader for the VRML format.
 *
 * ```js
 * const loader = new VRMLLoader();
 * const object = await loader.loadAsync( 'models/vrml/house.wrl' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { VRMLLoader } from 'three/addons/loaders/VRMLLoader.js';
 */
export class VRMLLoader extends Loader {
    /**
     * Constructs a new VRML loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded VRML asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Scene)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Scene) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given VRML data and returns the resulting scene.
     *
     * @param {string} data - The raw VRML data as a string.
     * @param {string} path - The URL base path.
     * @return {Scene} The parsed scene.
     */
    parse(data: string, path: string): Scene;
}
import { Loader } from 'three';
import { Scene } from 'three';
