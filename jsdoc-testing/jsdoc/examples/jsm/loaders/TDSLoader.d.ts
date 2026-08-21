/**
 * A loader for the 3DS format, based on lib3ds.
 *
 * Loads geometry with uv and materials basic properties with texture support.
 *
 * ```js
 * const loader = new TDSLoader();
 * loader.setResourcePath( 'models/3ds/portalgun/textures/' );
 * const object = await loader.loadAsync( 'models/3ds/portalgun/portalgun.3ds' );
 * scene.add( object );
 *
 * @augments Loader
 * @three_import import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';
 */
export class TDSLoader extends Loader {
    /**
     * Constructs a new 3DS loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Whether debug mode should be enabled or not.
     *
     * @type {boolean}
     * @default false
     */
    debug: boolean;
    group: Group | null;
    materials: any[];
    meshes: any[];
    /**
     * Starts loading from the given URL and passes the loaded 3DS asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given 3DS data and returns the resulting data.
     *
     * @param {ArrayBuffer} arraybuffer - The raw 3DS data as an array buffer.
     * @param {string} path - The asset path.
     * @return {Group} The parsed asset represented as a group.
     */
    parse(arraybuffer: ArrayBuffer, path: string): Group;
    /**
     * Decode file content to read 3ds data.
     *
     * @private
     * @param {ArrayBuffer} arraybuffer - Arraybuffer data to be loaded.
     * @param {string} path - Path for external resources.
     */
    private readFile;
    /**
     * Read mesh data chunk.
     *
     * @private
     * @param {Chunk} chunk - to read mesh from
     * @param {string} path - Path for external resources.
     */
    private readMeshData;
    /**
     * Read named object chunk.
     *
     * @private
     * @param {Chunk} chunk - Chunk in use.
     */
    private readNamedObject;
    /**
     * Read material data chunk and add it to the material list.
     *
     * @private
     * @param {Chunk} chunk - Chunk in use.
     * @param {string} path - Path for external resources.
     */
    private readMaterialEntry;
    /**
     * Read mesh data chunk.
     *
     * @private
     * @param {Chunk} chunk - Chunk in use.
     * @return {Mesh} - The parsed mesh.
     */
    private readMesh;
    /**
     * Read face array data chunk.
     *
     * @private
     * @param {Chunk} chunk - Chunk in use.
     * @param {Mesh} mesh - Mesh to be filled with the data read.
     */
    private readFaceArray;
    /**
     * Read texture map data chunk.
     *
     * @private
     * @param {Chunk} chunk - Chunk in use.
     * @param {string} path - Path for external resources.
     * @return {Texture} Texture read from this data chunk.
     */
    private readMap;
    /**
     * Read material group data chunk.
     *
     * @private
     * @param {Chunk} chunk - Chunk in use.
     * @return {Object} Object with name and index of the object.
     */
    private readMaterialGroup;
    /**
     * Read a color value.
     *
     * @private
     * @param {Chunk} chunk - Chunk.
     * @return {Color} Color value read.
     */
    private readColor;
    /**
     * Read percentage value.
     *
     * @private
     * @param {Chunk} chunk - Chunk to read data from.
     * @return {number} Data read from the dataview.
     */
    private readPercentage;
    /**
     * Print debug message to the console.
     *
     * Is controlled by a flag to show or hide debug messages.
     *
     * @private
     * @param {Object} message - Debug message to print to the console.
     */
    private debugMessage;
}
import { Loader } from 'three';
import { Group } from 'three';
