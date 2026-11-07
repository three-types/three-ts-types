import { Wrapping } from "../constants.js";
import { TypedArray } from "../core/BufferAttribute.js";
import { Texture } from "./Texture.js";

export interface Data3DTextureImageData {
    data: TypedArray | null;
    width: number;
    height: number;
    depth: number;
}

/**
 * Creates a three-dimensional texture from raw data, with parameters to
 * divide it into width, height, and depth.
 *
 * @augments Texture
 */
export class Data3DTexture extends Texture<Data3DTextureImageData> {
    /**
     * Constructs a new data array texture.
     *
     * @param {?TypedArray} [data=null] - The buffer data.
     * @param {number} [width=1] - The width of the texture.
     * @param {number} [height=1] - The height of the texture.
     * @param {number} [depth=1] - The depth of the texture.
     */
    constructor(data?: TypedArray | null, width?: number, height?: number, depth?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isData3DTexture: true;
    /**
     * This defines how the texture is wrapped in the depth and corresponds to
     * *W* in UVW mapping.
     *
     * @type {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)}
     * @default ClampToEdgeWrapping
     */
    wrapR: Wrapping;
    /**
     * Copies the values of the given texture to this instance.
     *
     * @param {Data3DTexture} source - The texture to copy.
     * @return {Data3DTexture} A reference to this instance.
     */
    copy(source: Data3DTexture): this;
}
