/**
 * A loader for the MD2 format.
 *
 * The loader represents the animations of the MD2 asset as an array of animation
 * clips and stores them in the `animations` property of the geometry.
 *
 * ```js
 * const loader = new MD2Loader();
 * const geometry = await loader.loadAsync( './models/md2/ogro/ogro.md2' );
 *
 * const animations = geometry.animations;
 * ```
 *
 * @augments Loader
 * @three_import import { MD2Loader } from 'three/addons/loaders/MD2Loader.js';
 */
export class MD2Loader extends Loader {
    /**
     * Constructs a new MD2 loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded MD2 asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
     * @param {onErrorCallback} [onError] - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: BufferGeometry) => any, onProgress?: onProgressCallback, onError?: onErrorCallback): void;
    /**
     * Parses the given MD2 data and returns a geometry.
     *
     * @param {ArrayBuffer} buffer - The raw MD2 data as an array buffer.
     * @return {BufferGeometry} The parsed geometry data.
     */
    parse(buffer: ArrayBuffer): BufferGeometry;
}
import { Loader } from 'three';
import { BufferGeometry } from 'three';
