/**
 * A loader for the TGA texture format.
 *
 * ```js
 * const loader = new TGALoader();
 * const texture = await loader.loadAsync( 'textures/crate_color8.tga' );
 * texture.colorSpace = THREE.SRGBColorSpace; // only for color textures
 * ```
 *
 * @augments DataTextureLoader
 * @three_import import { TGALoader } from 'three/addons/loaders/TGALoader.js';
 */
export class TGALoader extends DataTextureLoader {
    /**
     * Constructs a new TGA loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Parses the given TGA texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer): DataTextureLoader;
}
import { DataTextureLoader } from 'three';
