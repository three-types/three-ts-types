/**
 * Class for loading animation clips in the JSON format. The files are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.AnimationLoader();
 * const animations = await loader.loadAsync( 'animations/animation.js' );
 * ```
 *
 * @augments Loader
 */
export class AnimationLoader extends Loader {
    /**
     * Starts loading from the given URL and pass the loaded animations as an array
     * holding instances of {@link AnimationClip} to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Array<AnimationClip>)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Array<AnimationClip>) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given JSON object and returns an array of animation clips.
     *
     * @param {Object} json - The serialized animation clips.
     * @return {Array<AnimationClip>} The parsed animation clips.
     */
    parse(json: Object): Array<AnimationClip>;
}
import { Loader } from './Loader.js';
import { AnimationClip } from '../animation/AnimationClip.js';
