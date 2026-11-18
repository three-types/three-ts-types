/**
 * A loader for the USD format (USD, USDA, USDC, USDZ).
 *
 * Supports both ASCII (USDA) and binary (USDC) USD files, as well as
 * USDZ archives containing either format.
 *
 * ```js
 * const loader = new USDLoader();
 * const model = await loader.loadAsync( 'model.usdz' );
 * scene.add( model );
 * ```
 *
 * @augments Loader
 * @three_import import { USDLoader } from 'three/addons/loaders/USDLoader.js';
 */
export class USDLoader extends Loader {
    /**
     * Constructs a new USDZ loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded USDZ asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given USDZ data and returns the resulting group.
     *
     * The returned group is created synchronously, but any referenced textures
     * are loaded asynchronously. Provide `onLoad` to be notified once all
     * textures have finished loading.
     *
     * @param {ArrayBuffer|string} buffer - The raw USDZ data as an array buffer.
     * @param {string} [path=''] - The URL base path.
     * @param {function(Group)} [onLoad] - Executed once the group and all of its textures are ready.
     * @param {onErrorCallback} [onError] - Executed when errors occur.
     * @return {Group} The parsed asset as a group.
     */
    parse(buffer: ArrayBuffer | string, path?: string, onLoad?: (arg0: Group) => any, onError?: onErrorCallback): Group;
}
import { Loader } from 'three';
