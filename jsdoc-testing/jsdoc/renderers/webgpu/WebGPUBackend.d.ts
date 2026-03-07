export default WebGPUBackend;
/**
 * A backend implementation targeting WebGPU.
 *
 * @private
 * @augments Backend
 */
declare class WebGPUBackend extends Backend {
    /**
     * WebGPUBackend options.
     *
     * @typedef {Object} WebGPUBackend~Options
     * @property {boolean} [logarithmicDepthBuffer=false] - Whether logarithmic depth buffer is enabled or not.
     * @property {boolean} [reversedDepthBuffer=false] - Whether reversed depth buffer is enabled or not.
     * @property {boolean} [alpha=true] - Whether the default framebuffer (which represents the final contents of the canvas) should be transparent or opaque.
     * @property {boolean} [depth=true] - Whether the default framebuffer should have a depth buffer or not.
     * @property {boolean} [stencil=false] - Whether the default framebuffer should have a stencil buffer or not.
     * @property {boolean} [antialias=false] - Whether MSAA as the default anti-aliasing should be enabled or not.
     * @property {number} [samples=0] - When `antialias` is `true`, `4` samples are used by default. Set this parameter to any other integer value than 0 to overwrite the default.
     * @property {boolean} [forceWebGL=false] - If set to `true`, the renderer uses a WebGL 2 backend no matter if WebGPU is supported or not.
     * @property {boolean} [trackTimestamp=false] - Whether to track timestamps with a Timestamp Query API or not.
     * @property {string} [powerPreference=undefined] - The power preference.
     * @property {Object} [requiredLimits=undefined] - Specifies the limits that are required by the device request. The request will fail if the adapter cannot provide these limits.
     * @property {GPUDevice} [device=undefined] - If there is an existing GPU device on app level, it can be passed to the renderer as a parameter.
     * @property {number} [outputType=undefined] - Texture type for output to canvas. By default, device's preferred format is used; other formats may incur overhead.
     */
    /**
     * Constructs a new WebGPU backend.
     *
     * @param {WebGPUBackend~Options} [parameters] - The configuration parameter.
     */
    constructor(parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGPUBackend: boolean;
    /**
     * Indicates whether the backend is in WebGPU compatibility mode or not.
     * The backend must be initialized before the property can be evaluated.
     *
     * @type {?boolean}
     * @readonly
     * @default null
     */
    readonly compatibilityMode: boolean | null;
    /**
     * A reference to the device.
     *
     * @type {?GPUDevice}
     * @default null
     */
    device: GPUDevice | null;
    /**
     * A reference to the default render pass descriptor.
     *
     * @type {?Object}
     * @default null
     */
    defaultRenderPassdescriptor: Object | null;
    /**
     * A reference to a backend module holding common utility functions.
     *
     * @type {WebGPUUtils}
     */
    utils: WebGPUUtils;
    /**
     * A reference to a backend module holding shader attribute-related
     * utility functions.
     *
     * @type {WebGPUAttributeUtils}
     */
    attributeUtils: WebGPUAttributeUtils;
    /**
     * A reference to a backend module holding shader binding-related
     * utility functions.
     *
     * @type {WebGPUBindingUtils}
     */
    bindingUtils: WebGPUBindingUtils;
    /**
     * A reference to a backend module holding shader pipeline-related
     * utility functions.
     *
     * @type {WebGPUPipelineUtils}
     */
    pipelineUtils: WebGPUPipelineUtils;
    /**
     * A reference to a backend module holding shader texture-related
     * utility functions.
     *
     * @type {WebGPUTextureUtils}
     */
    textureUtils: WebGPUTextureUtils;
    /**
     * A map that manages the resolve buffers for occlusion queries.
     *
     * @type {Map<number,GPUBuffer>}
     */
    occludedResolveCache: Map<number, GPUBuffer>;
    /**
     * A map of compatibility checks.
     *
     * @type {Object}
     */
    _compatibility: Object;
    /**
     * A reference to the context.
     *
     * @type {?GPUCanvasContext}
     * @default null
     */
    get context(): GPUCanvasContext | null;
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
     * Returns the backend's rendering context.
     *
     * @return {GPUCanvasContext} The rendering context.
     */
    getContext(): GPUCanvasContext;
    /**
     * Returns the default render pass descriptor.
     *
     * In WebGPU, the default framebuffer must be configured
     * like custom framebuffers so the backend needs a render
     * pass descriptor even when rendering directly to screen.
     *
     * @private
     * @return {Object} The render pass descriptor.
     */
    private _getDefaultRenderPassDescriptor;
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
     * Returns the render pass descriptor for the given render context.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} colorAttachmentsConfig - Configuration object for the color attachments.
     * @return {Object} The render pass descriptor.
     */
    private _getRenderPassDescriptor;
    /**
     * This method is executed at the beginning of a render call and prepares
     * the WebGPU state for upcoming render calls
     *
     * @param {RenderContext} renderContext - The render context.
     */
    beginRender(renderContext: RenderContext): void;
    /**
     * This method creates layer descriptors for each camera in an array camera
     * to prepare for rendering to a depth array texture.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} renderContextData - The render context data.
     * @param {Object} descriptor  - The render pass descriptor.
     * @param {ArrayCamera} cameras - The array camera.
     *
     * @private
     */
    private _createDepthLayerDescriptors;
    /**
     * This method updates the layer descriptors for each camera in an array camera
     * to prepare for rendering to a depth array texture.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} renderContextData - The render context data.
     * @param {ArrayCamera} cameras - The array camera.
     *
     */
    _updateDepthLayerDescriptors(renderContext: RenderContext, renderContextData: Object, cameras: ArrayCamera): void;
    /**
     * This method is executed at the end of a render call and finalizes work
     * after draw calls.
     *
     * @param {RenderContext} renderContext - The render context.
     */
    finishRender(renderContext: RenderContext): void;
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
     * This method processes the result of occlusion queries and writes it
     * into render context data.
     *
     * @async
     * @param {RenderContext} renderContext - The render context.
     * @return {Promise} A Promise that resolves when the occlusion query results have been processed.
     */
    resolveOccludedAsync(renderContext: RenderContext): Promise<any>;
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
     * @param {?RenderContext} [renderTargetContext=null] - The render context of the current set render target.
     */
    clear(color: boolean, depth: boolean, stencil: boolean, renderTargetContext?: RenderContext | null): void;
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
     * @param {number|Array<number>|IndirectStorageBufferAttribute} [dispatchSize=null]
     * - A single number representing count, or
     * - An array [x, y, z] representing dispatch size, or
     * - A IndirectStorageBufferAttribute for indirect dispatch size.
     */
    compute(computeGroup: Node | Array<Node>, computeNode: Node, bindings: Array<BindGroup>, pipeline: ComputePipeline, dispatchSize?: number | Array<number> | IndirectStorageBufferAttribute): void;
    /**
     * This method is executed at the end of a compute call and
     * finalizes work after compute tasks.
     *
     * @param {Node|Array<Node>} computeGroup - The compute node(s).
     */
    finishCompute(computeGroup: Node | Array<Node>): void;
    /**
     * Executes a draw command for the given render object.
     *
     * @param {RenderObject} renderObject - The render object to draw.
     * @param {Info} info - Holds a series of statistical information about the GPU memory and the rendering process.
     */
    draw(renderObject: RenderObject, info: Info): void;
    /**
     * Returns `true` if the render pipeline requires an update.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {boolean} Whether the render pipeline requires an update or not.
     */
    needsRenderUpdate(renderObject: RenderObject): boolean;
    /**
     * Returns a cache key that is used to identify render pipelines.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {string} The cache key.
     */
    getRenderCacheKey(renderObject: RenderObject): string;
    /**
     * Updates a GPU sampler for the given texture.
     *
     * @param {Texture} texture - The texture to update the sampler for.
     * @return {string} The current sampler key.
     */
    updateSampler(texture: Texture): string;
    /**
     * Creates a default texture for the given texture that can be used
     * as a placeholder until the actual texture is ready for usage.
     *
     * @param {Texture} texture - The texture to create a default texture for.
     * @return {boolean} Whether the sampler has been updated or not.
     */
    createDefaultTexture(texture: Texture): boolean;
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
     * Inits a time stamp query for the given render context.
     *
     * @param {string} type - The type of the timestamp query (e.g. 'render', 'compute').
     * @param {number} uid - Unique id for the context (e.g. render context id).
     * @param {Object} descriptor - The query descriptor.
     */
    initTimestampQuery(type: string, uid: number, descriptor: Object): void;
    /**
     * Returns a node builder for the given render object.
     *
     * @param {RenderObject} object - The render object.
     * @param {Renderer} renderer - The renderer.
     * @return {WGSLNodeBuilder} The node builder.
     */
    createNodeBuilder(object: RenderObject, renderer: Renderer): WGSLNodeBuilder;
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
     * Creates a compute pipeline for the given compute node.
     *
     * @param {ComputePipeline} computePipeline - The compute pipeline.
     * @param {Array<BindGroup>} bindings - The bindings.
     */
    createComputePipeline(computePipeline: ComputePipeline, bindings: Array<BindGroup>): void;
    /**
     * Prepares the state for encoding render bundles.
     *
     * @param {RenderContext} renderContext - The render context.
     */
    beginBundle(renderContext: RenderContext): void;
    /**
     * After processing render bundles this method finalizes related work.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {RenderBundle} bundle - The render bundle.
     */
    finishBundle(renderContext: RenderContext, bundle: RenderBundle): void;
    /**
     * Adds a render bundle to the render context data.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {RenderBundle} bundle - The render bundle to add.
     */
    addBundle(renderContext: RenderContext, bundle: RenderBundle): void;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheIndex: number, version: number): void;
    /**
     * Updates the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    updateBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheIndex: number, version: number): void;
    /**
     * Updates a buffer binding.
     *
     *  @param {Buffer} binding - The buffer binding to update.
     */
    updateBinding(binding: Buffer): void;
    /**
     * Delete data associated with the current bind group.
     *
     * @param {BindGroup} bindGroup - The bind group.
     */
    deleteBindGroupData(bindGroup: BindGroup): void;
    /**
     * Creates the buffer of an indexed shader attribute.
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
     * Creates the GPU buffer of an indirect storage attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    createIndirectStorageAttribute(attribute: BufferAttribute): void;
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
     * Checks if the given feature is supported by the backend.
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
     * @param {number} [srcLevel=0] - The mipmap level to copy.
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
}
import Backend from '../common/Backend.js';
import WebGPUUtils from './utils/WebGPUUtils.js';
import WebGPUAttributeUtils from './utils/WebGPUAttributeUtils.js';
import WebGPUBindingUtils from './utils/WebGPUBindingUtils.js';
import WebGPUPipelineUtils from './utils/WebGPUPipelineUtils.js';
import WebGPUTextureUtils from './utils/WebGPUTextureUtils.js';
import WGSLNodeBuilder from './nodes/WGSLNodeBuilder.js';
