import {
    MagnificationTextureFilter,
    Mapping,
    MinificationTextureFilter,
    PixelFormat,
    TextureDataType,
    Wrapping,
} from "../constants.js";
import { Texture } from "./Texture.js";

/**
 * Creates a texture from a canvas element.
 *
 * This is almost the same as the base texture class, except that it sets {@link Texture#needsUpdate}
 * to `true` immediately since a canvas can directly be used for rendering.
 *
 * @augments Texture
 */
export class CanvasTexture<TCanvas = HTMLCanvasElement> extends Texture<TCanvas> {
    /**
     * Constructs a new texture.
     *
     * @param {HTMLCanvasElement} [canvas] - The HTML canvas element.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     */
    constructor(
        canvas?: TCanvas,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: MagnificationTextureFilter,
        minFilter?: MinificationTextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
    );
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCanvasTexture: true;
}
