/**
 * A loader for the OBJ format.
 *
 * The [OBJ format](https://en.wikipedia.org/wiki/Wavefront_.obj_file) is a simple data-format that
 * represents 3D geometry in a human readable format as the position of each vertex, the UV position of
 * each texture coordinate vertex, vertex normals, and the faces that make each polygon defined as a list
 * of vertices, and texture vertices.
 *
 * ```js
 * const loader = new OBJLoader();
 * const object = await loader.loadAsync( 'models/monster.obj' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
 */
export class OBJLoader extends Loader {
    /**
     * Constructs a new OBJ loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * A reference to a material creator.
     *
     * @type {?MaterialCreator}
     * @default null
     */
    materials: MaterialCreator | null;
    /**
     * Starts loading from the given URL and passes the loaded OBJ asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Sets the material creator for this OBJ. This object is loaded via {@link MTLLoader}.
     *
     * @param {MaterialCreator} materials - An object that creates the materials for this OBJ.
     * @return {OBJLoader} A reference to this loader.
     */
    setMaterials(materials: MaterialCreator): OBJLoader;
    /**
     * Parses the given OBJ data and returns the resulting group.
     *
     * @param {string} text - The raw OBJ data as a string.
     * @return {Group} The parsed OBJ.
     */
    parse(text: string): Group;
}
import { Loader } from 'three';
import { Group } from 'three';
