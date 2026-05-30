/**
 * A loader for the LWO format.
 *
 * LWO3 and LWO2 formats are supported.
 *
 * References:
 * - [LWO3 format specification](https://static.lightwave3d.com/sdk/2019/html/filefmts/lwo3.html)
 * - [LWO2 format specification](https://static.lightwave3d.com/sdk/2019/html/filefmts/lwo2.html)
 *
 * ```js
 * const loader = new LWOLoader();
 * const lwoData = await loader.loadAsync( 'models/lwo/Objects/LWO3/Demo.lwo' );
 *
 * const mesh = object.meshes[ 0 ];
 * scene.add( mesh );
 * ```
 *
 * @augments Loader
 * @three_import import { LWOLoader } from 'three/addons/loaders/LWOLoader.js';
 */
export class LWOLoader extends Loader {
    /**
     * Constructs a new LWO loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded LWO asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({meshes:Array<Mesh>,materials:Array<Material>})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        meshes: Array<Mesh>;
        materials: Array<Material>;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given LWO data and returns the resulting meshes and materials.
     *
     * @param {ArrayBuffer} iffBuffer - The raw LWO data as an array buffer.
     * @param {string} path - The URL base path.
     * @param {string} modelName - The model name.
     * @return {{meshes:Array<Mesh>,materials:Array<Material>}} An object holding the parse meshes and materials.
     */
    parse(iffBuffer: ArrayBuffer, path: string, modelName: string): {
        meshes: Array<Mesh>;
        materials: Array<Material>;
    };
}
import { Loader } from 'three';
import { Mesh } from 'three';
