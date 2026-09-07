/**
 * A loader for loading HDR cube textures.
 *
 * ```js
 * const loader = new HDRCubeTextureLoader();
 * loader.setPath( 'textures/cube/pisaHDR/' );
 * const cubeTexture = await loader.loadAsync( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ] );
 *
 * scene.background = cubeTexture;
 * scene.environment = cubeTexture;
 * ```
 *
 * @augments Loader
 * @three_import import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';
 */
export class HDRCubeTextureLoader extends Loader {
    /**
     * Constructs a new HDR cube texture loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * The internal HDR loader that loads the
     * individual textures for each cube face.
     *
     * @type {HDRLoader}
     */
    hdrLoader: HDRLoader;
    /**
     * The texture type.
     *
     * @type {(HalfFloatType|FloatType)}
     * @default HalfFloatType
     */
    type: (number | number);
    /**
     * Starts loading from the given URLs and passes the loaded HDR cube texture
     * to the `onLoad()` callback.
     *
     * @param {Array<string>} urls - The paths/URLs of the files to be loaded. This can also be a data URIs.
     * @param {function(CubeTexture)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     * @return {CubeTexture} The HDR cube texture.
     */
    load(urls: Array<string>, onLoad: (arg0: CubeTexture) => any, onProgress: onProgressCallback, onError: onErrorCallback): CubeTexture;
    /**
     * Sets the texture type.
     *
     * @param {(HalfFloatType|FloatType)} value - The texture type to set.
     * @return {HDRCubeTextureLoader} A reference to this loader.
     */
    setDataType(value: (number | number)): HDRCubeTextureLoader;
}
import { Loader } from 'three';
import { HDRLoader } from '../loaders/HDRLoader.js';
import { CubeTexture } from 'three';
