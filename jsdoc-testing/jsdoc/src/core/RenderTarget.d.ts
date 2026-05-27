/**
 * A render target is a buffer where the video card draws pixels for a scene
 * that is being rendered in the background. It is used in different effects,
 * such as applying postprocessing to a rendered image before displaying it
 * on the screen.
 *
 * @augments EventDispatcher
 */
export class RenderTarget extends EventDispatcher {
    /**
     * Render target options.
     *
     * @typedef {Object} RenderTarget~Options
     * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
     * @property {number} [magFilter=LinearFilter] - The mag filter.
     * @property {number} [minFilter=LinearFilter] - The min filter.
     * @property {number} [format=RGBAFormat] - The texture format.
     * @property {number} [type=UnsignedByteType] - The texture type.
     * @property {?string} [internalFormat=null] - The texture's internal format.
     * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
     * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
     * @property {number} [anisotropy=1] - The texture's anisotropy value.
     * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
     * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
     * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
     * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
     * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
     * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
     * @property {number} [samples=0] - The MSAA samples count.
     * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
     * @property {number} [depth=1] - The texture depth.
     * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering.
     */
    /**
     * Constructs a new render target.
     *
     * @param {number} [width=1] - The width of the render target.
     * @param {number} [height=1] - The height of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(width?: number, height?: number, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderTarget: boolean;
    /**
     * The width of the render target.
     *
     * @type {number}
     * @default 1
     */
    width: number;
    /**
     * The height of the render target.
     *
     * @type {number}
     * @default 1
     */
    height: number;
    /**
     * The depth of the render target.
     *
     * @type {number}
     * @default 1
     */
    depth: number;
    /**
     * A rectangular area inside the render target's viewport. Fragments that are
     * outside the area will be discarded.
     *
     * @type {Vector4}
     * @default (0,0,width,height)
     */
    scissor: Vector4;
    /**
     * Indicates whether the scissor test should be enabled when rendering into
     * this render target or not.
     *
     * @type {boolean}
     * @default false
     */
    scissorTest: boolean;
    /**
     * A rectangular area representing the render target's viewport.
     *
     * @type {Vector4}
     * @default (0,0,width,height)
     */
    viewport: Vector4;
    /**
     * An array of textures. Each color attachment is represented as a separate texture.
     * Has at least a single entry for the default color attachment.
     *
     * @type {Array<Texture>}
     */
    textures: Array<Texture>;
    /**
     * Whether to allocate a depth buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    depthBuffer: boolean;
    /**
     * Whether to allocate a stencil buffer or not.
     *
     * @type {boolean}
     * @default false
     */
    stencilBuffer: boolean;
    /**
     * Whether to resolve the depth buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    resolveDepthBuffer: boolean;
    /**
     * Whether to resolve the stencil buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    resolveStencilBuffer: boolean;
    _depthTexture: any;
    set depthTexture(current: DepthTexture | null);
    /**
     * Instead of saving the depth in a renderbuffer, a texture
     * can be used instead which is useful for further processing
     * e.g. in context of post-processing.
     *
     * @type {?DepthTexture}
     * @default null
     */
    get depthTexture(): DepthTexture | null;
    /**
     * The number of MSAA samples.
     *
     * A value of `0` disables MSAA.
     *
     * @type {number}
     * @default 0
     */
    samples: number;
    /**
     * Whether to this target is used in multiview rendering.
     *
     * @type {boolean}
     * @default false
     */
    multiview: boolean;
    _setTextureOptions(options?: {}): void;
    set texture(value: Texture);
    /**
     * The texture representing the default color attachment.
     *
     * @type {Texture}
     */
    get texture(): Texture;
    /**
     * Sets the size of this render target.
     *
     * @param {number} width - The width.
     * @param {number} height - The height.
     * @param {number} [depth=1] - The depth.
     */
    setSize(width: number, height: number, depth?: number): void;
    /**
     * Returns a new render target with copied values from this instance.
     *
     * @return {RenderTarget} A clone of this instance.
     */
    clone(): RenderTarget;
    /**
     * Copies the settings of the given render target. This is a structural copy so
     * no resources are shared between render targets after the copy. That includes
     * all MRT textures and the depth texture.
     *
     * @param {RenderTarget} source - The render target to copy.
     * @return {RenderTarget} A reference to this instance.
     */
    copy(source: RenderTarget): RenderTarget;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     *
     * @fires RenderTarget#dispose
     */
    dispose(): void;
}
import { EventDispatcher } from './EventDispatcher.js';
import { Vector4 } from '../math/Vector4.js';
import { Texture } from '../textures/Texture.js';
