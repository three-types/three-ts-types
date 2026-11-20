/**
 * A loader for the KTX texture compression format.
 *
 * References:
 * - [The KTX File Format and Tools](https://www.khronos.org/opengles/sdk/tools/KTX/)
 * - [Babylon.JS khronosTextureContainer.ts](https://github.com/BabylonJS/Babylon.js/blob/master/src/Misc/khronosTextureContainer.ts)
 *
 * ```js
 * const loader = new KTXLoader();
 *
 * const map = loader.load( 'textures/compressed/lensflare_ASTC8x8.ktx' )
 * map.colorSpace = THREE.SRGBColorSpace; // only for color textures
 * ```
 *
 * @augments CompressedTextureLoader
 * @three_import import { KTXLoader } from 'three/addons/loaders/KTXLoader.js';
 */
export class KTXLoader extends CompressedTextureLoader {
    /**
     * Constructs a new KTX loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Parses the given KTX texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @param {boolean} loadMipmaps - Whether to load mipmaps or not.
     * @return {CompressedTextureLoader~TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer, loadMipmaps: boolean): CompressedTextureLoader;
}
import { CompressedTextureLoader } from 'three';
