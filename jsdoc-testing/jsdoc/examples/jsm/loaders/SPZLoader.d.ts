/**
 * A loader for compressed Gaussian splat `.spz` files.
 *
 * This loader decodes the format into `BufferGeometry` for use with
 * `GaussianSplatMesh`. The current renderer supports degree-0 color only, so
 * higher-order spherical harmonics are parsed only enough to skip their payload.
 *
 * ```js
 * const loader = new SPZLoader();
 * const data = await loader.loadAsync( './models/gsplat/example.spz' );
 * scene.add( new GaussianSplatMesh( data ) );
 * ```
 *
 * @augments Loader
 * @three_import import { SPZLoader } from 'three/addons/loaders/SPZLoader.js';
 */
export class SPZLoader extends Loader {
    /**
     * Constructs a new Gaussian splat SPZ loader.
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
     * Decompresses and parses the given `.spz` data.
     *
     * @param {ArrayBuffer} buffer - The raw gzip-compressed SPZ file as an array buffer.
     * @return {BufferGeometry} The parsed splat geometry.
     */
    parse(buffer: ArrayBuffer): BufferGeometry;
    /**
     * Parses raw SPZ data after gzip decompression.
     *
     * @param {Uint8Array} bytes - The decompressed SPZ data.
     * @return {BufferGeometry} The parsed splat geometry.
     */
    parseRawSPZ(bytes: Uint8Array): BufferGeometry;
}
import { Loader } from 'three';
