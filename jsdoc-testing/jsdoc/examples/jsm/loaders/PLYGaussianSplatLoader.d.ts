/**
 * A loader for Gaussian splat PLY files, e.g. as exported by the original
 * GraphDECO/INRIA 3D Gaussian Splatting implementation.
 *
 * PLY itself is a generic format, so the caller would normally have to know
 * the file's spherical harmonics (SH) degree ahead of time to configure
 * `PLYLoader` with the right custom property mapping before parsing. This
 * loader avoids that by scanning the plain-text PLY header for `f_rest_N`
 * properties first, since SH degree maps to a fixed, closed table of
 * `f_rest` counts (0/9/24/45 -> degree 0/1/2/3), and configuring an
 * internal `PLYLoader` accordingly before converting the result into
 * Gaussian splat geometry.
 *
 * ```js
 * const loader = new PLYGaussianSplatLoader();
 * const geometry = await loader.loadAsync( './models/gsplat/point_cloud.ply' );
 * scene.add( new GaussianSplatMesh( geometry ) );
 * ```
 *
 * @augments Loader
 * @three_import import { PLYGaussianSplatLoader } from 'three/addons/loaders/PLYGaussianSplatLoader.js';
 */
export class PLYGaussianSplatLoader extends Loader {
    /**
     * Constructs a new Gaussian splat PLY loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded Gaussian splat
     * geometry to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given Gaussian splat PLY data and returns the resulting
     * Gaussian splat geometry.
     *
     * This scans the PLY header for the file's spherical harmonics degree,
     * so unlike a plain `PLYLoader`, no prior setup is required.
     *
     * @param {ArrayBuffer|string} data - The raw PLY data, as an array buffer or string.
     * @return {BufferGeometry} The parsed Gaussian splat geometry.
     */
    parse(data: ArrayBuffer | string): BufferGeometry;
}
import { Loader } from 'three';
