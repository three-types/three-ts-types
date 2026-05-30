/**
 * A loader for the FBX format.
 *
 * Requires FBX file to be >= 7.0 and in ASCII or >= 6400 in Binary format.
 * Versions lower than this may load but will probably have errors.
 *
 * Needs Support:
 * - Morph normals / blend shape normals
 *
 * FBX format references:
 * - [C++ SDK reference](https://help.autodesk.com/view/FBX/2017/ENU/?guid=__cpp_ref_index_html)
 *
 * Binary format specification:
 * - [FBX binary file format specification](https://code.blender.org/2013/08/fbx-binary-file-format-specification/)
 *
 * ```js
 * const loader = new FBXLoader();
 * const object = await loader.loadAsync( 'models/fbx/stanford-bunny.fbx' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
 */
export class FBXLoader extends Loader {
    /**
     * Constructs a new FBX loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded FBX asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given FBX data and returns the resulting group.
     *
     * @param {ArrayBuffer} FBXBuffer - The raw FBX data as an array buffer.
     * @param {string} path - The URL base path.
     * @return {Group} An object representing the parsed asset.
     */
    parse(FBXBuffer: ArrayBuffer, path: string): Group;
}
import { Loader } from 'three';
import { Group } from 'three';
