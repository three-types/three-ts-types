import {
    DepthTexturePixelFormat,
    MagnificationTextureFilter,
    Mapping,
    MinificationTextureFilter,
    TextureComparisonFunction,
    TextureDataType,
    Wrapping,
} from "../constants.js";
import { Texture, TextureJSON } from "./Texture.js";

export interface DepthTextureImageData {
    width: number | undefined;
    height: number | undefined;
    depth: number;
}

export interface DepthTextureJSON extends TextureJSON {
    compareFunction: TextureComparisonFunction | null;
}

/**
 * This class can be used to automatically save the depth information of a
 * rendering into a texture.
 *
 * @augments Texture
 */
export class DepthTexture<TImage = DepthTextureImageData> extends Texture<TImage> {
    /**
     * Constructs a new depth texture.
     *
     * @param {number} width - The width of the texture.
     * @param {number} height - The height of the texture.
     * @param {number} [type=UnsignedIntType] - The texture type.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=NearestFilter] - The mag filter value.
     * @param {number} [minFilter=NearestFilter] - The min filter value.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {number} [format=DepthFormat] - The texture format.
     * @param {number} [depth=1] - The depth of the texture.
     */
    constructor(
        width?: number,
        height?: number,
        type?: TextureDataType,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: MagnificationTextureFilter,
        minFilter?: MinificationTextureFilter,
        anisotropy?: number,
        format?: DepthTexturePixelFormat,
        depth?: number,
    );
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDepthTexture: true;
    format: DepthTexturePixelFormat;
    /**
     * Code corresponding to the depth compare function.
     *
     * @type {?(NeverCompare|LessCompare|EqualCompare|LessEqualCompare|GreaterCompare|NotEqualCompare|GreaterEqualCompare|AlwaysCompare)}
     * @default null
     */
    compareFunction: TextureComparisonFunction | null;
    copy(source: DepthTexture<TImage>): this;
    toJSON(meta?: string | {}): DepthTextureJSON;
}
