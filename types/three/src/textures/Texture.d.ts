import {
    AnyMapping,
    AnyPixelFormat,
    ColorSpace,
    MagnificationTextureFilter,
    Mapping,
    MinificationTextureFilter,
    PixelFormat,
    PixelFormatGPU,
    TextureDataType,
    Wrapping,
} from "../constants.js";
import { EventDispatcher } from "../core/EventDispatcher.js";
import { RenderTarget } from "../core/RenderTarget.js";
import { Matrix3 } from "../math/Matrix3.js";
import { Vector2 } from "../math/Vector2.js";
import { CompressedTextureMipmap } from "./CompressedTexture.js";
import { CubeTexture } from "./CubeTexture.js";
import { TextureSource } from "./TextureSource.js";

// NOTE: DOM upload fields are not implemented where parameters are accepted.
export interface TextureParameters {
    mapping?: AnyMapping | undefined;
    // image?: TexImageSource | OffscreenCanvas | undefined;
    // channel?: number | undefined;

    wrapS?: Wrapping | undefined;
    wrapT?: Wrapping | undefined;
    wrapR?: Wrapping | undefined;

    format?: PixelFormat | undefined;
    internalFormat?: PixelFormatGPU | null | undefined;
    type?: TextureDataType | undefined;
    colorSpace?: ColorSpace | undefined;

    magFilter?: MagnificationTextureFilter | undefined;
    minFilter?: MinificationTextureFilter | undefined;
    anisotropy?: number | undefined;

    flipY?: boolean | undefined;

    generateMipmaps?: boolean | undefined;
    mipmapsAutoUpdate?: boolean | undefined;
    // premultiplyAlpha?: boolean | undefined;
    // unpackAlignment?: number | undefined;
}

export interface TextureJSON {
    metadata: { version: number; type: string; generator: string };

    uuid: string;
    name: string;

    image: string;

    mapping: AnyMapping;
    channel: number;

    repeat: [x: number, y: number];
    offset: [x: number, y: number];
    center: [x: number, y: number];
    rotation: number;

    wrap: [wrapS: number, wrapT: number];

    format: AnyPixelFormat;
    internalFormat: PixelFormatGPU | null;
    type: TextureDataType;
    colorSpace: string;

    minFilter: MinificationTextureFilter;
    magFilter: MagnificationTextureFilter;
    anisotropy: number;

    flipY: boolean;

    generateMipmaps: boolean;
    mipmapsAutoUpdate: boolean;
    premultiplyAlpha: boolean;
    unpackAlignment: number;

    userData?: Record<string, unknown>;
}

/** Shim for OffscreenCanvas. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OffscreenCanvas extends EventTarget {}

export interface TextureEventMap {
    dispose: {};
}

/**
 * Base class for all textures.
 *
 * Note: After the initial use of a texture, its dimensions, format, and type
 * cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one.
 *
 * @augments EventDispatcher
 */
