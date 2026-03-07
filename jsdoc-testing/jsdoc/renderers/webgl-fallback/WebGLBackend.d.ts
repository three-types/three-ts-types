export default WebGLBackend;
/**
 * A backend implementation targeting WebGL 2.
 *
 * @private
 * @augments Backend
 */
declare class WebGLBackend extends Backend {
    /**
     * WebGLBackend options.
     *
     * @typedef {Object} WebGLBackend~Options
     * @property {boolean} [logarithmicDepthBuffer=false] - Whether logarithmic depth buffer is enabled or not.
     * @property {boolean} [reversedDepthBuffer=false] - Whether reversed depth buffer is enabled or not.
     * @property {boolean} [alpha=true] - Whether the default framebuffer (which represents the final contents of the canvas) should be transparent or opaque.
     * @property {boolean} [depth=true] - Whether the default framebuffer should have a depth buffer or not.
     * @property {boolean} [stencil=false] - Whether the default framebuffer should have a stencil buffer or not.
     * @property {boolean} [antialias=false] - Whether MSAA as the default anti-aliasing should be enabled or not.
     * @property {number} [samples=0] - When `antialias` is `true`, `4` samples are used by default. Set this parameter to any other integer value than 0 to overwrite the default.
     * @property {boolean} [forceWebGL=false] - If set to `true`, the renderer uses a WebGL 2 backend no matter if WebGPU is supported or not.
     * @property {WebGL2RenderingContext} [context=undefined] - A WebGL 2 rendering context.
     */
    /**
     * Constructs a new WebGPU backend.
     *
     * @param {WebGLBackend~Options} [parameters] - The configuration parameter.
     */
    constructor(parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLBackend: boolean;
    /**
     * A reference to a backend module holding shader attribute-related
     * utility functions.
     *
     * @type {?WebGLAttributeUtils}
     * @default null
     */
    attributeUtils: WebGLAttributeUtils | null;
    /**
     * A reference to a backend module holding extension-related
     * utility functions.
     *
     * @type {?WebGLExtensions}
     * @default null
     */
    extensions: WebGLExtensions | null;
    /**
     * A reference to a backend module holding capability-related
     * utility functions.
     *
     * @type {?WebGLCapabilities}
     * @default null
     */
    capabilities: WebGLCapabilities | null;
    /**
     * A reference to a backend module holding texture-related
     * utility functions.
     *
     * @type {?WebGLTextureUtils}
     * @default null
     */
    textureUtils: WebGLTextureUtils | null;
    /**
     * A reference to a backend module holding renderer-related
     * utility functions.
     *
     * @type {?WebGLBufferRenderer}
     * @default null
     */
    bufferRenderer: WebGLBufferRenderer | null;
    /**
     * A reference to the rendering context.
     *
     * @type {?WebGL2RenderingContext}
     * @default null
     */
    gl: WebGL2RenderingContext | null;
    /**
     * A reference to a backend module holding state-related
     * utility functions.
     *
     * @type {?WebGLState}
     * @default null
     */
    state: WebGLState | null;
    /**
     * A reference to a backend module holding common
     * utility functions.
     *
     * @type {?WebGLUtils}
     * @default null
     */
    utils: WebGLUtils | null;
    /**
     * Dictionary for caching VAOs.
     *
     * @type {Object<string,WebGLVertexArrayObject>}
     */
    vaoCache: {
        [x: string]: WebGLVertexArrayObject;
    };
    /**
     * Dictionary for caching transform feedback objects.
     *
     * @type {Object<string,WebGLTransformFeedback>}
     */
    transformFeedbackCache: {
        [x: string]: WebGLTransformFeedback;
    };
    /**
     * Controls if `gl.RASTERIZER_DISCARD` should be enabled or not.
     * Only relevant when using compute shaders.
     *
     * @type {boolean}
     * @default false
     */
    discard: boolean;
    /**
     * A reference to the `EXT_disjoint_timer_query_webgl2` extension. `null` if the
     * device does not support the extension.
     *
     * @type {?EXTDisjointTimerQueryWebGL2}
     * @default null
     */
    disjoint: EXTDisjointTimerQueryWebGL2 | null;
    /**
    * A reference to the `KHR_parallel_shader_compile` extension. `null` if the
    * device does not support the extension.
    *
    * @type {?KHRParallelShaderCompile}
    * @default null
    */
    parallel: KHRParallelShaderCompile | null;
    /**
     * A reference to the current render context.
     *
     * @private
     * @type {RenderContext}
     * @default null
     */
    private _currentContext;
    /**
     * A unique collection of bindings.
     *
     * @private
     * @type {WeakSet<Array<BindGroup>>}
     */
    private _knownBindings;
    /**
     * Whether the device supports framebuffers invalidation or not.
     *
     * @private
     * @type {boolean}
     */
    private _supportsInvalidateFramebuffer;
    /**
     * The target framebuffer when rendering with
     * the WebXR device API.
     *
     * @private
     * @type {?WebGLFramebuffer}
     * @default null
     */
    private _xrFramebuffer;
    /**
     * Initializes the backend so it is ready for usage.
     *
     * @param {Renderer} renderer - The renderer.
     */
    init(renderer: Renderer): void;
    _onContextLost: ((event: any) => void) | undefined;
    drawBuffersIndexedExt: Object | undefined;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU.
     *
     * @async
     * @param {StorageBufferAttribute} attribute - The storage buffer attribute.
     * @return {Promise<ArrayBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: StorageBufferAttribute): Promise<ArrayBuffer>;
    /**
     * Ensures the backend is XR compatible.
     *
     * @async
     * @return {Promise} A Promise that resolve when the renderer is XR compatible.
     */
    makeXRCompatible(): Promise<any>;
    /**
     * Sets the XR rendering destination.
     *
     * @param {WebGLFramebuffer} xrFramebuffer - The XR framebuffer.
     */
    setXRTarget(xrFramebuffer: WebGLFramebuffer): void;
    /**
     * Configures the given XR render target with external textures.
     *
     * This method is only relevant when using the WebXR Layers API.
     *
     * @param {XRRenderTarget} renderTarget - The XR render target.
     * @param {WebGLTexture} colorTexture - A native color texture.
     * @param {?WebGLTexture} [depthTexture=null] - A native depth texture.
     */
    setXRRenderTargetTextures(renderTarget: XRRenderTarget, colorTexture: WebGLTexture, depthTexture?: WebGLTexture | null): void;
    /**
     * Inits a time stamp query for the given render context.
     *
     * @param {string} type - The type of the timestamp query.
     * @param {string} uid - A unique identifier for the timestamp query.
     */
    initTimestampQuery(type: string, uid: string): void;
    /**
     * Prepares the timestamp buffer.
     *
     * @param {string} type - The type of the timestamp query.
     * @param {string} uid - A unique identifier for the timestamp query.
     */
    prepareTimestampBuffer(type: string, uid: string): void;
    /**
     * Returns the backend's rendering context.
     *
     * @return {WebGL2RenderingContext} The rendering context.
     */
    getContext(): WebGL2RenderingContext;
    /**
     * This method is executed at the beginning of a render call and prepares
     * the WebGL state for upcoming render calls
     *
     * @param {RenderContext} renderContext - The render context.
     */
    beginRender(renderContext: RenderContext): void;
    /**
     * This method is executed at the end of a render call and finalizes work
     * after draw calls.
     *
     * @param {RenderContext} renderContext - The render context.
     */
    finishRender(renderContext: RenderContext): void;
    /**
     * This method processes the result of occlusion queries and writes it
     * into render context data.
     *
     * @async
     * @param {RenderContext} renderContext - The render context.
     */
    resolveOccludedAsync(renderContext: RenderContext): void;
    /**
     * Returns `true` if the given 3D object is fully occluded by other
     * 3D objects in the scene.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {Object3D} object - The 3D object to test.
     * @return {boolean} Whether the 3D object is fully occluded or not.
     */
    isOccluded(renderContext: RenderContext, object: Object3D): boolean;
    /**
     * Updates the viewport with the values from the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     */
    updateViewport(renderContext: RenderContext): void;
    /**
     * Updates the scissor with the values from the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     */
    updateScissor(renderContext: RenderContext): void;
    /**
     * Defines the scissor test.
     *
     * @param {boolean} boolean - Whether the scissor test should be enabled or not.
     */
    setScissorTest(boolean: boolean): void;
    /**
     * Returns the clear color and alpha into a single
     * color object.
     *
     * @return {Color4} The clear color.
     */
    getClearColor(): Color4;
    /**
     * Performs a clear operation.
     *
     * @param {boolean} color - Whether the color buffer should be cleared or not.
     * @param {boolean} depth - Whether the depth buffer should be cleared or not.
     * @param {boolean} stencil - Whether the stencil buffer should be cleared or not.
     * @param {?Object} [descriptor=null] - The render context of the current set render target.
     * @param {boolean} [setFrameBuffer=true] - Controls whether the intermediate framebuffer should be set or not.
     * @param {boolean} [resolveRenderTarget=true] - Controls whether an active render target should be resolved
     * or not. Only relevant for explicit clears.
     */
    clear(color: boolean, depth: boolean, stencil: boolean, descriptor?: Object | null, setFrameBuffer?: boolean, resolveRenderTarget?: boolean): void;
    /**
     * This method is executed at the beginning of a compute call and
     * prepares the state for upcoming compute tasks.
     *
     * @param {Node|Array<Node>} computeGroup - The compute node(s).
     */
    beginCompute(computeGroup: Node | Array<Node>): void;
    /**
     * Executes a compute command for the given compute node.
     *
     * @param {Node|Array<Node>} computeGroup - The group of compute nodes of a compute call. Can be a single compute node.
     * @param {Node} computeNode - The compute node.
     * @param {Array<BindGroup>} bindings - The bindings.
     * @param {ComputePipeline} pipeline - The compute pipeline.
     * @param {?number} [count=null] - The count of compute invocations. If `null`, the count is determined by the compute node.
     */
    compute(computeGroup: Node | Array<Node>, computeNode: Node, bindings: Array<BindGroup>, pipeline: ComputePipeline, count?: number | null): void;
    /**
     * This method is executed at the end of a compute call and
     * finalizes work after compute tasks.
     *
     * @param {Node|Array<Node>} computeGroup - The compute node(s).
     */
    finishCompute(computeGroup: Node | Array<Node>): void;
    /**
     * Internal to determine if the current render target is a render target array with depth 2D array texture.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {boolean} Whether the render target is a render target array with depth 2D array texture.
     *
     * @private
     */
    private _isRenderCameraDepthArray;
    /**
     * Executes a draw command for the given render object.
     *
     * @param {RenderObject} renderObject - The render object to draw.
     * @param {Info} info - Holds a series of statistical information about the GPU memory and the rendering process.
     */
    draw(renderObject: RenderObject): void;
    /**
     * Creates a default texture for the given texture that can be used
     * as a placeholder until the actual texture is ready for usage.
     *
     * @param {Texture} texture - The texture to create a default texture for.
     */
    createDefaultTexture(texture: Texture): void;
    /**
     * Defines a texture on the GPU for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    createTexture(texture: Texture, options?: Object): void;
    /**
     * Uploads the updated texture data to the GPU.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    updateTexture(texture: Texture, options?: Object): void;
    /**
     * Generates mipmaps for the given texture.
     *
     * @param {Texture} texture - The texture.
     */
    generateMipmaps(texture: Texture): void;
    /**
     * Destroys the GPU data for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {boolean} [isDefaultTexture=false] - Whether the texture uses a default GPU texture or not.
     */
    destroyTexture(texture: Texture, isDefaultTexture?: boolean): void;
    /**
     * Returns texture data as a typed array.
     *
     * @async
     * @param {Texture} texture - The texture to copy.
     * @param {number} x - The x coordinate of the copy origin.
     * @param {number} y - The y coordinate of the copy origin.
     * @param {number} width - The width of the copy.
     * @param {number} height - The height of the copy.
     * @param {number} faceIndex - The face index.
     * @return {Promise<TypedArray>} A Promise that resolves with a typed array when the copy operation has finished.
     */
    copyTextureToBuffer(texture: Texture, x: number, y: number, width: number, height: number, faceIndex: number): Promise<TypedArray>;
    /**
     * Returns a node builder for the given render object.
     *
     * @param {RenderObject} object - The render object.
     * @param {Renderer} renderer - The renderer.
     * @return {GLSLNodeBuilder} The node builder.
     */
    createNodeBuilder(object: RenderObject, renderer: Renderer): GLSLNodeBuilder;
    /**
     * Creates a shader program from the given programmable stage.
     *
     * @param {ProgrammableStage} program - The programmable stage.
     */
    createProgram(program: ProgrammableStage): void;
    /**
     * Destroys the shader program of the given programmable stage.
     *
     * @param {ProgrammableStage} program - The programmable stage.
     */
    destroyProgram(program: ProgrammableStage): void;
    /**
     * Creates a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {Array<Promise>} promises - An array of compilation promises which are used in `compileAsync()`.
     */
    createRenderPipeline(renderObject: RenderObject, promises: Array<Promise<any>>): void;
    /**
     * Formats the source code of error messages.
     *
     * @private
     * @param {string} string - The code.
     * @param {number} errorLine - The error line.
     * @return {string} The formatted code.
     */
    private _handleSource;
    /**
     * Gets the shader compilation errors from the info log.
     *
     * @private
     * @param {WebGL2RenderingContext} gl - The rendering context.
     * @param {WebGLShader} shader - The WebGL shader object.
     * @param {string} type - The shader type.
     * @return {string} The shader errors.
     */
    private _getShaderErrors;
    /**
     * Logs shader compilation errors.
     *
     * @private
     * @param {WebGLProgram} programGPU - The WebGL program.
     * @param {WebGLShader} glFragmentShader - The fragment shader as a native WebGL shader object.
     * @param {WebGLShader} glVertexShader - The vertex shader as a native WebGL shader object.
     */
    private _logProgramError;
    /**
     * Completes the shader program setup for the given render object.
     *
     * @private
     * @param {RenderObject} renderObject - The render object.
     * @param {RenderPipeline} pipeline - The render pipeline.
     */
    private _completeCompile;
    /**
     * Creates a compute pipeline for the given compute node.
     *
     * @param {ComputePipeline} computePipeline - The compute pipeline.
     * @param {Array<BindGroup>} bindings - The bindings.
     */
    createComputePipeline(computePipeline: ComputePipeline, bindings: Array<BindGroup>): void;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>): void;
    /**
     * Updates the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    updateBindings(bindGroup: BindGroup): void;
    /**
     * Updates a buffer binding.
     *
     *  @param {Buffer} binding - The buffer binding to update.
     */
    updateBinding(binding: Buffer): void;
    /**
     * Creates the GPU buffer of an indexed shader attribute.
     *
     * @param {BufferAttribute} attribute - The indexed buffer attribute.
     */
    createIndexAttribute(attribute: BufferAttribute): void;
    /**
     * Creates the GPU buffer of a shader attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    createAttribute(attribute: BufferAttribute): void;
    /**
     * Creates the GPU buffer of a storage attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    createStorageAttribute(attribute: BufferAttribute): void;
    /**
     * Updates the GPU buffer of a shader attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute to update.
     */
    updateAttribute(attribute: BufferAttribute): void;
    /**
     * Destroys the GPU buffer of a shader attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute to destroy.
     */
    destroyAttribute(attribute: BufferAttribute): void;
    /**
     * Checks if the given feature is supported  by the backend.
     *
     * @param {string} name - The feature's name.
     * @return {boolean} Whether the feature is supported or not.
     */
    hasFeature(name: string): boolean;
    /**
     * Copies data of the given source texture to the given destination texture.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     * @param {?(Box3|Box2)} [srcRegion=null] - The region of the source texture to copy.
     * @param {?(Vector2|Vector3)} [dstPosition=null] - The destination position of the copy.
     * @param {number} [srcLevel=0] - The source mip level to copy from.
     * @param {number} [dstLevel=0] - The destination mip level to copy to.
     */
    copyTextureToTexture(srcTexture: Texture, dstTexture: Texture, srcRegion?: (Box3 | Box2) | null, dstPosition?: (Vector2 | Vector3) | null, srcLevel?: number, dstLevel?: number): void;
    /**
     * Copies the current bound framebuffer to the given texture.
     *
     * @param {Texture} texture - The destination texture.
     * @param {RenderContext} renderContext - The render context.
     * @param {Vector4} rectangle - A four dimensional vector defining the origin and dimension of the copy.
     */
    copyFramebufferToTexture(texture: Texture, renderContext: RenderContext, rectangle: Vector4): void;
    /**
     * Checks if the given compatibility is supported by the backend.
     *
     * @param {string} name - The compatibility name.
     * @return {boolean} Whether the compatibility is supported or not.
     */
    hasCompatibility(name: string): boolean;
    /**
     * Initializes the render target defined in the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     */
    initRenderTarget(renderContext: RenderContext): void;
    /**
     * Configures the active framebuffer from the given render context.
     *
     * @private
     * @param {RenderContext} descriptor - The render context.
     */
    private _setFramebuffer;
    /**
     * Computes the VAO key for the given index and attributes.
     *
     * @private
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @return {string} The VAO key.
     */
    private _getVaoKey;
    /**
     * Creates a VAO from the index and attributes.
     *
     * @private
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @return {Object} The VAO data.
     */
    private _createVao;
    /**
     * Creates a transform feedback from the given transform buffers.
     *
     * @private
     * @param {Array<DualAttributeData>} transformBuffers - The transform buffers.
     * @return {WebGLTransformFeedback} The transform feedback.
     */
    private _getTransformFeedback;
    /**
     * Setups the given bindings.
     *
     * @private
     * @param {Array<BindGroup>} bindings - The bindings.
     * @param {WebGLProgram} programGPU - The WebGL program.
     */
    private _setupBindings;
    /**
     * Binds the given uniforms.
     *
     * @private
     * @param {Array<BindGroup>} bindings - The bindings.
     */
    private _bindUniforms;
    /**
     * The method ensures multisampled render targets are resolved.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     */
    private _resolveRenderTarget;
    /**
     * Returns `true` if the `WEBGL_multisampled_render_to_texture` extension
     * should be used when MSAA is enabled.
     *
     * @private
     * @param {RenderTarget} renderTarget - The render target that should be multisampled.
     * @return {boolean} Whether to use the `WEBGL_multisampled_render_to_texture` extension for MSAA or not.
     */
    private _useMultisampledExtension;
}
import Backend from '../common/Backend.js';
import WebGLAttributeUtils from './utils/WebGLAttributeUtils.js';
import WebGLExtensions from './utils/WebGLExtensions.js';
import WebGLCapabilities from './utils/WebGLCapabilities.js';
import WebGLTextureUtils from './utils/WebGLTextureUtils.js';
import { WebGLBufferRenderer } from './WebGLBufferRenderer.js';
import WebGLState from './utils/WebGLState.js';
import WebGLUtils from './utils/WebGLUtils.js';
import GLSLNodeBuilder from './nodes/GLSLNodeBuilder.js';
