/**
 * A loader for the [3D Manufacturing Format (3MF)](https://3mf.io/specification/) format.
 *
 * The following features from the core specification are supported:
 *
 * - 3D Models
 * - Object Resources (Meshes and Components)
 * - Material Resources (Base Materials)
 *
 * 3MF Materials and Properties Extension are only partially supported.
 *
 * - Texture 2D
 * - Texture 2D Groups
 * - Color Groups (Vertex Colors)
 * - Metallic Display Properties (PBR)
 *
 * ```js
 * const loader = new ThreeMFLoader();
 *
 * const object = await loader.loadAsync( './models/3mf/truck.3mf' );
 * object.rotation.set( - Math.PI / 2, 0, 0 ); // z-up conversion
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';
 */
export class ThreeMFLoader extends Loader {
    /**
     * Constructs a new 3MF loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * An array of available extensions.
     *
     * @type {Array<Object>}
     */
    availableExtensions: Array<Object>;
    /**
     * Starts loading from the given URL and passes the loaded 3MF asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given 3MF data and returns the resulting group.
     *
     * @param {ArrayBuffer} data - The raw 3MF asset data as an array buffer.
     * @return {Group} A group representing the parsed asset.
     */
    parse(data: ArrayBuffer): Group;
    /**
     * Adds a 3MF extension.
     *
     * @param {Object} extension - The extension to add.
     */
    addExtension(extension: Object): void;
}
import { Loader } from 'three';
import { Group } from 'three';
