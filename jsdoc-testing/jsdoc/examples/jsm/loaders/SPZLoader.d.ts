/**
 * A loader for compressed Gaussian splat `.spz` files.
 *
 * This loader decodes the format into `BufferGeometry` for use with
 * `GaussianSplatMesh`. Higher-order spherical harmonics are exposed as optional
 * `sphericalHarmonics1` through `sphericalHarmonics3` packed uint32 geometry
 * attributes (`SH_BAND_WORDS[ degree ]` words per splat). Coefficients use the
 * clamped-byte encoding `( value - 128 ) / 128`, four bytes per word.
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
     * @param {ArrayBuffer} buffer - The raw SPZ file as an array buffer.
     * @param {function(BufferGeometry)} [onLoad] - Executed when the parsing process has been finished.
     * @param {onErrorCallback} [onError] - Executed when errors occur.
     * @return {BufferGeometry|Promise<BufferGeometry>|undefined} The parsed splat geometry, or a promise for SPZ v4 data.
     */
    parse(buffer: ArrayBuffer, onLoad?: (arg0: BufferGeometry) => any, onError?: onErrorCallback): BufferGeometry | Promise<BufferGeometry> | undefined;
    /**
     * Parses raw SPZ data after gzip decompression.
     *
     * @param {Uint8Array} bytes - The decompressed SPZ data.
     * @return {BufferGeometry} The parsed splat geometry.
     */
    parseRawSPZ(bytes: Uint8Array): BufferGeometry;
    /**
     * Parses raw SPZ v4 data.
     *
     * @param {Uint8Array} bytes - The raw SPZ v4 data.
     * @param {ZSTDDecoder} zstd - The initialized ZSTD decoder.
     * @return {BufferGeometry} The parsed splat geometry.
     */
    parseRawSPZV4(bytes: Uint8Array, zstd: ZSTDDecoder): BufferGeometry;
}
import { Loader } from 'three';
import { ZSTDDecoder } from '../libs/zstddec.module.js';
