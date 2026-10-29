/**
 * A loader for loading images. The class loads images with the HTML `Image` API.
 *
 * ```js
 * const loader = new THREE.ImageLoader();
 * const image = await loader.loadAsync( 'image.png' );
 * ```
 * Please note that `ImageLoader` has dropped support for progress
 * events in `r84`. For an `ImageLoader` that supports progress events, see
 * [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-275785639).
 *
 * @augments Loader
 */
export class ImageLoader extends Loader {
    /**
     * Starts loading from the given URL and passes the loaded image
     * to the `onLoad()` callback. The method also returns a new `Image` object which can
     * directly be used for texture creation. If you do it this way, the texture
     * may pop up in your scene once the respective loading process is finished.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Image)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Unsupported in this loader.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @return {Image} The image.
     */
    load(url: string, onLoad: (arg0: new (width?: number, height?: number) => HTMLImageElement) => any, onProgress: onProgressCallback, onError: onErrorCallback): new (width?: number, height?: number) => HTMLImageElement;
}
import { Loader } from './Loader.js';
