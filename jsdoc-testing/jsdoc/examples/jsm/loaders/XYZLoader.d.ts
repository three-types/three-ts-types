/**
 * A loader for the XYZ format.
 *
 * XYZ is a very simple format for storing point clouds. The layouts
 * `XYZ` (points) and `XYZRGB` (points + colors) are supported.
 *
 * ```js
 * const loader = new XYZLoader();
 * const geometry = await loader.loadAsync( 'models/xyz/helix_201.xyz' );
 * geometry.center();
 *
 * const vertexColors = ( geometry.hasAttribute( 'color' ) === true );
 * const material = new THREE.PointsMaterial( { size: 0.1, vertexColors: vertexColors } );
 *
 * const points = new THREE.Points( geometry, material );
 * scene.add( points );
 * ```
 *
 * @augments Loader
 * @three_import import { XYZLoader } from 'three/addons/loaders/XYZLoader.js';
 */
export class XYZLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded XYZ asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given XYZ data and returns the resulting geometry.
     *
     * @param {string} text - The raw XYZ data as a string.
     * @return {BufferGeometry} The geometry representing the point cloud.
     */
    parse(text: string): BufferGeometry;
}
import { Loader } from 'three';
import { BufferGeometry } from 'three';
