import { Vector4 } from "../math/Vector4.js";
import { DepthTexture } from "../textures/DepthTexture.js";
import { Texture, TextureParameters } from "../textures/Texture.js";
import { EventDispatcher } from "./EventDispatcher.js";

/**
 * Render target options.
 */
export interface RenderTargetOptions extends TextureParameters {
    /**
     * Whether to allocate a depth buffer or not.
     * @default true
     */
    depthBuffer?: boolean | undefined;
    /**
     * Whether to allocate a stencil buffer or not.
     * @default false
     */
    stencilBuffer?: boolean | undefined;
    /**
     * Whether to resolve the color buffer or not. Only relevant for multisampled render targets.
     * @default true
     */
    resolveColorBuffer?: boolean | undefined;
    /**
     * Whether to resolve the depth buffer or not. Only relevant for multisampled render targets.
     * @default true
     */
    resolveDepthBuffer?: boolean | undefined;
    /**
     * Whether to resolve the stencil buffer or not. Only relevant for multisampled render targets.
     * @default true
     */
    resolveStencilBuffer?: boolean | undefined;
    /**
     * Whether to store the multisampled color buffer or not. Setting to `false` saves memory bandwidth when the
     * multisampled data are not needed after a render pass.
     * @default true
     */
    storeMultisampledColorBuffer?: boolean | undefined;
    /**
     * Whether to store the multisampled depth buffer or not. Setting to `false` saves memory bandwidth when the
     * multisampled data are not needed after a render pass.
     * @default true
     */
    storeMultisampledDepthBuffer?: boolean | undefined;
    /**
     * Whether to store the multisampled stencil buffer or not. Setting to `false` saves memory bandwidth when the
     * multisampled data are not needed after a render pass.
     * @default true
     */
    storeMultisampledStencilBuffer?: boolean | undefined;
    /**
     * Reference to a depth texture.
     * @default null
     */
    depthTexture?: DepthTexture | null | undefined;
    /**
     * The MSAA samples count.
     * @default 0
     */
    samples?: number | undefined;
    /**
     * Defines the number of color attachments. Use `0` for a depth-only render target (WebGPURenderer).
     * @default 1
     */
    count?: number | undefined;
    /**
     * The texture depth.
     * @default 1
     */
    depth?: number | undefined;
    /**
     * Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
     * @default false
     */
    multiview?: boolean | undefined;
    /**
     * Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from
     * multiview so layered render targets can use array depth without the multiview extension.
     * @default false
     */
    useArrayDepthTexture?: boolean | undefined;
}

export interface RenderTargetEventMap {
    dispose: {};
}

/**
 * A render target is a buffer where the video card draws pixels for a scene
 * that is being rendered in the background. It is used in different effects,
 * such as applying postprocessing to a rendered image before displaying it
 * on the screen.
 */
export class RenderTarget<
    TTexture extends Texture | Texture[] = Texture,
    TEventMap extends RenderTargetEventMap = RenderTargetEventMap,
> extends EventDispatcher<TEventMap> {
    /**
     * Constructs a new render target.
     *
     * @param {number} [width=1] - The width of the render target.
     * @param {number} [height=1] - The height of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(width?: number, height?: number, options?: RenderTargetOptions);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isRenderTarget: true;
    /**
     * The width of the render target.
     *
     * @default 1
     */
    width: number;
    /**
     * The height of the render target.
     *
     * @default 1
     */
    height: number;
    /**
     * The depth of the render target.
     *
     * @default 1
     */
    depth: number;
    /**
     * A rectangular area inside the render target's viewport. Fragments that are
     * outside the area will be discarded.
     *
     * @default (0,0,width,height)
     */
    scissor: Vector4;
    /**
     * Indicates whether the scissor test should be enabled when rendering into
     * this render target or not.
     *
     * @default false
     */
    scissorTest: boolean;
    /**
     * A rectangular area representing the render target's viewport.
     *
     * @default (0,0,width,height)
     */
    viewport: Vector4;
    /**
     * An array of textures. Each color attachment is represented as a separate texture.
     * Has at least a single entry for the default color attachment.
     */
    textures: TTexture[];
    /**
     * Whether to allocate a depth buffer or not.
     *
     * @default true
     */
    depthBuffer: boolean;
    /**
     * Whether to allocate a stencil buffer or not.
     *
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
     * @default true
     */
    resolveDepthBuffer: boolean;
    /**
     * Whether to resolve the stencil buffer or not. Analogous to
     * {@link RenderTarget#resolveDepthBuffer} but for the stencil aspect.
     *
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
     * @default true
     */
    storeMultisampledDepthBuffer: boolean;
    /**
     * Whether to store the multisampled stencil buffer or not. Analogous to
     * {@link RenderTarget#storeMultisampledDepthBuffer} but for the stencil aspect.
     *
     * @default true
     */
    storeMultisampledStencilBuffer: boolean;
    set depthTexture(current: DepthTexture | null);
    /**
     * Instead of saving the depth in a renderbuffer, a texture
     * can be used instead which is useful for further processing
     * e.g. in context of post-processing.
     *
     * @default null
     */
    get depthTexture(): DepthTexture | null;
    /**
     * The number of MSAA samples.
     *
     * A value of `0` disables MSAA.
     *
     * @default 0
     */
    samples: number;
    /**
     * Whether to this target is used in multiview rendering.
     *
     * @default false
     */
    multiview: boolean;
    /**
     * Whether to create the depth texture as an array texture for per-layer depth testing.
     * This is separate from multiview so layered render targets can use array depth without
     * the multiview extension.
     *
     * @default false
     */
    useArrayDepthTexture: boolean;
    set texture(value: TTexture);
    /**
     * The texture representing the default color attachment.
     */
    get texture(): TTexture;
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
    clone(): this;
    /**
     * Copies the settings of the given render target. This is a structural copy so
     * no resources are shared between render targets after the copy. That includes
     * all MRT textures and the depth texture.
     *
     * @param {RenderTarget} source - The render target to copy.
     * @return {RenderTarget} A reference to this instance.
     */
    copy(source: RenderTarget): this;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     *
     * This also frees the resources of the render target's textures. There is
     * no need to dispose them separately.
     *
     * @fires RenderTarget#dispose
     */
    dispose(): void;
}
