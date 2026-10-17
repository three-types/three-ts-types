/**
 * ~Options
 */
export type WebGLRenderer = {
    /**
     * - A canvas element where the renderer draws its output. If not passed in here, a new canvas element will be created by the renderer.
     */
    canvas?: HTMLCanvasElement | OffscreenCanvas | undefined;
    /**
     * - Can be used to attach an existing rendering context to this renderer.
     */
    context?: WebGL2RenderingContext | undefined;
    /**
     * - The default shader precision. Uses `highp` if supported by the device.
     */
    precision?: "highp" | "mediump" | "lowp" | undefined;
    /**
     * - Controls the default clear alpha value. When set to`true`, the value is `0`. Otherwise it's `1`.
     */
    alpha?: boolean | undefined;
    /**
     * Whether the renderer will assume colors have premultiplied alpha or not.
     */
    premultipliedAlpha?: boolean | undefined;
    /**
     * Whether to use the default MSAA or not.
     */
    antialias?: boolean | undefined;
    /**
     * Whether the drawing buffer has a stencil buffer of at least 8 bits or not.
     */
    stencil?: boolean | undefined;
    /**
     * Whether to preserve the buffer until manually cleared or overwritten.
     */
    preserveDrawingBuffer?: boolean | undefined;
    /**
     * Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context.
     */
    powerPreference?: "default" | "high-performance" | "low-power" | undefined;
    /**
     * Whether the renderer creation will fail upon low performance is detected.
     */
    failIfMajorPerformanceCaveat?: boolean | undefined;
    /**
     * Whether the drawing buffer has a depth buffer of at least 16 bits.
     */
    depth?: boolean | undefined;
    /**
     * Whether to use a logarithmic depth buffer. It may be necessary to use this if dealing with huge differences in scale in a single scene.
     * Note that this setting uses `gl_FragDepth` if available which disables the Early Fragment Test optimization and can cause a decrease in performance.
     */
    logarithmicDepthBuffer?: boolean | undefined;
    /**
     * Whether to use a reverse depth buffer. Requires the `EXT_clip_control` extension.
     * This is a more faster and accurate version than logarithmic depth buffer.
     */
    reversedDepthBuffer?: boolean | undefined;
    /**
     * Defines the type of the output buffer. Use `HalfFloatType` for HDR rendering with tone mapping and post-processing support.
     */
    outputBufferType?: number | undefined;
};
/**
 * This renderer uses WebGL 2 to display scenes.
 *
 * WebGL 1 is not supported since `r163`.
 */
