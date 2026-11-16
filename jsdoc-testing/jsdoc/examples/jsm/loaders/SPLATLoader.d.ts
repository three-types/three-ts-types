/**
 * A loader for standard fixed-width Gaussian splat `.splat` files.
 *
 * This loader decodes the format into `BufferGeometry` for use with
 * `GaussianSplat`. Each 32-byte row stores center, scale, color and
 * rotation data for one splat.
 *
 * ```js
 * const loader = new SPLATLoader();
 * const data = await loader.loadAsync( './models/gsplat/example.splat' );
 * scene.add( new GaussianSplat( data ) );
 * ```
 *
 * @augments Loader
 * @three_import import { SPLATLoader } from 'three/addons/loaders/SPLATLoader.js';
 */
export class SPLATLoader extends Loader {
    /**
     * Constructs a new Gaussian splat loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded splat data to
     * the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given fixed-width `.splat` data.
     *
     * @param {ArrayBuffer} buffer - The raw `.splat` file as an array buffer.
     * @return {BufferGeometry} The parsed splat geometry.
     */
    parse(buffer: ArrayBuffer): BufferGeometry;
}
import { Loader } from 'three';
