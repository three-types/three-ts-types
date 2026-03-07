export default Backend;
/**
 * Most of the rendering related logic is implemented in the
 * {@link Renderer} module and related management components.
 * Sometimes it is required though to execute commands which are
 * specific to the current 3D backend (which is WebGPU or WebGL 2).
 * This abstract base class defines an interface that encapsulates
 * all backend-related logic. Derived classes for each backend must
 * implement the interface.
 *
 * @abstract
 * @private
 */
declare class Backend {
    /**
     * Constructs a new backend.
     *
     * @param {Object} parameters - An object holding parameters for the backend.
     */
    constructor(parameters?: Object);
    /**
     * The parameters of the backend.
     *
     * @type {Object}
     */
    parameters: Object;
    /**
     * This weak map holds backend-specific data of objects
     * like textures, attributes or render targets.
     *
     * @type {WeakMap<Object, Object>}
     */
    data: WeakMap<Object, Object>;
    /**
     * A reference to the renderer.
     *
     * @type {?Renderer}
     * @default null
     */
    renderer: Renderer | null;
    /**
     * A reference to the canvas element the renderer is drawing to.
     *
     * @type {?(HTMLCanvasElement|OffscreenCanvas)}
     * @default null
     */
    domElement: (HTMLCanvasElement | OffscreenCanvas) | null;
    /**
     * A reference to the timestamp query pool.
     *
     * @type {{render: ?TimestampQueryPool, compute: ?TimestampQueryPool}}
     */
    timestampQueryPool: {
        render: TimestampQueryPool | null;
        compute: TimestampQueryPool | null;
    };
    /**
     * Whether to track timestamps with a Timestamp Query API or not.
     *
     * @type {boolean}
     * @default false
     */
    trackTimestamp: boolean;
    /**
     * Initializes the backend so it is ready for usage. Concrete backends
     * are supposed to implement their rendering context creation and related
     * operations in this method.
     *
     * @async
     * @param {Renderer} renderer - The renderer.
     * @return {Promise} A Promise that resolves when the backend has been initialized.
     */
    init(renderer: Renderer): Promise<any>;
    /**
     * The coordinate system of the backend.
     *
     * @abstract
     * @type {number}
     * @readonly
     */
    readonly get coordinateSystem(): number;
    /**
     * This method is executed at the beginning of a render call and
     * can be used by the backend to prepare the state for upcoming
     * draw calls.
     *
     * @abstract
     * @param {RenderContext} renderContext - The render context.
     */
    beginRender(): void;
    /**
     * This method is executed at the end of a render call and
     * can be used by the backend to finalize work after draw
     * calls.
     *
     * @abstract
     * @param {RenderContext} renderContext - The render context.
     */
    finishRender(): void;
    /**
     * This method is executed at the beginning of a compute call and
     * can be used by the backend to prepare the state for upcoming
     * compute tasks.
     *
     * @abstract
     * @param {Node|Array<Node>} computeGroup - The compute node(s).
     */
    beginCompute(): void;
    /**
     * This method is executed at the end of a compute call and
     * can be used by the backend to finalize work after compute
     * tasks.
     *
     * @abstract
     * @param {Node|Array<Node>} computeGroup - The compute node(s).
     */
    finishCompute(): void;
    /**
     * Executes a draw command for the given render object.
     *
     * @abstract
     * @param {RenderObject} renderObject - The render object to draw.
     * @param {Info} info - Holds a series of statistical information about the GPU memory and the rendering process.
     */
    draw(): void;
    /**
     * Executes a compute command for the given compute node.
     *
     * @abstract
     * @param {Node|Array<Node>} computeGroup - The group of compute nodes of a compute call. Can be a single compute node.
     * @param {Node} computeNode - The compute node.
     * @param {Array<BindGroup>} bindings - The bindings.
     * @param {ComputePipeline} computePipeline - The compute pipeline.
     */
    compute(): void;
    /**
     * Creates a shader program from the given programmable stage.
     *
     * @abstract
     * @param {ProgrammableStage} program - The programmable stage.
     */
    createProgram(): void;
    /**
     * Destroys the shader program of the given programmable stage.
     *
     * @abstract
     * @param {ProgrammableStage} program - The programmable stage.
     */
    destroyProgram(): void;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @abstract
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    createBindings(): void;
    /**
     * Updates the given bind group definition.
     *
     * @abstract
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    updateBindings(): void;
    /**
     * Updates a buffer binding.
     *
     * @abstract
     * @param {Buffer} binding - The buffer binding to update.
     */
    updateBinding(): void;
    /**
     * Creates a render pipeline for the given render object.
     *
     * @abstract
     * @param {RenderObject} renderObject - The render object.
     * @param {Array<Promise>} promises - An array of compilation promises which are used in `compileAsync()`.
     */
    createRenderPipeline(): void;
    /**
     * Creates a compute pipeline for the given compute node.
     *
     * @abstract
     * @param {ComputePipeline} computePipeline - The compute pipeline.
     * @param {Array<BindGroup>} bindings - The bindings.
     */
    createComputePipeline(): void;
    /**
     * Returns `true` if the render pipeline requires an update.
     *
     * @abstract
     * @param {RenderObject} renderObject - The render object.
     * @return {boolean} Whether the render pipeline requires an update or not.
     */
    needsRenderUpdate(): boolean;
    /**
     * Returns a cache key that is used to identify render pipelines.
     *
     * @abstract
     * @param {RenderObject} renderObject - The render object.
     * @return {string} The cache key.
     */
    getRenderCacheKey(): string;
    /**
     * Returns a node builder for the given render object.
     *
     * @abstract
     * @param {RenderObject} renderObject - The render object.
     * @param {Renderer} renderer - The renderer.
     * @return {NodeBuilder} The node builder.
     */
    createNodeBuilder(): NodeBuilder;
    /**
     * Updates a GPU sampler for the given texture.
     *
     * @abstract
     * @param {Texture} texture - The texture to update the sampler for.
     * @return {string} The current sampler key.
     */
    updateSampler(): string;
    /**
     * Creates a default texture for the given texture that can be used
     * as a placeholder until the actual texture is ready for usage.
     *
     * @abstract
     * @param {Texture} texture - The texture to create a default texture for.
     */
    createDefaultTexture(): void;
    /**
     * Defines a texture on the GPU for the given texture object.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    createTexture(): void;
    /**
     * Uploads the updated texture data to the GPU.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    updateTexture(): void;
    /**
     * Generates mipmaps for the given texture.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     */
    generateMipmaps(): void;
    /**
     * Destroys the GPU data for the given texture object.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     * @param {boolean} [isDefaultTexture=false] - Whether the texture uses a default GPU texture or not.
     */
    destroyTexture(): void;
    /**
     * Returns texture data as a typed array.
     *
     * @abstract
     * @async
     * @param {Texture} texture - The texture to copy.
     * @param {number} x - The x coordinate of the copy origin.
     * @param {number} y - The y coordinate of the copy origin.
     * @param {number} width - The width of the copy.
     * @param {number} height - The height of the copy.
     * @param {number} faceIndex - The face index.
     * @return {Promise<TypedArray>} A Promise that resolves with a typed array when the copy operation has finished.
     */
    copyTextureToBuffer(): Promise<TypedArray>;
    /**
     * Copies data of the given source texture to the given destination texture.
     *
     * @abstract
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     * @param {?(Box3|Box2)} [srcRegion=null] - The region of the source texture to copy.
     * @param {?(Vector2|Vector3)} [dstPosition=null] - The destination position of the copy.
     * @param {number} [srcLevel=0] - The source mip level to copy from.
     * @param {number} [dstLevel=0] - The destination mip level to copy to.
     */
    copyTextureToTexture(): void;
    /**
    * Copies the current bound framebuffer to the given texture.
    *
    * @abstract
    * @param {Texture} texture - The destination texture.
    * @param {RenderContext} renderContext - The render context.
    * @param {Vector4} rectangle - A four dimensional vector defining the origin and dimension of the copy.
    */
    copyFramebufferToTexture(): void;
    /**
     * Creates the GPU buffer of a shader attribute.
     *
     * @abstract
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    createAttribute(): void;
    /**
     * Creates the GPU buffer of an indexed shader attribute.
     *
     * @abstract
     * @param {BufferAttribute} attribute - The indexed buffer attribute.
     */
    createIndexAttribute(): void;
    /**
     * Creates the GPU buffer of a storage attribute.
     *
     * @abstract
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    createStorageAttribute(): void;
    /**
     * Updates the GPU buffer of a shader attribute.
     *
     * @abstract
     * @param {BufferAttribute} attribute - The buffer attribute to update.
     */
    updateAttribute(): void;
    /**
     * Destroys the GPU buffer of a shader attribute.
     *
     * @abstract
     * @param {BufferAttribute} attribute - The buffer attribute to destroy.
     */
    destroyAttribute(): void;
    /**
     * Returns the backend's rendering context.
     *
     * @abstract
     * @return {Object} The rendering context.
     */
    getContext(): Object;
    /**
     * Backends can use this method if they have to run
     * logic when the renderer gets resized.
     *
     * @abstract
     */
    updateSize(): void;
    /**
     * Updates the viewport with the values from the given render context.
     *
     * @abstract
     * @param {RenderContext} renderContext - The render context.
     */
    updateViewport(): void;
    /**
     * Updates a unique identifier for the given render context that can be used
     * to allocate resources like occlusion queries or timestamp queries.
     *
     * @param {RenderContext|ComputeNode} abstractRenderContext - The render context.
     */
    updateTimeStampUID(abstractRenderContext: RenderContext | ComputeNode): void;
    /**
     * Returns a unique identifier for the given render context that can be used
     * to allocate resources like occlusion queries or timestamp queries.
     *
     * @param {RenderContext|ComputeNode} abstractRenderContext - The render context.
     * @return {string} The unique identifier.
     */
    getTimestampUID(abstractRenderContext: RenderContext | ComputeNode): string;
    /**
     * Returns all timestamp frames for the given type.
     *
     * @param {string} type - The type of the time stamp.
     * @return {Array<number>} The timestamp frames.
     */
    getTimestampFrames(type: string): Array<number>;
    /**
     * Returns the query pool for the given uid.
     *
     * @param {string} uid - The unique identifier.
     * @return {TimestampQueryPool} The query pool.
     */
    _getQueryPool(uid: string): TimestampQueryPool;
    /**
     * Returns the timestamp for the given uid.
     *
     * @param {string} uid - The unique identifier.
     * @return {number} The timestamp.
     */
    getTimestamp(uid: string): number;
    /**
     * Returns `true` if a timestamp for the given uid is available.
     *
     * @param {string} uid - The unique identifier.
     * @return {boolean} Whether the timestamp is available or not.
     */
    hasTimestamp(uid: string): boolean;
    /**
     * Returns `true` if the given 3D object is fully occluded by other
     * 3D objects in the scene. Backends must implement this method by using
     * a Occlusion Query API.
     *
     * @abstract
     * @param {RenderContext} renderContext - The render context.
     * @param {Object3D} object - The 3D object to test.
     * @return {boolean} Whether the 3D object is fully occluded or not.
     */
    isOccluded(): boolean;
    /**
     * Resolves the time stamp for the given render context and type.
     *
     * @async
     * @abstract
     * @param {string} [type='render'] - The type of the time stamp.
     * @return {Promise<number>} A Promise that resolves with the time stamp.
     */
    resolveTimestampsAsync(type?: string): Promise<number>;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU.
     *
     * @async
     * @param {StorageBufferAttribute} attribute - The storage buffer attribute.
     * @return {Promise<ArrayBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(): Promise<ArrayBuffer>;
    /**
     * Checks if the given feature is supported by the backend.
     *
     * @async
     * @abstract
     * @param {string} name - The feature's name.
     * @return {Promise<boolean>} A Promise that resolves with a bool that indicates whether the feature is supported or not.
     */
    hasFeatureAsync(): Promise<boolean>;
    /**
     * Checks if the given feature is supported  by the backend.
     *
     * @abstract
     * @param {string} name - The feature's name.
     * @return {boolean} Whether the feature is supported or not.
     */
    hasFeature(): boolean;
    /**
     * Returns the maximum anisotropy texture filtering value.
     *
     * @abstract
     * @return {number} The maximum anisotropy texture filtering value.
     */
    getMaxAnisotropy(): number;
    /**
     * Returns the drawing buffer size.
     *
     * @return {Vector2} The drawing buffer size.
     */
    getDrawingBufferSize(): Vector2;
    /**
     * Defines the scissor test.
     *
     * @abstract
     * @param {boolean} boolean - Whether the scissor test should be enabled or not.
     */
    setScissorTest(): void;
    /**
     * Returns the clear color and alpha into a single
     * color object.
     *
     * @return {Color4} The clear color.
     */
    getClearColor(): Color4;
    /**
     * Returns the DOM element. If no DOM element exists, the backend
     * creates a new one.
     *
     * @return {HTMLCanvasElement} The DOM element.
     */
    getDomElement(): HTMLCanvasElement;
    /**
     * Checks if the backend has the given compatibility.
     *
     * @abstract
     * @param {string} name - The compatibility.
     * @return {boolean} Whether the backend has the given compatibility or not.
     */
    hasCompatibility(): boolean;
    /**
     * Initializes the render target defined in the given render context.
     *
     * @abstract
     * @param {RenderContext} renderContext - The render context.
     */
    initRenderTarget(): void;
    /**
     * Sets a dictionary for the given object into the
     * internal data structure.
     *
     * @param {Object} object - The object.
     * @param {Object} value - The dictionary to set.
     */
    set(object: Object, value: Object): void;
    /**
     * Returns the dictionary for the given object.
     *
     * @param {Object} object - The object.
     * @return {Object} The object's dictionary.
     */
    get(object: Object): Object;
    /**
     * Checks if the given object has a dictionary
     * with data defined.
     *
     * @param {Object} object - The object.
     * @return {boolean} Whether a dictionary for the given object as been defined or not.
     */
    has(object: Object): boolean;
    /**
     * Deletes an object from the internal data structure.
     *
     * @param {Object} object - The object to delete.
     */
    delete(object: Object): void;
    /**
     * Delete GPU data associated with a bind group.
     *
     * @abstract
     * @param {BindGroup} bindGroup - The bind group.
     */
    deleteBindGroupData(): void;
    /**
     * Frees internal resources.
     *
     * @abstract
     */
    dispose(): void;
}
import { Vector2 } from '../../math/Vector2.js';
import Color4 from './Color4.js';
