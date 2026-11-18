/**
 * Class for loading audio buffers. Audios are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const audioListener = new THREE.AudioListener();
 * const ambientSound = new THREE.Audio( audioListener );
 *
 * const loader = new THREE.AudioLoader();
 * const audioBuffer = await loader.loadAsync( 'audio/ambient_ocean.ogg' );
 *
 * ambientSound.setBuffer( audioBuffer );
 * ambientSound.play();
 * ```
 *
 * @augments Loader
 */
export class AudioLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded audio buffer
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(AudioBuffer)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: AudioBuffer) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
}
import { Loader } from './Loader.js';
