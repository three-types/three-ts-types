/**
 * Loads HDR JPEG XL images using the browser's native decoder.
 * Produces half-float textures in linear sRGB. Requires float16 Canvas2D,
 * the srgb-linear canvas color space and globalHDRHeadroom.
 *
 * ```js
 * const texture = await new JXLLoader().loadAsync( 'image.jxl' );
 * const material = new THREE.MeshStandardMaterial( { emissive: 0xffffff, emissiveMap: texture } );
 * ```
 *
 * @augments Loader
 * @three_import import { JXLLoader } from 'three/addons/loaders/JXLLoader.js';
 */
export class JXLLoader extends Loader {
    /**
     * Loads a native HDR image into a half-float data texture.
     * @param {string} url - Image URL.
     * @param {function(DataTexture)} onLoad - Completion callback.
     * @param {Function} onProgress - Download progress callback.
     * @param {Function} onError - Error callback.
     * @return {DataTexture} Placeholder texture, populated after decoding.
     */
    load(url: string, onLoad: (arg0: DataTexture) => any, onProgress: Function, onError: Function): DataTexture;
    /**
     * Decodes image bytes using the browser, preserving maximum HDR headroom.
     * @param {ArrayBuffer} buffer - JPEG XL bytes.
     * @param {function(DataTexture)} onLoad - Completion callback.
     * @param {Function} onError - Error callback.
     */
    parse(buffer: ArrayBuffer, onLoad: (arg0: DataTexture) => any, onError: Function): void;
    /**
     * Async version of {@link JXLLoader#parse}.
     * @param {ArrayBuffer} buffer - JPEG XL bytes.
     * @return {Promise<DataTexture>} Half-float texture in linear sRGB.
     */
    parseAsync(buffer: ArrayBuffer): Promise<DataTexture>;
    _applyData(texture: any, { data, width, height }: {
        data: any;
        width: any;
        height: any;
    }): void;
    _decode(buffer: any): Promise<{
        data: Uint16Array<any>;
        width: number;
        height: number;
    }>;
}
import { Loader } from 'three';
import { DataTexture } from 'three';
