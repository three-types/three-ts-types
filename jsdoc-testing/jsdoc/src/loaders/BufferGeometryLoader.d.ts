/**
 * Class for loading geometries. The files are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.BufferGeometryLoader();
 * const geometry = await loader.loadAsync( 'models/json/pressure.json' );
 *
 * const material = new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } );
 * const object = new THREE.Mesh( geometry, material );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 */
export class BufferGeometryLoader extends Loader {
    /**
     * Starts loading from the given URL and pass the loaded geometry to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given JSON object and returns a geometry.
     *
     * @param {Object} json - The serialized geometry.
     * @return {BufferGeometry} The parsed geometry.
     */
    parse(json: Object): BufferGeometry;
}
import { Loader } from './Loader.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
