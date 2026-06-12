/**
 * A loader for the Lottie texture animation format.
 *
 * The loader returns an instance of {@link CanvasTexture} to represent
 * the animated texture. Two additional properties are added to each texture:
 * - `animation`: The return value of `lottie.loadAnimation()` which is an object
 * with an API for controlling the animation's playback.
 * - `image`: The image container.
 *
 * ```js
 * const loader = new LottieLoader();
 * loader.setQuality( 2 );
 * const texture = await loader.loadAsync( 'textures/lottie/24017-lottie-logo-animation.json' );
 *
 * const geometry = new THREE.BoxGeometry();
 * const material = new THREE.MeshBasicMaterial( { map: texture } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments Loader
 * @three_import import { LottieLoader } from 'three/addons/loaders/LottieLoader.js';
 */
export class LottieLoader extends Loader {
    /**
     * Constructs a new Lottie loader.
     *
     * @deprecated The loader has been deprecated and will be removed with r186. Use lottie-web instead and create your animated texture manually.
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Sets the texture quality.
     *
     * @param {number} value - The texture quality.
     */
    setQuality(value: number): void;
    _quality: number | undefined;
    /**
     * Starts loading from the given URL and passes the loaded Lottie asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(CanvasTexture)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @returns {CanvasTexture} The Lottie texture.
     */
    load(url: string, onLoad: (arg0: CanvasTexture) => any, onProgress: onProgressCallback, onError: onErrorCallback): CanvasTexture;
}
import { Loader } from 'three';
import { CanvasTexture } from 'three';
