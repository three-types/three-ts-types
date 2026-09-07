/**
 * A loader for the VOX format.
 *
 * ```js
 * const loader = new VOXLoader();
 * const result = await loader.loadAsync( 'models/vox/monu10.vox' );
 *
 * scene.add( result.scene.children[ 0 ] );
 * ```
 * @augments Loader
 * @three_import import { VOXLoader } from 'three/addons/loaders/VOXLoader.js';
 */
export class VOXLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded VOX asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Object) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given VOX data and returns the result object.
     *
     * @param {ArrayBuffer} buffer - The raw VOX data as an array buffer.
     * @return {Object} The parsed VOX data with properties: chunks, scene.
     */
    parse(buffer: ArrayBuffer): Object;
}
/**
 * Builds a mesh from a VOX chunk.
 *
 * @param {Object} chunk - A VOX chunk loaded via {@link VOXLoader}.
 * @return {Mesh} The generated mesh.
 */
export function buildMesh(chunk: Object): Mesh;
/**
 * Builds a 3D texture from a VOX chunk.
 *
 * @param {Object} chunk - A VOX chunk loaded via {@link VOXLoader}.
 * @return {Data3DTexture} The generated 3D texture.
 */
export function buildData3DTexture(chunk: Object): Data3DTexture;
export class VOXMesh extends Mesh {
    constructor(chunk: any);
}
export class VOXData3DTexture extends Data3DTexture {
    constructor(chunk: any);
}
import { Loader } from 'three';
import { Mesh } from 'three';
import { Data3DTexture } from 'three';
