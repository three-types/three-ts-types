/**
 * Creates a texture based on data in compressed form.
 *
 * These texture are usually loaded with {@link CompressedTextureLoader}.
 *
 * @augments Texture
 */
export class CompressedTexture extends Texture {
    /**
     * Constructs a new compressed texture.
     *
     * @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip)
     * the data and dimensions.
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {string} [colorSpace=NoColorSpace] - The color space.
     */
    constructor(mipmaps: Array<Object>, width: number, height: number, format?: number, type?: number, mapping?: number, wrapS?: number, wrapT?: number, magFilter?: number, minFilter?: number, anisotropy?: number, colorSpace?: string);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCompressedTexture: boolean;
}
import { Texture } from './Texture.js';
