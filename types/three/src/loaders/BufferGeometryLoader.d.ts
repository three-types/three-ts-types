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
export class BufferGeometryLoader extends Loader<InstancedBufferGeometry | BufferGeometry> {
    /**
     * Starts loading from the given URL and pass the loaded geometry to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(
        url: string,
        onLoad: (data: InstancedBufferGeometry | BufferGeometry) => void,
        onProgress?: onProgressCallback,
        onError?: onErrorCallback,
    ): void;
    /**
     * Parses the given JSON object and returns a geometry.
     *
     * @param {Object} json - The serialized geometry.
     * @return {BufferGeometry} The parsed geometry.
     */
    parse(json: unknown): InstancedBufferGeometry | BufferGeometry;
}
import { BufferGeometry } from "../core/BufferGeometry.js";
import { InstancedBufferGeometry } from "../core/InstancedBufferGeometry.js";
import { Loader, onErrorCallback, onProgressCallback } from "./Loader.js";
