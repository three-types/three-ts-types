/**
 * A loader for GaussianSplats3D `.ksplat` files.
 *
 * This loader decodes the format into `BufferGeometry` for use with
 * `GaussianSplatMesh`. Spherical harmonics payloads are skipped because the
 * current renderer uses the stored degree-0 color.
 *
 * ```js
 * const loader = new KSPLATLoader();
 * const data = await loader.loadAsync( './models/gsplat/example.ksplat' );
 * scene.add( new GaussianSplatMesh( data ) );
 * ```
 *
 * @augments Loader
 * @three_import import { KSPLATLoader } from 'three/addons/loaders/KSPLATLoader.js';
 */
export class KSPLATLoader extends Loader {
    /**
     * Constructs a new Gaussian splat KSPLAT loader.
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
     * Parses the given `.ksplat` data.
     *
     * @param {ArrayBuffer} buffer - The raw KSPLAT file as an array buffer.
     * @return {BufferGeometry} The parsed splat geometry.
     */
    parse(buffer: ArrayBuffer): BufferGeometry;
}
import { Loader } from 'three';
