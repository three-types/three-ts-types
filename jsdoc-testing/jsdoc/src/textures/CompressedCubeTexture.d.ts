/**
 * Creates a cube texture based on data in compressed form.
 *
 * These texture are usually loaded with {@link CompressedTextureLoader}.
 *
 * @augments CompressedTexture
 */
export class CompressedCubeTexture extends CompressedTexture {
    /**
     * Constructs a new compressed texture.
     *
     * @param {Array<CompressedTexture>} images - An array of compressed textures.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     */
    constructor(images: Array<CompressedTexture>, format?: number, type?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCompressedCubeTexture: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeTexture: boolean;
    image: CompressedTexture[];
}
import { CompressedTexture } from './CompressedTexture.js';
