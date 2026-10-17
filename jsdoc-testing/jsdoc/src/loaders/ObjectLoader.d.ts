/**
 * A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
 * The files are internally loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.ObjectLoader();
 * const obj = await loader.loadAsync( 'models/json/example.json' );
 * scene.add( obj );
 *
 * // Alternatively, to parse a previously loaded JSON structure
 * const object = await loader.parseAsync( a_json_object );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 */
export class ObjectLoader extends Loader {
    /**
     * Registers the given geometry at the internal
     * geometry library.
     *
     * @static
     * @param {string} type - The geometry type.
     * @param {BufferGeometry.constructor} geometryClass - The geometry class.
     */
    static registerGeometry(type: string, geometryClass: BufferGeometry.constructor): void;
    /**
     * Constructs a new object loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and pass the loaded 3D object to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Object3D)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Object3D) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Async version of {@link ObjectLoader#load}.
     *
     * @async
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @return {Promise<Object3D>} A Promise that resolves with the loaded 3D object.
     */
    loadAsync(url: string, onProgress: onProgressCallback): Promise<Object3D>;
    /**
     * Parses the given JSON. This is used internally by {@link ObjectLoader#load}
     * but can also be used directly to parse a previously loaded JSON structure.
     *
     * @param {Object} json - The serialized 3D object.
     * @param {onLoad} onLoad - Executed when all resources (e.g. textures) have been fully loaded.
     * @return {Object3D} The parsed 3D object.
     */
    parse(json: Object, onLoad: any): Object3D;
    /**
     * Async version of {@link ObjectLoader#parse}.
     *
     * @param {Object} json - The serialized 3D object.
     * @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
     */
    parseAsync(json: Object): Promise<Object3D>;
    parseShapes(json: any): {};
    parseSkeletons(json: any, object: any): {};
    parseGeometries(json: any, shapes: any): {};
    parseMaterials(json: any, textures: any): {};
    parseAnimations(json: any): {};
    parseImages(json: any, onLoad: any): {};
    parseImagesAsync(json: any): Promise<{}>;
    parseTextures(json: any, images: any): {};
    parseObject(data: any, geometries: any, materials: any, textures: any, animations: any): Object3D | Sprite | LOD | Mesh | SkinnedMesh | InstancedMesh | BatchedMesh | Line | Points | PerspectiveCamera | OrthographicCamera;
    bindSkeletons(object: any, skeletons: any): void;
    bindLightTargets(object: any): void;
}
import { Loader } from './Loader.js';
import { Object3D } from '../core/Object3D.js';
import { Sprite } from '../objects/Sprite.js';
import { LOD } from '../objects/LOD.js';
import { Mesh } from '../objects/Mesh.js';
import { SkinnedMesh } from '../objects/SkinnedMesh.js';
import { InstancedMesh } from '../objects/InstancedMesh.js';
import { BatchedMesh } from '../objects/BatchedMesh.js';
import { Line } from '../objects/Line.js';
import { Points } from '../objects/Points.js';
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js';
import { OrthographicCamera } from '../cameras/OrthographicCamera.js';
import { LoadingManager } from './LoadingManager.js';
