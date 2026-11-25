/**
 * Class for loading textures. Images are internally
 * loaded via {@link ImageLoader}.
 *
 * ```js
 * const loader = new THREE.TextureLoader();
 * const texture = await loader.loadAsync( 'textures/land_ocean_ice_cloud_2048.jpg' );
 * texture.colorSpace = THREE.SRGBColorSpace;
 *
 * const material = new THREE.MeshBasicMaterial( { map:texture } );
 * ```
 * The loaded texture keeps the default {@link Texture#colorSpace} `NoColorSpace`. For
 * color textures like `map` or `emissiveMap`, set it to `SRGBColorSpace`.
 *
 * Please note that `TextureLoader` has dropped support for progress
 * events in `r84`. For a `TextureLoader` that supports progress events, see
 * [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145).
 *
 * @augments Loader
 */
export class TextureLoader extends Loader {
    /**
     * Starts loading from the given URL and pass the fully loaded texture
     * to the `onLoad()` callback. The method also returns a new texture object which can
     * directly be used for material creation. If you do it this way, the texture
     * may pop up in your scene once the respective loading process is finished.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Texture)} [onLoad] - Executed when the loading process has been finished.
     * @param {onProgressCallback} [onProgress] - Unsupported in this loader.
     * @param {function(Event)} [onError] - Executed when errors occur. Receives the image's `error` event, not an `Error` instance.
     * @return {Texture} The texture.
     */
    load(url: string, onLoad?: (arg0: Texture) => any, onProgress?: onProgressCallback, onError?: (arg0: Event) => any): Texture;
}
import { Loader } from './Loader.js';
import { Texture } from '../textures/Texture.js';
