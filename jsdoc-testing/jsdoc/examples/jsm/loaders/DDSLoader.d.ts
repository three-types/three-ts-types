/**
 * A loader for the S3TC texture compression format.
 *
 * ```js
 * const loader = new DDSLoader();
 *
 * const map = loader.load( 'textures/compressed/disturb_dxt1_nomip.dds' );
 * map.colorSpace = THREE.SRGBColorSpace; // only for color textures
 * ```
 *
 * @augments CompressedTextureLoader
 * @three_import import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';
 */
export class DDSLoader extends CompressedTextureLoader {
    /**
     * Constructs a new DDS loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Parses the given S3TC texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @param {boolean} loadMipmaps - Whether to load mipmaps or not.
     * @return {CompressedTextureLoader~TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer, loadMipmaps: boolean): CompressedTextureLoader;
}
import { CompressedTextureLoader } from 'three';
