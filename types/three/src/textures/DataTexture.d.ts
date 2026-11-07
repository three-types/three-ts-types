import {
    ColorSpace,
    MagnificationTextureFilter,
    Mapping,
    MinificationTextureFilter,
    PixelFormat,
    TextureDataType,
    Wrapping,
} from "../constants.js";
import { TypedArray } from "../core/BufferAttribute.js";
import { Texture } from "./Texture.js";

export interface DataTextureImageData {
    data: TypedArray | null;
    width: number;
    height: number;
}

/**
 * Creates a texture directly from raw buffer data.
 *
 * The interpretation of the data depends on type and format: If the type is
 * `UnsignedByteType`, a `Uint8Array` will be useful for addressing the
 * texel data. If the format is `RGBAFormat`, data needs four values for
 * one texel; Red, Green, Blue and Alpha (typically the opacity).
 *
 * @augments Texture
 */
export class DataTexture extends Texture<DataTextureImageData> {
    /**
     * Constructs a new data texture.
     *
     * @param {?TypedArray} [data=null] - The buffer data.
     * @param {number} [width=1] - The width of the texture.
     * @param {number} [height=1] - The height of the texture.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=NearestFilter] - The mag filter value.
     * @param {number} [minFilter=NearestFilter] - The min filter value.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {string} [colorSpace=NoColorSpace] - The color space.
     */
    constructor(
        data?: TypedArray | null,
        width?: number,
        height?: number,
        format?: PixelFormat,
        type?: TextureDataType,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: MagnificationTextureFilter,
        minFilter?: MinificationTextureFilter,
        anisotropy?: number,
        colorSpace?: ColorSpace,
    );
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDataTexture: true;
}
