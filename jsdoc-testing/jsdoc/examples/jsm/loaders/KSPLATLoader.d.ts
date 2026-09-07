/**
 * A loader for GaussianSplats3D `.ksplat` files.
 *
 * This loader decodes the format into `BufferGeometry` for use with
 * `GaussianSplat`. Higher-order spherical harmonics are exposed as optional
 * `sphericalHarmonics1` through `sphericalHarmonics3` packed uint32 geometry
 * attributes (`SH_BAND_WORDS[ degree ]` words per splat). Coefficients use the
 * clamped-byte encoding `( value - 128 ) / 128`, four bytes per word.
 *
 * ```js
 * const loader = new KSPLATLoader();
 * const data = await loader.loadAsync( './models/gsplat/example.ksplat' );
 * scene.add( new GaussianSplat( data ) );
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
