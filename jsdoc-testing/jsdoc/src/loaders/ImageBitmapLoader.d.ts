/**
 * A loader for loading images as an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).
 * An `ImageBitmap` provides an asynchronous and resource efficient pathway to prepare
 * textures for rendering.
 *
 * Note that {@link Texture#flipY} and {@link Texture#premultiplyAlpha} are ignored with image bitmaps.
 * These options need to be configured via {@link ImageBitmapLoader#setOptions} prior to loading,
 * unlike regular images which can be configured on the Texture to set these options on GPU upload instead.
 *
 * To match the default behaviour of {@link Texture}, the following options are needed:
 *
 * ```js
 * { imageOrientation: 'flipY', premultiplyAlpha: 'none' }
 * ```
 *
 * Also note that unlike {@link FileLoader}, this loader will only avoid multiple concurrent requests to the same URL if {@link Cache} is enabled.
 *
 * ```js
 * const loader = new THREE.ImageBitmapLoader();
 * loader.setOptions( { imageOrientation: 'flipY' } ); // set options if needed
 * const imageBitmap = await loader.loadAsync( 'image.png' );
 *
 * const texture = new THREE.Texture( imageBitmap );
 * texture.needsUpdate = true;
 * ```
 *
 * @augments Loader
 */
export class ImageBitmapLoader extends Loader {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isImageBitmapLoader: boolean;
    /**
     * Represents the loader options.
     *
     * @type {Object}
     * @default {premultiplyAlpha:'none'}
     */
    options: Object;
    /**
     * Used for aborting requests.
     *
     * @private
     * @type {AbortController}
     */
    private _abortController;
    /**
     * Sets the given loader options. The structure of the object must match the `options` parameter of
     * [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap).
     *
     * Note: When caching is enabled, the cache key is based on the URL only. Loading the same URL with
     * different options will return the cached result of the first request.
     *
     * @param {Object} options - The loader options to set.
     * @return {ImageBitmapLoader} A reference to this image bitmap loader.
     */
    setOptions(options: Object): ImageBitmapLoader;
    /**
     * Starts loading from the given URL and pass the loaded image bitmap to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(ImageBitmap)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Unsupported in this loader.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: ImageBitmap) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Aborts ongoing fetch requests.
     *
     * @return {ImageBitmapLoader} A reference to this instance.
     */
    abort(): ImageBitmapLoader;
}
import { Loader } from './Loader.js';
