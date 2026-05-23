/**
 * A loader for the OpenEXR texture format.
 *
 * `EXRLoader` currently supports uncompressed, ZIP(S), RLE, PIZ, B44/A and DWA/B compression.
 * Supports reading as UnsignedByte, HalfFloat and Float type data texture.
 *
 * ```js
 * const loader = new EXRLoader();
 * const texture = await loader.loadAsync( 'textures/memorial.exr' );
 * ```
 *
 * @augments DataTextureLoader
 * @three_import import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
 */
export class EXRLoader extends DataTextureLoader {
    /**
     * Constructs a new EXR loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * The texture type.
     *
     * @type {(HalfFloatType|FloatType)}
     * @default HalfFloatType
     */
    type: (number | number);
    /**
     * Texture output format.
     *
     * @type {(RGBAFormat|RGFormat|RedFormat)}
     * @default RGBAFormat
     */
    outputFormat: (number | number | number);
    /**
     * For multi-part EXR files, the index of the part to load.
     *
     * @type {number}
     * @default 0
     */
    part: number;
    /**
     * Parses the given EXR texture data.
     *
     * @param {ArrayBuffer} buffer - The raw texture data.
     * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
     */
    parse(buffer: ArrayBuffer): DataTextureLoader;
    /**
     * Sets the texture type.
     *
     * @param {(HalfFloatType|FloatType)} value - The texture type to set.
     * @return {EXRLoader} A reference to this loader.
     */
    setDataType(value: (number | number)): EXRLoader;
    /**
     * Sets texture output format. Defaults to `RGBAFormat`.
     *
     * @param {(RGBAFormat|RGFormat|RedFormat)} value - Texture output format.
     * @return {EXRLoader} A reference to this loader.
     */
    setOutputFormat(value: (number | number | number)): EXRLoader;
    /**
     * For multi-part EXR files, sets which part to load.
     *
     * @param {number} value - The part index to load.
     * @return {EXRLoader} A reference to this loader.
     */
    setPart(value: number): EXRLoader;
    load(url: any, onLoad: any, onProgress: any, onError: any): import("three").DataTexture;
}
import { DataTextureLoader } from 'three';
