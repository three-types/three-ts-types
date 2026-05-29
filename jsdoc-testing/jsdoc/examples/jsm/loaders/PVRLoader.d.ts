/**
 * A loader for the PVRTC texture compression format.
 *
 * ```js
 * const loader = new PVRLoader();
 *
 * const map = loader.load( 'textures/compressed/disturb_4bpp_rgb.pvr' );
 * map.colorSpace = THREE.SRGBColorSpace; // only for color textures
 * ```
 *
 * @augments CompressedTextureLoader
 * @three_import import { PVRLoader } from 'three/addons/loaders/PVRLoader.js';
 */
export class PVRLoader extends CompressedTextureLoader {
    /**
     * Constructs a new PVR loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Parses the given PVRTC texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @param {boolean} loadMipmaps - Whether to load mipmaps or not. This option is not yet supported by the loader.
     * @return {CompressedTextureLoader~TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer, loadMipmaps: boolean): CompressedTextureLoader;
}
import { CompressedTextureLoader } from 'three';