export class WebGLRenderer {
    /**
     * Constructs a new WebGL renderer.
     *
     * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
     */
    constructor(parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLRenderer: boolean;
    /**
     * A canvas where the renderer draws its output. This is automatically created by the renderer
     * in the constructor (if not provided already); you just need to add it to your page like so:
     * ```js
     * document.body.appendChild( renderer.domElement );
     * ```
     *
     * @type {HTMLCanvasElement|OffscreenCanvas}
     */
    domElement: HTMLCanvasElement | OffscreenCanvas;
    /**
     * A object with debug configuration settings.
     *
     * - `checkShaderErrors`: If it is `true`, defines whether material shader programs are
     * checked for errors during compilation and linkage process. It may be useful to disable
     * this check in production for performance gain. It is strongly recommended to keep these
     * checks enabled during development. If the shader does not compile and link, it will not
     * work and associated material will not render.
     * - `onShaderError(gl, program, glVertexShader,glFragmentShader)`: A callback function that
     * can be used for custom error reporting. The callback receives the WebGL context, an instance
     * of WebGLProgram as well two instances of WebGLShader representing the vertex and fragment shader.
     * Assigning a custom function disables the default error reporting.
     *
     * @type {Object}
     */
    debug: Object;
    /**
     * Whether the renderer should automatically clear its output before rendering a frame or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClear: boolean;
    /**
     * If {@link WebGLRenderer#autoClear} set to `true`, whether the renderer should clear
     * the color buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClearColor: boolean;
    /**
     * If {@link WebGLRenderer#autoClear} set to `true`, whether the renderer should clear
     * the depth buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClearDepth: boolean;
    /**
     * If {@link WebGLRenderer#autoClear} set to `true`, whether the renderer should clear
     * the stencil buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClearStencil: boolean;
    /**
     * Whether the renderer should sort objects or not.
     *
     * Note: Sorting is used to attempt to properly render objects that have some
     * degree of transparency. By definition, sorting objects may not work in all
     * cases. Depending on the needs of application, it may be necessary to turn
     * off sorting and use other methods to deal with transparency rendering e.g.
     * manually determining each object's rendering order.
     *
     * @type {boolean}
     * @default true
     */
    sortObjects: boolean;
    /**
     * User-defined clipping planes specified in world space. These planes apply globally.
     * Points in space whose dot product with the plane is negative are cut away.
     *
     * @type {Array<Plane>}
     */
    clippingPlanes: Array<Plane>;
    /**
     * Whether the renderer respects object-level clipping planes or not.
     *
     * @type {boolean}
     * @default false
     */
    localClippingEnabled: boolean;
    /**
     * The tone mapping technique of the renderer.
     *
     * @type {(NoToneMapping|LinearToneMapping|ReinhardToneMapping|CineonToneMapping|ACESFilmicToneMapping|CustomToneMapping|AgXToneMapping|NeutralToneMapping)}
     * @default NoToneMapping
     */
    toneMapping: (number | LinearToneMapping | ReinhardToneMapping | CineonToneMapping | ACESFilmicToneMapping | CustomToneMapping | AgXToneMapping | NeutralToneMapping);
    /**
     * Exposure level of tone mapping.
     *
     * @type {number}
     * @default 1
     */
    toneMappingExposure: number;
    /**
     * The normalized resolution scale for the transmission render target, measured in percentage
     * of viewport dimensions. Lowering this value can result in significant performance improvements
     * when using {@link MeshPhysicalMaterial#transmission}.
     *
     * @type {number}
     * @default 1
     */
    transmissionResolutionScale: number;
    _outputColorSpace: string;
    /**
     * A reference to the XR manager.
     *
     * @type {WebXRManager}
     */
    xr: WebXRManager;
    /**
     * Returns the rendering context.
     *
     * @return {WebGL2RenderingContext} The rendering context.
     */
    getContext: () => WebGL2RenderingContext;
    /**
     * Returns the rendering context attributes.
     *
     * @return {WebGLContextAttributes} The rendering context attributes.
     */
    getContextAttributes: () => WebGLContextAttributes;
    /**
     * Simulates a loss of the WebGL context. This requires support for the `WEBGL_lose_context` extension.
     */
    forceContextLoss: () => void;
    /**
     * Simulates a restore of the WebGL context. This requires support for the `WEBGL_lose_context` extension.
     */
    forceContextRestore: () => void;
    /**
     * Returns the pixel ratio.
     *
     * @return {number} The pixel ratio.
     */
    getPixelRatio: () => number;
    /**
     * Sets the given pixel ratio and resizes the canvas if necessary.
     *
     * @param {number} value - The pixel ratio.
     */
    setPixelRatio: (value: number) => void;
    /**
     * Returns the renderer's size in logical pixels. This method does not honor the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The renderer's size in logical pixels.
     */
    getSize: (target: Vector2) => Vector2;
    /**
     * Resizes the output canvas to (width, height) with device pixel ratio taken
     * into account, and also sets the viewport to fit that size, starting in (0,
     * 0). Setting `updateStyle` to false prevents any style changes to the output canvas.
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     * @param {boolean} [updateStyle=true] - Whether to update the `style` attribute of the canvas or not.
     */
    setSize: (width: number, height: number, updateStyle?: boolean) => void;
    /**
     * Returns the drawing buffer size in physical pixels. This method honors the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The drawing buffer size.
     */
    getDrawingBufferSize: (target: Vector2) => Vector2;
    /**
     * This method allows to define the drawing buffer size by specifying
     * width, height and pixel ratio all at once. The size of the drawing
     * buffer is computed with this formula:
     * ```js
     * size.x = width * pixelRatio;
     * size.y = height * pixelRatio;
     * ```
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     * @param {number} pixelRatio - The pixel ratio.
     */
    setDrawingBufferSize: (width: number, height: number, pixelRatio: number) => void;
    /**
     * Sets the post-processing effects to be applied after rendering.
     *
     * @param {Array} effects - An array of post-processing effects.
     */
    setEffects: (effects: any[]) => void;
    /**
     * Returns the current viewport definition.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The current viewport definition.
     */
    getCurrentViewport: (target: Vector2) => Vector2;
    /**
     * Returns the viewport definition.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The viewport definition.
     */
    getViewport: (target: Vector4) => Vector4;
    /**
     * Sets the viewport to render from `(x, y)` to `(x + width, y + height)`.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.
     * Or alternatively a four-component vector specifying all the parameters of the viewport.
     * @param {number} y - The vertical coordinate for the lower left corner of the viewport origin  in logical pixel unit.
     * @param {number} width - The width of the viewport in logical pixel unit.
     * @param {number} height - The height of the viewport in logical pixel unit.
     */
    setViewport: (x: number | Vector4, y: number, width: number, height: number) => void;
    /**
     * Returns the scissor region.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The scissor region.
     */
    getScissor: (target: Vector4) => Vector4;
    /**
     * Sets the scissor region to render from `(x, y)` to `(x + width, y + height)`.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the scissor region origin in logical pixel unit.
     * Or alternatively a four-component vector specifying all the parameters of the scissor region.
     * @param {number} y - The vertical coordinate for the lower left corner of the scissor region origin  in logical pixel unit.
     * @param {number} width - The width of the scissor region in logical pixel unit.
     * @param {number} height - The height of the scissor region in logical pixel unit.
     */
    setScissor: (x: number | Vector4, y: number, width: number, height: number) => void;
    /**
     * Returns `true` if the scissor test is enabled.
     *
     * @return {boolean} Whether the scissor test is enabled or not.
     */
    getScissorTest: () => boolean;
    /**
     * Enable or disable the scissor test. When this is enabled, only the pixels
     * within the defined scissor area will be affected by further renderer
     * actions.
     *
     * @param {boolean} boolean - Whether the scissor test is enabled or not.
     */
    setScissorTest: (boolean: boolean) => void;
    /**
     * Sets a custom opaque sort function for the render lists. Pass `null`
     * to use the default `painterSortStable` function.
     *
     * @param {?Function} method - The opaque sort function.
     */
    setOpaqueSort: (method: Function | null) => void;
    /**
     * Sets a custom transparent sort function for the render lists. Pass `null`
     * to use the default `reversePainterSortStable` function.
     *
     * @param {?Function} method - The opaque sort function.
     */
    setTransparentSort: (method: Function | null) => void;
    /**
     * Returns the clear color.
     *
     * @param {Color} target - The method writes the result in this target object.
     * @return {Color} The clear color.
     */
    getClearColor: (target: Color) => Color;
    /**
     * Sets the clear color and alpha.
     *
     * @param {Color} color - The clear color.
     * @param {number} [alpha=1] - The clear alpha.
     */
    setClearColor: (...args: any[]) => void;
    /**
     * Returns the clear alpha. Ranges within `[0,1]`.
     *
     * @return {number} The clear alpha.
     */
    getClearAlpha: () => number;
    /**
     * Sets the clear alpha.
     *
     * @param {number} alpha - The clear alpha.
     */
    setClearAlpha: (...args: any[]) => void;
    /**
     * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
     * This method initializes the buffers to the current clear color values.
     *
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear: (color?: boolean, depth?: boolean, stencil?: boolean) => void;
    /**
     * Clears the color buffer. Equivalent to calling `renderer.clear( true, false, false )`.
     */
    clearColor: () => void;
    /**
     * Clears the depth buffer. Equivalent to calling `renderer.clear( false, true, false )`.
     */
    clearDepth: () => void;
    /**
     * Clears the stencil buffer. Equivalent to calling `renderer.clear( false, false, true )`.
     */
    clearStencil: () => void;
    /**
     * Sets a compatibility node builder for rendering node materials with WebGLRenderer.
     * This enables using TSL (Three.js Shading Language) node materials to prepare
     * for migration to WebGPURenderer.
     *
     * @param {WebGLNodesHandler} nodesHandler - The node builder instance.
     */
    setNodesHandler: (nodesHandler: WebGLNodesHandler) => void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose: () => void;
    renderBufferDirect: (camera: any, scene: any, geometry: any, material: any, object: any, group: any) => void;
    /**
     * Compiles all materials in the scene with the camera. This is useful to precompile shaders
     * before the first rendering. If you want to add a 3D object to an existing scene, use the third
     * optional parameter for applying the target scene.
     *
     * Note that the (target) scene's lighting and environment must be configured before calling this method.
     *
     * @param {Object3D} scene - The scene or another type of 3D object to precompile.
     * @param {Camera} camera - The camera.
     * @param {?Scene} [targetScene=null] - The target scene.
     * @return {Set<Material>} The precompiled materials.
     */
    compile: (scene: Object3D, camera: Camera, targetScene?: Scene | null) => Set<Material>;
    /**
     * Asynchronous version of {@link WebGLRenderer#compile}.
     *
     * This method makes use of the `KHR_parallel_shader_compile` WebGL extension. Hence,
     * it is recommended to use this version of `compile()` whenever possible.
     *
     * @async
     * @param {Object3D} scene - The scene or another type of 3D object to precompile.
     * @param {Camera} camera - The camera.
     * @param {?Scene} [targetScene=null] - The target scene.
     * @return {Promise} A Promise that resolves when the given scene can be rendered without unnecessary stalling due to shader compilation.
     */
    compileAsync: (scene: Object3D, camera: Camera, targetScene?: Scene | null) => Promise<any>;
    /**
     * Applications are advised to always define the animation loop
     * with this method and not manually with `requestAnimationFrame()`
     * for best compatibility.
     *
     * @param {?onAnimationCallback} callback - The application's animation loop.
     */
    setAnimationLoop: (callback: onAnimationCallback | null) => void;
    /**
     * Renders the given scene (or other type of 3D object) using the given camera.
     *
     * The render is done to a previously specified render target set by calling {@link WebGLRenderer#setRenderTarget}
     * or to the canvas as usual.
     *
     * By default render buffers are cleared before rendering but you can prevent
     * this by setting the property `autoClear` to `false`. If you want to prevent
     * only certain buffers being cleared you can `autoClearColor`, `autoClearDepth`
     * or `autoClearStencil` to `false`. To force a clear, use {@link WebGLRenderer#clear}.
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * Returns the active cube face.
     *
     * @return {number} The active cube face.
     */
    getActiveCubeFace: () => number;
    /**
     * Returns the active mipmap level.
     *
     * @return {number} The active mipmap level.
     */
    getActiveMipmapLevel: () => number;
    /**
     * Returns the active render target.
     *
     * @return {?WebGLRenderTarget} The active render target. Returns `null` if no render target
     * is currently set.
     */
    getRenderTarget: () => WebGLRenderTarget | null;
    setRenderTargetTextures: (renderTarget: any, colorTexture: any, depthTexture: any) => void;
    setRenderTargetFramebuffer: (renderTarget: any, defaultFramebuffer: any) => void;
    /**
     * Sets the active rendertarget.
     *
     * @param {?WebGLRenderTarget} renderTarget - The render target to set. When `null` is given,
     * the canvas is set as the active render target instead.
     * @param {number} [activeCubeFace=0] - The active cube face when using a cube render target.
     * Indicates the z layer to render in to when using 3D or array render targets.
     * @param {number} [activeMipmapLevel=0] - The active mipmap level.
     */
    setRenderTarget: (renderTarget: WebGLRenderTarget | null, activeCubeFace?: number, activeMipmapLevel?: number) => void;
    /**
     * Reads the pixel data from the given render target into the given buffer.
     *
     * @param {WebGLRenderTarget} renderTarget - The render target to read from.
     * @param {number} x - The `x` coordinate of the copy region's origin.
     * @param {number} y - The `y` coordinate of the copy region's origin.
     * @param {number} width - The width of the copy region.
     * @param {number} height - The height of the copy region.
     * @param {TypedArray} buffer - The result buffer.
     * @param {number} [activeCubeFaceIndex] - The active cube face index.
     * @param {number} [textureIndex=0] - The texture index of an MRT render target.
     */
    readRenderTargetPixels: (renderTarget: WebGLRenderTarget, x: number, y: number, width: number, height: number, buffer: TypedArray, activeCubeFaceIndex?: number, textureIndex?: number) => void;
    /**
     * Asynchronous, non-blocking version of {@link WebGLRenderer#readRenderTargetPixels}.
     *
     * It is recommended to use this version of `readRenderTargetPixels()` whenever possible.
     *
     * @async
     * @param {WebGLRenderTarget} renderTarget - The render target to read from.
     * @param {number} x - The `x` coordinate of the copy region's origin.
     * @param {number} y - The `y` coordinate of the copy region's origin.
     * @param {number} width - The width of the copy region.
     * @param {number} height - The height of the copy region.
     * @param {TypedArray} buffer - The result buffer.
     * @param {number} [activeCubeFaceIndex] - The active cube face index.
     * @param {number} [textureIndex=0] - The texture index of an MRT render target.
     * @return {Promise<TypedArray>} A Promise that resolves when the read has been finished. The resolve provides the read data as a typed array.
     */
    readRenderTargetPixelsAsync: (renderTarget: WebGLRenderTarget, x: number, y: number, width: number, height: number, buffer: TypedArray, activeCubeFaceIndex?: number, textureIndex?: number) => Promise<TypedArray>;
    /**
     * Copies pixels from the current bound framebuffer into the given texture.
     *
     * @param {FramebufferTexture} texture - The texture.
     * @param {?Vector2} [position=null] - The start position of the copy operation.
     * @param {number} [level=0] - The mip level. The default represents the base mip.
     */
    copyFramebufferToTexture: (texture: FramebufferTexture, position?: Vector2 | null, level?: number) => void;
    /**
     * Copies data of the given source texture into a destination texture.
     *
     * When using render target textures as `srcTexture` and `dstTexture`, you must make sure both render targets are initialized
     * {@link WebGLRenderer#initRenderTarget}.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     * @param {?(Box2|Box3)} [srcRegion=null] - A bounding box which describes the source region. Can be two or three-dimensional.
     * @param {?(Vector2|Vector3)} [dstPosition=null] - A vector that represents the origin of the destination region. Can be two or three-dimensional.
     * @param {number} [srcLevel=0] - The source mipmap level to copy.
     * @param {?number} [dstLevel=0] - The destination mipmap level.
     */
    copyTextureToTexture: (srcTexture: Texture, dstTexture: Texture, srcRegion?: (Box2 | Box3) | null, dstPosition?: (Vector2 | Vector3) | null, srcLevel?: number, dstLevel?: number | null) => void;
    /**
     * Initializes the given WebGLRenderTarget memory. Useful for initializing a render target so data
     * can be copied into it using {@link WebGLRenderer#copyTextureToTexture} before it has been
     * rendered to.
     *
     * @param {WebGLRenderTarget} target - The render target.
     */
    initRenderTarget: (target: WebGLRenderTarget) => void;
    /**
     * Initializes the given texture. Useful for preloading a texture rather than waiting until first
     * render (which can cause noticeable lags due to decode and GPU upload overhead).
     *
     * @param {Texture} texture - The texture.
     */
    initTexture: (texture: Texture) => void;
    /**
     * Can be used to reset the internal WebGL state. This method is mostly
     * relevant for applications which share a single WebGL context across
     * multiple WebGL libraries.
     */
    resetState: () => void;
    /**
     * Defines the coordinate system of the renderer.
     *
     * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
     *
     * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
     * @default WebGLCoordinateSystem
     * @readonly
     */
    readonly get coordinateSystem(): number | WebGPUCoordinateSystem;
    set outputColorSpace(colorSpace: string | LinearSRGBColorSpace);
    /**
     * Defines the output color space of the renderer.
     *
     * @type {SRGBColorSpace|LinearSRGBColorSpace}
     * @default SRGBColorSpace
     */
    get outputColorSpace(): string | LinearSRGBColorSpace;
}
import { WebXRManager } from './webxr/WebXRManager.js';
import { Vector4 } from '../math/Vector4.js';
import { Color } from '../math/Color.js';
import { WebGLRenderTarget } from './WebGLRenderTarget.js';
import { Vector3 } from '../math/Vector3.js';
