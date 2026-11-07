import {
    DepthTexturePixelFormat,
    MagnificationTextureFilter,
    Mapping,
    MinificationTextureFilter,
    TextureDataType,
    Wrapping,
} from "../constants.js";
import { DepthTexture, DepthTextureImageData } from "./DepthTexture.js";

export type CubeDepthTextureImageData = [
    DepthTextureImageData,
    DepthTextureImageData,
    DepthTextureImageData,
    DepthTextureImageData,
    DepthTextureImageData,
    DepthTextureImageData,
];

/**
 * This class can be used to automatically save the depth information of a
 * cube rendering into a cube texture with depth format. Used for PointLight shadows.
 *
 * @augments DepthTexture
 */
export class CubeDepthTexture extends DepthTexture<CubeDepthTextureImageData> {
    /**
     * Constructs a new cube depth texture.
     *
     * @param {number} size - The size (width and height) of each cube face.
     * @param {number} [type=UnsignedIntType] - The texture type.
     * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=NearestFilter] - The mag filter value.
     * @param {number} [minFilter=NearestFilter] - The min filter value.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {number} [format=DepthFormat] - The texture format.
     */
    constructor(
        size: number,
        type?: TextureDataType,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: MagnificationTextureFilter,
        minFilter?: MinificationTextureFilter,
        anisotropy?: number,
        format?: DepthTexturePixelFormat,
    );
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeDepthTexture: true;
    /**
     * Set to true for cube texture handling in WebGLTextures.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeTexture: true;
    set images(value: CubeDepthTextureImageData);
    /**
     * Alias for {@link CubeDepthTexture#image}.
     *
     * @type {Array<Image>}
     */
    get images(): CubeDepthTextureImageData;
}
