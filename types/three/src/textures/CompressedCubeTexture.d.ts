import { CompressedPixelFormat, TextureDataType } from "../constants.js";
import { CompressedTexture, CompressedTextureImageData } from "./CompressedTexture.js";

/**
 * Creates a cube texture based on data in compressed form.
 *
 * These texture are usually loaded with {@link CompressedTextureLoader}.
 *
 * @augments CompressedTexture
 */
export class CompressedCubeTexture extends CompressedTexture<CompressedTextureImageData[]> {
    /**
     * Constructs a new compressed texture.
     *
     * @param {Array<CompressedTexture>} images - An array of compressed textures.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     */
    constructor(images: CompressedTextureImageData[], format?: CompressedPixelFormat, type?: TextureDataType);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCompressedCubeTexture: true;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeTexture: true;
}
