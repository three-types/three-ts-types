/**
 * A loader for the Collada format.
 *
 * The Collada format is very complex so this loader only supports a subset of what
 * is defined in the [official specification](https://www.khronos.org/files/collada_spec_1_5.pdf).
 *
 * Assets with a Z-UP coordinate system are transformed it into Y-UP by a simple rotation.
 * The vertex data are not converted.
 *
 * ```js
 * const loader = new ColladaLoader();
 *
 * const result = await loader.loadAsync( './models/collada/elf/elf.dae' );
 * scene.add( result.scene );
 * ```
 *
 * @augments Loader
 * @three_import import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
 */
export class ColladaLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded Collada asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function({scene:Group,animations:Array<AnimationClip>,kinematics:Object})} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: {
        scene: Group;
        animations: Array<AnimationClip>;
        kinematics: Object;
    }) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given Collada data and returns a result object holding the parsed scene,
     * an array of animation clips and kinematics.
     *
     * @param {string} text - The raw Collada data as a string.
     * @param {string} [path] - The asset path.
     * @return {?{scene:Group,animations:Array<AnimationClip>,kinematics:Object}} An object representing the parsed asset.
     */
    parse(text: string, path?: string): {
        scene: Group;
        animations: Array<AnimationClip>;
        kinematics: Object;
    } | null;
}
import { Loader } from 'three';
