/**
 * Scales the texture as large as possible within its surface without cropping
 * or stretching the texture. The method preserves the original aspect ratio of
 * the texture. Akin to CSS `object-fit: contain`
 *
 * @param {Texture} texture - The texture.
 * @param {number} aspect - The texture's aspect ratio.
 * @return {Texture} The updated texture.
 */
export function contain(texture: Texture, aspect: number): Texture;
/**
 * Scales the texture to the smallest possible size to fill the surface, leaving
 * no empty space. The method preserves the original aspect ratio of the texture.
 * Akin to CSS `object-fit: cover`.
 *
 * @param {Texture} texture - The texture.
 * @param {number} aspect - The texture's aspect ratio.
 * @return {Texture} The updated texture.
 */
export function cover(texture: Texture, aspect: number): Texture;
/**
 * Configures the texture to the default transformation. Akin to CSS `object-fit: fill`.
 *
 * @param {Texture} texture - The texture.
 * @return {Texture} The updated texture.
 */
export function fill(texture: Texture): Texture;
/**
 * Determines how many bytes must be used to represent the texture.
 *
 * @param {number} width - The width of the texture.
 * @param {number} height - The height of the texture.
 * @param {number} format - The texture's format.
 * @param {number} type - The texture's type.
 * @return {number} The byte length.
 */
export function getByteLength(width: number, height: number, format: number, type: number): number;
/**
 * A class containing utility functions for textures.
 *
 * @hideconstructor
 */
export class TextureUtils {
    /**
     * Scales the texture as large as possible within its surface without cropping
     * or stretching the texture. The method preserves the original aspect ratio of
     * the texture. Akin to CSS `object-fit: contain`
     *
     * @param {Texture} texture - The texture.
     * @param {number} aspect - The texture's aspect ratio.
     * @return {Texture} The updated texture.
     */
    static contain(texture: Texture, aspect: number): Texture;
    /**
     * Scales the texture to the smallest possible size to fill the surface, leaving
     * no empty space. The method preserves the original aspect ratio of the texture.
     * Akin to CSS `object-fit: cover`.
     *
     * @param {Texture} texture - The texture.
     * @param {number} aspect - The texture's aspect ratio.
     * @return {Texture} The updated texture.
     */
    static cover(texture: Texture, aspect: number): Texture;
    /**
     * Configures the texture to the default transformation. Akin to CSS `object-fit: fill`.
     *
     * @param {Texture} texture - The texture.
     * @return {Texture} The updated texture.
     */
    static fill(texture: Texture): Texture;
    /**
     * Determines how many bytes must be used to represent the texture.
     *
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @param {number} format - The texture's format.
     * @param {number} type - The texture's type.
     * @return {number} The byte length.
     */
    static getByteLength(width: number, height: number, format: number, type: number): number;
}
