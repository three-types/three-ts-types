/**
 * A loader for the TIFF texture format.
 *
 * ```js
 * const loader = new TIFFLoader();
 * const texture = await loader.loadAsync( 'textures/tiff/crate_lzw.tif' );
 * texture.colorSpace = THREE.SRGBColorSpace;
 * ```
 *
 * @augments DataTextureLoader
 * @three_import import { TIFFLoader } from 'three/addons/loaders/TIFFLoader.js';
 */
export class TIFFLoader extends DataTextureLoader {
    /**
     * Constructs a new TIFF loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Parses the given TIFF texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer): DataTextureLoader;
}
import { DataTextureLoader } from 'three';
