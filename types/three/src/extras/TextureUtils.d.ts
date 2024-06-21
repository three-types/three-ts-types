import { CompressedPixelFormat, PixelFormat, TextureDataType } from "../constants.js";

/**
 * Given the width, height, format, and type of a texture. Determines how many bytes must be used to represent the
 * texture.
 */
declare function getByteLength(
    width: number,
    height: number,
    format: PixelFormat | CompressedPixelFormat,
    type: TextureDataType,
): number;

/**
 * A class containing utility functions for textures.
 */
declare const TextureUtils: { getByteLength: typeof getByteLength };

export { getByteLength, TextureUtils };
