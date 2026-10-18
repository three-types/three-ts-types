import { ACESFilmicToneMapping } from './three.core.js';
import { AddEquation } from './three.core.js';
import { AddOperation } from './three.core.js';
import { AdditiveBlending } from './three.core.js';
import { AgXToneMapping } from './three.core.js';
import { AlphaFormat } from './three.core.js';
import { AlwaysCompare } from './three.core.js';
import { AlwaysDepth } from './three.core.js';
import { AlwaysStencilFunc } from './three.core.js';
import { AmbientLight } from './three.core.js';
/**
 * Module for representing ambient lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class AmbientLightNode extends AnalyticLightNode {
    /**
     * Constructs a new ambient light node.
     *
     * @param {?AmbientLight} [light=null] - The ambient light source.
     */
    constructor(light?: AmbientLight | null);
    setup({ context }: {
        context: any;
    }): void;
}
import { AnalyticLightNode } from './three.tsl.js';
import { ArrayCamera } from './three.core.js';
import { BackSide } from './three.core.js';
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
 */
export class Backend {
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
     * Sets the XR rendering destination.
     *
     * Backends that render directly into XR framebuffers can override this hook.
     *
     * @param {?Object} xrTarget - The XR rendering destination.
     */
    setXRTarget(): void;
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
     * Deletes the vertex state for the given render object.
     *
     * @abstract
     * @param {RenderObject} renderObject - The render object.
     */
    deleteVertexState(): void;
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
     * @param {string} cacheKey - The cache key.
     * @param {number} version - The version.
     */
    createBindings(): void;
    /**
     * Updates the given bind group definition.
     *
     * @abstract
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {string} cacheKey - The cache key.
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
     * @param {?Array<Promise>} [promises=null] - Optional compilation promises.
     */
    createComputePipeline(): void;
    /**
     * Destroys the given pipeline.
     *
     * @abstract
     * @param {Pipeline} pipeline - The pipeline.
     */
    destroyPipeline(): void;
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
     * @param {Sampler} binding - The sampler binding to update.
     * @return {string} The current sampler key.
     */
    updateSampler(): string;
    /**
     * Frees the GPU sampler for the given sampler binding.
     *
     * @abstract
     * @param {Sampler} binding - The sampler binding to free.
     */
    destroySampler(): void;
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
     * @param {number} faceIndex - The cube face, depth slice or array layer index.
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
     * Creates the GPU buffer of an indirect storage attribute.
     *
     * @abstract
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    createIndirectStorageAttribute(): void;
    /**
     * Creates a uniform buffer.
     *
     * @abstract
     * @param {Buffer} uniformBuffer - The uniform buffer.
     */
    createUniformBuffer(): void;
    /**
     * Destroys a uniform buffer.
     *
     * @abstract
     * @param {Buffer} uniformBuffer - The uniform buffer.
     */
    destroyUniformBuffer(): void;
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
     * Utility method for handling interleaved buffer attributes correctly.
     * To process them, their `InterleavedBuffer` is returned.
     *
     * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute.
     * @return {BufferAttribute|InterleavedBuffer}
     */
    getBufferAttribute(attribute: BufferAttribute | InterleavedBufferAttribute): BufferAttribute | InterleavedBuffer;
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
     * Frees the GPU resources of the given canvas target.
     *
     * @abstract
     * @param {CanvasTarget} canvasTarget - The canvas target.
     */
    destroyCanvasTarget(): void;
    /**
     * Updates a unique identifier for the given render context that can be used
     * to allocate resources like occlusion queries or timestamp queries.
     *
     * @param {RenderContext|ComputeNode|Array<ComputeNode>} abstractRenderContext - The render context.
     */
    updateTimeStampUID(abstractRenderContext: RenderContext | ComputeNode | Array<ComputeNode>): void;
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
     * Whether the backend supports query timestamps or not.
     *
     * @type {boolean}
     * @readonly
     */
    readonly get hasTimestamp(): boolean;
    /**
     * Returns `true` if a timestamp for the given uid is available.
     *
     * @param {string} uid - The unique identifier.
     * @return {boolean} Whether the timestamp is available or not.
     */
    hasTimestampQuery(uid: string): boolean;
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
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * Resets the backend's internal state. A no-op for backends without a state cache (e.g. WebGPU).
     *
     * @abstract
     */
    resetState(): void;
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
    dispose(): Promise<void>;
}
/**
 * Represents a basic model for Image-based lighting (IBL). The environment
 * is defined via environment maps in the equirectangular or cube map format.
 * `BasicEnvironmentNode` is intended for non-PBR materials like {@link MeshBasicNodeMaterial}
 * or {@link MeshPhongNodeMaterial}.
 *
 * @augments LightingNode
 */
export class BasicEnvironmentNode extends LightingNode {
    /**
     * Constructs a new basic environment node.
     *
     * @param {Node} [envNode=null] - A node representing the environment.
     */
    constructor(envNode?: Node);
    /**
     * A node representing the environment.
     *
     * @type {Node}
     * @default null
     */
    envNode: Node;
    setup(builder: any): void;
}
/**
 * A specific version of {@link IrradianceNode} that is only relevant
 * for {@link MeshBasicNodeMaterial}. Since the material is unlit, it
 * requires a special scaling factor for the light map.
 *
 * @augments LightingNode
 */
export class BasicLightMapNode extends LightingNode {
    /**
     * Constructs a new basic light map node.
     *
     * @param {?Node<vec3>} [lightMapNode=null] - The light map node.
     */
    constructor(lightMapNode?: Node<any> | null);
    /**
     * The light map node.
     *
     * @type {?Node<vec3>}
     */
    lightMapNode: Node<any> | null;
    setup(builder: any): void;
}
/**
 * This version of a node library represents a basic version
 * just focusing on lights and tone mapping techniques.
 *
 * @private
 * @augments NodeLibrary
 */
export class BasicNodeLibrary extends NodeLibrary {
}
/**
 * A specialized group which enables applications access to the
 * Render Bundle API of WebGPU. The group with all its descendant nodes
 * are considered as one render bundle and processed as such by
 * the renderer.
 *
 * Only renderable 3D objects are allowed in a bundle group. Other
 * types like lights are not supported and must be added to the scene
 * outside of the group.
 *
 * This module is only fully supported by `WebGPURenderer` with a WebGPU backend.
 * With a WebGL backend, the group can technically be rendered but without
 * any performance improvements.
 *
 * @augments Group
 */
export class BundleGroup extends Group {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBundleGroup: boolean;
    /**
     * The bundle group's version.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly version: number;
    /**
     * Set this property to `true` when the bundle group has changed.
     *
     * @type {boolean}
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
}
import { ByteType } from './three.core.js';
/**
 * CanvasTarget is a class that represents the final output destination of the renderer.
 *
 * @augments EventDispatcher
 */
export class CanvasTarget extends EventDispatcher {
    /**
     * Constructs a new CanvasTarget.
     *
     * @param {HTMLCanvasElement|OffscreenCanvas} domElement - The canvas element to render to.
     */
    constructor(domElement: HTMLCanvasElement | OffscreenCanvas);
    /**
     * A reference to the canvas element the renderer is drawing to.
     * This value of this property will automatically be created by
     * the renderer.
     *
     * @type {HTMLCanvasElement|OffscreenCanvas}
     */
    domElement: HTMLCanvasElement | OffscreenCanvas;
    /**
     * The renderer's pixel ratio.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _pixelRatio;
    /**
     * The width of the renderer's default framebuffer in logical pixel unit.
     *
     * @private
     * @type {number}
     */
    private _width;
    /**
     * The height of the renderer's default framebuffer in logical pixel unit.
     *
     * @private
     * @type {number}
     */
    private _height;
    /**
     * The viewport of the renderer in logical pixel unit.
     *
     * @private
     * @type {Vector4}
     */
    private _viewport;
    /**
     * The scissor rectangle of the renderer in logical pixel unit.
     *
     * @private
     * @type {Vector4}
     */
    private _scissor;
    /**
     * Whether the scissor test should be enabled or not.
     *
     * @private
     * @type {boolean}
     */
    private _scissorTest;
    /**
     * The color texture of the default framebuffer.
     *
     * @type {FramebufferTexture}
     */
    colorTexture: FramebufferTexture;
    /**
     * The depth texture of the default framebuffer.
     *
     * @type {DepthTexture}
     */
    depthTexture: DepthTexture;
    /**
     * Returns the pixel ratio.
     *
     * @return {number} The pixel ratio.
     */
    getPixelRatio(): number;
    /**
     * Returns the drawing buffer size in physical pixels. This method honors the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The drawing buffer size.
     */
    getDrawingBufferSize(target: Vector2): Vector2;
    /**
     * Returns the renderer's size in logical pixels. This method does not honor the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The renderer's size in logical pixels.
     */
    getSize(target: Vector2): Vector2;
    /**
     * Sets the given pixel ratio and resizes the canvas if necessary.
     *
     * @param {number} [value=1] - The pixel ratio.
     */
    setPixelRatio(value?: number): void;
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
    setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;
    /**
     * Sets the size of the renderer.
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     * @param {boolean} [updateStyle=true] - Whether to update the `style` attribute of the canvas or not.
     */
    setSize(width: number, height: number, updateStyle?: boolean): void;
    /**
     * Returns the scissor rectangle.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The scissor rectangle.
     */
    getScissor(target: Vector4): Vector4;
    /**
     * Defines the scissor rectangle.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the box in logical pixel unit.
     * Instead of passing four arguments, the method also works with a single four-dimensional vector.
     * @param {number} y - The vertical coordinate for the lower left corner of the box in logical pixel unit.
     * @param {number} width - The width of the scissor box in logical pixel unit.
     * @param {number} height - The height of the scissor box in logical pixel unit.
     */
    setScissor(x: number | Vector4, y: number, width: number, height: number): void;
    /**
     * Returns the scissor test value.
     *
     * @return {boolean} Whether the scissor test should be enabled or not.
     */
    getScissorTest(): boolean;
    /**
     * Defines the scissor test.
     *
     * @param {boolean} boolean - Whether the scissor test should be enabled or not.
     */
    setScissorTest(boolean: boolean): void;
    /**
     * Returns the viewport definition.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The viewport definition.
     */
    getViewport(target: Vector4): Vector4;
    /**
     * Defines the viewport.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.
     * @param {number} y - The vertical coordinate for the lower left corner of the viewport origin  in logical pixel unit.
     * @param {number} width - The width of the viewport in logical pixel unit.
     * @param {number} height - The height of the viewport in logical pixel unit.
     * @param {number} minDepth - The minimum depth value of the viewport. WebGPU only.
     * @param {number} maxDepth - The maximum depth value of the viewport. WebGPU only.
     */
    setViewport(x: number | Vector4, y: number, width: number, height: number, minDepth?: number, maxDepth?: number): void;
    /**
     * Dispatches the resize event.
     *
     * @private
     */
    private _dispatchResize;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     *
     * @fires RenderTarget#dispose
     */
    dispose(): void;
}
import { CineonToneMapping } from './three.core.js';
import { ClampToEdgeWrapping } from './three.core.js';
/**
 * In earlier three.js versions, clipping was defined globally
 * on the renderer or on material level. This special version of
 * `THREE.Group` allows to encode the clipping state into the scene
 * graph. Meaning if you create an instance of this group, all
 * descendant 3D objects will be affected by the respective clipping
 * planes.
 *
 * Note: `ClippingGroup` can only be used with `WebGPURenderer`.
 *
 * @augments Group
 */
export class ClippingGroup extends Group {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isClippingGroup: boolean;
    /**
     * An array with clipping planes.
     *
     * @type {Array<Plane>}
     */
    clippingPlanes: Array<Plane>;
    /**
     * Whether clipping should be enabled or not.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * Whether the intersection of the clipping planes is used to clip objects, rather than their union.
     *
     * @type {boolean}
     * @default false
     */
    clipIntersection: boolean;
    /**
     * Whether shadows should be clipped or not.
     *
     * @type {boolean}
     * @default false
     */
    clipShadows: boolean;
}
import { CodeNode } from './three.tsl.js';
import { Color } from './three.core.js';
import { ColorManagement } from './three.core.js';
import { Compatibility } from './three.core.js';
import { ConstantAlphaFactor } from './three.core.js';
import { ConstantColorFactor } from './three.core.js';
/**
 * This node can be used to automatically convert environment maps in the
 * equirectangular format into the cube map format.
 *
 * @augments Node
 */
export class CubeMapNode extends Node {
    /**
     * Constructs a new cube map node.
     *
     * @param {Node} envNode - The node representing the environment map.
     */
    constructor(envNode: Node);
    /**
     * The node representing the environment map.
     *
     * @type {Node}
     */
    envNode: Node;
    /**
     * A reference to the internal cube texture.
     *
     * @private
     * @type {?CubeTexture}
     * @default null
     */
    private _cubeTexture;
    /**
     * A reference to the internal cube texture node.
     *
     * @private
     * @type {CubeTextureNode}
     */
    private _cubeTextureNode;
    /**
     * A default cube texture that acts as a placeholder.
     * It is used when the conversion from equirectangular to cube
     * map has not finished yet for a given texture.
     *
     * @private
     * @type {CubeTexture}
     */
    private _defaultTexture;
    updateBefore(frame: any): void;
    setup(builder: any): CubeTextureNode;
}
import { CubeReflectionMapping } from './three.core.js';
import { CubeRefractionMapping } from './three.core.js';
import { CubeRenderTarget } from './three.tsl.js';
import { CubeTexture } from './three.core.js';
import { CullFaceBack } from './three.core.js';
import { CullFaceFront } from './three.core.js';
import { CullFaceNone } from './three.core.js';
import { CustomBlending } from './three.core.js';
import { CylinderGeometry } from './three.core.js';
import { DataTexture } from './three.core.js';
import { DecrementStencilOp } from './three.core.js';
import { DecrementWrapStencilOp } from './three.core.js';
import { DepthFormat } from './three.core.js';
import { DepthStencilFormat } from './three.core.js';
import { DepthTexture } from './three.core.js';
/**
 * An alternative render pipeline that applies output processing directly in
 * material shaders. This avoids the intermediate framebuffer and output pass
 * used by {@link Renderer}, but changes blending and is not compatible with
 * materials that sample the framebuffer, such as transmissive materials.
 * With the WebGL backend, `antialias` has no effect.
 *
 * ```js
 * const renderPipeline = new DirectRenderPipeline( renderer );
 * renderPipeline.render( scene, camera );
 * ```
 *
 * Note: This module can only be used with `WebGPURenderer`.
 *
 * @augments RenderPipeline
 */
export class DirectRenderPipeline extends RenderPipeline {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDirectRenderPipeline: boolean;
    /**
     * The context node used to apply output processing in material shaders.
     *
     * @private
     * @type {?ContextNode}
     * @default null
     */
    private _contextNode;
    /**
     * The renderer context node wrapped by this pipeline.
     *
     * @private
     * @type {?ContextNode}
     * @default null
     */
    private _rendererContextNode;
    /**
     * Cached node representations of solid scene backgrounds.
     *
     * @private
     * @type {WeakMap<Color, UniformNode>}
     */
    private _backgroundNodes;
    /**
     * Renders the scene with output processing applied directly in material shaders.
     *
     * @param {Object3D} scene - The scene or object to render.
     * @param {Camera} camera - The camera.
     */
    render(scene: Object3D, camera: Camera): void;
    /**
     * Returns a node representation of a solid scene background so it receives
     * the same inline output processing as material fragments.
     *
     * @private
     * @param {Object3D} scene - The scene or object to render.
     * @return {?UniformNode} The background node.
     */
    private _getBackgroundNode;
}
import { DirectionalLight } from './three.core.js';
/**
 * Module for representing directional lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class DirectionalLightNode extends AnalyticLightNode {
    /**
     * Constructs a new directional light node.
     *
     * @param {?DirectionalLight} [light=null] - The directional light source.
     */
    constructor(light?: DirectionalLight | null);
    setupDirect(): {
        lightDirection: any;
        lightColor: Node;
    };
}
import { DoubleSide } from './three.core.js';
import { DstAlphaFactor } from './three.core.js';
import { DstColorFactor } from './three.core.js';
import { DynamicDrawUsage } from './three.core.js';
/**
 * Represents a physical model for Image-based lighting (IBL). The environment
 * is defined by an equirectangular or cube texture.
 * `EnvironmentNode` is intended for PBR materials like {@link MeshStandardNodeMaterial}.
 *
 * @augments LightingNode
 */
export class EnvironmentNode extends LightingNode {
    /**
     * Constructs a new environment node.
     *
     * @param {Node} [envNode=null] - A node representing the environment.
     */
    constructor(envNode?: Node);
    /**
     * A node representing the environment.
     *
     * @type {?Node}
     * @default null
     */
    envNode: Node | null;
    setup(builder: any): void;
    /**
     * Returns the PMREM node cache of the current renderer.
     *
     * @private
     * @param {Renderer} renderer - The current renderer.
     * @return {WeakMap} The node cache.
     */
    private _getPMREMNodeCache;
}
import { EqualCompare } from './three.core.js';
import { EqualDepth } from './three.core.js';
import { EqualStencilFunc } from './three.core.js';
import { EquirectangularReflectionMapping } from './three.core.js';
import { EquirectangularRefractionMapping } from './three.core.js';
import { EventDispatcher } from './three.core.js';
import { ExpressionNode } from './three.tsl.js';
import { FileLoader } from './three.core.js';
import { Float16BufferAttribute } from './three.core.js';
import { FloatType } from './three.core.js';
import { FramebufferTexture } from './three.core.js';
import { FrontSide } from './three.core.js';
import { Frustum } from './three.core.js';
import { FrustumArray } from './three.core.js';
import { FunctionNode } from './three.tsl.js';
/**
 * A node builder targeting GLSL.
 *
 * This module generates GLSL shader code from node materials and also
 * generates the respective bindings and vertex buffer definitions. These
 * data are later used by the renderer to create render and compute pipelines
 * for render objects.
 *
 * @augments NodeBuilder
 */
export class GLSLNodeBuilder extends NodeBuilder {
    /**
     * Constructs a new GLSL node builder renderer.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Renderer} renderer - The renderer.
     */
    constructor(object: Object3D, renderer: Renderer);
    /**
     * A dictionary holds for each shader stage ('vertex', 'fragment', 'compute')
     * another dictionary which manages UBOs per group ('render','frame','object').
     *
     * @type {Object<string,Object<string,NodeUniformsGroup>>}
     */
    uniformGroups: {
        [x: string]: {
            [x: string]: NodeUniformsGroup;
        };
    };
    /**
     * An array that holds objects defining the varying and attribute data in
     * context of Transform Feedback.
     *
     * @type {Array<Object<string,AttributeNode|string>>}
     */
    transforms: Array<{
        [x: string]: AttributeNode | string;
    }>;
    /**
     * A dictionary that holds for each shader stage a Map of used extensions.
     *
     * @type {Object<string,Map<string,Object>>}
     */
    extensions: {
        [x: string]: Map<string, Object>;
    };
    /**
     * A dictionary that holds for each shader stage an Array of used builtins.
     *
     * @type {Object<string,Array<string>>}
     */
    builtins: {
        [x: string]: string[];
    };
    /**
     * Checks if the given texture requires a manual conversion to the working color space.
     *
     * @param {Texture} texture - The texture to check.
     * @return {boolean} Whether the given texture requires a conversion to working color space or not.
     */
    needsToWorkingColorSpace(texture: Texture): boolean;
    /**
     * Includes the given method name into the current
     * function node.
     *
     * @private
     * @param {string} name - The method name to include.
     * @return {CodeNode} The respective code node.
     */
    private _include;
    /**
     * Returns the bitcast method name for a given input and outputType.
     *
     * @param {string} type - The output type to bitcast to.
     * @param {string} inputType - The input type of the.
     * @return {string} The resolved GLSL bitcast invocation.
     */
    getBitcastMethod(type: string, inputType: string): string;
    /**
     * Returns the float packing method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the float values are mapped to the integer range.
     * @param {string} [layout='2x16'] - The component layout of the packed integer.
     * @returns {string} The resolved GLSL float packing method name.
     */
    getFloatPackingMethod(encoding: string, layout?: string): string;
    /**
     * Returns the float unpacking method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the integer values are mapped to the float range.
     * @param {string} [layout='2x16'] - The component layout of the packed integer.
     * @returns {string} The resolved GLSL float unpacking method name.
     */
    getFloatUnpackingMethod(encoding: string, layout?: string): string;
    /**
     * Returns the native snippet for a ternary operation.
     *
     * @param {string} condSnippet - The condition determining which expression gets resolved.
     * @param {string} ifSnippet - The expression to resolve to if the condition is true.
     * @param {string} elseSnippet - The expression to resolve to if the condition is false.
     * @return {string} The resolved method name.
     */
    getTernary(condSnippet: string, ifSnippet: string, elseSnippet: string): string;
    /**
     * Returns the native snippet for a genuinely per-component vector select.
     * GLSL has no vector ternary, so `float` types use `mix()`'s `bvecN`-selector
     * overload; `int`/`uint`/`bool` types use an arithmetic select instead, since
     * that overload doesn't exist for them.
     *
     * @param {string} condSnippet - The per-component boolean (`bvecN`) condition.
     * @param {string} ifSnippet - The vector expression selected where `condSnippet` is `true`.
     * @param {string} elseSnippet - The vector expression selected where `condSnippet` is `false`.
     * @param {string} type - The (vector) type of `ifSnippet`/`elseSnippet`.
     * @return {string} The resolved method name.
     */
    getVectorSelect(condSnippet: string, ifSnippet: string, elseSnippet: string, type: string): string;
    /**
     * Builds the given shader node.
     *
     * @param {ShaderNodeInternal} shaderNode - The shader node.
     * @return {string} The GLSL function code.
     */
    buildFunctionCode(shaderNode: ShaderNodeInternal): string;
    /**
     * Setups the Pixel Buffer Object (PBO) for the given storage
     * buffer node.
     *
     * @param {StorageBufferNode} storageBufferNode - The storage buffer node.
     */
    setupPBO(storageBufferNode: StorageBufferNode): void;
    /**
     * Returns a GLSL snippet that represents the property name of the given node.
     *
     * @param {Node} node - The node.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The property name.
     */
    getPropertyName(node: Node, shaderStage?: string): string;
    /**
     * Returns whether the given name is a reserved keyword of GLSL.
     *
     * @param {string} name - The name to test.
     * @return {boolean} Whether the name is a reserved keyword or not.
     */
    isReservedKeyword(name: string): boolean;
    /**
     * Setups the Pixel Buffer Object (PBO) for the given storage
     * buffer node.
     *
     * @param {StorageArrayElementNode} storageArrayElementNode - The storage array element node.
     * @return {string} The property name.
     */
    generatePBO(storageArrayElementNode: StorageArrayElementNode): string;
    /**
     * Generates the GLSL snippet that reads a single texel from a texture without sampling or filtering.
     *
     * @param {?Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {?string} levelSnippet - A GLSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A GLSL snippet that represents the 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureLoad(texture: Texture | null, textureProperty: string, uvIndexSnippet: string, levelSnippet: string | null, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for sampling/loading the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet -  A GLSL snippet that represents the 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTexture(texture: Texture, textureProperty: string, uvSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet that resolves the dimensions of the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} levelSnippet - A GLSL snippet that represents the mip level.
     * @return {string} The GLSL snippet.
     */
    generateTextureSize(texture: Texture, textureProperty: string, levelSnippet: string): string;
    /**
     * Generates the GLSL snippet when sampling textures with explicit mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} levelSnippet - A GLSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureLevel(texture: Texture, textureProperty: string, uvSnippet: string, levelSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet when sampling textures with a bias to the mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} biasSnippet - A GLSL snippet that represents the bias to apply to the mip level before sampling.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureBias(texture: Texture, textureProperty: string, uvSnippet: string, biasSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for sampling/loading the given texture using explicit gradients.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {Array<string>} gradSnippet - An array holding both gradient GLSL snippets.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The GLSL snippet.
     */
    generateTextureGrad(texture: Texture, textureProperty: string, uvSnippet: string, gradSnippet: Array<string>, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for sampling a depth texture and comparing the sampled depth values
     * against a reference value.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} compareSnippet -  A GLSL snippet that represents the reference value.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The GLSL snippet.
     */
    generateTextureCompare(texture: Texture, textureProperty: string, uvSnippet: string, compareSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the GLSL snippet for gathering four texels from the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} gatherSnippet - A GLSL snippet that represents the index of the channel to read.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {?string} flipYSnippet - A GLSL snippet that represents the y-flip. Only used for WebGL.
     * @return {string} The GLSL snippet.
     */
    generateTextureGather(texture: Texture, textureProperty: string, uvSnippet: string, gatherSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, flipYSnippet: string | null): string;
    /**
     * Generates the GLSL snippet for performing a depth comparison on four texels in the given depth texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A GLSL snippet that represents texture coordinates used for sampling.
     * @param {string} compareSnippet - A GLSL snippet that represents the reference value.
     * @param {?string} depthSnippet - A GLSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A GLSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {?string} flipYSnippet - A GLSL snippet that represents the y-flip. Only used for WebGL.
     * @return {string} The GLSL snippet.
     */
    generateTextureGatherCompare(texture: Texture, textureProperty: string, uvSnippet: string, compareSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, flipYSnippet: string | null): string;
    /**
     * Returns the uniform block name of the given buffer uniform.
     *
     * @param {NodeUniform} uniform - The buffer uniform.
     * @return {string} The uniform block name.
     */
    getUniformBufferName(uniform: NodeUniform): string;
    /**
     * Returns the uniforms of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the uniforms.
     */
    getUniforms(shaderStage: string): string;
    /**
     * Returns the shader attributes of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the shader attributes.
     */
    getAttributes(shaderStage: string): string;
    /**
     * Returns the members of the given struct type node as a GLSL string.
     *
     * @param {StructTypeNode} struct - The struct type node.
     * @return {string} The GLSL snippet that defines the struct members.
     */
    getStructMembers(struct: StructTypeNode): string;
    /**
     * Returns the structs of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the structs.
     */
    getStructs(shaderStage: string): string;
    /**
     * Returns the varyings of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the varyings.
     */
    getVaryings(shaderStage: string): string;
    /**
     * Returns a builtin representing the index of an invocation within its workgroup.
     *
     * @return {string} The invocation local index.
     */
    getInvocationLocalIndex(): string;
    /**
     * Returns a builtin representing the size of a subgroup within the current shader.
     */
    getSubgroupSize(): void;
    /**
     * Returns a builtin representing the index of an invocation within its subgroup.
     */
    getInvocationSubgroupIndex(): void;
    /**
     * Returns a builtin representing the index of the current invocation's subgroup within its workgroup.
     */
    getSubgroupIndex(): void;
    /**
     * Returns the frag depth builtin.
     *
     * @return {string} The frag depth builtin.
     */
    getFragDepth(): string;
    /**
     * Enables the given extension.
     *
     * @param {string} name - The extension name.
     * @param {string} behavior - The extension behavior.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage.
     */
    enableExtension(name: string, behavior: string, shaderStage?: string): void;
    /**
     * Returns the enabled extensions of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the enabled extensions.
     */
    getExtensions(shaderStage: string): string;
    /**
     * Returns the clip distances builtin.
     *
     * @return {string} The clip distances builtin.
     */
    getClipDistance(): string;
    /**
     * Whether the requested feature is available or not.
     *
     * @param {string} name - The requested feature.
     * @return {boolean} Whether the requested feature is supported or not.
     */
    isAvailable(name: string): boolean;
    /**
     * Enables hardware clipping.
     *
     * @param {string} planeCount - The clipping plane count.
     */
    enableHardwareClipping(planeCount: string): void;
    /**
     * Enables multiview.
     */
    enableMultiview(): void;
    /**
     * Registers a transform in context of Transform Feedback.
     *
     * @param {string} varyingName - The varying name.
     * @param {AttributeNode} attributeNode - The attribute node.
     */
    registerTransform(varyingName: string, attributeNode: AttributeNode): void;
    /**
     * Returns the transforms of the given shader stage as a GLSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The GLSL snippet that defines the transforms.
     */
    getTransforms(): string;
    /**
     * Returns a GLSL struct based on the given name and variables.
     *
     * @private
     * @param {string} name - The struct name.
     * @param {string} vars - The struct variables.
     * @return {string} The GLSL snippet representing a struct.
     */
    private _getGLSLUniformStruct;
    /**
     * Returns a GLSL vertex shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getGLSLVertexCode;
    /**
     * Returns a GLSL fragment shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getGLSLFragmentCode;
    /**
     * This method is one of the more important ones since it's responsible
     * for generating a matching binding instance for the given uniform node.
     *
     * These bindings are later used in the renderer to create bind groups
     * and layouts.
     *
     * @param {UniformNode} node - The uniform node.
     * @param {string} type - The node data type.
     * @param {string} shaderStage - The shader stage.
     * @param {?string} [name=null] - An optional uniform name.
     * @return {NodeUniform} The node uniform object.
     */
    getUniformFromNode(node: UniformNode, type: string, shaderStage: string, name?: string | null): NodeUniform;
}
/**
 * A GLSL node parser.
 *
 * @augments NodeParser
 */
export class GLSLNodeParser extends NodeParser {
    /**
     * The method parses the given GLSL code an returns a node function.
     *
     * @param {string} source - The GLSL code.
     * @return {GLSLNodeFunction} A node function.
     */
    parseFunction(source: string): GLSLNodeFunction;
}
import { GreaterCompare } from './three.core.js';
import { GreaterDepth } from './three.core.js';
import { GreaterEqualCompare } from './three.core.js';
import { GreaterEqualDepth } from './three.core.js';
import { GreaterEqualStencilFunc } from './three.core.js';
import { GreaterStencilFunc } from './three.core.js';
import { Group } from './three.core.js';
import { HalfFloatType } from './three.core.js';
import { HemisphereLight } from './three.core.js';
/**
 * Module for representing hemisphere lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class HemisphereLightNode extends AnalyticLightNode {
    /**
     * Constructs a new hemisphere light node.
     *
     * @param {?HemisphereLight} [light=null] - The hemisphere light source.
     */
    constructor(light?: HemisphereLight | null);
    /**
     * Uniform node representing the light's position.
     *
     * @type {UniformNode<vec3>}
     */
    lightPositionNode: UniformNode<any>;
    /**
     * A node representing the light's direction.
     *
     * @type {Node<vec3>}
     */
    lightDirectionNode: Node<any>;
    /**
     * Uniform node representing the light's ground color.
     *
     * @type {UniformNode<vec3>}
     */
    groundColorNode: UniformNode<any>;
    /**
     * Overwritten to updated hemisphere light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setup(builder: any): void;
}
/**
 * A IES version of {@link SpotLight}. Can only be used with {@link WebGPURenderer}.
 *
 * @augments SpotLight
 */
export class IESSpotLight extends SpotLight {
    /**
     * The IES map. It's a lookup table that stores normalized attenuation factors
     * (0.0 to 1.0) that represent the light's intensity at a specific angle.
     *
     * @type {?Texture}
     * @default null
     */
    iesMap: Texture | null;
    copy(source: any, recursive: any): this;
}
/**
 * An IES version of the default spot light node.
 *
 * @augments SpotLightNode
 */
export class IESSpotLightNode extends SpotLightNode {
    /**
     * The texture node representing the IES texture.
     *
     * @type {?TextureNode}
     * @default null
     */
    _iesTextureNode: TextureNode | null;
}
import { IncrementStencilOp } from './three.core.js';
import { IncrementWrapStencilOp } from './three.core.js';
/**
 * This special type of buffer attribute is intended for compute shaders.
 * It can be used to encode draw parameters for indirect draw calls.
 *
 * Note: This type of buffer attribute can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments StorageBufferAttribute
 */
export class IndirectStorageBufferAttribute extends StorageBufferAttribute {
    /**
     * Constructs a new storage buffer attribute.
     *
     * @param {number|Uint32Array} count - The item count. It is also valid to pass a `Uint32Array` as an argument.
     * The subsequent parameter is then obsolete.
     * @param {number} itemSize - The item size.
     */
    constructor(count: number | Uint32Array, itemSize: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isIndirectStorageBufferAttribute: boolean;
}
import { InspectorBase } from './three.tsl.js';
import { IntType } from './three.core.js';
import { InvertStencilOp } from './three.core.js';
import { KeepStencilOp } from './three.core.js';
import { LessCompare } from './three.core.js';
import { LessDepth } from './three.core.js';
import { LessEqualCompare } from './three.core.js';
import { LessEqualDepth } from './three.core.js';
import { LessEqualStencilFunc } from './three.core.js';
import { LessStencilFunc } from './three.core.js';
import { LightProbe } from './three.core.js';
/**
 * Module for representing light probes as nodes.
 *
 * @augments AnalyticLightNode
 */
export class LightProbeNode extends AnalyticLightNode {
    /**
     * Constructs a new light probe node.
     *
     * @param {?LightProbe} [light=null] - The light probe.
     */
    constructor(light?: LightProbe | null);
    /**
     * Light probe represented as a uniform of spherical harmonics.
     *
     * @type {UniformArrayNode}
     */
    lightProbe: UniformArrayNode;
    /**
     * Overwritten to updated light probe specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setup(builder: any): void;
}
/**
 * This renderer module manages the lights nodes which are unique
 * per scene + camera + lighting combination.
 *
 * The lights node itself is later configured in the render list
 * with the actual lights from the scene.
 *
 * @private
 */
export class Lighting {
    /**
     * Whether this lighting manager is enabled or not.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * A stack of light arrays saved per render via {@link Lighting#beginRender}.
     *
     * @private
     * @type {Array<Array<Light>>}
     */
    private _cache;
    /**
     * A map of lights nodes per scene.
     *
     * @private
     * @type {WeakMap<Scene, LightsNode>}
     */
    private _lightsNodeMap;
    /**
     * Creates a new lights node for the given array of lights.
     *
     * @param {Array<Light>} lights - The render object.
     * @return {LightsNode} The lights node.
     */
    createNode(lights?: Array<Light>): LightsNode;
    /**
     * Returns a lights node for the given scene.
     *
     * @param {Scene} scene - The scene.
     * @return {LightsNode} The lights node.
     */
    getNode(scene: Scene): LightsNode;
    /**
     * Saves the current lights of the scene's lights node so they can be restored
     * in {@link Lighting#finishRender}. Must be paired with a `finishRender()` call
     * to avoid memory leaks.
     *
     * Nested render calls might mutate the lights array so a save/restore is required
     * for each render call.
     *
     * @param {Scene} scene - The scene.
     */
    beginRender(scene: Scene): void;
    /**
     * Restores the lights saved by the matching {@link Lighting#beginRender} call.
     *
     * @param {Scene} scene - The scene.
     */
    finishRender(scene: Scene): void;
}
/**
 * Abstract class for implementing lighting models. The module defines
 * multiple methods that concrete lighting models can implement. These
 * methods are executed at different points during the light evaluation
 * process.
 */
export class LightingModel {
    /**
     * This method is intended for setting up lighting model and context data
     * which are later used in the evaluation process.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     */
    start(builder: NodeBuilder): void;
    /**
     * This method is intended for executing final tasks like final updates
     * to the outgoing light.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish(): void;
    /**
     * This method is intended for implementing the direct light term and
     * executed during the build process of directional, point and spot light nodes.
     *
     * @abstract
     * @param {Object} lightData - The light data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct(): void;
    /**
     * This method is intended for implementing the direct light term for
     * rect area light nodes.
     *
     * @abstract
     * @param {Object} lightData - The light data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    directRectArea(): void;
    /**
     * This method is intended for implementing the indirect light term.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect(): void;
    /**
     * This method is intended for implementing the ambient occlusion term.
     * Unlike other methods, this method must be called manually by the lighting
     * model in its indirect term.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     */
    ambientOcclusion(): void;
}
import { LightingNode } from './three.tsl.js';
import { LightsNode } from './three.tsl.js';
/**
 * This node material can be used to render lines with a size larger than one
 * by representing them as instanced meshes.
 *
 * @augments NodeMaterial
 */
export class Line2NodeMaterial extends NodeMaterial {
    /**
     * Constructs a new node material for wide line rendering.
     *
     * @param {Object} [parameters={}] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLine2NodeMaterial: boolean;
    /**
     * The dash offset.
     *
     * @type {number}
     * @default 0
     */
    dashOffset: number;
    /**
     * Defines the offset.
     *
     * @type {?Node<float>}
     * @default null
     */
    offsetNode: Node<any> | null;
    /**
     * Defines the dash scale.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashScaleNode: Node<any> | null;
    /**
     * Defines the dash size.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashSizeNode: Node<any> | null;
    /**
     * Defines the gap size.
     *
     * @type {?Node<float>}
     * @default null
     */
    gapSizeNode: Node<any> | null;
    _useDash: any;
    _useAlphaToCoverage: boolean;
    _useWorldUnits: boolean;
    /**
     * Setups the diffuse color of the line material in the fragment stage.
     * Overrides the base setup to incorporate line/dash rendering and blending.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupDiffuseColor(builder: NodeBuilder): void;
    /**
     * Setups the position of the expanded fat line vertex in local space.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The position of the fat line vertex in local space.
     */
    setupPosition(builder: NodeBuilder): Node<any>;
    set lineColorNode(value: Node<any> | null);
    /**
     * Defines the lines color.
     *
     * @deprecated since r185. Use {@link NodeMaterial#colorNode} instead.
     * @type {?Node<vec3>}
     */
    get lineColorNode(): Node<any> | null;
    set worldUnits(value: boolean);
    /**
     * Whether the lines should sized in world units or not.
     * When set to `false` the unit is pixel.
     *
     * @type {boolean}
     * @default false
     */
    get worldUnits(): boolean;
    set dashed(value: boolean);
    /**
     * Whether the lines should be dashed or not.
     *
     * @type {boolean}
     * @default false
     */
    get dashed(): boolean;
}
import { LineBasicMaterial } from './three.core.js';
/**
 * Node material version of {@link LineBasicMaterial}.
 *
 * @augments NodeMaterial
 */
export class LineBasicNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new line basic node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineBasicNodeMaterial: boolean;
}
import { LineDashedMaterial } from './three.core.js';
/**
 * Node material version of  {@link LineDashedMaterial}.
 *
 * @augments NodeMaterial
 */
export class LineDashedNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new line dashed node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineDashedNodeMaterial: boolean;
    /**
     * The dash offset.
     *
     * @type {number}
     * @default 0
     */
    dashOffset: number;
    /**
     * The offset of dash materials is by default inferred from the `dashOffset`
     * property. This node property allows to overwrite the default
     * and define the offset with a node instead.
     *
     * If you don't want to overwrite the offset but modify the existing
     * value instead, use {@link materialLineDashOffset}.
     *
     * @type {?Node<float>}
     * @default null
     */
    offsetNode: Node<any> | null;
    /**
     * The scale of dash materials is by default inferred from the `scale`
     * property. This node property allows to overwrite the default
     * and define the scale with a node instead.
     *
     * If you don't want to overwrite the scale but modify the existing
     * value instead, use {@link materialLineScale}.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashScaleNode: Node<any> | null;
    /**
     * The dash size of dash materials is by default inferred from the `dashSize`
     * property. This node property allows to overwrite the default
     * and define the dash size with a node instead.
     *
     * If you don't want to overwrite the dash size but modify the existing
     * value instead, use {@link materialLineDashSize}.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashSizeNode: Node<any> | null;
    /**
     * The gap size of dash materials is by default inferred from the `gapSize`
     * property. This node property allows to overwrite the default
     * and define the gap size with a node instead.
     *
     * If you don't want to overwrite the gap size but modify the existing
     * value instead, use {@link materialLineGapSize}.
     *
     * @type {?Node<float>}
     * @default null
     */
    gapSizeNode: Node<any> | null;
}
import { LinearFilter } from './three.core.js';
import { LinearMipmapLinearFilter } from './three.core.js';
import { LinearMipmapNearestFilter } from './three.core.js';
import { LinearToneMapping } from './three.core.js';
import { LinearTransfer } from './three.core.js';
import { Loader } from './three.core.js';
import { Material } from './three.core.js';
import { MaterialBlending } from './three.core.js';
import { MaterialLoader } from './three.core.js';
import { Matrix2 } from './three.core.js';
import { Matrix3 } from './three.core.js';
import { Matrix4 } from './three.core.js';
import { MaxEquation } from './three.core.js';
import { Mesh } from './three.core.js';
import { MeshBasicMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshBasicMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshBasicNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh basic node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshBasicNodeMaterial: boolean;
    /**
     * Overwritten since this type of material uses {@link BasicEnvironmentNode}
     * to implement the default environment mapping.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?BasicEnvironmentNode<vec3>} The environment node.
     */
    setupEnvironment(builder: NodeBuilder): BasicEnvironmentNode<any> | null;
    /**
     * This method must be overwritten since light maps are evaluated
     * with a special scaling factor for basic materials.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?BasicLightMapNode<vec3>} The light map node.
     */
    setupLightMap(builder: NodeBuilder): BasicLightMapNode<any> | null;
    /**
     * Setups the lighting model.
     *
     * @return {BasicLightingModel} The lighting model.
     */
    setupLightingModel(): BasicLightingModel;
}
import { MeshLambertMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshLambertMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshLambertNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh lambert node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshLambertNodeMaterial: boolean;
    /**
     * Overwritten since this type of material uses {@link BasicEnvironmentNode}
     * to implement the default environment mapping.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?BasicEnvironmentNode<vec3>} The environment node.
     */
    setupEnvironment(builder: NodeBuilder): BasicEnvironmentNode<any> | null;
    /**
     * Setups the lighting model.
     *
     * @return {PhongLightingModel} The lighting model.
     */
    setupLightingModel(): PhongLightingModel;
}
import { MeshMatcapMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshMatcapMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshMatcapNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh normal node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshMatcapNodeMaterial: boolean;
    /**
     * Setups the matcap specific node variables.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupVariants(builder: NodeBuilder): void;
}
import { MeshNormalMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshNormalMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshNormalNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh normal node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshNormalNodeMaterial: boolean;
    /**
     * Overwrites the default implementation by computing the diffuse color
     * based on the normal data.
     */
    setupDiffuseColor(): void;
}
import { MeshPhongMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshPhongMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshPhongNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh lambert node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshPhongNodeMaterial: boolean;
    /**
     * The shininess of phong materials is by default inferred from the `shininess`
     * property. This node property allows to overwrite the default
     * and define the shininess with a node instead.
     *
     * If you don't want to overwrite the shininess but modify the existing
     * value instead, use {@link materialShininess}.
     *
     * @type {?Node<float>}
     * @default null
     */
    shininessNode: Node<any> | null;
    /**
     * The specular color of phong materials is by default inferred from the
     * `specular` property. This node property allows to overwrite the default
     * and define the specular color with a node instead.
     *
     * If you don't want to overwrite the specular color but modify the existing
     * value instead, use {@link materialSpecular}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    specularNode: Node<any> | null;
    /**
     * Overwritten since this type of material uses {@link BasicEnvironmentNode}
     * to implement the default environment mapping.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?BasicEnvironmentNode<vec3>} The environment node.
     */
    setupEnvironment(builder: NodeBuilder): BasicEnvironmentNode<any> | null;
    /**
     * Setups the lighting model.
     *
     * @return {PhongLightingModel} The lighting model.
     */
    setupLightingModel(): PhongLightingModel;
}
import { MeshPhysicalMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshPhysicalMaterial}.
 *
 * @augments MeshStandardNodeMaterial
 */
export class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshPhysicalNodeMaterial: boolean;
    /**
     * The clearcoat of physical materials is by default inferred from the `clearcoat`
     * and `clearcoatMap` properties. This node property allows to overwrite the default
     * and define the clearcoat with a node instead.
     *
     * If you don't want to overwrite the clearcoat but modify the existing
     * value instead, use {@link materialClearcoat}.
     *
     * @type {?Node<float>}
     * @default null
     */
    clearcoatNode: Node<any> | null;
    /**
     * The clearcoat roughness of physical materials is by default inferred from the `clearcoatRoughness`
     * and `clearcoatRoughnessMap` properties. This node property allows to overwrite the default
     * and define the clearcoat roughness with a node instead.
     *
     * If you don't want to overwrite the clearcoat roughness but modify the existing
     * value instead, use {@link materialClearcoatRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    clearcoatRoughnessNode: Node<any> | null;
    /**
     * The diffuse roughness of physical materials is by default inferred from the
     * `diffuseRoughness` and `diffuseRoughnessMap` properties. This node property allows to overwrite the
     * default and define the diffuse roughness with a node instead.
     *
     * If you don't want to overwrite the diffuse roughness but modify the existing
     * value instead, use {@link materialDiffuseRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    diffuseRoughnessNode: Node<any> | null;
    /**
     * The clearcoat normal of physical materials is by default inferred from the `clearcoatNormalMap`
     * property. This node property allows to overwrite the default
     * and define the clearcoat normal with a node instead.
     *
     * If you don't want to overwrite the clearcoat normal but modify the existing
     * value instead, use {@link materialClearcoatNormal}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    clearcoatNormalNode: Node<any> | null;
    /**
     * The sheen of physical materials is by default inferred from the `sheen`, `sheenColor`
     * and `sheenColorMap` properties. This node property allows to overwrite the default
     * and define the sheen with a node instead.
     *
     * If you don't want to overwrite the sheen but modify the existing
     * value instead, use {@link materialSheen}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    sheenNode: Node<any> | null;
    /**
     * The sheen roughness of physical materials is by default inferred from the `sheenRoughness` and
     * `sheenRoughnessMap` properties. This node property allows to overwrite the default
     * and define the sheen roughness with a node instead.
     *
     * If you don't want to overwrite the sheen roughness but modify the existing
     * value instead, use {@link materialSheenRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    sheenRoughnessNode: Node<any> | null;
    /**
     * The iridescence of physical materials is by default inferred from the `iridescence`
     * property. This node property allows to overwrite the default
     * and define the iridescence with a node instead.
     *
     * If you don't want to overwrite the iridescence but modify the existing
     * value instead, use {@link materialIridescence}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iridescenceNode: Node<any> | null;
    /**
     * The iridescence IOR of physical materials is by default inferred from the `iridescenceIOR`
     * property. This node property allows to overwrite the default
     * and define the iridescence IOR with a node instead.
     *
     * If you don't want to overwrite the iridescence IOR but modify the existing
     * value instead, use {@link materialIridescenceIOR}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iridescenceIORNode: Node<any> | null;
    /**
     * The iridescence thickness of physical materials is by default inferred from the `iridescenceThicknessRange`
     * and `iridescenceThicknessMap` properties. This node property allows to overwrite the default
     * and define the iridescence thickness with a node instead.
     *
     * If you don't want to overwrite the iridescence thickness but modify the existing
     * value instead, use {@link materialIridescenceThickness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iridescenceThicknessNode: Node<any> | null;
    /**
     * The specular intensity of physical materials is by default inferred from the `specularIntensity`
     * and `specularIntensityMap` properties. This node property allows to overwrite the default
     * and define the specular intensity with a node instead.
     *
     * If you don't want to overwrite the specular intensity but modify the existing
     * value instead, use {@link materialSpecularIntensity}.
     *
     * @type {?Node<float>}
     * @default null
     */
    specularIntensityNode: Node<any> | null;
    /**
     * The specular color of physical materials is by default inferred from the `specularColor`
     * and `specularColorMap` properties. This node property allows to overwrite the default
     * and define the specular color with a node instead.
     *
     * If you don't want to overwrite the specular color but modify the existing
     * value instead, use {@link materialSpecularColor}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    specularColorNode: Node<any> | null;
    /**
     * The ior of physical materials is by default inferred from the `ior`
     * property. This node property allows to overwrite the default
     * and define the ior with a node instead.
     *
     * If you don't want to overwrite the ior but modify the existing
     * value instead, use {@link materialIOR}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iorNode: Node<any> | null;
    /**
     * The transmission of physical materials is by default inferred from the `transmission` and
     * `transmissionMap` properties. This node property allows to overwrite the default
     * and define the transmission with a node instead.
     *
     * If you don't want to overwrite the transmission but modify the existing
     * value instead, use {@link materialTransmission}.
     *
     * @type {?Node<float>}
     * @default null
     */
    transmissionNode: Node<any> | null;
    /**
     * The thickness of physical materials is by default inferred from the `thickness` and
     * `thicknessMap` properties. This node property allows to overwrite the default
     * and define the thickness with a node instead.
     *
     * If you don't want to overwrite the thickness but modify the existing
     * value instead, use {@link materialThickness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    thicknessNode: Node<any> | null;
    /**
     * The attenuation distance of physical materials is by default inferred from the
     * `attenuationDistance` property. This node property allows to overwrite the default
     * and define the attenuation distance with a node instead.
     *
     * If you don't want to overwrite the attenuation distance but modify the existing
     * value instead, use {@link materialAttenuationDistance}.
     *
     * @type {?Node<float>}
     * @default null
     */
    attenuationDistanceNode: Node<any> | null;
    /**
     * The attenuation color of physical materials is by default inferred from the
     * `attenuationColor` property. This node property allows to overwrite the default
     * and define the attenuation color with a node instead.
     *
     * If you don't want to overwrite the attenuation color but modify the existing
     * value instead, use {@link materialAttenuationColor}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    attenuationColorNode: Node<any> | null;
    /**
     * The dispersion of physical materials is by default inferred from the
     * `dispersion` property. This node property allows to overwrite the default
     * and define the dispersion with a node instead.
     *
     * If you don't want to overwrite the dispersion but modify the existing
     * value instead, use {@link materialDispersion}.
     *
     * @type {?Node<float>}
     * @default null
     */
    dispersionNode: Node<any> | null;
    /**
     * The retroreflective strength of physical materials is by default inferred from the
     * `retroreflectivity` property. This node property allows to overwrite the default
     * and define the retroreflective strength with a node instead.
     *
     * If you don't want to overwrite the retroreflective strength but modify the existing
     * value instead, use {@link materialRetroreflectivity}.
     *
     * @type {?Node<float>}
     * @default null
     */
    retroreflectivityNode: Node<any> | null;
    /**
     * The anisotropy of physical materials is by default inferred from the
     * `anisotropy` property. This node property allows to overwrite the default
     * and define the anisotropy with a node instead.
     *
     * If you don't want to overwrite the anisotropy but modify the existing
     * value instead, use {@link materialAnisotropy}.
     *
     * @type {?Node<float>}
     * @default null
     */
    anisotropyNode: Node<any> | null;
    /**
     * Whether the lighting model should use clearcoat or not.
     *
     * @type {boolean}
     * @default true
     */
    get useClearcoat(): boolean;
    /**
     * Whether the lighting model should use EON rough diffuse reflection or not.
     *
     * @type {boolean}
     * @default false
     */
    get useDiffuseRoughness(): boolean;
    /**
     * Whether the lighting model should use iridescence or not.
     *
     * @type {boolean}
     * @default true
     */
    get useIridescence(): boolean;
    /**
     * Whether the lighting model should use sheen or not.
     *
     * @type {boolean}
     * @default true
     */
    get useSheen(): boolean;
    /**
     * Whether the lighting model should use anisotropy or not.
     *
     * @type {boolean}
     * @default true
     */
    get useAnisotropy(): boolean;
    /**
     * Whether the lighting model should use transmission or not.
     *
     * @type {boolean}
     * @default true
     */
    get useTransmission(): boolean;
    /**
     * Whether the lighting model should use dispersion or not.
     *
     * @type {boolean}
     * @default true
     */
    get useDispersion(): boolean;
    /**
     * Whether the lighting model should use retroreflection or not.
     *
     * @type {boolean}
     * @default true
     */
    get useRetroreflection(): boolean;
    /**
     * Setups the physical specific node variables.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupVariants(builder: NodeBuilder): void;
    /**
     * Setups the clearcoat normal node.
     *
     * @return {Node<vec3>} The clearcoat normal.
     */
    setupClearcoatNormal(): Node<any>;
    setup(builder: any): void;
}
/**
 * This node material is an experimental extension of {@link MeshPhysicalNodeMaterial}
 * that implements a Subsurface scattering (SSS) term.
 *
 * @augments MeshPhysicalNodeMaterial
 */
export class MeshSSSNodeMaterial extends MeshPhysicalNodeMaterial {
    /**
     * Represents the thickness color.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    thicknessColorNode: Node<any> | null;
    /**
     * Represents the distortion factor.
     *
     * @type {?Node<float>}
     */
    thicknessDistortionNode: Node<any> | null;
    /**
     * Represents the thickness ambient factor.
     *
     * @type {?Node<float>}
     */
    thicknessAmbientNode: Node<any> | null;
    /**
     * Represents the thickness attenuation.
     *
     * @type {?Node<float>}
     */
    thicknessAttenuationNode: Node<any> | null;
    /**
     * Represents the thickness power.
     *
     * @type {?Node<float>}
     */
    thicknessPowerNode: Node<any> | null;
    /**
     * Represents the thickness scale.
     *
     * @type {?Node<float>}
     */
    thicknessScaleNode: Node<any> | null;
    /**
     * Whether the lighting model should use SSS or not.
     *
     * @type {boolean}
     * @default true
     */
    get useSSS(): boolean;
    /**
     * Setups the lighting model.
     *
     * @return {SSSLightingModel} The lighting model.
     */
    setupLightingModel(): SSSLightingModel;
}
import { MeshStandardMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshStandardMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshStandardNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh standard node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshStandardNodeMaterial: boolean;
    /**
     * The emissive color of standard materials is by default inferred from the `emissive`,
     * `emissiveIntensity` and `emissiveMap` properties. This node property allows to
     * overwrite the default and define the emissive color with a node instead.
     *
     * If you don't want to overwrite the emissive color but modify the existing
     * value instead, use {@link materialEmissive}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    emissiveNode: Node<any> | null;
    /**
     * The metalness of standard materials is by default inferred from the `metalness`,
     * and `metalnessMap` properties. This node property allows to
     * overwrite the default and define the metalness with a node instead.
     *
     * If you don't want to overwrite the metalness but modify the existing
     * value instead, use {@link materialMetalness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    metalnessNode: Node<any> | null;
    /**
     * The roughness of standard materials is by default inferred from the `roughness`,
     * and `roughnessMap` properties. This node property allows to
     * overwrite the default and define the roughness with a node instead.
     *
     * If you don't want to overwrite the roughness but modify the existing
     * value instead, use {@link materialRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    roughnessNode: Node<any> | null;
    /**
     * Overwritten since this type of material uses {@link EnvironmentNode}
     * to implement the PBR (PMREM based) environment mapping. Besides, the
     * method honors `Scene.environment`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?EnvironmentNode<vec3>} The environment node.
     */
    setupEnvironment(builder: NodeBuilder): EnvironmentNode<any> | null;
    /**
     * Setups the lighting model.
     *
     * @return {PhysicalLightingModel} The lighting model.
     */
    setupLightingModel(): PhysicalLightingModel;
    /**
     * Setups the specular related node variables.
     */
    setupSpecular(): void;
}
import { MeshToonMaterial } from './three.core.js';
/**
 * Node material version of {@link MeshToonMaterial}.
 *
 * @augments NodeMaterial
 */
export class MeshToonNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new mesh toon node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshToonNodeMaterial: boolean;
    /**
     * Setups the lighting model.
     *
     * @return {ToonLightingModel} The lighting model.
     */
    setupLightingModel(): ToonLightingModel;
}
import { MinEquation } from './three.core.js';
import { MirroredRepeatWrapping } from './three.core.js';
import { MixOperation } from './three.core.js';
import { MultiplyBlending } from './three.core.js';
import { MultiplyOperation } from './three.core.js';
import { NearestFilter } from './three.core.js';
import { NearestMipmapLinearFilter } from './three.core.js';
import { NearestMipmapNearestFilter } from './three.core.js';
import { NeutralToneMapping } from './three.core.js';
import { NeverCompare } from './three.core.js';
import { NeverDepth } from './three.core.js';
import { NeverStencilFunc } from './three.core.js';
import { NoBlending } from './three.core.js';
import { NoColorSpace } from './three.core.js';
import { NoToneMapping } from './three.core.js';
import { Node } from './three.tsl.js';
import { NodeAccess } from './three.tsl.js';
/**
 * {@link NodeBuilder} is going to create instances of this class during the build process
 * of nodes. They represent the final shader attributes that are going to be generated
 * by the builder. Arrays of node attributes is maintained in {@link NodeBuilder#attributes}
 * and {@link NodeBuilder#bufferAttributes} for this purpose.
 */
export class NodeAttribute {
    /**
     * Constructs a new node attribute.
     *
     * @param {string} name - The name of the attribute.
     * @param {string} type - The type of the attribute.
     * @param {?Node} node - An optional reference to the node.
     */
    constructor(name: string, type: string, node?: Node | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeAttribute: boolean;
    /**
     * The name of the attribute.
     *
     * @type {string}
     */
    name: string;
    /**
     * The type of the attribute.
     *
     * @type {string}
     */
    type: string;
    /**
     * An optional reference to the node.
     *
     * @type {?Node}
     * @default null
     */
    node: Node | null;
}
/**
 * Base class for builders which generate a shader program based
 * on a 3D object and its node material definition.
 */
export class NodeBuilder {
    /**
     * Constructs a new node builder.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Renderer} renderer - The current renderer.
     * @param {NodeParser} parser - A reference to a node parser.
     */
    constructor(object: Object3D, renderer: Renderer, parser: NodeParser);
    /**
     * The 3D object.
     *
     * @type {Object3D}
     */
    object: Object3D;
    /**
     * The material of the 3D object.
     *
     * @type {?Material}
     */
    material: Material | null;
    /**
     * The geometry of the 3D object.
     *
     * @type {?BufferGeometry}
     */
    geometry: BufferGeometry | null;
    /**
     * The compute node, if building for compute.
     *
     * @type {?ComputeNode}
     * @default null
     */
    compute: ComputeNode | null;
    /**
     * The current renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * A reference to a node parser.
     *
     * @type {NodeParser}
     */
    parser: NodeParser;
    /**
     * The scene the 3D object belongs to.
     *
     * @type {?Scene}
     * @default null
     */
    scene: Scene | null;
    /**
     * The camera the 3D object is rendered with.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    /**
     * A list of all nodes the builder is processing
     * for this 3D object.
     *
     * @type {Set<Node>}
     */
    nodes: Set<Node>;
    /**
     * A list of all nodes the builder is processing in sequential order.
     *
     * This is used to determine the update order of nodes, which is important for
     * {@link NodeUpdateType#UPDATE_BEFORE} and {@link NodeUpdateType#UPDATE_AFTER}.
     *
     * @type {Set<Node>}
     */
    sequentialNodes: Set<Node>;
    /**
     * A list of all nodes which {@link Node#update} method should be executed.
     *
     * @type {Array<Node>}
     */
    updateNodes: Array<Node>;
    /**
     * A list of all nodes which {@link Node#updateBefore} method should be executed.
     *
     * @type {Array<Node>}
     */
    updateBeforeNodes: Array<Node>;
    /**
     * A list of all nodes which {@link Node#updateAfter} method should be executed.
     *
     * @type {Array<Node>}
     */
    updateAfterNodes: Array<Node>;
    /**
     * A dictionary that assigns each node to a unique hash.
     *
     * @type {Object<number,Node>}
     */
    hashNodes: {
        [x: number]: Node;
    };
    /**
     * A reference to a node material observer.
     *
     * @type {?NodeMaterialObserver}
     * @default null
     */
    observer: NodeMaterialObserver | null;
    /**
     * A reference to the current lights node.
     *
     * @type {?LightsNode}
     * @default null
     */
    lightsNode: LightsNode | null;
    /**
     * A reference to the current environment node.
     *
     * @type {?Node}
     * @default null
     */
    environmentNode: Node | null;
    /**
     * A reference to the current fog node.
     *
     * @type {?Node}
     * @default null
     */
    fogNode: Node | null;
    /**
     * The current clipping context.
     *
     * @type {?ClippingContext}
     */
    clippingContext: ClippingContext | null;
    /**
     * Whether the built material uses hardware clipping or not.
     *
     * @type {boolean}
     * @default false
     */
    hardwareClipping: boolean;
    /**
     * The generated vertex shader.
     *
     * @type {?string}
     */
    vertexShader: string | null;
    /**
     * The generated fragment shader.
     *
     * @type {?string}
     */
    fragmentShader: string | null;
    /**
     * The generated compute shader.
     *
     * @type {?string}
     */
    computeShader: string | null;
    /**
     * Nodes used in the primary flow of code generation.
     *
     * @type {Object<string,Array<Node>>}
     */
    flowNodes: {
        [x: string]: Node[];
    };
    /**
     * Nodes code from `.flowNodes`.
     *
     * @type {Object<string,string>}
     */
    flowCode: {
        [x: string]: string;
    };
    /**
     * This dictionary holds the node uniforms of the builder.
     * The uniforms are maintained in an array for each shader stage.
     *
     * @type {Object}
     */
    uniforms: Object;
    /**
     * This dictionary holds the output structs of the builder.
     * The structs are maintained in an array for each shader stage.
     *
     * @type {Object}
     */
    structs: Object;
    /**
     * This dictionary holds the types of the builder.
     *
     * @type {Object}
     */
    types: Object;
    /**
     * This dictionary holds the bindings for each shader stage.
     *
     * @type {Object}
     */
    bindings: Object;
    /**
     * This dictionary maintains the binding indices per bind group.
     *
     * @type {Object}
     */
    bindingsIndexes: Object;
    /**
     * Reference to the array of bind groups.
     *
     * @type {?Array<BindGroup>}
     */
    bindGroups: Array<BindGroup> | null;
    /**
     * This array holds the node attributes of this builder
     * created via {@link AttributeNode}.
     *
     * @type {Array<NodeAttribute>}
     */
    attributes: Array<NodeAttribute>;
    /**
     * This array holds the node attributes of this builder
     * created via {@link BufferAttributeNode}.
     *
     * @type {Array<NodeAttribute>}
     */
    bufferAttributes: Array<NodeAttribute>;
    /**
     * This array holds the node varyings of this builder.
     *
     * @type {Array<NodeVarying>}
     */
    varyings: Array<NodeVarying>;
    /**
     * This dictionary holds the (native) node codes of this builder.
     * The codes are maintained in an array for each shader stage.
     *
     * @type {Object<string,Array<NodeCode>>}
     */
    codes: {
        [x: string]: NodeCode[];
    };
    /**
     * This dictionary holds the node variables of this builder.
     * The variables are maintained in an array for each shader stage.
     * This dictionary is also used to count the number of variables
     * according to their type (const, vars).
     *
     * @type {Object<string,Array<NodeVar>|number>}
     */
    vars: {
        [x: string]: number | NodeVar[];
    };
    /**
     * This dictionary holds the declarations for each shader stage.
     *
     * @type {Object}
     */
    declarations: Object;
    /**
     * Current code flow.
     * All code generated in this stack will be stored in `.flow`.
     *
     * @type {{code: string}}
     */
    flow: {
        code: string;
    };
    /**
     * A chain of nodes.
     * Used to check recursive calls in node-graph.
     *
     * @type {Array<Node>}
     */
    chaining: Array<Node>;
    /**
     * The current stack.
     * This reflects the current process in the code block hierarchy,
     * it is useful to know if the current process is inside a conditional for example.
     *
     * @type {StackNode}
     */
    stack: StackNode;
    /**
     * List of stack nodes.
     * The current stack hierarchy is stored in an array.
     *
     * @type {Array<StackNode>}
     */
    stacks: Array<StackNode>;
    /**
     * A tab value. Used for shader string generation.
     *
     * @type {string}
     * @default '\t'
     */
    tab: string;
    /**
     * Reference to the current function node.
     *
     * @type {?FunctionNode}
     * @default null
     */
    currentFunctionNode: FunctionNode | null;
    /**
     * The builder's context.
     *
     * @type {Object}
     */
    context: Object;
    /**
     * The builder's cache.
     *
     * @type {NodeCache}
     */
    cache: NodeCache;
    /**
     * Since the {@link NodeBuilder#cache} might be temporarily
     * overwritten by other caches, this member retains the reference
     * to the builder's own cache.
     *
     * @type {NodeCache}
     * @default this.cache
     */
    globalCache: NodeCache;
    flowsData: WeakMap<object, any>;
    /**
     * The current shader stage.
     *
     * @type {?('vertex'|'fragment'|'compute'|'any')}
     */
    shaderStage: ("vertex" | "fragment" | "compute" | "any") | null;
    /**
     * The current build stage.
     *
     * @type {?('setup'|'analyze'|'generate')}
     */
    buildStage: ("setup" | "analyze" | "generate") | null;
    /**
     * The sub-build layers.
     *
     * @type {Array<SubBuildNode>}
     * @default []
     */
    subBuildLayers: Array<SubBuildNode>;
    /**
     * The active stack nodes.
     *
     * @type {Array<StackNode>}
     */
    activeStacks: Array<StackNode>;
    /**
     * The current sub-build TSL function(Fn).
     *
     * @type {?string}
     * @default null
     */
    subBuildFn: string | null;
    /**
     * The current TSL function(Fn) call node.
     *
     * @type {?Node}
     * @default null
     */
    fnCall: Node | null;
    /**
     * The block of generated code the builder is in, e.g. a loop body or a conditional branch.
     * Every generated block is a new object linked to its parent, `null` outside of any block.
     *
     * @type {?{parent: ?Object}}
     * @default null
     */
    flowBlock: {
        parent: Object | null;
    } | null;
    /**
     * Whether the material is using flat shading or not.
     *
     * @returns {boolean} Whether the material is using flat shading or not.
     */
    isFlatShading(): boolean;
    /**
     * Whether the material is opaque or not.
     *
     * @return {boolean} Whether the material is opaque or not.
     */
    isOpaque(): boolean;
    /**
     * Factory method for creating an instance of {@link RenderTarget} with the given
     * dimensions and options.
     *
     * @param {number} width - The width of the render target.
     * @param {number} height - The height of the render target.
     * @param {Object} options - The options of the render target.
     * @return {RenderTarget} The render target.
     */
    createRenderTarget(width: number, height: number, options: Object): RenderTarget;
    /**
     * Factory method for creating an instance of {@link CubeRenderTarget} with the given
     * dimensions and options.
     *
     * @param {number} size - The size of the cube render target.
     * @param {Object} options - The options of the cube render target.
     * @return {CubeRenderTarget} The cube render target.
     */
    createCubeRenderTarget(size: number, options: Object): CubeRenderTarget;
    /**
     * Whether the given node is included in the internal array of nodes or not.
     *
     * @param {Node} node - The node to test.
     * @return {boolean} Whether the given node is included in the internal array of nodes or not.
     */
    includes(node: Node): boolean;
    /**
     * Returns the type of the color output based on the renderer's render target.
     *
     * @param {number} [index=0] - The index of the render target texture.
     * @return {string} The type.
     */
    getOutputType(index?: number): string;
    /**
     * Returns the output struct name which is required by
     * {@link OutputStructNode}.
     *
     * @abstract
     * @return {string} The name of the output struct.
     */
    getOutputStructName(): string;
    /**
     * Returns a bind group for the given group name and binding.
     *
     * @private
     * @param {string} groupName - The group name.
     * @param {Array<NodeUniformsGroup>} bindings - List of bindings.
     * @return {BindGroup} The bind group
     */
    private _getBindGroup;
    /**
     * Returns an array of node uniform groups for the given group name and shader stage.
     *
     * @param {string} groupName - The group name.
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {Array<NodeUniformsGroup>} The array of node uniform groups.
     */
    getBindGroupArray(groupName: string, shaderStage: ("vertex" | "fragment" | "compute" | "any")): Array<NodeUniformsGroup>;
    /**
     * Returns a list bindings of all shader stages separated by groups.
     *
     * @return {Array<BindGroup>} The list of bindings.
     */
    getBindings(): Array<BindGroup>;
    /**
     * Sorts the bind groups and updates {@link NodeBuilder#bindingsIndexes}.
     */
    sortBindingGroups(): void;
    /**
     * The builder maintains each node in a hash-based dictionary.
     * This method sets the given node (value) with the given hash (key) into this dictionary.
     *
     * @param {Node} node - The node to add.
     * @param {number} hash - The hash of the node.
     */
    setHashNode(node: Node, hash: number): void;
    /**
     * Adds a node to this builder.
     *
     * @param {Node} node - The node to add.
     */
    addNode(node: Node): void;
    /**
     * It is used to add Nodes that will be used as FRAME and RENDER events,
     * and need to follow a certain sequence in the calls to work correctly.
     * This function should be called after 'setup()' in the 'build()' process to ensure that the child nodes are processed first.
     *
     * @param {Node} node - The node to add.
     */
    addSequentialNode(node: Node): void;
    /**
     * Checks the update types of nodes
     */
    buildUpdateNodes(): void;
    /**
     * A reference the current node which is the
     * last node in the chain of nodes.
     *
     * @type {Node}
     */
    get currentNode(): Node;
    /**
     * A reference to the render pipeline.
     *
     * @type {RenderPipeline}
     */
    get renderPipeline(): RenderPipeline;
    /**
     * Whether the given texture is filtered or not.
     *
     * @param {Texture} texture - The texture to check.
     * @return {boolean} Whether the given texture is filtered or not.
     */
    isFilteredTexture(texture: Texture): boolean;
    /**
     * Returns the maximum number of bytes available for uniform buffers.
     *
     * @return {number} The maximum number of bytes available for uniform buffers.
     */
    getUniformBufferLimit(): number;
    /**
     * Adds the given node to the internal node chain.
     * This is used to check recursive calls in node-graph.
     *
     * @param {Node} node - The node to add.
     */
    addChain(node: Node): void;
    /**
     * Removes the given node from the internal node chain.
     *
     * @param {Node} node - The node to remove.
     */
    removeChain(node: Node): void;
    /**
     * Returns the native shader method name for a given generic name. E.g.
     * the method name `textureDimensions` matches the WGSL name but must be
     * resolved to `textureSize` in GLSL.
     *
     * @abstract
     * @param {string} method - The method name to resolve.
     * @return {string} The resolved method name.
     */
    getMethod(method: string): string;
    /**
     * Returns the native snippet for a ternary operation. E.g. GLSL would output
     * a ternary op as `cond ? x : y` whereas WGSL would output it as `select(y, x, cond)`
     *
     * @abstract
     * @param {string} condSnippet - The condition determining which expression gets resolved.
     * @param {string} ifSnippet - The expression to resolve to if the condition is true.
     * @param {string} elseSnippet - The expression to resolve to if the condition is false.
     * @return {string} The resolved method name.
     */
    getTernary(): string;
    /**
     * Returns the native snippet for a per-component vector select. The default
     * implementation uses {@link NodeBuilder#getTernary}; renderers can
     * override this when their ternary operation does not accept vectors.
     *
     * @param {string} condSnippet - The per-component boolean (`bvecN`) condition.
     * @param {string} ifSnippet - The vector expression selected where `condSnippet` is `true`.
     * @param {string} elseSnippet - The vector expression selected where `condSnippet` is `false`.
     * @param {string} type - The (vector) type of `ifSnippet`/`elseSnippet`.
     * @return {string} The resolved method name.
     */
    getVectorSelect(condSnippet: string, ifSnippet: string, elseSnippet: string): string;
    /**
     * Returns a node for the given hash, see {@link NodeBuilder#setHashNode}.
     *
     * @param {number} hash - The hash of the node.
     * @return {Node} The found node.
     */
    getNodeFromHash(hash: number): Node;
    /**
     * Adds the Node to a target flow so that it can generate code in the 'generate' process.
     *
     * @param {('vertex'|'fragment'|'compute')} shaderStage - The shader stage.
     * @param {Node} node - The node to add.
     * @return {Node} The node.
     */
    addFlow(shaderStage: ("vertex" | "fragment" | "compute"), node: Node): Node;
    /**
     * Sets builder's context.
     *
     * @param {Object} context - The context to set.
     */
    setContext(context: Object): void;
    /**
     * Returns the builder's current context.
     *
     * @return {Object} The builder's current context.
     */
    getContext(): Object;
    /**
     * Adds context data to the builder's current context.
     *
     * @param {Object} context - The context to add.
     * @return {Object} The previous context.
     */
    addContext(context: Object): Object;
    /**
     * Gets a context used in shader construction that can be shared across different materials.
     * This is necessary since the renderer cache can reuse shaders generated in one material and use them in another.
     *
     * @return {Object} The builder's current context without material.
     */
    getSharedContext(): Object;
    /**
     * Sets builder's cache.
     *
     * @param {NodeCache} cache - The cache to set.
     */
    setCache(cache: NodeCache): void;
    /**
     * Returns the builder's current cache.
     *
     * @return {NodeCache} The builder's current cache.
     */
    getCache(): NodeCache;
    /**
     * Returns a cache for the given node.
     *
     * @param {Node} node - The node.
     * @param {boolean} [parent=true] - Whether this node refers to a shared parent cache or not.
     * @return {NodeCache} The cache.
     */
    getCacheFromNode(node: Node, parent?: boolean): NodeCache;
    /**
     * Whether the requested feature is available or not.
     *
     * @abstract
     * @param {string} name - The requested feature.
     * @return {boolean} Whether the requested feature is supported or not.
     */
    isAvailable(): boolean;
    /**
     * Returns the vertexIndex input variable as a native shader string.
     *
     * @abstract
     * @return {string} The instanceIndex shader string.
     */
    getVertexIndex(): string;
    /**
     * Contextually returns either the vertex stage instance index builtin
     * or the linearized index of an compute invocation within a grid of workgroups.
     *
     * @abstract
     * @return {string} The instanceIndex shader string.
     */
    getInstanceIndex(): string;
    /**
     * Returns the drawIndex input variable as a native shader string.
     * Only relevant for WebGL and its `WEBGL_multi_draw` extension.
     *
     * @abstract
     * @return {?string} The drawIndex shader string.
     */
    getDrawIndex(): string | null;
    /**
     * Returns the frontFacing input variable as a native shader string.
     *
     * @abstract
     * @return {string} The frontFacing shader string.
     */
    getFrontFacing(): string;
    /**
     * Returns the fragCoord input variable as a native shader string.
     *
     * @abstract
     * @return {string} The fragCoord shader string.
     */
    getFragCoord(): string;
    /**
     * Returns a builtin representing the size of a subgroup within the current shader.
     *
     * @abstract
     * @return {string} The subgroup size shader string.
     */
    getSubgroupSize(): string;
    /**
     * Returns a builtin representing the index of an invocation within its subgroup.
     *
     * @abstract
     * @return {string} The invocation subgroup index shader string.
     */
    getInvocationSubgroupIndex(): string;
    /**
     * Returns a builtin representing the index of the current invocation's subgroup within its workgroup.
     *
     * @abstract
     * @return {string} The subgroup index shader string.
     */
    getSubgroupIndex(): string;
    /**
     * Enables subgroups.
     *
     * @abstract
     */
    enableSubGroups(): void;
    /**
     * Enables 16 bit floats.
     *
     * @abstract
     */
    enableShaderF16(): void;
    /**
     * Enables dual source blending.
     *
     * @abstract
     */
    enableDualSourceBlending(): void;
    /**
     * Whether to flip texture data along its vertical axis or not. WebGL needs
     * this method evaluate to `true`, WebGPU to `false`.
     *
     * @abstract
     * @return {boolean} Whether to flip texture data along its vertical axis or not.
     */
    isFlipY(): boolean;
    /**
     * Returns whether the builder is currently in an assignment context.
     *
     * @return {boolean} Whether the builder is in an assignment context.
     */
    isContextAssign(): boolean;
    /**
     * Calling this method increases the usage count for the given node by one.
     *
     * @param {Node} node - The node to increase the usage count for.
     * @return {number} The updated usage count.
     */
    increaseUsage(node: Node): number;
    /**
     * Returns whether the given node has been written to in any shader stage.
     *
     * @param {Node} node - The node to check.
     * @return {boolean} Whether the node has been written to.
     */
    hasWriteUsage(node: Node): boolean;
    /**
     * Generates a texture sample shader string for the given texture data.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The texture property name.
     * @param {string} uvSnippet - Snippet defining the texture coordinates.
     * @return {string} The generated shader string.
     */
    generateTexture(): string;
    /**
     * Generates a texture LOD shader string for the given texture data.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The texture property name.
     * @param {string} uvSnippet - Snippet defining the texture coordinates.
     * @param {?string} depthSnippet - Snippet defining the 0-based texture array index to sample.
     * @param {string} levelSnippet - Snippet defining the mip level.
     * @return {string} The generated shader string.
     */
    generateTextureLod(): string;
    /**
     * Generates a texture size shader string for the given texture data.
     *
     * @abstract
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The texture property name.
     * @param {string} levelSnippet - Snippet defining the mip level.
     * @return {string} The generated shader string.
     */
    generateTextureSize(): string;
    /**
     * Generates the array declaration string.
     *
     * @param {string} type - The type.
     * @param {?number} [count] - The count.
     * @return {string} The generated value as a shader string.
     */
    generateArrayDeclaration(type: string, count?: number | null): string;
    /**
     * Generates the array shader string for the given type and value.
     *
     * @param {string} type - The type.
     * @param {?number} [count] - The count.
     * @param {?Array<Node>} [values=null] - The default values.
     * @return {string} The generated value as a shader string.
     */
    generateArray(type: string, count?: number | null, values?: Array<Node> | null): string;
    /**
     * Generates the struct shader string.
     *
     * @param {string} type - The type.
     * @param {Array<Object>} [membersLayout] - The count.
     * @param {?Array<Node>} [values=null] - The default values.
     * @return {string} The generated value as a shader string.
     */
    generateStruct(type: string, membersLayout?: Array<Object>, values?: Array<Node> | null): string;
    /**
     * Generates the shader string for the given type and value.
     *
     * @param {string} type - The type.
     * @param {?any} [value=null] - The value.
     * @return {string} The generated value as a shader string.
     */
    generateConst(type: string, value?: any | null): string;
    /**
     * It might be necessary to convert certain data types to different ones
     * so this method can be used to hide the conversion.
     *
     * @param {string} type - The type.
     * @return {string} The updated type.
     */
    getType(type: string): string;
    /**
     * Whether the given attribute name is defined in the geometry or not.
     *
     * @param {string} name - The attribute name.
     * @return {boolean} Whether the given attribute name is defined in the geometry.
     */
    hasGeometryAttribute(name: string): boolean;
    /**
     * Returns a node attribute for the given name and type.
     *
     * @param {string} name - The attribute's name.
     * @param {string} type - The attribute's type.
     * @return {NodeAttribute} The node attribute.
     */
    getAttribute(name: string, type: string): NodeAttribute;
    /**
     * Returns for the given node and shader stage the property name for the shader.
     *
     * @param {Node} node - The node.
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {string} The property name.
     */
    getPropertyName(node: Node): string;
    /**
     * Whether the given type is a scalar type or not.
     *
     * @param {string} type - The type to check.
     * @return {boolean} Whether the given type is a scalar type or not.
     */
    isScalar(type: string): boolean;
    /**
     * Returns whether the given name is a reserved keyword of the backend's
     * shading language. Backends override this method to provide their
     * language-specific keywords.
     *
     * @param {string} name - The name to test.
     * @return {boolean} Whether the name is a reserved keyword or not.
     */
    isReservedKeyword(): boolean;
    /**
     * Whether the given type is a vector type or not.
     *
     * @param {string} type - The type to check.
     * @return {boolean} Whether the given type is a vector type or not.
     */
    isVector(type: string): boolean;
    /**
     * Whether the given type is a matrix type or not.
     *
     * @param {string} type - The type to check.
     * @return {boolean} Whether the given type is a matrix type or not.
     */
    isMatrix(type: string): boolean;
    /**
     * Whether the given type is a reference type or not.
     *
     * @param {string} type - The type to check.
     * @return {boolean} Whether the given type is a reference type or not.
     */
    isReference(type: string): boolean;
    /**
     * Checks if the given texture requires a manual conversion to the working color space.
     *
     * @abstract
     * @param {Texture} texture - The texture to check.
     * @return {boolean} Whether the given texture requires a conversion to working color space or not.
     */
    needsToWorkingColorSpace(): boolean;
    /**
     * Returns the component type of a given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {string} The component type.
     */
    getComponentTypeFromTexture(texture: Texture): string;
    /**
     * Returns the element type for a given type.
     *
     * @param {string} type - The type.
     * @return {string} The element type.
     */
    getElementType(type: string): string;
    /**
     * Returns the component type for a given type.
     *
     * @param {string} type - The type.
     * @return {string} The component type.
     */
    getComponentType(type: string): string;
    /**
     * Returns the vector type for a given type.
     *
     * @param {string} type - The type.
     * @return {string} The vector type.
     */
    getVectorType(type: string): string;
    /**
     * Returns the data type for the given the length and component type.
     *
     * @param {number} length - The length.
     * @param {string} [componentType='float'] - The component type.
     * @return {string} The type.
     */
    getTypeFromLength(length: number, componentType?: string): string;
    /**
     * Returns the type for a given typed array.
     *
     * @param {TypedArray} array - The typed array.
     * @return {string} The type.
     */
    getTypeFromArray(array: TypedArray): string;
    /**
     * Returns the type is an integer type.
     *
     * @param {string} type - The type.
     * @return {boolean} Whether the type is an integer type or not.
     */
    isInteger(type: string): boolean;
    /**
     * Returns the type for a given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     * @return {string} The type.
     */
    getTypeFromAttribute(attribute: BufferAttribute): string;
    /**
     * Returns the length for the given data type.
     *
     * @param {string} type - The data type.
     * @return {number} The length.
     */
    getTypeLength(type: string): number;
    _getTypeLength(type: any): number;
    /**
     * Returns the vector type for a given matrix type.
     *
     * @param {string} type - The matrix type.
     * @return {string} The vector type.
     */
    getVectorFromMatrix(type: string): string;
    /**
     * For a given type this method changes the component type to the
     * given value. E.g. `vec4` should be changed to the new component type
     * `uint` which results in `uvec4`.
     *
     * @param {string} type - The type.
     * @param {string} newComponentType - The new component type.
     * @return {string} The new type.
     */
    changeComponentType(type: string, newComponentType: string): string;
    /**
     * Returns the common component type of the input nodes. Explicit types are
     * promoted first, then weak constants adopt that type, being truncated like other
     * integer constants. Only weak constants out of the integer range promote it.
     * Inputs consisting only of weak constants default to float.
     *
     * @param {...?Node} nodes - The input nodes.
     * @return {string} The promoted component type.
     */
    getPromotedComponentType(...nodes: (Node | null)[]): string;
    /**
     * Returns the integer type pendant for the given type.
     *
     * @param {string} type - The type.
     * @return {string} The integer type.
     */
    getIntegerType(type: string): string;
    /**
     * Adds an active stack to the internal stack.
     *
     * @param {StackNode} stack - The stack node to add.
     */
    setActiveStack(stack: StackNode): void;
    /**
     * Removes the active stack from the internal stack.
     *
     * @param {StackNode} stack - The stack node to remove.
     */
    removeActiveStack(stack: StackNode): void;
    /**
     * Returns the active stack.
     *
     * @return {StackNode} The active stack.
     */
    getActiveStack(): StackNode;
    /**
     * Returns the base stack.
     *
     * @return {StackNode} The base stack.
     */
    getBaseStack(): StackNode;
    /**
     * Adds a stack node to the internal stack.
     *
     * @return {StackNode} The added stack node.
     */
    addStack(): StackNode;
    /**
     * Removes the last stack node from the internal stack.
     *
     * @return {StackNode} The removed stack node.
     */
    removeStack(): StackNode;
    /**
     * The builder maintains (cached) data for each node during the building process. This method
     * can be used to get these data for a specific shader stage and cache.
     *
     * @param {Node} node - The node to get the data for.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @param {?NodeCache} cache - An optional cache.
     * @return {Object} The node data.
     */
    getDataFromNode(node: Node, shaderStage?: ("vertex" | "fragment" | "compute" | "any"), cache?: NodeCache | null): Object;
    /**
     * Returns the properties for the given node and shader stage.
     *
     * Properties are typically used within a build stage to reference a node's
     * child node or nodes manually assigned to the properties in a separate build stage.
     * A typical usage pattern for defining nodes manually would be assigning dependency nodes
     * to the current node's properties in the setup stage and building those properties in the generate stage.
     *
     * @param {Node} node - The node to get the properties for.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage='any'] - The shader stage.
     * @return {Object} The node properties.
     */
    getNodeProperties(node: Node, shaderStage?: ("vertex" | "fragment" | "compute" | "any")): Object;
    /**
     * Returns an instance of {@link NodeAttribute} for the given buffer attribute node.
     *
     * @param {BufferAttributeNode} node - The buffer attribute node.
     * @param {string} type - The node type.
     * @param {?string} [name=null] - The name of the buffer attribute.
     * @return {NodeAttribute} The node attribute.
     */
    getBufferAttributeFromNode(node: BufferAttributeNode, type: string, name?: string | null): NodeAttribute;
    /**
     * Returns an instance of {@link StructType} for the given struct name and shader stage
     * or null if not found.
     *
     * @param {string} name - The name of the struct.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @return {?StructType} The struct type or null if not found.
     */
    getStructTypeNode(name: string, shaderStage?: ("vertex" | "fragment" | "compute" | "any")): StructType | null;
    /**
     * Returns an instance of {@link StructType} for the given output struct node.
     *
     * @param {OutputStructNode} node - The output struct node.
     * @param {Array<Object>} membersLayout - The output struct types.
     * @param {?string} [name=null] - The name of the struct.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @return {StructType} The struct type attribute.
     */
    getStructTypeFromNode(node: OutputStructNode, membersLayout: Array<Object>, name?: string | null, shaderStage?: ("vertex" | "fragment" | "compute" | "any")): StructType;
    /**
     * Returns an instance of {@link StructType} for the given output struct node.
     *
     * @param {OutputStructNode} node - The output struct node.
     * @param {Array<Object>} membersLayout - The output struct types.
     * @return {StructType} The struct type attribute.
     */
    getOutputStructTypeFromNode(node: OutputStructNode, membersLayout: Array<Object>): StructType;
    /**
     * Returns an instance of {@link NodeUniform} for the given uniform node.
     *
     * @param {UniformNode} node - The uniform node.
     * @param {string} type - The uniform type.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @param {?string} name - The name of the uniform.
     * @return {NodeUniform} The node uniform.
     */
    getUniformFromNode(node: UniformNode, type: string, shaderStage?: ("vertex" | "fragment" | "compute" | "any"), name?: string | null): NodeUniform;
    /**
     * Returns an instance of {@link NodeVar} for the given variable node.
     *
     * @param {VarNode} node - The variable node.
     * @param {?string} name - The variable's name.
     * @param {string} [type=node.getNodeType( this )] - The variable's type.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @param {boolean} [readOnly=false] - Whether the variable is read-only or not.
     * @param {boolean} [local=false] - Whether the variable is declared locally in the flow instead of the variable section.
     * @param {string} [property='variable'] - The node data property that holds the variable. Allows a node to own more than one variable.
     *
     * @return {NodeVar} The node variable.
     */
    getVarFromNode(node: VarNode, name?: string | null, type?: string, shaderStage?: ("vertex" | "fragment" | "compute" | "any"), readOnly?: boolean, local?: boolean, property?: string): NodeVar;
    /**
     * Returns whether a Node or its flow is deterministic, useful for use in `const`.
     *
     * @param {Node} node - The varying node.
     * @return {boolean} Returns true if deterministic.
     */
    isDeterministic(node: Node): boolean;
    /**
     * Returns an instance of {@link NodeVarying} for the given varying node.
     *
     * @param {(VaryingNode|PropertyNode)} node - The varying node.
     * @param {?string} name - The varying's name.
     * @param {string} [type=node.getNodeType( this )] - The varying's type.
     * @param {?string} interpolationType - The interpolation type of the varying.
     * @param {?string} interpolationSampling - The interpolation sampling type of the varying.
     * @return {NodeVar} The node varying.
     */
    getVaryingFromNode(node: (VaryingNode | PropertyNode), name?: string | null, type?: string, interpolationType?: string | null, interpolationSampling?: string | null): NodeVar;
    /**
     * Registers a node declaration in the current shader stage.
     *
     * @param {Object} node - The node to be registered.
     */
    registerDeclaration(node: Object): void;
    /**
     * Returns the identifier the given node declares in the shader. It is used
     * by {@link NodeBuilder#registerDeclaration} to detect name collisions.
     *
     * @param {Object} node - The node.
     * @return {string} The declaration name.
     */
    getDeclarationName(node: Object): string;
    /**
     * Returns an instance of {@link NodeCode} for the given code node.
     *
     * @param {CodeNode} node - The code node.
     * @param {string} type - The node type.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @return {NodeCode} The node code.
     */
    getCodeFromNode(node: CodeNode, type: string, shaderStage?: ("vertex" | "fragment" | "compute" | "any")): NodeCode;
    /**
     * Add a inline-code to the current flow.
     *
     * @param {string} code - The code to add.
     * @param {?Node} [node= null] - The node that generated the code.
     * @return {NodeBuilder} A reference to this node builder.
     */
    addLineFlowCode(code: string): NodeBuilder;
    /**
     * Adds a code to the current code flow.
     *
     * @param {string} code - Shader code.
     * @return {NodeBuilder} A reference to this node builder.
     */
    addFlowCode(code: string): NodeBuilder;
    /**
     * Add tab in the code that will be generated so that other snippets respect the current tabulation.
     * Typically used in codes with If,Else.
     *
     * @return {NodeBuilder} A reference to this node builder.
     */
    addFlowTab(): NodeBuilder;
    /**
     * Removes a tab.
     *
     * @return {NodeBuilder} A reference to this node builder.
     */
    removeFlowTab(): NodeBuilder;
    /**
     * Gets the current flow data based on a Node.
     *
     * @param {Node} node - Node that the flow was started.
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {Object} The flow data.
     */
    getFlowData(node: Node): Object;
    /**
     * Executes the node flow based on a root node to generate the final shader code.
     *
     * @param {Node} node - The node to execute.
     * @return {Object} The code flow.
     */
    flowNode(node: Node): Object;
    /**
     * Includes a node in the current function node.
     *
     * @param {Node} node - The node to include.
     * @returns {void}
     */
    addInclude(node: Node): void;
    /**
     * Returns the native shader operator name for a given generic name.
     * It is a similar type of method like {@link NodeBuilder#getMethod}.
     *
     * @param {ShaderNodeInternal} shaderNode - The shader node to build the function node with.
     * @return {FunctionNode} The build function node.
     */
    buildFunctionNode(shaderNode: ShaderNodeInternal): FunctionNode;
    /**
     * Generates a code flow based on a TSL function: Fn().
     *
     * @param {ShaderNodeInternal} shaderNode - A function code will be generated based on the input.
     * @return {Object}
     */
    flowShaderNode(shaderNode: ShaderNodeInternal): Object;
    /**
     * Returns the inputs of a call to a TSL function with layout. Missing inputs are completed
     * with the default values of the function parameters, found by running the function once
     * with all inputs and once without the missing ones, and comparing both node graphs.
     *
     * @private
     * @param {ShaderNodeInternal} shaderNode - The shader node of the function.
     * @param {?Array} rawInputs - The inputs of the call.
     * @return {?Array} The inputs of the call, or `null` if the defaults can't be resolved and the function must be expanded inline.
     */
    private _getLayoutInputs;
    /**
     * Resolves the default values of the missing inputs of a TSL function with layout.
     *
     * @private
     * @param {ShaderNodeInternal} shaderNode - The shader node of the function.
     * @param {Array<boolean>} provided - Whether each input of the layout was provided.
     * @return {?Array<Node>} The default value of each missing input, or `null` if they could not be resolved.
     */
    private _resolveLayoutDefaults;
    /**
     * Runs a TSL function with layout as an inline call and returns the resulting stack.
     *
     * @private
     * @param {ShaderNodeInternal} shaderNode - The shader node of the function.
     * @param {Object} inputs - The inputs of the call.
     * @return {StackNode} The stack with the nodes of the call.
     */
    private _getLayoutCallGraph;
    /**
     * Executes the node in a specific build stage.
     *
     * This function can be used to arbitrarily execute the specified build stage
     * outside of the standard build process. For instance, if a node's type depends
     * on properties created by the 'setup' stage, then flowBuildStage(node, 'setup')
     * can be used to execute the setup build stage and access its generated nodes
     * before the standard build process begins.
     *
     * @param {Node} node - The node to execute.
     * @param {string} buildStage - The build stage to execute the node in.
     * @param {?(Node|string)} [output=null] - Expected output type. For example 'vec3'.
     * @return {?(Node|string)} The result of the node build.
     */
    flowBuildStage(node: Node, buildStage: string, output?: (Node | string) | null): (Node | string) | null;
    /**
     * Runs the node flow through all the steps of creation, 'setup', 'analyze', 'generate'.
     *
     * @param {Node} node - The node to execute.
     * @param {?string} output - Expected output type. For example 'vec3'.
     * @return {Object}
     */
    flowStagesNode(node: Node, output?: string | null): Object;
    /**
     * Returns the native shader operator name for a given generic name.
     * It is a similar type of method like {@link NodeBuilder#getMethod}.
     *
     * @abstract
     * @param {string} op - The operator name to resolve.
     * @return {?string} The resolved operator name.
     */
    getFunctionOperator(): string | null;
    /**
     * Builds the given shader node.
     *
     * @abstract
     * @param {ShaderNodeInternal} shaderNode - The shader node.
     * @return {string} The function code.
     */
    buildFunctionCode(): string;
    /**
     * Generates a code flow based on a child Node.
     *
     * @param {Node} node - The node to execute.
     * @param {?string} output - Expected output type. For example 'vec3'.
     * @return {Object} The code flow.
     */
    flowChildNode(node: Node, output?: string | null): Object;
    /**
     * Executes a flow of code in a different stage.
     *
     * Some nodes like `varying()` have the ability to compute code in vertex-stage and
     * return the value in fragment-stage even if it is being executed in an input fragment.
     *
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @param {Node} node - The node to execute.
     * @param {?string} output - Expected output type. For example 'vec3'.
     * @param {?string} propertyName - The property name to assign the result.
     * @return {?(Object|Node)} The code flow or node.build() result.
     */
    flowNodeFromShaderStage(shaderStage: ("vertex" | "fragment" | "compute" | "any"), node: Node, output?: string | null, propertyName?: string | null): (Object | Node) | null;
    /**
     * Returns an array holding all node attributes of this node builder.
     *
     * @return {Array<NodeAttribute>} The node attributes of this builder.
     */
    getAttributesArray(): Array<NodeAttribute>;
    /**
     * Returns the attribute definitions as a shader string for the given shader stage.
     *
     * @abstract
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {string} The attribute code section.
     */
    getAttributes(): string;
    /**
     * Returns the varying definitions as a shader string for the given shader stage.
     *
     * @abstract
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {string} The varying code section.
     */
    getVaryings(): string;
    /**
     * Returns a single variable definition as a shader string for the given variable type and name.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @return {string} The shader string.
     */
    getVar(type: string, name: string, count?: number | null): string;
    /**
     * Returns a single const variable statement as a shader string for the given variable type and name.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @return {string} The shader string.
     */
    generateConstStatement(type: string, name: string, count?: number | null): string;
    /**
     * Returns a single variable statement as a shader string for the given variable type and name.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @return {string} The shader string.
     */
    generateVarStatement(type: string, name: string, count?: number | null): string;
    /**
     * Returns a runtime read-only variable statement as a shader string.
     * Backends without a let declaration use a regular variable declaration.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @return {string} The shader string.
     */
    generateLetStatement(type: string, name: string, count?: number | null): string;
    /**
     * Returns the variable definitions as a shader string for the given shader stage.
     *
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @param {boolean} [global=false] - Whether the variables are global.
     * @return {string} The variable code section.
     */
    getVars(shaderStage: ("vertex" | "fragment" | "compute" | "any"), global?: boolean): string;
    /**
     * Returns the uniform definitions as a shader string for the given shader stage.
     *
     * @abstract
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {string} The uniform code section.
     */
    getUniforms(): string;
    /**
     * Returns the native code definitions as a shader string for the given shader stage.
     *
     * @param {('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage.
     * @return {string} The native code section.
     */
    getCodes(shaderStage: ("vertex" | "fragment" | "compute" | "any")): string;
    /**
     * Returns the hash of this node builder.
     *
     * @return {string} The hash.
     */
    getHash(): string;
    /**
     * Sets the current shader stage.
     *
     * @param {?('vertex'|'fragment'|'compute'|'any')} shaderStage - The shader stage to set.
     */
    setShaderStage(shaderStage: ("vertex" | "fragment" | "compute" | "any") | null): void;
    /**
     * Returns the current shader stage.
     *
     * @return {?('vertex'|'fragment'|'compute'|'any')} The current shader stage.
     */
    getShaderStage(): ("vertex" | "fragment" | "compute" | "any") | null;
    /**
     * Sets the current build stage.
     *
     * @param {?('setup'|'analyze'|'generate')} buildStage - The build stage to set.
     */
    setBuildStage(buildStage: ("setup" | "analyze" | "generate") | null): void;
    /**
     * Returns the current build stage.
     *
     * @return {?('setup'|'analyze'|'generate')} The current build stage.
     */
    getBuildStage(): ("setup" | "analyze" | "generate") | null;
    /**
     * Controls the code build of the shader stages.
     *
     * @abstract
     */
    buildCode(): void;
    /**
     * Returns the current sub-build layer.
     *
     * @return {SubBuildNode} The current sub-build layers.
     */
    get subBuild(): SubBuildNode;
    /**
     * Adds a sub-build layer to the node builder.
     *
     * @param {SubBuildNode} subBuild - The sub-build layer to add.
     */
    addSubBuild(subBuild: SubBuildNode): void;
    /**
     * Removes the last sub-build layer from the node builder.
     *
     * @return {SubBuildNode} The removed sub-build layer.
     */
    removeSubBuild(): SubBuildNode;
    /**
     * Returns the closest sub-build layer for the given data.
     *
     * @param {Node|Set<string>|Array<string>} data - The data to get the closest sub-build layer from.
     * @return {?string} The closest sub-build name or null if none found.
     */
    getClosestSubBuild(data: Node | Set<string> | Array<string>): string | null;
    /**
     * Returns the output node of a sub-build layer.
     *
     * @param {Node} node - The node to get the output from.
     * @return {string} The output node name.
     */
    getSubBuildOutput(node: Node): string;
    /**
     * Returns the sub-build property name for the given property and node.
     *
     * @param {string} [property=''] - The property name.
     * @param {?Node} [node=null] - The node to get the sub-build from.
     * @return {string} The sub-build property name.
     */
    getSubBuildProperty(property?: string, node?: Node | null): string;
    /**
     * Prebuild the node builder.
     */
    prebuild(): void;
    /**
     * Central build method which controls the build for the given object.
     *
     * @return {NodeBuilder} A reference to this node builder.
     */
    build(): NodeBuilder;
    /**
     * Async version of build() that yields to main thread between shader stages.
     * Use this in compileAsync() to prevent blocking the main thread.
     *
     * @param {Function} [yieldFn=yieldToMain] - The function used to yield to the main thread.
     * @return {Promise<NodeBuilder>} A promise that resolves to this node builder.
     */
    buildAsync(yieldFn?: Function): Promise<NodeBuilder>;
    /**
     * Returns a uniform representation which is later used for UBO generation and rendering.
     *
     * @param {NodeUniform} uniformNode - The uniform node.
     * @param {string} type - The requested type.
     * @return {Uniform} The uniform.
     */
    getNodeUniform(uniformNode: NodeUniform, type: string): Uniform;
    /**
     * Formats the given shader snippet from a given type into another one. E.g.
     * this method might be used to convert a simple float string `"1.0"` into a
     * `vec3` representation: `"vec3<f32>( 1.0 )"`.
     *
     * @param {string} snippet - The shader snippet.
     * @param {string} fromType - The source type.
     * @param {string} toType - The target type.
     * @return {string} The updated shader string.
     */
    format(snippet: string, fromType: string, toType: string): string;
    /**
     * Returns a signature with the engine's current revision.
     *
     * @return {string} The signature.
     */
    getSignature(): string;
    /**
     * Returns `true` if data from the previous frame are required. Relevant
     * when computing motion vectors with {@link VelocityNode}.
     *
     * @return {boolean} Whether data from the previous frame are required or not.
     */
    needsPreviousData(): boolean;
}
/**
 * This utility class is used in {@link NodeBuilder} as an internal
 * cache data structure for node data.
 */
export class NodeCache {
    /**
     * Constructs a new node cache.
     *
     * @param {?NodeCache} parent - A reference to a parent cache.
     */
    constructor(parent?: NodeCache | null);
    /**
     * The id of the cache.
     *
     * @type {number}
     * @readonly
     */
    readonly id: number;
    /**
     * A weak map for managing node data.
     *
     * @type {WeakMap<Node, Object>}
     */
    nodesData: WeakMap<Node, Object>;
    /**
     * Reference to a parent node cache.
     *
     * @type {?NodeCache}
     * @default null
     */
    parent: NodeCache | null;
    /**
     * Returns the data for the given node.
     *
     * @param {Node} node - The node.
     * @return {?Object} The data for the node.
     */
    getData(node: Node): Object | null;
    /**
     * Sets the data for a given node.
     *
     * @param {Node} node - The node.
     * @param {Object} data - The data that should be cached.
     */
    setData(node: Node, data: Object): void;
}
/**
 * {@link NodeBuilder} is going to create instances of this class during the build process
 * of nodes. They represent user-defined, native shader code portions that are going to be
 * injected by the builder. A dictionary of node codes is maintained in {@link NodeBuilder#codes}
 * for this purpose.
 */
export class NodeCode {
    /**
     * Constructs a new code node.
     *
     * @param {string} name - The name of the code.
     * @param {string} type - The node type.
     * @param {string} [code=''] - The native shader code.
     */
    constructor(name: string, type: string, code?: string);
    /**
     * The name of the code.
     *
     * @type {string}
     */
    name: string;
    /**
     * The node type.
     *
     * @type {string}
     */
    type: string;
    /**
     * The native shader code.
     *
     * @type {string}
     * @default ''
     */
    code: string;
}
/**
 * Management class for updating nodes. The module tracks metrics like
 * the elapsed time, delta time, the render and frame ID to correctly
 * call the node update methods {@link Node#updateBefore}, {@link Node#update}
 * and {@link Node#updateAfter} depending on the node's configuration.
 */
export class NodeFrame {
    /**
     * The elapsed time in seconds.
     *
     * @type {number}
     * @default 0
     */
    time: number;
    /**
     * The delta time in seconds.
     *
     * @type {number}
     * @default 0
     */
    deltaTime: number;
    /**
     * The frame ID.
     *
     * @type {number}
     * @default 0
     */
    frameId: number;
    /**
     * The render ID.
     *
     * @type {number}
     * @default 0
     */
    renderId: number;
    /**
     * Used to control the {@link Node#update} call.
     *
     * @type {WeakMap<Node, Object>}
     */
    updateMap: WeakMap<Node, Object>;
    /**
     * Used to control the {@link Node#updateBefore} call.
     *
     * @type {WeakMap<Node, Object>}
     */
    updateBeforeMap: WeakMap<Node, Object>;
    /**
     * Used to control the {@link Node#updateAfter} call.
     *
     * @type {WeakMap<Node, Object>}
     */
    updateAfterMap: WeakMap<Node, Object>;
    /**
     * A reference to the current renderer.
     *
     * @type {?Renderer}
     * @default null
     */
    renderer: Renderer | null;
    /**
     * A reference to the current material.
     *
     * @type {?Material}
     * @default null
     */
    material: Material | null;
    /**
     * A reference to the current camera.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    /**
     * A reference to the current 3D object.
     *
     * @type {?Object3D}
     * @default null
     */
    object: Object3D | null;
    /**
     * A reference to the current scene.
     *
     * @type {?Scene}
     * @default null
     */
    scene: Scene | null;
    /**
     * A reference to the current compute node.
     *
     * @type {?ComputeNode}
     * @default null
     */
    compute: ComputeNode | null;
    /**
     * Returns a dictionary for a given node and update map which
     * is used to correctly call node update methods per frame or render.
     *
     * @private
     * @param {WeakMap<Node, Object>} referenceMap - The reference weak map.
     * @param {Node} nodeRef - The reference to the current node.
     * @return {Object<string,WeakMap<Object, number>>} The dictionary.
     */
    private _getMaps;
    /**
     * This method executes the {@link Node#updateBefore} for the given node.
     * It makes sure {@link Node#updateBeforeType} is honored meaning the update
     * is only executed once per frame, render or object depending on the update
     * type.
     *
     * @param {Node} node - The node that should be updated.
     */
    updateBeforeNode(node: Node): void;
    /**
     * This method executes the {@link Node#updateAfter} for the given node.
     * It makes sure {@link Node#updateAfterType} is honored meaning the update
     * is only executed once per frame, render or object depending on the update
     * type.
     *
     * @param {Node} node - The node that should be updated.
     */
    updateAfterNode(node: Node): void;
    /**
     * This method executes the {@link Node#update} for the given node.
     * It makes sure {@link Node#updateType} is honored meaning the update
     * is only executed once per frame, render or object depending on the update
     * type.
     *
     * @param {Node} node - The node that should be updated.
     */
    updateNode(node: Node): void;
    /**
     * Updates the internal state of the node frame. This method is
     * called by the renderer in its internal animation loop.
     */
    update(): void;
    lastTime: number | undefined;
}
/**
 * Describes the input of a {@link NodeFunction}.
 */
export class NodeFunctionInput {
    /**
     * Constructs a new node function input.
     *
     * @param {string} type - The input type.
     * @param {string} name - The input name.
     * @param {?number} [count=null] - If the input is an Array, count will be the length.
     * @param {('in'|'out'|'inout')} [qualifier=''] - The parameter qualifier (only relevant for GLSL).
     * @param {boolean} [isConst=false] - Whether the input uses a const qualifier or not (only relevant for GLSL).
     */
    constructor(type: string, name: string, count?: number | null, qualifier?: ("in" | "out" | "inout"), isConst?: boolean);
    /**
     *  The input type.
     *
     * @type {string}
     */
    type: string;
    /**
     * The input name.
     *
     * @type {string}
     */
    name: string;
    /**
     * If the input is an Array, count will be the length.
     *
     * @type {?number}
     * @default null
     */
    count: number | null;
    /**
     *The parameter qualifier (only relevant for GLSL).
     *
     * @type {('in'|'out'|'inout')}
     * @default ''
     */
    qualifier: ("in" | "out" | "inout");
    /**
     * Whether the input uses a const qualifier or not (only relevant for GLSL).
     *
     * @type {boolean}
     * @default false
     */
    isConst: boolean;
}
export namespace NodeFunctionInput {
    let isNodeFunctionInput: boolean;
}
/**
 * A loader for loading node objects in the three.js JSON Object/Scene format.
 *
 * @augments Loader
 */
export class NodeLoader extends Loader {
    /**
     * Constructs a new node loader.
     *
     * @param {LoadingManager} [manager] - A reference to a loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Represents a dictionary of textures.
     *
     * @type {Object<string,Texture>}
     */
    textures: {
        [x: string]: Texture;
    };
    /**
     * Represents a dictionary of node types.
     *
     * @type {Object<string,Node.constructor>}
     */
    nodes: {
        [x: string]: Node.constructor;
    };
    /**
     * Loads the node definitions from the given URL.
     *
     * @param {string} url - The path/URL of the file to be loaded.
     * @param {Function} onLoad - Will be called when load completes.
     * @param {Function} onProgress - Will be called while load progresses.
     * @param {Function} onError - Will be called when errors are thrown during the loading process.
     */
    load(url: string, onLoad: Function, onProgress: Function, onError: Function): void;
    /**
     * Parse the node dependencies for the loaded node.
     *
     * @param {Array<Object>} [json] - The JSON definition
     * @return {Object<string,Node>} A dictionary with node dependencies.
     */
    parseNodes(json?: Array<Object>): {
        [x: string]: Node;
    };
    /**
     * Parses the node from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @param {string} json.type - The node type.
     * @param {string} json.uuid - The node UUID.
     * @param {Array<Object>} [json.nodes] - The node dependencies.
     * @param {Object} [json.meta] - The meta data.
     * @return {Node} The parsed node.
     */
    parse(json: {
        type: string;
        uuid: string;
        nodes?: Object[] | undefined;
        meta?: Object | undefined;
    }): Node;
    /**
     * Defines the dictionary of textures.
     *
     * @param {Object<string,Texture>} value - The texture library defines as `<uuid,texture>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setTextures(value: {
        [x: string]: Texture;
    }): NodeLoader;
    /**
     * Defines the dictionary of node types.
     *
     * @param {Object<string,Node.constructor>} value - The node library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: Node.constructor;
    }): NodeLoader;
    /**
     * Creates a node object from the given type.
     *
     * @param {string} type - The node type.
     * @return {Node} The created node instance.
     */
    createNodeFromType(type: string): Node;
}
import { NodeMaterial } from './three.tsl.js';
/**
 * A special type of material loader for loading node materials.
 *
 * @augments MaterialLoader
 */
export class NodeMaterialLoader extends MaterialLoader {
    /**
     * Constructs a new node material loader.
     *
     * @param {LoadingManager} [manager] - A reference to a loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Represents a dictionary of node types.
     *
     * @type {Object<string,Node.constructor>}
     */
    nodes: {
        [x: string]: Node.constructor;
    };
    /**
     * Represents a dictionary of node material types.
     *
     * @type {Object<string,NodeMaterial.constructor>}
     */
    nodeMaterials: {
        [x: string]: NodeMaterial.constructor;
    };
    /**
     * Parses the node material from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @return {NodeMaterial}. The parsed material.
     */
    parse(json: Object): NodeMaterial;
    /**
     * Defines the dictionary of node types.
     *
     * @param {Object<string,Node.constructor>} value - The node library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: Node.constructor;
    }): NodeLoader;
    /**
     * Defines the dictionary of node material types.
     *
     * @param {Object<string,NodeMaterial.constructor>} value - The node material library defined as `<classname,class>`.
     * @return {NodeLoader} A reference to this loader.
     */
    setNodeMaterials(value: {
        [x: string]: NodeMaterial.constructor;
    }): NodeLoader;
    /**
     * Creates a node material from the given type.
     *
     * @param {string} type - The node material type.
     * @return {Node} The created node material instance.
     */
    createMaterialFromType(type: string): Node;
}
/**
 * A special type of object loader for loading 3D objects using
 * node materials.
 *
 * @augments ObjectLoader
 */
export class NodeObjectLoader extends ObjectLoader {
    /**
     * Constructs a new node object loader.
     *
     * @param {LoadingManager} [manager] - A reference to a loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Represents a dictionary of node types.
     *
     * @type {Object<string,Node.constructor>}
     */
    nodes: {
        [x: string]: Node.constructor;
    };
    /**
     * Represents a dictionary of node material types.
     *
     * @type {Object<string,NodeMaterial.constructor>}
     */
    nodeMaterials: {
        [x: string]: NodeMaterial.constructor;
    };
    /**
     * A reference to hold the `nodes` JSON property.
     *
     * @private
     * @type {?Object[]}
     */
    private _nodesJSON;
    /**
     * Defines the dictionary of node types.
     *
     * @param {Object<string,Node.constructor>} value - The node library defined as `<classname,class>`.
     * @return {NodeObjectLoader} A reference to this loader.
     */
    setNodes(value: {
        [x: string]: Node.constructor;
    }): NodeObjectLoader;
    /**
     * Defines the dictionary of node material types.
     *
     * @param {Object<string,NodeMaterial.constructor>} value - The node material library defined as `<classname,class>`.
     * @return {NodeObjectLoader} A reference to this loader.
     */
    setNodeMaterials(value: {
        [x: string]: NodeMaterial.constructor;
    }): NodeObjectLoader;
    /**
     * Parses the node objects from the given JSON.
     *
     * @param {Object} json - The JSON definition
     * @param {Function} onLoad - The onLoad callback function.
     * @return {Object3D}. The parsed 3D object.
     */
    parse(json: Object, onLoad: Function): Object3D;
    /**
     * Async version of {@link NodeObjectLoader#parse}.
     *
     * @param {Object} json - The JSON definition
     * @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
     */
    parseAsync(json: Object): Promise<Object3D>;
    /**
     * Parses the node objects from the given JSON and textures.
     *
     * @param {Object[]} json - The JSON definition
     * @param {Object<string,Texture>} textures - The texture library.
     * @return {Object<string,Node>}. The parsed nodes.
     */
    parseNodes(json: Object[], textures: {
        [x: string]: Texture;
    }): {
        [x: string]: Node;
    };
    /**
     * Parses the node objects from the given JSON and textures.
     *
     * @param {Object} json - The JSON definition
     * @param {Object<string,Texture>} textures - The texture library.
     * @return {Object<string,NodeMaterial>}. The parsed materials.
     */
    parseMaterials(json: Object, textures: {
        [x: string]: Texture;
    }): {
        [x: string]: NodeMaterial;
    };
}
/**
 * {@link NodeBuilder} is going to create instances of this class during the build process
 * of nodes. They represent the final shader uniforms that are going to be generated
 * by the builder. A dictionary of node uniforms is maintained in {@link NodeBuilder#uniforms}
 * for this purpose.
 */
export class NodeUniform {
    /**
     * Constructs a new node uniform.
     *
     * @param {string} name - The name of the uniform.
     * @param {string} type - The type of the uniform.
     * @param {UniformNode} node - An reference to the node.
     */
    constructor(name: string, type: string, node: UniformNode);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeUniform: boolean;
    /**
     * The name of the uniform.
     *
     * @type {string}
     */
    name: string;
    /**
     * The type of the uniform.
     *
     * @type {string}
     */
    type: string;
    /**
     * An reference to the node.
     *
     * @type {UniformNode}
     */
    node: UniformNode;
    set value(val: any);
    /**
     * The value of the uniform node.
     *
     * @type {any}
     */
    get value(): any;
    /**
     * The id of the uniform node.
     *
     * @type {number}
     */
    get id(): number;
    /**
     * The uniform node's group.
     *
     * @type {UniformGroupNode}
     */
    get groupNode(): UniformGroupNode;
}
import { NodeUpdateType } from './three.tsl.js';
/**
 * {@link NodeBuilder} is going to create instances of this class during the build process
 * of nodes. They represent the final shader variables that are going to be generated
 * by the builder. A dictionary of node variables is maintained in {@link NodeBuilder#vars} for
 * this purpose.
 */
export class NodeVar {
    /**
     * Constructs a new node variable.
     *
     * @param {string} name - The name of the variable.
     * @param {string} type - The type of the variable.
     * @param {boolean} [readOnly=false] - The read-only flag.
     * @param {?number} [count=null] - The size.
     * @param {boolean} [local=false] - Whether the variable is declared locally in the flow.
     */
    constructor(name: string, type: string, readOnly?: boolean, count?: number | null, local?: boolean);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeVar: boolean;
    /**
     * The name of the variable.
     *
     * @type {string}
     */
    name: string;
    /**
     * The type of the variable.
     *
     * @type {string}
     */
    type: string;
    /**
     *  The read-only flag.
     *
     * @type {boolean}
     */
    readOnly: boolean;
    /**
     * Whether the variable is declared locally in the flow.
     *
     * @type {boolean}
     * @default false
     */
    local: boolean;
    /**
     * The size.
     *
     * @type {?number}
     */
    count: number | null;
}
/**
 * {@link NodeBuilder} is going to create instances of this class during the build process
 * of nodes. They represent the final shader varyings that are going to be generated
 * by the builder. An array of node varyings is maintained in {@link NodeBuilder#varyings} for
 * this purpose.
 *
 * @augments NodeVar
 */
export class NodeVarying extends NodeVar {
    /**
     * Constructs a new node varying.
     *
     * @param {string} name - The name of the varying.
     * @param {string} type - The type of the varying.
     * @param {?string} interpolationType - The interpolation type of the varying.
     * @param {?string} interpolationSampling - The interpolation sampling type of the varying.
     */
    constructor(name: string, type: string, interpolationType?: string | null, interpolationSampling?: string | null);
    /**
     * Whether this varying requires interpolation or not. This property can be used
     * to check if the varying can be optimized for a variable.
     *
     * @type {boolean}
     * @default false
     */
    needsInterpolation: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeVarying: boolean;
    /**
     * The interpolation type of the varying data.
     *
     * @type {?string}
     * @default null
     */
    interpolationType: string | null;
    /**
     * The interpolation sampling type of varying data.
     *
     * @type {?string}
     * @default null
     */
    interpolationSampling: string | null;
}
import { NormalBlending } from './three.core.js';
import { NotEqualCompare } from './three.core.js';
import { NotEqualDepth } from './three.core.js';
import { NotEqualStencilFunc } from './three.core.js';
import { ObjectLoader } from './three.core.js';
import { OneFactor } from './three.core.js';
import { OneMinusConstantAlphaFactor } from './three.core.js';
import { OneMinusConstantColorFactor } from './three.core.js';
import { OneMinusDstAlphaFactor } from './three.core.js';
import { OneMinusDstColorFactor } from './three.core.js';
import { OneMinusSrcAlphaFactor } from './three.core.js';
import { OneMinusSrcColorFactor } from './three.core.js';
import { PCFShadowMap } from './three.core.js';
import { PCFSoftShadowMap } from './three.core.js';
import { ParameterNode } from './three.tsl.js';
import { PerspectiveCamera } from './three.core.js';
/**
 * Represents the lighting model for a phong material. Used in {@link MeshPhongNodeMaterial}.
 *
 * @augments BasicLightingModel
 */
export class PhongLightingModel extends BasicLightingModel {
    /**
     * Constructs a new phong lighting model.
     *
     * @param {boolean} [specular=true] - Whether specular is supported or not.
     */
    constructor(specular?: boolean);
    /**
     * Whether specular is supported or not. Set this to `false` if you are
     * looking for a Lambert-like material meaning a material for non-shiny
     * surfaces, without specular highlights.
     *
     * @type {boolean}
     * @default true
     */
    specular: boolean;
    /**
     * Implements the direct lighting. The specular portion is optional and can be controlled
     * with the {@link PhongLightingModel#specular} flag.
     *
     * @param {Object} lightData - The light data.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object): void;
}
/**
 * Represents the lighting model for a PBR material.
 *
 * @augments LightingModel
 */
export class PhysicalLightingModel extends LightingModel {
    /**
     * Constructs a new physical lighting model.
     *
     * @param {boolean} [clearcoat=false] - Whether clearcoat is supported or not.
     * @param {boolean} [sheen=false] - Whether sheen is supported or not.
     * @param {boolean} [iridescence=false] - Whether iridescence is supported or not.
     * @param {boolean} [anisotropy=false] - Whether anisotropy is supported or not.
     * @param {boolean} [transmission=false] - Whether transmission is supported or not.
     * @param {boolean} [dispersion=false] - Whether dispersion is supported or not.
     * @param {boolean} [retroreflection=false] - Whether retroreflection is supported or not.
     * @param {boolean} [diffuseRoughness=false] - Whether EON rough diffuse reflection is supported or not.
     */
    constructor(clearcoat?: boolean, sheen?: boolean, iridescence?: boolean, anisotropy?: boolean, transmission?: boolean, dispersion?: boolean, retroreflection?: boolean, diffuseRoughness?: boolean);
    /**
     * Whether clearcoat is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    clearcoat: boolean;
    /**
     * Whether sheen is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    sheen: boolean;
    /**
     * Whether iridescence is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    iridescence: boolean;
    /**
     * Whether anisotropy is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    anisotropy: boolean;
    /**
     * Whether transmission is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    transmission: boolean;
    /**
     * Whether dispersion is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    dispersion: boolean;
    /**
     * Whether retroreflection is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    retroreflection: boolean;
    /**
     * Whether EON rough diffuse reflection is supported or not.
     *
     * @type {boolean}
     * @default false
     */
    diffuseRoughness: boolean;
    /**
     * The clear coat radiance.
     *
     * @type {?Node}
     * @default null
     */
    clearcoatRadiance: Node | null;
    /**
     * The clear coat specular direct.
     *
     * @type {?Node}
     * @default null
     */
    clearcoatSpecularDirect: Node | null;
    /**
     * The clear coat specular indirect.
     *
     * @type {?Node}
     * @default null
     */
    clearcoatSpecularIndirect: Node | null;
    /**
     * The sheen specular direct.
     *
     * @type {?Node}
     * @default null
     */
    sheenSpecularDirect: Node | null;
    /**
     * The sheen specular indirect.
     *
     * @type {?Node}
     * @default null
     */
    sheenSpecularIndirect: Node | null;
    /**
     * The iridescence Fresnel.
     *
     * @type {?Node}
     * @default null
     */
    iridescenceFresnel: Node | null;
    /**
     * The iridescence F0 dielectric.
     *
     * @type {?Node}
     * @default null
     */
    iridescenceF0Dielectric: Node | null;
    /**
     * The iridescence F0 metallic.
     *
     * @type {?Node}
     * @default null
     */
    iridescenceF0Metallic: Node | null;
    /**
     * The sampled DFG LUT value, shared by the direct and indirect lighting paths.
     *
     * @type {?Node}
     * @default null
     */
    dfg: Node | null;
    /**
     * The EON directional albedo, shared by the indirect lighting paths.
     *
     * @type {?Node}
     * @default null
     */
    eonDirectionalAlbedo: Node | null;
    /**
     * The multi-scattering energy compensation for direct lighting.
     *
     * @type {?Node}
     * @default null
     */
    multiScatteringCompensation: Node | null;
    /**
     * The dielectric single-scattering term, shared by the indirect lighting paths.
     *
     * @type {?Node}
     * @default null
     */
    singleScatteringDielectric: Node | null;
    /**
     * The dielectric multi-scattering term, shared by the indirect lighting paths.
     *
     * @type {?Node}
     * @default null
     */
    multiScatteringDielectric: Node | null;
    computeMultiscattering(singleScatter: any, multiScatter: any, specularF90: any, f0: any, iridescenceF0?: null): void;
    /**
     * Implements the direct light.
     *
     * @param {Object} lightData - The light data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object): void;
    /**
     * This method is intended for implementing the direct light term for
     * rect area light nodes.
     *
     * @param {Object} input - The input data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    directRectArea({ lightColor, lightPosition, halfWidth, halfHeight, reflectedLight, ltc_1, ltc_2 }: Object): void;
    /**
     * Implements the indirect lighting.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect(builder: NodeBuilder): void;
    /**
     * Implements the indirect diffuse term.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirectDiffuse(builder: NodeBuilder): void;
    /**
     * Implements the indirect specular term.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirectSpecular(builder: NodeBuilder): void;
    /**
     * Implements the ambient occlusion term.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    ambientOcclusion(builder: NodeBuilder): void;
    /**
     * Used for final lighting accumulations depending on the requested features.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish({ context }: NodeBuilder): void;
}
import { Plane } from './three.core.js';
import { PlaneGeometry } from './three.core.js';
import { PointLight } from './three.core.js';
import { PointLightNode } from './three.tsl.js';
import { PointsMaterial } from './three.core.js';
/**
 * Node material version of {@link PointsMaterial}.
 *
 * This material can be used in two ways:
 *
 * - By rendering point primitives with {@link Points}. Since WebGPU only supports point primitives
 * with a pixel size of `1`, it's not possible to define a size.
 *
 * ```js
 * const pointCloud = new THREE.Points( geometry, new THREE.PointsNodeMaterial() );
 * ```
 *
 * - By rendering point primitives with {@link Sprites}. In this case, size is honored,
 * see {@link PointsNodeMaterial#sizeNode}.
 *
 * ```js
 * const instancedPoints = new THREE.Sprite( new THREE.PointsNodeMaterial( { positionNode: instancedBufferAttribute( positionAttribute ) } ) );
 * ```
 *
 * @augments SpriteNodeMaterial
 */
export class PointsNodeMaterial extends SpriteNodeMaterial {
    /**
     * This node property provides an additional way to set the point size.
     *
     * Note that WebGPU only supports point primitives with 1 pixel size. Consequently,
     * this node has no effect when the material is used with {@link Points} and a WebGPU
     * backend. If an application wants to render points with a size larger than 1 pixel,
     * the material should be used with {@link Sprite} and instancing.
     *
     * @type {?Node<vec2>}
     * @default null
     */
    sizeNode: Node<any> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPointsNodeMaterial: boolean;
    setupPositionView(): any;
    setupVertexSprite(builder: any): any;
    setupVertex(builder: any): any;
    _useAlphaToCoverage: any;
}
/**
 * @deprecated since r183. Use {@link RenderPipeline} instead. PostProcessing has been renamed to RenderPipeline.
 *
 * This class is a wrapper for backward compatibility and will be removed in a future version.
 */
export class PostProcessing extends RenderPipeline {
    /**
     * Constructs a new post processing management module.
     *
     * @param {Renderer} renderer - A reference to the renderer.
     * @param {Node<vec4>} outputNode - An optional output node.
     * @deprecated since r183. Use {@link RenderPipeline} instead.
     */
    constructor(renderer: Renderer, outputNode: Node<any>);
}
/**
 * A projector light version of {@link SpotLight}. Can only be used with {@link WebGPURenderer}.
 *
 * @augments SpotLight
 */
export class ProjectorLight extends SpotLight {
    /**
     * Aspect ratio of the light. Set to `null` to use the texture aspect ratio.
     *
     * @type {?number}
     * @default null
     */
    aspect: number | null;
    copy(source: any, recursive: any): this;
}
/**
 * An implementation of a projector light node.
 *
 * @augments SpotLightNode
 */
export class ProjectorLightNode extends SpotLightNode {
    update(frame: any): void;
    /**
     * Overwrites the default implementation to compute projection attenuation.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @return {Node<float>} The spot attenuation.
     */
    getSpotAttenuation(builder: NodeBuilder): Node<any>;
}
/**
 * A material instance that reuses the shader of a node material with its own properties.
 * All instances created from the same node material share a single shader build, so
 * configure the node material before creating instances. Instance values are read in
 * the shared node graph with `materialReference( name, type )`. Node properties such as
 * `colorNode` are read-only and always read from the node material.
 *
 * ```js
 * const nodeMaterial = new MeshBasicNodeMaterial();
 * nodeMaterial.colorNode = materialReference( 'myColor', 'color' );
 *
 * const material = new ProxyNodeMaterial( nodeMaterial );
 * material.myColor = new Color( 1, 0, 0 );
 * ```
 *
 * @augments Material
 */
export class ProxyNodeMaterial extends Material {
    /**
     * Constructs a new proxy node material.
     *
     * @param {NodeMaterial} nodeMaterial - The node material defining the shared shader.
     * @throws {TypeError} When the given material is not a node material.
     */
    constructor(nodeMaterial: NodeMaterial);
    userData: {};
    type: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isProxyNodeMaterial: boolean;
    /**
     * The node material defining the shared shader.
     *
     * @type {NodeMaterial}
     */
    nodeMaterial: NodeMaterial;
    /**
     * Builds the shader of the node material while keeping this instance
     * as `builder.material`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    build(builder: NodeBuilder): void;
    set version(value: number);
    /**
     * The version of the node material. Setting `needsUpdate` on the node material
     * updates all its instances, while setting it on an instance has no effect.
     *
     * @type {number}
     */
    get version(): number;
    /**
     * Copies the values of the given proxy node material to this instance.
     * Object values such as colors are shared with the source, except in `userData`.
     * Unlike {@link Material#copy}, `userData` is not copied via JSON: its first level
     * values are cloned when possible, so types such as colors are preserved. Textures
     * remain shared.
     *
     * @param {ProxyNodeMaterial} source - The material to copy.
     * @return {ProxyNodeMaterial} A reference to this instance.
     */
    copy(source: ProxyNodeMaterial): ProxyNodeMaterial;
    /**
     * Returns a new proxy node material that shares the same node material.
     *
     * @return {ProxyNodeMaterial} A clone of this instance.
     */
    clone(): ProxyNodeMaterial;
}
import { QuadMesh } from './three.tsl.js';
import { Quaternion } from './three.core.js';
import { R11_EAC_Format } from './three.core.js';
import { RED_GREEN_RGTC2_Format } from './three.core.js';
import { RED_RGTC1_Format } from './three.core.js';
import { REVISION } from './three.core.js';
import { RG11_EAC_Format } from './three.core.js';
import { RGBAFormat } from './three.core.js';
import { RGBAIntegerFormat } from './three.core.js';
import { RGBA_ASTC_10x10_Format } from './three.core.js';
import { RGBA_ASTC_10x5_Format } from './three.core.js';
import { RGBA_ASTC_10x6_Format } from './three.core.js';
import { RGBA_ASTC_10x8_Format } from './three.core.js';
import { RGBA_ASTC_12x10_Format } from './three.core.js';
import { RGBA_ASTC_12x12_Format } from './three.core.js';
import { RGBA_ASTC_4x4_Format } from './three.core.js';
import { RGBA_ASTC_5x4_Format } from './three.core.js';
import { RGBA_ASTC_5x5_Format } from './three.core.js';
import { RGBA_ASTC_6x5_Format } from './three.core.js';
import { RGBA_ASTC_6x6_Format } from './three.core.js';
import { RGBA_ASTC_8x5_Format } from './three.core.js';
import { RGBA_ASTC_8x6_Format } from './three.core.js';
import { RGBA_ASTC_8x8_Format } from './three.core.js';
import { RGBA_BPTC_Format } from './three.core.js';
import { RGBA_ETC2_EAC_Format } from './three.core.js';
import { RGBA_PVRTC_2BPPV1_Format } from './three.core.js';
import { RGBA_PVRTC_4BPPV1_Format } from './three.core.js';
import { RGBA_S3TC_DXT1_Format } from './three.core.js';
import { RGBA_S3TC_DXT3_Format } from './three.core.js';
import { RGBA_S3TC_DXT5_Format } from './three.core.js';
import { RGBFormat } from './three.core.js';
import { RGBIntegerFormat } from './three.core.js';
import { RGB_BPTC_SIGNED_Format } from './three.core.js';
import { RGB_BPTC_UNSIGNED_Format } from './three.core.js';
import { RGB_ETC1_Format } from './three.core.js';
import { RGB_ETC2_Format } from './three.core.js';
import { RGB_PVRTC_2BPPV1_Format } from './three.core.js';
import { RGB_PVRTC_4BPPV1_Format } from './three.core.js';
import { RGB_S3TC_DXT1_Format } from './three.core.js';
import { RGFormat } from './three.core.js';
import { RGIntegerFormat } from './three.core.js';
/**
 * A readback buffer is used to transfer data from the GPU to the CPU.
 * It is primarily used to read back compute shader results.
 *
 * @augments EventDispatcher
 */
export class ReadbackBuffer extends EventDispatcher {
    /**
     * Constructs a new readback buffer.
     *
     * @param {number} maxByteLength - The maximum size of the buffer to be read back.
     */
    constructor(maxByteLength: number);
    /**
     * Name used for debugging purposes.
     *
     * @type {string}
     */
    name: string;
    /**
     * The mapped, read back array buffer.
     *
     * @type {ArrayBuffer|null}
     */
    buffer: ArrayBuffer | null;
    /**
     * The maximum size of the buffer to be read back.
     *
     * @type {number}
     */
    maxByteLength: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isReadbackBuffer: boolean;
    _mapped: boolean;
    /**
     * Releases the mapped buffer data so the GPU buffer can be
     * used by the GPU again.
     *
     * Note: Any `ArrayBuffer` data associated with this readback buffer
     * are removed and no longer accessible after calling this method.
     */
    release(): void;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
import { RectAreaLight } from './three.core.js';
/**
 * Module for representing rect area lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class RectAreaLightNode extends AnalyticLightNode {
    /**
     * Used to configure the internal BRDF approximation texture data.
     *
     * @param {RectAreaLightTexturesLib} ltc - The BRDF approximation texture data.
     */
    static setLTC(ltc: RectAreaLightTexturesLib): void;
    /**
     * Constructs a new rect area light node.
     *
     * @param {?RectAreaLight} [light=null] - The rect area light source.
     */
    constructor(light?: RectAreaLight | null);
    /**
     * Uniform node representing the half height of the are light.
     *
     * @type {UniformNode<vec3>}
     */
    halfHeight: UniformNode<any>;
    /**
     * Uniform node representing the half width of the are light.
     *
     * @type {UniformNode<vec3>}
     */
    halfWidth: UniformNode<any>;
    /**
     * Overwritten to updated rect area light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    setupDirectRectArea(builder: any): {
        lightColor: Node;
        lightPosition: any;
        halfWidth: UniformNode<any>;
        halfHeight: UniformNode<any>;
        ltc_1: TextureNode;
        ltc_2: TextureNode;
    };
}
import { RedFormat } from './three.core.js';
import { RedIntegerFormat } from './three.core.js';
import { ReinhardToneMapping } from './three.core.js';
import { RenderObjectRefreshType } from './three.core.js';
/**
 * This module is responsible to manage the rendering pipeline setups in apps.
 * You usually create a single instance of this class and use it to define
 * the output of your render pipeline and post processing effect chain.
 * ```js
 * const renderPipeline = new RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 *
 * renderPipeline.outputNode = scenePass;
 * ```
 *
 * Note: This module can only be used with `WebGPURenderer`.
 */
export class RenderPipeline {
    /**
     * Constructs a new render pipeline management module.
     *
     * @param {Renderer} renderer - A reference to the renderer.
     * @param {Node<vec4>} outputNode - An optional output node.
     */
    constructor(renderer: Renderer, outputNode?: Node<any>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderPipeline: boolean;
    /**
     * A reference to the renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * A node which defines the final output of the rendering
     * pipeline. This is usually the last node in a chain
     * of effect nodes.
     *
     * @type {Node<vec4>}
     */
    outputNode: Node<any>;
    /**
     * Whether the default output tone mapping and color
     * space transformation should be enabled or not.
     *
     * This is enabled by default but it must be disabled for
     * effects that expect to be executed after tone mapping and color
     * space conversion. A typical example is FXAA which
     * requires sRGB input.
     *
     * When set to `false`, the app must control the output
     * transformation with `RenderOutputNode`.
     *
     * ```js
     * const outputPass = renderOutput( scenePass );
     * ```
     *
     * @type {boolean}
     */
    outputColorTransform: boolean;
    /**
     * Must be set to `true` when the output node changes.
     *
     * @type {Node<vec4>}
     */
    needsUpdate: Node<any>;
    /**
     * The full screen quad that is used to render
     * the effects.
     *
     * @private
     * @type {QuadMesh}
     */
    private _quadMesh;
    /**
     * The context data for the render pipeline.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _contextData;
    /**
     * The current tone mapping.
     *
     * @private
     * @type {ToneMapping}
     */
    private _toneMapping;
    /**
     * The current output color space.
     *
     * @private
     * @type {ColorSpace}
     */
    private _outputColorSpace;
    /**
     * When `RenderPipeline` is used to apply rendering pipeline and post processing effects,
     * the application must use this version of `render()` inside
     * its animation loop (not the one from the renderer).
     */
    render(): void;
    /**
     * Frees internal resources.
     */
    dispose(): void;
    /**
     * Updates the context data.
     *
     * @private
     */
    private _updateContext;
    /**
     * Updates the state of the module.
     *
     * @private
     */
    private _update;
    /**
     * When `RenderPipeline` is used to apply rendering pipeline and post processing effects,
     * the application must use this version of `renderAsync()` inside
     * its animation loop (not the one from the renderer).
     *
     * @async
     * @deprecated
     * @return {Promise} A Promise that resolves when the render has been finished.
     */
    renderAsync(): Promise<any>;
}
import { RenderTarget } from './three.core.js';
/**
 * Base class for renderers.
 */
export class Renderer {
    /**
     * Renderer options.
     *
     * @typedef {Object} Renderer~Options
     * @property {boolean} [logarithmicDepthBuffer=false] - Whether logarithmic depth buffer is enabled or not.
     * @property {boolean} [reversedDepthBuffer=false] - Whether reversed depth buffer is enabled or not.
     * @property {boolean} [alpha=true] - Whether the default framebuffer (which represents the final contents of the canvas) should be transparent or opaque.
     * @property {boolean} [depth=true] - Whether the default framebuffer should have a depth buffer or not.
     * @property {boolean} [stencil=false] - Whether the default framebuffer should have a stencil buffer or not.
     * @property {boolean} [antialias=false] - Whether MSAA as the default anti-aliasing should be enabled or not.
     * @property {number} [samples=0] - When `antialias` is `true`, `4` samples are used by default. This parameter can set to any other integer value than 0
     * to overwrite the default.
     * @property {?Function} [getFallback=null] - This callback function can be used to provide a fallback backend, if the primary backend can't be targeted.
     * @property {number} [outputBufferType=HalfFloatType] - Defines the type of output buffers. The default `HalfFloatType` is recommend for best
     * quality. To save memory and bandwidth, `UnsignedByteType` might be used. This will reduce rendering quality though.
     * @property {boolean} [multiview=false] - If set to `true`, the renderer will use multiview during WebXR rendering if supported.
     */
    /**
     * Constructs a new renderer.
     *
     * @param {Backend} backend - The backend the renderer is targeting (e.g. WebGPU or WebGL 2).
     * @param {Renderer~Options} [parameters] - The configuration parameter.

     */
    constructor(backend: Backend, parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderer: boolean;
    /**
     * A reference to the current backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * Whether the renderer should automatically clear the current rendering target
     * before execute a `render()` call. The target can be the canvas (default framebuffer)
     * or the current bound render target (custom framebuffer).
     *
     * @type {boolean}
     * @default true
     */
    autoClear: boolean;
    /**
     * When `autoClear` is set to `true`, this property defines whether the renderer
     * should clear the color buffer.
     *
     * @type {boolean}
     * @default true
     */
    autoClearColor: boolean;
    /**
     * When `autoClear` is set to `true`, this property defines whether the renderer
     * should clear the depth buffer.
     *
     * @type {boolean}
     * @default true
     */
    autoClearDepth: boolean;
    /**
     * When `autoClear` is set to `true`, this property defines whether the renderer
     * should clear the stencil buffer.
     *
     * @type {boolean}
     * @default true
     */
    autoClearStencil: boolean;
    /**
     * Whether the default framebuffer should be transparent or opaque.
     *
     * @type {boolean}
     * @default true
     */
    alpha: boolean;
    /**
     * Whether logarithmic depth buffer is enabled or not.
     *
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly logarithmicDepthBuffer: boolean;
    /**
     * Whether reversed depth buffer is enabled or not.
     *
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly reversedDepthBuffer: boolean;
    /**
     * Defines the output color space of the renderer.
     *
     * @type {string}
     * @default SRGBColorSpace
     */
    outputColorSpace: string;
    /**
     * Defines the tone mapping of the renderer.
     *
     * @type {number}
     * @default NoToneMapping
     */
    toneMapping: number;
    /**
     * Defines the tone mapping exposure.
     *
     * @type {number}
     * @default 1
     */
    toneMappingExposure: number;
    /**
     * Whether the renderer should sort its render lists or not.
     *
     * Note: Sorting is used to attempt to properly render objects that have some degree of transparency.
     * By definition, sorting objects may not work in all cases. Depending on the needs of application,
     * it may be necessary to turn off sorting and use other methods to deal with transparency rendering
     * e.g. manually determining each object's rendering order.
     *
     * @type {boolean}
     * @default true
     */
    sortObjects: boolean;
    /**
     * Whether the default framebuffer should have a depth buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    depth: boolean;
    /**
     * Whether the default framebuffer should have a stencil buffer or not.
     *
     * @type {boolean}
     * @default false
     */
    stencil: boolean;
    /**
     * Holds a series of statistical information about the GPU memory
     * and the rendering process. Useful for debugging and monitoring.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * A global context node that stores override nodes for specific transformations or calculations.
     * These nodes can be used to replace default behavior in the rendering pipeline.
     *
     * @type {ContextNode}
     * @property {Object} value - The context value object.
     */
    contextNode: ContextNode;
    /**
     * The node library defines how certain library objects like materials, lights
     * or tone mapping functions are mapped to node types. This is required since
     * although instances of classes like `MeshBasicMaterial` or `PointLight` can
     * be part of the scene graph, they are internally represented as nodes for
     * further processing.
     *
     * @type {NodeLibrary}
     */
    library: NodeLibrary;
    /**
     * A map-like data structure for managing lights.
     *
     * @type {Lighting}
     */
    lighting: Lighting;
    /**
     * The number of MSAA samples.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _samples;
    /**
     * Callback when the canvas has been resized.
     *
     * @private
     */
    private _onCanvasTargetResize;
    /**
     * Callback when a canvas target has been disposed.
     *
     * @private
     * @param {Object} event - The dispose event.
     */
    private _onCanvasTargetDispose;
    /**
     * The canvas target for rendering.
     *
     * @private
     * @type {CanvasTarget}
     */
    private _canvasTarget;
    /**
     * The inspector provides information about the internal renderer state.
     *
     * @private
     * @type {InspectorBase}
     */
    private _inspector;
    /**
     * This callback function can be used to provide a fallback backend, if the primary backend can't be targeted.
     *
     * @private
     * @type {?Function}
     */
    private _getFallback;
    /**
     * A reference to a renderer module for managing shader attributes.
     *
     * @private
     * @type {?Attributes}
     * @default null
     */
    private _attributes;
    /**
     * A reference to a renderer module for managing geometries.
     *
     * @private
     * @type {?Geometries}
     * @default null
     */
    private _geometries;
    /**
     * A reference to a renderer module for managing node related logic.
     *
     * @private
     * @type {?NodeManager}
     * @default null
     */
    private _nodes;
    /**
     * A reference to a renderer module for managing the internal animation loop.
     *
     * @private
     * @type {?Animation}
     * @default null
     */
    private _animation;
    /**
     * A reference to a renderer module for managing shader program bindings.
     *
     * @private
     * @type {?Bindings}
     * @default null
     */
    private _bindings;
    /**
     * A reference to a renderer module for managing render objects.
     *
     * @private
     * @type {?RenderObjects}
     * @default null
     */
    private _objects;
    /**
     * A reference to a renderer module for managing render and compute pipelines.
     *
     * @private
     * @type {?Pipelines}
     * @default null
     */
    private _pipelines;
    /**
     * A reference to a renderer module for managing render bundles.
     *
     * @private
     * @type {?RenderBundles}
     * @default null
     */
    private _bundles;
    /**
     * A reference to a renderer module for managing render lists.
     *
     * @private
     * @type {?RenderLists}
     * @default null
     */
    private _renderLists;
    /**
     * A reference to a renderer module for managing render contexts.
     *
     * @private
     * @type {?RenderContexts}
     * @default null
     */
    private _renderContexts;
    /**
     * A reference to a renderer module for managing textures.
     *
     * @private
     * @type {?Textures}
     * @default null
     */
    private _textures;
    /**
     * A reference to a renderer module for backgrounds.
     *
     * @private
     * @type {?Background}
     * @default null
     */
    private _background;
    /**
     * Cache for the fullscreen quad.
     * This fullscreen quad is used for internal render passes
     * like the tone mapping and color space output pass.
     *
     * @private
     * @type {Map<Texture,QuadMesh>}
     */
    private _quadCache;
    /**
     * A reference to the current render context.
     *
     * @private
     * @type {?RenderContext}
     * @default null
     */
    private _currentRenderContext;
    /**
     * A custom sort function for the opaque render list.
     *
     * @private
     * @type {?Function}
     * @default null
     */
    private _opaqueSort;
    /**
     * A custom sort function for the transparent render list.
     *
     * @private
     * @type {?Function}
     * @default null
     */
    private _transparentSort;
    /**
     * Cache of framebuffer targets per canvas target.
     *
     * @private
     * @type {Map<CanvasTarget, RenderTarget>}
     */
    private _frameBufferTargets;
    /**
     * The clear color value.
     *
     * @private
     * @type {Color4}
     */
    private _clearColor;
    /**
     * The clear depth value.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _clearDepth;
    /**
     * The clear stencil value.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _clearStencil;
    /**
     * The current render target.
     *
     * @private
     * @type {?RenderTarget}
     * @default null
     */
    private _renderTarget;
    /**
     * The active cube face.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _activeCubeFace;
    /**
     * The active mipmap level.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _activeMipmapLevel;
    /**
     * The current output render target.
     *
     * @private
     * @type {?RenderTarget}
     * @default null
     */
    private _outputRenderTarget;
    /**
     * The MRT setting.
     *
     * @private
     * @type {?MRTNode}
     * @default null
     */
    private _mrt;
    /**
     * This function defines how a render object is going
     * to be rendered.
     *
     * @private
     * @type {?Function}
     * @default null
     */
    private _renderObjectFunction;
    /**
     * Used to keep track of the current render object function.
     *
     * @private
     * @type {?Function}
     * @default null
     */
    private _currentRenderObjectFunction;
    /**
     * Used to keep track of the current render bundle.
     *
     * @private
     * @type {?RenderBundle}
     * @default null
     */
    private _currentRenderBundle;
    /**
     * Next to `_renderObjectFunction()`, this function provides another hook
     * for influencing the render process of a render object. It is meant for internal
     * use and only relevant for `compileAsync()` right now. Instead of using
     * the default logic of `_renderObjectDirect()` which actually draws the render object,
     * a different function might be used which performs no draw but just the node
     * and pipeline updates.
     *
     * @private
     * @type {Function}
     */
    private _handleObjectFunction;
    /**
     * Indicates whether the device has been lost or not. In WebGL terms, the device
     * lost is considered as a context lost. When this is set to `true`, rendering
     * isn't possible anymore.
     *
     * @private
     * @type {boolean}
     * @default false
     */
    private _isDeviceLost;
    /**
     * A callback function that defines what should happen when a device/context lost occurs.
     *
     * @type {Function}
     */
    onDeviceLost: Function;
    /**
     * A callback function that defines what should happen when an uncaptured
     * backend error is reported (e.g. a WebGPU validation/out-of-memory/internal
     * error raised outside an error scope). Applications can override this to
     * surface errors in their own UI without letting them escalate to a device
     * loss. The default implementation logs to the console.
     *
     * @type {Function}
     */
    onError: Function;
    /**
     * Defines the type of output buffers. The default `HalfFloatType` is recommend for
     * best quality. To save memory and bandwidth, `UnsignedByteType` might be used.
     * This will reduce rendering quality though.
     *
     * @private
     * @type {number}
     * @default HalfFloatType
     */
    private _outputBufferType;
    /**
     * A cache for shadow nodes per material
     *
     * @private
     * @type {WeakMap<Material, Object>}
     */
    private _cacheShadowNodes;
    /**
     * Whether the renderer has been initialized or not.
     *
     * @private
     * @type {boolean}
     * @default false
     */
    private _initialized;
    /**
     * The call depth of the renderer. Counts the number of
     * nested render calls.
     *
     * @private
     * @type {number}
     * @default - 1
     */
    private _callDepth;
    /**
     * A reference to the promise which initializes the renderer.
     *
     * @private
     * @type {?Promise<this>}
     * @default null
     */
    private _initPromise;
    /**
     * An array of compilation promises which are used in `compileAsync()`.
     *
     * @private
     * @type {?Array<Promise>}
     * @default null
     */
    private _compilationPromises;
    /**
     * The state of the current precompilation in `compileAsync()`.
     * `null` when the renderer is not precompiling.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _precompilationState;
    /**
     * When an override material is in use, this property points to the current
     * source material during the rendering of a render object.
     *
     * @private
     * @type {?Material}
     * @default null
     */
    private _currentSourceMaterial;
    /**
     * Whether the renderer should render transparent render objects or not.
     *
     * @type {boolean}
     * @default true
     */
    transparent: boolean;
    /**
     * Whether the renderer should render opaque render objects or not.
     *
     * @type {boolean}
     * @default true
     */
    opaque: boolean;
    /**
     * Shadow map configuration
     * @typedef {Object} ShadowMapConfig
     * @property {boolean} enabled - Whether to globally enable shadows or not.
     * @property {boolean} transmitted - Whether to enable light transmission through non-opaque materials.
     * @property {number} type - The shadow map type.
     */
    /**
     * The renderer's shadow configuration.
     *
     * @type {ShadowMapConfig}
     */
    shadowMap: {
        /**
         * - Whether to globally enable shadows or not.
         */
        enabled: boolean;
        /**
         * - Whether to enable light transmission through non-opaque materials.
         */
        transmitted: boolean;
        /**
         * - The shadow map type.
         */
        type: number;
    };
    /**
     * XR configuration.
     * @typedef {Object} XRConfig
     * @property {boolean} enabled - Whether to globally enable XR or not.
     */
    /**
     * The renderer's XR manager.
     *
     * @type {XRManager}
     */
    xr: XRManager;
    /**
     * Debug configuration.
     * @typedef {Object} DebugConfig
     * @property {boolean} checkShaderErrors - Whether shader errors should be checked or not.
     * @property {Object} diagnostics - Diagnostics configuration for the shader generation.
     * @property {boolean} diagnostics.keywords - Whether declaration names that collide with reserved keywords should be renamed or not.
     * @property {?Function} onNodeBuilderCreated - A callback function that is executed after a node builder has been created and before it is built.
     * @property {?Function} onShaderError - A callback function that is executed when a shader error happens. Only supported with WebGL 2 right now.
     * @property {Function} getShaderAsync - Allows the get the raw shader code for the given scene, camera and 3D object.
     */
    /**
     * The renderer's debug configuration.
     *
     * @type {DebugConfig}
     */
    debug: {
        /**
         * - Whether shader errors should be checked or not.
         */
        checkShaderErrors: boolean;
        /**
         * - Diagnostics configuration for the shader generation.
         */
        diagnostics: {
            keywords: boolean;
        };
        /**
         * - A callback function that is executed after a node builder has been created and before it is built.
         */
        onNodeBuilderCreated: Function | null;
        /**
         * - A callback function that is executed when a shader error happens. Only supported with WebGL 2 right now.
         */
        onShaderError: Function | null;
        /**
         * - Allows the get the raw shader code for the given scene, camera and 3D object.
         */
        getShaderAsync: Function;
    };
    /**
     * Initializes the renderer so it is ready for usage.
     *
     * @async
     * @return {Promise<this>} A Promise that resolves when the renderer has been initialized.
     */
    init(): Promise<this>;
    /**
     * A reference to the canvas element the renderer is drawing to.
     * This value of this property will automatically be created by
     * the renderer.
     *
     * @type {HTMLCanvasElement|OffscreenCanvas}
     */
    get domElement(): HTMLCanvasElement | OffscreenCanvas;
    /**
     * The coordinate system of the renderer. The value of this property
     * depends on the selected backend. Either `THREE.WebGLCoordinateSystem` or
     * `THREE.WebGPUCoordinateSystem`.
     *
     * @readonly
     * @type {number}
     */
    readonly get coordinateSystem(): number;
    /**
     * Compiles all materials in the given scene. This can be useful to avoid a
     * phenomenon which is called "shader compilation stutter", which occurs when
     * rendering an object with a new shader for the first time.
     *
     * If you want to add a 3D object to an existing scene, use the third optional
     * parameter for applying the target scene. Note that the (target) scene's lighting
     * and environment must be configured before calling this method.
     *
     * @async
     * @param {Object3D} scene - The scene or 3D object to precompile.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {?Scene} targetScene - If the first argument is a 3D object, this parameter must represent the scene the 3D object is going to be added.
     * @param {onProgressCallback} [onProgress] - Executed while the compilation is in progress.
     * @return {Promise} A Promise that resolves when the compile has been finished.
     */
    compileAsync(scene: Object3D, camera: Camera, targetScene?: Scene | null, onProgress?: onProgressCallback): Promise<any>;
    /**
     * Sets up the renderer state for precompiling in `compileAsync()`.
     * The state must be restored with `_finishPreCompile()` before yielding to the main thread,
     * otherwise it leaks into renders executed in the meantime.
     *
     * @private
     * @param {Object} precompilationState - The precompilation state.
     */
    private _beginPreCompile;
    /**
     * Restores the renderer state after precompiling in `compileAsync()`.
     *
     * @private
     */
    private _finishPreCompile;
    /**
     * Compile compute programs. This can be useful to avoid a
     * phenomenon which is called "shader compilation stutter", which occurs when
     * rendering an object with a new shader for the first time.
     *
     * @async
     * @param {Node|Array<Node>} computeNodes - The compute node(s).
     * @param {onProgressCallback} [onProgress] - Executed while the compilation is in progress.
     * @return {Promise} A Promise that resolves when the compile has been finished.
     */
    compileComputeAsync(computeNodes: Node | Array<Node>, onProgress?: onProgressCallback): Promise<any>;
    /**
     * Renders the scene in an async fashion.
     *
     * @async
     * @deprecated
     * @param {Object3D} scene - The scene or 3D object to render.
     * @param {Camera} camera - The camera.
     * @return {Promise} A Promise that resolves when the render has been finished.
     */
    renderAsync(scene: Object3D, camera: Camera): Promise<any>;
    /**
     * Can be used to synchronize CPU operations with GPU tasks. So when this method is called,
     * the CPU waits for the GPU to complete its operation (e.g. a compute task).
     *
     * @async
     * @deprecated
     * @return {Promise} A Promise that resolves when synchronization has been finished.
     */
    waitForGPU(): Promise<any>;
    set inspector(value: InspectorBase);
    /**
     * The inspector instance. The inspector can be any class that extends from `InspectorBase`.
     *
     * @type {InspectorBase}
     */
    get inspector(): InspectorBase;
    /**
     * Enables or disables high precision for model-view and normal-view matrices.
     * When enabled, will use CPU 64-bit precision for higher precision instead of GPU 32-bit for higher performance.
     *
     * NOTE: 64-bit precision is not compatible with `InstancedMesh` and `SkinnedMesh`.
     *
     * @param {boolean} value - Whether to enable or disable high precision.
     * @type {boolean}
     */
    set highPrecision(value: boolean);
    /**
     * Returns whether high precision is enabled or not.
     *
     * @return {boolean} Whether high precision is enabled or not.
     * @type {boolean}
     */
    get highPrecision(): boolean;
    /**
     * Sets the given MRT configuration.
     *
     * @param {MRTNode} mrt - The MRT node to set.
     * @return {Renderer} A reference to this renderer.
     */
    setMRT(mrt: MRTNode): Renderer;
    /**
     * Returns the MRT configuration.
     *
     * @return {MRTNode} The MRT configuration.
     */
    getMRT(): MRTNode;
    /**
     * Returns the output buffer type.
     *
     * @return {number} The output buffer type.
     */
    getOutputBufferType(): number;
    /**
     * Returns the output buffer type.
     *
     * @deprecated since r182. Use `.getOutputBufferType()` instead.
     * @return {number} The output buffer type.
     */
    getColorBufferType(): number;
    /**
     * Default implementation of the device lost callback.
     *
     * @private
     * @param {Object} info - Information about the context lost.
     */
    private _onDeviceLost;
    /**
     * Default implementation of the uncaptured backend error callback.
     *
     * @private
     * @param {Object} info - Information about the uncaptured error.
     */
    private _onError;
    /**
     * Returns `true` if the cached GPU render bundle for the given bundle group is
     * out-of-date and must be recorded again.
     *
     * @private
     * @param {BundleGroup} bundleGroup - The bundle group.
     * @param {Object} renderBundleData - The backend data of the render bundle.
     * @return {boolean} Whether the cached render bundle needs an update.
     */
    private _bundleNeedsUpdate;
    /**
     * Renders the given render bundle.
     *
     * @private
     * @param {Object} bundle - Render bundle data.
     * @param {Scene} sceneRef - The scene the render bundle belongs to.
     * @param {LightsNode} lightsNode - The lights node.
     */
    private _renderBundle;
    /**
     * Renders the scene or 3D object with the given camera. This method can only be called
     * if the renderer has been initialized. When using `render()` inside an animation loop,
     * it's guaranteed the renderer will be initialized. The animation loop must be defined
     * with {@link Renderer#setAnimationLoop} though.
     *
     * For all other use cases (like when using on-demand rendering), you must call
     * {@link Renderer#init} before rendering.
     *
     * The target of the method is the default framebuffer (meaning the canvas)
     * or alternatively a render target when specified via `setRenderTarget()`.
     *
     * @param {Object3D} scene - The scene or 3D object to render.
     * @param {Camera} camera - The camera to render the scene with.
     */
    render(scene: Object3D, camera: Camera): void;
    /**
     * Returns whether the renderer has been initialized or not.
     *
     * @readonly
     * @return {boolean} Whether the renderer has been initialized or not.
     */
    readonly get initialized(): boolean;
    _renderOutputLayers(quad: any, renderTarget: any): void;
    /**
     * Returns an internal render target which is used when computing the output tone mapping
     * and color space conversion. Unlike in `WebGLRenderer`, this is done in a separate render
     * pass and not inline to achieve more correct results.
     *
     * @private
     * @return {?RenderTarget} The render target. The method returns `null` if no output conversion should be applied.
     */
    private _getFrameBufferTarget;
    /**
     * Renders the scene or 3D object with the given camera.
     *
     * @private
     * @param {Object3D} scene - The scene or 3D object to render.
     * @param {Camera} camera - The camera to render the scene with.
     * @param {boolean} [useFrameBufferTarget=true] - Whether to use a framebuffer target or not.
     * @return {RenderContext} The current render context.
     */
    private _renderScene;
    _setXRLayerSize(width: any, height: any): void;
    /**
     * The output pass performs tone mapping and color space conversion.
     *
     * @private
     * @param {RenderTarget} renderTarget - The current render target.
     */
    private _renderOutput;
    /**
     * Returns the maximum available anisotropy for texture filtering.
     *
     * @return {number} The maximum available anisotropy.
     */
    getMaxAnisotropy(): number;
    /**
     * Returns the active cube face.
     *
     * @return {number} The active cube face.
     */
    getActiveCubeFace(): number;
    /**
     * Returns the active mipmap level.
     *
     * @return {number} The active mipmap level.
     */
    getActiveMipmapLevel(): number;
    /**
     * Applications are advised to always define the animation loop
     * with this method and not manually with `requestAnimationFrame()`
     * for best compatibility.
     *
     * @async
     * @param {?onAnimationCallback} callback - The application's animation loop.
     * @return {Promise} A Promise that resolves when the set has been executed.
     */
    setAnimationLoop(callback: onAnimationCallback | null): Promise<any>;
    /**
     * Returns the current animation loop callback.
     *
     * @return {?Function} The current animation loop callback.
     */
    getAnimationLoop(): Function | null;
    /**
     * Can be used to transfer buffer data from a storage buffer attribute
     * from the GPU to the CPU in context of compute shaders.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: (ReadbackBuffer | ArrayBuffer) | null, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
    /**
     * Returns the rendering context.
     *
     * @return {GPUCanvasContext|WebGL2RenderingContext} The rendering context.
     */
    getContext(): GPUCanvasContext | WebGL2RenderingContext;
    /**
     * Returns the pixel ratio.
     *
     * @return {number} The pixel ratio.
     */
    getPixelRatio(): number;
    /**
     * Returns the drawing buffer size in physical pixels. This method honors the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The drawing buffer size.
     */
    getDrawingBufferSize(target: Vector2): Vector2;
    /**
     * Returns the renderer's size in logical pixels. This method does not honor the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The renderer's size in logical pixels.
     */
    getSize(target: Vector2): Vector2;
    /**
     * Sets the given pixel ratio and resizes the canvas if necessary.
     *
     * @param {number} [value=1] - The pixel ratio.
     */
    setPixelRatio(value?: number): void;
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
    setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;
    /**
     * Sets the size of the renderer.
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     * @param {boolean} [updateStyle=true] - Whether to update the `style` attribute of the canvas or not.
     */
    setSize(width: number, height: number, updateStyle?: boolean): void;
    /**
     * Defines a manual sort function for the opaque render list.
     * Pass `null` to use the default sort.
     *
     * @param {Function} method - The sort function.
     */
    setOpaqueSort(method: Function): void;
    /**
     * Defines a manual sort function for the transparent render list.
     * Pass `null` to use the default sort.
     *
     * @param {Function} method - The sort function.
     */
    setTransparentSort(method: Function): void;
    /**
     * Returns the scissor rectangle.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The scissor rectangle.
     */
    getScissor(target: Vector4): Vector4;
    /**
     * Defines the scissor rectangle.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the upper left corner of the box in logical pixel unit.
     * Instead of passing four arguments, the method also works with a single four-dimensional vector.
     * @param {number} y - The vertical coordinate for the upper left corner of the box in logical pixel unit.
     * @param {number} width - The width of the scissor box in logical pixel unit.
     * @param {number} height - The height of the scissor box in logical pixel unit.
     */
    setScissor(x: number | Vector4, y: number, width: number, height: number): void;
    /**
     * Returns the scissor test value.
     *
     * @return {boolean} Whether the scissor test should be enabled or not.
     */
    getScissorTest(): boolean;
    /**
     * Defines the scissor test.
     *
     * @param {boolean} boolean - Whether the scissor test should be enabled or not.
     */
    setScissorTest(boolean: boolean): void;
    /**
     * Resets the backend's internal state cache. Useful when the rendering context is shared with
     * other libraries that change the state. A no-op for the WebGPU backend.
     */
    resetState(): void;
    /**
     * Returns the viewport definition.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The viewport definition.
     */
    getViewport(target: Vector4): Vector4;
    /**
     * Defines the viewport.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the upper left corner of the viewport origin in logical pixel unit.
     * @param {number} y - The vertical coordinate for the upper left corner of the viewport origin in logical pixel unit.
     * @param {number} width - The width of the viewport in logical pixel unit.
     * @param {number} height - The height of the viewport in logical pixel unit.
     * @param {number} minDepth - The minimum depth value of the viewport. WebGPU only.
     * @param {number} maxDepth - The maximum depth value of the viewport. WebGPU only.
     */
    setViewport(x: number | Vector4, y: number, width: number, height: number, minDepth?: number, maxDepth?: number): void;
    /**
     * Returns the clear color.
     *
     * @param {Color} target - The method writes the result in this target object.
     * @return {Color} The clear color.
     */
    getClearColor(target: Color): Color;
    /**
     * Defines the clear color and optionally the clear alpha.
     *
     * @param {Color} color - The clear color.
     * @param {number} [alpha=1] - The clear alpha.
     */
    setClearColor(color: Color, alpha?: number): void;
    /**
     * Returns the clear alpha.
     *
     * @return {number} The clear alpha.
     */
    getClearAlpha(): number;
    /**
     * Defines the clear alpha.
     *
     * @param {number} alpha - The clear alpha.
     */
    setClearAlpha(alpha: number): void;
    /**
     * Returns the clear depth.
     *
     * @return {number} The clear depth.
     */
    getClearDepth(): number;
    /**
     * Defines the clear depth.
     *
     * @param {number} depth - The clear depth.
     */
    setClearDepth(depth: number): void;
    /**
     * Returns the clear stencil.
     *
     * @return {number} The clear stencil.
     */
    getClearStencil(): number;
    /**
     * Defines the clear stencil.
     *
     * @param {number} stencil - The clear stencil.
     */
    setClearStencil(stencil: number): void;
    /**
     * This method performs an occlusion query for the given 3D object.
     * It returns `true` if the given 3D object is fully occluded by other
     * 3D objects in the scene.
     *
     * @param {Object3D} object - The 3D object to test.
     * @return {boolean} Whether the 3D object is fully occluded or not.
     */
    isOccluded(object: Object3D): boolean;
    /**
     * Performs a manual clear operation. This method ignores `autoClear` properties.
     *
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear(color?: boolean, depth?: boolean, stencil?: boolean): void;
    /**
     * Performs a manual clear operation of the color buffer. This method ignores `autoClear` properties.
     */
    clearColor(): void;
    /**
     * Performs a manual clear operation of the depth buffer. This method ignores `autoClear` properties.
     */
    clearDepth(): void;
    /**
     * Performs a manual clear operation of the stencil buffer. This method ignores `autoClear` properties.
     */
    clearStencil(): void;
    /**
     * Async version of {@link Renderer#clear}.
     *
     * @async
     * @deprecated
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     * @return {Promise} A Promise that resolves when the clear operation has been executed.
     */
    clearAsync(color?: boolean, depth?: boolean, stencil?: boolean): Promise<any>;
    /**
     * Async version of {@link Renderer#clearColor}.
     *
     * @async
     * @deprecated
     * @return {Promise} A Promise that resolves when the clear operation has been executed.
     */
    clearColorAsync(): Promise<any>;
    /**
     * Async version of {@link Renderer#clearDepth}.
     *
     * @async
     * @deprecated
     * @return {Promise} A Promise that resolves when the clear operation has been executed.
     */
    clearDepthAsync(): Promise<any>;
    /**
     * Async version of {@link Renderer#clearStencil}.
     *
     * @async
     * @deprecated
     * @return {Promise} A Promise that resolves when the clear operation has been executed.
     */
    clearStencilAsync(): Promise<any>;
    /**
     * Returns `true` if a framebuffer target is needed to perform tone mapping or color space conversion.
     * If this is the case, the renderer allocates an internal render target for that purpose.
     *
     * @type {boolean}
     */
    get needsFrameBufferTarget(): boolean;
    /**
     * The number of samples used for multi-sample anti-aliasing (MSAA).
     *
     * @type {number}
     * @default 0
     */
    get samples(): number;
    /**
     * The current number of samples used for multi-sample anti-aliasing (MSAA).
     *
     * When rendering to a custom render target, the number of samples of that render target is used.
     * The number of samples is set to 0 when the renderer needs an internal framebuffer target for
     * tone mapping or color space conversion, or when rendering a fullscreen quad to screen.
     *
     * @type {number}
     */
    get currentSamples(): number;
    /**
     * The current tone mapping of the renderer. When not producing screen output,
     * the tone mapping is always `NoToneMapping`.
     *
     * @type {number}
     */
    get currentToneMapping(): number;
    /**
     * The current color space of the renderer. When not producing screen output,
     * the color space is always the working color space.
     *
     * @type {string}
     */
    get currentColorSpace(): string;
    /**
     * Returns `true` if the rendering settings are set to screen output.
     *
     * @returns {boolean} True if the current render target is the same of output render target or `null`, otherwise false.
     */
    get isOutputTarget(): boolean;
    /**
     * Frees all internal resources of the renderer. Call this method if the renderer
     * is no longer in use by your app.
     */
    dispose(): Promise<void>;
    /**
     * Sets the given render target. Calling this method means the renderer does not
     * target the default framebuffer (meaning the canvas) anymore but a custom framebuffer.
     * Use `null` as the first argument to reset the state.
     *
     * @param {?RenderTarget} renderTarget - The render target to set.
     * @param {number} [activeCubeFace=0] - The active cube face.
     * @param {number} [activeMipmapLevel=0] - The active mipmap level.
     */
    setRenderTarget(renderTarget: RenderTarget | null, activeCubeFace?: number, activeMipmapLevel?: number): void;
    /**
     * Returns the current render target.
     *
     * @return {?RenderTarget} The render target. Returns `null` if no render target is set.
     */
    getRenderTarget(): RenderTarget | null;
    /**
     * Sets the output render target for the renderer.
     *
     * @param {?RenderTarget} renderTarget - The render target to set as the output target.
     */
    setOutputRenderTarget(renderTarget: RenderTarget | null): void;
    /**
     * Returns the current output target.
     *
     * @return {?RenderTarget} The current output render target. Returns `null` if no output target is set.
     */
    getOutputRenderTarget(): RenderTarget | null;
    /**
     * Sets the canvas target. The canvas target manages the HTML canvas
     * or the offscreen canvas the renderer draws into.
     *
     * @param {CanvasTarget} canvasTarget - The canvas target.
     */
    setCanvasTarget(canvasTarget: CanvasTarget): void;
    /**
     * Returns the current canvas target.
     *
     * @return {CanvasTarget} The current canvas target.
     */
    getCanvasTarget(): CanvasTarget;
    /**
     * Resets the renderer to the initial state before WebXR started.
     *
     * @private
     */
    private _resetXRState;
    /**
     * Callback for {@link Renderer#setRenderObjectFunction}.
     *
     * @callback renderObjectFunction
     * @param {Object3D} object - The 3D object.
     * @param {Scene} scene - The scene the 3D object belongs to.
     * @param {Camera} camera - The camera the object should be rendered with.
     * @param {BufferGeometry} geometry - The object's geometry.
     * @param {Material} material - The object's material.
     * @param {?Object} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {LightsNode} lightsNode - The current lights node.
     * @param {ClippingContext} clippingContext - The clipping context.
     * @param {?string} [passId=null] - An optional ID for identifying the pass.
     */
    /**
     * Sets the given render object function. Calling this method overwrites the default implementation
     * which is {@link Renderer#renderObject}. Defining a custom function can be useful
     * if you want to modify the way objects are rendered. For example you can define things like "every
     * object that has material of a certain type should perform a pre-pass with a special overwrite material".
     * The custom function must always call `renderObject()` in its implementation.
     *
     * Use `null` as the first argument to reset the state.
     *
     * @param {?renderObjectFunction} renderObjectFunction - The render object function.
     */
    setRenderObjectFunction(renderObjectFunction: ((object: Object3D, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Object | null, lightsNode: LightsNode, clippingContext: ClippingContext, passId?: string | null | undefined) => any) | null): void;
    /**
     * Returns the current render object function.
     *
     * @return {?Function} The current render object function. Returns `null` if no function is set.
     */
    getRenderObjectFunction(): Function | null;
    /**
     * Execute a single or an array of compute nodes. This method can only be called
     * if the renderer has been initialized.
     *
     * @param {Node|Array<Node>} computeNodes - The compute node(s).
     * @param {number|Array<number>|IndirectStorageBufferAttribute} [dispatchSize=null]
     * - A single number representing count, or
     * - An array [x, y, z] representing dispatch size, or
     * - A IndirectStorageBufferAttribute for indirect dispatch size.
     * @return {Promise|undefined} A Promise that resolve when the compute has finished. Only returned when the renderer has not been initialized.
     */
    compute(computeNodes: Node | Array<Node>, dispatchSize?: number | Array<number> | IndirectStorageBufferAttribute): Promise<any> | undefined;
    /**
     * Execute a single or an array of compute nodes.
     *
     * @async
     * @param {Node|Array<Node>} computeNodes - The compute node(s).
     * @param {number|Array<number>|IndirectStorageBufferAttribute} [dispatchSize=null]
     * - A single number representing count, or
     * - An array [x, y, z] representing dispatch size, or
     * - A IndirectStorageBufferAttribute for indirect dispatch size.
     * @return {Promise} A Promise that resolve when the compute has finished.
     */
    computeAsync(computeNodes: Node | Array<Node>, dispatchSize?: number | Array<number> | IndirectStorageBufferAttribute): Promise<any>;
    /**
     * Checks if the given feature is supported by the selected backend.
     *
     * @async
     * @deprecated
     * @param {string} name - The feature's name.
     * @return {Promise<boolean>} A Promise that resolves with a bool that indicates whether the feature is supported or not.
     */
    hasFeatureAsync(name: string): Promise<boolean>;
    resolveTimestampsAsync(type?: string): Promise<number>;
    /**
     * Checks if the given feature is supported by the selected backend. If the
     * renderer has not been initialized, this method always returns `false`.
     *
     * @param {string} name - The feature's name.
     * @return {boolean} Whether the feature is supported or not.
     */
    hasFeature(name: string): boolean;
    /**
     * Returns `true` when the renderer has been initialized.
     *
     * @return {boolean} Whether the renderer has been initialized or not.
     */
    hasInitialized(): boolean;
    /**
     * Initializes the given textures. Useful for preloading a texture rather than waiting until first render
     * (which can cause noticeable lags due to decode and GPU upload overhead).
     *
     * @async
     * @deprecated
     * @param {Texture} texture - The texture.
     * @return {Promise} A Promise that resolves when the texture has been initialized.
     */
    initTextureAsync(texture: Texture): Promise<any>;
    /**
     * Initializes the given texture. Useful for preloading a texture rather than waiting until first render
     * (which can cause noticeable lags due to decode and GPU upload overhead).
     *
     * This method can only be used if the renderer has been initialized.
     *
     * @param {Texture} texture - The texture.
     */
    initTexture(texture: Texture): void;
    /**
     * Initializes the given render target.
     *
     * @param {RenderTarget} renderTarget - The render target to intialize.
     */
    initRenderTarget(renderTarget: RenderTarget): void;
    /**
     * Copies the current bound framebuffer into the given texture.
     *
     * @param {FramebufferTexture} framebufferTexture - The texture.
     * @param {?(Vector2|Vector4)} [rectangle=null] - A two or four dimensional vector that defines the rectangular portion of the framebuffer that should be copied.
     */
    copyFramebufferToTexture(framebufferTexture: FramebufferTexture, rectangle?: (Vector2 | Vector4) | null): void;
    /**
     * Copies data of the given source texture into a destination texture.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     * @param {Box2|Box3} [srcRegion=null] - A bounding box which describes the source region. Can be two or three-dimensional.
     * @param {Vector2|Vector3} [dstPosition=null] - A vector that represents the origin of the destination region. Can be two or three-dimensional.
     * @param {number} [srcLevel=0] - The source mip level to copy from.
     * @param {number} [dstLevel=0] - The destination mip level to copy to.
     */
    copyTextureToTexture(srcTexture: Texture, dstTexture: Texture, srcRegion?: Box2 | Box3, dstPosition?: Vector2 | Vector3, srcLevel?: number, dstLevel?: number): void;
    /**
     * Reads pixel data from the given render target.
     *
     * @async
     * @param {RenderTarget} renderTarget - The render target to read from.
     * @param {number} x - The `x` coordinate of the copy region's origin.
     * @param {number} y - The `y` coordinate of the copy region's origin.
     * @param {number} width - The width of the copy region.
     * @param {number} height - The height of the copy region.
     * @param {number} [textureIndex=0] - The texture index of a MRT render target.
     * @param {number} [faceIndex=0] - The cube face, depth slice or array layer index.
     * @return {Promise<TypedArray>} A Promise that resolves when the read has been finished. The resolve provides the read data as a typed array.
     */
    readRenderTargetPixelsAsync(renderTarget: RenderTarget, x: number, y: number, width: number, height: number, textureIndex?: number, faceIndex?: number): Promise<TypedArray>;
    /**
     * Analyzes the given 3D object's hierarchy and builds render lists from the
     * processed hierarchy.
     *
     * @private
     * @param {Object3D} object - The 3D object to process (usually a scene).
     * @param {Camera} camera - The camera the object is rendered with.
     * @param {number} groupOrder - The group order is derived from the `renderOrder` of groups and is used to group 3D objects within groups.
     * @param {RenderList} renderList - The current render list.
     * @param {ClippingContext} clippingContext - The current clipping context.
     */
    private _projectObject;
    /**
     * Renders the given render bundles.
     *
     * @private
     * @param {Array<Object>} bundles - Array with render bundle data.
     * @param {Scene} sceneRef - The scene the render bundles belong to.
     * @param {LightsNode} lightsNode - The current lights node.
     */
    private _renderBundles;
    /**
     * Renders the transparent objects from the given render lists.
     *
     * @private
     * @param {Array<Object>} renderList - The transparent render list.
     * @param {Array<Object>} doublePassList - The list of transparent objects which require a double pass (e.g. because of transmission).
     * @param {Camera} camera - The camera the render list should be rendered with.
     * @param {Scene} scene - The scene the render list belongs to.
     * @param {LightsNode} lightsNode - The current lights node.
     */
    private _renderTransparents;
    /**
     * Renders the objects from the given render list.
     *
     * @private
     * @param {Array<Object>} renderList - The render list.
     * @param {Camera} camera - The camera the render list should be rendered with.
     * @param {Scene} scene - The scene the render list belongs to.
     * @param {LightsNode} lightsNode - The current lights node.
     * @param {?string} [passId=null] - An optional ID for identifying the pass.
     */
    private _renderObjects;
    /**
     * Retrieves shadow nodes for the given material. This is used to setup shadow passes.
     * The result is cached per material and updated when the material's version changes.
     *
     * @private
     * @param {Material} material
     * @returns {Object} - The shadow nodes for the material.
     */
    private _getShadowNodes;
    /**
     * Updates the camera so it's prepared for rendering operations.
     *
     * @private
     * @param {Camera} camera - The camera to update.
     * @param {boolean} useXRCamera - Whether the XR camera should be used when presenting.
     * @return {Camera} The returned camera might be different depending on whether XR is used or not.
     */
    private _updateCamera;
    /**
     * Updates the indirect storage attribute that defines the dispatch size
     * of the given compute node, if any.
     *
     * @private
     * @param {ComputeNode} computeNode - The compute node.
     * @param {?(number|Array<number>|IndirectStorageBufferAttribute)} dispatchSize - The dispatch size of the compute call.
     */
    private _updateDispatchSize;
    /**
     * This method represents the default render object function that manages the render lifecycle
     * of the object.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Scene} scene - The scene the 3D object belongs to.
     * @param {Camera} camera - The camera the object should be rendered with.
     * @param {BufferGeometry} geometry - The object's geometry.
     * @param {Material} material - The object's material.
     * @param {?Object} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {LightsNode} lightsNode - The current lights node.
     * @param {?ClippingContext} clippingContext - The clipping context.
     * @param {?string} [passId=null] - An optional ID for identifying the pass.
     */
    renderObject(object: Object3D, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Object | null, lightsNode: LightsNode, clippingContext?: ClippingContext | null, passId?: string | null): void;
    /**
     * Checks if the given compatibility is supported by the selected backend.
     *
     * @param {string} name - The compatibility's name.
     * @return {boolean} Whether the compatibility is supported or not.
     */
    hasCompatibility(name: string): boolean;
    /**
     * This method represents the default `_handleObjectFunction` implementation which creates
     * a render object from the given data and performs the draw command with the selected backend.
     *
     * @private
     * @param {Object3D} object - The 3D object.
     * @param {Material} material - The object's material.
     * @param {Scene} scene - The scene the 3D object belongs to.
     * @param {Camera} camera - The camera the object should be rendered with.
     * @param {LightsNode} lightsNode - The current lights node.
     * @param {?{start: number, count: number}} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {ClippingContext} clippingContext - The clipping context.
     * @param {string} [passId] - An optional ID for identifying the pass.
     */
    private _renderObjectDirect;
    /**
     * A different implementation for `_handleObjectFunction` which only makes sure the object is ready for rendering.
     * Used in `compileAsync()`.
     *
     * @private
     * @param {Object3D} object - The 3D object.
     * @param {Material} material - The object's material.
     * @param {Scene} scene - The scene the 3D object belongs to.
     * @param {Camera} camera - The camera the object should be rendered with.
     * @param {LightsNode} lightsNode - The current lights node.
     * @param {?{start: number, count: number}} group - Only relevant for objects using multiple materials. This represents a group entry from the respective `BufferGeometry`.
     * @param {ClippingContext} clippingContext - The clipping context.
     * @param {string} [passId] - An optional ID for identifying the pass.
     */
    private _createObjectPipeline;
    /**
     * Frees the GPU resources of the given canvas target.
     *
     * @private
     * @param {CanvasTarget} canvasTarget - The canvas target.
     */
    private _destroyCanvasTarget;
    /**
     * Alias for `compileAsync()`.
     *
     * @method
     * @param {Object3D} scene - The scene or 3D object to precompile.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {Scene} targetScene - If the first argument is a 3D object, this parameter must represent the scene the 3D object is going to be added.
     * @param {onProgressCallback} [onProgress] - Executed while the compilation is in progress.
     * @return {function(Object3D, Camera, ?Scene, ?onProgressCallback): Promise|undefined} A Promise that resolves when the compile has been finished.
     */
    get compile(): (arg0: Object3D, arg1: Camera, arg2: Scene | null, arg3: onProgressCallback | null) => Promise<any> | undefined;
}
import { RepeatWrapping } from './three.core.js';
import { ReplaceStencilOp } from './three.core.js';
import { ReverseSubtractEquation } from './three.core.js';
import { SIGNED_R11_EAC_Format } from './three.core.js';
import { SIGNED_RED_GREEN_RGTC2_Format } from './three.core.js';
import { SIGNED_RED_RGTC1_Format } from './three.core.js';
import { SIGNED_RG11_EAC_Format } from './three.core.js';
import { SRGBColorSpace } from './three.core.js';
import { SRGBTransfer } from './three.core.js';
import { Scene } from './three.core.js';
import { ShadowMaterial } from './three.core.js';
/**
 * Node material version of {@link ShadowMaterial}.
 *
 * @augments NodeMaterial
 */
export class ShadowNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new shadow node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowNodeMaterial: boolean;
    /**
     * Setups the lighting model.
     *
     * @return {ShadowMaskModel} The lighting model.
     */
    setupLightingModel(): ShadowMaskModel;
}
import { ShortType } from './three.core.js';
import { SphereGeometry } from './three.core.js';
import { SpotLight } from './three.core.js';
/**
 * Module for representing spot lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class SpotLightNode extends AnalyticLightNode {
    /**
     * Constructs a new spot light node.
     *
     * @param {?SpotLight} [light=null] - The spot light source.
     */
    constructor(light?: SpotLight | null);
    /**
     * Uniform node representing the cone cosine.
     *
     * @type {UniformNode<float>}
     */
    coneCosNode: UniformNode<any>;
    /**
     * Uniform node representing the penumbra cosine.
     *
     * @type {UniformNode<float>}
     */
    penumbraCosNode: UniformNode<any>;
    /**
     * Uniform node representing the cutoff distance.
     *
     * @type {UniformNode<float>}
     */
    cutoffDistanceNode: UniformNode<any>;
    /**
     * Uniform node representing the decay exponent.
     *
     * @type {UniformNode<float>}
     */
    decayExponentNode: UniformNode<any>;
    /**
     * Overwritten to updated spot light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Computes the spot attenuation for the given angle.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @param {Node<float>} angleCosine - The angle to compute the spot attenuation for.
     * @return {Node<float>} The spot attenuation.
     */
    getSpotAttenuation(builder: NodeBuilder, angleCosine: Node<any>): Node<any>;
    getLightCoord(builder: any): any;
    setupDirect(builder: any): {
        lightColor: any;
        lightDirection: any;
    };
}
import { SpriteMaterial } from './three.core.js';
/**
 * Node material version of {@link SpriteMaterial}.
 *
 * @augments NodeMaterial
 */
export class SpriteNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new sprite node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSpriteNodeMaterial: boolean;
    _useSizeAttenuation: boolean;
    /**
     * The rotation of sprite materials is by default inferred from the `rotation`,
     * property. This node property allows to overwrite the default and define
     * the rotation with a node instead.
     *
     * If you don't want to overwrite the rotation but modify the existing
     * value instead, use {@link materialRotation}.
     *
     * @type {?Node<float>}
     * @default null
     */
    rotationNode: Node<any> | null;
    /**
     * This node property provides an additional way to scale sprites next to
     * `Object3D.scale`. The scale transformation based in `Object3D.scale`
     * is multiplied with the scale value of this node in the vertex shader.
     *
     * @type {?Node<vec2>}
     * @default null
     */
    scaleNode: Node<any> | null;
    /**
     * Setups the position node in view space. This method implements
     * the sprite specific vertex shader.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The position in view space.
     */
    setupPositionView(builder: NodeBuilder): Node<any>;
    set sizeAttenuation(value: boolean);
    /**
     * Whether to use size attenuation or not.
     *
     * @type {boolean}
     * @default true
     */
    get sizeAttenuation(): boolean;
}
import { SrcAlphaFactor } from './three.core.js';
import { SrcAlphaSaturateFactor } from './three.core.js';
import { SrcColorFactor } from './three.core.js';
import { StackTrace } from './three.tsl.js';
/**
 * This version of a node library represents the standard version
 * used in {@link WebGPURenderer}. It maps lights, tone mapping
 * techniques and materials to node-based implementations.
 *
 * @augments NodeLibrary
 */
export class StandardNodeLibrary extends NodeLibrary {
}
/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
export class Storage3DTexture extends Texture {
    /**
     * Constructs a new storage texture.
     *
     * @param {number} [width=1] - The storage texture's width.
     * @param {number} [height=1] - The storage texture's height.
     * @param {number} [depth=1] - The storage texture's depth.
     */
    constructor(width?: number, height?: number, depth?: number);
    isArrayTexture: boolean;
    /**
     * This defines how the texture is wrapped in the depth direction and corresponds to
     * *W* in UVW mapping.
     *
     * @type {number}
     */
    wrapR: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture: boolean;
    /**
     * Indicates whether this texture is a 3D texture.
     *
     * @type {boolean}
     *
     */
    is3DTexture: boolean;
    /**
     * Copies the values of the given texture to this instance.
     *
     * @param {Storage3DTexture} source - The texture to copy.
     * @return {Storage3DTexture} A reference to this instance.
     */
    copy(source: Storage3DTexture): Storage3DTexture;
    /**
     * Sets the size of the storage 3d texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     * @param {number} depth - The new depth of the storage texture.
     */
    setSize(width: number, height: number, depth: number): void;
}
/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
export class StorageArrayTexture extends Texture {
    /**
     * Constructs a new storage texture.
     *
     * @param {number} [width=1] - The storage texture's width.
     * @param {number} [height=1] - The storage texture's height.
     * @param {number} [depth=1] - The storage texture's depth.
     */
    constructor(width?: number, height?: number, depth?: number);
    isArrayTexture: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture: boolean;
    /**
     * Sets the size of the storage array texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     * @param {number} depth - The new depth of the storage texture.
     */
    setSize(width: number, height: number, depth: number): void;
}
import { StorageBufferAttribute } from './three.tsl.js';
/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments Texture
 */
export class StorageTexture extends Texture {
    /**
     * Constructs a new storage texture.
     *
     * @param {number} [width=1] - The storage texture's width.
     * @param {number} [height=1] - The storage texture's height.
     */
    constructor(width?: number, height?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture: boolean;
    /**
     * Sets the size of the storage texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     */
    setSize(width: number, height: number): void;
}
import { SubtractEquation } from './three.core.js';
import { SubtractiveBlending } from './three.core.js';
/**
 * This module uses cache management to create temporary variables
 * if the node is used more than once to prevent duplicate calculations.
 *
 * The class acts as a base class for many other nodes types.
 *
 * @deprecated Extend Node instead.
 * @augments Node
 */
export class TempNode extends Node {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTempNode: boolean;
    isCacheable(builder: any): boolean;
    /**
     * Whether this node is used more than once in context of other nodes.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @return {boolean} A flag that indicates if there is more than one dependency to other nodes.
     */
    hasDependencies(builder: NodeBuilder): boolean;
}
import { Texture } from './three.core.js';
import { TextureNode } from './three.tsl.js';
import { TimestampQuery } from './three.core.js';
import { Uint16BufferAttribute } from './three.core.js';
import { Uint32BufferAttribute } from './three.core.js';
import { UnsignedByteType } from './three.core.js';
import { UnsignedInt101111Type } from './three.core.js';
import { UnsignedInt248Type } from './three.core.js';
import { UnsignedInt5999Type } from './three.core.js';
import { UnsignedIntType } from './three.core.js';
import { UnsignedShort4444Type } from './three.core.js';
import { UnsignedShort5551Type } from './three.core.js';
import { UnsignedShortType } from './three.core.js';
import { VSMShadowMap } from './three.core.js';
import { VarNode } from './three.tsl.js';
import { Vector2 } from './three.core.js';
import { Vector3 } from './three.core.js';
import { Vector4 } from './three.core.js';
/**
 * Volume node material.
 *
 * @augments NodeMaterial
 */
export class VolumeNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new volume node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVolumeNodeMaterial: boolean;
    /**
     * Number of steps used for raymarching.
     *
     * @type {number}
     * @default 25
     */
    steps: number;
    /**
     * Offsets the distance a ray has been traveled through a volume.
     * Can be used to implement dithering to reduce banding.
     *
     * @type {Node<float>}
     * @default null
     */
    offsetNode: Node<any>;
    /**
     * Node used for scattering calculations.
     *
     * @type {Function|FunctionNode<vec4>}
     * @default null
     */
    scatteringNode: Function | FunctionNode<any>;
    setupLightingModel(): VolumetricLightingModel;
}
/**
 * A node builder targeting WGSL.
 *
 * This module generates WGSL shader code from node materials and also
 * generates the respective bindings and vertex buffer definitions. These
 * data are later used by the renderer to create render and compute pipelines
 * for render objects.
 *
 * @augments NodeBuilder
 */
export class WGSLNodeBuilder extends NodeBuilder {
    /**
     * Constructs a new WGSL node builder renderer.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Renderer} renderer - The renderer.
     */
    constructor(object: Object3D, renderer: Renderer);
    /**
     * A dictionary that holds for each shader stage ('vertex', 'fragment', 'compute')
     * another dictionary which manages UBOs per group ('render','frame','object').
     *
     * @type {Object<string,Object<string,NodeUniformsGroup>>}
     */
    uniformGroups: {
        [x: string]: {
            [x: string]: NodeUniformsGroup;
        };
    };
    /**
     * A dictionary that holds the assigned binding indices for each uniform group.
     * This ensures the same binding index is used across all shader stages.
     *
     * @type {Object<string,{index: number, id: number}>}
     */
    uniformGroupsBindings: {
        [x: string]: {
            index: number;
            id: number;
        };
    };
    /**
     * A dictionary that holds for each shader stage a Map of builtins.
     *
     * @type {Object<string,Map<string,Object>>}
     */
    builtins: {
        [x: string]: Map<string, Object>;
    };
    /**
     * A dictionary that holds for each shader stage a Set of directives.
     *
     * @type {Object<string,Set<string>>}
     */
    directives: {
        [x: string]: Set<string>;
    };
    /**
     * A map for managing scope arrays. Only relevant for when using
     * {@link WorkgroupInfoNode} in context of compute shaders.
     *
     * @type {Map<string,Object>}
     */
    scopedArrays: Map<string, Object>;
    /**
     * A flag that indicates that early returns are allowed.
     *
     * @type {boolean}
     * @default true
     */
    allowEarlyReturns: boolean;
    /**
     * A flag that indicates that global variables are allowed.
     *
     * @type {boolean}
     * @default true
     */
    allowGlobalVariables: boolean;
    /**
     * Generates the WGSL snippet for sampled textures.
     *
     * @private
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    private _generateTextureSample;
    /**
     * Generates the WGSL snippet when sampling textures with explicit mip level.
     *
     * @private
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    private generateTextureSampleLevel;
    /**
     * Generates a wrap function used in context of textures.
     *
     * @param {Texture} texture - The texture to generate the function for.
     * @return {string} The name of the generated function.
     */
    generateWrapFunction(texture: Texture): string;
    /**
     * Generates a WGSL variable that holds the texture dimension of the given texture.
     * It also returns information about the number of layers (elements) of an arrayed
     * texture as well as the cube face count of cube textures.
     *
     * @param {Texture} texture - The texture to generate the function for.
     * @param {string} textureProperty - The name of the video texture uniform in the shader.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @return {string} The name of the dimension variable.
     */
    generateTextureDimension(texture: Texture, textureProperty: string, levelSnippet: string): string;
    /**
     * Generates the WGSL snippet that resolves the dimensions of the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level.
     * @return {string} The WGSL snippet.
     */
    generateTextureSize(texture: Texture, textureProperty: string, levelSnippet: string): string;
    /**
     * Generates the WGSL snippet for a manual filtered texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [levelSnippet='0u'] - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @return {string} The WGSL snippet.
     */
    generateFilteredTexture(texture: Texture, textureProperty: string, uvSnippet: string, offsetSnippet: string | null, levelSnippet?: string, depthSnippet: string | null): string;
    /**
     * Generates the WGSL snippet for a texture lookup with explicit level-of-detail.
     * Since it's a lookup, no sampling or filtering is applied.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [levelSnippet='0u'] - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureLod(texture: Texture, textureProperty: string, uvSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, levelSnippet?: string): string;
    /**
     * Generates the WGSL snippet that reads a single texel from a storage texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    generateStorageTextureLoad(texture: Texture, textureProperty: string, uvIndexSnippet: string, levelSnippet: string | null, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet that reads a single texel from a texture without sampling or filtering.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureLoad(texture: Texture, textureProperty: string, uvIndexSnippet: string, levelSnippet: string | null, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet that writes a single texel to a texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvIndexSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {string} valueSnippet - A WGSL snippet that represent the new texel value.
     * @return {string} The WGSL snippet.
     */
    generateTextureStore(texture: Texture, textureProperty: string, uvIndexSnippet: string, depthSnippet: string | null, valueSnippet: string): string;
    /**
     * Returns `true` if the sampled values of the given texture should be compared against a reference value.
     *
     * @param {Texture} texture - The texture.
     * @return {boolean} Whether the sampled values of the given texture should be compared against a reference value or not.
     */
    isSampleCompare(texture: Texture): boolean;
    /**
     * Returns `true` if the given texture is unfilterable.
     *
     * @param {Texture} texture - The texture.
     * @return {boolean} Whether the given texture is unfilterable or not.
     */
    isUnfilterable(texture: Texture): boolean;
    /**
     * Generates the WGSL snippet for sampling/loading the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTexture(texture: Texture, textureProperty: string, uvSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the WGSL snippet for sampling/loading the given texture using explicit gradients.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {Array<string>} gradSnippet - An array holding both gradient WGSL snippets.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureGrad(texture: Texture, textureProperty: string, uvSnippet: string, gradSnippet: Array<string>, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the WGSL snippet for sampling a depth texture and comparing the sampled depth values
     * against a reference value.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} compareSnippet -  A WGSL snippet that represents the reference value.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureCompare(texture: Texture, textureProperty: string, uvSnippet: string, compareSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Generates the WGSL snippet for gathering four texels from the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} gatherSnippet - A WGSL snippet that represents the index of the channel to read.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureGather(texture: Texture, textureProperty: string, uvSnippet: string, gatherSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet for performing a depth comparison on four texels in the given depth texture.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} compareSnippet - A WGSL snippet that represents the reference value.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureGatherCompare(texture: Texture, textureProperty: string, uvSnippet: string, compareSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet when sampling textures with explicit mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} levelSnippet - A WGSL snippet that represents the mip level, with level 0 containing a full size version of the texture.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @return {string} The WGSL snippet.
     */
    generateTextureLevel(texture: Texture, textureProperty: string, uvSnippet: string, levelSnippet: string, depthSnippet: string | null, offsetSnippet: string | null): string;
    /**
     * Generates the WGSL snippet when sampling textures with a bias to the mip level.
     *
     * @param {Texture} texture - The texture.
     * @param {string} textureProperty - The name of the texture uniform in the shader.
     * @param {string} uvSnippet - A WGSL snippet that represents texture coordinates used for sampling.
     * @param {string} biasSnippet - A WGSL snippet that represents the bias to apply to the mip level before sampling.
     * @param {?string} depthSnippet - A WGSL snippet that represents 0-based texture array index to sample.
     * @param {?string} offsetSnippet - A WGSL snippet that represents the offset that will be applied to the unnormalized texture coordinate before sampling the texture.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The WGSL snippet.
     */
    generateTextureBias(texture: Texture, textureProperty: string, uvSnippet: string, biasSnippet: string, depthSnippet: string | null, offsetSnippet: string | null, shaderStage?: string): string;
    /**
     * Returns a WGSL snippet that represents the property name of the given node.
     *
     * @param {Node} node - The node.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The property name.
     */
    getPropertyName(node: Node, shaderStage?: string): string;
    /**
     * Returns whether the given name is a reserved keyword of WGSL.
     *
     * @param {string} name - The name to test.
     * @return {boolean} Whether the name is a reserved keyword or not.
     */
    isReservedKeyword(name: string): boolean;
    /**
     * Returns the native shader operator name for a given generic name.
     *
     * @param {string} op - The operator name to resolve.
     * @return {?string} The resolved operator name.
     */
    getFunctionOperator(op: string): string | null;
    /**
     * Returns the node access for the given node and shader stage.
     *
     * @param {StorageTextureNode|StorageBufferNode} node - The storage node.
     * @param {string} shaderStage - The shader stage.
     * @return {string} The node access.
     */
    getNodeAccess(node: StorageTextureNode | StorageBufferNode, shaderStage: string): string;
    /**
     * Returns A WGSL snippet representing the storage access.
     *
     * @param {StorageTextureNode|StorageBufferNode} node - The storage node.
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet representing the storage access.
     */
    getStorageAccess(node: StorageTextureNode | StorageBufferNode, shaderStage: string): string;
    /**
     * This method is one of the more important ones since it's responsible
     * for generating a matching binding instance for the given uniform node.
     *
     * These bindings are later used in the renderer to create bind groups
     * and layouts.
     *
     * @param {UniformNode} node - The uniform node.
     * @param {string} type - The node data type.
     * @param {string} shaderStage - The shader stage.
     * @param {?string} [name=null] - An optional uniform name.
     * @return {NodeUniform} The node uniform object.
     */
    getUniformFromNode(node: UniformNode, type: string, shaderStage: string, name?: string | null): NodeUniform;
    /**
     * This method should be used whenever builtins are required in nodes.
     * The internal builtins data structure will make sure builtins are
     * defined in the WGSL source.
     *
     * @param {string} name - The builtin name.
     * @param {string} property - The property name.
     * @param {string} type - The node data type.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {string} The property name.
     */
    getBuiltin(name: string, property: string, type: string, shaderStage?: string): string;
    /**
     * Returns `true` if the given builtin is defined in the given shader stage.
     *
     * @param {string} name - The builtin name.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
     * @return {boolean} Whether the given builtin is defined in the given shader stage or not.
     */
    hasBuiltin(name: string, shaderStage?: string): boolean;
    /**
     * Builds the given shader node.
     *
     * @param {ShaderNodeInternal} shaderNode - The shader node.
     * @return {string} The WGSL function code.
     */
    buildFunctionCode(shaderNode: ShaderNodeInternal): string;
    /**
     * Returns a builtin representing the index of a compute invocation within the scope of a workgroup load.
     *
     * @return {string} The invocation local index.
     */
    getInvocationLocalIndex(): string;
    /**
     * Overwritten as a NOP since this method is intended for the WebGL 2 backend.
     *
     * @return {null} Null.
     */
    getDrawIndex(): null;
    /**
     * Returns the frag depth builtin.
     *
     * @return {string} The frag depth builtin.
     */
    getFragDepth(): string;
    /**
     * Returns the clip distances builtin.
     *
     * @return {string} The clip distances builtin.
     */
    getClipDistance(): string;
    /**
     * Enables the given directive for the given shader stage.
     *
     * @param {string} name - The directive name.
     * @param {string} [shaderStage=this.shaderStage] - The shader stage to enable the directive for.
     */
    enableDirective(name: string, shaderStage?: string): void;
    /**
     * Returns the directives of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} A WGSL snippet that enables the directives of the given stage.
     */
    getDirectives(shaderStage: string): string;
    /**
     * Enables the 'clip_distances' directive.
     */
    enableClipDistances(): void;
    /**
     * Enables hardware clipping.
     *
     * @param {string} planeCount - The clipping plane count.
     */
    enableHardwareClipping(planeCount: string): void;
    /**
     * Returns the builtins of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} A WGSL snippet that represents the builtins of the given stage.
     */
    getBuiltins(shaderStage: string): string;
    /**
     * This method should be used when a new scoped buffer is used in context of
     * compute shaders. It adds the array to the internal data structure which is
     * later used to generate the respective WGSL.
     *
     * @param {string} name - The array name.
     * @param {string} scope - The scope.
     * @param {string} bufferType - The buffer type.
     * @param {string} bufferCount - The buffer count.
     * @param {boolean} isAtomic - Whether the array elements are atomic or not.
     * @return {string} The array name.
     */
    getScopedArray(name: string, scope: string, bufferType: string, bufferCount: string, isAtomic: boolean): string;
    /**
     * Returns the scoped arrays of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string|undefined} The WGSL snippet that defines the scoped arrays.
     * Returns `undefined` when used in the vertex or fragment stage.
     */
    getScopedArrays(shaderStage: string): string | undefined;
    /**
     * Returns the shader attributes of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the shader attributes.
     */
    getAttributes(shaderStage: string): string;
    /**
     * Returns the members of the given struct type node as a WGSL string.
     *
     * @param {StructTypeNode} struct - The struct type node.
     * @return {string} The WGSL snippet that defines the struct members.
     */
    getStructMembers(struct: StructTypeNode): string;
    /**
     * Returns the structs of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the structs.
     */
    getStructs(shaderStage: string): string;
    /**
     * Returns a WGSL string representing a variable.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @param {string} [qualifier=''] - The variable's qualifier.
     * @return {string} The WGSL snippet that defines a variable.
     */
    getVar(type: string, name: string, count?: number | null, qualifier?: string): string;
    /**
     * Returns a single const variable statement as a WGSL string for the given variable type and name.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @return {string} The WGSL snippet that defines a const variable.
     */
    generateConstStatement(type: string, name: string): string;
    /**
     * Returns a runtime read-only variable statement as a WGSL string.
     *
     * @param {string} type - The variable's type.
     * @param {string} name - The variable's name.
     * @param {?number} [count=null] - The array length.
     * @return {string} The WGSL snippet that defines a let variable.
     */
    generateLetStatement(type: string, name: string): string;
    /**
     * Returns the variables of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the variables.
     */
    getVars(shaderStage: string, global?: boolean): string;
    /**
     * Returns the varyings of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the varyings.
     */
    getVaryings(shaderStage: string): string;
    /**
     * Returns the uniforms of the given shader stage as a WGSL string.
     *
     * @param {string} shaderStage - The shader stage.
     * @return {string} The WGSL snippet that defines the uniforms.
     */
    getUniforms(shaderStage: string): string;
    /**
     * Returns the native shader method name for a given generic name.
     *
     * @param {string} method - The method name to resolve.
     * @param {?string} [output=null] - An optional output.
     * @return {string} The resolved WGSL method name.
     */
    getMethod(method: string, output?: string | null): string;
    /**
     * Returns the bitcast method name for a given input and outputType.
     *
     * @param {string} type - The output type to bitcast to.
     * @return {string} The resolved WGSL bitcast invocation.
     */
    getBitcastMethod(type: string): string;
    /**
     * Returns the float packing method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the float values are mapped to the integer range.
     * @param {string} [layout='2x16'] - The component layout of the packed integer.
     * @returns {string} The resolve WGSL float packing method name.
     */
    getFloatPackingMethod(encoding: string, layout?: string): string;
    /**
     * Returns the float unpacking method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the integer values are mapped to the float range.
     * @param {string} [layout='2x16'] - The component layout of the packed integer.
     * @returns {string} The resolve WGSL float unpacking method name.
     */
    getFloatUnpackingMethod(encoding: string, layout?: string): string;
    /**
     * Returns the native snippet for a ternary operation.
     *
     * @param {string} condSnippet - The condition determining which expression gets resolved.
     * @param {string} ifSnippet - The expression to resolve to if the condition is true.
     * @param {string} elseSnippet - The expression to resolve to if the condition is false.
     * @return {string} The resolved method name.
     */
    getTernary(condSnippet: string, ifSnippet: string, elseSnippet: string): string;
    /**
     * Whether the requested feature is available or not.
     *
     * @param {string} name - The requested feature.
     * @return {boolean} Whether the requested feature is supported or not.
     */
    isAvailable(name: string): boolean;
    /**
     * Returns the native shader method name for a given generic name.
     *
     * @private
     * @param {string} method - The method name to resolve.
     * @return {string} The resolved WGSL method name.
     */
    private _getWGSLMethod;
    /**
     * Includes the given method name into the current
     * function node.
     *
     * @private
     * @param {string} name - The method name to include.
     * @return {CodeNode} The respective code node.
     */
    private _include;
    /**
     * Returns a WGSL vertex shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getWGSLVertexCode;
    /**
     * Returns a WGSL fragment shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @return {string} The vertex shader.
     */
    private _getWGSLFragmentCode;
    /**
     * Returns a WGSL compute shader based on the given shader data.
     *
     * @private
     * @param {Object} shaderData - The shader data.
     * @param {string} workgroupSize - The workgroup size.
     * @return {string} The vertex shader.
     */
    private _getWGSLComputeCode;
    /**
     * Returns a WGSL struct based on the given name and variables.
     *
     * @private
     * @param {string} name - The struct name.
     * @param {string} vars - The struct variables.
     * @return {string} The WGSL snippet representing a struct.
     */
    private _getWGSLStruct;
    /**
     * Returns a WGSL struct binding.
     *
     * @private
     * @param {string} name - The struct name.
     * @param {string} vars - The struct variables.
     * @param {string} access - The access.
     * @param {number} [binding=0] - The binding index.
     * @param {number} [group=0] - The group index.
     * @return {string} The WGSL snippet representing a struct binding.
     */
    private _getWGSLStructBinding;
}
/**
 * A backend implementation targeting WebGL 2.
 *
 * @private
 * @augments Backend
 */
export class WebGLBackend extends Backend {
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
     * A reference to a backend module holding vertex array object-related
     * utility functions.
     *
     * @type {?WebGLVertexArrayUtils}
     * @default null
     */
    vertexArrayUtils: WebGLVertexArrayUtils | null;
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
     * a storage buffer attribute from the GPU to the CPU. ReadbackBuffer can
     * be used to retain and reuse handles to the intermediate buffers and prevent
     * new allocation.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: (ReadbackBuffer | ArrayBuffer) | null, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * Internal draw function.
     *
     * @private
     * @param {Object3D} object - The object to render.
     * @param {WebGLBufferRenderer} renderer - The internal renderer.
     * @param {number} firstVertex - The first vertex to render.
     * @param {number} vertexCount - The vertex count.
     * @param {number} instanceCount - The intance count.
     * @param {WebGLProgram} programGPU - The raw WebGL shader program.
     */
    private _draw;
    /**
     * Executes a draw command for the given render object.
     *
     * @param {RenderObject} renderObject - The render object to draw.
     * @param {Info} info - Holds a series of statistical information about the GPU memory and the rendering process.
     */
    draw(renderObject: RenderObject): void;
    /**
     * Releases the VAO of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    deleteVertexState(renderObject: RenderObject): void;
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
     * @param {number} faceIndex - The cube face, depth slice or array layer index.
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
     * Destroys the given pipeline.
     *
     * @param {Pipeline} pipeline - The pipeline.
     */
    destroyPipeline(pipeline: Pipeline): void;
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
     * @param {?Array<Promise>} [promises=null] - Optional compilation promises.
     */
    createComputePipeline(computePipeline: ComputePipeline, bindings: Array<BindGroup>, promises?: Array<Promise<any>> | null): void;
    /**
     * Completes the compute pipeline setup for the given compute pipeline.
     *
     * @param {ComputePipeline} computePipeline - The compute pipeline.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     */
    _completeComputeCompile(computePipeline: ComputePipeline, bindings: Array<BindGroup>): void;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {string} cacheKey - The cache key.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>): void;
    /**
     * Updates the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {string} cacheKey - The cache key.
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
     * Creates a uniform buffer.
     *
     * @param {Buffer} uniformBuffer - The uniform buffer.
     */
    createUniformBuffer(uniformBuffer: Buffer): void;
    /**
     * Destroys the GPU data for the given uniform buffer.
     *
     * @param {Buffer} uniformBuffer - The uniform buffer.
     */
    destroyUniformBuffer(uniformBuffer: Buffer): void;
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
/**
 * A WebGL 2 backend utility module for managing the device's capabilities.
 *
 * @private
 */
export class WebGLCapabilities {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * This value holds the cached max anisotropy value.
     *
     * @type {?number}
     * @default null
     */
    maxAnisotropy: number | null;
    /**
     * This value holds the cached max uniform block size value.
     *
     * @type {?number}
     * @default null
     */
    maxUniformBlockSize: number | null;
    /**
     * Returns the maximum anisotropy texture filtering value. This value
     * depends on the device and is reported by the `EXT_texture_filter_anisotropic`
     * WebGL extension.
     *
     * @return {number} The maximum anisotropy texture filtering value.
     */
    getMaxAnisotropy(): number;
    /**
     * Returns the maximum number of bytes available for uniform buffers.
     *
     * @return {number} The maximum number of bytes available for uniform buffers.
     */
    getUniformBufferLimit(): number;
}
import { WebGLCoordinateSystem } from './three.core.js';
/**
 * A backend implementation targeting WebGPU.
 *
 * @private
 * @augments Backend
 */
export class WebGPUBackend extends Backend {
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
     * A reference to a backend module holding device capability related
     * utility functions.
     *
     * @type {WebGPUCapabilities}
     */
    capabilities: WebGPUCapabilities;
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
     * Registers external GPU textures from `XRGPUBinding` for use in rendering.
     *
     * @param {RenderTarget} renderTarget - The render target to register the textures for.
     * @param {GPUTexture} colorTexture - The shared XR color GPUTexture.
     * @param {?Array<Object>} [viewDescriptors=null] - Optional view descriptors, one per XR view.
     */
    setXRRenderTargetTextures(renderTarget: RenderTarget, colorTexture: GPUTexture, viewDescriptors?: Array<Object> | null): void;
    /**
     * A reference to the context.
     *
     * @type {?GPUCanvasContext}
     * @default null
     */
    get context(): GPUCanvasContext | null;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU. ReadbackBuffer can
     * be used to retain and reuse handles to the intermediate buffers and prevent
     * new allocation.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: (ReadbackBuffer | ArrayBuffer) | null, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * @return {GPURenderPassDescriptor} The render pass descriptor.
     */
    private _getDefaultRenderPassDescriptor;
    /**
     * Returns whether the render target is a render target array with depth 2D array texture.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {boolean} Whether the render target is a render target array with depth 2D array texture.
     *
     * @private
     */
    private _isRenderCameraDepthArray;
    /**
     * Returns whether the current render context references external textures.
     *
     * External textures can change every frame, so their descriptors must not be cached.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     * @return {boolean} Whether the render context uses external textures.
     */
    private _hasExternalTexture;
    /**
     * Returns multisampled color textures for an external render target.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} textureData - The backend data for the external texture.
     * @param {number} count - The number of textures to create.
     * @return {?Array<GPUTexture>} The multisampled textures.
     */
    private _getExternalMSAATextures;
    /**
     * Creates attachment views for an external texture render target.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} textureData - The backend data for the texture.
     * @return {Array<Object>} The attachment view descriptors.
     */
    private _createExternalTextureViews;
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
     * Resets the state cache of the given render context data.
     *
     * A new render pass encoder starts with a blend constant and a stencil reference
     * of zero so the cached values must be reset as well.
     *
     * @private
     * @param {Object} renderContextData - The render context data.
     */
    private _resetRenderContextData;
    /**
     * Creates a render bundle encoder and state cache for each camera layer.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} renderContextData - The render context data.
     * @private
     */
    private _createArrayCameraBundleEncoders;
    /**
     * Finishes the render bundle encoders for all camera layers.
     *
     * @param {Object} renderContextData - The render context data.
     * @return {Array<GPURenderBundle>} The completed render bundles.
     * @private
     */
    private _finishArrayCameraBundleEncoders;
    /**
     * Creates render pass descriptors for each camera in an array camera.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} renderContextData - The render context data.
     * @param {Object} descriptor  - The render pass descriptor.
     * @param {ArrayCamera} cameras - The array camera.
     *
     * @private
     */
    private _createArrayCameraLayerDescriptors;
    /**
     * Updates render pass descriptors for each camera in an array camera.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {Object} renderContextData - The render context data.
     * @param {Object} descriptor - The render pass descriptor.
     * @param {ArrayCamera} cameras - The array camera.
     *
     */
    _updateArrayCameraLayerDescriptors(renderContext: RenderContext, renderContextData: Object, descriptor: Object, cameras: ArrayCamera): void;
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
     * Internal draw function that performs the draw with the given pass encoder.
     *
     * @private
     * @param {RenderObject} renderObject - The render object.
     * @param {Info} info - Holds a series of statistical information about the GPU memory and the rendering process.
     * @param {Object} renderContextData - The render context data object, holding current pass state and occlusion query tracking.
     * @param {GPURenderPipeline} pipelineGPU - The GPU render pipeline.
     * @param {Array<BindGroup>} bindings - The bind groups.
     * @param {Array<BufferAttribute>} vertexBuffers - The vertex buffers.
     * @param {{vertexCount: number, firstVertex: number, instanceCount: number, firstInstance: number}} drawParams - The draw parameters.
     * @param {GPURenderPassEncoder|GPURenderBundleEncoder} passEncoderGPU - The GPU pass encoder used for recording draw commands.
     * @param {Object} currentSets - Tracking object for currently set pipeline, attributes, bind groups, and index state.
     * @param {number} [cameraIndexSlot=-1] - Index of the binding slot holding the camera index bind group.
     */
    private _draw;
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
     * @param {Sampler} binding - The sampler binding to update.
     * @return {string} The current sampler key.
     */
    updateSampler(binding: Sampler): string;
    /**
     * Frees the GPU sampler for the given sampler binding.
     *
     * @param {Sampler} binding - The sampler binding to free.
     */
    destroySampler(binding: Sampler): void;
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
     * @param {number} faceIndex - The cube face, depth slice or array layer index.
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
     * @param {?Array<Promise>} [promises=null] - Optional compilation promises.
     */
    createComputePipeline(computePipeline: ComputePipeline, bindings: Array<BindGroup>, promises?: Array<Promise<any>> | null): void;
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
     * Creates a uniform buffer.
     *
     * @param {Buffer} uniformBuffer - The uniform buffer.
     */
    createUniformBuffer(uniformBuffer: Buffer): void;
    /**
     * Destroys the GPU data for the given uniform buffer.
     *
     * @param {Buffer} uniformBuffer - The uniform buffer.
     */
    destroyUniformBuffer(uniformBuffer: Buffer): void;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {string} cacheKey - The cache key.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheKey: string, version: number): void;
    /**
     * Updates the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {string} cacheKey - The cache key.
     * @param {number} version - The version.
     */
    updateBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheKey: string, version: number): void;
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
     * Frees the GPU resources of the given canvas target.
     *
     * @param {CanvasTarget} canvasTarget - The canvas target.
     */
    destroyCanvasTarget(canvasTarget: CanvasTarget): void;
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
     * Encodes a framebuffer copy from a specific texture-array layer.
     *
     * @param {GPUCommandEncoder} encoder - The command encoder.
     * @param {Texture} texture - The destination texture.
     * @param {GPUTexture} sourceGPU - The source GPU texture.
     * @param {GPUTexture} destinationGPU - The destination GPU texture.
     * @param {Object} rectangle - The source rectangle.
     * @param {number} [sourceLayer=0] - The source array layer.
     * @param {boolean} [generateMipmaps=texture.generateMipmaps] - Whether mipmaps should be generated.
     * @private
     */
    private _copyFramebufferToTexture;
    /**
     * Checks if the given compatibility is supported by the backend.
     *
     * @param {string} name - The compatibility name.
     * @return {boolean} Whether the compatibility is supported or not.
     */
    hasCompatibility(name: string): boolean;
}
import { WebGPUCoordinateSystem } from './three.core.js';
/**
 * This renderer is the new alternative of `WebGLRenderer`. `WebGPURenderer` has the ability
 * to target different backends. By default, the renderer tries to use a WebGPU backend if the
 * browser supports WebGPU. If not, `WebGPURenderer` falls backs to a WebGL 2 backend.
 *
 * @augments Renderer
 */
export class WebGPURenderer extends Renderer {
    /**
     * WebGPURenderer options.
     *
     * @typedef {Object} WebGPURenderer~Options
     * @property {boolean} [logarithmicDepthBuffer=false] - Whether logarithmic depth buffer is enabled or not.
     * @property {boolean} [reversedDepthBuffer=false] - Whether reversed depth buffer is enabled or not.
     * @property {boolean} [alpha=true] - Whether the default framebuffer (which represents the final contents of the canvas) should be transparent or opaque.
     * @property {boolean} [depth=true] - Whether the default framebuffer should have a depth buffer or not.
     * @property {boolean} [stencil=false] - Whether the default framebuffer should have a stencil buffer or not.
     * @property {boolean} [antialias=false] - Whether MSAA as the default anti-aliasing should be enabled or not.
     * @property {number} [samples=0] - When `antialias` is `true`, `4` samples are used by default. Set this parameter to any other integer value than 0 to overwrite the default.
     * @property {boolean} [forceWebGL=false] - If set to `true`, the renderer uses a WebGL 2 backend no matter if WebGPU is supported or not.
     * @property {boolean} [multiview=false] - If set to `true`, the renderer will use multiview during WebXR rendering if supported.
     * @property {number} [outputType=undefined] - Texture type for output to canvas. By default, device's preferred format is used; other formats may incur overhead.
     * @property {number} [outputBufferType=HalfFloatType] - Defines the type of output buffers. The default `HalfFloatType` is recommend for best
     * quality. To save memory and bandwidth, `UnsignedByteType` might be used. This will reduce rendering quality though.
     */
    /**
     * Constructs a new WebGPU renderer.
     *
     * @param {WebGPURenderer~Options} [parameters] - The configuration parameter.
     */
    constructor(parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGPURenderer: boolean;
}
import { WebXRController } from './three.core.js';
import { ZeroFactor } from './three.core.js';
import { ZeroStencilOp } from './three.core.js';
import { createCanvasElement } from './three.core.js';
import { defaultBuildStages } from './three.tsl.js';
import { error } from './three.core.js';
import { shaderStages } from './three.tsl.js';
import { vectorComponents } from './three.tsl.js';
import { warn } from './three.core.js';
import { warnOnce } from './three.core.js';
/**
 * Abstract base class of a timestamp query pool.
 *
 * @abstract
 */
declare class TimestampQueryPool {
    /**
     * Creates a new timestamp query pool.
     *
     * @param {number} [maxQueries=256] - Maximum number of queries this pool can hold.
     */
    constructor(maxQueries?: number);
    /**
     * Whether to track timestamps or not.
     *
     * @type {boolean}
     * @default true
     */
    trackTimestamp: boolean;
    /**
     * Maximum number of queries this pool can hold.
     *
     * @type {number}
     * @default 256
     */
    maxQueries: number;
    /**
     * How many queries allocated so far.
     *
     * @type {number}
     * @default 0
     */
    currentQueryIndex: number;
    /**
     * Tracks offsets for different contexts.
     *
     * @type {Map<string, number>}
     */
    queryOffsets: Map<string, number>;
    /**
     * Whether the pool has been disposed or not.
     *
     * @type {boolean}
     * @default false
     */
    isDisposed: boolean;
    /**
     * The total frame duration until the next update.
     *
     * @type {number}
     * @default 0
     */
    lastValue: number;
    /**
     * Stores all timestamp frames.
     *
     * @type {Array<number>}
     */
    frames: Array<number>;
    /**
     * This property is used to avoid multiple concurrent resolve operations.
     * The WebGL backend uses it as a boolean flag. In context of WebGPU, it holds
     * the promise of the current resolve operation.
     *
     * @type {boolean|Promise<number>}
     * @default false
     */
    pendingResolve: boolean | Promise<number>;
    /**
     * Stores the latest timestamp for each render context.
     *
     * @type {Map<string, number>}
     */
    timestamps: Map<string, number>;
    /**
     * Returns all timestamp frames.
     *
     * @return {Array<number>} The timestamp frames.
     */
    getTimestampFrames(): Array<number>;
    /**
     * Returns the timestamp for a given render context.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @return {?number} The timestamp, or undefined if not available.
     */
    getTimestamp(uid: string): number | null;
    /**
     * Returns whether a timestamp is available for a given render context.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @return {boolean} True if a timestamp is available, false otherwise.
     */
    hasTimestampQuery(uid: string): boolean;
    /**
     * Allocate queries for a specific uid.
     *
     * @abstract
     * @param {string} uid - A unique identifier for the render context.
     * @param {number} frameId - The current frame identifier.
     * @returns {?number}
     */
    allocateQueriesForContext(): number | null;
    /**
     * Resolve all timestamps and return data (or process them).
     *
     * @abstract
     * @async
     * @returns {Promise<number>|number} The resolved timestamp value.
     */
    resolveQueriesAsync(): Promise<number> | number;
    /**
     * Dispose of the query pool.
     *
     * @abstract
     */
    dispose(): void;
}
/**
 * Any render or compute command is executed in a specific context that defines
 * the state of the renderer and its backend. Typical examples for such context
 * data are the current clear values or data from the active framebuffer. This
 * module is used to represent these contexts as objects.
 *
 * @private
 */
declare class RenderContext {
    /**
     * The context's ID.
     *
     * @type {number}
     */
    id: number;
    /**
     * The MRT configuration.
     *
     * @type {?MRTNode}
     * @default null
     */
    mrt: MRTNode | null;
    /**
     * Whether the current active framebuffer has a color attachment.
     *
     * @type {boolean}
     * @default true
     */
    color: boolean;
    /**
     * Whether the color attachment should be cleared or not.
     *
     * @type {boolean}
     * @default true
     */
    clearColor: boolean;
    /**
     * The clear color value.
     *
     * @type {Object}
     * @default true
     */
    clearColorValue: Object;
    /**
     * Whether the current active framebuffer has a depth attachment.
     *
     * @type {boolean}
     * @default true
     */
    depth: boolean;
    /**
     * Whether the depth attachment should be cleared or not.
     *
     * @type {boolean}
     * @default true
     */
    clearDepth: boolean;
    /**
     * The clear depth value.
     *
     * @type {number}
     * @default 1
     */
    clearDepthValue: number;
    /**
     * Whether the current active framebuffer has a stencil attachment.
     *
     * @type {boolean}
     * @default false
     */
    stencil: boolean;
    /**
     * Whether the stencil attachment should be cleared or not.
     *
     * @type {boolean}
     * @default true
     */
    clearStencil: boolean;
    /**
     * The clear stencil value.
     *
     * @type {number}
     * @default 1
     */
    clearStencilValue: number;
    /**
     * By default the viewport encloses the entire framebuffer If a smaller
     * viewport is manually defined, this property is to `true` by the renderer.
     *
     * @type {boolean}
     * @default false
     */
    viewport: boolean;
    /**
     * The viewport value. This value is in physical pixels meaning it incorporates
     * the renderer's pixel ratio. The viewport property of render targets or
     * the renderer is in logical pixels.
     *
     * @type {Vector4}
     */
    viewportValue: Vector4;
    /**
     * When the scissor test is active and scissor rectangle smaller than the
     * framebuffers dimensions, this property is to `true` by the renderer.
     *
     * @type {boolean}
     * @default false
     */
    scissor: boolean;
    /**
     * The scissor rectangle.
     *
     * @type {Vector4}
     */
    scissorValue: Vector4;
    /**
     * The active render target.
     *
     * @type {?RenderTarget}
     * @default null
     */
    renderTarget: RenderTarget | null;
    /**
     * The textures of the active render target.
     * `null` when no render target is set.
     *
     * @type {?Array<Texture>}
     * @default null
     */
    textures: Array<Texture> | null;
    /**
     * The depth texture of the active render target.
     * `null` when no render target is set.
     *
     * @type {?DepthTexture}
     * @default null
     */
    depthTexture: DepthTexture | null;
    /**
     * The active cube face.
     *
     * @type {number}
     * @default 0
     */
    activeCubeFace: number;
    /**
     * The active mipmap level.
     *
     * @type {number}
     * @default 0
     */
    activeMipmapLevel: number;
    /**
     * The number of MSAA samples. This value is always `1` when
     * MSAA isn't used.
     *
     * @type {number}
     * @default 1
     */
    sampleCount: number;
    /**
     * The active render target's width in physical pixels.
     *
     * @type {number}
     * @default 0
     */
    width: number;
    /**
     * The active render target's height in physical pixels.
     *
     * @type {number}
     * @default 0
     */
    height: number;
    /**
     * The occlusion query count.
     *
     * @type {number}
     * @default 0
     */
    occlusionQueryCount: number;
    /**
     * The current clipping context.
     *
     * @type {?ClippingContext}
     * @default null
     */
    clippingContext: ClippingContext | null;
    /**
     * The current camera.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    /**
     * Whether a fullscreen pass is rendered or not.
     *
     * @type {boolean}
     * @default false
     */
    fullscreenPass: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderContext: boolean;
    /**
     * Returns the cache key of this render context.
     *
     * @return {number} The cache key.
     */
    getCacheKey(): number;
}
import { Color4 } from './three.tsl.js';
/**
 * The purpose of a node library is to assign node implementations
 * to existing library features. In `WebGPURenderer` lights, materials
 * which are not based on `NodeMaterial` as well as tone mapping techniques
 * are implemented with node-based modules.
 *
 * @private
 */
declare class NodeLibrary {
    /**
     * A map that maps materials to node materials.
     *
     * @type {Map<string,NodeMaterial.constructor>}
     */
    materialNodes: Map<string, NodeMaterial.constructor>;
    /**
     * A map that maps tone mapping techniques (constants)
     * to tone mapping node functions.
     *
     * @type {Map<number,Function>}
     */
    toneMappingNodes: Map<number, Function>;
    /**
     * Returns a matching node material instance for the given material object.
     *
     * This method also assigns/copies the properties of the given material object
     * to the node material. This is done to make sure the current material
     * configuration carries over to the node version.
     *
     * @param {Material} material - A material.
     * @return {NodeMaterial} The corresponding node material.
     */
    fromMaterial(material: Material): NodeMaterial;
    /**
     * Adds a tone mapping node function for a tone mapping technique (constant).
     *
     * @param {Function} toneMappingNode - The tone mapping node function.
     * @param {number} toneMapping - The tone mapping.
     */
    addToneMapping(toneMappingNode: Function, toneMapping: number): void;
    /**
     * Returns a tone mapping node function for a tone mapping technique (constant).
     *
     * @param {number} toneMapping - The tone mapping.
     * @return {?Function} The tone mapping node function. Returns `null` if no node function is found.
     */
    getToneMappingFunction(toneMapping: number): Function | null;
    /**
     * Returns a node material class definition for a material type.
     *
     * @param {string} materialType - The material type.
     * @return {?NodeMaterial.constructor} The node material class definition. Returns `null` if no node material is found.
     */
    getMaterialNodeClass(materialType: string): NodeMaterial.constructor | null;
    /**
     * Adds a node material class definition for a given material type.
     *
     * @param {NodeMaterial.constructor} materialNodeClass - The node material class definition.
     * @param {string} materialClassType - The material type.
     */
    addMaterial(materialNodeClass: NodeMaterial.constructor, materialClassType: string): void;
    /**
     * Returns a light node class definition for a light class definition.
     *
     * @deprecated since r187. Use `Light.registerNode()` to assign light node classes instead.
     * @param {Light.constructor} lightClass - The light class definition.
     * @return {?AnalyticLightNode.constructor} The light node class definition. Returns `null` if no light node is found.
     */
    getLightNodeClass(lightClass: Light.constructor): AnalyticLightNode.constructor | null;
    /**
     * Adds a light node class definition for a given light class definition.
     *
     * @deprecated since r187. Use `Light.registerNode()` instead.
     * @param {AnalyticLightNode.constructor} lightNodeClass - The light node class definition.
     * @param {Light.constructor} lightClass - The light class definition.
     */
    addLight(lightNodeClass: AnalyticLightNode.constructor, lightClass: Light.constructor): void;
    /**
     * Adds a node class definition for the given type to the provided type library.
     *
     * @param {Node.constructor} nodeClass - The node class definition.
     * @param {number|string} type - The object type.
     * @param {Map<number|string,Node.constructor>} library - The type library.
     */
    addType(nodeClass: Node.constructor, type: number | string, library: Map<number | string, Node.constructor>): void;
}
/**
 * A special form of uniforms group that represents
 * the individual uniforms as node-based uniforms.
 *
 * @private
 * @augments UniformsGroup
 */
declare class NodeUniformsGroup extends UniformsGroup {
    /**
     * Constructs a new node-based uniforms group.
     *
     * @param {string} name - The group's name.
     * @param {UniformGroupNode} groupNode - The uniform group node.
     */
    constructor(name: string, groupNode: UniformGroupNode);
    /**
     * The group's ID.
     *
     * @type {number}
     */
    id: number;
    /**
     * The uniform group node.
     *
     * @type {UniformGroupNode}
     */
    groupNode: UniformGroupNode;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeUniformsGroup: boolean;
}
/**
 * Base class for node parsers. A derived parser must be implemented
 * for each supported native shader language.
 */
declare class NodeParser {
    /**
     * The method parses the given native code an returns a node function.
     *
     * @abstract
     * @param {string} source - The native shader code.
     * @return {NodeFunction} A node function.
     */
    parseFunction(): NodeFunction;
}
/**
 * This class represents a GLSL node function.
 *
 * @augments NodeFunction
 */
declare class GLSLNodeFunction extends NodeFunction {
    /**
     * Constructs a new GLSL node function.
     *
     * @param {string} source - The GLSL source.
     */
    constructor(source: string);
    inputsCode: any;
    blockCode: any;
    headerCode: any;
    /**
     * This method returns the GLSL code of the node function.
     *
     * @param {string} [name=this.name] - The function's name.
     * @return {string} The shader code.
     */
    getCode(name?: string): string;
}
/**
 * Represents the lighting model for unlit materials. The only light contribution
 * is baked indirect lighting modulated with ambient occlusion and the material's
 * diffuse color. Environment mapping is supported. Used in {@link MeshBasicNodeMaterial}.
 *
 * @augments LightingModel
 */
declare class BasicLightingModel extends LightingModel {
    /**
     * Implements the baked indirect lighting with its modulation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect({ context }: NodeBuilder): void;
    /**
     * Implements the environment mapping.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish(builder: NodeBuilder): void;
}
/**
 * Represents the lighting model for {@link MeshSSSNodeMaterial}.
 *
 * @augments PhysicalLightingModel
 */
declare class SSSLightingModel extends PhysicalLightingModel {
    /**
     * Constructs a new physical lighting model.
     *
     * @param {boolean} [clearcoat=false] - Whether clearcoat is supported or not.
     * @param {boolean} [sheen=false] - Whether sheen is supported or not.
     * @param {boolean} [iridescence=false] - Whether iridescence is supported or not.
     * @param {boolean} [anisotropy=false] - Whether anisotropy is supported or not.
     * @param {boolean} [transmission=false] - Whether transmission is supported or not.
     * @param {boolean} [dispersion=false] - Whether dispersion is supported or not.
     * @param {boolean} [sss=false] - Whether SSS is supported or not.
     */
    constructor(clearcoat?: boolean, sheen?: boolean, iridescence?: boolean, anisotropy?: boolean, transmission?: boolean, dispersion?: boolean, sss?: boolean);
    /**
     * Whether the lighting model should use SSS or not.
     *
     * @type {boolean}
     * @default false
     */
    useSSS: boolean;
    /**
     * Extends the default implementation with a SSS term.
     *
     * Reference: [Approximating Translucency for a Fast, Cheap and Convincing Subsurface Scattering Look](https://colinbarrebrisebois.com/2011/03/07/gdc-2011-approximating-translucency-for-a-fast-cheap-and-convincing-subsurface-scattering-look/)
     *
     * @param {Object} input - The input data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object, builder: NodeBuilder): void;
}
/**
 * Represents the lighting model for a toon material. Used in {@link MeshToonNodeMaterial}.
 *
 * @augments LightingModel
 */
declare class ToonLightingModel extends LightingModel {
    /**
     * Implements the direct lighting. Instead of using a conventional smooth irradiance, the irradiance is
     * reduced to a small number of discrete shades to create a comic-like, flat look.
     *
     * @param {Object} lightData - The light data.
     * @param {NodeBuilder} builder - The current node builder.
     */
    direct({ lightDirection, lightColor, reflectedLight }: Object, builder: NodeBuilder): void;
    /**
     * Implements the indirect lighting.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    indirect(builder: NodeBuilder): void;
}
/**
 * Represents the state that is used to perform clipping via clipping planes.
 * There is a default clipping context for each render context. When the
 * scene holds instances of `ClippingGroup`, there will be a context for each
 * group.
 *
 * @private
 */
declare class ClippingContext {
    /**
     * Constructs a new clipping context.
     *
     * @param {?ClippingContext} [parentContext=null] - A reference to the parent clipping context.
     */
    constructor(parentContext?: ClippingContext | null);
    /**
     * The id of the clipping context.
     *
     * @type {number}
     * @readonly
     */
    readonly id: number;
    /**
     * The clipping context's version.
     *
     * @type {number}
     * @readonly
     */
    readonly version: number;
    /**
     * Whether the intersection of the clipping planes is used to clip objects, rather than their union.
     *
     * @type {?boolean}
     * @default null
     */
    clipIntersection: boolean | null;
    /**
     * The clipping context's cache key.
     *
     * @type {string}
     */
    cacheKey: string;
    /**
     * Whether the shadow pass is active or not.
     *
     * @type {boolean}
     * @default false
     */
    shadowPass: boolean;
    /**
     * The view matrix.
     *
     * @type {Matrix4}
     */
    viewMatrix: Matrix4;
    /**
     * The view normal matrix.
     *
     * @type {Matrix3}
     */
    viewNormalMatrix: Matrix3;
    /**
     * Internal cache for maintaining clipping contexts.
     *
     * @type {WeakMap<ClippingGroup,ClippingContext>}
     */
    clippingGroupContexts: WeakMap<ClippingGroup, ClippingContext>;
    /**
     * The intersection planes.
     *
     * @type {Array<Vector4>}
     */
    intersectionPlanes: Array<Vector4>;
    /**
     * The intersection planes.
     *
     * @type {Array<Vector4>}
     */
    unionPlanes: Array<Vector4>;
    /**
     * The version of the clipping context's parent context.
     *
     * @type {?number}
     * @readonly
     */
    readonly parentVersion: number | null;
    /**
     * Projects the given source clipping planes and writes the result into the
     * destination array.
     *
     * @param {Array<Plane>} source - The source clipping planes.
     * @param {Array<Vector4>} destination - The destination.
     * @param {number} offset - The offset.
     */
    projectPlanes(source: Array<Plane>, destination: Array<Vector4>, offset: number): void;
    /**
     * Updates the root clipping context of a scene.
     *
     * @param {Scene} scene - The scene.
     * @param {Camera} camera - The camera that is used to render the scene.
     */
    updateGlobal(scene: Scene, camera: Camera): void;
    /**
     * Updates the clipping context.
     *
     * @param {ClippingContext} parentContext - The parent context.
     * @param {ClippingGroup} clippingGroup - The clipping group this context belongs to.
     */
    update(parentContext: ClippingContext, clippingGroup: ClippingGroup): void;
    /**
     * Returns a clipping context for the given clipping group.
     *
     * @param {ClippingGroup} clippingGroup - The clipping group.
     * @return {ClippingContext} The clipping context.
     */
    getGroupContext(clippingGroup: ClippingGroup): ClippingContext;
    /**
     * The count of union clipping planes.
     *
     * @type {number}
     * @readonly
     */
    readonly get unionClippingCount(): number;
}
/**
 * A bind group represents a collection of bindings and thus a collection
 * or resources. Bind groups are assigned to pipelines to provide them
 * with the required resources (like uniform buffers or textures).
 *
 * @private
 */
declare class BindGroup {
    /**
     * Constructs a new bind group.
     *
     * @param {string} name - The bind group's name.
     * @param {Array<Binding>} bindings - An array of bindings.
     */
    constructor(name?: string, bindings?: Array<Binding>);
    /**
     * The bind group's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * An array of bindings.
     *
     * @type {Array<Binding>}
     */
    bindings: Array<Binding>;
    /**
     * The group's ID.
     *
     * @type {number}
     */
    id: number;
}
declare class StructType {
    constructor(name: any, members: any);
    name: any;
    members: any;
    output: boolean;
}
/**
 * Abstract base class for uniforms.
 *
 * @abstract
 * @private
 */
declare class Uniform {
    /**
     * Constructs a new uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {any} value - The uniform's value.
     */
    constructor(name: string, value: any);
    /**
     * The uniform's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * The uniform's value.
     *
     * @type {any}
     */
    value: any;
    /**
     * Used to build the uniform buffer according to the STD140 layout.
     * Derived uniforms will set this property to a data type specific
     * value.
     *
     * @type {number}
     */
    boundary: number;
    /**
     * The item size. Derived uniforms will set this property to a data
     * type specific value.
     *
     * @type {number}
     */
    itemSize: number;
    /**
     * This property is set by {@link UniformsGroup} and marks
     * the start position in the uniform buffer.
     *
     * @type {number}
     */
    offset: number;
    /**
     * This property is set by {@link UniformsGroup} and marks
     * the index position in the uniform array.
     *
     * @type {number}
     */
    index: number;
    /**
     * Sets the uniform's value.
     *
     * @param {any} value - The value to set.
     */
    setValue(value: any): void;
    /**
     * Returns the uniform's value.
     *
     * @return {any} The value.
     */
    getValue(): any;
}
/**
 * This renderer module provides a series of statistical information
 * about the GPU memory and the rendering process. Useful for debugging
 * and monitoring.
 */
declare class Info {
    /**
     * Whether frame related metrics should automatically
     * be resetted or not. This property should be set to `false`
     * by apps which manage their own animation loop. They must
     * then call `renderer.info.reset()` once per frame manually.
     *
     * @type {boolean}
     * @default true
     */
    autoReset: boolean;
    /**
     * The current frame ID. This ID is managed
     * by `NodeFrame`.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly frame: number;
    /**
     * The number of render calls since the
     * app has been started.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly calls: number;
    /**
     * Render related metrics.
     *
     * @type {Object}
     * @readonly
     * @property {number} calls - The number of render calls since the app has been started.
     * @property {number} frameCalls - The number of render calls of the current frame.
     * @property {number} drawCalls - The number of draw calls of the current frame.
     * @property {number} triangles - The number of rendered triangle primitives of the current frame.
     * @property {number} points - The number of rendered point primitives of the current frame.
     * @property {number} lines - The number of rendered line primitives of the current frame.
     * @property {number} timestamp - The timestamp of the frame.
     */
    readonly render: Object;
    /**
     * Compute related metrics.
     *
     * @type {Object}
     * @readonly
     * @property {number} calls - The number of compute calls since the app has been started.
     * @property {number} frameCalls - The number of compute calls of the current frame.
     * @property {number} timestamp - The timestamp of the frame when using `renderer.computeAsync()`.
     */
    readonly compute: Object;
    /**
     * Memory related metrics.
     *
     * @type {Object}
     * @readonly
     * @property {number} attributes - The number of active attributes.
     * @property {number} attributesSize - The memory size of active attributes in bytes.
     * @property {number} geometries - The number of active geometries.
     * @property {number} indexAttributes - The number of active index attributes.
     * @property {number} indexAttributesSize - The memory size of active index attributes in bytes.
     * @property {number} indirectStorageAttributes - The number of active indirect storage attributes.
     * @property {number} indirectStorageAttributesSize - The memory size of active indirect storage attributes in bytes.
     * @property {number} programs - The number of active programs.
     * @property {number} programsSize - The memory size of active programs in bytes.
     * @property {number} readbackBuffers - The number of active readback buffers.
     * @property {number} readbackBuffersSize - The memory size of active readback buffers in bytes.
     * @property {number} renderTargets - The number of active renderTargets.
     * @property {number} storageAttributes - The number of active storage attributes.
     * @property {number} storageAttributesSize - The memory size of active storage attributes in bytes.
     * @property {number} textures - The number of active textures.
     * @property {number} texturesSize - The memory size of active textures in bytes.
     * @property {number} uniformBuffers - The number of active uniform buffers.
     * @property {number} uniformBuffersSize - The memory size of active uniform buffers in bytes.
     * @property {number} total - The total memory size in bytes.
     */
    readonly memory: Object;
    /**
     * Map for storing calculated byte sizes of tracked objects.
     *
     * @type {WeakMap<Object, number>}
     * @private
     */
    private memoryMap;
    /**
     * This method should be executed per draw call and updates the corresponding metrics.
     *
     * @param {Object3D} object - The 3D object that is going to be rendered.
     * @param {number} count - The vertex or index count.
     * @param {number} instanceCount - The instance count.
     */
    update(object: Object3D, count: number, instanceCount: number): void;
    /**
     * Resets frame related metrics.
     */
    reset(): void;
    /**
     * Performs a complete reset of the object.
     */
    dispose(): void;
    /**
     * Tracks texture memory explicitly, updating counts and byte tracking.
     *
     * @param {Texture} texture
     */
    createTexture(texture: Texture): void;
    /**
     * Tracks texture memory explicitly, updating counts and byte tracking.
     *
     * @param {Texture} texture
     */
    destroyTexture(texture: Texture): void;
    /**
     * Tracks attribute memory explicitly, updating counts and byte tracking.
     *
     * @param {BufferAttribute} attribute
     * @param {string} type - type of attribute
     * @private
     */
    private _createAttribute;
    /**
     * Tracks a regular attribute memory explicitly.
     *
     * @param {BufferAttribute} attribute - The attribute to track.
     */
    createAttribute(attribute: BufferAttribute): void;
    /**
     * Tracks an index attribute memory explicitly.
     *
     * @param {BufferAttribute} attribute - The index attribute to track.
     */
    createIndexAttribute(attribute: BufferAttribute): void;
    /**
     * Tracks a storage attribute memory explicitly.
     *
     * @param {BufferAttribute} attribute - The storage attribute to track.
     */
    createStorageAttribute(attribute: BufferAttribute): void;
    /**
     * Tracks an indirect storage attribute memory explicitly.
     *
     * @param {BufferAttribute} attribute - The indirect storage attribute to track.
     */
    createIndirectStorageAttribute(attribute: BufferAttribute): void;
    /**
     * Tracks attribute memory explicitly, updating counts and byte tracking.
     *
     * @param {BufferAttribute} attribute
     */
    destroyAttribute(attribute: BufferAttribute): void;
    /**
     * Tracks a readback buffer memory explicitly.
     *
     * @param {ReadbackBuffer} readbackBuffer - The readback buffer to track.
     */
    createReadbackBuffer(readbackBuffer: ReadbackBuffer): void;
    /**
     * Tracks a readback buffer memory explicitly.
     *
     * @param {ReadbackBuffer} readbackBuffer - The readback buffer to track.
     */
    destroyReadbackBuffer(readbackBuffer: ReadbackBuffer): void;
    /**
     * Tracks a uniform buffer memory explicitly.
     *
     * @param {UniformBuffer} uniformBuffer - The uniform buffer to track.
     */
    createUniformBuffer(uniformBuffer: UniformBuffer): void;
    /**
     * Tracks a uniform buffer memory explicitly.
     *
     * @param {UniformBuffer} uniformBuffer - The uniform buffer to track.
     */
    destroyUniformBuffer(uniformBuffer: UniformBuffer): void;
    /**
     * Tracks program memory explicitly, updating counts and byte tracking.
     *
     * @param {ProgrammableStage} program - The program to track.
     */
    createProgram(program: ProgrammableStage): void;
    /**
     * Tracks program memory explicitly, updating counts and byte tracking.
     *
     * @param {Object} program - The program to track.
     */
    destroyProgram(program: Object): void;
    /**
     * Calculates the memory size of a texture in bytes.
     *
     * @param {Texture} texture - The texture to calculate the size for.
     * @return {number} The calculated size in bytes.
     * @private
     */
    private _getTextureMemorySize;
    /**
     * Calculates the memory size of an attribute in bytes.
     *
     * @param {BufferAttribute} attribute - The attribute to calculate the size for.
     * @return {number} The calculated size in bytes.
     * @private
     */
    private _getAttributeMemorySize;
}
/**
 * The XR manager is built on top of the WebXR Device API to
 * manage XR sessions with renderer backends.
 *
 * @augments EventDispatcher
 */
declare class XRManager extends EventDispatcher {
    /**
     * Constructs a new XR manager.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {boolean} [multiview=false] - Enables multiview if the device supports it.
     */
    constructor(renderer: Renderer, multiview?: boolean);
    /**
     * This flag globally enables XR rendering.
     *
     * @type {boolean}
     * @default false
     */
    enabled: boolean;
    /**
     * Whether the XR device is currently presenting or not.
     *
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly isPresenting: boolean;
    /**
     * Whether the XR camera should automatically be updated or not.
     *
     * @type {boolean}
     * @default true
     */
    cameraAutoUpdate: boolean;
    /**
     * The renderer.
     *
     * @private
     * @type {Renderer}
     */
    private _renderer;
    /**
     * Represents the camera for the left eye.
     *
     * @private
     * @type {PerspectiveCamera}
     */
    private _cameraL;
    /**
     * Represents the camera for the right eye.
     *
     * @private
     * @type {PerspectiveCamera}
     */
    private _cameraR;
    /**
     * A list of cameras used for rendering the XR views.
     *
     * @private
     * @type {Array<Camera>}
     */
    private _cameras;
    /**
     * The main XR camera.
     *
     * @private
     * @type {ArrayCamera}
     */
    private _cameraXR;
    /**
     * The current near value of the XR camera.
     *
     * @private
     * @type {?number}
     * @default null
     */
    private _currentDepthNear;
    /**
     * The current far value of the XR camera.
     *
     * @private
     * @type {?number}
     * @default null
     */
    private _currentDepthFar;
    /**
     * A list of WebXR controllers requested by the application.
     *
     * @private
     * @type {Array<WebXRController>}
     */
    private _controllers;
    /**
     * A list of XR input source. Each input source belongs to
     * an instance of WebXRController.
     *
     * @private
     * @type {Array<XRInputSource?>}
     */
    private _controllerInputSources;
    /**
     * The XR render target that represents the rendering destination
     * during an active XR session.
     *
     * @private
     * @type {?RenderTarget}
     * @default null
     */
    private _xrRenderTarget;
    /**
     * An array holding all the non-projection layers
     *
     * @private
     * @type {Array<Object>}
     * @default []
     */
    private _layers;
    /**
     * Whether the XR session uses layers.
     *
     * @private
     * @type {boolean}
     * @default false
     */
    private _sessionUsesLayers;
    /**
     * Whether the device supports binding gl objects.
     *
     * @private
     * @type {boolean}
     * @readonly
     */
    private readonly _supportsGlBinding;
    _supportsWebGPUBinding: boolean;
    /**
     * Helper function to create native WebXR Layer.
     *
     * @private
     * @type {Function}
     */
    private _createXRLayer;
    /**
    * The current WebGL context.
    *
    * @private
    * @type {?WebGL2RenderingContext}
    * @default null
    */
    private _gl;
    /**
     * The current animation context.
     *
     * @private
     * @type {?Window}
     * @default null
     */
    private _currentAnimationContext;
    /**
     * The current animation loop.
     *
     * @private
     * @type {?Function}
     * @default null
     */
    private _currentAnimationLoop;
    /**
     * The current pixel ratio.
     *
     * @private
     * @type {?number}
     * @default null
     */
    private _currentPixelRatio;
    /**
     * The current size of the renderer's canvas
     * in logical pixel unit.
     *
     * @private
     * @type {Vector2}
     */
    private _currentSize;
    /**
     * Holds a reference to the user camera and its current settings.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _currentCameraSettings;
    /**
     * The default event listener for handling events inside a XR session.
     *
     * @private
     * @type {Function}
     */
    private _onSessionEvent;
    /**
     * The event listener for handling the end of a XR session.
     *
     * @private
     * @type {Function}
     */
    private _onSessionEnd;
    /**
     * The event listener for handling the `inputsourceschange` event.
     *
     * @private
     * @type {Function}
     */
    private _onInputSourcesChange;
    /**
     * The animation loop which is used as a replacement for the default
     * animation loop of the application. It is only used when a XR session
     * is active.
     *
     * @private
     * @type {Function}
     */
    private _onAnimationFrame;
    /**
     * The current XR reference space.
     *
     * @private
     * @type {?XRReferenceSpace}
     * @default null
     */
    private _referenceSpace;
    /**
     * The current XR reference space type.
     *
     * @private
     * @type {XRReferenceSpaceType}
     * @default 'local-floor'
     */
    private _referenceSpaceType;
    /**
     * A custom reference space defined by the application.
     *
     * @private
     * @type {?XRReferenceSpace}
     * @default null
     */
    private _customReferenceSpace;
    /**
     * The framebuffer scale factor.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _framebufferScaleFactor;
    /**
     * The foveation factor.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _foveation;
    /**
     * A reference to the current XR session.
     *
     * @private
     * @type {?XRSession}
     * @default null
     */
    private _session;
    /**
     * A reference to the current XR base layer.
     *
     * @private
     * @type {?XRWebGLLayer}
     * @default null
     */
    private _glBaseLayer;
    /**
     * A reference to the current XR binding.
     *
     * @private
     * @type {?XRWebGLBinding}
     * @default null
     */
    private _glBinding;
    /**
     * A reference to the current XR WebGPU binding.
     *
     * @private
     * @type {?XRGPUBinding}
     * @default null
     */
    private _webgpuBinding;
    /**
     * A reference to the current XR projection layer.
     *
     * @private
     * @type {?XRProjectionLayer}
     * @default null
     */
    private _glProjLayer;
    /**
     * A reference to the current XR frame.
     *
     * @private
     * @type {?XRFrame}
     * @default null
     */
    private _xrFrame;
    /**
     * Whether the browser supports the APIs necessary to use XRProjectionLayers.
     *
     * Note: this does not represent XRSession explicitly requesting
     * `'layers'` as a feature - see `_sessionUsesLayers` and #30112
     *
     * @private
     * @type {boolean}
     * @readonly
     */
    private readonly _supportsLayers;
    /**
     * Whether the usage of multiview has been requested by the application or not.
     *
     * @private
     * @type {boolean}
     * @default false
     * @readonly
     */
    private readonly _useMultiviewIfPossible;
    /**
     * Whether the usage of multiview is actually enabled. This flag only evaluates to `true`
     * if multiview has been requested by the application and the `OVR_multiview2` is available.
     *
     * @private
     * @type {boolean}
     * @readonly
     */
    private readonly _useMultiview;
    /**
     * Returns an instance of `THREE.Group` that represents the transformation
     * of a XR controller in target ray space. The requested controller is defined
     * by the given index.
     *
     * @param {number} index - The index of the XR controller.
     * @return {Group} A group that represents the controller's transformation.
     */
    getController(index: number): Group;
    /**
     * Returns an instance of `THREE.Group` that represents the transformation
     * of a XR controller in grip space. The requested controller is defined
     * by the given index.
     *
     * @param {number} index - The index of the XR controller.
     * @return {Group} A group that represents the controller's transformation.
     */
    getControllerGrip(index: number): Group;
    /**
     * Returns an instance of `THREE.Group` that represents the transformation
     * of a XR controller in hand space. The requested controller is defined
     * by the given index.
     *
     * @param {number} index - The index of the XR controller.
     * @return {Group} A group that represents the controller's transformation.
     */
    getHand(index: number): Group;
    /**
     * Returns the foveation value.
     *
     * @return {number|undefined} The foveation value.
     */
    getFoveation(): number | undefined;
    /**
     * Sets the foveation value.
     *
     * @param {number} foveation - A number in the range `[0,1]` where `0` means no foveation (full resolution)
     * and `1` means maximum foveation (the edges render at lower resolution).
     */
    setFoveation(foveation: number): void;
    /**
     * Returns the framebuffer scale factor.
     *
     * @return {number} The framebuffer scale factor.
     */
    getFramebufferScaleFactor(): number;
    /**
     * Sets the framebuffer scale factor.
     *
     * This method can not be used during a XR session.
     *
     * @param {number} factor - The framebuffer scale factor.
     */
    setFramebufferScaleFactor(factor: number): void;
    /**
     * Returns the reference space type.
     *
     * @return {XRReferenceSpaceType} The reference space type.
     */
    getReferenceSpaceType(): XRReferenceSpaceType;
    /**
     * Sets the reference space type.
     *
     * This method can not be used during a XR session.
     *
     * @param {XRReferenceSpaceType} type - The reference space type.
     */
    setReferenceSpaceType(type: XRReferenceSpaceType): void;
    /**
     * Returns the XR reference space.
     *
     * @return {XRReferenceSpace} The XR reference space.
     */
    getReferenceSpace(): XRReferenceSpace;
    /**
     * Sets a custom XR reference space.
     *
     * @param {XRReferenceSpace} space - The XR reference space.
     */
    setReferenceSpace(space: XRReferenceSpace): void;
    /**
     * Returns the XR camera.
     *
     * The camera's transformation and projection matrix are derived from the first
     * sub camera (e.g. the left eye in a stereo setup).
     *
     * @return {ArrayCamera} The XR camera.
     */
    getCamera(): ArrayCamera;
    /**
     * Returns the environment blend mode from the current XR session.
     *
     * @return {'opaque'|'additive'|'alpha-blend'|undefined} The environment blend mode. Returns `undefined` when used outside of a XR session.
     */
    getEnvironmentBlendMode(): "opaque" | "additive" | "alpha-blend" | undefined;
    /**
     * Returns the current base layer.
     *
     * This is an `XRProjectionLayer` when the targeted XR device supports the
     * WebXR Layers API, or an `XRWebGLLayer` otherwise.
     *
     * @return {?(XRWebGLLayer|XRProjectionLayer)} The XR base layer.
     */
    getBaseLayer(): (XRWebGLLayer | XRProjectionLayer) | null;
    /**
     * Returns the current XR binding.
     *
     * Creates a new binding if needed and the browser is
     * capable of doing so.
     *
     * @return {?XRWebGLBinding} The XR binding. Returns `null` if one cannot be created.
     */
    getBinding(): XRWebGLBinding | null;
    /**
     * Applies WebXR fixed foveation to the internal post-processing render target
     * used by the first XR render pass before compositing into a projection layer.
     *
     * Browser-side `XRWebGLBinding.foveateBoundTexture()` failures are treated as
     * non-fatal so they do not interrupt rendering.
     *
     * @param {?RenderTarget} renderTarget - The internal render target.
     */
    foveateBoundTexture(renderTarget: RenderTarget | null): void;
    /**
     * Returns the current XR WebGPU binding.
     *
     * Creates a new binding if needed and the browser is
     * capable of doing so.
     *
     * @return {?XRGPUBinding} The XR WebGPU binding. Returns `null` if one cannot be created.
     */
    getWebGPUBinding(): XRGPUBinding | null;
    /**
     * Returns whether the current XR session is using WebGPU.
     *
     * @private
     * @return {boolean} Whether the current session uses the WebGPU backend and the `webgpu` session feature.
     */
    private _isWebGPUSession;
    /**
     * Validates the current WebGPU XR session requirements.
     *
     * @private
     */
    private _validateWebGPUSession;
    /**
     * Initializes the WebGPU XR projection layer and render target.
     *
     * @private
     * @async
     * @param {XRSession} session - The XR session.
     * @return {Promise<void>}
     */
    private _initWebGPUSession;
    /**
     * Releases WebGPU XR resources associated with the current session.
     *
     * @private
     */
    private _disposeWebGPUSession;
    /**
     * Collects WebGPU XR sub-image data for the current frame.
     *
     * @private
     * @param {Array<XRView>} views - The XR views for the current pose.
     * @return {{colorTexture:?GPUTexture, viewDescriptors:Array<Object>, viewports:Array<XRViewport>}} The WebGPU XR view data.
     */
    private _getWebGPUViewData;
    /**
     * Returns the current XR frame.
     *
     * @return {?XRFrame} The XR frame. Returns `null` when used outside a XR session.
     */
    getFrame(): XRFrame | null;
    /**
     * Returns `true` if the engine renders to a multiview target.
     *
     * @return {boolean} Whether the engine renders to a multiview render target or not.
     */
    useMultiview(): boolean;
    /**
     * This method can be used in XR applications to create a quadratic layer that presents a separate
     * rendered scene.
     *
     * @param {number} width - The width of the layer plane in world units.
     * @param {number} height - The height of the layer plane in world units.
     * @param {Vector3} translation - The position/translation of the layer plane in world units.
     * @param {Quaternion} quaternion - The orientation of the layer plane expressed as a quaternion.
     * @param {number} pixelwidth - The width of the layer's render target in pixels.
     * @param {number} pixelheight - The height of the layer's render target in pixels.
     * @param {Function} rendercall - A callback function that renders the layer. Similar to code in
     * the default animation loop, this method can be used to update/transform 3D object in the layer's scene.
     * @param {Object} [attributes={}] - Allows to configure the layer's render target.
     * @param {number} [attributes.samples] - The scene MSAA sample count. Defaults to the renderer's sample count.
     * @return {Mesh} A mesh representing the quadratic XR layer. This mesh should be added to the XR scene.
     */
    createQuadLayer(width: number, height: number, translation: Vector3, quaternion: Quaternion, pixelwidth: number, pixelheight: number, rendercall: Function, attributes?: {
        samples?: number | undefined;
    }): Mesh;
    /**
     * This method can be used in XR applications to create a cylindrical layer that presents a separate
     * rendered scene.
     *
     * @param {number} radius - The radius of the cylinder in world units.
     * @param {number} centralAngle - The central angle of the cylinder in radians.
     * @param {number} aspectratio - The aspect ratio.
     * @param {Vector3} translation - The position/translation of the layer plane in world units.
     * @param {Quaternion} quaternion - The orientation of the layer plane expressed as a quaternion.
     * @param {number} pixelwidth - The width of the layer's render target in pixels.
     * @param {number} pixelheight - The height of the layer's render target in pixels.
     * @param {Function} rendercall - A callback function that renders the layer. Similar to code in
     * the default animation loop, this method can be used to update/transform 3D object in the layer's scene.
     * @param {Object} [attributes={}] - Allows to configure the layer's render target.
     * @param {number} [attributes.samples] - The scene MSAA sample count. Defaults to the renderer's sample count.
     * @return {Mesh} A mesh representing the cylindrical XR layer. This mesh should be added to the XR scene.
     */
    createCylinderLayer(radius: number, centralAngle: number, aspectratio: number, translation: Vector3, quaternion: Quaternion, pixelwidth: number, pixelheight: number, rendercall: Function, attributes?: {
        samples?: number | undefined;
    }): Mesh;
    /**
     * Renders the XR layers that have been previously added to the scene.
     *
     * This method is usually called in your animation loop before rendering
     * the actual scene via `renderer.render( scene, camera );`.
     */
    renderLayers(): void;
    /**
     * Returns the current XR session.
     *
     * @return {?XRSession} The XR session. Returns `null` when used outside a XR session.
     */
    getSession(): XRSession | null;
    /**
     * After a XR session has been requested usually with one of the `*Button` modules, it
     * is injected into the renderer with this method. This method triggers the start of
     * the actual XR rendering.
     *
     * @async
     * @param {XRSession} session - The XR session to set.
     * @return {Promise} A Promise that resolves when the session has been set.
     */
    setSession(session: XRSession): Promise<any>;
    /**
     * This method is called by the renderer per frame and updates the XR camera
     * and it sub cameras based on the given camera. The given camera is the "user"
     * camera created on application level and used for non-XR rendering.
     *
     * @param {PerspectiveCamera} camera - The camera.
     */
    updateCamera(camera: PerspectiveCamera): void;
    /**
     * Returns a WebXR controller for the given controller index.
     *
     * @private
     * @param {number} index - The controller index.
     * @return {WebXRController} The XR controller.
     */
    private _getController;
}
/**
 * Represents lighting model for a shadow material. Used in {@link ShadowNodeMaterial}.
 *
 * @augments LightingModel
 */
declare class ShadowMaskModel extends LightingModel {
    /**
     * The shadow mask node.
     *
     * @type {Node}
     */
    shadowNode: Node;
    /**
     * Only used to save the shadow mask.
     *
     * @param {Object} input - The input data.
     */
    direct({ lightNode }: Object): void;
    /**
     * Uses the shadow mask to produce the final color.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    finish({ context }: NodeBuilder): void;
}
/**
 * VolumetricLightingModel class extends the LightingModel to implement volumetric lighting effects.
 * This model calculates the scattering and transmittance of light through a volumetric medium.
 * It dynamically adjusts the direction of the ray based on the camera and object positions.
 * The model supports custom scattering and depth nodes to enhance the lighting effects.
 *
 * @augments LightingModel
 */
declare class VolumetricLightingModel extends LightingModel {
    start(builder: any): void;
    scatteringLight(lightColor: any, builder: any): void;
    direct({ lightNode, lightColor }: {
        lightNode: any;
        lightColor: any;
    }, builder: any): void;
    directRectArea({ lightColor, lightPosition, halfWidth, halfHeight }: {
        lightColor: any;
        lightPosition: any;
        halfWidth: any;
        halfHeight: any;
    }, builder: any): void;
    finish(builder: any): void;
}
/**
 * A WebGL 2 backend utility module for managing shader attributes.
 *
 * @private
 */
declare class WebGLAttributeUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * Creates the GPU buffer for the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     * @param {GLenum } bufferType - A flag that indicates the buffer type and thus binding point target.
     */
    createAttribute(attribute: BufferAttribute, bufferType: GLenum): void;
    /**
     * Updates the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    updateAttribute(attribute: BufferAttribute): void;
    /**
     * Destroys the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    destroyAttribute(attribute: BufferAttribute): void;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU. ReadbackBuffer can
     * be used to retain and reuse handles to the intermediate buffers and prevent
     * new allocation.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: (ReadbackBuffer | ArrayBuffer) | null, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
    /**
     * Creates a WebGL buffer with the given data.
     *
     * @private
     * @param {WebGL2RenderingContext} gl - The rendering context.
     * @param {GLenum } bufferType - A flag that indicates the buffer type and thus binding point target.
     * @param {TypedArray} array - The array of the buffer attribute.
     * @param {GLenum} usage - The usage.
     * @return {WebGLBuffer} The WebGL buffer.
     */
    private _createBuffer;
}
/**
 * A WebGL 2 backend utility module for managing vertex array objects (VAOs).
 *
 * VAOs are shared between all owners (render objects and compute pipelines)
 * that use the same GPU buffers and deleted when the last owner releases them.
 *
 * @private
 */
declare class WebGLVertexArrayUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * The VAO cache. Entries are keyed by the IDs of the attribute buffers
     * and hold one VAO per combination of active storage buffers as well
     * as a usage counter.
     *
     * @type {Map<string,Object>}
     */
    cache: Map<string, Object>;
    /**
     * Returns a VAO for the given attributes.
     *
     * @param {RenderObject|ComputePipeline} owner - The render object or compute pipeline using the VAO.
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @return {WebGLVertexArrayObject} The VAO.
     */
    getVAO(owner: RenderObject | ComputePipeline, attributes: Array<BufferAttribute>): WebGLVertexArrayObject;
    /**
     * Releases the VAO used by the given owner.
     *
     * @param {RenderObject|ComputePipeline} owner - The render object or compute pipeline.
     */
    releaseVAO(owner: RenderObject | ComputePipeline): void;
    /**
     * Frees internal resources.
     */
    dispose(): void;
    /**
     * Returns `true` if the given attributes refer to other GPU buffers than
     * the VAO of the given owner.
     *
     * @private
     * @param {Object} ownerData - The backend data of the owner.
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @return {boolean} Whether the owner requires a different VAO or not.
     */
    private _needsUpdate;
    /**
     * Releases the VAO entry. If possible, the all VAO variants are deleted.
     *
     * @private
     * @param {string} key - The cache key.
     */
    private _releaseEntry;
    /**
     * Creates a VAO from the given attributes.
     *
     * @private
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @return {WebGLVertexArrayObject} The VAO.
     */
    private _createVAO;
}
/**
 * A WebGL 2 backend utility module for managing extensions.
 *
 * @private
 */
declare class WebGLExtensions {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * A reference to the rendering context.
     *
     * @type {WebGL2RenderingContext}
     */
    gl: WebGL2RenderingContext;
    /**
     * A list with all the supported WebGL extensions.
     *
     * @type {Array<string>}
     */
    availableExtensions: Array<string>;
    /**
     * A dictionary with requested WebGL extensions.
     * The key is the name of the extension, the value
     * the requested extension object.
     *
     * @type {Object<string,Object>}
     */
    extensions: {
        [x: string]: Object;
    };
    /**
     * Returns the extension object for the given extension name.
     *
     * @param {string} name - The extension name.
     * @return {Object} The extension object.
     */
    get(name: string): Object;
    /**
     * Returns `true` if the requested extension is available.
     *
     * @param {string} name - The extension name.
     * @return {boolean} Whether the given extension is available or not.
     */
    has(name: string): boolean;
}
/**
 * A WebGL 2 backend utility module for managing textures.
 *
 * @private
 */
declare class WebGLTextureUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * A reference to the rendering context.
     *
     * @type {WebGL2RenderingContext}
     */
    gl: WebGL2RenderingContext;
    /**
     * A reference to a backend module holding extension-related
     * utility functions.
     *
     * @type {WebGLExtensions}
     */
    extensions: WebGLExtensions;
    /**
     * A dictionary for managing default textures. The key
     * is the binding point (target), the value the WEbGL texture object.
     *
     * @type {Object<GLenum,WebGLTexture>}
     */
    defaultTextures: any;
    /**
     * A scratch framebuffer used for attaching the source texture in
     * {@link copyTextureToTexture}.
     *
     * @private
     * @type {?WebGLFramebuffer}
     */
    private _srcFramebuffer;
    /**
     * A scratch framebuffer used for attaching the destination texture in
     * {@link copyTextureToTexture}.
     *
     * @private
     * @type {?WebGLFramebuffer}
     */
    private _dstFramebuffer;
    /**
     * Inits the state of the utility.
     *
     * @private
     */
    private _init;
    /**
     * Returns the native texture type for the given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {GLenum} The native texture type.
     */
    getGLTextureType(texture: Texture): GLenum;
    /**
     * Returns the native texture type for the given texture.
     *
     * @param {?string} internalFormatName - The internal format name. When `null`, the internal format is derived from the subsequent parameters.
     * @param {GLenum} glFormat - The WebGL format.
     * @param {GLenum} glType - The WebGL type.
     * @param {string} colorSpace - The texture's color space.
     * @param {boolean} [forceLinearTransfer=false] - Whether to force a linear transfer or not.
     * @return {GLenum} The internal format.
     */
    getInternalFormat(internalFormatName: string | null, glFormat: GLenum, glType: GLenum, normalized: any, colorSpace: string, forceLinearTransfer?: boolean): GLenum;
    /**
     * Sets the texture parameters for the given texture.
     *
     * @param {GLenum} textureType - The texture type.
     * @param {Texture} texture - The texture.
     */
    setTextureParameters(textureType: GLenum, texture: Texture): void;
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
     * @return {undefined}
     */
    createTexture(texture: Texture, options?: Object): undefined;
    /**
     * Uploads texture buffer data to the GPU memory.
     *
     * @param {WebGLBuffer} buffer - The buffer data.
     * @param {Texture} texture - The texture,
     */
    copyBufferToTexture(buffer: WebGLBuffer, texture: Texture): void;
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
     * Deallocates the render buffers of the given render target.
     *
     * @param {RenderTarget} renderTarget - The render target.
     */
    deallocateRenderBuffers(renderTarget: RenderTarget): void;
    /**
     * Destroys the GPU data for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {boolean} [isDefaultTexture=false] - Whether the texture uses a default GPU texture or not.
     */
    destroyTexture(texture: Texture, isDefaultTexture?: boolean): void;
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
     * SetupS storage for internal depth/stencil buffers and bind to correct framebuffer.
     *
     * @param {WebGLRenderbuffer} renderbuffer - The render buffer.
     * @param {RenderContext} renderContext - The render context.
     * @param {number} samples - The MSAA sample count.
     * @param {boolean} [useMultisampledRTT=false] - Whether to use WEBGL_multisampled_render_to_texture or not.
     */
    setupRenderBufferStorage(renderbuffer: WebGLRenderbuffer, renderContext: RenderContext, samples: number, useMultisampledRTT?: boolean): void;
    /**
     * Returns texture data as a typed array.
     *
     * @async
     * @param {Texture} texture - The texture to copy.
     * @param {number} x - The x coordinate of the copy origin.
     * @param {number} y - The y coordinate of the copy origin.
     * @param {number} width - The width of the copy.
     * @param {number} height - The height of the copy.
     * @param {number} faceIndex - The cube face, depth slice or array layer index.
     * @return {Promise<TypedArray>} A Promise that resolves with a typed array when the copy operation has finished.
     */
    copyTextureToBuffer(texture: Texture, x: number, y: number, width: number, height: number, faceIndex: number): Promise<TypedArray>;
    /**
     * Returns the corresponding typed array type for the given WebGL data type.
     *
     * @private
     * @param {GLenum} glType - The WebGL data type.
     * @return {TypedArray.constructor} The typed array type.
     */
    private _getTypedArrayType;
    /**
     * Returns the bytes-per-texel value for the given WebGL data type and texture format.
     *
     * @private
     * @param {GLenum} glType - The WebGL data type.
     * @param {GLenum} glFormat - The WebGL texture format.
     * @return {number} The bytes-per-texel.
     */
    private _getBytesPerTexel;
    /**
     * Frees the internal resources.
     */
    dispose(): void;
}
declare class WebGLBufferRenderer {
    constructor(backend: any);
    gl: any;
    extensions: any;
    info: any;
    mode: any;
    index: number;
    type: any;
    object: any;
    render(start: any, count: any): void;
    renderInstances(start: any, count: any, primcount: any): void;
    renderMultiDraw(starts: any, counts: any, drawCount: any): void;
}
/**
 * A WebGL 2 backend utility module for managing the WebGL state.
 *
 * The major goal of this module is to reduce the number of state changes
 * by caching the WEbGL state with a series of variables. In this way, the
 * renderer only executes state change commands when necessary which
 * improves the overall performance.
 *
 * @private
 */
declare class WebGLState {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * A reference to the rendering context.
     *
     * @type {WebGL2RenderingContext}
     */
    gl: WebGL2RenderingContext;
    enabled: {};
    parameters: {};
    currentFlipSided: any;
    currentCullFace: any;
    currentProgram: any;
    currentBlendingEnabled: boolean;
    currentBlending: any;
    currentBlendEquation: any;
    currentBlendEquationAlpha: number | null;
    currentBlendSrc: any;
    currentBlendDst: number | null;
    currentBlendSrcAlpha: number | null;
    currentBlendDstAlpha: number | null;
    currentBlendColor: Color;
    currentBlendAlpha: number;
    currentPremultipledAlpha: boolean | null;
    currentPolygonOffsetFactor: any;
    currentPolygonOffsetUnits: number | null;
    currentColorMask: any;
    currentDepthReversed: boolean;
    currentDepthFunc: any;
    currentDepthMask: any;
    currentStencilFunc: any;
    currentStencilRef: number | null;
    currentStencilFuncMask: number | null;
    currentStencilFail: any;
    currentStencilZFail: number | null;
    currentStencilZPass: number | null;
    currentStencilMask: any;
    currentLineWidth: any;
    currentClippingPlanes: number;
    currentVAO: any;
    currentIndex: WebGLBuffer | null;
    currentBoundFramebuffers: {};
    currentDrawbuffers: WeakMap<object, any>;
    maxTextures: any;
    currentTextureSlot: any;
    currentBoundTextures: {};
    currentBoundBufferBases: {};
    /**
     * Inits the state of the utility.
     *
     * @private
     */
    private _init;
    currentScissor: Vector4 | undefined;
    currentViewport: Vector4 | undefined;
    _tempVec4: Vector4 | undefined;
    /**
     * Enables the given WebGL capability.
     *
     * This method caches the capability state so
     * `gl.enable()` is only called when necessary.
     *
     * @param {GLenum} id - The capability to enable.
     */
    enable(id: GLenum): void;
    /**
     * Disables the given WebGL capability.
     *
     * This method caches the capability state so
     * `gl.disable()` is only called when necessary.
     *
     * @param {GLenum} id - The capability to enable.
     */
    disable(id: GLenum): void;
    /**
     * Specifies whether polygons are front- or back-facing
     * by setting the winding orientation.
     *
     * This method caches the state so `gl.frontFace()` is only
     * called when necessary.
     *
     * @param {boolean} flipSided - Whether triangles flipped their sides or not.
     */
    setFlipSided(flipSided: boolean): void;
    /**
     * Specifies whether or not front- and/or back-facing
     * polygons can be culled.
     *
     * This method caches the state so `gl.cullFace()` is only
     * called when necessary.
     *
     * @param {number} cullFace - Defines which polygons are candidates for culling.
     */
    setCullFace(cullFace: number): void;
    /**
     * Specifies the width of line primitives.
     *
     * This method caches the state so `gl.lineWidth()` is only
     * called when necessary.
     *
     * @param {number} width - The line width.
     */
    setLineWidth(width: number): void;
    /**
     * Defines the blending for each draw buffer of a MRT-configured render target.
     *
     * @param {Array<Texture>} textures - The textures of the render target.
     * @param {?MRTNode} mrt - The MRT configuration.
     * @param {Material} material - The material whose blending is used for outputs with `MaterialBlending`.
     */
    setMRTBlending(textures: Array<Texture>, mrt: MRTNode | null, material: Material): void;
    /**
     * Applies blending configuration for a specific draw buffer index.
     *
     * @private
     * @param {number} index - The draw buffer index.
     * @param {Object} blending - The blending configuration (material or BlendMode).
     */
    private _setMRTBlendingIndex;
    /**
     * Defines the blending.
     *
     * This method caches the state so `gl.blendEquation()`, `gl.blendEquationSeparate()`,
     * `gl.blendFunc()`, `gl.blendFuncSeparate()` and `gl.blendColor()` are only called when necessary.
     *
     * @param {number} blending - The blending type.
     * @param {number} blendEquation - The blending equation.
     * @param {number} blendSrc - Only relevant for custom blending. The RGB source blending factor.
     * @param {number} blendDst - Only relevant for custom blending. The RGB destination blending factor.
     * @param {number} blendEquationAlpha - Only relevant for custom blending. The blending equation for alpha.
     * @param {number} blendSrcAlpha - Only relevant for custom blending. The alpha source blending factor.
     * @param {number} blendDstAlpha - Only relevant for custom blending. The alpha destination blending factor.
     * @param {Color} blendColor - Only relevant for custom blending. The RGB values of the constant blend color.
     * @param {number} blendAlpha - Only relevant for custom blending. The alpha value of the constant blend color.
     * @param {boolean} premultipliedAlpha - Whether premultiplied alpha is enabled or not.
     */
    setBlending(blending: number, blendEquation: number, blendSrc: number, blendDst: number, blendEquationAlpha: number, blendSrcAlpha: number, blendDstAlpha: number, blendColor: Color, blendAlpha: number, premultipliedAlpha: boolean): void;
    /**
     * Specifies whether colors can be written when rendering
     * into a framebuffer or not.
     *
     * This method caches the state so `gl.colorMask()` is only
     * called when necessary.
     *
     * @param {boolean} colorMask - The color mask.
     */
    setColorMask(colorMask: boolean): void;
    /**
     * Specifies whether the depth test is enabled or not.
     *
     * @param {boolean} depthTest - Whether the depth test is enabled or not.
     */
    setDepthTest(depthTest: boolean): void;
    /**
     * Configures the WebGL state to use a reversed depth buffer.
     *
     * @param {boolean} reversed - Whether the depth buffer is reversed or not.
     */
    setReversedDepth(reversed: boolean): void;
    /**
     * Specifies whether depth values can be written when rendering
     * into a framebuffer or not.
     *
     * This method caches the state so `gl.depthMask()` is only
     * called when necessary.
     *
     * @param {boolean} depthMask - The depth mask.
     */
    setDepthMask(depthMask: boolean): void;
    /**
     * Specifies the depth compare function.
     *
     * This method caches the state so `gl.depthFunc()` is only
     * called when necessary.
     *
     * @param {number} depthFunc - The depth compare function.
     */
    setDepthFunc(depthFunc: number): void;
    /**
     * Specifies the scissor box.
     *
     * @param {number} x - The x-coordinate of the lower left corner of the viewport.
     * @param {number} y - The y-coordinate of the lower left corner of the viewport.
     * @param {number} width - The width of the viewport.
     * @param {number} height - The height of the viewport.
     *
     */
    scissor(x: number, y: number, width: number, height: number): void;
    /**
     * Specifies the viewport.
     *
     * @param {number} x - The x-coordinate of the lower left corner of the viewport.
     * @param {number} y - The y-coordinate of the lower left corner of the viewport.
     * @param {number} width - The width of the viewport.
     * @param {number} height - The height of the viewport.
     *
     */
    viewport(x: number, y: number, width: number, height: number): void;
    /**
     * Defines the scissor test.
     *
     * @param {boolean} boolean - Whether the scissor test should be enabled or not.
     */
    setScissorTest(boolean: boolean): void;
    /**
     * Specifies whether the stencil test is enabled or not.
     *
     * @param {boolean} stencilTest - Whether the stencil test is enabled or not.
     */
    setStencilTest(stencilTest: boolean): void;
    /**
     * Specifies whether stencil values can be written when rendering
     * into a framebuffer or not.
     *
     * This method caches the state so `gl.stencilMask()` is only
     * called when necessary.
     *
     * @param {boolean} stencilMask - The stencil mask.
     */
    setStencilMask(stencilMask: boolean): void;
    /**
     * Specifies whether the stencil test functions.
     *
     * This method caches the state so `gl.stencilFunc()` is only
     * called when necessary.
     *
     * @param {number} stencilFunc - The stencil compare function.
     * @param {number} stencilRef - The reference value for the stencil test.
     * @param {number} stencilMask - A bit-wise mask that is used to AND the reference value and the stored stencil value when the test is done.
     */
    setStencilFunc(stencilFunc: number, stencilRef: number, stencilMask: number): void;
    /**
     * Specifies whether the stencil test operation.
     *
     * This method caches the state so `gl.stencilOp()` is only
     * called when necessary.
     *
     * @param {number} stencilFail - The function to use when the stencil test fails.
     * @param {number} stencilZFail - The function to use when the stencil test passes, but the depth test fail.
     * @param {number} stencilZPass - The function to use when both the stencil test and the depth test pass,
     * or when the stencil test passes and there is no depth buffer or depth testing is disabled.
     */
    setStencilOp(stencilFail: number, stencilZFail: number, stencilZPass: number): void;
    /**
     * Configures the WebGL state for the given material.
     *
     * @param {Material} material - The material to configure the state for.
     * @param {number} frontFaceCW - Whether the front faces are counter-clockwise or not.
     * @param {number} hardwareClippingPlanes - The number of hardware clipping planes.
     */
    setMaterial(material: Material, frontFaceCW: number, hardwareClippingPlanes: number): void;
    /**
     * Specifies the polygon offset.
     *
     * This method caches the state so `gl.polygonOffset()` is only
     * called when necessary.
     *
     * @param {boolean} polygonOffset - Whether polygon offset is enabled or not.
     * @param {number} factor - The scale factor for the variable depth offset for each polygon.
     * @param {number} units - The multiplier by which an implementation-specific value is multiplied with to create a constant depth offset.
     */
    setPolygonOffset(polygonOffset: boolean, factor: number, units: number): void;
    /**
     * Defines the usage of the given WebGL program.
     *
     * This method caches the state so `gl.useProgram()` is only
     * called when necessary.
     *
     * @param {WebGLProgram} program - The WebGL program to use.
     * @return {boolean} Whether a program change has been executed or not.
     */
    useProgram(program: WebGLProgram): boolean;
    /**
     * Sets the vertex state by binding the given VAO and element buffer.
     *
     * @param {WebGLVertexArrayObject} vao - The VAO.
     * @param {?WebGLBuffer} indexBuffer - The index buffer.
     * @return {boolean} Whether a vertex state has been changed or not.
     */
    setVertexState(vao: WebGLVertexArrayObject, indexBuffer?: WebGLBuffer | null): boolean;
    /**
     * Resets the vertex array state by resetting the VAO and element buffer.
     */
    resetVertexState(): void;
    /**
     * Binds the given framebuffer.
     *
     * This method caches the state so `gl.bindFramebuffer()` is only
     * called when necessary.
     *
     * @param {number} target - The binding point (target).
     * @param {WebGLFramebuffer} framebuffer - The WebGL framebuffer to bind.
     * @return {boolean} Whether a bind has been executed or not.
     */
    bindFramebuffer(target: number, framebuffer: WebGLFramebuffer): boolean;
    /**
     * Defines draw buffers to which fragment colors are written into.
     * Configures the MRT setup of custom framebuffers.
     *
     * This method caches the state so `gl.drawBuffers()` is only
     * called when necessary.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {WebGLFramebuffer} framebuffer - The WebGL framebuffer.
     */
    drawBuffers(renderContext: RenderContext, framebuffer: WebGLFramebuffer): void;
    /**
     * Makes the given texture unit active.
     *
     * This method caches the state so `gl.activeTexture()` is only
     * called when necessary.
     *
     * @param {number} webglSlot - The texture unit to make active.
     */
    activeTexture(webglSlot: number): void;
    /**
     * Binds the given WebGL texture to a target.
     *
     * This method caches the state so `gl.bindTexture()` is only
     * called when necessary.
     *
     * @param {number} webglType - The binding point (target).
     * @param {WebGLTexture} webglTexture - The WebGL texture to bind.
     * @param {number} webglSlot - The texture.
     */
    bindTexture(webglType: number, webglTexture: WebGLTexture, webglSlot: number): void;
    /**
     * Binds a given WebGL buffer to a given binding point (target) at a given index.
     *
     * This method caches the state so `gl.bindBufferBase()` is only
     * called when necessary.
     *
     * @param {number} target - The target for the bind operation.
     * @param {number} index - The index of the target.
     * @param {WebGLBuffer} buffer - The WebGL buffer.
     * @return {boolean} Whether a bind has been executed or not.
     */
    bindBufferBase(target: number, index: number, buffer: WebGLBuffer): boolean;
    /**
     * Unbinds the current bound texture.
     *
     * This method caches the state so `gl.bindTexture()` is only
     * called when necessary.
     */
    unbindTexture(): void;
    /**
     * Returns the value for the given parameter.
     *
     * @param {number} name - The parameter to get the value for.
     * @return {any} The value for the given parameter.
     */
    getParameter(name: number): any;
    /**
     * Specifies a pixel storage mode.
     *
     * @param {number} name - The parameter to set.
     * @param {any} value - A value to set the parameter to.
     */
    pixelStorei(name: number, value: any): void;
    /**
     * Restores the WebGL state to its default and clears the cache so subsequent renderings
     * re-apply the required state. Useful when the WebGL context is shared with other libraries.
     */
    reset(): void;
}
/**
 * A WebGL 2 backend utility module with common helpers.
 *
 * @private
 */
declare class WebGLUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * A reference to the rendering context.
     *
     * @type {WebGL2RenderingContext}
     */
    gl: WebGL2RenderingContext;
    /**
     * A reference to a backend module holding extension-related
     * utility functions.
     *
     * @type {WebGLExtensions}
     */
    extensions: WebGLExtensions;
    /**
     * Converts the given three.js constant into a WebGL constant.
     * The method currently supports the conversion of texture formats
     * and types.
     *
     * @param {number} p - The three.js constant.
     * @param {string} [colorSpace=NoColorSpace] - The color space.
     * @return {?number} The corresponding WebGL constant.
     */
    convert(p: number, colorSpace?: string): number | null;
    /**
     * This method can be used to synchronize the CPU with the GPU by waiting until
     * ongoing GPU commands have been completed.
     *
     * @private
     * @return {Promise} A promise that resolves when all ongoing GPU commands have been completed.
     */
    private _clientWaitAsync;
}
/**
 * A special type of render target that is used when rendering
 * with the WebXR Device API.
 *
 * @private
 * @augments RenderTarget
 */
declare class XRRenderTarget extends RenderTarget {
    /**
     * Constructs a new XR render target.
     *
     * @param {number} [width=1] - The width of the render target.
     * @param {number} [height=1] - The height of the render target.
     * @param {Object} [options={}] - The configuration options.
     */
    constructor(width?: number, height?: number, options?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isXRRenderTarget: boolean;
    /**
     * Whether the attachments of the render target
     * are defined by external textures. This flag is
     * set to `true` when using the WebXR Layers API.
     *
     * @private
     * @type {boolean}
     * @default false
     */
    private _hasExternalTextures;
    /**
     * Whether a depth buffer should automatically be allocated
     * for this XR render target or not.
     *
     * Allocating a depth buffer is the default behavior of XR render
     * targets. However, when using the WebXR Layers API, this flag
     * must be set to `false` when the `ignoreDepthValues` property of
     * the projection layers evaluates to `false`.
     *
     * Reference: {@link https://www.w3.org/TR/webxrlayers-1/#dom-xrprojectionlayer-ignoredepthvalues}.
     *
     * @private
     * @type {boolean}
     * @default true
     */
    private _autoAllocateDepthBuffer;
    /**
     * Whether this render target is associated with a XRWebGLLayer.
     *
     * A XRWebGLLayer points to an opaque framebuffer. Basically,
     * this means that you don't have access to its bound color,
     * stencil and depth buffers. We need to handle this framebuffer
     * differently since its textures are always bound.
     *
     * @private
     * @type {boolean}
     * @default false
     * */
    private _isOpaqueFramebuffer;
    copy(source: any): this;
}
/**
 * Class for representing compute pipelines.
 *
 * @private
 * @augments Pipeline
 */
declare class ComputePipeline extends Pipeline {
    /**
     * Constructs a new compute pipeline.
     *
     * @param {string} cacheKey - The pipeline's cache key.
     * @param {ProgrammableStage} computeProgram - The pipeline's compute shader.
     * @param {?Array<Object>} [transforms=null] - The transforms (only relevant for WebGL 2 which uses Transform Feedback).
     * @param {?Array<Object>} [attributes=null] - The attributes (only relevant for WebGL 2 which uses Transform Feedback).
     */
    constructor(cacheKey: string, computeProgram: ProgrammableStage, transforms?: Array<Object> | null, attributes?: Array<Object> | null);
    /**
     * The pipeline's compute shader.
     *
     * @type {ProgrammableStage}
     */
    computeProgram: ProgrammableStage;
    /**
     * The transforms (only relevant for WebGL 2 which uses Transform Feedback).
     *
     * @type {?Array<Object>}
     */
    transforms: Array<Object> | null;
    /**
     * The attributes (only relevant for WebGL 2 which uses Transform Feedback).
     *
     * @type {?Array<Object>}
     */
    attributes: Array<Object> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isComputePipeline: boolean;
}
/**
 * A render object is the renderer's representation of single entity that gets drawn
 * with a draw command. There is no unique mapping of render objects to 3D objects in the
 * scene since render objects also depend from the used material, the current render context
 * and the current scene's lighting.
 *
 * In general, the basic process of the renderer is:
 *
 * - Analyze the 3D objects in the scene and generate render lists containing render items.
 * - Process the render lists by calling one or more render commands for each render item.
 * - For each render command, request a render object and perform the draw.
 *
 * The module provides an interface to get data required for the draw command like the actual
 * draw parameters or vertex buffers. It also holds a series of caching related methods since
 * creating render objects should only be done when necessary.
 *
 * @private
 */
declare class RenderObject {
    /**
     * Constructs a new render object.
     *
     * @param {NodeManager} nodes - Renderer component for managing nodes related logic.
     * @param {Geometries} geometries - Renderer component for managing geometries.
     * @param {Renderer} renderer - The renderer.
     * @param {Object3D} object - The 3D object.
     * @param {Material} material - The 3D object's material.
     * @param {Scene} scene - The scene the 3D object belongs to.
     * @param {Camera} camera - The camera the object should be rendered with.
     * @param {LightsNode} lightsNode - The lights node.
     * @param {RenderContext} renderContext - The render context.
     * @param {ClippingContext} clippingContext - The clipping context.
     */
    constructor(nodes: NodeManager, geometries: Geometries, renderer: Renderer, object: Object3D, material: Material, scene: Scene, camera: Camera, lightsNode: LightsNode, renderContext: RenderContext, clippingContext: ClippingContext);
    id: number;
    /**
     * Renderer component for managing nodes related logic.
     *
     * @type {NodeManager}
     * @private
     */
    private _nodes;
    /**
     * Renderer component for managing geometries.
     *
     * @type {Geometries}
     * @private
     */
    private _geometries;
    /**
     * The renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * The 3D object.
     *
     * @type {Object3D}
     */
    object: Object3D;
    /**
     * The 3D object's material.
     *
     * @type {Material}
     */
    material: Material;
    /**
     * The scene the 3D object belongs to.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The camera the 3D object should be rendered with.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The lights node.
     *
     * @type {LightsNode}
     */
    lightsNode: LightsNode;
    /**
     * The render context.
     *
     * @type {RenderContext}
     */
    context: RenderContext;
    /**
     * The 3D object's geometry.
     *
     * @type {BufferGeometry}
     */
    geometry: BufferGeometry;
    /**
     * The geometry's version. Incremented whenever the geometry is updated.
     *
     * @type {number}
     * @default 0
     */
    geometryVersion: number;
    /**
     * The render object's version.
     *
     * @type {number}
     */
    version: number;
    /**
     * The draw range of the geometry.
     *
     * @type {?Object}
     * @default null
     */
    drawRange: Object | null;
    /**
     * An array holding the buffer attributes
     * of the render object. This entails attribute
     * definitions on geometry and node level.
     *
     * @type {?Array<BufferAttribute>}
     * @default null
     */
    attributes: Array<BufferAttribute> | null;
    /**
     * An object holding the version of the
     * attributes. The keys are the attribute names
     * and the values are the attribute versions.
     *
     * @type {?Object<string, number>}
     * @default null
     */
    attributesId: {
        [x: string]: number;
    } | null;
    /**
     * A reference to a render pipeline the render
     * object is processed with.
     *
     * @type {RenderPipeline}
     * @default null
     */
    pipeline: RenderPipeline;
    /**
     * Only relevant for objects using
     * multiple materials. This represents a group entry
     * from the respective `BufferGeometry`.
     *
     * @type {?{start: number, count: number}}
     * @default null
     */
    group: {
        start: number;
        count: number;
    } | null;
    /**
     * An array holding the vertex buffers which can
     * be buffer attributes but also interleaved buffers.
     *
     * @type {?Array<BufferAttribute|InterleavedBuffer>}
     * @default null
     */
    vertexBuffers: Array<BufferAttribute | InterleavedBuffer> | null;
    /**
     * The parameters for the draw command.
     *
     * @type {?Object}
     * @default null
     */
    drawParams: Object | null;
    /**
     * If this render object is used inside a render bundle,
     * this property points to the respective bundle group.
     *
     * @type {?BundleGroup}
     * @default null
     */
    bundle: BundleGroup | null;
    /**
     * The clipping context.
     *
     * @type {ClippingContext}
     */
    clippingContext: ClippingContext;
    /**
     * The clipping context's cache key.
     *
     * @type {string}
     */
    clippingContextCacheKey: string;
    /**
     * The initial node cache key.
     *
     * @type {number}
     */
    initialNodesCacheKey: number;
    /**
     * The initial cache key.
     *
     * @type {number}
     */
    initialCacheKey: number;
    /**
     * The initial geometry cache key.
     *
     * @type {string}
     */
    initialGeometryCacheKey: string;
    /**
     * The node builder state.
     *
     * @type {?NodeBuilderState}
     * @private
     * @default null
     */
    private _nodeBuilderState;
    /**
     * An array of bindings.
     *
     * @type {?Array<BindGroup>}
     * @private
     * @default null
     */
    private _bindings;
    /**
     * Reference to the node material observer.
     *
     * @type {?NodeMaterialObserver}
     * @private
     * @default null
     */
    private _monitor;
    /**
     * The object's original material when this render object is drawn with an
     * override material.
     *
     * @type {?Material}
     * @private
     * @default null
     */
    private _sourceMaterial;
    /**
     * An event listener which is defined by `RenderObjects`. It performs
     * clean up tasks when `dispose()` on this render object.
     *
     * @method
     */
    onDispose: any;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderObject: boolean;
    /**
     * An event listener which is executed when `dispose()` is called on
     * the material of this render object.
     *
     * @method
     */
    onMaterialDispose: () => void;
    /**
     * An event listener which is executed when `dispose()` is called on
     * the geometry of this render object.
     *
     * @method
     */
    onGeometryDispose: () => void;
    /**
     * An event listener which is executed when `dispose()` is called on
     * the 3D object of this render object.
     *
     * @method
     */
    onObjectDispose: () => void;
    /**
     * Updates the clipping context.
     *
     * @param {ClippingContext} context - The clipping context to set.
     */
    updateClipping(context: ClippingContext): void;
    /**
     * Whether the clipping requires an update or not.
     *
     * @type {boolean}
     * @readonly
     */
    readonly get clippingNeedsUpdate(): boolean;
    /**
     * The number of clipping planes defined in context of hardware clipping.
     *
     * @type {number}
     * @readonly
     */
    readonly get hardwareClippingPlanes(): number;
    /**
     * Returns the node builder state of this render object.
     *
     * @return {NodeBuilderState} The node builder state.
     */
    getNodeBuilderState(): NodeBuilderState;
    /**
     * Returns the node material observer of this render object.
     *
     * @return {NodeMaterialObserver} The node material observer.
     */
    getMonitor(): NodeMaterialObserver;
    /**
     * Returns an array of bind groups of this render object.
     *
     * @return {Array<BindGroup>} The bindings.
     */
    getBindings(): Array<BindGroup>;
    /**
     * Returns a binding group by group name of this render object.
     *
     * @param {string} name - The name of the binding group.
     * @return {?BindGroup} The bindings.
     */
    getBindingGroup(name: string): BindGroup | null;
    /**
     * Returns the index of the render object's geometry.
     *
     * @return {?BufferAttribute} The index. Returns `null` for non-indexed geometries.
     */
    getIndex(): BufferAttribute | null;
    /**
     * Returns the indirect buffer attribute.
     *
     * @return {?BufferAttribute} The indirect attribute. `null` if no indirect drawing is used.
     */
    getIndirect(): BufferAttribute | null;
    /**
     * Returns the byte offset into the indirect attribute buffer.
     *
     * @return {number|Array<number>} The byte offset into the indirect attribute buffer.
     */
    getIndirectOffset(): number | Array<number>;
    /**
     * Returns an array that acts as a key for identifying the render object in a chain map.
     *
     * @return {Array<Object>} An array with object references.
     */
    getChainArray(): Array<Object>;
    /**
     * This method is used when the geometry of a 3D object has been exchanged and the
     * respective render object now requires an update.
     *
     * @param {BufferGeometry} geometry - The geometry to set.
     */
    setGeometry(geometry: BufferGeometry): void;
    /**
     * Returns the buffer attributes of the render object. The returned array holds
     * attribute definitions on geometry and node level.
     *
     * @return {Array<BufferAttribute>} An array with buffer attributes.
     */
    getAttributes(): Array<BufferAttribute>;
    /**
     * Returns the vertex buffers of the render object.
     *
     * @return {Array<BufferAttribute|InterleavedBuffer>} An array with buffer attribute or interleaved buffers.
     */
    getVertexBuffers(): Array<BufferAttribute | InterleavedBuffer>;
    /**
     * Returns the draw parameters for the render object.
     *
     * @return {?{vertexCount: number, firstVertex: number, instanceCount: number, firstInstance: number}} The draw parameters.
     */
    getDrawParameters(): {
        vertexCount: number;
        firstVertex: number;
        instanceCount: number;
        firstInstance: number;
    } | null;
    /**
     * Returns the render object's geometry cache key.
     *
     * The geometry cache key is part of the material cache key.
     *
     * @return {string} The geometry cache key.
     */
    getGeometryCacheKey(): string;
    /**
     * Returns the render object's material cache key.
     *
     * The material cache key is part of the render object cache key.
     *
     * @return {number} The material cache key.
     */
    getMaterialCacheKey(): number;
    /**
     * Whether the geometry requires an update or not.
     *
     * @type {boolean}
     * @readonly
     */
    readonly get needsGeometryUpdate(): boolean;
    /**
     * Whether the render object requires an update or not.
     *
     * Note: There are two distinct places where render objects are checked for an update.
     *
     * 1. In `RenderObjects.get()` which is executed when the render object is request. This
     * method checks the `needsUpdate` flag and recreates the render object if necessary.
     * 2. In `Renderer._renderObjectDirect()` right after getting the render object via
     * `RenderObjects.get()`. The render object's NodeMaterialObserver is then used to detect
     * a need for a refresh due to material, geometry or object related value changes.
     *
     * TODO: Investigate if it's possible to merge both steps so there is only a single place
     * that performs the 'needsUpdate' check.
     *
     * @type {boolean}
     * @readonly
     */
    readonly get needsUpdate(): boolean;
    /**
     * Returns the dynamic cache key which represents a key that is computed per draw command.
     *
     * @return {number} The cache key.
     */
    getDynamicCacheKey(): number;
    /**
     * Returns the render object's cache key.
     *
     * @return {number} The cache key.
     */
    getCacheKey(): number;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
/**
 * Class for representing programmable stages which are vertex,
 * fragment or compute shaders. Unlike fixed-function states (like blending),
 * they represent the programmable part of a pipeline.
 *
 * @private
 */
declare class ProgrammableStage {
    /**
     * Constructs a new programmable stage.
     *
     * @param {string} code - The shader code.
     * @param {('vertex'|'fragment'|'compute')} stage - The type of stage.
     * @param {string} name - The name of the shader.
     */
    constructor(code: string, stage: ("vertex" | "fragment" | "compute"), name: string);
    /**
     * The id of the programmable stage.
     *
     * @type {number}
     */
    id: number;
    /**
     * The shader code.
     *
     * @type {string}
     */
    code: string;
    /**
     * The type of stage.
     *
     * @type {string}
     */
    stage: string;
    /**
     * The name of the stage.
     * This is used for debugging purposes.
     *
     * @type {string}
     */
    name: string;
    /**
     * How often the programmable stage is currently in use.
     *
     * @type {number}
     * @default 0
     */
    usedTimes: number;
}
/**
 * Abstract class for representing pipelines.
 *
 * @private
 * @abstract
 */
declare class Pipeline {
    /**
     * Constructs a new pipeline.
     *
     * @param {string} cacheKey - The pipeline's cache key.
     */
    constructor(cacheKey: string);
    /**
     * The pipeline's cache key.
     *
     * @type {string}
     */
    cacheKey: string;
    /**
     * How often the pipeline is currently in use.
     *
     * @type {number}
     * @default 0
     */
    usedTimes: number;
}
/**
 * Represents a buffer binding type.
 *
 * @private
 * @abstract
 * @augments Binding
 */
declare class Buffer extends Binding {
    /**
     * Constructs a new buffer.
     *
     * @param {string} name - The buffer's name.
     * @param {TypedArray} [buffer=null] - The buffer.
     */
    constructor(name: string, buffer?: TypedArray);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBuffer: boolean;
    /**
     * The bytes per element.
     *
     * @type {number}
     */
    bytesPerElement: number;
    /**
     * A reference to the internal buffer.
     *
     * @private
     * @type {TypedArray}
     */
    private _buffer;
    /**
     * An array of update ranges.
     *
     * @private
     * @type {Array<{start: number, count: number}>}
     */
    private _updateRanges;
    /**
     * The array of update ranges.
     *
     * @type {Array<{start: number, count: number}>}
     */
    get updateRanges(): Array<{
        start: number;
        count: number;
    }>;
    /**
     * Adds an update range.
     *
     * @param {number} start - The start index.
     * @param {number} count - The number of elements.
     */
    addUpdateRange(start: number, count: number): void;
    /**
     * Clears all update ranges.
     */
    clearUpdateRanges(): void;
    /**
     * The buffer's byte length.
     *
     * @type {number}
     * @readonly
     */
    readonly get byteLength(): number;
    /**
     * A reference to the internal buffer.
     *
     * @type {Float32Array}
     * @readonly
     */
    readonly get buffer(): Float32Array;
    /**
     * Updates the binding.
     *
     * @return {boolean} Whether the buffer has been updated and must be
     * uploaded to the GPU.
     */
    update(): boolean;
    /**
     * Releases the buffer.
     */
    release(): void;
}
/**
 * A WebGPU backend utility module with common helpers.
 *
 * @private
 */
declare class WebGPUUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * Caches the preferred canvas format.
     *
     * @private
     * @type {?string}
     * @default null
     */
    private _preferredCanvasFormat;
    /**
     * Returns the depth/stencil GPU format for the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {string} The depth/stencil GPU texture format.
     */
    getCurrentDepthStencilFormat(renderContext: RenderContext): string;
    /**
     * Returns the GPU format for the given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {string} The GPU texture format.
     */
    getTextureFormatGPU(texture: Texture): string;
    /**
     * Returns an object that defines the multi-sampling state of the given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {Object} The multi-sampling state.
     */
    getTextureSampleData(texture: Texture): Object;
    /**
     * Returns the default color attachment's GPU format of the current render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {string} The GPU texture format of the default color attachment.
     */
    getCurrentColorFormat(renderContext: RenderContext): string;
    /**
     * Returns the GPU formats of all color attachments of the current render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {Array<string>} The GPU texture formats of all color attachments.
     */
    getCurrentColorFormats(renderContext: RenderContext): Array<string>;
    /**
     * Returns the output color space of the current render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {string} The output color space.
     */
    getCurrentColorSpace(renderContext: RenderContext): string;
    /**
     * Returns GPU primitive topology for the given object and material.
     *
     * @param {Object3D} object - The 3D object.
     * @param {Material} material - The material.
     * @return {string} The GPU primitive topology.
     */
    getPrimitiveTopology(object: Object3D, material: Material): string;
    /**
     * Returns the GPU strip index format for the given object and geometry.
     *
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The geometry.
     * @return {string|undefined} The GPU strip index format. `undefined` if the object is not rendered as an indexed strip.
     */
    getStripIndexFormat(object: Object3D, geometry: BufferGeometry): string | undefined;
    /**
     * Returns a modified sample count from the given sample count value.
     *
     * That is required since WebGPU only supports either 1 or 4.
     *
     * @param {number} sampleCount - The input sample count.
     * @return {number} The (potentially updated) output sample count.
     */
    getSampleCount(sampleCount: number): number;
    /**
     * Returns the sample count of the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @return {number} The sample count.
     */
    getSampleCountRenderContext(renderContext: RenderContext): number;
    /**
     * Returns the preferred canvas format.
     *
     * There is a separate method for this so it's possible to
     * honor edge cases for specific devices.
     *
     * @return {string} The GPU texture format of the canvas.
     */
    getPreferredCanvasFormat(): string;
}
/**
 * A WebGPU backend utility module for managing shader attributes.
 *
 * @private
 */
declare class WebGPUAttributeUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * Creates the GPU buffer for the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     * @param {GPUBufferUsage} usage - A flag that indicates how the buffer may be used after its creation.
     */
    createAttribute(attribute: BufferAttribute, usage: GPUBufferUsage): void;
    /**
     * Updates the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    updateAttribute(attribute: BufferAttribute): void;
    /**
     * Returns the vertex buffer layout data which are required
     * when creating a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {Array<Object>} An array holding objects which describe the vertex buffer layout.
     */
    getVertexBufferLayout(renderObject: RenderObject): Array<Object>;
    /**
     * Returns a cache key that represents the vertex buffer layout data
     * of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {string} The cache key.
     */
    getVertexBufferLayoutCacheKey(renderObject: RenderObject): string;
    /**
     * Destroys the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    destroyAttribute(attribute: BufferAttribute): void;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU. ReadbackBuffer can
     * be used to retain and reuse handles to the intermediate buffers and prevent
     * new allocation.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: (ReadbackBuffer | ArrayBuffer) | null, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
    /**
     * Returns the vertex format of the given buffer attribute.
     *
     * @private
     * @param {BufferAttribute} geometryAttribute - The buffer attribute.
     * @return {string|undefined} The vertex format (e.g. 'float32x3').
     */
    private _getVertexFormat;
}
/**
 * A WebGPU backend utility module for managing bindings.
 *
 * When reading the documentation it's helpful to keep in mind that
 * all class definitions starting with 'GPU*' are modules from the
 * WebGPU API. So for example `BindGroup` is a class from the engine
 * whereas `GPUBindGroup` is a class from WebGPU.
 *
 * @private
 */
declare class WebGPUBindingUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * A cache that maps combinations of layout entries to existing bind group layouts.
     *
     * @private
     * @type {Map<string, BindGroupLayout>}
     */
    private _bindGroupLayoutCache;
    /**
     * Creates a GPU bind group layout for the given bind group.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @return {GPUBindGroupLayout} The GPU bind group layout.
     */
    createBindingsLayout(bindGroup: BindGroup): GPUBindGroupLayout;
    /**
     * Creates bindings from the given bind group definition.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {Array<BindGroup>} bindings - Array of bind groups.
     * @param {string} cacheKey - The cache key.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheKey: string, version?: number): void;
    /**
     * Updates a buffer binding.
     *
     *  @param {Buffer} binding - The buffer binding to update.
     */
    updateBinding(binding: Buffer): void;
    /**
     * Creates a GPU bind group for the camera index.
     *
     * @param {Uint32Array} data - The index data.
     * @param {GPUBindGroupLayout} layoutGPU - The GPU bind group layout.
     * @return {GPUBindGroup} The GPU bind group.
     */
    createBindGroupIndex(data: Uint32Array, layoutGPU: GPUBindGroupLayout): GPUBindGroup;
    /**
     * Creates a GPU bind group for the given bind group and GPU layout.
     *
     * @param {BindGroup} bindGroup - The bind group.
     * @param {GPUBindGroupLayout} layoutGPU - The GPU bind group layout.
     * @return {GPUBindGroup} The GPU bind group.
     */
    createBindGroup(bindGroup: BindGroup, layoutGPU: GPUBindGroupLayout): GPUBindGroup;
    /**
     * Creates a GPU bind group layout entries for the given bind group.
     *
     * @private
     * @param {BindGroup} bindGroup - The bind group.
     * @return {Array<GPUBindGroupLayoutEntry>} The GPU bind group layout entries.
     */
    private _createLayoutEntries;
    /**
     * Delete the data associated with a bind group.
     *
     * @param {BindGroup} bindGroup - The bind group.
     */
    deleteBindGroupData(bindGroup: BindGroup): void;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
/**
 * A WebGPU backend utility module for managing the device's capabilities.
 *
 * @private
 */
declare class WebGPUCapabilities {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * Returns the maximum anisotropy texture filtering value.
     *
     * @return {number} The maximum anisotropy texture filtering value.
     */
    getMaxAnisotropy(): number;
    /**
     * Returns the maximum number of bytes available for uniform buffers.
     *
     * @return {number} The maximum number of bytes available for uniform buffers.
     */
    getUniformBufferLimit(): number;
}
/**
 * A WebGPU backend utility module for managing pipelines.
 *
 * @private
 */
declare class WebGPUPipelineUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * Returns the sample count derived from the given render context.
     *
     * @private
     * @param {RenderContext} renderContext - The render context.
     * @return {number} The sample count.
     */
    private _getSampleCount;
    /**
     * Creates a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {Array<Promise>} promises - An array of compilation promises which are used in `compileAsync()`.
     */
    createRenderPipeline(renderObject: RenderObject, promises: Array<Promise<any>>): void;
    /**
     * Creates GPU render bundle encoder for the given render context.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {?string} [label='renderBundleEncoder'] - The label.
     * @return {GPURenderBundleEncoder} The GPU render bundle encoder.
     */
    createBundleEncoder(renderContext: RenderContext, label?: string | null): GPURenderBundleEncoder;
    /**
     * Creates a compute pipeline for the given compute node.
     *
     * @param {ComputePipeline} pipeline - The compute pipeline.
     * @param {Array<BindGroup>} bindings - The bindings.
     * @param {?Array<Promise>} [promises=null] - Optional compilation promises.
     */
    createComputePipeline(pipeline: ComputePipeline, bindings: Array<BindGroup>, promises?: Array<Promise<any>> | null): void;
    /**
     * Reads line-accurate diagnostics from shader modules and logs them.
     * Called from pipeline creation error paths to turn opaque validation
     * failures into actionable WGSL feedback.
     *
     * @private
     * @param {Array<{program: ProgrammableStage, module: GPUShaderModule}>} stages - Pairs of program + compiled shader module.
     * @param {string} pipelineLabel - Label of the owning pipeline, used as log prefix.
     * @return {Promise<void>}
     */
    private _reportShaderDiagnostics;
    /**
     * Returns the blending state as a descriptor object required
     * for the pipeline creation.
     *
     * @private
     * @param {Material|BlendMode} object - The object containing blending information.
     * @return {Object} The blending state.
     */
    private _getBlending;
    /**
     * Returns the GPU blend factor which is required for the pipeline creation.
     *
     * @private
     * @param {number} blend - The blend factor as a three.js constant.
     * @return {string} The GPU blend factor.
     */
    private _getBlendFactor;
    /**
     * Returns the GPU stencil compare function which is required for the pipeline creation.
     *
     * @private
     * @param {Material} material - The material.
     * @return {string} The GPU stencil compare function.
     */
    private _getStencilCompare;
    /**
     * Returns the GPU stencil operation which is required for the pipeline creation.
     *
     * @private
     * @param {number} op - A three.js constant defining the stencil operation.
     * @return {string} The GPU stencil operation.
     */
    private _getStencilOperation;
    /**
     * Returns the GPU blend operation which is required for the pipeline creation.
     *
     * @private
     * @param {number} blendEquation - A three.js constant defining the blend equation.
     * @return {string} The GPU blend operation.
     */
    private _getBlendOperation;
    /**
     * Returns the primitive state as a descriptor object required
     * for the pipeline creation.
     *
     * @private
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The geometry.
     * @param {Material} material - The material.
     * @return {Object} The primitive state.
     */
    private _getPrimitiveState;
    /**
     * Returns the GPU color write mask which is required for the pipeline creation.
     *
     * @private
     * @param {Material} material - The material.
     * @return {number} The GPU color write mask.
     */
    private _getColorWriteMask;
    /**
     * Returns the GPU depth compare function which is required for the pipeline creation.
     *
     * @private
     * @param {Material} material - The material.
     * @return {string} The GPU depth compare function.
     */
    private _getDepthCompare;
}
/**
 * A WebGPU backend utility module for managing textures.
 *
 * @private
 */
declare class WebGPUTextureUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * A reference to the pass utils.
     *
     * @type {?WebGPUTexturePassUtils}
     * @default null
     */
    _passUtils: WebGPUTexturePassUtils | null;
    /**
     * A dictionary for managing default textures. The key
     * is the texture format, the value the texture object.
     *
     * @type {Object<string,Texture>}
     */
    defaultTexture: {
        [x: string]: Texture;
    };
    /**
     * A dictionary for managing default cube textures. The key
     * is the texture format, the value the texture object.
     *
     * @type {Object<string,CubeTexture>}
     */
    defaultCubeTexture: {
        [x: string]: CubeTexture;
    };
    /**
     * A default video frame.
     *
     * @type {?VideoFrame}
     * @default null
     */
    defaultVideoFrame: VideoFrame | null;
    /**
     * A cache of shared texture samplers.
     *
     * @type {Map<string, Object>}
     */
    _samplerCache: Map<string, Object>;
    /**
     * Creates a GPU sampler for the given texture.
     *
     * @param {Sampler} binding - The sampler binding to update.
     * @return {string} The current sampler key.
     */
    updateSampler(binding: Sampler): string;
    /**
     * Frees the GPU sampler referenced by the given sampler binding.
     *
     * @param {Sampler} binding - The sampler binding to free.
     */
    destroySampler(binding: Sampler): void;
    /**
     * Releases the pooled sampler referenced by the given binding data and
     * removes it from the cache when no binding references it anymore.
     *
     * @private
     * @param {Object} bindingData - The binding data holding the sampler reference.
     */
    private _releaseSampler;
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
     * Destroys the GPU data for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {boolean} [isDefaultTexture=false] - Whether the texture uses a default GPU texture or not.
     */
    destroyTexture(texture: Texture, isDefaultTexture?: boolean): void;
    /**
     * Generates mipmaps for the given texture.
     *
     * @param {Texture} texture - The texture.
     * @param {?GPUCommandEncoder} [encoder=null] - An optional command encoder used to generate mipmaps.
     */
    generateMipmaps(texture: Texture, encoder?: GPUCommandEncoder | null): void;
    /**
     * Returns the color buffer representing the color
     * attachment of the default framebuffer.
     *
     * @return {GPUTexture} The color buffer.
     */
    getColorBuffer(): GPUTexture;
    /**
     * Returns the depth buffer representing the depth
     * attachment of the default framebuffer.
     *
     * @param {boolean} [depth=true] - Whether depth is enabled or not.
     * @param {boolean} [stencil=false] -  Whether stencil is enabled or not.
     * @return {GPUTexture} The depth buffer.
     */
    getDepthBuffer(depth?: boolean, stencil?: boolean): GPUTexture;
    /**
     * Uploads the updated texture data to the GPU.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    updateTexture(texture: Texture, options?: Object): void;
    /**
     * Returns texture data as a typed array.
     *
     * @async
     * @param {Texture} texture - The texture to copy.
     * @param {number} x - The x coordinate of the copy origin.
     * @param {number} y - The y coordinate of the copy origin.
     * @param {number} width - The width of the copy.
     * @param {number} height - The height of the copy.
     * @param {number} faceIndex - The cube face, depth slice or array layer index.
     * @return {Promise<TypedArray>} A Promise that resolves with a typed array when the copy operation has finished.
     */
    copyTextureToBuffer(texture: Texture, x: number, y: number, width: number, height: number, faceIndex: number): Promise<TypedArray>;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
    /**
     * Returns the default GPU texture for the given format.
     *
     * @private
     * @param {string} format - The GPU format.
     * @return {GPUTexture} The GPU texture.
     */
    private _getDefaultTextureGPU;
    /**
     * Returns the default GPU cube texture for the given format.
     *
     * @private
     * @param {string} format - The GPU format.
     * @return {GPUTexture} The GPU texture.
     */
    private _getDefaultCubeTextureGPU;
    /**
     * Uploads cube texture image data to the GPU memory.
     *
     * @private
     * @param {CubeTexture} texture - The cube texture.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     */
    private _copyCubeMapToTexture;
    /**
     * Uploads texture image data to the GPU memory.
     *
     * @private
     * @param {HTMLImageElement|ImageBitmap|HTMLCanvasElement} image - The image data.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     * @param {number} originDepth - The origin depth.
     * @param {boolean} flipY - Whether to flip texture data along their vertical axis or not.
     * @param {boolean} premultiplyAlpha - Whether the texture should have its RGB channels premultiplied by the alpha channel or not.
     * @param {number} [mipLevel=0] - The mip level where the data should be copied to.
     */
    private _copyImageToTexture;
    /**
     * Returns the pass utils singleton.
     *
     * @private
     * @return {WebGPUTexturePassUtils} The utils instance.
     */
    private _getPassUtils;
    /**
     * Generates mipmaps for the given GPU texture.
     *
     * @private
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {?GPUCommandEncoder} [encoder=null] - An optional command encoder used to generate mipmaps.
     */
    private _generateMipmaps;
    /**
     * Flip the contents of the given GPU texture along its vertical axis.
     *
     * @private
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {Object} textureDescriptorGPU - The texture descriptor.
     * @param {number} [originDepth=0] - The origin depth.
     */
    private _flipY;
    /**
     * Uploads texture buffer data to the GPU memory.
     *
     * @private
     * @param {Object} image - An object defining the image buffer data.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     * @param {number} originDepth - The origin depth.
     * @param {boolean} flipY - Whether to flip texture data along their vertical axis or not.
     * @param {number} [depth=0] - The depth offset when copying array or 3D texture data.
     * @param {number} [mipLevel=0] - The mip level where the data should be copied to.
     */
    private _copyBufferToTexture;
    /**
     * Uploads compressed texture data to the GPU memory.
     *
     * @private
     * @param {Array<Object>} mipmaps - An array with mipmap data.
     * @param {GPUTexture} textureGPU - The GPU texture.
     * @param {Object} textureDescriptorGPU - The GPU texture descriptor.
     * @param {?Set<number>} [layerUpdates=null] - The layer indices to update.
     */
    private _copyCompressedBufferToTexture;
    /**
     * This method is only relevant for compressed texture formats. It returns a block
     * data descriptor for the given GPU compressed texture format.
     *
     * @private
     * @param {string} format - The GPU compressed texture format.
     * @return {Object} The block data descriptor.
     */
    private _getBlockData;
    /**
     * Converts the three.js uv wrapping constants to GPU address mode constants.
     *
     * @private
     * @param {number} value - The three.js constant defining a uv wrapping mode.
     * @return {string} The GPU address mode.
     */
    private _convertAddressMode;
    /**
     * Converts the three.js filter constants to GPU filter constants.
     *
     * @private
     * @param {number} value - The three.js constant defining a filter mode.
     * @return {string} The GPU filter mode.
     */
    private _convertFilterMode;
    /**
     * Converts the three.js filter constants to a GPU mipmap filter constant.
     * Unlike `_convertFilterMode`, this extracts the between-mip-level filtering
     * axis from the combined three.js constant rather than the within-level axis.
     *
     * @private
     * @param {number} value - The three.js constant defining a filter mode.
     * @return {string} The GPU mipmap filter mode.
     */
    private _convertMipmapFilterMode;
    /**
     * Returns the bytes-per-texel value for the given GPU texture format.
     *
     * @private
     * @param {string} format - The GPU texture format.
     * @return {number} The bytes-per-texel.
     */
    private _getBytesPerTexel;
    /**
     * Returns the corresponding typed array type for the given GPU texture format.
     *
     * @private
     * @param {string} format - The GPU texture format.
     * @return {TypedArray.constructor} The typed array type.
     */
    private _getTypedArrayType;
    /**
     * Returns the GPU dimensions for the given texture.
     *
     * @private
     * @param {Texture} texture - The texture.
     * @return {string} The GPU dimension.
     */
    private _getDimension;
}
/**
 * Represents a sampler binding type.
 *
 * @private
 * @augments Binding
 */
declare class Sampler extends Binding {
    /**
     * Constructs a new sampler.
     *
     * @param {string} name - The samplers's name.
     * @param {?Texture} texture - The texture this binding is referring to.
     */
    constructor(name: string, texture: Texture | null);
    /**
     * The texture the sampler is referring to.
     *
     * @private
     * @type {?Texture}
     */
    private _texture;
    /**
     * The binding's version.
     *
     * @type {number}
     */
    version: number;
    /**
     * The binding's generation which is an additional version
     * qualifier.
     *
     * @type {?number}
     * @default null
     */
    generation: number | null;
    /**
     * The binding's sampler key.
     *
     * @type {string}
     * @default ''
     */
    samplerKey: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampler: boolean;
    /**
     * Sets the texture of this sampler.
     *
     * @param {Texture} value - The texture to set.
     */
    set texture(value: Texture);
    /**
     * Gets the texture of this sampler.
     * @return {?Texture} The texture.
     */
    get texture(): Texture | null;
    /**
     * Updates the binding.
     *
     * @return {boolean} Whether the texture has been updated and must be
     * uploaded to the GPU.
     */
    update(): boolean;
    /**
     * Resets the version and generation. This is used when the texture
     * the binding is pointing to is disposed or exchanged.
     */
    reset(): void;
    /**
     * Releases the texture reference.
     */
    release(): void;
}
/**
 * This module is used to represent render bundles inside the renderer
 * for further processing.
 *
 * @private
 */
declare class RenderBundle {
    /**
     * Constructs a new bundle group.
     *
     * @param {BundleGroup} bundleGroup - The bundle group.
     * @param {Camera} camera - The camera the bundle group is rendered with.
     * @param {RenderContext} renderContext - The render context the bundle is rendered with.
     */
    constructor(bundleGroup: BundleGroup, camera: Camera, renderContext: RenderContext);
    bundleGroup: BundleGroup;
    camera: Camera;
    renderContext: RenderContext;
}
/**
 * This class represents a uniform buffer binding but with
 * an API that allows to maintain individual uniform objects.
 *
 * @private
 * @augments UniformBuffer
 */
declare class UniformsGroup extends UniformBuffer {
    /**
     * Constructs a new uniforms group.
     *
     * @param {string} name - The group's name.
     */
    constructor(name: string);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformsGroup: boolean;
    /**
     * An array with the raw uniform values.
     *
     * @private
     * @type {?Array<number>}
     * @default null
     */
    private _values;
    /**
     * An array of uniform objects.
     *
     * The order of uniforms in this array must match the order of uniforms in the shader.
     *
     * @type {Array<Uniform>}
     */
    uniforms: Array<Uniform>;
    /**
     * A cache for the uniform update ranges.
     *
     * @private
     * @type {Map<number, {start: number, count: number}>}
     */
    private _updateRangeCache;
    /**
     * Uniform indices whose range has already been pushed into `updateRanges`
     * during the current update cycle. Reset on `clearUpdateRanges()`.
     *
     * @private
     * @type {Set<number>}
     */
    private _addedIndices;
    /**
     * Adds a uniform's update range to this buffer.
     *
     * @param {Uniform} uniform - The uniform.
     */
    addUniformUpdateRange(uniform: Uniform): void;
    /**
     * Adds a uniform to this group.
     *
     * @param {Uniform} uniform - The uniform to add.
     * @return {UniformsGroup} A reference to this group.
     */
    addUniform(uniform: Uniform): UniformsGroup;
    /**
     * Removes a uniform from this group.
     *
     * @param {Uniform} uniform - The uniform to remove.
     * @return {UniformsGroup} A reference to this group.
     */
    removeUniform(uniform: Uniform): UniformsGroup;
    /**
     * An array with the raw uniform values.
     *
     * @type {Array<number>}
     */
    get values(): Array<number>;
    /**
     * Updates a given uniform by calling an update method matching
     * the uniforms type.
     *
     * @param {Uniform} uniform - The uniform to update.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateByType(uniform: Uniform): boolean;
    /**
     * Updates a given Number uniform.
     *
     * @param {NumberUniform} uniform - The Number uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateNumber(uniform: NumberUniform): boolean;
    /**
     * Updates a given Vector2 uniform.
     *
     * @param {Vector2Uniform} uniform - The Vector2 uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateVector2(uniform: Vector2Uniform): boolean;
    /**
     * Updates a given Vector3 uniform.
     *
     * @param {Vector3Uniform} uniform - The Vector3 uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateVector3(uniform: Vector3Uniform): boolean;
    /**
     * Updates a given Vector4 uniform.
     *
     * @param {Vector4Uniform} uniform - The Vector4 uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateVector4(uniform: Vector4Uniform): boolean;
    /**
     * Updates a given Color uniform.
     *
     * @param {ColorUniform} uniform - The Color uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateColor(uniform: ColorUniform): boolean;
    /**
     * Updates a given Matrix3 uniform.
     *
     * @param {Matrix3Uniform} uniform - The Matrix3 uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateMatrix3(uniform: Matrix3Uniform): boolean;
    /**
     * Updates a given Matrix4 uniform.
     *
     * @param {Matrix4Uniform} uniform - The Matrix4 uniform.
     * @return {boolean} Whether the uniform has been updated or not.
     */
    updateMatrix4(uniform: Matrix4Uniform): boolean;
    /**
     * Returns a typed array that matches the given data type.
     *
     * @private
     * @param {string} type - The data type.
     * @return {TypedArray} The typed array.
     */
    private _getBufferForType;
}
/**
 * Base class for node functions. A derived module must be implemented
 * for each supported native shader language. Similar to other `Node*` modules,
 * this class is only relevant during the building process and not used
 * in user-level code.
 */
declare class NodeFunction {
    /**
     * Constructs a new node function.
     *
     * @param {string} type - The node type. This type is the return type of the node function.
     * @param {Array<NodeFunctionInput>} inputs - The function's inputs.
     * @param {string} [name=''] - The function's name.
     * @param {string} [precision=''] - The precision qualifier.
     */
    constructor(type: string, inputs: Array<NodeFunctionInput>, name?: string, precision?: string);
    /**
     * The node type. This type is the return type of the node function.
     *
     * @type {string}
     */
    type: string;
    /**
     * The function's inputs.
     *
     * @type {Array<NodeFunctionInput>}
     */
    inputs: Array<NodeFunctionInput>;
    /**
     * The name of the uniform.
     *
     * @type {string}
     * @default ''
     */
    name: string;
    /**
     * The precision qualifier.
     *
     * @type {string}
     * @default ''
     */
    precision: string;
    /**
     * This method returns the native code of the node function.
     *
     * @abstract
     * @param {string} name - The function's name.
     * @return {string} A shader code.
     */
    getCode(): string;
}
declare namespace NodeFunction {
    let isNodeFunction: boolean;
}
/**
 * A binding represents the connection between a resource (like a texture, sampler
 * or uniform buffer) and the resource definition in a shader stage.
 *
 * This module is an abstract base class for all concrete bindings types.
 *
 * @abstract
 * @private
 */
declare class Binding {
    /**
     * Constructs a new binding.
     *
     * @param {string} [name=''] - The binding's name.
     */
    constructor(name?: string);
    /**
     * The binding's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * A bitmask that defines in what shader stages the
     * binding's resource is accessible.
     *
     * @type {number}
     */
    visibility: number;
    /**
     * Makes sure binding's resource is visible for the given shader stage.
     *
     * @param {number} visibility - The shader stage.
     */
    setVisibility(visibility: number): void;
    /**
     * Clones the binding.
     *
     * @return {Binding} The cloned binding.
     */
    clone(): Binding;
}
/**
 * Represents a uniform buffer binding type.
 *
 * @private
 * @augments Buffer
 */
declare class UniformBuffer extends Buffer {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformBuffer: boolean;
}
/**
 * This module represents the state of a node builder after it was
 * used to build the nodes for a render object. The state holds the
 * results of the build for further processing in the renderer.
 *
 * Render objects with identical cache keys share the same node builder state.
 *
 * @private
 */
declare class NodeBuilderState {
    /**
     * Constructs a new node builder state.
     *
     * @param {string} vertexShader - The native vertex shader code.
     * @param {string} fragmentShader - The native fragment shader code.
     * @param {string} computeShader - The native compute shader code.
     * @param {Array<NodeAttribute>} nodeAttributes - An array of node attributes.
     * @param {Array<BindGroup>} bindings - An array of bind groups.
     * @param {Array<Node>} updateNodes - An array of nodes that implement their `update()` method.
     * @param {Array<Node>} updateBeforeNodes - An array of nodes that implement their `updateBefore()` method.
     * @param {Array<Node>} updateAfterNodes - An array of nodes that implement their `updateAfter()` method.
     * @param {NodeMaterialObserver} observer - A node material observer.
     * @param {boolean} hardwareClipping - Whether the built material uses hardware clipping or not.
     * @param {Array<Object>} transforms - An array with transform attribute objects. Only relevant when using compute shaders with WebGL 2.
     */
    constructor(vertexShader: string, fragmentShader: string, computeShader: string, nodeAttributes: Array<NodeAttribute>, bindings: Array<BindGroup>, updateNodes: Array<Node>, updateBeforeNodes: Array<Node>, updateAfterNodes: Array<Node>, observer: NodeMaterialObserver, hardwareClipping: boolean, transforms?: Array<Object>);
    /**
     * The native vertex shader code.
     *
     * @type {string}
     */
    vertexShader: string;
    /**
     * The native fragment shader code.
     *
     * @type {string}
     */
    fragmentShader: string;
    /**
     * The native compute shader code.
     *
     * @type {string}
     */
    computeShader: string;
    /**
     * An array with transform attribute objects.
     * Only relevant when using compute shaders with WebGL 2.
     *
     * @type {Array<Object>}
     */
    transforms: Array<Object>;
    /**
     * An array of node attributes representing
     * the attributes of the shaders.
     *
     * @type {Array<NodeAttribute>}
     */
    nodeAttributes: Array<NodeAttribute>;
    /**
     * An array of bind groups representing the uniform or storage
     * buffers, texture or samplers of the shader.
     *
     * @type {Array<BindGroup>}
     */
    bindings: Array<BindGroup>;
    /**
     * An array of nodes that implement their `update()` method.
     *
     * @type {Array<Node>}
     */
    updateNodes: Array<Node>;
    /**
     * An array of nodes that implement their `updateBefore()` method.
     *
     * @type {Array<Node>}
     */
    updateBeforeNodes: Array<Node>;
    /**
     * An array of nodes that implement their `updateAfter()` method.
     *
     * @type {Array<Node>}
     */
    updateAfterNodes: Array<Node>;
    /**
     * A node material observer.
     *
     * @type {NodeMaterialObserver}
     */
    observer: NodeMaterialObserver;
    /**
     * Whether the built material uses hardware clipping or not.
     *
     * @type {boolean}
     */
    hardwareClipping: boolean;
    /**
     * How often this state is used by render objects.
     *
     * @type {number}
     */
    usedTimes: number;
    /**
     * This method is used to create a array of bind groups based
     * on the existing bind groups of this state. Shared groups are
     * not cloned.
     *
     * @return {Array<BindGroup>} A array of bind groups.
     */
    createBindings(): Array<BindGroup>;
}
/**
 * This renderer module manages node-related objects and is the
 * primary interface between the renderer and the node system.
 *
 * @private
 * @augments DataMap
 */
declare class NodeManager extends DataMap {
    /**
     * Constructs a new nodes management component.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Backend} backend - The renderer's backend.
     */
    constructor(renderer: Renderer, backend: Backend);
    /**
     * The renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * The renderer's backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * The node frame.
     *
     * @type {Renderer}
     */
    nodeFrame: Renderer;
    /**
     * A cache for managing node builder states.
     *
     * @type {Map<number,NodeBuilderState>}
     */
    nodeBuilderCache: Map<number, NodeBuilderState>;
    /**
     * A cache for managing data cache key data.
     *
     * @type {ChainMap}
     */
    callHashCache: ChainMap;
    /**
     * A cache for managing node uniforms group data.
     *
     * @type {ChainMap}
     */
    groupsData: ChainMap;
    /**
     * Queue for pending async builds to limit concurrent compilation.
     *
     * @private
     * @type {Array<Function>}
     */
    private _buildQueue;
    /**
     * Whether an async build is currently in progress.
     *
     * @private
     * @type {boolean}
     */
    private _buildInProgress;
    /**
     * A cache for managing node objects of
     * scene properties like fog or environments.
     *
     * @type {Object<string,WeakMap>}
     */
    cacheLib: {
        [x: string]: WeakMap<any, any>;
    };
    /**
     * Returns `true` if the given node uniforms group must be updated or not.
     *
     * @param {NodeUniformsGroup} nodeUniformsGroup - The node uniforms group.
     * @return {boolean} Whether the node uniforms group requires an update or not.
     */
    updateGroup(nodeUniformsGroup: NodeUniformsGroup): boolean;
    /**
     * Returns the cache key for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {number} The cache key.
     */
    getForRenderCacheKey(renderObject: RenderObject): number;
    /**
     * Creates a node builder configured for the given render object and material.
     *
     * @private
     * @param {RenderObject} renderObject - The render object.
     * @param {Material} material - The material to use.
     * @return {NodeBuilder} The configured node builder.
     */
    private _createNodeBuilder;
    /**
     * Logs an error thrown while building a node material.
     *
     * @private
     * @param {Error} e - The build error.
     */
    private _reportBuildError;
    /**
     * Returns a node builder state for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {?Function} [yieldFn=null] - If set, the build is async and yields to the main thread via this function.
     * @return {NodeBuilderState|Promise<NodeBuilderState>} The node builder state (or Promise if async).
     */
    getForRender(renderObject: RenderObject, yieldFn?: Function | null): NodeBuilderState | Promise<NodeBuilderState>;
    /**
     * Async version of getForRender() that yields to main thread during build.
     * Use this in compileAsync() to prevent blocking the main thread.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {Function} [yieldFn=yieldToMain] - The function used to yield to the main thread.
     * @return {Promise<NodeBuilderState>} A promise that resolves to the node builder state.
     */
    getForRenderAsync(renderObject: RenderObject, yieldFn?: Function): Promise<NodeBuilderState>;
    /**
     * Returns nodeBuilderState if ready, null if pending async build.
     * Queues async build on first call for cache miss.
     * Use this in render() path to enable non-blocking compilation.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {?NodeBuilderState} The node builder state, or null if still building.
     */
    getForRenderDeferred(renderObject: RenderObject): NodeBuilderState | null;
    /**
     * Processes the build queue one item at a time.
     * This ensures builds don't all run simultaneously and freeze the main thread.
     *
     * @private
     */
    private _processBuildQueue;
    /**
     * Deletes the given object from the internal data map
     *
     * @param {any} object - The object to delete.
     * @return {?Object} The deleted dictionary.
     */
    delete(object: any): Object | null;
    /**
     * Returns a node builder state for the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     * @param {boolean} [useAsync=false] - Whether to use async build with yielding.
     * @param {Function} [yieldFn=yieldToMain] - The function used to yield to the main thread in an async build.
     * @return {NodeBuilderState|Promise<NodeBuilderState>} The node builder state (or Promise if async).
     */
    getForCompute(computeNode: Node, useAsync?: boolean, yieldFn?: Function): NodeBuilderState | Promise<NodeBuilderState>;
    /**
     * Async version of getForCompute() that yields to main thread during build.
     * Use this in compileComputeAsync() to prevent blocking the main thread.
     *
     * @param {Node} computeNode - The compute node.
     * @param {Function} [yieldFn=yieldToMain] - The function used to yield to the main thread.
     * @return {Promise<NodeBuilderState>} A promise that resolves to the node builder state.
     */
    getForComputeAsync(computeNode: Node, yieldFn?: Function): Promise<NodeBuilderState>;
    /**
     * Creates a node builder state for the given node builder.
     *
     * @private
     * @param {NodeBuilder} nodeBuilder - The node builder.
     * @return {NodeBuilderState} The node builder state.
     */
    private _createNodeBuilderState;
    /**
     * Returns an environment node for the current configured
     * scene environment.
     *
     * @param {Scene} scene - The scene.
     * @return {Node} A node representing the current scene environment.
     */
    getEnvironmentNode(scene: Scene): Node;
    /**
     * Returns a background node for the current configured
     * scene background.
     *
     * @param {Scene} scene - The scene.
     * @return {Node} A node representing the current scene background.
     */
    getBackgroundNode(scene: Scene): Node;
    /**
     * Returns a fog node for the current configured scene fog.
     *
     * @param {Scene} scene - The scene.
     * @return {Node} A node representing the current scene fog.
     */
    getFogNode(scene: Scene): Node;
    /**
     * Returns the custom program cache key of the given material. Since
     * computing the key traverses the material's node graph, the result
     * is cached per material version if possible.
     *
     * @param {Material} material - The material.
     * @param {Scene} scene - The scene.
     * @return {string} The custom program cache key.
     */
    getCustomProgramCacheKey(material: Material, scene: Scene): string;
    /**
     * Returns a cache key for the given scene and lights node.
     * This key is used by `RenderObject` as a part of the dynamic
     * cache key (a key that must be checked every time the render
     * objects is drawn).
     *
     * @param {Scene} scene - The scene.
     * @param {LightsNode} lightsNode - The lights node.
     * @return {number} The cache key.
     */
    getCacheKey(scene: Scene, lightsNode: LightsNode): number;
    /**
     * A boolean that indicates whether tone mapping should be enabled
     * or not.
     *
     * @type {boolean}
     */
    get isToneMappingState(): boolean;
    /**
     * If a scene background is configured, this method makes sure to
     * represent the background with a corresponding node-based implementation.
     *
     * @param {Scene} scene - The scene.
     */
    updateBackground(scene: Scene): void;
    /**
     * This method is part of the caching of nodes which are used to represents the
     * scene's background, fog or environment.
     *
     * @param {string} type - The type of object to cache.
     * @param {Object} object - The object.
     * @param {Function} callback - A callback that produces a node representation for the given object.
     * @param {boolean} [forceUpdate=false] - Whether an update should be enforced or not.
     * @return {Node} The node representation.
     */
    getCacheNode(type: string, object: Object, callback: Function, forceUpdate?: boolean): Node;
    /**
     * If a scene fog is configured, this method makes sure to
     * represent the fog with a corresponding node-based implementation.
     *
     * @param {Scene} scene - The scene.
     */
    updateFog(scene: Scene): void;
    /**
     * If a scene environment is configured, this method makes sure to
     * represent the environment with a corresponding node-based implementation.
     *
     * @param {Scene} scene - The scene.
     */
    updateEnvironment(scene: Scene): void;
    /**
     * Returns a node frame configured with the given parameters.
     *
     * @param {Renderer} [renderer=this.renderer] - The renderer.
     * @param {?Scene} [scene=null] - The scene.
     * @param {?Object3D} [object=null] - The object.
     * @param {?Camera} [camera=null] - The camera.
     * @param {?Material} [material=null] - The material.
     * @param {?Node} [compute=null] - The compute node.
     * @return {NodeFrame} The node frame.
     */
    getNodeFrame(renderer?: Renderer, scene?: Scene | null, object?: Object3D | null, camera?: Camera | null, material?: Material | null, compute?: Node | null): NodeFrame;
    /**
     * Returns a node frame configured for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {NodeFrame} The node frame.
     */
    getNodeFrameForRender(renderObject: RenderObject): NodeFrame;
    /**
     * Returns a node frame configured for the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     * @return {NodeFrame} The node frame.
     */
    getNodeFrameForCompute(computeNode: Node): NodeFrame;
    /**
     * Returns the current output cache key.
     *
     * @return {string} The output cache key.
     */
    getOutputCacheKey(): string;
    /**
     * Returns a node that represents the output configuration (tone mapping and
     * color space) for the current target.
     *
     * @param {Texture} outputTarget - The output target.
     * @return {Node} The output node.
     */
    getOutputNode(outputTarget: Texture): Node;
    /**
     * Sets the output layer index for array texture output pass.
     * This should be called before each layer render during the output pass.
     *
     * @param {number} index - The layer index.
     */
    setOutputLayerIndex(index: number): void;
    /**
     * Triggers the call of `updateBefore()` methods
     * for all nodes of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateBefore(renderObject: RenderObject): void;
    /**
     * Triggers the call of `updateAfter()` methods
     * for all nodes of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateAfter(renderObject: RenderObject): void;
    /**
     * Triggers the call of `updateBefore()` methods
     * for all nodes of the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     */
    updateBeforeForCompute(computeNode: Node): void;
    /**
     * Triggers the call of `updateAfter()` methods
     * for all nodes of the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     */
    updateAfterForCompute(computeNode: Node): void;
    /**
     * Triggers the call of `update()` methods
     * for all nodes of the given compute node.
     *
     * @param {Node} computeNode - The compute node.
     */
    updateForCompute(computeNode: Node): void;
    /**
     * Triggers the call of `update()` methods
     * for all nodes of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateForRender(renderObject: RenderObject): void;
    /**
     * Returns the refresh type of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {number} The refresh type, see `RenderObjectRefreshType`.
     */
    needsRefresh(renderObject: RenderObject): number;
}
/**
 * This renderer module manages geometries.
 *
 * @private
 * @augments DataMap
 */
declare class Geometries extends DataMap {
    /**
     * Constructs a new geometry management component.
     *
     * @param {Backend} backend - The renderer's backend.
     * @param {Attributes} attributes - Renderer component for managing attributes.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(backend: Backend, attributes: Attributes, info: Info);
    /**
     * The renderer's backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * Renderer component for managing attributes.
     *
     * @type {Attributes}
     */
    attributes: Attributes;
    /**
     * Renderer component for managing metrics and monitoring data.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * Weak Map for managing attributes for wireframe rendering.
     *
     * @type {WeakMap<BufferGeometry,BufferAttribute>}
     */
    wireframes: WeakMap<BufferGeometry, BufferAttribute>;
    /**
     * This Weak Map is used to make sure buffer attributes are
     * updated only once per render call.
     *
     * @type {WeakMap<BufferAttribute,number>}
     */
    attributeCall: WeakMap<BufferAttribute, number>;
    /**
     * Stores weak references to the geometries with attached
     * `dispose` event listeners.
     *
     * @private
     * @type {Set<WeakRef<BufferGeometry>>}
     */
    private _tracked;
    /**
     * Removes weak references from `_tracked` when their geometry
     * has been garbage collected without an explicit `dispose()`.
     *
     * @private
     * @type {FinalizationRegistry}
     */
    private _registry;
    /**
     * Returns `true` if the given geometry is initialized.
     *
     * @param {BufferGeometry} geometry - The geometry.
     * @return {boolean} Whether if the given geometry is initialized or not.
     */
    has(geometry: BufferGeometry): boolean;
    /**
     * Prepares the geometry of the given render object for rendering.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateForRender(renderObject: RenderObject): void;
    /**
     * Initializes the given geometry.
     *
     * @param {BufferGeometry} geometry - The geometry.
     */
    initGeometry(geometry: BufferGeometry): void;
    /**
     * Updates the geometry attributes of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateAttributes(renderObject: RenderObject): void;
    /**
     * Updates the given attribute.
     *
     * @param {BufferAttribute} attribute - The attribute to update.
     * @param {number} type - The attribute type.
     */
    updateAttribute(attribute: BufferAttribute, type: number): void;
    /**
     * Returns the indirect buffer attribute of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {?BufferAttribute} The indirect attribute. `null` if no indirect drawing is used.
     */
    getIndirect(renderObject: RenderObject): BufferAttribute | null;
    /**
     * Returns the byte offset into the indirect attribute buffer of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {number} The byte offset into the indirect attribute buffer.
     */
    getIndirectOffset(renderObject: RenderObject): number;
    /**
     * Returns the index of the given render object's geometry. This is implemented
     * in a method to return a wireframe index if necessary.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {?BufferAttribute} The index. Returns `null` for non-indexed geometries.
     */
    getIndex(renderObject: RenderObject): BufferAttribute | null;
    /**
     * Deletes the attributes that are defined via nodes and not on geometry level.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    deleteNodeAttributes(renderObject: RenderObject): void;
    /**
     * Deletes the vertex state for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    deleteVertexState(renderObject: RenderObject): void;
}
/**
 * A WebGPU backend utility module used by {@link WebGPUTextureUtils}.
 *
 * @private
 */
declare class WebGPUTexturePassUtils extends DataMap {
    /**
     * Constructs a new utility object.
     *
     * @param {GPUDevice} device - The WebGPU device.
     */
    constructor(device: GPUDevice);
    /**
     * The WebGPU device.
     *
     * @type {GPUDevice}
     */
    device: GPUDevice;
    /**
     * The mipmap GPU sampler.
     *
     * @type {GPUSampler}
     */
    mipmapSampler: GPUSampler;
    /**
     * The flipY GPU sampler.
     *
     * @type {GPUSampler}
     */
    flipYSampler: GPUSampler;
    flipUniformBuffer: GPUBuffer;
    noFlipUniformBuffer: GPUBuffer;
    /**
     * A cache for GPU render pipelines used for copy/transfer passes.
     * Every texture format and textureBindingViewDimension combo requires a unique pipeline.
     *
     * @type {Object<string,GPURenderPipeline>}
     */
    transferPipelines: {
        [x: string]: GPURenderPipeline;
    };
    mipmapShaderModule: GPUShaderModule;
    /**
     * Returns a render pipeline for the internal copy render pass. The pass
     * requires a unique render pipeline for each texture format.
     *
     * @param {string} format - The GPU texture format
     * @param {string?} textureBindingViewDimension - The GPU texture binding view dimension
     * @return {GPURenderPipeline} The GPU render pipeline.
     */
    getTransferPipeline(format: string, textureBindingViewDimension: string | null): GPURenderPipeline;
    /**
     * Flip the contents of the given GPU texture along its vertical axis.
     *
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {Object} textureGPUDescriptor - The texture descriptor.
     * @param {number} [baseArrayLayer=0] - The index of the first array layer accessible to the texture view.
     */
    flipY(textureGPU: GPUTexture, textureGPUDescriptor: Object, baseArrayLayer?: number): void;
    /**
     * Generates mipmaps for the given GPU texture.
     *
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @param {?GPUCommandEncoder} [encoder=null] - An optional command encoder used to generate mipmaps.
     */
    generateMipmaps(textureGPU: GPUTexture, encoder?: GPUCommandEncoder | null): void;
    /**
     * Since multiple copy render passes are required to generate mipmaps, the passes
     * are managed as render bundles to improve performance.
     *
     * @param {GPUTexture} textureGPU - The GPU texture object.
     * @return {Array<Object>} An array of render bundles.
     */
    _mipmapCreateBundles(textureGPU: GPUTexture): Array<Object>;
    /**
     * Executes the render bundles.
     *
     * @param {GPUCommandEncoder} commandEncoder - The GPU command encoder.
     * @param {Array<Object>} passes - An array of render bundles.
     */
    _mipmapRunBundles(commandEncoder: GPUCommandEncoder, passes: Array<Object>): void;
}
/**
 * Represents a Number uniform.
 *
 * @private
 * @augments Uniform
 */
declare class NumberUniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {number} value - The uniform's value.
     */
    constructor(name: string, value?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNumberUniform: boolean;
}
/**
 * Represents a Vector2 uniform.
 *
 * @private
 * @augments Uniform
 */
declare class Vector2Uniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {Vector2} value - The uniform's value.
     */
    constructor(name: string, value?: Vector2);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVector2Uniform: boolean;
}
/**
 * Represents a Vector3 uniform.
 *
 * @private
 * @augments Uniform
 */
declare class Vector3Uniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {Vector3} value - The uniform's value.
     */
    constructor(name: string, value?: Vector3);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVector3Uniform: boolean;
}
/**
 * Represents a Vector4 uniform.
 *
 * @private
 * @augments Uniform
 */
declare class Vector4Uniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {Vector4} value - The uniform's value.
     */
    constructor(name: string, value?: Vector4);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVector4Uniform: boolean;
}
/**
 * Represents a Color uniform.
 *
 * @private
 * @augments Uniform
 */
declare class ColorUniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {Color} value - The uniform's value.
     */
    constructor(name: string, value?: Color);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isColorUniform: boolean;
}
/**
 * Represents a Matrix3 uniform.
 *
 * @private
 * @augments Uniform
 */
declare class Matrix3Uniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {Matrix3} value - The uniform's value.
     */
    constructor(name: string, value?: Matrix3);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMatrix3Uniform: boolean;
}
/**
 * Represents a Matrix4 uniform.
 *
 * @private
 * @augments Uniform
 */
declare class Matrix4Uniform extends Uniform {
    /**
     * Constructs a new Number uniform.
     *
     * @param {string} name - The uniform's name.
     * @param {Matrix4} value - The uniform's value.
     */
    constructor(name: string, value?: Matrix4);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMatrix4Uniform: boolean;
}
/**
 * Data structure for the renderer. It is intended to manage
 * data of objects in dictionaries.
 *
 * @private
 */
declare class DataMap {
    /**
     * `DataMap` internally uses a weak map
     * to manage its data.
     *
     * @type {WeakMap<Object, Object>}
     */
    data: WeakMap<Object, Object>;
    /**
     * Returns the dictionary for the given object.
     *
     * @param {Object} object - The object.
     * @return {Object} The dictionary.
     */
    get(object: Object): Object;
    /**
     * Deletes the dictionary for the given object.
     *
     * @param {Object} object - The object.
     * @return {?Object} The deleted dictionary.
     */
    delete(object: Object): Object | null;
    /**
     * Returns `true` if the given object has a dictionary defined.
     *
     * @param {Object} object - The object to test.
     * @return {boolean} Whether a dictionary is defined or not.
     */
    has(object: Object): boolean;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
import { ChainMap } from './three.tsl.js';
/**
 * This renderer module manages geometry attributes.
 *
 * @private
 * @augments DataMap
 */
declare class Attributes extends DataMap {
    /**
     * Constructs a new attribute management component.
     *
     * @param {Backend} backend - The renderer's backend.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(backend: Backend, info: Info);
    /**
     * The renderer's backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * Renderer component for managing metrics and monitoring data.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * Stores weak references to the storage attributes with attached
     * `dispose` event listeners.
     *
     * @private
     * @type {Set<WeakRef<StorageBufferAttribute|StorageInstancedBufferAttribute>>}
     */
    private _tracked;
    /**
     * Removes weak references from `_tracked` when their attribute
     * has been garbage collected without an explicit `dispose()`.
     *
     * @private
     * @type {FinalizationRegistry}
     */
    private _registry;
    /**
     * Deletes the data for the given attribute.
     *
     * @param {BufferAttribute|InterleavedBuffer} attribute - The attribute.
     * @return {?Object} The deleted attribute data.
     */
    delete(attribute: BufferAttribute | InterleavedBuffer): Object | null;
    /**
     * Updates the given attribute. This method creates attribute buffers
     * for new attributes and updates data for existing ones.
     *
     * @param {BufferAttribute|InterleavedBuffer} attribute - The attribute to update.
     * @param {number} type - The attribute type.
     */
    update(attribute: BufferAttribute | InterleavedBuffer, type: number): void;
}
export { ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveBlending, AgXToneMapping, AlphaFormat, AlwaysCompare, AlwaysDepth, AlwaysStencilFunc, AmbientLight, AnalyticLightNode, ArrayCamera, BackSide, ByteType, CineonToneMapping, ClampToEdgeWrapping, CodeNode, Color, ColorManagement, Compatibility, ConstantAlphaFactor, ConstantColorFactor, CubeReflectionMapping, CubeRefractionMapping, CubeRenderTarget, CubeTexture, CullFaceBack, CullFaceFront, CullFaceNone, CustomBlending, CylinderGeometry, DataTexture, DecrementStencilOp, DecrementWrapStencilOp, DepthFormat, DepthStencilFormat, DepthTexture, DirectionalLight, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicDrawUsage, EqualCompare, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, EventDispatcher, ExpressionNode, FileLoader, Float16BufferAttribute, FloatType, FramebufferTexture, FrontSide, Frustum, FrustumArray, FunctionNode, GreaterCompare, GreaterDepth, GreaterEqualCompare, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, Group, HalfFloatType, HemisphereLight, IncrementStencilOp, IncrementWrapStencilOp, InspectorBase, IntType, InvertStencilOp, KeepStencilOp, LessCompare, LessDepth, LessEqualCompare, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, LightProbe, LightingNode, LightsNode, LineBasicMaterial, LineDashedMaterial, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearToneMapping, LinearTransfer, Loader, Material, MaterialBlending, MaterialLoader, Matrix2, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeutralToneMapping, NeverCompare, NeverDepth, NeverStencilFunc, NoBlending, NoColorSpace, NoToneMapping, Node, NodeAccess, NodeMaterial, NodeUpdateType, NormalBlending, NotEqualCompare, NotEqualDepth, NotEqualStencilFunc, ObjectLoader, OneFactor, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, PCFShadowMap, PCFSoftShadowMap, ParameterNode, PerspectiveCamera, Plane, PlaneGeometry, PointLight, PointLightNode, PointsMaterial, QuadMesh, Quaternion, R11_EAC_Format, RED_GREEN_RGTC2_Format, RED_RGTC1_Format, REVISION, RG11_EAC_Format, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBFormat, RGBIntegerFormat, RGB_BPTC_SIGNED_Format, RGB_BPTC_UNSIGNED_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGFormat, RGIntegerFormat, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RenderObjectRefreshType, RenderTarget, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, SIGNED_R11_EAC_Format, SIGNED_RED_GREEN_RGTC2_Format, SIGNED_RED_RGTC1_Format, SIGNED_RG11_EAC_Format, SRGBColorSpace, SRGBTransfer, Scene, ShadowMaterial, ShortType, SphereGeometry, SpotLight, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StackTrace, StorageBufferAttribute, SubtractEquation, SubtractiveBlending, Texture, TextureNode, TimestampQuery, Uint16BufferAttribute, Uint32BufferAttribute, UnsignedByteType, UnsignedInt101111Type, UnsignedInt248Type, UnsignedInt5999Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, VarNode, Vector2, Vector3, Vector4, WebGLCoordinateSystem, WebGPUCoordinateSystem, WebXRController, ZeroFactor, ZeroStencilOp, createCanvasElement, defaultBuildStages, error, shaderStages, vectorComponents, warn, warnOnce };
export { AdditiveAnimationBlendMode, AnimationAction, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrowHelper, AttachedBindMode, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BasicDepthPacking, BasicShadowMap, BatchedMesh, BezierInterpolant, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxGeometry, BoxHelper, BufferAttribute, BufferGeometry, BufferGeometryLoader, Cache, Camera, CameraHelper, CanvasTexture, CapsuleGeometry, CatmullRomCurve3, CircleGeometry, Clock, ColorKeyframeTrack, CompressedArrayTexture, CompressedCubeTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, Controls, CubeCamera, CubeDepthTexture, CubeTextureLoader, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceFrontBack, Curve, CurvePath, CustomToneMapping, Cylindrical, Data3DTexture, DataArrayTexture, DataTextureLoader, DataUtils, DefaultLoadingManager, DetachedBindMode, DirectionalLightHelper, DiscreteInterpolant, DodecahedronGeometry, DynamicCopyUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, Euler, ExternalTexture, ExtrudeGeometry, Float32BufferAttribute, Fog, FogExp2, GLBufferAttribute, GLSL1, GLSL3, GridHelper, HTMLTexture, HemisphereLightHelper, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16BufferAttribute, Int32BufferAttribute, Int8BufferAttribute, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateBezier, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InterpolationSamplingMode, InterpolationSamplingType, KeyframeTrack, LOD, LatheGeometry, Layers, Light, LightShadow, Line, Line3, LineCurve, LineCurve3, LineLoop, LineSegments, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearSRGBColorSpace, LoaderUtils, LoadingManager, LoopOnce, LoopPingPong, LoopRepeat, MOUSE, MathUtils, MeshDepthMaterial, MeshDistanceMaterial, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NoNormalPacking, NormalAnimationBlendMode, NormalGAPacking, NormalRGPacking, NumberKeyframeTrack, Object3D, ObjectSpaceNormalMap, OctahedronGeometry, OrthographicCamera, Path, PlaneHelper, PointLightHelper, Points, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, QuaternionKeyframeTrack, QuaternionLinearInterpolant, RGBADepthPacking, RGBDepthPacking, RGDepthPacking, RawShaderMaterial, Ray, Raycaster, RenderTarget3D, RingGeometry, ShaderMaterial, Shape, ShapeGeometry, ShapePath, ShapeUtils, Skeleton, SkeletonHelper, SkinnedMesh, Source, Sphere, Spherical, SphericalHarmonics3, SplineCurve, SpotLightHelper, Sprite, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, TOUCH, TangentSpaceNormalMap, TetrahedronGeometry, TextureLoader, TextureSource, TextureUtils, Timer, TorusGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeGeometry, UVMapping, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsGroup, VectorKeyframeTrack, VideoFrameTexture, VideoTexture, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGLRenderTarget, WireframeGeometry, WrapAroundEnding, ZeroCurvatureEnding, ZeroSlopeEnding, getConsoleFunction, log, setConsoleFunction } from "./three.core.js";
export { AONode, ArrayElementNode, ArrayNode, AssignNode, AtomicFunctionNode, AttributeNode, BarrierNode, BitcastNode, BitcountNode, BlendMode, BufferAttributeNode, BufferNode, BuiltinNode, BumpMapNode, BypassNode, ClippingNode, ColorSpaceNode, ComputeBuiltinNode, ComputeNode, ConditionalNode, ConstNode, ContextNode, ConvertNode, CubeTextureNode, DebugNode, EventNode, FlipNode, FrontFacingNode, FunctionCallNode, FunctionOverloadingNode, IndexNode, InputNode, InspectorNode, IrradianceNode, IsolateNode, JoinNode, LightingContextNode, LoopNode, MRTNode, MaterialNode, MaterialReferenceNode, MathNode, MaxMipLevelNode, MemberNode, ModelNode, NodeError, NodeMaterialObserver, NodeShaderStage, NodeType, NodeUtils, NormalMapNode, Object3DNode, OperatorNode, OutputStructNode, OverrideContextNode, PMREMGenerator, PMREMNode, PackFloatNode, Packed4x8IntegerNode, PassNode, PointShadowNode, PointUVNode, PropertyNode, RTTNode, RangeNode, ReferenceBaseNode, ReferenceElementNode, ReferenceNode, ReflectorNode, RenderOutputNode, RendererReferenceNode, RendererUtils, RotateNode, SampleNode, ScreenNode, SetNode, ShadowBaseNode, ShadowNode, SplitNode, StackNode, StorageArrayElementNode, StorageBufferNode, StorageInstancedBufferAttribute, StorageTexture3DNode, StorageTextureNode, StructNode, StructTypeNode, SubBuildNode, SubgroupFunctionNode, Three_TSL as TSL, Texture3DNode, TextureSizeNode, ToneMappingNode, ToonOutlinePassNode, UniformArrayNode, UniformGroupNode, UniformNode, UnpackFloatNode, UserDataNode, VaryingNode, VelocityNode, VertexColorNode, ViewportDepthNode, ViewportDepthTextureNode, ViewportSharedTextureNode, ViewportTextureNode, WorkgroupInfoNode, defaultShaderStages } from "./three.tsl.js";
