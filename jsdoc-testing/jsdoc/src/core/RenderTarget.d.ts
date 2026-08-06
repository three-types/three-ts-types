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
     * @property {boolean} [resolveColorBuffer=true] - Whether to resolve the color buffer or not. Only relevant for multisampled render targets.
     * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not. Only relevant for multisampled render targets.
     * @property {boolean} [resolveStencilBuffer=true] - Whether to resolve the stencil buffer or not. Only relevant for multisampled render targets.
     * @property {boolean} [storeMultisampledColorBuffer=true] - Whether to store the multisampled color buffer or not. Setting to `false` saves memory bandwidth when the multisampled data are not needed after a render pass.
     * @property {boolean} [storeMultisampledDepthBuffer=true] - Whether to store the multisampled depth buffer or not. Setting to `false` saves memory bandwidth when the multisampled data are not needed after a render pass.
     * @property {boolean} [storeMultisampledStencilBuffer=true] - Whether to store the multisampled stencil buffer or not. Setting to `false` saves memory bandwidth when the multisampled data are not needed after a render pass.
     * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
     * @property {number} [samples=0] - The MSAA samples count.
     * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
     * @property {number} [depth=1] - The texture depth.
     * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
     * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
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
     * Whether to resolve the color buffer or not. When set to `false`, the color
     * attachments do not receive the resolved (single-sampled) output of a render
     * pass and the render target's textures are left untouched. The rendered
     * content is then only accessible within the render pass itself.
     *
     * Only relevant for multisampled render targets.
     *
     * @type {boolean}
     * @default true
     */
    resolveColorBuffer: boolean;
    /**
     * Whether to resolve the depth buffer or not. When set to `false`, the depth
     * texture does not receive the resolved depth output of a render pass which
     * saves memory bandwidth. Use this setting when the depth data of a render
     * pass are not required afterwards.
     *
     * Only relevant for multisampled render targets in WebGL. WebGPU does not
     * support depth resolves; sampling the depth texture of a multisampled render
     * target accesses the multisampled data directly, see
     * {@link RenderTarget#storeMultisampledDepthBuffer}.
     *
     * @type {boolean}
     * @default true
     */
    resolveDepthBuffer: boolean;
    /**
     * Whether to resolve the stencil buffer or not. Analogous to
     * {@link RenderTarget#resolveDepthBuffer} but for the stencil aspect.
     *
     * @type {boolean}
     * @default true
     */
    resolveStencilBuffer: boolean;
    /**
     * Whether to store the multisampled color buffer or not. When set to `false`,
     * the multisampled data are discarded at the end of a render pass, right after
     * they have been resolved. This saves memory bandwidth, especially on tile-based
     * GPUs, and is the recommended setting for render targets that are fully redrawn
     * each frame and whose output is only accessed via the resolved textures (e.g.
     * scene passes in post-processing chains).
     *
     * Must be kept `true` when the multisampled data are needed after the render
     * pass ends, e.g. when rendering into the target without clearing or when the
     * scene contains transmissive objects which require a mid-pass framebuffer copy.
     *
     * @type {boolean}
     * @default true
     */
    storeMultisampledColorBuffer: boolean;
    /**
     * Whether to store the multisampled depth buffer or not. When set to `false`,
     * the multisampled depth data are discarded at the end of a render pass which
     * saves memory bandwidth.
     *
     * Must be kept `true` in WebGPU when the depth texture of a multisampled render
     * target is sampled (e.g. by depth-based post-processing effects) since depth
     * is read directly from the multisampled data.
     *
     * @type {boolean}
     * @default true
     */
    storeMultisampledDepthBuffer: boolean;
    /**
     * Whether to store the multisampled stencil buffer or not. Analogous to
     * {@link RenderTarget#storeMultisampledDepthBuffer} but for the stencil aspect.
     *
     * @type {boolean}
     * @default true
     */
    storeMultisampledStencilBuffer: boolean;
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
    /**
     * Whether to create the depth texture as an array texture for per-layer depth testing.
     * This is separate from multiview so layered render targets can use array depth without
     * the multiview extension.
     *
     * @type {boolean}
     * @default false
     */
    useArrayDepthTexture: boolean;
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