export class Texture<TImage = unknown, TEventMap extends TextureEventMap = TextureEventMap>
    extends EventDispatcher<TEventMap>
{
    /**
     * Constructs a new texture.
     *
     * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
     * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
     * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
     * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
     * @param {number} [magFilter=LinearFilter] - The mag filter value.
     * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
     * @param {number} [format=RGBAFormat] - The texture format.
     * @param {number} [type=UnsignedByteType] - The texture type.
     * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
     * @param {string} [colorSpace=NoColorSpace] - The color space.
     */
    constructor(
        image?: TImage,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: MagnificationTextureFilter,
        minFilter?: MinificationTextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
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
    readonly isTexture: true;
    /**
     * The ID of the texture.
     *
     * @type {number}
     * @readonly
     */
    readonly id: number;
    /**
     * The UUID of the texture.
     *
     * @type {string}
     * @readonly
     */
    readonly uuid: string;
    /**
     * The name of the texture.
     *
     * @type {string}
     */
    name: string;
    /**
     * The data definition of a texture. A reference to the data source can be
     * shared across textures. This is often useful in context of spritesheets
     * where multiple textures render the same data but with different texture
     * transformations.
     *
     * @type {TextureSource}
     */
    source: TextureSource<TImage>;
    /**
     * An array holding user-defined mipmaps.
     *
     * @type {Array<Object>}
     */
    mipmaps: CompressedTextureMipmap[] | CubeTexture[] | HTMLCanvasElement[];
    /**
     * How the texture is applied to the object. The value `UVMapping`
     * is the default, where texture or uv coordinates are used to apply the map.
     *
     * @type {(UVMapping|CubeReflectionMapping|CubeRefractionMapping|EquirectangularReflectionMapping|EquirectangularRefractionMapping)}
     * @default UVMapping
     */
    mapping: AnyMapping;
    /**
     * Lets you select the uv attribute to map the texture to. `0` for `uv`,
     * `1` for `uv1`, `2` for `uv2` and `3` for `uv3`.
     *
     * @type {number}
     * @default 0
     */
    channel: number;
    /**
     * This defines how the texture is wrapped horizontally and corresponds to
     * *U* in UV mapping.
     *
     * @type {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)}
     * @default ClampToEdgeWrapping
     */
    wrapS: Wrapping;
    /**
     * This defines how the texture is wrapped horizontally and corresponds to
     * *V* in UV mapping.
     *
     * @type {(RepeatWrapping|ClampToEdgeWrapping|MirroredRepeatWrapping)}
     * @default ClampToEdgeWrapping
     */
    wrapT: Wrapping;
    /**
     * How the texture is sampled when a texel covers more than one pixel.
     *
     * @type {(NearestFilter|NearestMipmapNearestFilter|NearestMipmapLinearFilter|LinearFilter|LinearMipmapNearestFilter|LinearMipmapLinearFilter)}
     * @default LinearFilter
     */
    magFilter: MagnificationTextureFilter;
    /**
     * How the texture is sampled when a texel covers less than one pixel.
     *
     * @type {(NearestFilter|NearestMipmapNearestFilter|NearestMipmapLinearFilter|LinearFilter|LinearMipmapNearestFilter|LinearMipmapLinearFilter)}
     * @default LinearMipmapLinearFilter
     */
    minFilter: MinificationTextureFilter;
    /**
     * The number of samples taken along the axis through the pixel that has the
     * highest density of texels. By default, this value is `1`. A higher value
     * gives a less blurry result than a basic mipmap, at the cost of more
     * texture samples being used.
     *
     * @type {number}
     * @default Texture.DEFAULT_ANISOTROPY
     */
    anisotropy: number;
    /**
     * The format of the texture.
     *
     * @type {number}
     * @default RGBAFormat
     */
    format: AnyPixelFormat;
    /**
     * The default internal format is derived from {@link Texture#format} and {@link Texture#type} and
     * defines how the texture data is going to be stored on the GPU.
     *
     * This property allows to overwrite the default format.
     *
     * @type {?string}
     * @default null
     */
    internalFormat: PixelFormatGPU | null;
    /**
     * The data type of the texture.
     *
     * @type {number}
     * @default UnsignedByteType
     */
    type: TextureDataType;
    /**
     * How much a single repetition of the texture is offset from the beginning,
     * in each direction U and V. Typical range is `0.0` to `1.0`.
     *
     * @type {Vector2}
     * @default (0,0)
     */
    offset: Vector2;
    /**
     * How many times the texture is repeated across the surface, in each
     * direction U and V. If repeat is set greater than `1` in either direction,
     * the corresponding wrap parameter should also be set to `RepeatWrapping`
     * or `MirroredRepeatWrapping` to achieve the desired tiling effect.
     *
     * @type {Vector2}
     * @default (1,1)
     */
    repeat: Vector2;
    /**
     * The point around which rotation occurs. A value of `(0.5, 0.5)` corresponds
     * to the center of the texture. Default is `(0, 0)`, the lower left.
     *
     * @type {Vector2}
     * @default (0,0)
     */
    center: Vector2;
    /**
     * How much the texture is rotated around the center point, in radians.
     * Positive values are counter-clockwise.
     *
     * @type {number}
     * @default 0
     */
    rotation: number;
    /**
     * Whether to update the texture's uv-transformation {@link Texture#matrix}
     * from the properties {@link Texture#offset}, {@link Texture#repeat},
     * {@link Texture#rotation}, and {@link Texture#center}.
     *
     * Set this to `false` if you are specifying the uv-transform matrix directly.
     *
     * @type {boolean}
     * @default true
     */
    matrixAutoUpdate: boolean;
    /**
     * The uv-transformation matrix of the texture.
     *
     * @type {Matrix3}
     */
    matrix: Matrix3;
    /**
     * Whether to generate mipmaps (if possible) for a texture.
     *
     * Set this to `false` if you are creating mipmaps manually.
     *
     * @type {boolean}
     * @default true
     */
    generateMipmaps: boolean;
    /**
     * Whether the renderer regenerates the mipmaps automatically whenever the
     * texture is uploaded, rendered to or copied into. Set this to `false` to
     * pause the regeneration and write the mip levels yourself. Requires
     * {@link Texture#generateMipmaps}.
     *
     * @type {boolean}
     * @default true
     */
    mipmapsAutoUpdate: boolean;
    /**
     * If set to `true`, the alpha channel, if present, is multiplied into the
     * color channels when the texture is uploaded to the GPU.
     *
     * Note that this property has no effect when using `ImageBitmap`. You need to
     * configure premultiply alpha on bitmap creation instead.
     *
     * @type {boolean}
     * @default false
     */
    premultiplyAlpha: boolean;
    /**
     * If set to `true`, the texture is flipped along the vertical axis when
     * uploaded to the GPU.
     *
     * Note that this property has no effect when using `ImageBitmap`. You need to
     * configure the flip on bitmap creation instead.
     *
     * @type {boolean}
     * @default true
     */
    flipY: boolean;
    /**
     * Specifies the alignment requirements for the start of each pixel row in memory.
     * The allowable values are `1` (byte-alignment), `2` (rows aligned to even-numbered bytes),
     * `4` (word-alignment), and `8` (rows start on double-word boundaries).
     *
     * @type {number}
     * @default 4
     */
    unpackAlignment: number;
    /**
     * Textures containing color data should be annotated with `SRGBColorSpace` or `LinearSRGBColorSpace`.
     *
     * @type {string}
     * @default NoColorSpace
     */
    colorSpace: string;
    /**
     * An object that can be used to store custom data about the texture. It
     * should not hold references to functions as these will not be cloned.
     *
     * @type {Object}
     */
    userData: Record<string, any>;
    /**
     * This can be used to only update parts of a data texture (for example, just a few rows).
     * Use the `addUpdateRange()` function to add ranges to this array.
     *
     * @type {Array<Object>}
     */
    updateRanges: Array<{ start: number; count: number }>;
    /**
     * This starts at `0` and counts how many times {@link Texture#needsUpdate} is set to `true`.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly version: number;
    /**
     * A callback function, called when the texture is updated (e.g., when
     * {@link Texture#needsUpdate} has been set to true and then the texture is used).
     *
     * @type {?Function}
     * @default null
     */
    onUpdate: ((texture: Texture) => void) | null;
    /**
     * An optional back reference to the textures render target.
     *
     * @type {?(RenderTarget|WebGLRenderTarget)}
     * @default null
     */
    renderTarget: RenderTarget | null;
    /**
     * Indicates whether a texture belongs to a render target or not.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    readonly isRenderTargetTexture: boolean;
    /**
     * Indicates if a texture should be handled like a texture array.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    readonly isArrayTexture: boolean;
    /**
     * Indicates whether this texture should be processed by `PMREMGenerator` or not
     * (only relevant for render target textures).
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly pmremVersion: number;
    /**
     * Indicates whether this texture is a prefiltered cube environment map generated
     * by {@link PMREMGenerator}.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    isPMREMTexture: boolean;
    /**
     * Whether the texture should use one of the 16 bit integer formats which are normalized
     * to [0, 1] or [-1, 1] (depending on signed/unsigned) when sampled.
     *
     * @type {boolean}
     * @default false
     */
    normalized: boolean;
    /**
     * The width of the texture in pixels.
     */
    get width(): number;
    /**
     * The height of the texture in pixels.
     */
    get height(): number;
    /**
     * The depth of the texture in pixels.
     */
    get depth(): number;
    set image(value: TImage);
    /**
     * The image object holding the texture data.
     *
     * @type {?Object}
     */
    get image(): TImage;
    /**
     * Updates the texture transformation matrix from the properties {@link Texture#offset},
     * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
     */
    updateMatrix(): void;
    /**
     * Adds a range of data in the data texture to be updated on the GPU.
     *
     * Update ranges assume four components per texel, so they currently only work with `RGBAFormat`.
     * Each range must stay within a single row of the texture. To update several rows, add one
     * range per row. Update ranges are only supported in `WebGLRenderer`.
     *
     * @param {number} start - Index of the first array element to update.
     * @param {number} count - The number of array elements to update.
     */
    addUpdateRange(start: number, count: number): void;
    /**
     * Clears the update ranges.
     */
    clearUpdateRanges(): void;
    /**
     * Returns a new texture with copied values from this instance.
     *
     * @return {Texture} A clone of this instance.
     */
    clone(): this;
    /**
     * Copies the values of the given texture to this instance.
     *
     * @param {Texture} source - The texture to copy.
     * @return {Texture} A reference to this instance.
     */
    copy(source: Texture<TImage>): this;
    /**
     * Setting this property to `true` indicates the engine the texture
     * must be updated in the next render. This triggers a texture upload
     * to the GPU and ensures correct texture parameter configuration.
     *
     * @type {boolean}
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
    /**
     * Sets this texture's properties based on `values`.
     * @param {Object} values - A container with texture parameters.
     */
    setValues(values: TextureParameters): void;
    /**
     * Serializes the texture into JSON.
     *
     * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
     * @return {Object} A JSON object representing the serialized texture.
     * @see {@link ObjectLoader#parse}
     */
    toJSON(meta?: string | {}): TextureJSON;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     *
     * Textures that belong to a render target are managed by the render target.
     * Calling this method on such a texture only dispatches the dispose event but
     * does not free any GPU resources. Use {@link RenderTarget#dispose} instead.
     *
     * @fires Texture#dispose
     */
    dispose(): void;
    /**
     * Transforms the given uv vector with the textures uv transformation matrix.
     *
     * @param {Vector2} uv - The uv vector.
     * @return {Vector2} The transformed uv vector.
     */
    transformUv(uv: Vector2): Vector2;
    /**
     * Setting this property to `true` indicates the engine the PMREM
     * must be regenerated.
     *
     * @type {boolean}
     * @default false
     * @param {boolean} value
     */
    set needsPMREMUpdate(value: boolean);
    /**
     * The default image for all textures.
     *
     * @default null
     */
    static DEFAULT_IMAGE: null;
    /**
     * The default mapping for all textures.
     *
     * @default UVMapping
     */
    static DEFAULT_MAPPING: Mapping;
    /**
     * The default anisotropy value for all textures.
     *
     * @default 1
     */
    static DEFAULT_ANISOTROPY: number;
}
