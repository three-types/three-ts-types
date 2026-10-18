/**
 * A loader for the VTK format.
 *
 * This loader only supports the `POLYDATA` dataset format so far. Other formats
 * (structured points, structured grid, rectilinear grid, unstructured grid, appended)
 * are not supported.
 *
 * ```js
 * const loader = new VTKLoader();
 * const geometry = await loader.loadAsync( 'models/vtk/liver.vtk' );
 * geometry.computeVertexNormals();
 *
 * const mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial() );
 * scene.add( mesh );
 * ```
 *
 * @augments Loader
 * @three_import import { VTKLoader } from 'three/addons/loaders/VTKLoader.js';
 * @deprecated since r184.
 */
export class VTKLoader extends Loader {
    /**
     * Constructs a new VTK loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     * @deprecated since r184.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded VTK asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given VTK data and returns the resulting geometry.
     *
     * @param {ArrayBuffer} data - The raw VTK data as an array buffer
     * @return {BufferGeometry} The parsed geometry.
     */
    parse(data: ArrayBuffer): BufferGeometry;
}
import { Loader } from 'three';
import { BufferGeometry } from 'three';
