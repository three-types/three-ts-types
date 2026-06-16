import { ACESFilmicToneMapping } from './three.core.js';
/**
 * A generic class that can be used by nodes which contribute
 * ambient occlusion to the scene. E.g. an ambient occlusion map
 * node can be used as input for this module. Used in {@link NodeMaterial}.
 *
 * @augments LightingNode
 */
export class AONode extends LightingNode {
    /**
     * Constructs a new AO node.
     *
     * @param {?Node<float>} [aoNode=null] - The ambient occlusion node.
     */
    constructor(aoNode?: Node<any> | null);
    /**
     * The ambient occlusion node.
     *
     * @type {?Node<float>}
     * @default null
     */
    aoNode: Node<any> | null;
    setup(builder: any): void;
}
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
/**
 * Base class for analytic light nodes.
 *
 * @augments LightingNode
 */
export class AnalyticLightNode extends LightingNode {
    /**
     * Constructs a new analytic light node.
     *
     * @param {?Light} [light=null] - The light source.
     */
    constructor(light?: Light | null);
    /**
     * The light source.
     *
     * @type {?Light}
     * @default null
     */
    light: Light | null;
    /**
     * The light's color value.
     *
     * @type {Color}
     */
    color: Color;
    /**
     * The light's color node. Points to `colorNode` of the light source, if set. Otherwise
     * it creates a uniform node based on {@link AnalyticLightNode#color}.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * This property is used to retain a reference to the original value of {@link AnalyticLightNode#colorNode}.
     * The final color node is represented by a different node when using shadows.
     *
     * @type {?Node}
     * @default null
     */
    baseColorNode: Node | null;
    /**
     * Represents the light's shadow.
     *
     * @type {?ShadowNode}
     * @default null
     */
    shadowNode: ShadowNode | null;
    /**
     * Represents the light's shadow color.
     *
     * @type {?Node}
     * @default null
     */
    shadowColorNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isAnalyticLightNode: boolean;
    _shadowDisposeListener: (() => void) | undefined;
    /**
     * Frees internal resources related to shadows.
     */
    disposeShadow(): void;
    getHash(): any;
    /**
     * Returns a node representing a direction vector which points from the current
     * position in view space to the light's position in view space.
     *
     * @param {NodeBuilder} builder - The builder object used for setting up the light.
     * @return {Node<vec3>} The light vector node.
     */
    getLightVector(builder: NodeBuilder): Node<any>;
    /**
     * Sets up the direct lighting for the analytic light node.
     *
     * @abstract
     * @param {NodeBuilder} builder - The builder object used for setting up the light.
     * @return {Object|undefined} The direct light data (color and direction).
     */
    setupDirect(): Object | undefined;
    /**
     * Sets up the direct rect area lighting for the analytic light node.
     *
     * @abstract
     * @param {NodeBuilder} builder - The builder object used for setting up the light.
     * @return {Object|undefined} The direct rect area light data.
     */
    setupDirectRectArea(): Object | undefined;
    /**
     * Setups the shadow node for this light. The method exists so concrete light classes
     * can setup different types of shadow nodes.
     *
     * @return {ShadowNode} The created shadow node.
     */
    setupShadowNode(): ShadowNode;
    /**
     * Setups the shadow for this light. This method is only executed if the light
     * cast shadows and the current build object receives shadows. It incorporates
     * shadows into the lighting computation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupShadow(builder: NodeBuilder): void;
    /**
     * Unlike most other nodes, lighting nodes do not return a output node in {@link Node#setup}.
     * The main purpose of lighting nodes is to configure the current {@link LightingModel} and/or
     * invocate the respective interface methods.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * The update method is used to update light uniforms per frame.
     * Potentially overwritten in concrete light nodes to update light
     * specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
}
import { ArrayCamera } from './three.core.js';
/**
 * Base class for representing element access on an array-like
 * node data structures.
 *
 * @augments Node
 */
export class ArrayElementNode extends Node {
    /**
     * Constructs an array element node.
     *
     * @param {Node} node - The array-like node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(node: Node, indexNode: Node);
    /**
     * The array-like node.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The index node that defines the element access.
     *
     * @type {Node}
     */
    indexNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayElementNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from the array-like node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the member type is inferred from the array-like node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The member name.
     * @return {string} The member type.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    generate(builder: any): string;
}
/**
 * ArrayNode represents a collection of nodes, typically created using the {@link array} function.
 * ```js
 * const colors = array( [
 * 	vec3( 1, 0, 0 ),
 * 	vec3( 0, 1, 0 ),
 * 	vec3( 0, 0, 1 )
 * ] );
 *
 * const redColor = tintColors.element( 0 );
 * ```
 *
 * @augments TempNode
 */
export class ArrayNode extends TempNode {
    /**
     * Constructs a new array node.
     *
     * @param {?string} nodeType - The data type of the elements.
     * @param {number} count - Size of the array.
     * @param {?Array<Node>} [values=null] - Array default values.
     */
    constructor(nodeType: string | null, count: number, values?: Array<Node> | null);
    /**
     * Array size.
     *
     * @type {number}
     */
    count: number;
    /**
     * Array default values.
     *
     * @type {?Array<Node>}
     */
    values: Array<Node> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayNode: boolean;
    /**
     * Returns the number of elements in the node array.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {number} The number of elements in the node array.
     */
    getArrayCount(): number;
    /**
     * Returns the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The type of the node.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the type of a member variable.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member variable.
     * @return {string} The type of the member variable.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * This method builds the output node and returns the resulting array as a shader string.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated shader string.
     */
    generate(builder: NodeBuilder): string;
}
/**
 * These node represents an assign operation. Meaning a node is assigned
 * to another node.
 *
 * @augments TempNode
 */
export class AssignNode extends TempNode {
    /**
     * Constructs a new assign node.
     *
     * @param {Node} targetNode - The target node.
     * @param {Node} sourceNode - The source type.
     */
    constructor(targetNode: Node, sourceNode: Node);
    /**
     * The target node.
     *
     * @type {Node}
     */
    targetNode: Node;
    /**
     * The source node.
     *
     * @type {Node}
     */
    sourceNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isAssignNode: boolean;
    /**
     * Whether this node is used more than once in context of other nodes. This method
     * is overwritten since it always returns `false` (assigns are unique).
     *
     * @return {boolean} A flag that indicates if there is more than one dependency to other nodes. Always `false`.
     */
    hasDependencies(): boolean;
    generateNodeType(builder: any, output: any): string;
    /**
     * Whether a split is required when assigning source to target. This can happen when the component length of
     * target and source data type does not match.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether a split is required when assigning source to target.
     */
    needsSplitAssign(builder: NodeBuilder): boolean;
    setup(builder: any): void;
    generate(builder: any, output: any): any;
}
/**
 * `AtomicFunctionNode` represents any function that can operate on atomic variable types
 * within a shader. In an atomic function, any modification to an atomic variable will
 * occur as an indivisible step with a defined order relative to other modifications.
 * Accordingly, even if multiple atomic functions are modifying an atomic variable at once
 * atomic operations will not interfere with each other.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
export class AtomicFunctionNode extends Node {
    /**
     * Constructs a new atomic function node.
     *
     * @param {string} method - The signature of the atomic function to construct.
     * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
     * @param {Node} valueNode - The value that mutates the atomic variable.
     */
    constructor(method: string, pointerNode: Node, valueNode: Node);
    /**
     * The signature of the atomic function to construct.
     *
     * @type {string}
     */
    method: string;
    /**
     * An atomic variable or element of an atomic buffer.
     *
     * @type {Node}
     */
    pointerNode: Node;
    /**
     * A value that modifies the atomic variable.
     *
     * @type {Node}
     */
    valueNode: Node;
    /**
     * Overwrites the default implementation to return the type of
     * the pointer node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(builder: NodeBuilder): string;
    /**
     * Overwritten since the node type is inferred from the input type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    generate(builder: any): any;
}
export namespace AtomicFunctionNode {
    let ATOMIC_LOAD: string;
    let ATOMIC_STORE: string;
    let ATOMIC_ADD: string;
    let ATOMIC_SUB: string;
    let ATOMIC_MAX: string;
    let ATOMIC_MIN: string;
    let ATOMIC_AND: string;
    let ATOMIC_OR: string;
    let ATOMIC_XOR: string;
}
/**
 * Base class for representing shader attributes as nodes.
 *
 * @augments Node
 */
export class AttributeNode extends Node {
    /**
     * Constructs a new attribute node.
     *
     * @param {string} attributeName - The name of the attribute.
     * @param {?string} nodeType - The node type.
     */
    constructor(attributeName: string, nodeType?: string | null);
    _attributeName: string;
    getHash(builder: any): string;
    generateNodeType(builder: any): string | null;
    /**
     * Sets the attribute name to the given value. The method can be
     * overwritten in derived classes if the final name must be computed
     * analytically.
     *
     * @param {string} attributeName - The name of the attribute.
     * @return {AttributeNode} A reference to this node.
     */
    setAttributeName(attributeName: string): AttributeNode;
    /**
     * Returns the attribute name of this node. The method can be
     * overwritten in derived classes if the final name must be computed
     * analytically.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The attribute name.
     */
    getAttributeName(): string;
    generate(builder: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
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
     * @param {TextureNode} textureNode - The texture node to update the sampler with.
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
/**
 * Represents a GPU control barrier that synchronizes compute operations within a given scope.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
export class BarrierNode extends Node {
    /**
     * Constructs a new barrier node.
     *
     * @param {string} scope - The scope defines the behavior of the node.
     */
    constructor(scope: string);
    scope: string;
    isBarrierNode: boolean;
    setup(builder: any): void;
    generate(builder: any): void;
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
import { BasicShadowMap } from './three.core.js';
/**
 * This node represents an operation that reinterprets the bit representation of a value
 * in one type as a value in another type.
 *
 * @augments TempNode
 */
export class BitcastNode extends TempNode {
    /**
     * Constructs a new bitcast node.
     *
     * @param {Node} valueNode - The value to convert.
     * @param {string} conversionType - The type to convert to.
     * @param {?string} [inputType = null] - The expected input data type of the bitcast operation.
     */
    constructor(valueNode: Node, conversionType: string, inputType?: string | null);
    /**
     * The data to bitcast to a new type.
     *
     * @type {Node}
     */
    valueNode: Node;
    /**
     * The type the value will be converted to.
     *
     * @type {string}
     */
    conversionType: string;
    /**
     * The expected input data type of the bitcast operation.
     *
     *
     * @type {string}
     * @default null
     */
    inputType: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBitcastNode: boolean;
    generateNodeType(builder: any): any;
    generate(builder: any): string;
}
/**
 * This node represents an operation that counts the bits of a piece of shader data.
 *
 * @augments MathNode
 */
export class BitcountNode extends MathNode {
    /**
     * Constructs a new math node.
     *
     * @param {'countTrailingZeros'|'countLeadingZeros'|'countOneBits'} method - The method name.
     * @param {Node} aNode - The first input.
     */
    constructor(method: "countTrailingZeros" | "countLeadingZeros" | "countOneBits", aNode: Node);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBitcountNode: boolean;
    /**
     * Casts the input value of the function to an integer if necessary.
     *
     * @private
     * @param {Node<uint>|Node<int>} inputNode - The input value.
     * @param {Node<uint>} outputNode - The output value.
     * @param {string} elementType - The type of the input value.
     */
    private _resolveElementType;
    _returnDataNode(inputType: any): any;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of countTrailingZeros.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} elementType - The type of the input value.
     * @returns {Function} - The generated function
     */
    private _createTrailingZerosBaseLayout;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of countLeadingZeros.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} elementType - The type of the input value.
     * @returns {Function} - The generated function
     */
    private _createLeadingZerosBaseLayout;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of countOneBits.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} elementType - The type of the input value.
     * @returns {Function} - The generated function
     */
    private _createOneBitsBaseLayout;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of the specified bitcount function.
     * including considerations for component-wise bitcounts on vector type inputs.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} inputType - The type of the input value.
     * @param {number} typeLength - The vec length of the input value.
     * @param {Function} baseFn - The base function that operates on an individual component of the vector.
     * @returns {Function} - The alias function for the specified bitcount method.
     */
    private _createMainLayout;
}
export namespace BitcountNode {
    let COUNT_TRAILING_ZEROS: string;
    let COUNT_LEADING_ZEROS: string;
    let COUNT_ONE_BITS: string;
}
/**
 * Represents blending configuration.
 *
 * This class encapsulates all blending-related properties that control how
 * a material's colors are combined with the colors already in the frame buffer.
 */
export class BlendMode {
    /**
     * Constructs a new blending configuration.
     *
     * @param {(NoBlending|NormalBlending|AdditiveBlending|SubtractiveBlending|MultiplyBlending|CustomBlending|MaterialBlending)} [blending=NormalBlending] - The blending mode.
     */
    constructor(blending?: (number | number | number | number | number | number | number));
    /**
     * Defines the blending type.
     *
     * It must be set to `CustomBlending` if custom blending properties like
     * {@link BlendMode#blendSrc}, {@link BlendMode#blendDst} or {@link BlendMode#blendEquation}
     * should have any effect.
     *
     * @type {(NoBlending|NormalBlending|AdditiveBlending|SubtractiveBlending|MultiplyBlending|CustomBlending|MaterialBlending)}
     * @default NormalBlending
     */
    blending: (number | number | number | number | number | number | number);
    /**
     * Defines the blending source factor.
     *
     * This determines how the source (incoming) fragment color is factored before being added
     * to the destination (existing) fragment color in the frame buffer.
     *
     * @type {(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default SrcAlphaFactor
     */
    blendSrc: (number | number | number | number | number | number | number | number | number | number | number | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
    /**
     * Defines the blending destination factor.
     *
     * This determines how the destination (existing) fragment color in the frame buffer
     * is factored before being combined with the source (incoming) fragment color.
     *
     * @type {(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default OneMinusSrcAlphaFactor
     */
    blendDst: (number | number | number | number | number | number | number | number | number | number | number | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
    /**
     * Defines the blending equation.
     *
     * This determines how the source and destination colors are combined.
     *
     * @type {(AddEquation|SubtractEquation|ReverseSubtractEquation|MinEquation|MaxEquation)}
     * @default AddEquation
     */
    blendEquation: (number | number | number | number | number);
    /**
     * Defines the blending source alpha factor.
     *
     * When set, this allows separate control of the alpha channel's source blending factor.
     * If `null`, {@link BlendMode#blendSrc} is used for the alpha channel as well.
     *
     * @type {?(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default null
     */
    blendSrcAlpha: (number | number | number | number | number | number | number | number | number | number | number | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
    /**
     * Defines the blending destination alpha factor.
     *
     * When set, this allows separate control of the alpha channel's destination blending factor.
     * If `null`, {@link BlendMode#blendDst} is used for the alpha channel as well.
     *
     * @type {?(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default null
     */
    blendDstAlpha: (number | number | number | number | number | number | number | number | number | number | number | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
    /**
     * Defines the blending equation of the alpha channel.
     *
     * When set, this allows separate control of the alpha channel's blending equation.
     * If `null`, {@link BlendMode#blendEquation} is used for the alpha channel as well.
     *
     * @type {?(AddEquation|SubtractEquation|ReverseSubtractEquation|MinEquation|MaxEquation)}
     * @default null
     */
    blendEquationAlpha: (number | number | number | number | number) | null;
    /**
     * Defines whether to premultiply the alpha (transparency) value.
     *
     * If `true`, the RGB color of the texture or material is multiplied by its alpha value.
     * This is useful for transparent textures/materials where the color data
     * should already include the transparency information.
     *
     * @type {boolean}
     * @default false
     */
    premultiplyAlpha: boolean;
    /**
     * Copies the blending properties from the given source to this instance.
     *
     * @param {BlendMode} source - The blending configuration to copy from.
     * @return {BlendMode} A reference to this instance.
     */
    copy(source: BlendMode): BlendMode;
    /**
     * Returns a clone of this blending configuration.
     *
     * @return {BlendMode} A new Blending instance with the same properties.
     */
    clone(): BlendMode;
}
import { BoxGeometry } from './three.core.js';
import { BufferAttribute } from './three.core.js';
/**
 * In earlier `three.js` versions it was only possible to define attribute data
 * on geometry level. With `BufferAttributeNode`, it is also possible to do this
 * on the node level.
 * ```js
 * const geometry = new THREE.PlaneGeometry();
 * const positionAttribute = geometry.getAttribute( 'position' );
 *
 * const colors = [];
 * for ( let i = 0; i < position.count; i ++ ) {
 * 	colors.push( 1, 0, 0 );
 * }
 *
 * material.colorNode = bufferAttribute( new THREE.Float32BufferAttribute( colors, 3 ) );
 * ```
 * This new approach is especially interesting when geometry data are generated via
 * compute shaders. The below line converts a storage buffer into an attribute node.
 * ```js
 * material.positionNode = positionBuffer.toAttribute();
 * ```
 * @augments InputNode
 */
export class BufferAttributeNode extends InputNode {
    /**
     * Constructs a new buffer attribute node.
     *
     * @param {BufferAttribute|InterleavedBuffer|TypedArray} value - The attribute data.
     * @param {?string} [bufferType=null] - The buffer type (e.g. `'vec3'`).
     * @param {number} [bufferStride=0] - The buffer stride.
     * @param {number} [bufferOffset=0] - The buffer offset.
     */
    constructor(value: BufferAttribute | InterleavedBuffer | TypedArray, bufferType?: string | null, bufferStride?: number, bufferOffset?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBufferNode: boolean;
    /**
     * The buffer type (e.g. `'vec3'`).
     *
     * @type {?string}
     * @default null
     */
    bufferType: string | null;
    /**
     * The buffer stride.
     *
     * @type {number}
     * @default 0
     */
    bufferStride: number;
    /**
     * The buffer offset.
     *
     * @type {number}
     * @default 0
     */
    bufferOffset: number;
    /**
     * The usage property. Set this to `THREE.DynamicDrawUsage` via `.setUsage()`,
     * if you are planning to update the attribute data per frame.
     *
     * @type {number}
     * @default StaticDrawUsage
     */
    usage: number;
    /**
     * Whether the attribute is instanced or not.
     *
     * @type {boolean}
     * @default false
     */
    instanced: boolean;
    /**
     * A reference to the buffer attribute.
     *
     * @type {?BufferAttribute}
     * @default null
     */
    attribute: BufferAttribute | null;
    /**
     * This method is overwritten since the attribute data might be shared
     * and thus the hash should be shared as well.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the node type is inferred from
     * the buffer attribute.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Depending on which value was passed to the node, `setup()` behaves
     * differently. If no instance of `BufferAttribute` was passed, the method
     * creates an internal attribute and configures it respectively.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Generates the code snippet of the buffer attribute node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder): string;
    /**
     * Overwrites the default implementation to return a fixed value `'bufferAttribute'`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
    /**
     * Sets the `usage` property to the given value.
     *
     * @param {number} value - The usage to set.
     * @return {BufferAttributeNode} A reference to this node.
     */
    setUsage(value: number): BufferAttributeNode;
    /**
     * Sets the `instanced` property to the given value.
     *
     * @param {boolean} value - The value to set.
     * @return {BufferAttributeNode} A reference to this node.
     */
    setInstanced(value: boolean): BufferAttributeNode;
}
import { BufferGeometry } from './three.core.js';
/**
 * A special type of uniform node which represents array-like data
 * as uniform buffers. The access usually happens via `element()`
 * which returns an instance of {@link ArrayElementNode}. For example:
 *
 * ```js
 * const bufferNode = buffer( array, 'mat4', count );
 * const matrixNode = bufferNode.element( index ); // access a matrix from the buffer
 * ```
 * In general, it is recommended to use the more managed {@link UniformArrayNode}
 * since it handles more input types and automatically cares about buffer paddings.
 *
 * @augments UniformNode
 */
export class BufferNode extends UniformNode {
    /**
     * Constructs a new buffer node.
     *
     * @param {Array<number>} value - Array-like buffer data.
     * @param {string} bufferType - The data type of the buffer.
     * @param {number} [bufferCount=0] - The count of buffer elements.
     */
    constructor(value: Array<number>, bufferType: string, bufferCount?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBufferNode: boolean;
    /**
     * The data type of the buffer.
     *
     * @type {string}
     */
    bufferType: string;
    /**
     * The uniform node that holds the value of the reference node.
     *
     * @type {number}
     * @default 0
     */
    bufferCount: number;
    /**
     * An array of update ranges.
     *
     * @type {Array<{start: number, count: number}>}
     */
    updateRanges: Array<{
        start: number;
        count: number;
    }>;
    /**
     * Adds a range of data in the data array to be updated on the GPU.
     *
     * @param {number} start - Position at which to start update.
     * @param {number} count - The number of components to update.
     */
    addUpdateRange(start: number, count: number): void;
    /**
     * Clears the update ranges.
     */
    clearUpdateRanges(): void;
    /**
     * Overwrites the default implementation to return a fixed value `'buffer'`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
}
/**
 * The node allows to set values for built-in shader variables. That is
 * required for features like hardware-accelerated vertex clipping.
 *
 * @augments Node
 */
export class BuiltinNode extends Node {
    /**
     * Constructs a new builtin node.
     *
     * @param {string} name - The name of the built-in shader variable.
     */
    constructor(name: string);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBuiltinNode: boolean;
    /**
     * Generates the code snippet of the builtin node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(): string;
}
/**
 * This class can be used for applying bump maps to materials.
 *
 * ```js
 * material.normalNode = bumpMap( texture( bumpTex ) );
 * ```
 *
 * @augments TempNode
 */
export class BumpMapNode extends TempNode {
    /**
     * Constructs a new bump map node.
     *
     * @param {Node<float>} textureNode - Represents the bump map data.
     * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
     */
    constructor(textureNode: Node<any>, scaleNode?: Node<any> | null);
    /**
     * Represents the bump map data.
     *
     * @type {Node<float>}
     */
    textureNode: Node<any>;
    /**
     * Controls the intensity of the bump effect.
     *
     * @type {?Node<float>}
     * @default null
     */
    scaleNode: Node<any> | null;
    setup(builder: any): any;
}
/**
 * A specialized group which enables applications access to the
 * Render Bundle API of WebGPU. The group with all its descendant nodes
 * are considered as one render bundle and processed as such by
 * the renderer.
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
/**
 * The class generates the code of a given node but returns another node in the output.
 * This can be used to call a method or node that does not return a value, i.e.
 * type `void` on an input where returning a value is required. Example:
 *
 * ```js
 * material.colorNode = myColor.bypass( runVoidFn() )
 *```
 *
 * @augments Node
 */
export class BypassNode extends Node {
    /**
     * Constructs a new bypass node.
     *
     * @param {Node} outputNode - The output node.
     * @param {Node} callNode - The call node.
     */
    constructor(outputNode: Node, callNode: Node);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBypassNode: boolean;
    /**
     * The output node.
     *
     * @type {Node}
     */
    outputNode: Node;
    /**
     * The call node.
     *
     * @type {Node}
     */
    callNode: Node;
    generateNodeType(builder: any): string;
    generate(builder: any): string | Node | null;
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
/**
 * This node is used in {@link NodeMaterial} to setup the clipping
 * which can happen hardware-accelerated (if supported) and optionally
 * use alpha-to-coverage for anti-aliasing clipped edges.
 *
 * @augments Node
 */
export class ClippingNode extends Node {
    /**
     * Constructs a new clipping node.
     *
     * @param {('default'|'hardware'|'alphaToCoverage')} [scope='default'] - The node's scope. Similar to other nodes,
     * the selected scope influences the behavior of the node and what type of code is generated.
     */
    constructor(scope?: ("default" | "hardware" | "alphaToCoverage"));
    /**
     * The node's scope. Similar to other nodes, the selected scope influences
     * the behavior of the node and what type of code is generated.
     *
     * @type {('default'|'hardware'|'alphaToCoverage')}
     */
    scope: ("default" | "hardware" | "alphaToCoverage");
    /**
     * Setups the node depending on the selected scope.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The result node.
     */
    setup(builder: NodeBuilder): Node;
    hardwareClipping: boolean | undefined;
    /**
     * Setups alpha to coverage.
     *
     * @param {Array<Vector4>} intersectionPlanes - The intersection planes.
     * @param {Array<Vector4>} unionPlanes - The union planes.
     * @return {Node} The result node.
     */
    setupAlphaToCoverage(intersectionPlanes: Array<Vector4>, unionPlanes: Array<Vector4>): Node;
    /**
     * Setups the default clipping.
     *
     * @param {Array<Vector4>} intersectionPlanes - The intersection planes.
     * @param {Array<Vector4>} unionPlanes - The union planes.
     * @return {Node} The result node.
     */
    setupDefault(intersectionPlanes: Array<Vector4>, unionPlanes: Array<Vector4>): Node;
    /**
     * Setups hardware clipping.
     *
     * @param {Array<Vector4>} unionPlanes - The union planes.
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The result node.
     */
    setupHardwareClipping(unionPlanes: Array<Vector4>, builder: NodeBuilder): Node;
}
export namespace ClippingNode {
    let ALPHA_TO_COVERAGE: string;
    let DEFAULT: string;
    let HARDWARE: string;
}
/**
 * This class represents native code sections. It is the base
 * class for modules like {@link FunctionNode} which allows to implement
 * functions with native shader languages.
 *
 * @augments Node
 */
export class CodeNode extends Node {
    /**
     * Constructs a new code node.
     *
     * @param {string} [code=''] - The native code.
     * @param {Array<Node>} [includes=[]] - An array of includes.
     * @param {('js'|'wgsl'|'glsl')} [language=''] - The used language.
     */
    constructor(code?: string, includes?: Array<Node>, language?: ("js" | "wgsl" | "glsl"));
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCodeNode: boolean;
    /**
     * The native code.
     *
     * @type {string}
     * @default ''
     */
    code: string;
    /**
     * An array of includes
     *
     * @type {Array<Node>}
     * @default []
     */
    includes: Array<Node>;
    /**
     * The used language.
     *
     * @type {('js'|'wgsl'|'glsl')}
     * @default ''
     */
    language: ("js" | "wgsl" | "glsl");
    /**
     * Sets the includes of this code node.
     *
     * @param {Array<Node>} includes - The includes to set.
     * @return {CodeNode} A reference to this node.
     */
    setIncludes(includes: Array<Node>): CodeNode;
    /**
     * Returns the includes of this code node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Array<Node>} The includes.
     */
    getIncludes(): Array<Node>;
    generate(builder: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import { Color } from './three.core.js';
import { ColorManagement } from './three.core.js';
/**
 * This node represents a color space conversion. Meaning it converts
 * a color value from a source to a target color space.
 *
 * @augments TempNode
 */
export class ColorSpaceNode extends TempNode {
    /**
     * Constructs a new color space node.
     *
     * @param {Node} colorNode - Represents the color to convert.
     * @param {string} source - The source color space.
     * @param {string} target - The target color space.
     */
    constructor(colorNode: Node, source: string, target: string);
    /**
     * Represents the color to convert.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * The source color space.
     *
     * @type {string}
     */
    source: string;
    /**
     * The target color space.
     *
     * @type {string}
     */
    target: string;
    /**
     * This method resolves the constants `WORKING_COLOR_SPACE` and
     * `OUTPUT_COLOR_SPACE` based on the current configuration of the
     * color management and renderer.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} colorSpace - The color space to resolve.
     * @return {string} The resolved color space.
     */
    resolveColorSpace(builder: NodeBuilder, colorSpace: string): string;
    setup(builder: any): Node;
}
import { Compatibility } from './three.core.js';
/**
 * `ComputeBuiltinNode` represents a compute-scope builtin value that expose information
 * about the currently running dispatch and/or the device it is running on.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
export class ComputeBuiltinNode extends Node {
    /**
     * Constructs a new compute builtin node.
     *
     * @param {string} builtinName - The built-in name.
     * @param {string} nodeType - The node type.
     */
    constructor(builtinName: string, nodeType: string);
    /**
     * The built-in name.
     *
     * @private
     * @type {string}
     */
    private _builtinName;
    /**
     * This method is overwritten since hash is derived from the built-in name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the node type is simply derived from `nodeType`..
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(): string;
    /**
     * Sets the builtin name.
     *
     * @param {string} builtinName - The built-in name.
     * @return {ComputeBuiltinNode} A reference to this node.
     */
    setBuiltinName(builtinName: string): ComputeBuiltinNode;
    /**
     * Returns the builtin name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The builtin name.
     */
    getBuiltinName(): string;
    /**
     * Whether the current node builder has the builtin or not.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether the builder has the builtin or not.
     */
    hasBuiltin(builder: NodeBuilder): boolean;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
/**
 * Represents a compute shader node.
 *
 * @augments Node
 */
export class ComputeNode extends Node {
    /**
     * Constructs a new compute node.
     *
     * @param {Node} computeNode - The node that defines the compute shader logic.
     * @param {Array<number>} workgroupSize - An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.
     */
    constructor(computeNode: Node, workgroupSize: Array<number>);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isComputeNode: boolean;
    /**
     * The node that defines the compute shader logic.
     *
     * @type {Node}
     */
    computeNode: Node;
    /**
     * An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.
     *
     * @type {Array<number>}
     * @default [ 64 ]
     */
    workgroupSize: Array<number>;
    /**
     * The total number of threads (invocations) to execute. If it is a number, it will be used
     * to automatically generate bounds checking against `instanceIndex`.
     *
     * @type {number|Array<number>}
     */
    count: number | Array<number>;
    /**
     * The dispatch size for workgroups on X, Y, and Z axes.
     * Used directly if `count` is not provided.
     *
     * @type {number|Array<number>}
     */
    dispatchSize: number | Array<number>;
    /**
     * A callback executed when the compute node finishes initialization.
     *
     * @type {?Function}
     */
    onInitFunction: Function | null;
    /**
     * A uniform node holding the dispatch count for bounds checking.
     * Created automatically when `count` is a number.
     *
     * @type {?UniformNode}
     */
    countNode: UniformNode | null;
    /**
     * Sets the {@link ComputeNode#name} property.
     *
     * @param {string} name - The name of the uniform.
     * @return {ComputeNode} A reference to this node.
     */
    setName(name: string): ComputeNode;
    /**
     * Sets the {@link ComputeNode#name} property.
     *
     * @deprecated
     * @param {string} name - The name of the uniform.
     * @return {ComputeNode} A reference to this node.
     */
    label(name: string): ComputeNode;
    /**
     * Sets the callback to run during initialization.
     *
     * @param {Function} callback - The callback function.
     * @return {ComputeNode} A reference to this node.
     */
    onInit(callback: Function): ComputeNode;
    /**
     * The method execute the compute for this node.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore({ renderer }: NodeFrame): void;
    setup(builder: any): string | Node | null;
    generate(builder: any, output: any): any;
}
/**
 * Represents a logical `if/else` statement. Can be used as an alternative
 * to the `If()`/`Else()` syntax.
 *
 * The `select()` method is called in a chaining fashion on a condition. The parameter nodes of `select()`
 * determine the outcome of the entire statement.
 *
 * ```js
 * velocity = position.greaterThanEqual( limit ).select( velocity.negate(), velocity );
 * ```
 *
 * @augments Node
 */
export class ConditionalNode extends Node {
    /**
     * Constructs a new conditional node.
     *
     * @param {Node} condNode - The node that defines the condition.
     * @param {Node} ifNode - The node that is evaluate when the condition ends up `true`.
     * @param {?Node} [elseNode=null] - The node that is evaluate when the condition ends up `false`.
     */
    constructor(condNode: Node, ifNode: Node, elseNode?: Node | null);
    /**
     * The node that defines the condition.
     *
     * @type {Node}
     */
    condNode: Node;
    /**
     * The node that is evaluate when the condition ends up `true`.
     *
     * @type {Node}
     */
    ifNode: Node;
    /**
     * The node that is evaluate when the condition ends up `false`.
     *
     * @type {?Node}
     * @default null
     */
    elseNode: Node | null;
    /**
     * This method is overwritten since the node type is inferred from the if/else
     * nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    setup(builder: any): void;
    generate(builder: any, output: any): any;
}
/**
 * Class for representing a constant value in the shader.
 *
 * @augments InputNode
 */
export class ConstNode extends InputNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isConstNode: boolean;
    /**
     * Generates the shader string of the value with the current node builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated value as a shader string.
     */
    generateConst(builder: NodeBuilder): string;
    generate(builder: any, output: any): any;
}
/**
 * This node can be used as a context management component for another node.
 * {@link NodeBuilder} performs its node building process in a specific context and
 * this node allows the modify the context. A typical use case is to overwrite `getUV()` e.g.:
 *
 * ```js
 *node.context( { getUV: () => customCoord } );
 *\// or
 *material.contextNode = context( { getUV: () => customCoord } );
 *\// or
 *renderer.contextNode = context( { getUV: () => customCoord } );
 *\// or
 *scenePass.contextNode = context( { getUV: () => customCoord } );
 *```
 * @augments Node
 */
export class ContextNode extends Node {
    /**
     * Constructs a new context node.
     *
     * @param {Node} node - The node whose context should be modified.
     * @param {Object} [value={}] - The modified context data.
     */
    constructor(node?: Node, value?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isContextNode: boolean;
    /**
     * The node whose context should be modified.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The modified context data.
     *
     * @type {Object}
     * @default {}
     */
    value: Object;
    /**
     * This method is overwritten to ensure it returns the type of {@link ContextNode#node}.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Gathers the context data from all parent context nodes.
     *
     * @return {Object} The gathered context data.
     */
    getFlowContextData(): Object;
    /**
     * This method is overwritten to ensure it returns the member type of {@link ContextNode#node}.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The member name.
     * @returns {string} The member type.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    analyze(builder: any): void;
    setup(builder: any): void;
    generate(builder: any, output: any): string | Node | null;
}
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a convert operation during the shader generation process
 * meaning it converts the data type of a node to a target data type.
 *
 * @augments Node
 */
export class ConvertNode extends Node {
    /**
     * Constructs a new convert node.
     *
     * @param {Node} node - The node which type should be converted.
     * @param {string} convertTo - The target node type. Multiple types can be defined by separating them with a `|` sign.
     */
    constructor(node: Node, convertTo: string);
    /**
     * The node which type should be converted.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The target node type. Multiple types can be defined by separating them with a `|` sign.
     *
     * @type {string}
     */
    convertTo: string;
    /**
     * This method is overwritten since the implementation tries to infer the best
     * matching type from the {@link ConvertNode#convertTo} property.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    serialize(data: any): void;
    deserialize(data: any): void;
    generate(builder: any, output: any): any;
}
import { CubeCamera } from './three.core.js';
import { CubeDepthTexture } from './three.core.js';
/**
 * This node can be used to automatically convert environment maps in the
 * equirectangular format into the cube map format.
 *
 * @augments TempNode
 */
export class CubeMapNode extends TempNode {
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
/**
 * This class represents a cube render target. It is a special version
 * of `WebGLCubeRenderTarget` which is compatible with `WebGPURenderer`.
 *
 * @augments RenderTarget
 */
export class CubeRenderTarget extends RenderTarget {
    /**
     * Constructs a new cube render target.
     *
     * @param {number} [size=1] - The size of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(size?: number, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeRenderTarget: boolean;
    /**
     * Converts the given equirectangular texture to a cube map.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Texture} texture - The equirectangular texture.
     * @return {CubeRenderTarget} A reference to this cube render target.
     */
    fromEquirectangularTexture(renderer: Renderer, texture$1: any): CubeRenderTarget;
    /**
     * Clears this cube render target.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear(renderer: Renderer, color?: boolean, depth?: boolean, stencil?: boolean): void;
}
import { CubeTexture } from './three.core.js';
/**
 * This type of uniform node represents a cube texture.
 *
 * @augments TextureNode
 */
export class CubeTextureNode extends TextureNode {
    /**
     * Constructs a new cube texture node.
     *
     * @param {CubeTexture} value - The cube texture.
     * @param {?Node<vec3>} [uvNode=null] - The uv node.
     * @param {?Node<int>} [levelNode=null] - The level node.
     * @param {?Node<float>} [biasNode=null] - The bias node.
     */
    constructor(value: CubeTexture, uvNode?: Node<any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeTextureNode: boolean;
    /**
     * Overwritten with an empty implementation since the `updateMatrix` flag is ignored
     * for cube textures. The uv transformation matrix is not applied to cube textures.
     *
     * @param {boolean} value - The update toggle.
     */
    setUpdateMatrix(): void;
}
import { CubeUVReflectionMapping } from './three.core.js';
import { CullFaceBack } from './three.core.js';
import { CullFaceFront } from './three.core.js';
import { CullFaceNone } from './three.core.js';
import { CustomBlending } from './three.core.js';
import { CylinderGeometry } from './three.core.js';
import { DataArrayTexture } from './three.core.js';
import { DataTexture } from './three.core.js';
export class DebugNode extends TempNode {
    constructor(node: any, callback?: null);
    node: any;
    callback: any;
    generateNodeType(builder: any): any;
    setup(builder: any): any;
    analyze(builder: any): any;
    generate(builder: any): any;
}
import { DecrementStencilOp } from './three.core.js';
import { DecrementWrapStencilOp } from './three.core.js';
import { DepthFormat } from './three.core.js';
import { DepthStencilFormat } from './three.core.js';
import { DepthTexture } from './three.core.js';
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
 * is defined via environment maps in the equirectangular, cube map or cubeUV (PMREM) format.
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
/**
 * EventNode is a node that executes a callback during specific update phases.
 *
 * @augments Node
 */
export class EventNode extends Node {
    /**
     * Creates an EventNode.
     *
     * @param {string} eventType - The type of event
     * @param {Function} callback - The callback to execute on update.
     */
    constructor(eventType: string, callback: Function);
    eventType: string;
    callback: Function;
    update(frame: any): void;
    updateBefore(frame: any): void;
}
export namespace EventNode {
    let OBJECT: string;
    let MATERIAL: string;
    let FRAME: string;
    let BEFORE_OBJECT: string;
    let BEFORE_MATERIAL: string;
    let BEFORE_FRAME: string;
}
/**
 * This class can be used to implement basic expressions in shader code.
 * Basic examples for that are `return`, `continue` or `discard` statements.
 *
 * @augments Node
 */
export class ExpressionNode extends Node {
    /**
     * Constructs a new expression node.
     *
     * @param {string} [snippet=''] - The native code snippet.
     * @param {string} [nodeType='void'] - The node type.
     */
    constructor(snippet?: string, nodeType?: string);
    /**
     * The native code snippet.
     *
     * @type {string}
     * @default ''
     */
    snippet: string;
    generate(builder: any, output: any): any;
}
import { FileLoader } from './three.core.js';
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a flip operation during the shader generation process
 * meaning it flips normalized values with the following formula:
 * ```
 * x = 1 - x;
 * ```
 * `FlipNode` is internally used to implement any `flipXYZW()`, `flipRGBA()` and
 * `flipSTPQ()` method invocations on node objects. For example:
 * ```js
 * uvNode = uvNode.flipY();
 * ```
 *
 * @augments TempNode
 */
export class FlipNode extends TempNode {
    /**
     * Constructs a new flip node.
     *
     * @param {Node} sourceNode - The node which component(s) should be flipped.
     * @param {string} components - The components that should be flipped e.g. `'x'` or `'xy'`.
     */
    constructor(sourceNode: Node, components: string);
    /**
     * The node which component(s) should be flipped.
     *
     * @type {Node}
     */
    sourceNode: Node;
    /**
     * The components that should be flipped e.g. `'x'` or `'xy'`.
     *
     * @type {string}
     */
    components: string;
    /**
     * This method is overwritten since the node type is inferred from the source node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    generate(builder: any): string;
}
import { Float16BufferAttribute } from './three.core.js';
import { Float32BufferAttribute } from './three.core.js';
import { FloatType } from './three.core.js';
import { FramebufferTexture } from './three.core.js';
/**
 * This node can be used to evaluate whether a primitive is front or back facing.
 *
 * @augments Node
 */
export class FrontFacingNode extends Node {
    /**
     * Constructs a new front facing node.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isFrontFacingNode: boolean;
    generate(builder: any): any;
}
import { FrontSide } from './three.core.js';
import { Frustum } from './three.core.js';
import { FrustumArray } from './three.core.js';
/**
 * This module represents the call of a {@link FunctionNode}. Developers are usually not confronted
 * with this module since they use the predefined TSL syntax `wgslFn` and `glslFn` which encapsulate
 * this logic.
 *
 * @augments TempNode
 */
export class FunctionCallNode extends TempNode {
    /**
     * Constructs a new function call node.
     *
     * @param {?FunctionNode} functionNode - The function node.
     * @param {Object<string, Node>} [parameters={}] - The parameters for the function call.
     */
    constructor(functionNode?: FunctionNode | null, parameters?: {
        [x: string]: Node;
    });
    /**
     * The function node.
     *
     * @type {?FunctionNode}
     * @default null
     */
    functionNode: FunctionNode | null;
    /**
     * The parameters of the function call.
     *
     * @type {Object<string, Node>}
     * @default {}
     */
    parameters: {
        [x: string]: Node;
    };
    /**
     * Sets the parameters of the function call node.
     *
     * @param {Object<string, Node>} parameters - The parameters to set.
     * @return {FunctionCallNode} A reference to this node.
     */
    setParameters(parameters: {
        [x: string]: Node;
    }): FunctionCallNode;
    /**
     * Returns the parameters of the function call node.
     *
     * @return {Object<string, Node>} The parameters of this node.
     */
    getParameters(): {
        [x: string]: Node;
    };
    /**
     * Returns the type of this function call node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @returns {string} The type of this node.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the function node of this function call node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} [name] - The name of the member.
     * @returns {string} The type of the member.
     */
    getMemberType(builder: NodeBuilder, name?: string): string;
    generate(builder: any): string;
}
/**
 * This class represents a native shader function. It can be used to implement
 * certain aspects of a node material with native shader code. There are two predefined
 * TSL functions for easier usage.
 *
 * - `wgslFn`: Creates a WGSL function node.
 * - `glslFn`: Creates a GLSL function node.
 *
 * A basic example with one include looks like so:
 *
 * ```js
 * const desaturateWGSLFn = wgslFn( `
 *	fn desaturate( color:vec3<f32> ) -> vec3<f32> {
 *		let lum = vec3<f32>( 0.299, 0.587, 0.114 );
 *		return vec3<f32>( dot( lum, color ) );
 *	}`
 *);
 * const someWGSLFn = wgslFn( `
 *	fn someFn( color:vec3<f32> ) -> vec3<f32> {
 * 		return desaturate( color );
 * 	}
 * `, [ desaturateWGSLFn ] );
 * material.colorNode = someWGSLFn( { color: texture( map ) } );
 *```
 * @augments CodeNode
 */
export class FunctionNode extends CodeNode {
    /**
     * Returns the type of this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the type of a member of this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member.
     * @return {string} The type of the member.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * Returns the inputs of this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Array<NodeFunctionInput>} The inputs.
     */
    getInputs(builder: NodeBuilder): Array<NodeFunctionInput>;
    /**
     * Returns the node function for this function node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeFunction} The node function.
     */
    getNodeFunction(builder: NodeBuilder): NodeFunction;
    generate(builder: any, output: any): any;
}
/**
 * This class allows to define multiple overloaded versions
 * of the same function. Depending on the parameters of the function
 * call, the node picks the best-fit overloaded version.
 *
 * @augments Node
 */
export class FunctionOverloadingNode extends Node {
    /**
     * Constructs a new function overloading node.
     *
     * @param {Array<Function>} functionNodes - Array of `Fn` function definitions.
     * @param {...Node} parametersNodes - A list of parameter nodes.
     */
    constructor(functionNodes?: Array<Function>, ...parametersNodes: Node[]);
    /**
     * Array of `Fn` function definitions.
     *
     * @type {Array<Function>}
     */
    functionNodes: Array<Function>;
    /**
     * A list of parameter nodes.
     *
     * @type {Array<Node>}
     */
    parametersNodes: Array<Node>;
    /**
     * The selected overloaded function call.
     *
     * @private
     * @type {ShaderCallNodeInternal}
     */
    private _candidateFn;
    /**
     * This method is overwritten since the node type is inferred from
     * the function's return type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the candidate function for the current parameters.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {FunctionNode} The candidate function.
     */
    getCandidateFn(builder: NodeBuilder): FunctionNode;
    /**
     * Sets up the node for the current parameters.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The setup node.
     */
    setup(builder: NodeBuilder): Node;
}
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
     * @returns {string} The resolved GLSL float packing method name.
     */
    getFloatPackingMethod(encoding: string): string;
    /**
     * Returns the float unpacking method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the integer values are mapped to the float range.
     * @returns {string} The resolved GLSL float unpacking method name.
     */
    getFloatUnpackingMethod(encoding: string): string;
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
 * This class represents shader indices of different types. The following predefined node
 * objects cover frequent use cases:
 *
 * - `vertexIndex`: The index of a vertex within a mesh.
 * - `instanceIndex`: The index of either a mesh instance or an invocation of a compute shader.
 * - `drawIndex`: The index of a draw call.
 * - `invocationLocalIndex`: The index of a compute invocation within the scope of a workgroup load.
 * - `invocationSubgroupIndex`: The index of a compute invocation within the scope of a subgroup.
 * - `subgroupIndex`: The index of a compute invocation's subgroup within its workgroup.
 *
 * @augments Node
 */
export class IndexNode extends Node {
    /**
     * Constructs a new index node.
     *
     * @param {('vertex'|'instance'|'subgroup'|'invocationLocal'|'invocationGlobal'|'invocationSubgroup'|'draw')} scope - The scope of the index node.
     */
    constructor(scope: ("vertex" | "instance" | "subgroup" | "invocationLocal" | "invocationGlobal" | "invocationSubgroup" | "draw"));
    /**
     * The scope of the index node.
     *
     * @type {string}
     */
    scope: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isIndexNode: boolean;
    generate(builder: any): any;
}
export namespace IndexNode {
    let VERTEX: string;
    let INSTANCE: string;
    let SUBGROUP: string;
    let INVOCATION_LOCAL: string;
    let INVOCATION_SUBGROUP: string;
    let DRAW: string;
}
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
/**
 * Base class for representing data input nodes.
 *
 * @augments Node
 */
export class InputNode extends Node {
    /**
     * Constructs a new input node.
     *
     * @param {any} value - The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
     * @param {?string} nodeType - The node type. If no explicit type is defined, the node tries to derive the type from its value.
     */
    constructor(value: any, nodeType?: string | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isInputNode: boolean;
    /**
     * The value of this node. This can be any JS primitive, functions, array buffers or even three.js objects (vector, matrices, colors).
     *
     * @type {any}
     */
    value: any;
    /**
     * The precision of the value in the shader.
     *
     * @type {?('low'|'medium'|'high')}
     * @default null
     */
    precision: ("low" | "medium" | "high") | null;
    generateNodeType(): string | null;
    /**
     * Returns the input type of the node which is by default the node type. Derived modules
     * might overwrite this method and use a fixed type or compute one analytically.
     *
     * A typical example for different input and node types are textures. The input type of a
     * normal RGBA texture is `texture` whereas its node type is `vec4`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(builder: NodeBuilder): string;
    /**
     * Sets the precision to the given value. The method can be
     * overwritten in derived classes if the final precision must be computed
     * analytically.
     *
     * @param {('low'|'medium'|'high')} precision - The precision of the input value in the shader.
     * @return {InputNode} A reference to this node.
     */
    setPrecision(precision: ("low" | "medium" | "high")): InputNode;
    serialize(data: any): void;
    deserialize(data: any): void;
    generate(): void;
}
/**
 * InspectorBase is the base class for all inspectors.
 *
 * @class InspectorBase
 * @augments EventDispatcher
 */
export class InspectorBase extends EventDispatcher {
    /**
     * The renderer associated with this inspector.
     *
     * @type {WebGLRenderer}
     * @private
     */
    private _renderer;
    /**
     * The current frame being processed.
     *
     * @type {Object}
     */
    currentFrame: Object;
    /**
     * Returns the node frame for the current renderer.
     *
     * @return {Object} The node frame.
     */
    get nodeFrame(): Object;
    /**
     * Sets the renderer for this inspector.
     *
     * @param {WebGLRenderer} renderer - The renderer to associate with this inspector.
     * @return {InspectorBase} This inspector instance.
     */
    setRenderer(renderer: WebGLRenderer): InspectorBase;
    /**
     * Returns the renderer associated with this inspector.
     *
     * @return {WebGLRenderer} The associated renderer.
     */
    getRenderer(): WebGLRenderer;
    /**
     * Initializes the inspector.
     */
    init(): void;
    /**
     * Called when a frame begins.
     */
    begin(): void;
    /**
     * Called when a frame ends.
     */
    finish(): void;
    /**
     * Inspects a node.
     *
     * @param {Node} node - The node to inspect.
     */
    inspect(): void;
    /**
     * When a compute operation is performed.
     *
     * @param {ComputeNode} computeNode - The compute node being executed.
     * @param {number|Array<number>} dispatchSizeOrCount - The dispatch size or count.
     */
    computeAsync(): void;
    /**
     * Called when a compute operation begins.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @param {ComputeNode} computeNode - The compute node being executed.
     */
    beginCompute(): void;
    /**
     * Called when a compute operation ends.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @param {ComputeNode} computeNode - The compute node being executed.
     */
    finishCompute(): void;
    /**
     * Called when a render operation begins.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @param {Scene} scene - The scene being rendered.
     * @param {Camera} camera - The camera being used for rendering.
     * @param {?WebGLRenderTarget} renderTarget - The render target, if any.
     */
    beginRender(): void;
    /**
     * Called when an animation loop ends.
     *
     * @param {string} uid - A unique identifier for the render context.
     */
    finishRender(): void;
    /**
     * Called when a texture copy operation is performed.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     */
    copyTextureToTexture(): void;
    /**
     * Called when a framebuffer copy operation is performed.
     *
     * @param {Texture} framebufferTexture - The texture associated with the framebuffer.
     */
    copyFramebufferToTexture(): void;
}
/**
 * InspectorNode is a wrapper node that allows inspection of node values during rendering.
 * It can be used to debug or analyze node outputs in the rendering pipeline.
 *
 * @augments Node
 */
export class InspectorNode extends Node {
    /**
     * Creates an InspectorNode.
     *
     * @param {Node} node - The node to inspect.
     * @param {string} [name=''] - Optional name for the inspector node.
     * @param {Function|null} [callback=null] - Optional callback to modify the node during setup.
     */
    constructor(node: Node, name?: string, callback?: Function | null);
    node: Node;
    callback: Function | null;
    isInspectorNode: boolean;
    /**
     * Returns the name of the inspector node.
     *
     * @returns {string}
     */
    getName(): string;
    /**
     * Updates the inspector node, allowing inspection of the wrapped node.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Returns the type of the wrapped node.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @returns {string}
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Sets up the inspector node.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @returns {Node} The setup node.
     */
    setup(builder: NodeBuilder): Node;
}
import { InstancedBufferAttribute } from './three.core.js';
import { InstancedInterleavedBuffer } from './three.core.js';
import { IntType } from './three.core.js';
import { InterleavedBuffer } from './three.core.js';
import { InterleavedBufferAttribute } from './three.core.js';
import { InvertStencilOp } from './three.core.js';
/**
 * A generic class that can be used by nodes which contribute
 * irradiance to the scene. E.g. a light map node can be used
 * as input for this module. Used in {@link NodeMaterial}.
 *
 * @augments LightingNode
 */
export class IrradianceNode extends LightingNode {
    /**
     * Constructs a new irradiance node.
     *
     * @param {Node<vec3>} node - A node contributing irradiance.
     */
    constructor(node: Node<any>);
    /**
     * A node contributing irradiance.
     *
     * @type {Node<vec3>}
     */
    node: Node<any>;
    setup(builder: any): void;
}
/**
 * This node can be used as a cache management component for another node.
 * Caching is in general used by default in {@link NodeBuilder} but this node
 * allows the usage of a shared parent cache during the build process.
 *
 * @augments Node
 */
export class IsolateNode extends Node {
    /**
     * Constructs a new cache node.
     *
     * @param {Node} node - The node that should be cached.
     * @param {boolean} [parent=true] - Whether this node refers to a shared parent cache or not.
     */
    constructor(node: Node, parent?: boolean);
    /**
     * The node that should be cached.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * Whether this node refers to a shared parent cache or not.
     *
     * @type {boolean}
     * @default true
     */
    parent: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isIsolateNode: boolean;
    generateNodeType(builder: any): string;
    build(builder: any, ...params: any[]): string | Node | null;
    setParent(parent: any): this;
    getParent(): boolean;
}
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a join operation during the shader generation process.
 * For example in can compose/join two single floats into a `vec2` type.
 *
 * @augments TempNode
 */
export class JoinNode extends TempNode {
    /**
     * Constructs a new join node.
     *
     * @param {Array<Node>} nodes - An array of nodes that should be joined.
     * @param {?string} [nodeType=null] - The node type.
     */
    constructor(nodes?: Array<Node>, nodeType?: string | null);
    /**
     * An array of nodes that should be joined.
     *
     * @type {Array<Node>}
     */
    nodes: Array<Node>;
    /**
     * This method is overwritten since the node type must be inferred from the
     * joined data length if not explicitly defined.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    generate(builder: any, output: any): any;
}
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
 * per scene and camera combination.
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
 * `LightingContextNode` represents an extension of the {@link ContextNode} module
 * by adding lighting specific context data. It represents the runtime context of
 * {@link LightsNode}.
 *
 * @augments ContextNode
 */
export class LightingContextNode extends ContextNode {
    /**
     * Constructs a new lighting context node.
     *
     * @param {LightsNode} lightsNode - The lights node.
     * @param {?LightingModel} [lightingModel=null] - The current lighting model.
     * @param {?Array<LightingNode>} materialLightings - The material lightings nodes.
     * @param {?Node<vec3>} [backdropNode=null] - A backdrop node.
     * @param {?Node<float>} [backdropAlphaNode=null] - A backdrop alpha node.
     */
    constructor(lightsNode: LightsNode, lightingModel?: LightingModel | null, materialLightings?: Array<LightingNode> | null, backdropNode?: Node<any> | null, backdropAlphaNode?: Node<any> | null);
    /**
     * The current lighting model.
     *
     * @type {?LightingModel}
     * @default null
     */
    lightingModel: LightingModel | null;
    /**
     * @type {?Array<LightingNode>}
     * @default []
     */
    materialLightings: Array<LightingNode> | null;
    /**
     * A backdrop node.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    backdropNode: Node<any> | null;
    /**
     * A backdrop alpha node.
     *
     * @type {?Node<float>}
     * @default null
     */
    backdropAlphaNode: Node<any> | null;
    _value: {
        radiance: Node<any>;
        irradiance: Node<any>;
        iblIrradiance: Node<any>;
        ambientOcclusion: Node<any>;
        reflectedLight: {
            directDiffuse: Node<any>;
            directSpecular: Node<any>;
            indirectDiffuse: Node<any>;
            indirectSpecular: Node<any>;
        };
        backdrop: Node<any>;
        backdropAlpha: Node<any>;
    } | null;
    /**
     * Returns a lighting context object.
     *
     * @return {{
     * radiance: Node<vec3>,
     * irradiance: Node<vec3>,
     * iblIrradiance: Node<vec3>,
     * ambientOcclusion: Node<float>,
     * reflectedLight: {directDiffuse: Node<vec3>, directSpecular: Node<vec3>, indirectDiffuse: Node<vec3>, indirectSpecular: Node<vec3>},
     * backdrop: Node<vec3>,
     * backdropAlpha: Node<float>
     * }} The lighting context object.
     */
    getContext(): {
        radiance: Node<any>;
        irradiance: Node<any>;
        iblIrradiance: Node<any>;
        ambientOcclusion: Node<any>;
        reflectedLight: {
            directDiffuse: Node<any>;
            directSpecular: Node<any>;
            indirectDiffuse: Node<any>;
            indirectSpecular: Node<any>;
        };
        backdrop: Node<any>;
        backdropAlpha: Node<any>;
    };
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
/**
 * Base class for lighting nodes.
 *
 * @augments Node
 */
export class LightingNode extends Node {
    /**
     * Constructs a new lighting node.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLightingNode: boolean;
}
/**
 * This node represents the scene's lighting and manages the lighting model's life cycle
 * for the current build 3D object. It is responsible for computing the total outgoing
 * light in a given lighting context.
 *
 * @augments Node
 */
export class LightsNode extends Node {
    /**
     * Constructs a new lights node.
     */
    constructor();
    /**
     * A node representing the total diffuse light.
     *
     * @type {Node<vec3>}
     */
    totalDiffuseNode: Node<any>;
    /**
     * A node representing the total specular light.
     *
     * @type {Node<vec3>}
     */
    totalSpecularNode: Node<any>;
    /**
     * A node representing the outgoing light.
     *
     * @type {Node<vec3>}
     */
    outgoingLightNode: Node<any>;
    /**
     * An array representing the lights in the scene.
     *
     * @private
     * @type {Array<Light>}
     */
    private _lights;
    /**
     * Computes a hash value for identifying the current light nodes setup.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {string} The computed hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * Analyzes the node's dependencies by building all nested light nodes
     * and the output node.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     */
    analyze(builder: NodeBuilder): void;
    /**
     * Creates lighting nodes for each scene light. This makes it possible to further
     * process lights in the node system.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Array<LightingNode>} The array of lighting nodes.
     */
    setupLightsNode(builder: NodeBuilder): Array<LightingNode>;
    /**
     * Sets up a direct light in the lighting model.
     *
     * @param {Object} builder - The builder object containing the context and stack.
     * @param {Object} lightNode - The light node.
     * @param {Object} lightData - The light object containing color and direction properties.
     */
    setupDirectLight(builder: Object, lightNode: Object, lightData: Object): void;
    /**
     * Sets up a direct rect area light in the lighting model.
     *
     * @param {Object} builder - The builder object containing the context and stack.
     * @param {Object} lightNode - The light node.
     * @param {Object} lightData - The light object containing color and area light properties.
     */
    setupDirectRectAreaLight(builder: Object, lightNode: Object, lightData: Object): void;
    /**
     * Setups the internal lights by building all respective
     * light nodes.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Array<LightingNode>} lightNodes - An array of lighting nodes.
     */
    setupLights(builder: NodeBuilder, lightNodes: Array<LightingNode>): void;
    getLightNodes(builder: any): any;
    /**
     * The implementation makes sure that for each light in the scene
     * there is a corresponding light node. By building the light nodes
     * and evaluating the lighting model the outgoing light is computed.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<vec3>} A node representing the outgoing light.
     */
    setup(builder: NodeBuilder): Node<any>;
    /**
     * Configures this node with an array of lights.
     *
     * @param {Array<Light>} lights - An array of lights.
     * @return {LightsNode} A reference to this node.
     */
    setLights(lights: Array<Light>): LightsNode;
    /**
     * Returns an array of the scene's lights.
     *
     * @return {Array<Light>} The scene's lights.
     */
    getLights(): Array<Light>;
    /**
     * Whether the scene has lights or not.
     *
     * @type {boolean}
     */
    get hasLights(): boolean;
}
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
import { LinearMipMapLinearFilter } from './three.core.js';
import { LinearMipmapLinearFilter } from './three.core.js';
import { LinearMipmapNearestFilter } from './three.core.js';
import { LinearSRGBColorSpace } from './three.core.js';
import { LinearToneMapping } from './three.core.js';
import { LinearTransfer } from './three.core.js';
import { Loader } from './three.core.js';
/**
 * This module offers a variety of ways to implement loops in TSL. In it's basic form it's:
 * ```js
 * Loop( count, ( { i } ) => {
 *
 * } );
 * ```
 * However, it is also possible to define a start and end ranges, data types and loop conditions:
 * ```js
 * Loop( { start: int( 0 ), end: int( 10 ), type: 'int', condition: '<' }, ( { i } ) => {
 *
 * } );
 *```
 * Nested loops can be defined in a compacted form:
 * ```js
 * Loop( 10, 5, ( { i, j } ) => {
 *
 * } );
 * ```
 * Loops that should run backwards can be defined like so:
 * ```js
 * Loop( { start: 10 }, () => {} );
 * ```
 * It is possible to execute with boolean values, similar to the `while` syntax.
 * ```js
 * const value = float( 0 ).toVar();
 *
 * Loop( value.lessThan( 10 ), () => {
 *
 * 	value.addAssign( 1 );
 *
 * } );
 * ```
 * The module also provides `Break()` and `Continue()` TSL expression for loop control.
 * @augments Node
 */
export class LoopNode extends Node {
    /**
     * Constructs a new loop node.
     *
     * @param {Array<any>} params - Depending on the loop type, array holds different parameterization values for the loop.
     */
    constructor(params?: Array<any>);
    params: any[];
    /**
     * Returns a loop variable name based on an index. The pattern is
     * `0` = `i`, `1`= `j`, `2`= `k` and so on.
     *
     * @param {number} index - The index.
     * @return {string} The loop variable name.
     */
    getVarName(index: number): string;
    /**
     * Returns properties about this node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Object} The node properties.
     */
    getProperties(builder: NodeBuilder): Object;
    setup(builder: any): void;
    generate(builder: any): void;
}
/**
 * This node can be used setup a MRT context for rendering. A typical MRT setup for
 * post-processing is shown below:
 * ```js
 * const mrtNode = mrt( {
 *   output: output,
 *   normal: normalView
 * } ) ;
 * ```
 * The MRT output is defined as a dictionary.
 *
 * @augments OutputStructNode
 */
export class MRTNode extends OutputStructNode {
    /**
     * Constructs a new output struct node.
     *
     * @param {Object<string, Node>} outputNodes - The MRT outputs.
     */
    constructor(outputNodes: {
        [x: string]: Node;
    });
    /**
     * A dictionary representing the MRT outputs. The key
     * is the name of the output, the value the node which produces
     * the output result.
     *
     * @type {Object<string, Node>}
     */
    outputNodes: {
        [x: string]: Node;
    };
    /**
     * A dictionary storing the blend modes for each output.
     *
     * @type {Object<string, BlendMode>}
     */
    blendModes: {
        [x: string]: BlendMode;
    };
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMRTNode: boolean;
    /**
     * Sets the blend mode for the given output name.
     *
     * @param {string} name - The name of the output.
     * @param {BlendMode} blend - The blending mode.
     * @return {MRTNode} The current MRT node.
     */
    setBlendMode(name: string, blend: BlendMode): MRTNode;
    /**
     * Returns the blend mode for the given output name.
     *
     * @param {string} name - The name of the output.
     * @return {BlendMode} The blend mode.
     */
    getBlendMode(name: string): BlendMode;
    /**
     * Returns `true` if the MRT node has an output with the given name.
     *
     * @param {string} name - The name of the output.
     * @return {NodeBuilder} Whether the MRT node has an output for the given name or not.
     */
    has(name: string): NodeBuilder;
    /**
     * Returns the output node for the given name.
     *
     * @param {string} name - The name of the output.
     * @return {Node} The output node.
     */
    get(name: string): Node;
    /**
     * Merges the outputs of the given MRT node with the outputs of this node.
     *
     * @param {MRTNode} mrtNode - The MRT to merge.
     * @return {MRTNode} A new MRT node with merged outputs..
     */
    merge(mrtNode: MRTNode): MRTNode;
    setup(builder: any): Node | null;
}
import { Material } from './three.core.js';
import { MaterialBlending } from './three.core.js';
import { MaterialLoader } from './three.core.js';
/**
 * This class should simplify the node access to material properties.
 * It internal uses reference nodes to make sure  changes to material
 * properties are automatically reflected to predefined TSL objects
 * like e.g. `materialColor`.
 *
 * @augments Node
 */
export class MaterialNode extends Node {
    /**
     * Constructs a new material node.
     *
     * @param {string} scope - The scope defines what kind of material property is referred by the node.
     */
    constructor(scope: string);
    /**
     * The scope defines what material property is referred by the node.
     *
     * @type {string}
     */
    scope: string;
    /**
     * Returns a cached reference node for the given property and type.
     *
     * @param {string} property - The name of the material property.
     * @param {string} type - The uniform type of the property.
     * @return {MaterialReferenceNode} A material reference node representing the property access.
     */
    getCache(property: string, type: string): MaterialReferenceNode;
    /**
     * Returns a float-typed material reference node for the given property name.
     *
     * @param {string} property - The name of the material property.
     * @return {MaterialReferenceNode<float>} A material reference node representing the property access.
     */
    getFloat(property: string): MaterialReferenceNode<any>;
    /**
     * Returns a color-typed material reference node for the given property name.
     *
     * @param {string} property - The name of the material property.
     * @return {MaterialReferenceNode<color>} A material reference node representing the property access.
     */
    getColor(property: string): MaterialReferenceNode<any>;
    /**
     * Returns a texture-typed material reference node for the given property name.
     *
     * @param {string} property - The name of the material property.
     * @return {MaterialReferenceNode} A material reference node representing the property access.
     */
    getTexture(property: string): MaterialReferenceNode;
    /**
     * The node setup is done depending on the selected scope. Multiple material properties
     * might be grouped into a single node composition if they logically belong together.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The node representing the selected scope.
     */
    setup(builder: NodeBuilder): Node;
}
export namespace MaterialNode {
    let ALPHA_TEST: string;
    let COLOR: string;
    let OPACITY: string;
    let SHININESS: string;
    let SPECULAR: string;
    let SPECULAR_STRENGTH: string;
    let SPECULAR_INTENSITY: string;
    let SPECULAR_COLOR: string;
    let REFLECTIVITY: string;
    let ROUGHNESS: string;
    let METALNESS: string;
    let NORMAL: string;
    let CLEARCOAT: string;
    let CLEARCOAT_ROUGHNESS: string;
    let CLEARCOAT_NORMAL: string;
    let EMISSIVE: string;
    let ROTATION: string;
    let SHEEN: string;
    let SHEEN_ROUGHNESS: string;
    let ANISOTROPY: string;
    let IRIDESCENCE: string;
    let IRIDESCENCE_IOR: string;
    let IRIDESCENCE_THICKNESS: string;
    let IOR: string;
    let TRANSMISSION: string;
    let THICKNESS: string;
    let ATTENUATION_DISTANCE: string;
    let ATTENUATION_COLOR: string;
    let LINE_SCALE: string;
    let LINE_DASH_SIZE: string;
    let LINE_GAP_SIZE: string;
    let LINE_WIDTH: string;
    let LINE_DASH_OFFSET: string;
    let POINT_SIZE: string;
    let DISPERSION: string;
    let LIGHT_MAP: string;
    let AO: string;
}
/**
 * This node is a special type of reference node which is intended
 * for linking material properties with node values.
 * ```js
 * const opacityNode = materialReference( 'opacity', 'float', material );
 * ```
 * When changing `material.opacity`, the node value of `opacityNode` will
 * automatically be updated.
 *
 * @augments ReferenceNode
 */
export class MaterialReferenceNode extends ReferenceNode {
    /**
     * Constructs a new material reference node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} inputType - The uniform type that should be used to represent the property value.
     * @param {?Material} [material=null] - The material the property belongs to. When no material is set,
     * the node refers to the material of the current rendered object.
     */
    constructor(property: string, inputType: string, material?: Material | null);
    /**
     * The material the property belongs to. When no material is set,
     * the node refers to the material of the current rendered object.
     *
     * @type {?Material}
     * @default null
     */
    material: Material | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMaterialReferenceNode: boolean;
}
/**
 * This node represents a variety of mathematical methods available in shaders.
 * They are divided into three categories:
 *
 * - Methods with one input like `sin`, `cos` or `normalize`.
 * - Methods with two inputs like `dot`, `cross` or `pow`.
 * - Methods with three inputs like `mix`, `clamp` or `smoothstep`.
 *
 * @augments TempNode
 */
export class MathNode extends TempNode {
    /**
     * Constructs a new math node.
     *
     * @param {string} method - The method name.
     * @param {Node} aNode - The first input.
     * @param {?Node} [bNode=null] - The second input.
     * @param {?Node} [cNode=null] - The third input.
     */
    constructor(method: string, aNode: Node, bNode?: Node | null, cNode?: Node | null, ...args: any[]);
    /**
     * The method name.
     *
     * @type {string}
     */
    method: string;
    /**
     * The first input.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The second input.
     *
     * @type {?Node}
     * @default null
     */
    bNode: Node | null;
    /**
     * The third input.
     *
     * @type {?Node}
     * @default null
     */
    cNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMathNode: boolean;
    /**
     * The input type is inferred from the node types of the input nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(builder: NodeBuilder): string;
    /**
     * The selected method as well as the input type determine the node type of this node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    setup(builder: any): any;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
export namespace MathNode {
    let ALL: string;
    let ANY: string;
    let RADIANS: string;
    let DEGREES: string;
    let EXP: string;
    let EXP2: string;
    let LOG: string;
    let LOG2: string;
    let SQRT: string;
    let INVERSE_SQRT: string;
    let FLOOR: string;
    let CEIL: string;
    let NORMALIZE: string;
    let FRACT: string;
    let SIN: string;
    let SINH: string;
    let COS: string;
    let COSH: string;
    let TAN: string;
    let TANH: string;
    let ASIN: string;
    let ASINH: string;
    let ACOS: string;
    let ACOSH: string;
    let ATAN: string;
    let ATANH: string;
    let ABS: string;
    let SIGN: string;
    let LENGTH: string;
    let NEGATE: string;
    let ONE_MINUS: string;
    let DFDX: string;
    let DFDY: string;
    let ROUND: string;
    let RECIPROCAL: string;
    let TRUNC: string;
    let FWIDTH: string;
    let TRANSPOSE: string;
    let DETERMINANT: string;
    let INVERSE: string;
    let EQUALS: string;
    let MIN: string;
    let MAX: string;
    let STEP: string;
    let REFLECT: string;
    let DISTANCE: string;
    let DIFFERENCE: string;
    let DOT: string;
    let CROSS: string;
    let POW: string;
    let TRANSFORM_DIRECTION: string;
    let MIX: string;
    let CLAMP: string;
    let REFRACT: string;
    let SMOOTHSTEP: string;
    let FACEFORWARD: string;
}
import { MathUtils } from './three.core.js';
import { Matrix2 } from './three.core.js';
import { Matrix3 } from './three.core.js';
import { Matrix4 } from './three.core.js';
import { MaxEquation } from './three.core.js';
/**
 * A special type of uniform node that computes the
 * maximum mipmap level for a given texture node.
 *
 * ```js
 * const level = maxMipLevel( textureNode );
 * ```
 *
 * @augments UniformNode
 */
export class MaxMipLevelNode extends UniformNode {
    /**
     * Constructs a new max mip level node.
     *
     * @param {TextureNode} textureNode - The texture node to compute the max mip level for.
     */
    constructor(textureNode: TextureNode);
    /**
     * The texture node to compute the max mip level for.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNode;
    /**
     * The texture node to compute the max mip level for.
     *
     * @readonly
     * @type {TextureNode}
     */
    readonly get textureNode(): TextureNode;
    /**
     * The texture.
     *
     * @readonly
     * @type {Texture}
     */
    readonly get texture(): Texture;
    update(): void;
}
/**
 * Base class for representing member access on an object-like
 * node data structures.
 *
 * @augments Node
 */
export class MemberNode extends Node {
    /**
     * Constructs a member node.
     *
     * @param {Node} structNode - The struct node.
     * @param {string} property - The property name.
     */
    constructor(structNode: Node, property: string);
    /**
     * The struct node.
     *
     * @type {Node}
     */
    structNode: Node;
    /**
     * The property name.
     *
     * @type {Node}
     */
    property: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMemberNode: boolean;
    hasMember(builder: any): boolean;
    generateNodeType(builder: any): string;
    getMemberType(builder: any, name: any): any;
    generate(builder: any): any;
}
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
/**
 * This type of node is a specialized version of `Object3DNode`
 * with larger set of model related metrics. Unlike `Object3DNode`,
 * `ModelNode` extracts the reference to the 3D object from the
 * current node frame state.
 *
 * @augments Object3DNode
 */
export class ModelNode extends Object3DNode {
    /**
     * Constructs a new object model node.
     *
     * @param {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')} scope - The node represents a different type of transformation depending on the scope.
     */
    constructor(scope: ("position" | "viewPosition" | "direction" | "scale" | "worldMatrix"));
}
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
import { NoNormalPacking } from './three.core.js';
import { NoToneMapping } from './three.core.js';
/**
 * Base class for all nodes.
 *
 * @augments EventDispatcher
 */
export class Node extends EventDispatcher {
    static get type(): string;
    /**
     * Constructs a new node.
     *
     * @param {?string} nodeType - The node type.
     */
    constructor(nodeType?: string | null);
    /**
     * The node type. This represents the result type of the node (e.g. `float` or `vec3`).
     *
     * @type {?string}
     * @default null
     */
    nodeType: string | null;
    /**
     * The update type of the node's {@link Node#update} method. Possible values are listed in {@link NodeUpdateType}.
     *
     * @type {string}
     * @default 'none'
     */
    updateType: string;
    /**
     * The update type of the node's {@link Node#updateBefore} method. Possible values are listed in {@link NodeUpdateType}.
     *
     * @type {string}
     * @default 'none'
     */
    updateBeforeType: string;
    /**
     * The update type of the node's {@link Node#updateAfter} method. Possible values are listed in {@link NodeUpdateType}.
     *
     * @type {string}
     * @default 'none'
     */
    updateAfterType: string;
    /**
     * The version of the node. The version automatically is increased when {@link Node#needsUpdate} is set to `true`.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly version: number;
    /**
     * The name of the node.
     *
     * @type {string}
     * @default ''
     */
    name: string;
    /**
     * Whether this node is global or not. This property is relevant for the internal
     * node caching system. All nodes which should be declared just once should
     * set this flag to `true` (a typical example is {@link AttributeNode}).
     *
     * @type {boolean}
     * @default false
     */
    global: boolean;
    /**
     * Create a list of parents for this node during the build process.
     *
     * @type {boolean}
     * @default false
     */
    parents: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNode: boolean;
    _beforeNodes: any;
    /**
     * The cache key of this node.
     *
     * @private
     * @type {?number}
     * @default null
     */
    private _cacheKey;
    /**
     * The UUID of the node.
     *
     * @type {string}
     * @default null
     * @private
     */
    private _uuid;
    /**
     * The cache key's version.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _cacheKeyVersion;
    /**
     * The unique ID of the node.
     *
     * @type {number}
     * @readonly
     */
    readonly id: number;
    /**
     * The stack trace of the node for debugging purposes.
     *
     * @type {?string}
     * @default null
     */
    stackTrace: string | null;
    /**
     * Set this property to `true` when the node should be regenerated.
     *
     * @type {boolean}
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
    /**
     * The UUID of the node.
     *
     * @type {string}
     * @readonly
     */
    readonly get uuid(): string;
    /**
     * The type of the class. The value is usually the constructor name.
     *
     * @type {string}
     * @readonly
     */
    readonly get type(): string;
    /**
     * Convenient method for defining {@link Node#update}.
     *
     * @param {Function} callback - The update method.
     * @param {string} updateType - The update type.
     * @return {Node} A reference to this node.
     */
    onUpdate(callback: Function, updateType: string): Node;
    /**
     * The method can be implemented to update the node's internal state when it is used to render an object.
     * The {@link Node#updateType} property defines how often the update is executed.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
     */
    update(): boolean | null;
    /**
     * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
     * this method automatically sets the update type to `FRAME`.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onFrameUpdate(callback: Function): Node;
    /**
     * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
     * this method automatically sets the update type to `RENDER`.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onRenderUpdate(callback: Function): Node;
    /**
     * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
     * this method automatically sets the update type to `OBJECT`.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onObjectUpdate(callback: Function): Node;
    /**
     * Convenient method for defining {@link Node#updateReference}.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onReference(callback: Function): Node;
    /**
     * Nodes might refer to other objects like materials. This method allows to dynamically update the reference
     * to such objects based on a given state (e.g. the current node frame or builder).
     *
     * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
     * @return {any} The updated reference.
     */
    updateReference(): any;
    /**
     * By default this method returns the value of the {@link Node#global} flag. This method
     * can be overwritten in derived classes if an analytical way is required to determine the
     * global cache referring to the current shader-stage.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether this node is global or not.
     */
    isGlobal(): boolean;
    /**
     * Generator function that can be used to iterate over the child nodes.
     *
     * @generator
     * @yields {Node} A child node.
     */
    getChildren(): Generator<any, void, unknown>;
    /**
     * Calling this method dispatches the `dispose` event. This event can be used
     * to register event listeners for clean up tasks.
     */
    dispose(): void;
    /**
     * Callback for {@link Node#traverse}.
     *
     * @callback traverseCallback
     * @param {Node} node - The current node.
     */
    /**
     * Can be used to traverse through the node's hierarchy.
     *
     * @param {traverseCallback} callback - A callback that is executed per node.
     */
    traverse(callback: (node: Node) => any): void;
    /**
     * Returns the child nodes of this node.
     *
     * @private
     * @param {Set<Node>} [ignores=new Set()] - A set of nodes to ignore during the search to avoid circular references.
     * @returns {Array<Object>} An array of objects describing the child nodes.
     */
    private _getChildren;
    /**
     * Returns the cache key for this node.
     *
     * @param {boolean} [force=false] - When set to `true`, a recomputation of the cache key is forced.
     * @param {Set<Node>} [ignores=null] - A set of nodes to ignore during the computation of the cache key.
     * @return {number} The cache key of the node.
     */
    getCacheKey(force?: boolean, ignores?: Set<Node>): number;
    /**
     * Generate a custom cache key for this node.
     *
     * @return {number} The cache key of the node.
     */
    customCacheKey(): number;
    /**
     * Returns the references to this node which is by default `this`.
     *
     * @return {Node} A reference to this node.
     */
    getScope(): Node;
    /**
     * Returns the hash of the node which is used to identify the node. By default it's
     * the {@link Node#uuid} however derived node classes might have to overwrite this method
     * depending on their implementation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(): string;
    /**
     * Returns the update type of {@link Node#update}.
     *
     * @return {NodeUpdateType} The update type.
     */
    getUpdateType(): {
        NONE: string;
        FRAME: string;
        RENDER: string;
        OBJECT: string;
    };
    /**
     * Returns the update type of {@link Node#updateBefore}.
     *
     * @return {NodeUpdateType} The update type.
     */
    getUpdateBeforeType(): {
        NONE: string;
        FRAME: string;
        RENDER: string;
        OBJECT: string;
    };
    /**
     * Returns the update type of {@link Node#updateAfter}.
     *
     * @return {NodeUpdateType} The update type.
     */
    getUpdateAfterType(): {
        NONE: string;
        FRAME: string;
        RENDER: string;
        OBJECT: string;
    };
    /**
     * Certain types are composed of multiple elements. For example a `vec3`
     * is composed of three `float` values. This method returns the type of
     * these elements.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The type of the node.
     */
    getElementType(builder: NodeBuilder): string;
    /**
     * Returns the node member type for the given name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member.
     * @return {string} The type of the node.
     */
    getMemberType(): string;
    /**
     * Returns the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} [output=null] - The output of the node.
     * @return {string} The type of the node.
     */
    getNodeType(builder: NodeBuilder, output?: string): string;
    /**
     * Returns the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} [output=null] - The output of the node.
     * @return {string} The type of the node.
     */
    generateNodeType(builder: NodeBuilder, output?: string): string;
    /**
     * This method is used during the build process of a node and ensures
     * equal nodes are not built multiple times but just once. For example if
     * `attribute( 'uv' )` is used multiple times by the user, the build
     * process makes sure to process just the first node. It also handles
     * node overrides if an override context is set.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The shared node if possible. Otherwise `this` is returned.
     */
    getShared(builder: NodeBuilder): Node;
    /**
     * Returns the number of elements in the node array.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?number} The number of elements in the node array.
     */
    getArrayCount(): number | null;
    /**
     * Represents the setup stage which is the first step of the build process, see {@link Node#build} method.
     * This method is often overwritten in derived modules to prepare the node which is used as a node's output/result.
     * If an output node is prepared, then it must be returned in the `return` statement of the derived module's setup function.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?Node} The output node.
     */
    setup(builder: NodeBuilder): Node | null;
    /**
     * Represents the analyze stage which is the second step of the build process, see {@link Node#build} method.
     * This stage analyzes the node hierarchy and ensures descendent nodes are built.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {?Node} output - The target output node.
     */
    analyze(builder: NodeBuilder, output?: Node | null): void;
    /**
     * Represents the generate stage which is the third step of the build process, see {@link Node#build} method.
     * This state builds the output node and returns the resulting shader string.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {?string} [output] - Can be used to define the output type.
     * @return {?string} The generated shader string.
     */
    generate(builder: NodeBuilder, output?: string | null): string | null;
    /**
     * The method can be implemented to update the node's internal state before it is used to render an object.
     * The {@link Node#updateBeforeType} property defines how often the update is executed.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
     */
    updateBefore(): boolean | null;
    /**
     * The method can be implemented to update the node's internal state after it was used to render an object.
     * The {@link Node#updateAfterType} property defines how often the update is executed.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
     */
    updateAfter(): boolean | null;
    before(node: any): this;
    /**
     * This method performs the build of a node. The behavior and return value depend on the current build stage:
     * - **setup**: Prepares the node and its children for the build process. This process can also create new nodes. Returns the node itself or a variant.
     * - **analyze**: Analyzes the node hierarchy for optimizations in the code generation stage. Returns `null`.
     * - **generate**: Generates the shader code for the node. Returns the generated shader string.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {?(string|Node)} [output=null] - Can be used to define the output type.
     * @return {?(Node|string)} The result of the build process, depending on the build stage.
     */
    build(builder: NodeBuilder, output?: (string | Node) | null): (Node | string) | null;
    /**
     * Returns the child nodes as a JSON object.
     *
     * @return {Generator<Object>} An iterable list of serialized child objects as JSON.
     */
    getSerializeChildren(): Generator<Object>;
    /**
     * Serializes the node to JSON.
     *
     * @param {Object} json - The output JSON object.
     */
    serialize(json: Object): void;
    /**
     * Deserializes the node from the given JSON.
     *
     * @param {Object} json - The JSON object.
     */
    deserialize(json: Object): void;
    /**
     * Serializes the node into the three.js JSON Object/Scene format.
     *
     * @param {?Object} meta - An optional JSON object that already holds serialized data from other scene objects.
     * @return {Object} The serialized node.
     */
    toJSON(meta: Object | null): Object;
    assign(...params: any[]): any;
    toVarIntent(): Node;
    get(value: any): MemberNode;
}
export namespace Node {
    let captureStackTrace: boolean;
}
export namespace NodeAccess {
    let READ_ONLY: string;
    let WRITE_ONLY: string;
    let READ_WRITE: string;
}
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
     *
     * @return {NodeVar} The node variable.
     */
    getVarFromNode(node: VarNode, name?: string | null, type?: string, shaderStage?: ("vertex" | "fragment" | "compute" | "any"), readOnly?: boolean): NodeVar;
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
     * Returns an instance of {@link NodeCode} for the given code node.
     *
     * @param {CodeNode} node - The code node.
     * @param {string} type - The node type.
     * @param {('vertex'|'fragment'|'compute'|'any')} [shaderStage=this.shaderStage] - The shader stage.
     * @return {NodeCode} The node code.
     */
    getCodeFromNode(node: CodeNode, type: string, shaderStage?: ("vertex" | "fragment" | "compute" | "any")): NodeCode;
    /**
     * Adds a code flow based on the code-block hierarchy.

     * This is used so that code-blocks like If,Else create their variables locally if the Node
     * is only used inside one of these conditionals in the current shader stage.
     *
     * @param {Node} node - The node to add.
     * @param {Node} nodeBlock - Node-based code-block. Usually 'ConditionalNode'.
     */
    addFlowCodeHierarchy(node: Node, nodeBlock: Node): void;
    /**
     * Add a inline-code to the current flow code-block.
     *
     * @param {Node} node - The node to add.
     * @param {string} code - The code to add.
     * @param {Node} nodeBlock - Current ConditionalNode
     */
    addLineFlowCodeBlock(node: Node, code: string, nodeBlock: Node): void;
    /**
     * Add a inline-code to the current flow.
     *
     * @param {string} code - The code to add.
     * @param {?Node} [node= null] - Optional Node, can help the system understand if the Node is part of a code-block.
     * @return {NodeBuilder} A reference to this node builder.
     */
    addLineFlowCode(code: string, node?: Node | null): NodeBuilder;
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
     * @return {Promise<NodeBuilder>} A promise that resolves to this node builder.
     */
    buildAsync(): Promise<NodeBuilder>;
    /**
     * Returns shared data object for the given node.
     *
     * @param {Node} node - The node to get shared data from.
     * @return {Object} The shared data.
     */
    getSharedDataFromNode(node: Node): Object;
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
 * Custom error class for node-related errors, including stack trace information.
 */
export class NodeError extends Error {
    constructor(message: any, stackTrace?: null);
    /**
     * The stack trace associated with the error.
     *
     * @type {?StackTrace}
     */
    stackTrace: StackTrace | null;
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
/**
 * Base class for all node materials.
 *
 * @augments Material
 */
export class NodeMaterial extends Material {
    static get type(): string;
    set type(_value: string);
    /**
     * Represents the type of the node material.
     *
     * @type {string}
     */
    get type(): string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeMaterial: boolean;
    /**
     * Whether this material is affected by lights or not.
     *
     * @type {boolean}
     * @default false
     */
    lights: boolean;
    /**
     * Node materials which set their `lights` property to `true`
     * are affected by all lights of the scene. Sometimes selective
     * lighting is wanted which means only _some_ lights in the scene
     * affect a material. This can be achieved by creating an instance
     * of {@link LightsNode} with a list of selective
     * lights and assign the node to this property.
     *
     * ```js
     * const customLightsNode = lights( [ light1, light2 ] );
     * material.lightsNode = customLightsNode;
     * ```
     *
     * @type {?LightsNode}
     * @default null
     */
    lightsNode: LightsNode | null;
    /**
     * The environment of node materials can be defined by an environment
     * map assigned to the `envMap` property or by `Scene.environment`
     * if the node material is a PBR material. This node property allows to overwrite
     * the default behavior and define the environment with a custom node.
     *
     * ```js
     * material.envNode = pmremTexture( renderTarget.texture );
     * ```
     *
     * @type {?Node<vec3>}
     * @default null
     */
    envNode: Node<any> | null;
    /**
     * The lighting of node materials might be influenced by ambient occlusion.
     * The default AO is inferred from an ambient occlusion map assigned to `aoMap`
     * and the respective `aoMapIntensity`. This node property allows to overwrite
     * the default and define the ambient occlusion with a custom node instead.
     *
     * If you don't want to overwrite the diffuse color but modify the existing
     * values instead, use {@link materialAO}.
     *
     * @type {?Node<float>}
     * @default null
     */
    aoNode: Node<any> | null;
    /**
     * The diffuse color of node materials is by default inferred from the
     * `color` and `map` properties. This node property allows to overwrite the default
     * and define the diffuse color with a node instead.
     *
     * ```js
     * material.colorNode = color( 0xff0000 ); // define red color
     * ```
     *
     * If you don't want to overwrite the diffuse color but modify the existing
     * values instead, use {@link materialColor}.
     *
     * ```js
     * material.colorNode = materialColor.mul( color( 0xff0000 ) ); // give diffuse colors a red tint
     * ```
     *
     * @type {?Node<vec3>}
     * @default null
     */
    colorNode: Node<any> | null;
    /**
     * The normals of node materials are by default inferred from the `normalMap`/`normalScale`
     * or `bumpMap`/`bumpScale` properties. This node property allows to overwrite the default
     * and define the normals with a node instead.
     *
     * If you don't want to overwrite the normals but modify the existing values instead,
     * use {@link materialNormal}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    normalNode: Node<any> | null;
    /**
     * The opacity of node materials is by default inferred from the `opacity`
     * and `alphaMap` properties. This node property allows to overwrite the default
     * and define the opacity with a node instead.
     *
     * If you don't want to overwrite the opacity but modify the existing
     * value instead, use {@link materialOpacity}.
     *
     * @type {?Node<float>}
     * @default null
     */
    opacityNode: Node<any> | null;
    /**
     * This node can be used to implement a variety of filter-like effects. The idea is
     * to store the current rendering into a texture e.g. via `viewportSharedTexture()`, use it
     * to create an arbitrary effect and then assign the node composition to this property.
     * Everything behind the object using this material will now be affected by a filter.
     *
     * ```js
     * const material = new NodeMaterial()
     * material.transparent = true;
     *
     * // everything behind the object will be monochromatic
     * material.backdropNode = saturation( viewportSharedTexture().rgb, 0 );
     * ```
     *
     * Backdrop computations are part of the lighting so only lit materials can use this property.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    backdropNode: Node<any> | null;
    /**
     * This node allows to modulate the influence of `backdropNode` to the outgoing light.
     *
     * @type {?Node<float>}
     * @default null
     */
    backdropAlphaNode: Node<any> | null;
    /**
     * The alpha test of node materials is by default inferred from the `alphaTest`
     * property. This node property allows to overwrite the default and define the
     * alpha test with a node instead.
     *
     * If you don't want to overwrite the alpha test but modify the existing
     * value instead, use {@link materialAlphaTest}.
     *
     * @type {?Node<float>}
     * @default null
     */
    alphaTestNode: Node<any> | null;
    /**
     * Discards the fragment if the mask value is `false`.
     *
     * @type {?Node<bool>}
     * @default null
     */
    maskNode: Node<any> | null;
    /**
     * This node can be used to implement a shadow mask for the material.
     *
     * @type {?Node<bool>}
     * @default null
     */
    maskShadowNode: Node<any> | null;
    /**
     * The local vertex positions are computed based on multiple factors like the
     * attribute data, morphing or skinning. This node property allows to overwrite
     * the default and define local vertex positions with nodes instead.
     *
     * If you don't want to overwrite the vertex positions but modify the existing
     * values instead, use {@link positionLocal}.
     *
     *```js
     * material.positionNode = positionLocal.add( displace );
     * ```
     *
     * @type {?Node<vec3>}
     * @default null
     */
    positionNode: Node<any> | null;
    /**
     * This node property is intended for logic which modifies geometry data once or per animation step.
     * Apps usually place such logic randomly in initialization routines or in the animation loop.
     * `geometryNode` is intended as a dedicated API so there is an intended spot where geometry modifications
     * can be implemented.
     *
     * The idea is to assign a `Fn` definition that holds the geometry modification logic. A typical example
     * would be a GPU based particle system that provides a node material for usage on app level. The particle
     * simulation would be implemented as compute shaders and managed inside a `Fn` function. This function is
     * eventually assigned to `geometryNode`.
     *
     * @type {?Function}
     * @default null
     */
    geometryNode: Function | null;
    /**
     * Allows to overwrite depth values in the fragment shader.
     *
     * @type {?Node<float>}
     * @default null
     */
    depthNode: Node<any> | null;
    /**
     * Allows to overwrite the position used for shadow map rendering which
     * is by default {@link positionWorld}, the vertex position
     * in world space.
     *
     * @type {?Node<float>}
     * @default null
     */
    receivedShadowPositionNode: Node<any> | null;
    /**
     * Allows to overwrite the geometry position used for shadow map projection which
     * is by default {@link positionLocal}, the vertex position in local space.
     *
     * @type {?Node<float>}
     * @default null
     */
    castShadowPositionNode: Node<any> | null;
    /**
     * This node can be used to influence how an object using this node material
     * receive shadows.
     *
     * ```js
     * const totalShadows = float( 1 ).toVar();
     * material.receivedShadowNode = Fn( ( [ shadow ] ) => {
     * 	totalShadows.mulAssign( shadow );
     * 	//return float( 1 ); // bypass received shadows
     * 	return shadow.mix( color( 0xff0000 ), 1 ); // modify shadow color
     * } );
     *
     * @type {?(Function|FunctionNode<vec4>)}
     * @default null
     */
    receivedShadowNode: (Function | FunctionNode<any>) | null;
    /**
     * This node can be used to influence how an object using this node material
     * casts shadows. To apply a color to shadows, you can simply do:
     *
     * ```js
     * material.castShadowNode = vec4( 1, 0, 0, 1 );
     * ```
     *
     * Which can be nice to fake colored shadows of semi-transparent objects. It
     * is also common to use the property with `Fn` function so checks are performed
     * per fragment.
     *
     * ```js
     * materialCustomShadow.castShadowNode = Fn( () => {
     * 	hash( vertexIndex ).greaterThan( 0.5 ).discard();
     * 	return materialColor;
     * } )();
     *  ```
     *
     * @type {?Node<vec4>}
     * @default null
     */
    castShadowNode: Node<any> | null;
    /**
     * This node can be used to define the final output of the material.
     *
     * TODO: Explain the differences to `fragmentNode`.
     *
     * @type {?Node<vec4>}
     * @default null
     */
    outputNode: Node<any> | null;
    /**
     * MRT configuration is done on renderer or pass level. This node allows to
     * overwrite what values are written into MRT targets on material level. This
     * can be useful for implementing selective FX features that should only affect
     * specific objects.
     *
     * @type {?MRTNode}
     * @default null
     */
    mrtNode: MRTNode | null;
    /**
     * This node property can be used if you need complete freedom in implementing
     * the fragment shader. Assigning a node will replace the built-in material
     * logic used in the fragment stage.
     *
     * @type {?Node<vec4>}
     * @default null
     */
    fragmentNode: Node<any> | null;
    /**
     * This node property can be used if you need complete freedom in implementing
     * the vertex shader. Assigning a node will replace the built-in material logic
     * used in the vertex stage.
     *
     * @type {?Node<vec4>}
     * @default null
     */
    vertexNode: Node<any> | null;
    /**
     * This node can be used as a global context management component for this material.
     *
     * @type {?ContextNode}
     * @default null
     */
    contextNode: ContextNode | null;
    /**
     * Returns an array of child nodes for this material.
     *
     * @private
     * @returns {Array<{property: string, childNode: Node}>}
     */
    private _getNodeChildren;
    /**
     * Builds this material with the given node builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    build(builder: NodeBuilder): void;
    /**
     * Setups a node material observer with the given builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeMaterialObserver} The node material observer.
     */
    setupObserver(builder: NodeBuilder): NodeMaterialObserver;
    /**
     * Setups the vertex and fragment stage of this node material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Setups the clipping node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ClippingNode} The clipping node.
     */
    setupClipping(builder: NodeBuilder): ClippingNode;
    /**
     * Setups the hardware clipping if available on the current device.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupHardwareClipping(builder: NodeBuilder): void;
    /**
     * Setups the depth of this material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupDepth(builder: NodeBuilder): void;
    /**
     * Setups the position node in view space. This method exists
     * so derived node materials can modify the implementation e.g. sprite materials.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The position in view space.
     */
    setupPositionView(): Node<any>;
    /**
     * Setups the position in clip space.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec4>} The position in view space.
     */
    setupModelViewProjection(): Node<any>;
    /**
     * Setups the logic for the vertex stage.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec4>} The position in clip space.
     */
    setupVertex(builder: NodeBuilder): Node<any>;
    /**
     * Setups the computation of the position in local space.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The position in local space.
     */
    setupPosition(builder: NodeBuilder): Node<any>;
    /**
     * Setups the computation of the material's diffuse color.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {BufferGeometry} geometry - The geometry.
     */
    setupDiffuseColor(builder: NodeBuilder): void;
    /**
     * Abstract interface method that can be implemented by derived materials
     * to setup material-specific node variables.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupVariants(): void;
    /**
     * Setups the outgoing light node variable
     *
     * @return {Node<vec3>} The outgoing light node.
     */
    setupOutgoingLight(): Node<any>;
    /**
     * Setups the normal node from the material.
     *
     * @return {Node<vec3>} The normal node.
     */
    setupNormal(): Node<any>;
    /**
     * Setups the environment node from the material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec4>} The environment node.
     */
    setupEnvironment(): Node<any>;
    /**
     * Setups the light map node from the material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The light map node.
     */
    setupLightMap(builder: NodeBuilder): Node<any>;
    /**
     * Setups the lights node based on the scene, environment and material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {LightingNode<Array>} The lights node.
     */
    setupMaterialLightings(builder: NodeBuilder): LightingNode<any[]>;
    /**
     * Setups the ambient occlusion node from the material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node} The ambient occlusion node.
     */
    setupAmbientOcclusion(builder: NodeBuilder): Node;
    /**
     * This method should be implemented by most derived materials
     * since it defines the material's lighting model.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     * @return {LightingModel} The lighting model.
     */
    setupLightingModel(): LightingModel;
    /**
     * Setups the outgoing light node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The outgoing light node.
     */
    setupLighting(builder: NodeBuilder): Node<any>;
    /**
     * Setup the fog.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node<vec4>} outputNode - The existing output node.
     * @return {Node<vec4>} The output node.
     */
    setupFog(builder: NodeBuilder, outputNode: Node<any>): Node<any>;
    /**
     * Setups premultiplied alpha.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node<vec4>} outputNode - The existing output node.
     * @return {Node<vec4>} The output node.
     */
    setupPremultipliedAlpha(builder: NodeBuilder, outputNode: Node<any>): Node<any>;
    /**
     * Setups the output node.
     *
     * This method can be implemented by derived materials to extend the functionality
     * of the material's output or replace it altogether.
     *
     * ```js
     * class ColoredShadowMaterial extends MeshPhongNodeMaterial {
     *   constructor( parameters ) {
     *     super( parameters );
     *     this._shadeColor = uniform( new Color( parameters.shadeColor ?? 0xff0000 ) );
     *   }
     *
     *   setupOutput( builder, outputNode ) {
     *	   // Modify the native output of the MeshPhongNodeMaterial fragment shader
     *     const brightness = min( outputNode.r, 1.0 );
     *     const mixedColor = mix( this._shadeColor, diffuseColor.rgb, brightness );
     *	   // Return new output back into NodeMaterial flow
     *     return super.setupOutput( builder, vec4( mixedColor, outputNode.a ) );
     *   }
     * }
     * ```
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node<vec4>} outputNode - The existing output node.
     * @return {Node<vec4>} The output node.
     */
    setupOutput(builder: NodeBuilder, outputNode: Node<any>): Node<any>;
    /**
     * Most classic material types have a node pendant e.g. for `MeshBasicMaterial`
     * there is `MeshBasicNodeMaterial`. This utility method is intended for
     * defining all material properties of the classic type in the node type.
     *
     * @param {Material} material - The material to copy properties with their values to this node material.
     */
    setDefaultValues(material: Material): void;
    /**
     * Copies the common properties of the given material to this instance.
     *
     * @param {Material} source - The material to copy.
     * @return {NodeMaterial} A reference to this node material.
     */
    copy(source: Material): NodeMaterial;
}
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
 * This class is used by {@link WebGPURenderer} as management component.
 * It's primary purpose is to determine whether render objects require a
 * refresh right before they are going to be rendered or not.
 */
export class NodeMaterialObserver {
    /**
     * Constructs a new node material observer.
     *
     * @param {NodeBuilder} builder - The node builder.
     */
    constructor(builder: NodeBuilder);
    /**
     * A node material can be used by more than one render object so the
     * monitor must maintain a list of render objects.
     *
     * @type {WeakMap<RenderObject,Object>}
     */
    renderObjects: WeakMap<RenderObject, Object>;
    /**
     * Whether the material uses node objects or not.
     *
     * @type {boolean}
     */
    hasNode: boolean;
    /**
     * Whether the node builder's 3D object is animated or not.
     *
     * @type {boolean}
     */
    hasAnimation: boolean;
    /**
     * A list of all possible material uniforms
     *
     * @type {Array<string>}
     */
    refreshUniforms: Array<string>;
    /**
     * Holds the current render ID from the node frame.
     *
     * @type {number}
     * @default 0
     */
    renderId: number;
    /**
     * Returns `true` if the given render object is verified for the first time of this observer.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {boolean} Whether the given render object is verified for the first time of this observer.
     */
    firstInitialization(renderObject: RenderObject): boolean;
    /**
     * Returns `true` if the current rendering produces motion vectors.
     *
     * @param {Renderer} renderer - The renderer.
     * @return {boolean} Whether the current rendering produces motion vectors or not.
     */
    needsVelocity(renderer: Renderer): boolean;
    /**
     * Returns monitoring data for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {Object} The monitoring data.
     */
    getRenderObjectData(renderObject: RenderObject): Object;
    /**
     * Returns an attribute data structure holding the attributes versions for
     * monitoring.
     *
     * @param {Object} attributes - The geometry attributes.
     * @return {Object} An object for monitoring the versions of attributes.
     */
    getAttributesData(attributes: Object): Object;
    /**
     * Returns `true` if the node builder's material uses
     * node properties.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether the node builder's material uses node properties or not.
     */
    containsNode(builder: NodeBuilder): boolean;
    /**
     * Returns a geometry data structure holding the geometry property values for
     * monitoring.
     *
     * @param {BufferGeometry} geometry - The geometry.
     * @return {Object} An object for monitoring geometry properties.
     */
    getGeometryData(geometry: BufferGeometry): Object;
    /**
     * Returns a material data structure holding the material property values for
     * monitoring.
     *
     * @param {Material} material - The material.
     * @return {Object} An object for monitoring material properties.
     */
    getMaterialData(material: Material): Object;
    /**
     * Returns `true` if the given render object has not changed its state.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {Array<Light>} lightsData - The current material lights.
     * @param {number} renderId - The current render ID.
     * @return {boolean} Whether the given render object is equal to its cached state or not.
     */
    equals(renderObject: RenderObject, lightsData: Array<Light>, renderId: number): boolean;
    /**
     * Returns the lights data for the given material lights.
     *
     * @param {Array<Light>} materialLights - The material lights.
     * @return {Array<Object>} The lights data for the given material lights.
     */
    getLightsData(materialLights: Array<Light>, lights: any): Array<Object>;
    /**
     * Returns the lights for the given lights node and render ID.
     *
     * @param {LightsNode} lightsNode - The lights node.
     * @param {number} renderId - The render ID.
     * @return {Array<Object>} The lights for the given lights node and render ID.
     */
    getLights(lightsNode: LightsNode, renderId: number): Array<Object>;
    /**
     * Checks if the given render object requires a refresh.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {NodeFrame} nodeFrame - The current node frame.
     * @return {boolean} Whether the given render object requires a refresh or not.
     */
    needsRefresh(renderObject: RenderObject, nodeFrame: NodeFrame): boolean;
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
export namespace NodeShaderStage {
    let VERTEX_1: string;
    export { VERTEX_1 as VERTEX };
    export let FRAGMENT: string;
}
export namespace NodeType {
    let BOOLEAN: string;
    let INTEGER: string;
    let FLOAT: string;
    let VECTOR2: string;
    let VECTOR3: string;
    let VECTOR4: string;
    let MATRIX2: string;
    let MATRIX3: string;
    let MATRIX4: string;
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
export namespace NodeUpdateType {
    export let NONE: string;
    let FRAME_1: string;
    export { FRAME_1 as FRAME };
    export let RENDER: string;
    let OBJECT_1: string;
    export { OBJECT_1 as OBJECT };
}
export var NodeUtils: Readonly<{
    __proto__: null;
    arrayBufferToBase64: typeof arrayBufferToBase64;
    base64ToArrayBuffer: typeof base64ToArrayBuffer;
    getAlignmentFromType: typeof getAlignmentFromType;
    getDataFromObject: typeof getDataFromObject;
    getLengthFromType: typeof getLengthFromType;
    getMemoryLengthFromType: typeof getMemoryLengthFromType;
    getTypeFromLength: typeof getTypeFromLength;
    getTypedArrayFromType: typeof getTypedArrayFromType;
    getValueFromType: typeof getValueFromType;
    getValueType: typeof getValueType;
    hash: (...params: number[]) => number;
    hashArray: (array: Array<number>) => number;
    hashString: (str: string) => number;
}>;
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
     */
    constructor(name: string, type: string, readOnly?: boolean, count?: number | null);
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
import { NormalGAPacking } from './three.core.js';
/**
 * This class can be used for applying normals maps to materials.
 *
 * ```js
 * material.normalNode = normalMap( texture( normalTex ) );
 * ```
 *
 * @augments TempNode
 */
export class NormalMapNode extends TempNode {
    /**
     * Constructs a new normal map node.
     *
     * @param {Node<vec3>} node - Represents the normal map data.
     * @param {?Node<vec2>} [scaleNode=null] - Controls the intensity of the effect.
     */
    constructor(node: Node<any>, scaleNode?: Node<any> | null);
    /**
     * Represents the normal map data.
     *
     * @type {Node<vec3>}
     */
    node: Node<any>;
    /**
     * Controls the intensity of the effect.
     *
     * @type {?Node<vec2>}
     * @default null
     */
    scaleNode: Node<any> | null;
    /**
     * The normal map type.
     *
     * @type {(TangentSpaceNormalMap|ObjectSpaceNormalMap)}
     * @default TangentSpaceNormalMap
     */
    normalMapType: (number | number);
    /**
     * Controls how to unpack the sampled normal map values.
     *
     * @type {string}
     * @default NoNormalPacking
     */
    unpackNormalMode: string;
    setup(builder: any): any;
}
import { NormalRGPacking } from './three.core.js';
import { NotEqualCompare } from './three.core.js';
import { NotEqualDepth } from './three.core.js';
import { NotEqualStencilFunc } from './three.core.js';
import { Object3D } from './three.core.js';
/**
 * This node can be used to access transformation related metrics of 3D objects.
 * Depending on the selected scope, a different metric is represented as a uniform
 * in the shader. The following scopes are supported:
 *
 * - `POSITION`: The object's position in world space.
 * - `VIEW_POSITION`: The object's position in view/camera space.
 * - `DIRECTION`: The object's direction in world space.
 * - `SCALE`: The object's scale in world space.
 * - `WORLD_MATRIX`: The object's matrix in world space.
 *
 * @augments Node
 */
export class Object3DNode extends Node {
    /**
     * Constructs a new object 3D node.
     *
     * @param {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')} scope - The node represents a different type of transformation depending on the scope.
     * @param {?Object3D} [object3d=null] - The 3D object.
     */
    constructor(scope: ("position" | "viewPosition" | "direction" | "scale" | "worldMatrix"), object3d?: Object3D | null);
    /**
     * The node reports a different type of transformation depending on the scope.
     *
     * @type {('position'|'viewPosition'|'direction'|'scale'|'worldMatrix')}
     */
    scope: ("position" | "viewPosition" | "direction" | "scale" | "worldMatrix");
    /**
     * The 3D object.
     *
     * @type {?Object3D}
     * @default null
     */
    object3d: Object3D | null;
    /**
     * Holds the value of the node as a uniform.
     *
     * @type {UniformNode}
     */
    uniformNode: UniformNode;
    /**
     * Overwritten since the node type is inferred from the scope.
     *
     * @return {('mat4'|'vec3'|'float')} The node type.
     */
    generateNodeType(): ("mat4" | "vec3" | "float");
    /**
     * Updates the uniform value depending on the scope.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Generates the code snippet of the uniform node. The node type of the uniform
     * node also depends on the selected scope.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder): string;
    serialize(data: any): void;
    deserialize(data: any): void;
}
export namespace Object3DNode {
    let WORLD_MATRIX: string;
    let POSITION: string;
    let SCALE: string;
    let VIEW_POSITION: string;
    let DIRECTION: string;
    let RADIUS: string;
}
import { ObjectLoader } from './three.core.js';
import { ObjectSpaceNormalMap } from './three.core.js';
import { OneFactor } from './three.core.js';
import { OneMinusDstAlphaFactor } from './three.core.js';
import { OneMinusDstColorFactor } from './three.core.js';
import { OneMinusSrcAlphaFactor } from './three.core.js';
import { OneMinusSrcColorFactor } from './three.core.js';
/**
 * This node represents basic mathematical and logical operations like addition,
 * subtraction or comparisons (e.g. `equal()`).
 *
 * @augments TempNode
 */
export class OperatorNode extends TempNode {
    /**
     * Constructs a new operator node.
     *
     * @param {string} op - The operator.
     * @param {Node} aNode - The first input.
     * @param {Node} bNode - The second input.
     * @param {...Node} params - Additional input parameters.
     */
    constructor(op: string, aNode: Node, bNode: Node, ...params: Node[]);
    /**
     * The operator.
     *
     * @type {string}
     */
    op: string;
    /**
     * The first input.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The second input.
     *
     * @type {Node}
     */
    bNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOperatorNode: boolean;
    /**
     * Returns the operator method name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} output - The output type.
     * @returns {string} The operator method name.
     */
    getOperatorMethod(builder: NodeBuilder, output: string): string;
    /**
     * This method is overwritten since the node type is inferred from the operator
     * and the input node types.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {?string} [output=null] - The output type.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder, output?: string | null): string;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import { OrthographicCamera } from './three.core.js';
/**
 * This node can be used to define multiple outputs in a shader programs.
 *
 * @augments Node
 */
export class OutputStructNode extends Node {
    /**
     * Constructs a new output struct node. The constructor can be invoked with an
     * arbitrary number of nodes representing the members.
     *
     * @param {...Node} members - A parameter list of nodes.
     */
    constructor(...members: Node[]);
    /**
     * An array of nodes which defines the output.
     *
     * @type {Array<Node>}
     */
    members: Array<Node>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOutputStructNode: boolean;
    generateNodeType(): string;
    generate(builder: any): any;
}
/**
 * A specialized context node designed to override specific target nodes within a
 * node sub-graph or flow. This allows replacing specific inputs (e.g., normal
 * and position vectors) dynamically during compilation for a specific flow node,
 * without having to reconstruct or duplicate the source nodes.
 *
 * ```js
 * // Method chaining example:
 * node.overrideNode( positionLocal, () => positionLocal.add( vec3( 1, 0, 0 ) ) );
 *
 * // Context assignment example:
 * material.contextNode = overrideNode( positionLocal, () => positionLocal.add( vec3( 1, 0, 0 ) ) );
 * ```
 *
 * @augments ContextNode
 */
export class OverrideContextNode extends ContextNode {
    /**
     * Constructs a new override context node.
     *
     * @param {Map<Node, Function>} overrideNodes - A map mapping target nodes to their respective override callback functions.
     * @param {Node|null} [flowNode=null] - The node whose context should be modified.
     */
    constructor(overrideNodes: Map<Node, Function>, flowNode?: Node | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOverrideContextNode: boolean;
}
import { PCFShadowMap } from './three.core.js';
import { PCFSoftShadowMap } from './three.core.js';
/**
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map
 * (PMREM) from a cubeMap environment texture. This allows different levels of
 * blur to be quickly accessed based on material roughness. It is packed into a
 * special CubeUV format that allows us to perform custom interpolation so that
 * we can support nonlinear formats such as RGBE. Unlike a traditional mipmap
 * chain, it only goes down to the LOD_MIN level (above), and then creates extra
 * even more filtered 'mips' at the same LOD_MIN resolution, associated with
 * higher roughness levels. In this way we maintain resolution to smoothly
 * interpolate diffuse lighting while limiting sampling computation.
 *
 * The prefiltering uses GGX VNDF (Visible Normal Distribution Function)
 * importance sampling based on "Sampling the GGX Distribution of Visible Normals"
 * (Heitz, 2018) to generate environment maps that accurately match the GGX BRDF
 * used in material rendering for physically-based image-based lighting.
 */
export class PMREMGenerator {
    /**
     * Constructs a new PMREM generator.
     *
     * @param {Renderer} renderer - The renderer.
     */
    constructor(renderer: Renderer);
    _renderer: Renderer;
    _pingPongRenderTarget: RenderTarget | null;
    _lodMax: number;
    _cubeSize: number;
    _sizeLods: any[];
    _sigmas: any[];
    _lodMeshes: any[];
    _blurMaterial: NodeMaterial | null;
    _ggxMaterial: NodeMaterial | null;
    _cubemapMaterial: NodeMaterial | null;
    _equirectMaterial: NodeMaterial | null;
    _backgroundBox: Mesh | null;
    get _hasInitialized(): boolean;
    /**
     * Generates a PMREM from a supplied Scene, which can be faster than using an
     * image if networking bandwidth is low. Optional sigma specifies a blur radius
     * in radians to be applied to the scene before PMREM generation. Optional near
     * and far planes ensure the scene is rendered in its entirety.
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM.
     * @param {Vector3} [options.renderTarget=origin] - The position of the internal cube camera that renders the scene.
     * @param {?RenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {RenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromScene}
     */
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        renderTarget?: Vector3 | undefined;
        renderTarget?: Vector3 | undefined;
    }): RenderTarget;
    /**
     * Generates a PMREM from a supplied Scene, which can be faster than using an
     * image if networking bandwidth is low. Optional sigma specifies a blur radius
     * in radians to be applied to the scene before PMREM generation. Optional near
     * and far planes ensure the scene is rendered in its entirety (the cubeCamera
     * is placed at the origin).
     *
     * @deprecated
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @param {?RenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {Promise<RenderTarget>} A Promise that resolve with the PMREM when the generation has been finished.
     * @see {@link PMREMGenerator#fromScene}
     */
    fromSceneAsync(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
        renderTarget?: RenderTarget | null | undefined;
    }): Promise<RenderTarget>;
    /**
     * Generates a PMREM from an equirectangular texture, which can be either LDR
     * or HDR. The ideal input image size is 1k (1024 x 512), as this matches best
     * with the 256 x 256 cubemap output. The minimum supported input image size
     * is 64 x 32.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {RenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangularAsync}
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: RenderTarget | null): RenderTarget;
    /**
     * Generates a PMREM from an equirectangular texture, which can be either LDR
     * or HDR. The ideal input image size is 1k (1024 x 512),
     * as this matches best with the 256 x 256 cubemap output.
     *
     * @deprecated
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<RenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangular}
     */
    fromEquirectangularAsync(equirectangular: Texture, renderTarget?: RenderTarget | null): Promise<RenderTarget>;
    /**
     * Generates a PMREM from an cubemap texture, which can be either LDR
     * or HDR. The ideal input cube size is 256 x 256, as this matches best
     * with the 256 x 256 cubemap output. The minimum supported input cube
     * size is 16 x 16 per face.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {RenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemapAsync}
     */
    fromCubemap(cubemap: Texture, renderTarget?: RenderTarget | null): RenderTarget;
    /**
     * Generates a PMREM from an cubemap texture, which can be either LDR
     * or HDR. The ideal input cube size is 256 x 256,
     * with the 256 x 256 cubemap output.
     *
     * @deprecated
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<RenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemap}
     */
    fromCubemapAsync(cubemap: Texture, renderTarget?: RenderTarget | null): Promise<RenderTarget>;
    /**
     * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     *
     * @returns {Promise}
     */
    compileCubemapShader(): Promise<any>;
    /**
     * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     *
     * @returns {Promise}
     */
    compileEquirectangularShader(): Promise<any>;
    /**
     * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
     * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
     * one of them will cause any others to also become unusable.
     */
    dispose(): void;
    _setSizeFromTexture(texture: any): void;
    _setSize(cubeSize: any): void;
    _dispose(): void;
    _cleanup(outputTarget: any): void;
    _fromTexture(texture: any, renderTarget: any): any;
    _allocateTarget(depthBuffer: any): RenderTarget;
    _init(renderTarget: any): void;
    _compileMaterial(material: any): Promise<void>;
    _sceneToCubeUV(scene: any, near: any, far: any, cubeUVRenderTarget: any, position: any): void;
    _textureToCubeUV(texture: any, cubeUVRenderTarget: any): void;
    _applyPMREM(cubeUVRenderTarget: any): void;
    /**
     * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
     * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
     * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
     * applies incremental roughness filtering to avoid over-blurring.
     *
     * @private
     * @param {RenderTarget} cubeUVRenderTarget
     * @param {number} lodIn - Source LOD level to read from
     * @param {number} lodOut - Target LOD level to write to
     */
    private _applyGGXFilter;
    /**
     * This is a two-pass Gaussian blur for a cubemap. Normally this is done
     * vertically and horizontally, but this breaks down on a cube. Here we apply
     * the blur latitudinally (around the poles), and then longitudinally (towards
     * the poles) to approximate the orthogonally-separable blur. It is least
     * accurate at the poles, but still does a decent job.
     *
     * Used for initial scene blur in fromScene() method when sigma > 0.
     *
     * @private
     * @param {RenderTarget} cubeUVRenderTarget - The cubemap render target.
     * @param {number} lodIn - The input level-of-detail.
     * @param {number} lodOut - The output level-of-detail.
     * @param {number} sigma - The blur radius in radians.
     * @param {Vector3} [poleAxis] - The pole axis.
     */
    private _blur;
    _halfBlur(targetIn: any, targetOut: any, lodIn: any, lodOut: any, sigmaRadians: any, direction: any, poleAxis: any): void;
    _setViewport(target: any, x: any, y: any, width: any, height: any): void;
}
/**
 * This node represents a PMREM which is a special type of preprocessed
 * environment map intended for PBR materials.
 *
 * ```js
 * const material = new MeshStandardNodeMaterial();
 * material.envNode = pmremTexture( envMap );
 * ```
 *
 * @augments TempNode
 */
export class PMREMNode extends TempNode {
    /**
     * Constructs a new function overloading node.
     *
     * @param {Texture} value - The input texture.
     * @param {Node<vec2>} [uvNode=null] - The uv node.
     * @param {Node<float>} [levelNode=null] - The level node.
     */
    constructor(value: Texture, uvNode?: Node<any>, levelNode?: Node<any>);
    /**
     * Reference to the input texture.
     *
     * @private
     * @type {Texture}
     */
    private _value;
    /**
     * Reference to the generated PMREM.
     *
     * @private
     * @type {Texture | null}
     * @default null
     */
    private _pmrem;
    /**
     *  The uv node.
     *
     * @type {Node<vec2>}
     */
    uvNode: Node<any>;
    /**
     *  The level node.
     *
     * @type {Node<float>}
     */
    levelNode: Node<any>;
    /**
     * Reference to a PMREM generator.
     *
     * @private
     * @type {?PMREMGenerator}
     * @default null
     */
    private _generator;
    /**
     * The texture node holding the generated PMREM.
     *
     * @private
     * @type {TextureNode}
     */
    private _texture;
    /**
     * A uniform representing the PMREM's width.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _width;
    /**
     * A uniform representing the PMREM's height.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _height;
    /**
     * A uniform representing the PMREM's max Mip.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _maxMip;
    set value(value: Texture);
    /**
     * The node's texture value.
     *
     * @type {Texture}
     */
    get value(): Texture;
    /**
     * Uses the given PMREM texture to update internal values.
     *
     * @param {Texture} texture - The PMREM texture.
     */
    updateFromTexture(texture: Texture): void;
    updateBefore(frame: any): void;
    setup(builder: any): void;
}
/**
 * This node represents an operation that packs floating-point values of a vector into an unsigned 32-bit integer
 *
 * @augments TempNode
 */
export class PackFloatNode extends TempNode {
    /**
     *
     * @param {'snorm' | 'unorm' | 'float16'} encoding - The numeric encoding that describes how the float values are mapped to the integer range.
     * @param {Node} vectorNode - The vector node to be packed
     */
    constructor(encoding: "snorm" | "unorm" | "float16", vectorNode: Node);
    /**
     * The vector to be packed.
     *
     * @type {Node}
     */
    vectorNode: Node;
    /**
     * The numeric encoding.
     *
     * @type {string}
     */
    encoding: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPackFloatNode: boolean;
    generateNodeType(): string;
    generate(builder: any): string;
}
/**
 * Special version of {@link PropertyNode} which is used for parameters.
 *
 * @augments PropertyNode
 */
export class ParameterNode extends PropertyNode {
    /**
     * Constructs a new parameter node.
     *
     * @param {string} nodeType - The type of the node.
     * @param {?string} [name=null] - The name of the parameter in the shader.
     */
    constructor(nodeType: string, name?: string | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isParameterNode: boolean;
    /**
     * Gets the type of a member variable in the parameter node.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @param {string} name - The name of the member variable.
     * @returns {string}
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    getHash(): string;
    generate(): string;
}
/**
 * Represents a render pass (sometimes called beauty pass) in context of post processing.
 * This pass produces a render for the given scene and camera and can provide multiple outputs
 * via MRT for further processing.
 *
 * ```js
 * const postProcessing = new RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 *
 * postProcessing.outputNode = scenePass;
 * ```
 *
 * @augments TempNode
 */
export class PassNode extends TempNode {
    /**
     * Constructs a new pass node.
     *
     * @param {('color'|'depth')} scope - The scope of the pass. The scope determines whether the node outputs color or depth.
     * @param {Scene} scene - A reference to the scene.
     * @param {Camera} camera - A reference to the camera.
     * @param {Object} options - Options for the internal render target.
     */
    constructor(scope: ("color" | "depth"), scene: Scene, camera: Camera, options?: Object);
    /**
     * The scope of the pass. The scope determines whether the node outputs color or depth.
     *
     * @type {('color'|'depth')}
     */
    scope: ("color" | "depth");
    /**
     * A reference to the scene.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * A reference to the camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * Options for the internal render target.
     *
     * @type {Object}
     */
    options: Object;
    /**
     * The pass's pixel width. Will be kept automatically kept in sync with the renderer's width.
     * @private
     * @type {number}
     * @default 1
     */
    private _width;
    /**
     * The pass's pixel height. Will be kept automatically kept in sync with the renderer's height.
     * @private
     * @type {number}
     * @default 1
     */
    private _height;
    /**
     * The pass's render target.
     *
     * @type {RenderTarget}
     */
    renderTarget: RenderTarget;
    /**
     * An optional override material for the pass.
     *
     * @type {Material|null}
     */
    overrideMaterial: Material | null;
    /**
     * Whether the pass is transparent.
     *
     * @type {boolean}
     * @default false
     */
    transparent: boolean;
    /**
     * Whether the pass is opaque.
     *
     * @type {boolean}
     * @default true
     */
    opaque: boolean;
    /**
     * An optional global context for the pass.
     *
     * @type {ContextNode|null}
     */
    contextNode: ContextNode | null;
    /**
     * A cache for the context node.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _contextNodeCache;
    /**
     * A dictionary holding the internal result textures.
     *
     * @private
     * @type {{ output: Texture, depth: ?DepthTexture }}
     */
    private _textures;
    /**
     * A dictionary holding the internal texture nodes.
     *
     * @private
     * @type {Object<string, TextureNode>}
     */
    private _textureNodes;
    /**
     * A dictionary holding the internal depth nodes.
     *
     * @private
     * @type {Object}
     */
    private _linearDepthNodes;
    /**
     * A dictionary holding the internal viewZ nodes.
     *
     * @private
     * @type {Object}
     */
    private _viewZNodes;
    /**
     * A dictionary holding the texture data of the previous frame.
     * Used for computing velocity/motion vectors.
     *
     * @private
     * @type {Object<string, Texture>}
     */
    private _previousTextures;
    /**
     * A dictionary holding the texture nodes of the previous frame.
     * Used for computing velocity/motion vectors.
     *
     * @private
     * @type {Object<string, TextureNode>}
     */
    private _previousTextureNodes;
    /**
     * The `near` property of the camera as a uniform.
     *
     * @private
     * @type {UniformNode}
     */
    private _cameraNear;
    /**
     * The `far` property of the camera as a uniform.
     *
     * @private
     * @type {UniformNode}
     */
    private _cameraFar;
    /**
     * A MRT node configuring the MRT settings.
     *
     * @private
     * @type {?MRTNode}
     * @default null
     */
    private _mrt;
    /**
     * Layer object for configuring the camera that is used
     * to produce the pass.
     *
     * @private
     * @type {?Layers}
     * @default null
     */
    private _layers;
    /**
     * Scales the resolution of the internal render target.
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _resolutionScale;
    /**
     * Custom viewport definition.
     *
     * @private
     * @type {?Vector4}
     * @default null
     */
    private _viewport;
    /**
     * Custom scissor definition.
     *
     * @private
     * @type {?Vector4}
     * @default null
     */
    private _scissor;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPassNode: boolean;
    /**
     * Sets the resolution scale for the pass.
     * The resolution scale is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolutionScale - The resolution scale to set. A value of `1` means full resolution.
     * @return {PassNode} A reference to this pass.
     */
    setResolutionScale(resolutionScale: number): PassNode;
    /**
     * Gets the current resolution scale of the pass.
     *
     * @return {number} The current resolution scale. A value of `1` means full resolution.
     */
    getResolutionScale(): number;
    /**
     * Sets the resolution for the pass.
     * The resolution is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolution - The resolution to set. A value of `1` means full resolution.
     * @return {PassNode} A reference to this pass.
     * @deprecated since r181. Use {@link PassNode#setResolutionScale `setResolutionScale()`} instead.
     */
    setResolution(resolution: number): PassNode;
    /**
     * Gets the current resolution of the pass.
     *
     * @return {number} The current resolution. A value of `1` means full resolution.
     * @deprecated since r181. Use {@link PassNode#getResolutionScale `getResolutionScale()`} instead.
     */
    getResolution(): number;
    /**
     * Sets the layer configuration that should be used when rendering the pass.
     *
     * @param {Layers} layers - The layers object to set.
     * @return {PassNode} A reference to this pass.
     */
    setLayers(layers: Layers): PassNode;
    /**
     * Gets the current layer configuration of the pass.
     *
     * @return {?Layers} .
     */
    getLayers(): Layers | null;
    /**
     * Sets the given MRT node to setup MRT for this pass.
     *
     * @param {MRTNode} mrt - The MRT object.
     * @return {PassNode} A reference to this pass.
     */
    setMRT(mrt: MRTNode): PassNode;
    /**
     * Returns the current MRT node.
     *
     * @return {MRTNode} The current MRT node.
     */
    getMRT(): MRTNode;
    /**
     * Returns the texture for the given output name.
     *
     * @param {string} name - The output name to get the texture for.
     * @return {Texture} The texture.
     */
    getTexture(name: string): Texture;
    /**
     * Returns the texture holding the data of the previous frame for the given output name.
     *
     * @param {string} name - The output name to get the texture for.
     * @return {Texture} The texture holding the data of the previous frame.
     */
    getPreviousTexture(name: string): Texture;
    /**
     * Switches current and previous textures for the given output name.
     *
     * @param {string} name - The output name.
     */
    toggleTexture(name: string): void;
    /**
     * Returns the texture node for the given output name.
     *
     * @param {string} [name='output'] - The output name to get the texture node for.
     * @return {TextureNode} The texture node.
     */
    getTextureNode(name?: string): TextureNode;
    /**
     * Returns the previous texture node for the given output name.
     *
     * @param {string} [name='output'] - The output name to get the previous texture node for.
     * @return {TextureNode} The previous texture node.
     */
    getPreviousTextureNode(name?: string): TextureNode;
    /**
     * Returns a viewZ node of this pass.
     *
     * @param {string} [name='depth'] - The output name to get the viewZ node for. In most cases the default `'depth'` can be used however the parameter exists for custom depth outputs.
     * @return {Node} The viewZ node.
     */
    getViewZNode(name?: string): Node;
    /**
     * Returns a linear depth node of this pass.
     *
     * @param {string} [name='depth'] - The output name to get the linear depth node for. In most cases the default `'depth'` can be used however the parameter exists for custom depth outputs.
     * @return {Node} The linear depth node.
     */
    getLinearDepthNode(name?: string): Node;
    /**
     * Precompiles the pass.
     *
     * Note that this method must be called after the pass configuration is complete.
     * So calls like `setMRT()` and `getTextureNode()` must proceed the precompilation.
     *
     * @async
     * @param {Renderer} renderer - The renderer.
     * @return {Promise} A Promise that resolves when the compile has been finished.
     * @see {@link Renderer#compileAsync}
     */
    compileAsync(renderer: Renderer): Promise<any>;
    setup({ renderer }: {
        renderer: any;
    }): Node | TextureNode;
    updateBefore(frame: any): void;
    /**
     * Sets the size of the pass's render target. Honors the pixel ratio.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * This method allows to define the pass's scissor rectangle. By default, the scissor rectangle is kept
     * in sync with the pass's dimensions. To reverse the process and use auto-sizing again, call the method
     * with `null` as the single argument.
     *
     * @param {?(number | Vector4)} x - The horizontal coordinate for the lower left corner of the box in logical pixel unit.
     * Instead of passing four arguments, the method also works with a single four-dimensional vector.
     * @param {number} y - The vertical coordinate for the lower left corner of the box in logical pixel unit.
     * @param {number} width - The width of the scissor box in logical pixel unit.
     * @param {number} height - The height of the scissor box in logical pixel unit.
     */
    setScissor(x: (number | Vector4) | null, y: number, width: number, height: number): void;
    /**
     * This method allows to define the pass's viewport. By default, the viewport is kept in sync
     * with the pass's dimensions. To reverse the process and use auto-sizing again, call the method
     * with `null` as the single argument.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.
     * @param {number} y - The vertical coordinate for the lower left corner of the viewport origin  in logical pixel unit.
     * @param {number} width - The width of the viewport in logical pixel unit.
     * @param {number} height - The height of the viewport in logical pixel unit.
     */
    setViewport(x: number | Vector4, y: number, width: number, height: number): void;
}
export namespace PassNode {
    let COLOR_1: "color";
    export { COLOR_1 as COLOR };
    export let DEPTH: "depth";
}
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
     * Implements the direct lighting. The specular portion is optional an can be controlled
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
     */
    constructor(clearcoat?: boolean, sheen?: boolean, iridescence?: boolean, anisotropy?: boolean, transmission?: boolean, dispersion?: boolean);
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
     * The iridescence F0.
     *
     * @type {?Node}
     * @default null
     */
    iridescenceF0: Node | null;
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
/**
 * Module for representing point lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class PointLightNode extends AnalyticLightNode {
    /**
     * Constructs a new point light node.
     *
     * @param {?PointLight} [light=null] - The point light source.
     */
    constructor(light?: PointLight | null);
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
     * Overwritten to updated point light specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(frame: NodeFrame): void;
    /**
     * Overwritten to setup point light specific shadow.
     *
     * @return {PointShadowNode}
     */
    setupShadowNode(): PointShadowNode;
    setupDirect(builder: any): {
        lightDirection: any;
        lightColor: any;
    };
}
/**
 * Represents the shadow implementation for point light nodes.
 *
 * @augments ShadowNode
 */
export class PointShadowNode extends ShadowNode {
    /**
     * Constructs a new point shadow node.
     *
     * @param {PointLight} light - The shadow casting point light.
     * @param {?PointLightShadow} [shadow=null] - An optional point light shadow.
     */
    constructor(light: PointLight, shadow?: PointLightShadow | null);
    /**
     * Overwrites the default implementation to create a CubeRenderTarget with CubeDepthTexture.
     *
     * @param {LightShadow} shadow - The light shadow object.
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Object} An object containing the shadow map and depth texture.
     */
    setupRenderTarget(shadow: LightShadow, builder: NodeBuilder): Object;
}
/**
 * A node for representing the uv coordinates of points.
 *
 * Can only be used with a WebGL backend. In WebGPU, point
 * primitives always have the size of one pixel and can thus
 * can't be used as sprite-like objects that display textures.
 *
 * @augments Node
 */
export class PointUVNode extends Node {
    /**
     * Constructs a new point uv node.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPointUVNode: boolean;
    generate(): string;
}
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
 * This class represents a shader property. It can be used
 * to explicitly define a property and assign a value to it.
 *
 * ```js
 * const threshold = property( 'float', 'threshold' ).assign( THRESHOLD );
 *```
 * `PropertyNode` is used by the engine to predefined common material properties
 * for TSL code.
 *
 * @augments Node
 */
export class PropertyNode extends Node {
    /**
     * Constructs a new property node.
     *
     * @param {string} nodeType - The type of the node.
     * @param {?string} [name=null] - The name of the property in the shader.
     * @param {boolean} [varying=false] - Whether this property is a varying or not.
     * @param {?Node} [placeholderNode=null] - The placeholder node if not assigned.
     */
    constructor(nodeType: string, name?: string | null, varying?: boolean, placeholderNode?: Node | null);
    /**
     * Whether this property is a varying or not.
     *
     * @type {boolean}
     * @default false
     */
    varying: boolean;
    /**
     * The placeholder node of the property if it is not assigned.
     *
     * @type {?Node}
     * @default null
     */
    placeholderNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPropertyNode: boolean;
    getNodeType(builder: any): any;
    getHash(builder: any): string;
    generate(builder: any): any;
}
/**
 * This module is a helper for passes which need to render a full
 * screen effect which is quite common in context of post processing.
 *
 * The intended usage is to reuse a single quad mesh for rendering
 * subsequent passes by just reassigning the `material` reference.
 *
 * Note: This module can only be used with `WebGPURenderer`.
 *
 * @augments Mesh
 */
export class QuadMesh extends Mesh {
    /**
     * Constructs a new quad mesh.
     *
     * @param {?Material} [material=null] - The material to render the quad mesh with.
     */
    constructor(material?: Material | null);
    /**
     * The camera to render the quad mesh with.
     *
     * @type {OrthographicCamera}
     * @readonly
     */
    readonly camera: OrthographicCamera;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isQuadMesh: boolean;
    /**
     * Async version of `render()`.
     *
     * @async
     * @deprecated
     * @param {Renderer} renderer - The renderer.
     * @return {Promise} A Promise that resolves when the render has been finished.
     */
    renderAsync(renderer: Renderer): Promise<any>;
    /**
     * Renders the quad mesh
     *
     * @param {Renderer} renderer - The renderer.
     */
    render(renderer: Renderer): void;
}
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
 * `RTTNode` takes another node and uses it with a `QuadMesh` to render into a texture (RTT).
 * This module is especially relevant in context of post processing where certain nodes require
 * texture input for their effects. With the helper function `convertToTexture()` which is based
 * on this module, the node system can automatically ensure texture input if required.
 *
 * @augments TextureNode
 */
export class RTTNode extends TextureNode {
    /**
     * Constructs a new RTT node.
     *
     * @param {Node} node - The node to render a texture with.
     * @param {?number} [width=null] - The width of the internal render target. If not width is applied, the render target is automatically resized.
     * @param {?number} [height=null] - The height of the internal render target.
     * @param {Object} [options={type:HalfFloatType}] - The options for the internal render target.
     */
    constructor(node: Node, width?: number | null, height?: number | null, options?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRTTNode: boolean;
    /**
     * The node to render a texture with.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The width of the internal render target.
     * If not width is applied, the render target is automatically resized.
     *
     * @type {?number}
     * @default null
     */
    width: number | null;
    /**
     * The height of the internal render target.
     *
     * @type {?number}
     * @default null
     */
    height: number | null;
    /**
     * The render target
     *
     * @type {RenderTarget}
     */
    renderTarget: RenderTarget;
    /**
     * Whether the texture requires an update or not.
     *
     * @type {boolean}
     * @default true
     */
    textureNeedsUpdate: boolean;
    /**
     * Whether the texture should automatically be updated or not.
     *
     * @type {boolean}
     * @default true
     */
    autoUpdate: boolean;
    /**
     * The resolution scale
     *
     * @private
     * @type {number}
     * @default 1
     */
    private _resolutionScale;
    /**
     * The node which is used with the quad mesh for RTT.
     *
     * @private
     * @type {Node}
     * @default null
     */
    private _rttNode;
    /**
     * The internal quad mesh for RTT.
     *
     * @private
     * @type {QuadMesh}
     */
    private _quadMesh;
    /**
     * Whether the internal render target should automatically be resized or not.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly get autoResize(): boolean;
    setup(builder: any): void;
    /**
     * Sets the size of the internal render target
     *
     * @param {number} width - The width to set.
     * @param {number} height - The width to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Sets the resolution scale.
     * The resolution scale is a factor that is multiplied with the renderer's width and height.
     *
     * @param {number} resolutionScale - The resolution scale to set. A value of `1` means full resolution.
     * @returns {RTTNode} A reference to this node.
     */
    setResolutionScale(resolutionScale: number): RTTNode;
    /**
     * Gets the resolution scale.
     *
     * @returns {number} The resolution scale.
     */
    getResolutionScale(): number;
    updateBefore({ renderer }: {
        renderer: any;
    }): void;
}
/**
 * `RangeNode` generates random instanced attribute data in a defined range.
 * An exemplary use case for this utility node is to generate random per-instance
 * colors:
 * ```js
 * const material = new MeshBasicNodeMaterial();
 * material.colorNode = range( new Color( 0x000000 ), new Color( 0xFFFFFF ) );
 * const mesh = new InstancedMesh( geometry, material, count );
 * ```
 * @augments Node
 */
export class RangeNode extends Node {
    /**
     * Constructs a new range node.
     *
     * @param {Node<any>} [minNode=float()] - A node defining the lower bound of the range.
     * @param {Node<any>} [maxNode=float()] - A node defining the upper bound of the range.
     */
    constructor(minNode?: Node<any>, maxNode?: Node<any>);
    /**
     *  A node defining the lower bound of the range.
     *
     * @type {Node<any>}
     * @default float()
     */
    minNode: Node<any>;
    /**
     *  A node defining the upper bound of the range.
     *
     * @type {Node<any>}
     * @default float()
     */
    maxNode: Node<any>;
    /**
     * Returns the vector length which is computed based on the range definition.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {number} The vector length.
     */
    getVectorLength(builder: NodeBuilder): number;
    /**
     * This method is overwritten since the node type is inferred from range definition.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns a constant node from the given node by traversing it.
     *
     * @param {Node} node - The node to traverse.
     * @returns {Node} The constant node, if found.
     */
    getConstNode(node: Node): Node;
    setup(builder: any): any;
}
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
        halfWidth: any;
        halfHeight: any;
        ltc_1: TextureNode;
        ltc_2: TextureNode;
    };
}
import { RedFormat } from './three.core.js';
import { RedIntegerFormat } from './three.core.js';
/**
 * Base class for nodes which establishes a reference to a property of another object.
 * In this way, the value of the node is automatically linked to the value of
 * referenced object. Reference nodes internally represent the linked value
 * as a uniform.
 *
 * @augments Node
 */
export class ReferenceBaseNode extends Node {
    /**
     * Constructs a new reference base node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} uniformType - The uniform type that should be used to represent the property value.
     * @param {?Object} [object=null] - The object the property belongs to.
     * @param {?number} [count=null] - When the linked property is an array-like, this parameter defines its length.
     */
    constructor(property: string, uniformType: string, object?: Object | null, count?: number | null);
    /**
     * The name of the property the node refers to.
     *
     * @type {string}
     */
    property: string;
    /**
     * The uniform type that should be used to represent the property value.
     *
     * @type {string}
     */
    uniformType: string;
    /**
     * The object the property belongs to.
     *
     * @type {?Object}
     * @default null
     */
    object: Object | null;
    /**
     * When the linked property is an array, this parameter defines its length.
     *
     * @type {?number}
     * @default null
     */
    count: number | null;
    /**
     * The property name might have dots so nested properties can be referred.
     * The hierarchy of the names is stored inside this array.
     *
     * @type {Array<string>}
     */
    properties: Array<string>;
    /**
     * Points to the current referred object. This property exists next to {@link ReferenceNode#object}
     * since the final reference might be updated from calling code.
     *
     * @type {?Object}
     * @default null
     */
    reference: Object | null;
    /**
     * The uniform node that holds the value of the reference node.
     *
     * @type {UniformNode}
     * @default null
     */
    node: UniformNode;
    /**
     * The uniform group of the internal uniform.
     *
     * @type {UniformGroupNode}
     * @default null
     */
    group: UniformGroupNode;
    /**
     * Sets the uniform group for this reference node.
     *
     * @param {UniformGroupNode} group - The uniform group to set.
     * @return {ReferenceBaseNode} A reference to this node.
     */
    setGroup(group: UniformGroupNode): ReferenceBaseNode;
    /**
     * When the referred property is array-like, this method can be used
     * to access elements via an index node.
     *
     * @param {IndexNode} indexNode - indexNode.
     * @return {ReferenceElementNode} A reference to an element.
     */
    element(indexNode: IndexNode): ReferenceElementNode;
    /**
     * Sets the node type which automatically defines the internal
     * uniform type.
     *
     * @param {string} uniformType - The type to set.
     */
    setNodeType(uniformType: string): void;
    /**
     * This method is overwritten since the node type is inferred from
     * the type of the reference node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the property value from the given referred object.
     *
     * @param {Object} [object=this.reference] - The object to retrieve the property value from.
     * @return {any} The value.
     */
    getValueFromReference(object?: Object): any;
    /**
     * Allows to update the reference based on the given state. The state is only
     * evaluated {@link ReferenceBaseNode#object} is not set.
     *
     * @param {(NodeFrame|NodeBuilder)} state - The current state.
     * @return {Object} The updated reference.
     */
    updateReference(state: (NodeFrame | NodeBuilder)): Object;
    /**
     * The output of the reference node is the internal uniform node.
     *
     * @return {UniformNode} The output node.
     */
    setup(): UniformNode;
    /**
     * Overwritten to update the internal uniform value.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
    /**
     * Retrieves the value from the referred object property and uses it
     * to updated the internal uniform.
     */
    updateValue(): void;
}
/**
 * This type of node establishes a reference to a property of another object.
 * In this way, the value of the node is automatically linked to the value of
 * referenced object. Reference nodes internally represent the linked value
 * as a uniform.
 *
 * @augments Node
 */
export class ReferenceNode extends Node {
    /**
     * Constructs a new reference node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} uniformType - The uniform type that should be used to represent the property value.
     * @param {?Object} [object=null] - The object the property belongs to.
     * @param {?number} [count=null] - When the linked property is an array-like, this parameter defines its length.
     */
    constructor(property: string, uniformType: string, object?: Object | null, count?: number | null);
    /**
     * The name of the property the node refers to.
     *
     * @type {string}
     */
    property: string;
    /**
     * The uniform type that should be used to represent the property value.
     *
     * @type {string}
     */
    uniformType: string;
    /**
     * The object the property belongs to.
     *
     * @type {?Object}
     * @default null
     */
    object: Object | null;
    /**
     * When the linked property is an array, this parameter defines its length.
     *
     * @type {?number}
     * @default null
     */
    count: number | null;
    /**
     * The property name might have dots so nested properties can be referred.
     * The hierarchy of the names is stored inside this array.
     *
     * @type {Array<string>}
     */
    properties: Array<string>;
    /**
     * Points to the current referred object. This property exists next to {@link ReferenceNode#object}
     * since the final reference might be updated from calling code.
     *
     * @type {?Object}
     * @default null
     */
    reference: Object | null;
    /**
     * The uniform node that holds the value of the reference node.
     *
     * @type {UniformNode}
     * @default null
     */
    node: UniformNode;
    /**
     * The uniform group of the internal uniform.
     *
     * @type {UniformGroupNode}
     * @default null
     */
    group: UniformGroupNode;
    /**
     * When the referred property is array-like, this method can be used
     * to access elements via an index node.
     *
     * @param {IndexNode} indexNode - indexNode.
     * @return {ReferenceElementNode} A reference to an element.
     */
    element(indexNode: IndexNode): ReferenceElementNode;
    /**
     * Sets the uniform group for this reference node.
     *
     * @param {UniformGroupNode} group - The uniform group to set.
     * @return {ReferenceNode} A reference to this node.
     */
    setGroup(group: UniformGroupNode): ReferenceNode;
    /**
     * Sets the name for the internal uniform.
     *
     * @param {string} name - The label to set.
     * @return {ReferenceNode} A reference to this node.
     */
    setName(name: string): ReferenceNode;
    /**
     * Sets the label for the internal uniform.
     *
     * @deprecated
     * @param {string} name - The label to set.
     * @return {ReferenceNode} A reference to this node.
     */
    label(name: string): ReferenceNode;
    /**
     * Sets the node type which automatically defines the internal
     * uniform type.
     *
     * @param {string} uniformType - The type to set.
     */
    setNodeType(uniformType: string): void;
    /**
     * This method is overwritten since the node type is inferred from
     * the type of the reference node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the property value from the given referred object.
     *
     * @param {Object} [object=this.reference] - The object to retrieve the property value from.
     * @return {any} The value.
     */
    getValueFromReference(object?: Object): any;
    /**
     * Allows to update the reference based on the given state. The state is only
     * evaluated {@link ReferenceNode#object} is not set.
     *
     * @param {(NodeFrame|NodeBuilder)} state - The current state.
     * @return {Object} The updated reference.
     */
    updateReference(state: (NodeFrame | NodeBuilder)): Object;
    /**
     * The output of the reference node is the internal uniform node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {UniformNode} The output node.
     */
    setup(): UniformNode;
    /**
     * Overwritten to update the internal uniform value.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
    /**
     * Retrieves the value from the referred object property and uses it
     * to updated the internal uniform.
     */
    updateValue(): void;
}
/**
 * This node can be used to implement mirror-like flat reflective surfaces.
 *
 * ```js
 * const groundReflector = reflector();
 * material.colorNode = groundReflector;
 *
 * const plane = new Mesh( geometry, material );
 * plane.add( groundReflector.target );
 * ```
 *
 * @augments TextureNode
 */
export class ReflectorNode extends TextureNode {
    /**
     * Constructs a new reflector node.
     *
     * @param {Object} [parameters={}] - An object holding configuration parameters.
     * @param {Object3D} [parameters.target=new Object3D()] - The 3D object the reflector is linked to.
     * @param {number} [parameters.resolutionScale=1] - The resolution scale.
     * @param {boolean} [parameters.generateMipmaps=false] - Whether mipmaps should be generated or not.
     * @param {boolean} [parameters.bounces=true] - Whether reflectors can render other reflector nodes or not.
     * @param {boolean} [parameters.depth=false] - Whether depth data should be generated or not.
     * @param {number} [parameters.samples] - Anti-Aliasing samples of the internal render-target.
     * @param {TextureNode} [parameters.defaultTexture] - The default texture node.
     * @param {ReflectorBaseNode} [parameters.reflector] - The reflector base node.
     */
    constructor(parameters?: {
        target?: Object3D | undefined;
        resolutionScale?: number | undefined;
        generateMipmaps?: boolean | undefined;
        bounces?: boolean | undefined;
        depth?: boolean | undefined;
        samples?: number | undefined;
        defaultTexture?: TextureNode | undefined;
        reflector?: ReflectorBaseNode | undefined;
    });
    /**
     * A reference to the internal reflector base node which holds the actual implementation.
     *
     * @private
     * @type {ReflectorBaseNode}
     * @default ReflectorBaseNode
     */
    private _reflectorBaseNode;
    /**
     * A reference to the internal depth node.
     *
     * @private
     * @type {?Node}
     * @default null
     */
    private _depthNode;
    /**
     * A reference to the internal reflector node.
     *
     * @type {ReflectorBaseNode}
     */
    get reflector(): ReflectorBaseNode;
    /**
     * A reference to 3D object the reflector is linked to.
     *
     * @type {Object3D}
     */
    get target(): Object3D;
    /**
     * Returns a node representing the mirror's depth. That can be used
     * to implement more advanced reflection effects like distance attenuation.
     *
     * @return {Node} The depth node.
     */
    getDepthNode(): Node;
    setup(builder: any): void;
    clone(): any;
}
import { ReinhardToneMapping } from './three.core.js';
/**
 * Normally, tone mapping and color conversion happens automatically just
 * before outputting a pixel to the default (screen) framebuffer. In certain
 * post processing setups this is too late because some effects such as FXAA
 * require e.g. sRGB input. For such scenarios, `RenderOutputNode` can be used
 * to apply tone mapping and color space conversion at an arbitrary point
 * in the effect chain.
 *
 * When applying tone mapping and color space conversion manually with this node,
 * you have to set {@link RenderPipeline#outputColorTransform} to `false`.
 *
 * ```js
 * const postProcessing = new RenderPipeline( renderer );
 * postProcessing.outputColorTransform = false;
 *
 * const scenePass = pass( scene, camera );
 * const outputPass = renderOutput( scenePass );
 *
 * postProcessing.outputNode = outputPass;
 * ```
 *
 * @augments TempNode
 */
export class RenderOutputNode extends TempNode {
    /**
     * Constructs a new render output node.
     *
     * @param {Node} colorNode - The color node to process.
     * @param {?number} toneMapping - The tone mapping type.
     * @param {?string} outputColorSpace - The output color space.
     */
    constructor(colorNode: Node, toneMapping: number | null, outputColorSpace: string | null);
    /**
     * The color node to process.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * The tone mapping type.
     *
     * @private
     * @type {?number}
     */
    private _toneMapping;
    /**
     * The output color space.
     *
     * @type {?string}
     */
    outputColorSpace: string | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRenderOutputNode: boolean;
    /**
     * Sets the tone mapping type.
     *
     * @param {number} value - The tone mapping type.
     * @return {ToneMappingNode} A reference to this node.
     */
    setToneMapping(value: number): ToneMappingNode;
    /**
     * Gets the tone mapping type.
     *
     * @returns {number} The tone mapping type.
     */
    getToneMapping(): number;
    setup({ context }: {
        context: any;
    }): Node;
}
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
     * The context of the render pipeline stack.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _context;
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
     * Returns the current context of the render pipeline stack.
     *
     * @readonly
     * @type {?Object}
     */
    readonly get context(): Object | null;
    /**
     * Frees internal resources.
     */
    dispose(): void;
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
     * @return {Promise} A Promise that resolves when the compile has been finished.
     */
    compileAsync(scene: Object3D, camera: Camera, targetScene?: Scene | null): Promise<any>;
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
     * @param {BufferAttribute} attribute - The storage buffer attribute to read frm.
     * @param {ReadbackBuffer|ArrayBuffer} target - The storage buffer attribute.
     * @param {number} offset - The storage buffer attribute.
     * @param {number} count - The offset from which to start reading the
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: ReadbackBuffer | ArrayBuffer, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * If the renderer needs an internal framebuffer target for tone mapping or color space conversion,
     * the number of samples is set to 0.
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
    dispose(): void;
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
     * @param {number} [faceIndex=0] - The active cube face index.
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
     * @return {Camera} The returned camera might be different depending on whether XR is used or not.
     */
    private _updateCamera;
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
     * Alias for `compileAsync()`.
     *
     * @method
     * @param {Object3D} scene - The scene or 3D object to precompile.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {Scene} targetScene - If the first argument is a 3D object, this parameter must represent the scene the 3D object is going to be added.
     * @return {function(Object3D, Camera, ?Scene): Promise|undefined} A Promise that resolves when the compile has been finished.
     */
    get compile(): (arg0: Object3D, arg1: Camera, arg2: Scene | null) => Promise<any> | undefined;
}
/**
 * This node is a special type of reference node which is intended
 * for linking renderer properties with node values.
 * ```js
 * const exposureNode = rendererReference( 'toneMappingExposure', 'float', renderer );
 * ```
 * When changing `renderer.toneMappingExposure`, the node value of `exposureNode` will
 * automatically be updated.
 *
 * @augments ReferenceBaseNode
 */
export class RendererReferenceNode extends ReferenceBaseNode {
    /**
     * Constructs a new renderer reference node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} inputType - The uniform type that should be used to represent the property value.
     * @param {?Renderer} [renderer=null] - The renderer the property belongs to. When no renderer is set,
     * the node refers to the renderer of the current state.
     */
    constructor(property: string, inputType: string, renderer?: Renderer | null);
    /**
     * The renderer the property belongs to. When no renderer is set,
     * the node refers to the renderer of the current state.
     *
     * @type {?Renderer}
     * @default null
     */
    renderer: Renderer | null;
}
export var RendererUtils: Readonly<{
    __proto__: null;
    resetRendererAndSceneState: typeof resetRendererAndSceneState;
    resetRendererState: typeof resetRendererState;
    resetSceneState: typeof resetSceneState;
    restoreRendererAndSceneState: typeof restoreRendererAndSceneState;
    restoreRendererState: typeof restoreRendererState;
    restoreSceneState: typeof restoreSceneState;
    saveRendererAndSceneState: typeof saveRendererAndSceneState;
    saveRendererState: typeof saveRendererState;
    saveSceneState: typeof saveSceneState;
}>;
import { RepeatWrapping } from './three.core.js';
import { ReplaceStencilOp } from './three.core.js';
import { ReverseSubtractEquation } from './three.core.js';
/**
 * Applies a rotation to the given position node.
 *
 * @augments TempNode
 */
export class RotateNode extends TempNode {
    /**
     * Constructs a new rotate node.
     *
     * @param {Node} positionNode - The position node.
     * @param {Node} rotationNode - Represents the rotation that is applied to the position node. Depending
     * on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     */
    constructor(positionNode: Node, rotationNode: Node);
    /**
     * The position node.
     *
     * @type {Node}
     */
    positionNode: Node;
    /**
     *  Represents the rotation that is applied to the position node.
     *  Depending on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     *
     * @type {Node}
     */
    rotationNode: Node;
    /**
     * The type of the {@link RotateNode#positionNode} defines the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node's type.
     */
    generateNodeType(builder: NodeBuilder): string;
    setup(builder: any): any;
}
import { SIGNED_R11_EAC_Format } from './three.core.js';
import { SIGNED_RED_GREEN_RGTC2_Format } from './three.core.js';
import { SIGNED_RED_RGTC1_Format } from './three.core.js';
import { SIGNED_RG11_EAC_Format } from './three.core.js';
import { SRGBColorSpace } from './three.core.js';
import { SRGBTransfer } from './three.core.js';
/**
 * Class representing a node that samples a value using a provided callback function.
 *
 * @extends Node
 */
export class SampleNode extends Node {
    /**
     * Creates an instance of SampleNode.
     *
     * @param {Function} callback - The function to be called when sampling. Should accept a UV node and return a value.
     * @param {?Node<vec2>} [uvNode=null] - The UV node to be used in the texture sampling.
     */
    constructor(callback: Function, uvNode?: Node<any> | null);
    callback: Function;
    /**
     * Represents the texture coordinates.
     *
     * @type {?Node<vec2|vec3>}
     * @default null
     */
    uvNode: Node<any | any> | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampleNode: boolean;
    /**
     * Sets up the node by sampling with the default UV accessor.
     *
     * @returns {Node} The result of the callback function when called with the UV node.
     */
    setup(): Node;
    /**
     * Calls the callback function with the provided UV node.
     *
     * @param {Node<vec2>} uv - The UV node or value to be passed to the callback.
     * @returns {Node} The result of the callback function.
     */
    sample(uv: Node<any>): Node;
}
import { Scene } from './three.core.js';
/**
 * This node provides a collection of screen related metrics.
 * Depending on {@link ScreenNode#scope}, the nodes can represent
 * resolution or viewport data as well as fragment or uv coordinates.
 *
 * @augments Node
 */
export class ScreenNode extends Node {
    /**
     * Constructs a new screen node.
     *
     * @param {('coordinate'|'viewport'|'size'|'uv'|'dpr')} scope - The node's scope.
     */
    constructor(scope: ("coordinate" | "viewport" | "size" | "uv" | "dpr"));
    /**
     * The node represents different metric depending on which scope is selected.
     *
     * - `ScreenNode.COORDINATE`: Window-relative coordinates of the current fragment according to WebGPU standards.
     * - `ScreenNode.VIEWPORT`: The current viewport defined as a four-dimensional vector.
     * - `ScreenNode.SIZE`: The dimensions of the current bound framebuffer.
     * - `ScreenNode.UV`: Normalized coordinates.
     * - `ScreenNode.DPR`: Device pixel ratio.
     *
     * @type {('coordinate'|'viewport'|'size'|'uv'|'dpr')}
     */
    scope: ("coordinate" | "viewport" | "size" | "uv" | "dpr");
    /**
     * This output node.
     *
     * @private
     * @type {?Node}
     * @default null
     */
    private _output;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isViewportNode: boolean;
    /**
     * This method is overwritten since the node type depends on the selected scope.
     *
     * @return {('float'|'vec2'|'vec4')} The node type.
     */
    generateNodeType(): ("float" | "vec2" | "vec4");
    /**
     * `ScreenNode` implements {@link Node#update} to retrieve viewport and size information
     * from the current renderer.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update({ renderer }: NodeFrame): void;
    setup(): any;
    generate(builder: any): any;
}
export namespace ScreenNode {
    let COORDINATE: string;
    let VIEWPORT: string;
    let SIZE: string;
    let UV: string;
    let DPR: string;
}
/**
 * This module is part of the TSL core and usually not used in app level code.
 * `SetNode` represents a set operation which means it is used to implement any
 * `setXYZW()`, `setRGBA()` and `setSTPQ()` method invocations on node objects.
 * For example:
 * ```js
 * materialLine.colorNode = color( 0, 0, 0 ).setR( float( 1 ) );
 * ```
 *
 * @augments TempNode
 */
export class SetNode extends TempNode {
    /**
     * Constructs a new set node.
     *
     * @param {Node} sourceNode - The node that should be updated.
     * @param {string} components - The components that should be updated.
     * @param {Node} targetNode - The value node.
     */
    constructor(sourceNode: Node, components: string, targetNode: Node);
    /**
     * The node that should be updated.
     *
     * @type {Node}
     */
    sourceNode: Node;
    /**
     * The components that should be updated.
     *
     * @type {string}
     */
    components: string;
    /**
     * The value node.
     *
     * @type {Node}
     */
    targetNode: Node;
    /**
     * This method is overwritten since the node type is inferred from {@link SetNode#sourceNode}.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    generate(builder: any): string;
}
/**
 * Base class for all shadow nodes.
 *
 * Shadow nodes encapsulate shadow related logic and are always coupled to lighting nodes.
 * Lighting nodes might share the same shadow node type or use specific ones depending on
 * their requirements.
 *
 * @augments Node
 */
export class ShadowBaseNode extends Node {
    /**
     * Constructs a new shadow base node.
     *
     * @param {Light} light - The shadow casting light.
     */
    constructor(light: Light);
    /**
     * The shadow casting light.
     *
     * @type {Light}
     */
    light: Light;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowBaseNode: boolean;
    /**
     * Setups the shadow position node which is by default the predefined TSL node object `shadowPositionWorld`.
     *
     * @param {NodeBuilder} object - A configuration object that must at least hold a material reference.
     */
    setupShadowPosition({ context, material }: NodeBuilder): void;
}
import { ShadowMaterial } from './three.core.js';
/**
 * Represents the default shadow implementation for lighting nodes.
 *
 * @augments ShadowBaseNode
 */
export class ShadowNode extends ShadowBaseNode {
    /**
     * Constructs a new shadow node.
     *
     * @param {Light} light - The shadow casting light.
     * @param {?LightShadow} [shadow=null] - An optional light shadow.
     */
    constructor(light: Light, shadow?: LightShadow | null);
    /**
     * The light shadow which defines the properties light's
     * shadow.
     *
     * @type {?LightShadow}
     * @default null
     */
    shadow: LightShadow | null;
    /**
     * A reference to the shadow map which is a render target.
     *
     * @type {?RenderTarget}
     * @default null
     */
    shadowMap: RenderTarget | null;
    /**
     * Only relevant for VSM shadows. Render target for the
     * first VSM render pass.
     *
     * @type {?RenderTarget}
     * @default null
     */
    vsmShadowMapVertical: RenderTarget | null;
    /**
     * Only relevant for VSM shadows. Render target for the
     * second VSM render pass.
     *
     * @type {?RenderTarget}
     * @default null
     */
    vsmShadowMapHorizontal: RenderTarget | null;
    /**
     * Only relevant for VSM shadows. Node material which
     * is used to render the first VSM pass.
     *
     * @type {?NodeMaterial}
     * @default null
     */
    vsmMaterialVertical: NodeMaterial | null;
    /**
     * Only relevant for VSM shadows. Node material which
     * is used to render the second VSM pass.
     *
     * @type {?NodeMaterial}
     * @default null
     */
    vsmMaterialHorizontal: NodeMaterial | null;
    /**
     * A reference to the output node which defines the
     * final result of this shadow node.
     *
     * @type {?Node}
     * @private
     * @default null
     */
    private _node;
    /**
     * The current shadow map type of this shadow node.
     *
     * @type {?number}
     * @private
     * @default null
     */
    private _currentShadowType;
    /**
     * A Weak Map holding the current frame ID per camera. Used
     * to control the update of shadow maps.
     *
     * @type {WeakMap<Camera,number>}
     * @private
     */
    private _cameraFrameId;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowNode: boolean;
    /**
     * This index can be used when overriding setupRenderTarget with a RenderTarget Array to specify the depth layer.
     *
     * @type {number}
     * @readonly
     * @default true
     */
    readonly depthLayer: number;
    /**
     * Setups the shadow filtering.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Object} inputs - A configuration object that defines the shadow filtering.
     * @param {Function} inputs.filterFn - This function defines the filtering type of the shadow map e.g. PCF.
     * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's texture data.
     * @param {Node<vec3>} inputs.shadowCoord - Shadow coordinates which are used to sample from the shadow map.
     * @param {LightShadow} inputs.shadow - The light shadow.
     * @return {Node<float>} The result node of the shadow filtering.
     */
    setupShadowFilter(builder: NodeBuilder, { filterFn, depthTexture, shadowCoord, shadow, depthLayer }: {
        filterFn: Function;
        depthTexture: DepthTexture;
        shadowCoord: Node<any>;
        shadow: LightShadow;
    }): Node<any>;
    /**
     * Setups the shadow coordinates.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Node<vec3>} shadowPosition - A node representing the shadow position.
     * @return {Node<vec3>} The shadow coordinates.
     */
    setupShadowCoord(builder: NodeBuilder, shadowPosition: Node<any>): Node<any>;
    /**
     * Returns the shadow filtering function for the given shadow type.
     *
     * @param {number} type - The shadow type.
     * @return {Function} The filtering function.
     */
    getShadowFilterFn(type: number): Function;
    setupRenderTarget(shadow: any, builder: any): {
        shadowMap: any;
        depthTexture: DepthTexture;
    };
    /**
     * Setups the shadow output node.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<vec3>} The shadow output node.
     */
    setupShadow(builder: NodeBuilder): Node<any>;
    /**
     * The implementation performs the setup of the output node. An output is only
     * produces if shadow mapping is globally enabled in the renderer.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {ShaderCallNodeInternal} The output node.
     */
    setup(builder: NodeBuilder): ShaderCallNodeInternal;
    /**
     * Renders the shadow. The logic of this function could be included
     * into {@link ShadowNode#updateShadow} however more specialized shadow
     * nodes might require a custom shadow map rendering. By having a
     * dedicated method, it's easier to overwrite the default behavior.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    renderShadow(frame: NodeFrame): void;
    /**
     * Updates the shadow.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateShadow(frame: NodeFrame): void;
    _depthVersionCached: number | undefined;
    /**
     * For VSM additional render passes are required.
     *
     * @param {Renderer} renderer - A reference to the current renderer.
     */
    vsmPass(renderer: Renderer): void;
    /**
     * Resets the resouce state of this shadow node.
     *
     * @private
     */
    private _reset;
    /**
     * The implementation performs the update of the shadow map if necessary.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore(frame: NodeFrame): void;
}
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
import { Sphere } from './three.core.js';
import { SphereGeometry } from './three.core.js';
/**
 * This module is part of the TSL core and usually not used in app level code.
 * `SplitNode` represents a property access operation which means it is
 * used to implement any `.xyzw`, `.rgba` and `stpq` usage on node objects.
 * For example:
 * ```js
 * const redValue = color.r;
 * ```
 *
 * @augments Node
 */
export class SplitNode extends Node {
    /**
     * Constructs a new split node.
     *
     * @param {Node} node - The node that should be accessed.
     * @param {string} [components='x'] - The components that should be accessed.
     */
    constructor(node: Node, components?: string);
    /**
     * The node that should be accessed.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The components that should be accessed.
     *
     * @type {string}
     */
    components: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSplitNode: boolean;
    /**
     * Returns the vector length which is computed based on the requested components.
     *
     * @return {number} The vector length.
     */
    getVectorLength(): number;
    /**
     * Returns the component type of the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The component type.
     */
    getComponentType(builder: NodeBuilder): string;
    /**
     * This method is overwritten since the node type is inferred from requested components.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
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
/**
 * Stack is a helper for Nodes that need to produce stack-based code instead of continuous flow.
 * They are usually needed in cases like `If`, `Else`.
 *
 * @augments Node
 */
export class StackNode extends Node {
    /**
     * Constructs a new stack node.
     *
     * @param {?StackNode} [parent=null] - The parent stack node.
     */
    constructor(parent?: StackNode | null);
    /**
     * List of nodes.
     *
     * @type {Array<Node>}
     */
    nodes: Array<Node>;
    /**
     * The output node.
     *
     * @type {?Node}
     * @default null
     */
    outputNode: Node | null;
    /**
     * The parent stack node.
     *
     * @type {?StackNode}
     * @default null
     */
    parent: StackNode | null;
    /**
     * The current conditional node.
     *
     * @private
     * @type {ConditionalNode}
     * @default null
     */
    private _currentCond;
    /**
     * The expression node. Only
     * relevant for Switch/Case.
     *
     * @private
     * @type {Node}
     * @default null
     */
    private _expressionNode;
    /**
     * The current node being processed.
     *
     * @private
     * @type {Node}
     * @default null
     */
    private _currentNode;
    /**
     * Stores additional data for nodes that are added to the stack.
     *
     * @private
     * @type {Map<Node, {delta: number}>}
     */
    private _nodeDataLibrary;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStackNode: boolean;
    getElementType(builder: any): string;
    generateNodeType(builder: any): string;
    getMemberType(builder: any, name: any): string;
    /**
     * Adds a node to this stack.
     *
     * @param {Node} node - The node to add.
     * @param {number} [index=-1] - The index of the node. If not specified, the node will be added to the end of the stack.
     * @return {StackNode} A reference to this stack node.
     */
    addToStack(node: Node, index?: number): StackNode;
    /**
     * Adds a node to the stack before the current node.
     *
     * @param {Node} node - The node to add.
     * @return {StackNode} A reference to this stack node.
     */
    addToStackBefore(node: Node): StackNode;
    /**
     * Represent an `if` statement in TSL.
     *
     * @param {Node} boolNode - Represents the condition.
     * @param {Function} method - TSL code which is executed if the condition evaluates to `true`.
     * @return {StackNode} A reference to this stack node.
     */
    If(boolNode: Node, method: Function): StackNode;
    /**
     * Represent an `elseif` statement in TSL.
     *
     * @param {Node} boolNode - Represents the condition.
     * @param {Function} method - TSL code which is executed if the condition evaluates to `true`.
     * @return {StackNode} A reference to this stack node.
     */
    ElseIf(boolNode: Node, method: Function): StackNode;
    /**
     * Represent an `else` statement in TSL.
     *
     * @param {Function} method - TSL code which is executed in the `else` case.
     * @return {StackNode} A reference to this stack node.
     */
    Else(method: Function): StackNode;
    /**
     * Represents a `switch` statement in TSL.
     *
     * @param {any} expression - Represents the expression.
     * @param {Function} method - TSL code which is executed if the condition evaluates to `true`.
     * @return {StackNode} A reference to this stack node.
     */
    Switch(expression: any): StackNode;
    /**
     * Represents a `case` statement in TSL. The TSL version accepts an arbitrary numbers of values.
     * The last parameter must be the callback method that should be executed in the `true` case.
     *
     * @param {...any} params - The values of the `Case()` statement as well as the callback method.
     * @return {StackNode} A reference to this stack node.
     */
    Case(...params: any[]): StackNode;
    /**
     * Represents the default code block of a Switch/Case statement.
     *
     * @param {Function} method - TSL code which is executed in the `else` case.
     * @return {StackNode} A reference to this stack node.
     */
    Default(method: Function): StackNode;
    setup(builder: any): any;
    build(builder: any, ...params: any[]): string | Node | null | undefined;
}
/**
 * Class representing a stack trace for debugging purposes.
 */
export class StackTrace {
    /**
     * Creates a StackTrace instance by capturing and filtering the current stack trace.
     *
     * @param {Error|string|null} stackMessage - An optional stack trace to use instead of capturing a new one.
     */
    constructor(stackMessage?: Error | string | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStackTrace: boolean;
    /**
     * The stack trace.
     *
     * @type {Array<{fn: string, file: string, line: number, column: number}>}
     */
    stack: Array<{
        fn: string;
        file: string;
        line: number;
        column: number;
    }>;
    /**
     * Returns a formatted location string of the top stack frame.
     *
     * @returns {string} The formatted stack trace message.
     */
    getLocation(): string;
    /**
     * Returns the full error message including the stack trace.
     *
     * @param {string} message - The error message.
     * @returns {string} The full error message with stack trace.
     */
    getError(message: string): string;
}
/**
 * This version of a node library represents the standard version
 * used in {@link WebGPURenderer}. It maps lights, tone mapping
 * techniques and materials to node-based implementations.
 *
 * @augments NodeLibrary
 */
export class StandardNodeLibrary extends NodeLibrary {
}
import { StaticDrawUsage } from './three.core.js';
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
     * Sets the size of the storage 3d texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     * @param {number} depth - The new depth of the storage texture.
     */
    setSize(width: number, height: number, depth: number): void;
}
/**
 * This class enables element access on instances of {@link StorageBufferNode}.
 * In most cases, it is indirectly used when accessing elements with the
 * {@link StorageBufferNode#element} method.
 *
 * ```js
 * const position = positionStorage.element( instanceIndex );
 * ```
 *
 * @augments ArrayElementNode
 */
export class StorageArrayElementNode extends ArrayElementNode {
    /**
     * Constructs storage buffer element node.
     *
     * @param {StorageBufferNode} storageBufferNode - The storage buffer node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(storageBufferNode: StorageBufferNode, indexNode: Node);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageArrayElementNode: boolean;
    /**
     * The storage buffer node.
     *
     * @param {Node} value
     * @type {StorageBufferNode}
     */
    set storageBufferNode(value: Node);
    get storageBufferNode(): Node;
    getMemberType(builder: any, name: any): any;
    setup(builder: any): Node | null;
    generate(builder: any, output: any): any;
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
/**
 * This special type of buffer attribute is intended for compute shaders.
 * In earlier three.js versions it was only possible to update attribute data
 * on the CPU via JavaScript and then upload the data to the GPU. With the
 * new material system and renderer it is now possible to use compute shaders
 * to compute the data for an attribute more efficiently on the GPU.
 *
 * The idea is to create an instance of this class and provide it as an input
 * to {@link StorageBufferNode}.
 *
 * Note: This type of buffer attribute can only be used with `WebGPURenderer`.
 *
 * @augments BufferAttribute
 */
export class StorageBufferAttribute extends BufferAttribute {
    /**
     * Constructs a new storage buffer attribute.
     *
     * @param {number|TypedArray} count - The item count. It is also valid to pass a typed array as an argument.
     * The subsequent parameters are then obsolete.
     * @param {number} itemSize - The item size.
     * @param {TypedArray.constructor} [typeClass=Float32Array] - A typed array constructor.
     */
    constructor(count: number | TypedArray, itemSize: number, typeClass?: TypedArray.constructor);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageBufferAttribute: boolean;
}
/**
 * This node is used in context of compute shaders and allows to define a
 * storage buffer for data. A typical workflow is to create instances of
 * this node with the convenience functions `attributeArray()` or `instancedArray()`,
 * setup up a compute shader that writes into the buffers and then convert
 * the storage buffers to attribute nodes for rendering.
 *
 * ```js
 * const positionBuffer = instancedArray( particleCount, 'vec3' ); // the storage buffer node
 *
 * const computeInit = Fn( () => { // the compute shader
 *
 * 	const position = positionBuffer.element( instanceIndex );
 *
 * 	// compute position data
 *
 * 	position.x = 1;
 * 	position.y = 1;
 * 	position.z = 1;
 *
 * } )().compute( particleCount );
 *
 * const particleMaterial = new THREE.SpriteNodeMaterial();
 * particleMaterial.positionNode = positionBuffer.toAttribute();
 *
 * renderer.computeAsync( computeInit );
 *
 * ```
 *
 * @augments BufferNode
 */
export class StorageBufferNode extends BufferNode {
    /**
     * Constructs a new storage buffer node.
     *
     * @param {StorageBufferAttribute|StorageInstancedBufferAttribute|BufferAttribute} value - The buffer data.
     * @param {?(string|Struct)} [bufferType=null] - The buffer type (e.g. `'vec3'`).
     * @param {number} [bufferCount=0] - The buffer count.
     */
    constructor(value: StorageBufferAttribute | StorageInstancedBufferAttribute | BufferAttribute, bufferType?: (string | Struct) | null, bufferCount?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageBufferNode: boolean;
    /**
     * The buffer struct type.
     *
     * @type {?StructTypeNode}
     * @default null
     */
    structTypeNode: StructTypeNode | null;
    /**
     * The access type of the texture node.
     *
     * @type {string}
     * @default 'readWrite'
     */
    access: string;
    /**
     * Whether the node is atomic or not.
     *
     * @type {boolean}
     * @default false
     */
    isAtomic: boolean;
    /**
     * Whether the node represents a PBO or not.
     * Only relevant for WebGL.
     *
     * @type {boolean}
     * @default false
     */
    isPBO: boolean;
    /**
     * A reference to the internal buffer attribute node.
     *
     * @private
     * @type {?BufferAttributeNode}
     * @default null
     */
    private _attribute;
    /**
     * A reference to the internal varying node.
     *
     * @private
     * @type {?VaryingNode}
     * @default null
     */
    private _varying;
    /**
     * This method is overwritten since the buffer data might be shared
     * and thus the hash should be shared as well.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * Enables element access with the given index node.
     *
     * @param {IndexNode} indexNode - The index node.
     * @return {StorageArrayElementNode} A node representing the element access.
     */
    element(indexNode: IndexNode): StorageArrayElementNode;
    /**
     * Defines whether this node is a PBO or not. Only relevant for WebGL.
     *
     * @param {boolean} value - The value so set.
     * @return {StorageBufferNode} A reference to this node.
     */
    setPBO(value: boolean): StorageBufferNode;
    /**
     * Returns the `isPBO` value.
     *
     * @return {boolean} Whether the node represents a PBO or not.
     */
    getPBO(): boolean;
    /**
     * Defines the node access.
     *
     * @param {string} value - The node access.
     * @return {StorageBufferNode} A reference to this node.
     */
    setAccess(value: string): StorageBufferNode;
    /**
     * Convenience method for configuring a read-only node access.
     *
     * @return {StorageBufferNode} A reference to this node.
     */
    toReadOnly(): StorageBufferNode;
    /**
     * Defines whether the node is atomic or not.
     *
     * @param {boolean} value - The atomic flag.
     * @return {StorageBufferNode} A reference to this node.
     */
    setAtomic(value: boolean): StorageBufferNode;
    /**
     * Convenience method for making this node atomic.
     *
     * @return {StorageBufferNode} A reference to this node.
     */
    toAtomic(): StorageBufferNode;
    /**
     * Returns attribute data for this storage buffer node.
     *
     * @return {{attribute: BufferAttributeNode, varying: VaryingNode}} The attribute data.
     */
    getAttributeData(): {
        attribute: BufferAttributeNode;
        varying: VaryingNode;
    };
    /**
     * This method is overwritten since the node type from the availability of storage buffers
     * and the attribute data.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    /**
     * Returns the type of a member of the struct.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member.
     * @return {string} The type of the member.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * Generates the code snippet of the storage buffer node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder): string;
}
/**
 * This special type of instanced buffer attribute is intended for compute shaders.
 * In earlier three.js versions it was only possible to update attribute data
 * on the CPU via JavaScript and then upload the data to the GPU. With the
 * new material system and renderer it is now possible to use compute shaders
 * to compute the data for an attribute more efficiently on the GPU.
 *
 * The idea is to create an instance of this class and provide it as an input
 * to {@link StorageBufferNode}.
 *
 * Note: This type of buffer attribute can only be used with `WebGPURenderer`.
 *
 * @augments InstancedBufferAttribute
 */
export class StorageInstancedBufferAttribute extends InstancedBufferAttribute {
    /**
     * Constructs a new storage instanced buffer attribute.
     *
     * @param {number|TypedArray} count - The item count. It is also valid to pass a typed array as an argument.
     * The subsequent parameters are then obsolete.
     * @param {number} itemSize - The item size.
     * @param {TypedArray.constructor} [typeClass=Float32Array] - A typed array constructor.
     */
    constructor(count: number | TypedArray, itemSize: number, typeClass?: TypedArray.constructor);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageInstancedBufferAttribute: boolean;
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
     * When `true`, mipmaps will be auto-generated after compute writes.
     * When `false`, mipmaps must be written manually via compute shaders.
     *
     * @type {boolean}
     * @default true
     */
    mipmapsAutoUpdate: boolean;
    /**
     * Sets the size of the storage texture.
     *
     * @param {number} width - The new width of the storage texture.
     * @param {number} height - The new height of the storage texture.
     */
    setSize(width: number, height: number): void;
}
/**
 * This special version of a texture node can be used to
 * write data into a 3D storage texture with a compute shader.
 *
 * @augments StorageTextureNode
 */
export class StorageTexture3DNode extends StorageTextureNode {
    /**
     * Constructs a new 3D storage texture node.
     *
     * @param {Storage3DTexture} value - The 3D storage texture.
     * @param {Node<vec3>} uvNode - The uv node.
     * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
     */
    constructor(value: Storage3DTexture, uvNode: Node<any>, storeNode?: Node | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTexture3DNode: boolean;
    /**
     * Overwritten with an empty implementation since the `updateMatrix` flag is ignored
     * for 3D textures. The uv transformation matrix is not applied to 3D textures.
     *
     * @param {boolean} value - The update toggle.
     */
    setUpdateMatrix(): void;
}
/**
 * This special version of a texture node can be used to
 * write data into a storage texture with a compute shader.
 *
 * ```js
 * const storageTexture = new THREE.StorageTexture( width, height );
 *
 * const computeTexture = Fn( ( { storageTexture } ) => {
 *
 * 	const posX = instanceIndex.mod( width );
 * 	const posY = instanceIndex.div( width );
 * 	const indexUV = uvec2( posX, posY );
 *
 * 	// generate RGB values
 *
 * 	const r = 1;
 * 	const g = 1;
 * 	const b = 1;
 *
 * 	textureStore( storageTexture, indexUV, vec4( r, g, b, 1 ) ).toWriteOnly();
 *
 * } );
 *
 * const computeNode = computeTexture( { storageTexture } ).compute( width * height );
 * renderer.computeAsync( computeNode );
 * ```
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments TextureNode
 */
export class StorageTextureNode extends TextureNode {
    /**
     * Constructs a new storage texture node.
     *
     * @param {StorageTexture} value - The storage texture.
     * @param {Node<vec2|vec3>} uvNode - The uv node.
     * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
     */
    constructor(value: StorageTexture, uvNode: Node<any | any>, storeNode?: Node | null);
    /**
     * The value node that should be stored in the texture.
     *
     * @type {?Node}
     * @default null
     */
    storeNode: Node | null;
    /**
     * The mip level to write to for storage textures.
     *
     * @type {number}
     * @default 0
     */
    mipLevel: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageTextureNode: boolean;
    /**
     * The access type of the texture node.
     *
     * @type {string}
     * @default 'writeOnly'
     */
    access: string;
    setup(builder: any): any;
    /**
     * Defines the node access.
     *
     * @param {string} value - The node access.
     * @return {StorageTextureNode} A reference to this node.
     */
    setAccess(value: string): StorageTextureNode;
    /**
     * Sets the mip level to write to.
     *
     * @param {number} level - The mip level.
     * @return {StorageTextureNode} A reference to this node.
     */
    setMipLevel(level: number): StorageTextureNode;
    /**
     * Generates the snippet for the storage texture.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} textureProperty - The texture property.
     * @param {string} uvSnippet - The uv snippet.
     * @param {?string} levelSnippet - The level snippet.
     * @param {?string} biasSnippet - The bias snippet.
     * @param {?string} depthSnippet - The depth snippet.
     * @param {?string} compareSnippet - The compare snippet.
     * @param {?Array<string>} gradSnippet - The grad snippet.
     * @param {?string} offsetSnippet - The offset snippet.
     * @return {string} The generated code snippet.
     */
    generateSnippet(builder: NodeBuilder, textureProperty: string, uvSnippet: string, levelSnippet: string | null, biasSnippet: string | null, depthSnippet: string | null, compareSnippet: string | null, gradSnippet: Array<string> | null, offsetSnippet: string | null): string;
    /**
     * Convenience method for configuring a read/write node access.
     *
     * @return {StorageTextureNode} A reference to this node.
     */
    toReadWrite(): StorageTextureNode;
    /**
     * Convenience method for configuring a read-only node access.
     *
     * @return {StorageTextureNode} A reference to this node.
     */
    toReadOnly(): StorageTextureNode;
    /**
     * Convenience method for configuring a write-only node access.
     *
     * @return {StorageTextureNode} A reference to this node.
     */
    toWriteOnly(): StorageTextureNode;
    /**
     * Stores a value in this storage texture at the given coordinates.
     *
     * @param {Node<vec2|vec3>} uvNode - The storage texture coordinates.
     * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
     * @return {StorageTextureNode} A storage texture node representing the store operation.
     */
    store(uvNode: Node<any | any>, storeNode?: Node | null): StorageTextureNode;
    /**
     * Generates the code snippet of the storage texture node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    generateStore(builder: NodeBuilder): void;
}
/**
 * StructNode allows to create custom structures with multiple members.
 * This can also be used to define structures in attribute and uniform data.
 *
 * ```js
 * // Define a custom struct
 * const BoundingBox = struct( { min: 'vec3', max: 'vec3' } );
 *
 * // Create a new instance of the struct
 * const bb = BoundingBox( vec3( 0 ), vec3( 1 ) ); // style 1
 * const bb = BoundingBox( { min: vec3( 0 ), max: vec3( 1 ) } ); // style 2
 *
 * // Access the struct members
 * const min = bb.get( 'min' );
 *
 * // Assign a new value to a member
 * min.assign( vec3() );
 * ```
 * @augments Node
 */
export class StructNode extends Node {
    constructor(structTypeNode: any, values: any);
    structTypeNode: any;
    values: any;
    isStructNode: boolean;
    generateNodeType(builder: any): any;
    getMemberType(builder: any, name: any): any;
    _getChildren(): Object[];
    generate(builder: any): any;
}
/**
 * Represents a struct type node in the node-based system.
 * This class is used to define and manage the layout and types of struct members.
 * It extends the base Node class and provides methods to get the length of the struct,
 * retrieve member types, and generate the struct type for a builder.
 *
 * @augments Node
 */
export class StructTypeNode extends Node {
    /**
     * Creates an instance of StructTypeNode.
     *
     * @param {Object} membersLayout - The layout of the members for the struct.
     * @param {?string} [name=null] - The optional name of the struct.
     */
    constructor(membersLayout: Object, name?: string | null);
    /**
     * The layout of the members for the struct
     *
     * @type {Array.<{name: string, type: string, atomic: boolean}>}
     */
    membersLayout: Array<{
        name: string;
        type: string;
        atomic: boolean;
    }>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStructTypeNode: boolean;
    /**
     * Returns the length of the struct in 4-byte elements (e.g. float or int components).
     * The length is calculated by summing the lengths of the struct's members, accounting for memory alignment.
     * To get the size in bytes, multiply the returned value by 4.
     *
     * @returns {number} The length of the struct in 4-byte elements.
     */
    getLength(): number;
    getMemberType(builder: any, name: any): string;
    generateNodeType(builder: any): any;
    setup(builder: any): void;
    generate(builder: any): string;
}
/**
 * This node is used to build a sub-build in the node system.
 *
 * @augments Node
 * @param {Node} node - The node to be built in the sub-build.
 * @param {string} name - The name of the sub-build.
 * @param {?string} [nodeType=null] - The type of the node, if known.
 */
export class SubBuildNode extends Node {
    constructor(node: any, name: any, nodeType?: null);
    /**
     * The node to be built in the sub-build.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSubBuildNode: boolean;
    generateNodeType(builder: any): string;
    build(builder: any, ...params: any[]): string | Node | null;
}
/**
 * This class represents a set of built in WGSL shader functions that sync
 * synchronously execute an operation across a subgroup, or 'warp', of compute
 * or fragment shader invocations within a workgroup. Typically, these functions
 * will synchronously execute an operation using data from all active invocations
 * within the subgroup, then broadcast that result to all active invocations. In
 * other graphics APIs, subgroup functions are also referred to as wave intrinsics
 * (DirectX/HLSL) or warp intrinsics (CUDA).
 *
 * @augments TempNode
 */
export class SubgroupFunctionNode extends TempNode {
    /**
     * Constructs a new function node.
     *
     * @param {string} method - The subgroup/wave intrinsic method to construct.
     * @param {Node} [aNode=null] - The method's first argument.
     * @param {Node} [bNode=null] - The method's second argument.
     */
    constructor(method: string, aNode?: Node, bNode?: Node);
    /**
     * The subgroup/wave intrinsic method to construct.
     *
     * @type {string}
     */
    method: string;
    /**
     * The method's first argument.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The method's second argument.
     *
     * @type {Node}
     */
    bNode: Node;
    getInputType(builder: any): string | null;
    generateNodeType(builder: any): string | null;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
export namespace SubgroupFunctionNode {
    let SUBGROUP_ELECT: string;
    let SUBGROUP_BALLOT: string;
    let SUBGROUP_ADD: string;
    let SUBGROUP_INCLUSIVE_ADD: string;
    let SUBGROUP_EXCLUSIVE_AND: string;
    let SUBGROUP_MUL: string;
    let SUBGROUP_INCLUSIVE_MUL: string;
    let SUBGROUP_EXCLUSIVE_MUL: string;
    let SUBGROUP_AND: string;
    let SUBGROUP_OR: string;
    let SUBGROUP_XOR: string;
    let SUBGROUP_MIN: string;
    let SUBGROUP_MAX: string;
    let SUBGROUP_ALL: string;
    let SUBGROUP_ANY: string;
    let SUBGROUP_BROADCAST_FIRST: string;
    let QUAD_SWAP_X: string;
    let QUAD_SWAP_Y: string;
    let QUAD_SWAP_DIAGONAL: string;
    let SUBGROUP_BROADCAST: string;
    let SUBGROUP_SHUFFLE: string;
    let SUBGROUP_SHUFFLE_XOR: string;
    let SUBGROUP_SHUFFLE_UP: string;
    let SUBGROUP_SHUFFLE_DOWN: string;
    let QUAD_BROADCAST: string;
}
import { SubtractEquation } from './three.core.js';
import { SubtractiveBlending } from './three.core.js';
export var TSL: Readonly<{
    __proto__: null;
    BRDF_GGX: () => void;
    BRDF_Lambert: () => void;
    BasicPointShadowFilter: () => void;
    BasicShadowFilter: () => void;
    Break: () => ExpressionNode;
    Const: (node: Node, name?: string | null) => VarNode;
    Continue: () => ExpressionNode;
    DFGLUT: () => void;
    D_GGX: any;
    Discard: (conditional: ConditionalNode | null) => Node;
    EPSILON: any;
    F_Schlick: () => void;
    Fn: typeof Fn;
    HALF_PI: any;
    INFINITY: any;
    If: (...params: any[]) => StackNode;
    Loop: (...params: any[]) => LoopNode;
    NodeAccess: {
        READ_ONLY: string;
        WRITE_ONLY: string;
        READ_WRITE: string;
    };
    NodeShaderStage: {
        VERTEX: string;
        FRAGMENT: string;
    };
    NodeType: {
        BOOLEAN: string;
        INTEGER: string;
        FLOAT: string;
        VECTOR2: string;
        VECTOR3: string;
        VECTOR4: string;
        MATRIX2: string;
        MATRIX3: string;
        MATRIX4: string;
    };
    NodeUpdateType: {
        NONE: string;
        FRAME: string;
        RENDER: string;
        OBJECT: string;
    };
    OnBeforeFrameUpdate: (callback: Function) => EventNode;
    OnBeforeMaterialUpdate: (callback: Function) => EventNode;
    OnBeforeObjectUpdate: (callback: Function) => EventNode;
    OnFrameUpdate: (callback: Function) => EventNode;
    OnMaterialUpdate: (callback: Function) => EventNode;
    OnObjectUpdate: (callback: Function) => EventNode;
    PCFShadowFilter: () => void;
    PCFSoftShadowFilter: () => void;
    PI: any;
    PI2: any;
    PointShadowFilter: () => void;
    Return: () => ExpressionNode;
    Schlick_to_F0: any;
    ShaderNode: typeof ShaderNode;
    Stack: typeof Stack;
    Switch: (...params: any[]) => StackNode;
    TBNViewMatrix: any;
    TWO_PI: any;
    VSMShadowFilter: () => void;
    V_GGX_SmithCorrelated: any;
    Var: (node: Node, name?: string | null) => VarNode;
    VarIntent: (node: Node) => VarNode;
    abs: any;
    acesFilmicToneMapping: any;
    acos: any;
    acosh: any;
    add: any;
    addMethodChaining: typeof addMethodChaining;
    addNodeElement: typeof addNodeElement;
    agxToneMapping: any;
    all: any;
    alphaT: any;
    ambientOcclusion: any;
    and: any;
    anisotropy: any;
    anisotropyB: any;
    anisotropyT: any;
    any: any;
    append: (node: Node) => Function;
    array: (...params: any[]) => ArrayNode;
    asin: any;
    asinh: any;
    assign: any;
    atan: any;
    atanh: any;
    atomicAdd: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicAnd: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicFunc: (method: string, pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicLoad: (pointerNode: Node) => AtomicFunctionNode;
    atomicMax: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicMin: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicOr: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicStore: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicSub: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    atomicXor: (pointerNode: Node, valueNode: Node) => AtomicFunctionNode;
    attenuationColor: any;
    attenuationDistance: any;
    attribute: (name: string, nodeType?: string | null) => AttributeNode;
    attributeArray: (count: number | TypedArray, type?: string | Struct) => StorageBufferNode;
    backgroundBlurriness: any;
    backgroundIntensity: any;
    backgroundRotation: any;
    batch: () => void;
    batchColor: any;
    bentNormalView: any;
    billboarding: () => void;
    bitAnd: any;
    bitNot: any;
    bitOr: any;
    bitXor: any;
    bitangentGeometry: any;
    bitangentLocal: any;
    bitangentView: any;
    bitangentWorld: any;
    bitcast: any;
    blendBurn: any;
    blendColor: any;
    blendDodge: any;
    blendOverlay: any;
    blendScreen: any;
    blur: () => void;
    bool: any;
    buffer: (value: Array<number>, type: string, count: number) => BufferNode;
    bufferAttribute: (array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number) => BufferAttributeNode | Node;
    builtin: any;
    builtinAOContext: typeof builtinAOContext;
    builtinShadowContext: typeof builtinShadowContext;
    bumpMap: any;
    bvec2: any;
    bvec3: any;
    bvec4: any;
    bypass: any;
    cache: typeof cache;
    call: (func: any, ...params: any[]) => FunctionCallNode;
    cameraFar: any;
    cameraIndex: any;
    cameraNear: any;
    cameraNormalMatrix: any;
    cameraPosition: any;
    cameraProjectionMatrix: any;
    cameraProjectionMatrixInverse: any;
    cameraViewMatrix: any;
    cameraViewport: any;
    cameraWorldMatrix: any;
    cbrt: (a: Node | number) => Node;
    cdl: () => void;
    ceil: any;
    checker: () => void;
    cineonToneMapping: any;
    clamp: (value: Node | number, low?: Node | number, high?: Node | number) => Node;
    clearcoat: any;
    clearcoatNormalView: any;
    clearcoatRoughness: any;
    clipSpace: any;
    code: any;
    color: any;
    colorSpaceToWorking: (node: Node, sourceColorSpace: string) => ColorSpaceNode;
    colorToDirection: (node: Node<any>) => Node<any>;
    compute: (node: Node, count: number | Array<number>, workgroupSize?: Array<number>) => ComputeNode;
    computeKernel: (node: Node, workgroupSize?: Array<number>) => ComputeNode;
    computeSkinning: () => void;
    context: (nodeOrValue?: Node | Object, value?: Object) => ContextNode;
    convert: (node: any, types: any) => ConvertNode;
    convertColorSpace: (node: Node, sourceColorSpace: string, targetColorSpace: string) => ColorSpaceNode;
    convertToTexture: (node: Node, ...params: any[]) => RTTNode;
    cos: any;
    cosh: any;
    countLeadingZeros: any;
    countOneBits: any;
    countTrailingZeros: any;
    cross: any;
    cubeTexture: (value?: (CubeTexture | CubeTextureNode) | null, uvNode?: Node<any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null) => CubeTextureNode;
    cubeTextureBase: any;
    dFdx: any;
    dFdy: any;
    dashSize: any;
    debug: (node: Node, callback?: Function | null) => DebugNode;
    decrement: () => void;
    decrementBefore: () => void;
    defaultBuildStages: string[];
    defaultShaderStages: string[];
    defined: typeof defined;
    degrees: any;
    deltaTime: any;
    densityFogFactor: () => void;
    depth: ViewportDepthNode;
    depthPass: (scene: Scene, camera: Camera, options: Object) => PassNode;
    determinant: any;
    difference: any;
    diffuseColor: any;
    diffuseContribution: any;
    directPointLight: ({ color, lightVector, cutoffDistance, decayExponent }: {
        color: any;
        lightVector: any;
        cutoffDistance: any;
        decayExponent: any;
    }) => {
        lightDirection: any;
        lightColor: any;
    };
    directionToColor: (node: Node<any>) => Node<any>;
    directionToFaceDirection: (vector: Node<any>) => Node<any>;
    dispersion: any;
    disposeShadowMaterial: (light: Light) => void;
    distance: any;
    div: any;
    dot: any;
    drawIndex: IndexNode;
    dynamicBufferAttribute: (array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number) => BufferAttributeNode | Node;
    element: any;
    emissive: any;
    equal: any;
    equirectDirection: () => void;
    equirectUV: () => void;
    exp: any;
    exp2: any;
    exponentialHeightFogFactor: () => void;
    expression: any;
    faceDirection: any;
    faceForward: any;
    faceforward: any;
    float: any;
    floatBitsToInt: (value: Node<any>) => BitcastNode;
    floatBitsToUint: (value: Node<any>) => BitcastNode;
    floor: any;
    fog: () => void;
    fract: any;
    frameGroup: UniformGroupNode;
    frameId: any;
    frontFacing: any;
    fwidth: any;
    gain: (x: Node<any>, k: Node<any>) => Node<any>;
    gapSize: any;
    getConstNodeType: (value: any) => any;
    getCurrentStack: () => any;
    getDirection: any;
    getDistanceAttenuation: () => void;
    getGeometryRoughness: () => void;
    getNormalFromDepth: () => void;
    getParallaxCorrectNormal: () => void;
    getRoughness: () => void;
    getScreenPosition: () => void;
    getShIrradianceAt: () => void;
    getShadowMaterial: (light: Light) => NodeMaterial;
    getShadowRenderObjectFunction: (renderer: Renderer, shadow: LightShadow, shadowType: number, useVelocity: boolean) => shadowRenderObjectFunction;
    getTextureIndex: typeof getTextureIndex;
    getViewPosition: () => void;
    ggxConvolution: () => void;
    globalId: any;
    glsl: (src: string, includes: Array<Node>) => CodeNode;
    glslFn: (code: any, includes: any) => any;
    grayscale: () => void;
    greaterThan: any;
    greaterThanEqual: any;
    hash: () => void;
    highpModelNormalViewMatrix: any;
    highpModelViewMatrix: any;
    hue: () => void;
    increment: () => void;
    incrementBefore: () => void;
    inspector: typeof inspector;
    instance: () => void;
    instanceColor: any;
    instanceIndex: IndexNode;
    instancedArray: (count: number | TypedArray, type?: string | Struct) => StorageBufferNode;
    instancedBufferAttribute: (array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number) => BufferAttributeNode | Node;
    instancedDynamicBufferAttribute: (array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number) => BufferAttributeNode | Node;
    instancedMesh: () => void;
    int: any;
    intBitsToFloat: (value: Node<any>) => BitcastNode;
    interleavedGradientNoise: any;
    inverse: any;
    inverseSqrt: any;
    inversesqrt: any;
    invocationLocalIndex: IndexNode;
    invocationSubgroupIndex: IndexNode;
    ior: any;
    iridescence: any;
    iridescenceIOR: any;
    iridescenceThickness: any;
    isolate: (node: Node) => IsolateNode;
    ivec2: any;
    ivec3: any;
    ivec4: any;
    js: (src: string, includes: Array<Node>) => CodeNode;
    label: typeof label;
    length: any;
    lengthSq: (a: Node<any | any | any>) => Node<any>;
    lessThan: any;
    lessThanEqual: any;
    lightPosition: typeof lightPosition;
    lightProjectionUV: typeof lightProjectionUV;
    lightShadowMatrix: typeof lightShadowMatrix;
    lightTargetDirection: (light: Light) => Node<any>;
    lightTargetPosition: typeof lightTargetPosition;
    lightViewPosition: typeof lightViewPosition;
    lightingContext: any;
    lights: (lights?: Array<Light>) => LightsNode;
    linearDepth: any;
    linearToneMapping: any;
    localId: any;
    log: any;
    log2: any;
    logarithmicDepthToViewZ: (depth: Node<any>, near: Node<any>, far: Node<any>) => Node<any>;
    luminance: (color: Node<any>, luminanceCoefficients?: Node<any> | null) => Node<any>;
    mat2: any;
    mat3: any;
    mat4: any;
    matcapUV: any;
    materialAO: any;
    materialAlphaTest: any;
    materialAnisotropy: any;
    materialAnisotropyVector: any;
    materialAttenuationColor: any;
    materialAttenuationDistance: any;
    materialClearcoat: any;
    materialClearcoatNormal: any;
    materialClearcoatRoughness: any;
    materialColor: any;
    materialDispersion: any;
    materialEmissive: any;
    materialEnvIntensity: any;
    materialEnvRotation: any;
    materialIOR: any;
    materialIridescence: any;
    materialIridescenceIOR: any;
    materialIridescenceThickness: any;
    materialLightMap: any;
    materialLineDashOffset: any;
    materialLineDashSize: any;
    materialLineGapSize: any;
    materialLineScale: any;
    materialLineWidth: any;
    materialMetalness: any;
    materialNormal: any;
    materialOpacity: any;
    materialPointSize: any;
    materialReference: (name: string, type: string, material?: Material | null) => MaterialReferenceNode;
    materialReflectivity: any;
    materialRefractionRatio: any;
    materialRotation: any;
    materialRoughness: any;
    materialSheen: any;
    materialSheenRoughness: any;
    materialShininess: any;
    materialSpecular: any;
    materialSpecularColor: any;
    materialSpecularIntensity: any;
    materialSpecularStrength: any;
    materialThickness: any;
    materialTransmission: any;
    max: any;
    maxMipLevel: any;
    mediumpModelViewMatrix: any;
    metalness: any;
    min: any;
    mix: any;
    mixElement: (t: Node | number, e1: Node | number, e2: Node | number) => Node;
    mod: any;
    modelDirection: any;
    modelNormalMatrix: any;
    modelPosition: any;
    modelRadius: any;
    modelScale: any;
    modelViewMatrix: any;
    modelViewPosition: any;
    modelViewProjection: any;
    modelWorldMatrix: any;
    modelWorldMatrixInverse: any;
    morphReference: () => void;
    mrt: any;
    mul: any;
    mx_aastep: (threshold: any, value: any) => any;
    mx_add: (in1: any, in2?: any) => any;
    mx_atan2: (in1?: any, in2?: any) => any;
    mx_cell_noise_float: (texcoord?: any) => any;
    mx_contrast: (input: any, amount?: number, pivot?: number) => any;
    mx_divide: (in1: any, in2?: any) => any;
    mx_fractal_noise_float: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_vec2: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_vec3: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_vec4: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_frame: () => any;
    mx_heighttonormal: (input: any, scale: any) => any;
    mx_hsvtorgb: any;
    mx_ifequal: (value1: any, value2: any, in1: any, in2: any) => any;
    mx_ifgreater: (value1: any, value2: any, in1: any, in2: any) => any;
    mx_ifgreatereq: (value1: any, value2: any, in1: any, in2: any) => any;
    mx_invert: (in1: any, amount?: any) => any;
    mx_modulo: (in1: any, in2?: any) => any;
    mx_multiply: (in1: any, in2?: any) => any;
    mx_noise_float: (texcoord?: any, amplitude?: number, pivot?: number) => any;
    mx_noise_vec3: (texcoord?: any, amplitude?: number, pivot?: number) => any;
    mx_noise_vec4: (texcoord?: any, amplitude?: number, pivot?: number) => any;
    mx_place2d: (texcoord: any, pivot?: any, scale?: any, rotate?: any, offset?: any) => any;
    mx_power: (in1: any, in2?: any) => any;
    mx_ramp4: (valuetl: any, valuetr: any, valuebl: any, valuebr: any, texcoord?: any) => any;
    mx_ramplr: (valuel: any, valuer: any, texcoord?: any) => any;
    mx_ramptb: (valuet: any, valueb: any, texcoord?: any) => any;
    mx_rgbtohsv: any;
    mx_rotate2d: (input: any, amount: any) => any;
    mx_rotate3d: (input: any, amount: any, axis: any) => any;
    mx_safepower: (in1: any, in2?: number) => any;
    mx_separate: (in1: any, channelOrOut?: null) => any;
    mx_splitlr: (valuel: any, valuer: any, center: any, texcoord?: any) => any;
    mx_splittb: (valuet: any, valueb: any, center: any, texcoord?: any) => any;
    mx_srgb_texture_to_lin_rec709: any;
    mx_subtract: (in1: any, in2?: any) => any;
    mx_timer: () => any;
    mx_transform_uv: (uv_scale?: number, uv_offset?: number, uv_geo?: any) => any;
    mx_unifiednoise2d: (noiseType: any, texcoord?: any, freq?: any, offset?: any, jitter?: number, outmin?: number, outmax?: number, clampoutput?: boolean, octaves?: number, lacunarity?: number, diminish?: number) => any;
    mx_unifiednoise3d: (noiseType: any, texcoord?: any, freq?: any, offset?: any, jitter?: number, outmin?: number, outmax?: number, clampoutput?: boolean, octaves?: number, lacunarity?: number, diminish?: number) => any;
    mx_worley_noise_float: (texcoord?: any, jitter?: number) => any;
    mx_worley_noise_vec2: (texcoord?: any, jitter?: number) => any;
    mx_worley_noise_vec3: (texcoord?: any, jitter?: number) => any;
    negate: any;
    negateOnBackSide: () => void;
    neutralToneMapping: any;
    nodeArray: (val: any, altType?: null) => any;
    nodeImmutable: (NodeClass: any, ...params: any[]) => any;
    nodeObject: (val: any, altType?: null) => any;
    nodeObjectIntent: (val: any, altType?: null) => any;
    nodeObjects: (val: any, altType?: null) => any;
    nodeProxy: (NodeClass: any, scope?: null, factor?: null, settings?: null) => any;
    nodeProxyConstructor: (constructorFunction: any, nodeInstance: any) => any;
    nodeProxyIntent: (NodeClass: any, scope?: null, factor?: null, settings?: {}) => any;
    normalFlat: any;
    normalGeometry: any;
    normalLocal: any;
    normalMap: any;
    normalView: any;
    normalViewGeometry: any;
    normalWorld: any;
    normalWorldGeometry: any;
    normalize: any;
    not: any;
    notEqual: any;
    numWorkgroups: any;
    objectDirection: any;
    objectGroup: UniformGroupNode;
    objectPosition: any;
    objectRadius: any;
    objectScale: any;
    objectViewPosition: any;
    objectWorldMatrix: any;
    oneMinus: any;
    or: any;
    orthographicDepthToViewZ: () => void;
    oscSawtooth: (t?: Node<any>) => Node<any>;
    oscSine: (t?: Node<any>) => Node<any>;
    oscSquare: (t?: Node<any>) => Node<any>;
    oscTriangle: (t?: Node<any>) => Node<any>;
    output: any;
    outputStruct: any;
    overloadingFn: (functionNodes: Array<Function>) => FunctionOverloadingNode;
    overrideNode: typeof overrideNode;
    overrideNodes: typeof overrideNodes;
    packHalf2x16: any;
    packNormalToRGB: (node: Node<any>) => Node<any>;
    packSnorm2x16: any;
    packUnorm2x16: any;
    parabola: (x: Node<any>, k: Node<any>) => Node<any>;
    parallaxDirection: any;
    parallaxUV: (uv: Node<any>, scale: Node<any>) => Node<any>;
    parameter: (type: string, name: string | null) => ParameterNode;
    pass: (scene: Scene, camera: Camera, options: Object) => PassNode;
    passTexture: (pass: PassNode, texture: Texture) => PassTextureNode;
    pcurve: (x: Node<any>, a: Node<any>, b: Node<any>) => Node<any>;
    perspectiveDepthToViewZ: () => void;
    pmremTexture: any;
    pointShadow: (light: PointLight, shadow?: PointLightShadow | null) => PointShadowNode;
    pointUV: PointUVNode;
    pointWidth: any;
    positionGeometry: any;
    positionLocal: any;
    positionPrevious: any;
    positionView: any;
    positionViewDirection: any;
    positionWorld: any;
    positionWorldDirection: any;
    posterize: () => void;
    pow: any;
    pow2: (x: Node | number) => Node;
    pow3: (x: Node | number) => Node;
    pow4: (x: Node | number) => Node;
    premultiplyAlpha: () => void;
    property: (type: string, name?: string | null, placeholderNode?: Node | null) => PropertyNode;
    quadBroadcast: any;
    quadSwapDiagonal: any;
    quadSwapX: any;
    quadSwapY: any;
    radians: any;
    rand: () => void;
    range: any;
    rangeFogFactor: () => void;
    reciprocal: any;
    reference: (name: string, type: string, object?: Object | null) => ReferenceNode;
    referenceBuffer: (name: string, type: string, count: number, object: Object) => ReferenceNode;
    reflect: any;
    reflectVector: any;
    reflectView: any;
    reflector: (parameters?: {
        target?: Object3D | undefined;
        resolution?: number | undefined;
        generateMipmaps?: boolean | undefined;
        bounces?: boolean | undefined;
        depth?: boolean | undefined;
        samples?: number | undefined;
        defaultTexture?: TextureNode | undefined;
        reflector?: ReflectorBaseNode | undefined;
    }) => ReflectorNode;
    refract: any;
    refractVector: any;
    refractView: any;
    reinhardToneMapping: any;
    remap: () => void;
    remapClamp: typeof remapClamp;
    renderGroup: UniformGroupNode;
    renderOutput: (color: Node, toneMapping?: number | null, outputColorSpace?: string | null) => RenderOutputNode;
    rendererReference: (name: string, type: string, renderer?: Renderer | null) => RendererReferenceNode;
    replaceDefaultUV: typeof replaceDefaultUV;
    rotate: any;
    rotateUV: () => void;
    roughness: any;
    round: any;
    rtt: (node: Node, ...params: any[]) => RTTNode;
    sRGBTransferEOTF: any;
    sRGBTransferOETF: any;
    sample: (callback: Function, uv?: Node<any> | null) => SampleNode;
    sampler: (value: TextureNode | Texture) => Node;
    samplerComparison: (value: TextureNode | Texture) => Node;
    saturate: (value: Node | number) => Node;
    saturation: () => void;
    screenCoordinate: any;
    screenDPR: any;
    screenSize: any;
    screenUV: any;
    select: any;
    setCurrentStack: (stack: any) => void;
    setName: (node: Node, name: string) => ContextNode;
    shaderStages: string[];
    shadow: (light: Light, shadow?: LightShadow | null) => ShadowNode;
    shadowPositionWorld: any;
    shapeCircle: () => void;
    sharedUniformGroup: (name: string, order?: number, updateType?: null) => UniformGroupNode;
    sheen: any;
    sheenRoughness: any;
    shiftLeft: any;
    shiftRight: any;
    shininess: any;
    sign: any;
    sin: any;
    sinc: (x: Node<any>, k: Node<any>) => Node<any>;
    sinh: any;
    skinning: () => void;
    smoothstep: any;
    smoothstepElement: (x: Node | number, low: Node | number, high: Node | number) => Node;
    specularColor: any;
    specularColorBlended: any;
    specularF90: any;
    spherizeUV: () => void;
    split: (node: any, channels: any) => SplitNode;
    spritesheetUV: () => void;
    sqrt: any;
    stack: any;
    step: any;
    stepElement: (x: Node | number, edge: Node | number) => Node;
    storage: (value: StorageBufferAttribute | StorageInstancedBufferAttribute | BufferAttribute, type?: (string | Struct) | null, count?: number) => StorageBufferNode;
    storageBarrier: () => BarrierNode;
    storageTexture: any;
    storageTexture3D: any;
    struct: (membersLayout: Object, name?: string | null) => Function;
    sub: any;
    subBuild: (node: Node, name: string, type?: string | null) => Node;
    subgroupAdd: any;
    subgroupAll: any;
    subgroupAnd: any;
    subgroupAny: any;
    subgroupBallot: any;
    subgroupBroadcast: any;
    subgroupBroadcastFirst: any;
    subgroupElect: any;
    subgroupExclusiveAdd: any;
    subgroupExclusiveMul: any;
    subgroupInclusiveAdd: any;
    subgroupInclusiveMul: any;
    subgroupIndex: IndexNode;
    subgroupMax: any;
    subgroupMin: any;
    subgroupMul: any;
    subgroupOr: any;
    subgroupShuffle: any;
    subgroupShuffleDown: any;
    subgroupShuffleUp: any;
    subgroupShuffleXor: any;
    subgroupSize: any;
    subgroupXor: any;
    tan: any;
    tangentGeometry: any;
    tangentLocal: any;
    tangentView: any;
    tangentWorld: any;
    tanh: any;
    texture: (value?: (Texture | TextureNode) | null, uvNode?: Node<any | any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null) => TextureNode;
    texture3D: any;
    texture3DLevel: (value?: (Texture | TextureNode) | null, uvNode?: Node<any> | null, levelNode?: Node<any> | null) => TextureNode;
    texture3DLoad: (...params: any[]) => TextureNode;
    textureBarrier: () => BarrierNode;
    textureBicubic: () => void;
    textureBicubicLevel: () => void;
    textureCubeUV: () => void;
    textureLevel: (value: any, uv: any, level: any) => TextureNode;
    textureLoad: (...params: any[]) => TextureNode;
    textureSize: any;
    textureStore: (value: StorageTexture | StorageTextureNode, uvNode: Node<any | any>, storeNode?: Node | null) => StorageTextureNode;
    thickness: any;
    time: any;
    toneMapping: (mapping: number, exposure: Node<any> | number, color: Node<any> | Color) => ToneMappingNode<any>;
    toneMappingExposure: any;
    toonOutlinePass: (scene: Scene, camera: Camera, color?: Color, thickness?: number, alpha?: number) => ToonOutlinePassNode;
    transformDirection: any;
    transformNormal: () => void;
    transformNormalByInverseViewMatrix: (normal: Node<any>, viewMatrix: Node<any | any>) => Node<any>;
    transformNormalByViewMatrix: (normal: Node<any>, viewMatrix: Node<any | any>) => Node<any>;
    transformNormalToView: () => void;
    transformedClearcoatNormalView: any;
    transformedNormalView: any;
    transformedNormalWorld: any;
    transmission: any;
    transpose: any;
    triNoise3D: any;
    triplanarTexture: (...params: any[]) => Node<any>;
    triplanarTextures: () => void;
    trunc: any;
    uint: any;
    uintBitsToFloat: (value: Node<any>) => BitcastNode;
    uniform: (value: any | string, type?: string) => UniformNode;
    uniformArray: (values: Array<any>, nodeType?: string | null) => UniformArrayNode;
    uniformCubeTexture: (value?: CubeTexture | null) => CubeTextureNode;
    uniformFlow: (node: Node) => ContextNode;
    uniformGroup: (name: string, order?: number, updateType?: null) => UniformGroupNode;
    uniformTexture: (value?: Texture | null) => TextureNode;
    unpackHalf2x16: any;
    unpackNormal: (xy: Node<any>) => Node<any>;
    unpackRGBToNormal: (node: Node<any>) => Node<any>;
    unpackSnorm2x16: any;
    unpackUnorm2x16: any;
    unpremultiplyAlpha: () => void;
    userData: (name: string, inputType: string, userData: Object | null) => UserDataNode;
    uv: (index?: number) => AttributeNode<any>;
    uvec2: any;
    uvec3: any;
    uvec4: any;
    varying: any;
    varyingProperty: (type: string, name?: string | null, placeholderNode?: Node | null) => PropertyNode;
    vec2: any;
    vec3: any;
    vec4: any;
    vectorComponents: string[];
    velocity: VelocityNode;
    vertexColor: (index?: number) => VertexColorNode;
    vertexIndex: IndexNode;
    vertexStage: (node: Node) => VaryingNode;
    vibrance: () => void;
    viewZToLogarithmicDepth: (viewZ: Node<any>, near: Node<any>, far: Node<any>) => Node<any>;
    viewZToOrthographicDepth: (viewZ: Node<any>, near: Node<any>, far: Node<any>) => Node<any>;
    viewZToPerspectiveDepth: (viewZ: Node<any>, near: Node<any>, far: Node<any>) => Node<any>;
    viewZToReversedOrthographicDepth: (viewZ: Node<any>, near: Node<any>, far: Node<any>) => Node<any>;
    viewZToReversedPerspectiveDepth: (viewZ: Node<any>, near: Node<any>, far: Node<any>) => Node<any>;
    viewport: any;
    viewportCoordinate: any;
    viewportDepthTexture: any;
    viewportLinearDepth: ViewportDepthNode;
    viewportMipTexture: any;
    viewportOpaqueMipTexture: (uv?: Node | null, level?: Node | null) => ViewportTextureNode;
    viewportResolution: any;
    viewportSafeUV: () => void;
    viewportSharedTexture: any;
    viewportSize: any;
    viewportTexture: any;
    viewportUV: any;
    vogelDiskSample: any;
    wgsl: (src: string, includes: Array<Node>) => CodeNode;
    wgslFn: (code: any, includes: any) => any;
    workgroupArray: (type: string, count?: number) => WorkgroupInfoNode;
    workgroupBarrier: () => BarrierNode;
    workgroupId: any;
    workingToColorSpace: (node: Node, targetColorSpace: string) => ColorSpaceNode;
    xor: any;
}>;
import { TangentSpaceNormalMap } from './three.core.js';
/**
 * This module uses cache management to create temporary variables
 * if the node is used more than once to prevent duplicate calculations.
 *
 * The class acts as a base class for many other nodes types.
 *
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
    /**
     * Whether this node is used more than once in context of other nodes.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @return {boolean} A flag that indicates if there is more than one dependency to other nodes.
     */
    hasDependencies(builder: NodeBuilder): boolean;
    build(builder: any, output: any): any;
}
import { Texture } from './three.core.js';
/**
 * This type of uniform node represents a 3D texture.
 *
 * @augments TextureNode
 */
export class Texture3DNode extends TextureNode {
    /**
     * Constructs a new 3D texture node.
     *
     * @param {Data3DTexture} value - The 3D texture.
     * @param {?Node<vec2|vec3>} [uvNode=null] - The uv node.
     * @param {?Node<int>} [levelNode=null] - The level node.
     */
    constructor(value: Data3DTexture, uvNode?: Node<any | any> | null, levelNode?: Node<any> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTexture3DNode: boolean;
    /**
     * Overwritten with an empty implementation since the `updateMatrix` flag is ignored
     * for 3D textures. The uv transformation matrix is not applied to 3D textures.
     *
     * @param {boolean} value - The update toggle.
     */
    setUpdateMatrix(): void;
    /**
     * Computes the normal for the given uv. These texture coordiantes represent a
     * position inside the 3D texture. Unlike geometric normals, this normal
     * represents a slope or gradient of scalar data inside the 3D texture.
     *
     * @param {Node<vec3>} uvNode - The uv node that defines a position in the 3D texture.
     * @return {Node<vec3>} The normal representing the slope/gradient in the data.
     */
    normal(uvNode: Node<any>): Node<any>;
}
/**
 * This type of uniform node represents a 2D texture.
 *
 * @augments UniformNode
 */
export class TextureNode extends UniformNode {
    /**
     * Constructs a new texture node.
     *
     * @param {Texture} [value=EmptyTexture] - The texture.
     * @param {?Node<vec2|vec3>} [uvNode=null] - The uv node.
     * @param {?Node<int>} [levelNode=null] - The level node.
     * @param {?Node<float>} [biasNode=null] - The bias node.
     */
    constructor(value?: Texture, uvNode?: Node<any | any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTextureNode: boolean;
    /**
     * Represents the texture coordinates.
     *
     * @type {?Node<vec2|vec3>}
     * @default null
     */
    uvNode: Node<any | any> | null;
    /**
     * Represents the mip level that should be selected.
     *
     * @type {?Node<int>}
     * @default null
     */
    levelNode: Node<any> | null;
    /**
     * Represents the bias to be applied during level-of-detail computation.
     *
     * @type {?Node<float>}
     * @default null
     */
    biasNode: Node<any> | null;
    /**
     * Represents a reference value a texture sample is compared to.
     *
     * @type {?Node<float>}
     * @default null
     */
    compareNode: Node<any> | null;
    /**
     * When using texture arrays, the depth node defines the layer to select.
     *
     * @type {?Node<int>}
     * @default null
     */
    depthNode: Node<any> | null;
    /**
     * When defined, a texture is sampled using explicit gradients.
     *
     * @type {?Array<Node<vec2>>}
     * @default null
     */
    gradNode: Array<Node<any>> | null;
    /**
     * Represents the optional index constant of the channel to gather.
     * This must be in range [0, 3] and a compile-time constant.
     *
     * @type {?Node<int>}
     * @default null
     */
    gatherNode: Node<any> | null;
    /**
     * Represents the optional texel offset applied to the unnormalized texture
     * coordinate before sampling the texture.
     *
     * @type {?Node<ivec2|ivec3>}
     * @default null
     */
    offsetNode: Node<any | any> | null;
    /**
     * Whether texture values should be sampled or fetched.
     *
     * @type {boolean}
     * @default true
     */
    sampler: boolean;
    /**
     * Whether the uv transformation matrix should be
     * automatically updated or not. Use `setUpdateMatrix()`
     * if you want to change the value of the property.
     *
     * @type {boolean}
     * @default false
     */
    updateMatrix: boolean;
    /**
     * The reference node.
     *
     * @type {?Node}
     * @default null
     */
    referenceNode: Node | null;
    /**
     * The texture value is stored in a private property.
     *
     * @private
     * @type {Texture}
     */
    private _value;
    /**
     * The uniform node that represents the uv transformation matrix.
     *
     * @private
     * @type {?UniformNode<mat3>}
     * @default null
     */
    private _matrixUniform;
    /**
     * The uniform node that represents the y-flip. Only required for WebGL.
     *
     * @private
     * @type {?UniformNode<bool>}
     * @default null
     */
    private _flipYUniform;
    set value(value: Texture);
    /**
     * The texture value.
     *
     * @type {Texture}
     */
    get value(): Texture;
    /**
     * Overwritten since the uniform hash is defined by the texture's UUID.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The uniform hash.
     */
    getUniformHash(): string;
    /**
     * Overwritten since the node type is inferred from the texture type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(): string;
    /**
     * Overwrites the default implementation to return a fixed value `'texture'`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
    /**
     * Returns a default uvs based on the current texture's channel.
     *
     * @return {AttributeNode<vec2>} The default uvs.
     */
    getDefaultUV(): AttributeNode<any>;
    /**
     * Overwritten to always return the texture reference of the node.
     *
     * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
     * @return {Texture} The texture reference.
     */
    updateReference(): Texture;
    /**
     * Transforms the given uv node with the texture transformation matrix.
     *
     * @param {Node} uvNode - The uv node to transform.
     * @return {Node} The transformed uv node.
     */
    getTransformedUV(uvNode: Node): Node;
    /**
     * Defines whether the uv transformation matrix should automatically be updated or not.
     *
     * @param {boolean} value - The update toggle.
     * @return {TextureNode} A reference to this node.
     */
    setUpdateMatrix(value: boolean): TextureNode;
    /**
     * Setups the uv node. Depending on the backend as well as texture's image and type, it might be necessary
     * to modify the uv node for correct sampling.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} uvNode - The uv node to setup.
     * @return {Node} The updated uv node.
     */
    setupUV(builder: NodeBuilder, uvNode: Node): Node;
    /**
     * Setups texture node by preparing the internal nodes for code generation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Generates the uv code snippet.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} uvNode - The uv node to generate code for.
     * @return {string} The generated code snippet.
     */
    generateUV(builder: NodeBuilder, uvNode: Node): string;
    /**
     * Generates the offset code snippet.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node} offsetNode - The offset node to generate code for.
     * @return {string} The generated code snippet.
     */
    generateOffset(builder: NodeBuilder, offsetNode: Node): string;
    /**
     * Generates the snippet for the texture sampling.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} textureProperty - The texture property.
     * @param {string} uvSnippet - The uv snippet.
     * @param {?string} levelSnippet - The level snippet.
     * @param {?string} biasSnippet - The bias snippet.
     * @param {?string} depthSnippet - The depth snippet.
     * @param {?string} compareSnippet - The compare snippet.
     * @param {?Array<string>} gradSnippet - The grad snippet.
     * @param {?string} gatherSnippet - The gather snippet.
     * @param {?string} offsetSnippet - The offset snippet.
     * @param {?string} flipYSnippet - The y-flip snippet. Only used for WebGL.
     * @return {string} The generated code snippet.
     */
    generateSnippet(builder: NodeBuilder, textureProperty: string, uvSnippet: string, levelSnippet: string | null, biasSnippet: string | null, depthSnippet: string | null, compareSnippet: string | null, gradSnippet: Array<string> | null, gatherSnippet: string | null, offsetSnippet: string | null, flipYSnippet: string | null): string;
    /**
     * Generates the code snippet of the texture node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} output - The current output.
     * @return {string} The generated code snippet.
     */
    generate(builder: NodeBuilder, output: string): string;
    /**
     * Sets the sampler value.
     *
     * @param {boolean} value - The sampler value to set.
     * @return {TextureNode} A reference to this texture node.
     */
    setSampler(value: boolean): TextureNode;
    /**
     * Returns the sampler value.
     *
     * @return {boolean} The sampler value.
     */
    getSampler(): boolean;
    /**
     * Samples the texture with the given uv node.
     *
     * @param {Node} uvNode - The uv node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    sample(uvNode: Node): TextureNode;
    /**
     * TSL function for creating a texture node that fetches/loads texels without interpolation.
     *
     * @param {Node<uvec2>} uvNode - The uv node.
     * @returns {TextureNode} A texture node representing the texture load.
     */
    load(uvNode: Node<any>): TextureNode;
    /**
     * Samples a blurred version of the texture by defining an internal bias.
     *
     * @param {Node<float>} amountNode - How blurred the texture should be.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    blur(amountNode: Node<any>): TextureNode;
    /**
     * Samples a specific mip of the texture.
     *
     * @param {Node<int>} levelNode - The mip level to sample.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    level(levelNode: Node<any>): TextureNode;
    /**
     * Returns the texture size of the requested level.
     *
     * @param {Node<int>} levelNode - The level to compute the size for.
     * @return {TextureSizeNode} The texture size.
     */
    size(levelNode: Node<any>): TextureSizeNode;
    /**
     * Samples the texture with the given bias.
     *
     * @param {Node<float>} biasNode - The bias node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    bias(biasNode: Node<any>): TextureNode;
    /**
     * Returns the base texture of this node.
     * @return {TextureNode} The base texture node.
     */
    getBase(): TextureNode;
    /**
     * Samples the texture by executing a compare operation.
     *
     * @param {Node<float>} compareNode - The node that defines the compare value.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    compare(compareNode: Node<any>): TextureNode;
    /**
     * Samples the texture using an explicit gradient.
     *
     * @param {Node<vec2>} gradNodeX - The gradX node.
     * @param {Node<vec2>} gradNodeY - The gradY node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    grad(gradNodeX: Node<any>, gradNodeY: Node<any>): TextureNode;
    /**
     * Gathers four texels from the texture.
     *
     * @param {Node<int>} gatherNode - The index of the channel to read. This must be in range [0, 3] and a compile-time constant.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    gather(gatherNode?: Node<any>): TextureNode;
    /**
     * Samples the texture by defining a depth node.
     *
     * @param {Node<int>} depthNode - The depth node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    depth(depthNode: Node<any>): TextureNode;
    /**
     * Samples the texture by defining an offset node.
     *
     * @param {Node<ivec2>} offsetNode - The offset node.
     * @return {TextureNode} A texture node representing the texture sample.
     */
    offset(offsetNode: Node<any>): TextureNode;
    /**
     * The update is used to implement the update of the uv transformation matrix.
     */
    update(): void;
    /**
     * Clones the texture node.
     *
     * @return {TextureNode} The cloned texture node.
     */
    clone(): TextureNode;
}
/**
 * A node that represents the dimensions of a texture. The texture size is
 * retrieved in the shader via built-in shader functions like `textureDimensions()`
 * or `textureSize()`.
 *
 * @augments Node
 */
export class TextureSizeNode extends Node {
    /**
     * Constructs a new texture size node.
     *
     * @param {TextureNode} textureNode - A texture node which size should be retrieved.
     * @param {?Node<int>} [levelNode=null] - A level node which defines the requested mip.
     */
    constructor(textureNode: TextureNode, levelNode?: Node<any> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTextureSizeNode: boolean;
    /**
     * A texture node which size should be retrieved.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * A level node which defines the requested mip.
     *
     * @type {Node<int>}
     * @default null
     */
    levelNode: Node<any>;
    generate(builder: any, output: any): any;
}
import { TimestampQuery } from './three.core.js';
/**
 * This node represents a tone mapping operation.
 *
 * @augments TempNode
 */
export class ToneMappingNode extends TempNode {
    /**
     * Constructs a new tone mapping node.
     *
     * @param {number} toneMapping - The tone mapping type.
     * @param {Node} exposureNode - The tone mapping exposure.
     * @param {Node} [colorNode=null] - The color node to process.
     */
    constructor(toneMapping: number, exposureNode?: Node, colorNode?: Node);
    /**
     * The tone mapping type.
     *
     * @private
     * @type {number}
     */
    private _toneMapping;
    /**
     * The tone mapping exposure.
     *
     * @type {Node}
     * @default null
     */
    exposureNode: Node;
    /**
     * Represents the color to process.
     *
     * @type {?Node}
     * @default null
     */
    colorNode: Node | null;
    /**
     * Sets the tone mapping type.
     *
     * @param {number} value - The tone mapping type.
     * @return {ToneMappingNode} A reference to this node.
     */
    setToneMapping(value: number): ToneMappingNode;
    /**
     * Gets the tone mapping type.
     *
     * @returns {number} The tone mapping type.
     */
    getToneMapping(): number;
    setup(builder: any): any;
}
/**
 * Represents a render pass for producing a toon outline effect on compatible objects.
 * Only 3D objects with materials of type `MeshToonMaterial` and `MeshToonNodeMaterial`
 * will receive the outline.
 *
 * ```js
 * const postProcessing = new RenderPipeline( renderer );
 *
 * const scenePass = toonOutlinePass( scene, camera );
 *
 * postProcessing.outputNode = scenePass;
 * ```
 * @augments PassNode
 */
export class ToonOutlinePassNode extends PassNode {
    /**
     * Constructs a new outline pass node.
     *
     * @param {Scene} scene - A reference to the scene.
     * @param {Camera} camera - A reference to the camera.
     * @param {Node} colorNode - Defines the outline's color.
     * @param {Node} thicknessNode - Defines the outline's thickness.
     * @param {Node} alphaNode - Defines the outline's alpha.
     */
    constructor(scene: Scene, camera: Camera, colorNode: Node, thicknessNode: Node, alphaNode: Node);
    /**
     * Defines the outline's color.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * Defines the outline's thickness.
     *
     * @type {Node}
     */
    thicknessNode: Node;
    /**
     * Defines the outline's alpha.
     *
     * @type {Node}
     */
    alphaNode: Node;
    /**
     * An internal material cache.
     *
     * @private
     * @type {WeakMap<Material, NodeMaterial>}
     */
    private _materialCache;
    /**
     * Creates the material used for outline rendering.
     *
     * @private
     * @return {NodeMaterial} The outline material.
     */
    private _createMaterial;
    /**
     * For the given toon material, this method returns a corresponding
     * outline material.
     *
     * @private
     * @param {(MeshToonMaterial|MeshToonNodeMaterial)} originalMaterial - The toon material.
     * @return {NodeMaterial} The outline material.
     */
    private _getOutlineMaterial;
}
import { UVMapping } from './three.core.js';
import { Uint16BufferAttribute } from './three.core.js';
import { Uint32BufferAttribute } from './three.core.js';
/**
 * Similar to {@link BufferNode} this module represents array-like data as
 * uniform buffers. Unlike {@link BufferNode}, it can handle more common
 * data types in the array (e.g `three.js` primitives) and automatically
 * manage buffer padding. It should be the first choice when working with
 * uniforms buffers.
 * ```js
 * const tintColors = uniformArray( [
 * 	new Color( 1, 0, 0 ),
 * 	new Color( 0, 1, 0 ),
 * 	new Color( 0, 0, 1 )
 * ], 'color' );
 *
 * const redColor = tintColors.element( 0 );
 *
 * @augments BufferNode
 */
export class UniformArrayNode extends BufferNode {
    /**
     * Constructs a new uniform array node.
     *
     * @param {Array<any>} value - Array holding the buffer data.
     * @param {?string} [elementType=null] - The data type of a buffer element.
     */
    constructor(value: Array<any>, elementType?: string | null);
    /**
     * Array holding the buffer data. Unlike {@link BufferNode}, the array can
     * hold number primitives as well as three.js objects like vectors, matrices
     * or colors.
     *
     * @type {Array<any>}
     */
    array: Array<any>;
    /**
     * The data type of an array element.
     *
     * @type {string}
     */
    elementType: string;
    /**
     * The padded type. Uniform buffers must conform to a certain buffer layout
     * so a separate type is computed to ensure correct buffer size.
     *
     * @type {string}
     */
    paddedType: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayBufferNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from the
     * {@link UniformArrayNode#paddedType}.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(): string;
    /**
     * The data type of the array elements.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The element type.
     */
    getElementType(): string;
    /**
     * Returns the padded type based on the element type.
     *
     * @return {string} The padded type.
     */
    getPaddedType(): string;
    /**
     * The update makes sure to correctly transfer the data from the (complex) objects
     * in the array to the internal, correctly padded value buffer.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
    /**
     * Implement the value buffer creation based on the array data.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {null}
     */
    setup(builder: NodeBuilder): null;
    /**
     * Overwrites the default `element()` method to provide element access
     * based on {@link UniformArrayNode}.
     *
     * @param {IndexNode} indexNode - The index node.
     * @return {UniformArrayElementNode}
     */
    element(indexNode: IndexNode): UniformArrayElementNode;
}
/**
 * This node can be used to group single instances of {@link UniformNode}
 * and manage them as a uniform buffer.
 *
 * In most cases, the predefined nodes `objectGroup`, `renderGroup` and `frameGroup`
 * will be used when defining the {@link UniformNode#groupNode} property.
 *
 * - `objectGroup`: Uniform buffer per object.
 * - `renderGroup`: Shared uniform buffer, updated once per render call.
 * - `frameGroup`: Shared uniform buffer, updated once per frame.
 *
 * @augments Node
 */
export class UniformGroupNode extends Node {
    /**
     * Constructs a new uniform group node.
     *
     * @param {string} name - The name of the uniform group node.
     * @param {boolean} [shared=false] - Whether this uniform group node is shared or not.
     * @param {number} [order=1] - Influences the internal sorting.
     * @param {string|null} [updateType=null] - The update type of the uniform group node.
     */
    constructor(name: string, shared?: boolean, order?: number, updateType?: string | null);
    /**
     * Whether this uniform group node is shared or not.
     *
     * @type {boolean}
     * @default false
     */
    shared: boolean;
    /**
     * Influences the internal sorting.
     * TODO: Add details when this property should be changed.
     *
     * @type {number}
     * @default 1
     */
    order: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformGroup: boolean;
    /**
     * Marks the uniform group node as needing an update.
     * This will trigger the necessary updates in the rendering process.
     */
    update(): void;
}
/**
 * Class for representing a uniform.
 *
 * @augments InputNode
 */
export class UniformNode extends InputNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformNode: boolean;
    /**
     * The uniform group of this uniform. By default, uniforms are
     * managed per object but they might belong to a shared group
     * which is updated per frame or render call.
     *
     * @type {UniformGroupNode}
     */
    groupNode: UniformGroupNode;
    /**
     * Sets the {@link UniformNode#name} property.
     *
     * @param {string} name - The name of the uniform.
     * @return {UniformNode} A reference to this node.
     */
    setName(name: string): UniformNode;
    /**
     * Sets the {@link UniformNode#name} property.
     *
     * @deprecated
     * @param {string} name - The name of the uniform.
     * @return {UniformNode} A reference to this node.
     */
    label(name: string): UniformNode;
    /**
     * Sets the {@link UniformNode#groupNode} property.
     *
     * @param {UniformGroupNode} group - The uniform group.
     * @return {UniformNode} A reference to this node.
     */
    setGroup(group: UniformGroupNode): UniformNode;
    /**
     * Returns the {@link UniformNode#groupNode}.
     *
     * @return {UniformGroupNode} The uniform group.
     */
    getGroup(): UniformGroupNode;
    /**
     * By default, this method returns the result of {@link Node#getHash} but derived
     * classes might overwrite this method with a different implementation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The uniform hash.
     */
    getUniformHash(builder: NodeBuilder): string;
    onUpdate(callback: any, updateType: any): Node;
    getInputType(builder: any): string;
    generate(builder: any, output: any): any;
}
/**
 * This node represents an operation that unpacks values from a 32-bit unsigned integer, reinterpreting the results as a floating-point vector
 *
 * @augments TempNode
 */
export class UnpackFloatNode extends TempNode {
    /**
     *
     * @param {'snorm' | 'unorm' | 'float16'} encoding - The numeric encoding that describes how the integer values are mapped to the float range
     * @param {Node} uintNode - The uint node to be unpacked
     */
    constructor(encoding: "snorm" | "unorm" | "float16", uintNode: Node);
    /**
     * The unsigned integer to be unpacked.
     *
     * @type {Node}
     */
    uintNode: Node;
    /**
     * The numeric encoding.
     *
     * @type {string}
     */
    encoding: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUnpackFloatNode: boolean;
    generateNodeType(): string;
    generate(builder: any): string;
}
import { UnsignedByteType } from './three.core.js';
import { UnsignedInt101111Type } from './three.core.js';
import { UnsignedInt248Type } from './three.core.js';
import { UnsignedInt5999Type } from './three.core.js';
import { UnsignedIntType } from './three.core.js';
import { UnsignedShort4444Type } from './three.core.js';
import { UnsignedShort5551Type } from './three.core.js';
import { UnsignedShortType } from './three.core.js';
/**
 * A special type of reference node that allows to link values in
 * `userData` fields to node objects.
 * ```js
 * sprite.userData.rotation = 1; // stores individual rotation per sprite
 *
 * const material = new THREE.SpriteNodeMaterial();
 * material.rotationNode = userData( 'rotation', 'float' );
 * ```
 * Since `UserDataNode` is extended from {@link ReferenceNode}, the node value
 * will automatically be updated when the `rotation` user data field changes.
 *
 * @augments ReferenceNode
 */
export class UserDataNode extends ReferenceNode {
    /**
     * Constructs a new user data node.
     *
     * @param {string} property - The property name that should be referenced by the node.
     * @param {string} inputType - The node data type of the reference.
     * @param {?Object} [userData=null] - A reference to the `userData` object. If not provided, the `userData` property of the 3D object that uses the node material is evaluated.
     */
    constructor(property: string, inputType: string, userData?: Object | null);
    /**
     * A reference to the `userData` object. If not provided, the `userData`
     * property of the 3D object that uses the node material is evaluated.
     *
     * @type {?Object}
     * @default null
     */
    userData: Object | null;
}
import { VSMShadowMap } from './three.core.js';
/**
 * Class for representing shader variables as nodes. Variables are created from
 * existing nodes like the following:
 *
 * ```js
 * const depth = sampleDepth( uvNode ).toVar( 'depth' );
 * ```
 *
 * @augments Node
 */
export class VarNode extends Node {
    /**
     * Constructs a new variable node.
     *
     * @param {Node} node - The node for which a variable should be created.
     * @param {?string} [name=null] - The name of the variable in the shader.
     * @param {boolean} [readOnly=false] - The read-only flag.
     */
    constructor(node: Node, name?: string | null, readOnly?: boolean);
    /**
     * The node for which a variable should be created.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVarNode: boolean;
    /**
     *
     * The read-only flag.
     *
     * @type {boolean}
     * @default false
     */
    readOnly: boolean;
    /**
     * This flag is used to indicate that this node is used for intent.
     *
     * @type {boolean}
     * @default false
     */
    intent: boolean;
    /**
     * Sets the intent flag for this node.
     *
     * This flag is used to indicate that this node is used for intent
     * and should not be built directly. Instead, it is used to indicate that
     * the node should be treated as a variable intent.
     *
     * It's useful for assigning variables without needing creating a new variable node.
     *
     * @param {boolean} value - The value to set for the intent flag.
     * @returns {VarNode} This node.
     */
    setIntent(value: boolean): VarNode;
    /**
     * Checks if this node is used for intent.
     *
     * @param {NodeBuilder} builder - The node builder.
     * @returns {boolean} Whether this node is used for intent.
     */
    isIntent(builder: NodeBuilder): boolean;
    /**
     * Returns the intent flag of this node.
     *
     * @return {boolean} The intent flag.
     */
    getIntent(): boolean;
    getMemberType(builder: any, name: any): string;
    getElementType(builder: any): string;
    generateNodeType(builder: any): string;
    getArrayCount(builder: any): number | null;
    isAssign(builder: any): any;
    build(...params: any[]): string | Node | null;
    generate(builder: any): any;
    _hasStack(builder: any): boolean;
}
/**
 * Class for representing shader varyings as nodes. Varyings are create from
 * existing nodes like the following:
 *
 * ```js
 * const positionLocal = positionGeometry.toVarying( 'vPositionLocal' );
 * ```
 *
 * @augments Node
 */
export class VaryingNode extends Node {
    /**
     * Constructs a new varying node.
     *
     * @param {Node} node - The node for which a varying should be created.
     * @param {?string} name - The name of the varying in the shader.
     */
    constructor(node: Node, name?: string | null);
    /**
     * The node for which a varying should be created.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVaryingNode: boolean;
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
    /**
     * Defines the interpolation type of the varying.
     *
     * @param {string} type - The interpolation type.
     * @param {?string} sampling - The interpolation sampling type
     * @return {VaryingNode} A reference to this node.
     */
    setInterpolation(type: string, sampling?: string | null): VaryingNode;
    getHash(builder: any): string;
    generateNodeType(builder: any): string;
    /**
     * This method performs the setup of a varying node with the current node builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeVarying} The node varying from the node builder.
     */
    setupVarying(builder: NodeBuilder): NodeVarying;
    setup(builder: any): void;
    analyze(builder: any): void;
    generate(builder: any): any;
}
import { Vector2 } from './three.core.js';
import { Vector3 } from './three.core.js';
import { Vector4 } from './three.core.js';
/**
 * A node for representing motion or velocity vectors. Foundation
 * for advanced post processing effects like motion blur or TRAA.
 *
 * The node keeps track of the model, view and projection matrices
 * of the previous frame and uses them to compute offsets in NDC space.
 * These offsets represent the final velocity.
 *
 * @augments TempNode
 */
export class VelocityNode extends TempNode {
    /**
     * Constructs a new vertex color node.
     */
    constructor();
    /**
     * The current projection matrix.
     *
     * @type {?Matrix4}
     * @default null
     */
    projectionMatrix: Matrix4 | null;
    /**
     * Uniform node representing the previous model matrix in world space.
     *
     * @type {UniformNode<mat4>}
     * @default null
     */
    previousModelWorldMatrix: UniformNode<any>;
    /**
     * Uniform node representing the previous projection matrix.
     *
     * @type {UniformNode<mat4>}
     * @default null
     */
    previousProjectionMatrix: UniformNode<any>;
    /**
     * Uniform node representing the previous view matrix.
     *
     * @type {UniformNode<mat4>}
     * @default null
     */
    previousCameraViewMatrix: UniformNode<any>;
    /**
     * Sets the given projection matrix.
     *
     * @param {Matrix4} projectionMatrix - The projection matrix to set.
     */
    setProjectionMatrix(projectionMatrix: Matrix4): void;
    /**
     * Updates velocity specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update({ frameId, camera, object }: NodeFrame): void;
    /**
     * Overwritten to updated velocity specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateAfter({ object }: NodeFrame): void;
    /**
     * Implements the velocity computation based on the previous and current vertex data.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<vec2>} The motion vector.
     */
    setup(): Node<any>;
}
/**
 * An attribute node for representing vertex colors.
 *
 * @augments AttributeNode
 */
export class VertexColorNode extends AttributeNode {
    /**
     * Constructs a new vertex color node.
     *
     * @param {number} index - The attribute index.
     */
    constructor(index: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVertexColorNode: boolean;
    /**
     * The attribute index to enable more than one sets of vertex colors.
     *
     * @type {number}
     * @default 0
     */
    index: number;
}
/**
 * This node offers a collection of features in context of the depth logic in the fragment shader.
 * Depending on {@link ViewportDepthNode#scope}, it can be used to define a depth value for the current
 * fragment or for depth evaluation purposes.
 *
 * @augments Node
 */
export class ViewportDepthNode extends Node {
    /**
     * Constructs a new viewport depth node.
     *
     * @param {('depth'|'depthBase'|'linearDepth')} scope - The node's scope.
     * @param {?Node} [valueNode=null] - The value node.
     */
    constructor(scope: ("depth" | "depthBase" | "linearDepth"), valueNode?: Node | null);
    /**
     * The node behaves differently depending on which scope is selected.
     *
     * - `ViewportDepthNode.DEPTH_BASE`: Allows to define a value for the current fragment's depth.
     * - `ViewportDepthNode.DEPTH`: Represents the depth value for the current fragment (`valueNode` is ignored).
     * - `ViewportDepthNode.LINEAR_DEPTH`: Represents the linear (orthographic) depth value of the current fragment.
     * If a `valueNode` is set, the scope can be used to convert perspective depth data to linear data.
     *
     * @type {('depth'|'depthBase'|'linearDepth')}
     */
    scope: ("depth" | "depthBase" | "linearDepth");
    /**
     * Can be used to define a custom depth value.
     * The property is ignored in the `ViewportDepthNode.DEPTH` scope.
     *
     * @type {?Node}
     * @default null
     */
    valueNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isViewportDepthNode: boolean;
    generate(builder: any): any;
    setup({ camera }: {
        camera: any;
    }): any;
}
export namespace ViewportDepthNode {
    export let DEPTH_BASE: string;
    let DEPTH_1: string;
    export { DEPTH_1 as DEPTH };
    export let LINEAR_DEPTH: string;
}
/**
 * Represents the depth of the current viewport as a texture. This module
 * can be used in combination with viewport texture to achieve effects
 * that require depth evaluation.
 *
 * @augments ViewportTextureNode
 */
export class ViewportDepthTextureNode extends ViewportTextureNode {
    /**
     * Constructs a new viewport depth texture node.
     *
     * @param {Node} [uvNode=screenUV] - The uv node.
     * @param {?Node} [levelNode=null] - The level node.
     * @param {?DepthTexture} [depthTexture=null] - A depth texture. If not provided, uses a shared depth texture.
     */
    constructor(uvNode?: Node, levelNode?: Node | null, depthTexture?: DepthTexture | null);
}
/**
 * `ViewportTextureNode` creates an internal texture for each node instance. This module
 * shares a texture across all instances of `ViewportSharedTextureNode`. It should
 * be the first choice when using data of the default/screen framebuffer for performance reasons.
 *
 * @augments ViewportTextureNode
 */
export class ViewportSharedTextureNode extends ViewportTextureNode {
    /**
     * Constructs a new viewport shared texture node.
     *
     * @param {Node} [uvNode=screenUV] - The uv node.
     * @param {?Node} [levelNode=null] - The level node.
     */
    constructor(uvNode?: Node, levelNode?: Node | null);
    /**
     * Overwritten so the method always returns the unique shared
     * framebuffer texture.
     *
     * @return {FramebufferTexture} The shared framebuffer texture.
     */
    getTextureForReference(): FramebufferTexture;
    updateReference(): this;
}
/**
 * A special type of texture node which represents the data of the current viewport
 * as a texture. The module extracts data from the current bound framebuffer with
 * a copy operation so no extra render pass is required to produce the texture data
 * (which is good for performance). `ViewportTextureNode` can be used as an input for a
 * variety of effects like refractive or transmissive materials.
 *
 * @augments TextureNode
 */
export class ViewportTextureNode extends TextureNode {
    /**
     * Constructs a new viewport texture node.
     *
     * @param {Node} [uvNode=screenUV] - The uv node.
     * @param {?Node} [levelNode=null] - The level node.
     * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
     */
    constructor(uvNode?: Node, levelNode?: Node | null, framebufferTexture?: Texture | null);
    /**
     * Whether to generate mipmaps or not.
     *
     * @type {boolean}
     * @default false
     */
    generateMipmaps: boolean;
    /**
     * The reference framebuffer texture. This is used to store the framebuffer texture
     * for the current render target. If the render target changes, a new framebuffer texture
     * is created automatically.
     *
     * @type {FramebufferTexture}
     * @default null
     */
    defaultFramebuffer: FramebufferTexture;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOutputTextureNode: boolean;
    /**
     * The framebuffer texture for the current renderer context.
     *
     * @type {WeakMap<RenderTarget, FramebufferTexture>}
     * @private
     */
    private _cacheTextures;
    /**
     * This methods returns a texture for the given render target or canvas target reference.
     *
     * To avoid rendering errors, `ViewportTextureNode` must use unique framebuffer textures
     * for different render contexts.
     *
     * @param {?(RenderTarget|CanvasTarget)} [reference=null] - The render target or canvas target reference.
     * @return {Texture} The framebuffer texture.
     */
    getTextureForReference(reference?: (RenderTarget | CanvasTarget) | null): Texture;
    updateReference(frame: any): Texture;
    updateBefore(frame: any): void;
    clone(): any;
}
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
     * @param {?string} flipYSnippet - A WGSL snippet that represents the y-flip. Only used for WebGL.
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
     * @param {?string} flipYSnippet - A WGSL snippet that represents the y-flip. Only used for WebGL.
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
     * @param {string} [shaderStage=this.shaderStage] - The shader stage this code snippet is generated for.
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
     * Returns a builtin representing the size of a subgroup within the current shader.
     *
     * @return {string} The subgroup size.
     */
    getSubgroupSize(): string;
    /**
     * Returns a builtin representing the index of a compute invocation within the scope of a subgroup.
     *
     * @return {string} The invocation subgroup index.
     */
    getInvocationSubgroupIndex(): string;
    /**
     * Returns a builtin representing the index of a compute invocation's subgroup within its workgroup.
     *
     * @return {string} The subgroup index.
     */
    getSubgroupIndex(): string;
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
     * Enables the 'subgroups' directive.
     */
    enableSubGroups(): void;
    /**
     * Enables the 'subgroups-f16' directive.
     */
    enableSubgroupsF16(): void;
    /**
     * Enables the 'clip_distances' directive.
     */
    enableClipDistances(): void;
    /**
     * Enables the 'f16' directive.
     */
    enableShaderF16(): void;
    /**
     * Enables the 'dual_source_blending' directive.
     */
    enableDualSourceBlending(): void;
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
     * @return {string} The array name.
     */
    getScopedArray(name: string, scope: string, bufferType: string, bufferCount: string): string;
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
    isCustomStruct(nodeUniform: any): any;
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
     * @returns {string} The resolve WGSL float packing method name.
     */
    getFloatPackingMethod(encoding: string): string;
    /**
     * Returns the float unpacking method name for a given numeric encoding.
     *
     * @param {string} encoding - The numeric encoding that describes how the integer values are mapped to the float range.
     * @returns {string} The resolve WGSL float unpacking method name.
     */
    getFloatUnpackingMethod(encoding: string): string;
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
     * a storage buffer attribute from the GPU to the CPU. ReadbackBuffer can
     * be used to retain and reuse handles to the intermediate buffers and prevent
     * new allocation.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read frm.
     * @param {ReadbackBuffer|ArrayBuffer} target - The storage buffer attribute.
     * @param {number} offset - The storage buffer attribute.
     * @param {number} count - The offset from which to start reading the
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: ReadbackBuffer | ArrayBuffer, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * @param {BufferAttribute} attribute - The storage buffer attribute to read frm.
     * @param {number} count - The offset from which to start reading the
     * @param {number} offset - The storage buffer attribute.
     * @param {ReadbackBuffer|ArrayBuffer} target - The storage buffer attribute.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: ReadbackBuffer | ArrayBuffer, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * @param {ArrayCamera} cameras - The array camera.
     *
     */
    _updateArrayCameraLayerDescriptors(renderContext: RenderContext, renderContextData: Object, cameras: ArrayCamera): void;
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
     * @param {Texture} texture - The texture to update the sampler for.
     * @param {TextureNode} textureNode - The texture node to update the sampler with.
     * @return {string} The current sampler key.
     */
    updateSampler(texture: Texture, textureNode: TextureNode): string;
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
/**
 * A node allowing the user to create a 'workgroup' scoped buffer within the
 * context of a compute shader. Typically, workgroup scoped buffers are
 * created to hold data that is transferred from a global storage scope into
 * a local workgroup scope. For invocations within a workgroup, data
 * access speeds on 'workgroup' scoped buffers can be significantly faster
 * than similar access operations on globally accessible storage buffers.
 *
 * This node can only be used with a WebGPU backend.
 *
 * @augments Node
 */
export class WorkgroupInfoNode extends Node {
    /**
     * Constructs a new buffer scoped to type scope.
     *
     * @param {string} scope - TODO.
     * @param {string} bufferType - The data type of a 'workgroup' scoped buffer element.
     * @param {number} [bufferCount=0] - The number of elements in the buffer.
     */
    constructor(scope: string, bufferType: string, bufferCount?: number);
    /**
     * The buffer type.
     *
     * @type {string}
     */
    bufferType: string;
    /**
     * The buffer count.
     *
     * @type {number}
     * @default 0
     */
    bufferCount: number;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWorkgroupInfoNode: boolean;
    /**
     * The data type of the array buffer.
     *
     * @type {string}
     */
    elementType: string;
    /**
     * TODO.
     *
     * @type {string}
     */
    scope: string;
    /**
     * Sets the name of this node.
     *
     * @param {string} name - The name to set.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    setName(name: string): WorkgroupInfoNode;
    /**
     * Sets the name/label of this node.
     *
     * @deprecated
     * @param {string} name - The name to set.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    label(name: string): WorkgroupInfoNode;
    /**
     * Sets the scope of this node.
     *
     * @param {string} scope - The scope to set.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    setScope(scope: string): WorkgroupInfoNode;
    /**
     * The data type of the array buffer.
     *
     * @return {string} The element type.
     */
    getElementType(): string;
    /**
     * Overwrites the default implementation since the input type
     * is inferred from the scope.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
    /**
     * This method can be used to access elements via an index node.
     *
     * @param {IndexNode} indexNode - indexNode.
     * @return {WorkgroupInfoElementNode} A reference to an element.
     */
    element(indexNode: IndexNode): WorkgroupInfoElementNode;
    generate(builder: any): any;
}
import { ZeroFactor } from './three.core.js';
import { ZeroStencilOp } from './three.core.js';
import { createCanvasElement } from './three.core.js';
export const defaultBuildStages: string[];
export const defaultShaderStages: string[];
import { error } from './three.core.js';
import { log as log$1 } from './three.core.js';
export const shaderStages: string[];
export const vectorComponents: string[];
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
/**
 * A four-component version of {@link Color} which is internally
 * used by the renderer to represents clear color with alpha as
 * one object.
 *
 * @private
 * @augments Color
 */
declare class Color4 extends Color {
    /**
     * Constructs a new four-component color.
     * You can also pass a single THREE.Color, hex or
     * string argument to this constructor.
     *
     * @param {number|string} [r=1] - The red value.
     * @param {number} [g=1] - The green value.
     * @param {number} [b=1] - The blue value.
     * @param {number} [a=1] - The alpha value.
     */
    constructor(r?: number | string, g?: number, b?: number, a?: number);
    a: number;
    /**
     * Overwrites the default to honor alpha.
     * You can also pass a single THREE.Color, hex or
     * string argument to this method.
     *
     * @param {number|string|Color} r - The red value.
     * @param {number} [g] - The green value.
     * @param {number} [b] - The blue value.
     * @param {number} [a=1] - The alpha value.
     * @return {Color4} A reference to this object.
     */
    set(r: number | string | Color, g?: number, b?: number, a?: number): Color4;
    /**
     * Overwrites the default to honor alpha.
     *
     * @param {Color4} color - The color to copy.
     * @return {Color4} A reference to this object.
     */
    copy(color: Color4): Color4;
    /**
     * Overwrites the default to honor alpha.
     *
     * @return {Color4} The cloned color.
     */
    clone(): Color4;
}
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
     * A weak map that maps lights to light nodes.
     *
     * @type {WeakMap<Light.constructor,AnalyticLightNode.constructor>}
     */
    lightNodes: WeakMap<Light.constructor, AnalyticLightNode.constructor>;
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
     * @param {Light.constructor} light - The light class definition.
     * @return {?AnalyticLightNode.constructor} The light node class definition. Returns `null` if no light node is found.
     */
    getLightNodeClass(light: Light.constructor): AnalyticLightNode.constructor | null;
    /**
     * Adds a light node class definition for a given light class definition.
     *
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
    /**
     * Adds a node class definition for the given class definition to the provided type library.
     *
     * @param {Node.constructor} nodeClass - The node class definition.
     * @param {Node.constructor} baseClass - The class definition.
     * @param {WeakMap<Node.constructor, Node.constructor>} library - The type library.
     */
    addClass(nodeClass: Node.constructor, baseClass: Node.constructor, library: WeakMap<Node.constructor, Node.constructor>): void;
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
declare class ShaderNodeInternal extends Node {
    constructor(jsFunc: any, nodeType: any);
    jsFunc: any;
    layout: any;
    once: boolean;
    setLayout(layout: any): this;
    getLayout(): any;
    call(rawInputs?: null): ShaderCallNodeInternal;
    setup(): ShaderCallNodeInternal;
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
     * @param {number} index - The group index.
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
 * Converts the given array buffer to a Base64 string.
 *
 * @private
 * @method
 * @param {ArrayBuffer} arrayBuffer - The array buffer.
 * @return {string} The Base64 string.
 */
declare function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
/**
 * Converts the given Base64 string to an array buffer.
 *
 * @private
 * @method
 * @param {string} base64 - The Base64 string.
 * @return {ArrayBuffer} The array buffer.
 */
declare function base64ToArrayBuffer(base64: string): ArrayBuffer;
/**
 * Returns the alignment requirement for the given data type in 4-byte elements.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {number} The alignment requirement in 4-byte elements.
 */
declare function getAlignmentFromType(type: string): number;
/**
 * Gets the object data that can be shared between different rendering steps.
 *
 * @private
 * @param {Object} object - The object to get the data for.
 * @return {Object} The object data.
 */
declare function getDataFromObject(object: Object): Object;
/**
 * Returns the length for the given data type.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {number} The length.
 */
declare function getLengthFromType(type: string): number;
/**
 * Returns the gpu memory length for the given data type in 4-byte elements.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {number} The memory length in 4-byte elements.
 */
declare function getMemoryLengthFromType(type: string): number;
/**
 * Returns the data type for the given the length.
 *
 * @private
 * @method
 * @param {number} length - The length.
 * @return {string} The data type.
 */
declare function getTypeFromLength(length: number): string;
/**
 * Returns the typed array for the given data type.
 *
 * @private
 * @method
 * @param {string} type - The data type.
 * @return {TypedArray} The typed array.
 */
declare function getTypedArrayFromType(type: string): TypedArray;
/**
 * Returns the value/object for the given data type and parameters.
 *
 * @private
 * @method
 * @param {string} type - The given type.
 * @param {...any} params - A parameter list.
 * @return {any} The value/object.
 */
declare function getValueFromType(type: string, ...params: any[]): any;
/**
 * Returns the data type for the given value.
 *
 * @private
 * @method
 * @param {any} value - The value.
 * @return {?string} The data type.
 */
declare function getValueType(value: any): string | null;
/**
 * This class is only relevant if the referenced property is array-like.
 * In this case, `ReferenceElementNode` allows to refer to a specific
 * element inside the data structure via an index.
 *
 * @augments ArrayElementNode
 */
declare class ReferenceElementNode extends ArrayElementNode {
    /**
     * Constructs a new reference element node.
     *
     * @param {?ReferenceNode} referenceNode - The reference node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(referenceNode: ReferenceNode | null, indexNode: Node);
    /**
     * Similar to {@link ReferenceNode#reference}, an additional
     * property references to the current node.
     *
     * @type {?ReferenceNode}
     * @default null
     */
    referenceNode: ReferenceNode | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isReferenceElementNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from
     * the uniform type of the reference node.
     *
     * @return {string} The node type.
     */
    generateNodeType(): string;
    generate(builder: any): any;
}
/**
 * Holds the actual implementation of the reflector.
 *
 * TODO: Explain why `ReflectorBaseNode`. Originally the entire logic was implemented
 * in `ReflectorNode`, see #29619.
 *
 * @private
 * @augments Node
 */
declare class ReflectorBaseNode extends Node {
    /**
     * Constructs a new reflector base node.
     *
     * @param {TextureNode} textureNode - Represents the rendered reflections as a texture node.
     * @param {Object} [parameters={}] - An object holding configuration parameters.
     * @param {Object3D} [parameters.target=new Object3D()] - The 3D object the reflector is linked to.
     * @param {number} [parameters.resolutionScale=1] - The resolution scale.
     * @param {boolean} [parameters.generateMipmaps=false] - Whether mipmaps should be generated or not.
     * @param {boolean} [parameters.bounces=true] - Whether reflectors can render other reflector nodes or not.
     * @param {boolean} [parameters.depth=false] - Whether depth data should be generated or not.
     * @param {number} [parameters.samples] - Anti-Aliasing samples of the internal render-target.
     */
    constructor(textureNode: TextureNode, parameters?: {
        target?: Object3D | undefined;
        resolutionScale?: number | undefined;
        generateMipmaps?: boolean | undefined;
        bounces?: boolean | undefined;
        depth?: boolean | undefined;
        samples?: number | undefined;
    });
    /**
     * Represents the rendered reflections as a texture node.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The 3D object the reflector is linked to.
     *
     * @type {Object3D}
     * @default {new Object3D()}
     */
    target: Object3D;
    /**
     * The resolution scale.
     *
     * @type {number}
     * @default {1}
     */
    resolutionScale: number;
    /**
     * Whether mipmaps should be generated or not.
     *
     * @type {boolean}
     * @default {false}
     */
    generateMipmaps: boolean;
    /**
     * Whether reflectors can render other reflector nodes or not.
     *
     * @type {boolean}
     * @default {true}
     */
    bounces: boolean;
    /**
     * Whether depth data should be generated or not.
     *
     * @type {boolean}
     * @default {false}
     */
    depth: boolean;
    /**
     * The number of anti-aliasing samples for the render-target
     *
     * @type {number}
     * @default {0}
     */
    samples: number;
    /**
     * Weak map for managing virtual cameras.
     *
     * @type {WeakMap<Camera, Camera>}
     */
    virtualCameras: WeakMap<Camera, Camera>;
    /**
     * Weak map for managing render targets.
     *
     * @type {Map<Camera, RenderTarget>}
     */
    renderTargets: Map<Camera, RenderTarget>;
    /**
     * Force render even if reflector is facing away from camera.
     *
     * @type {boolean}
     * @default {false}
     */
    forceUpdate: boolean;
    /**
     * Whether the reflector has been rendered or not.
     *
     * When the reflector is facing away from the camera,
     * this flag is set to `false` and the texture will be empty(black).
     *
     * @type {boolean}
     * @default {false}
     */
    hasOutput: boolean;
    /**
     * Updates the resolution of the internal render target.
     *
     * @private
     * @param {RenderTarget} renderTarget - The render target to resize.
     * @param {Renderer} renderer - The renderer that is used to determine the new size.
     */
    private _updateResolution;
    setup(builder: any): Node | null;
    /**
     * Returns a virtual camera for the given camera. The virtual camera is used to
     * render the scene from the reflector's view so correct reflections can be produced.
     *
     * @param {Camera} camera - The scene's camera.
     * @return {Camera} The corresponding virtual camera.
     */
    getVirtualCamera(camera: Camera): Camera;
    /**
     * Returns a render target for the given camera. The reflections are rendered
     * into this render target.
     *
     * @param {Camera} camera - The scene's camera.
     * @return {RenderTarget} The render target.
     */
    getRenderTarget(camera: Camera): RenderTarget;
    updateBefore(frame: any): false | undefined;
    set resolution(value: number);
    /**
     * The resolution scale.
     *
     * @deprecated
     * @type {number}
     * @default {1}
     */
    get resolution(): number;
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
     * @type {Map<Object, number>}
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
     * The renderer's sample count before XR temporarily overrides it.
     *
     * @private
     * @type {?number}
     * @default null
     */
    private _currentSamples;
    /**
     * The current size of the renderer's canvas
     * in logical pixel unit.
     *
     * @private
     * @type {Vector2}
     */
    private _currentSize;
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
     * @param {RenderTarget} renderTarget - The internal render target.
     */
    foveateBoundTexture(renderTarget: RenderTarget): void;
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
     * @return {Mesh} A mesh representing the quadratic XR layer. This mesh should be added to the XR scene.
     */
    createQuadLayer(width: number, height: number, translation: Vector3, quaternion: Quaternion, pixelwidth: number, pixelheight: number, rendercall: Function, attributes?: Object): Mesh;
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
     * @return {Mesh} A mesh representing the cylindrical XR layer. This mesh should be added to the XR scene.
     */
    createCylinderLayer(radius: number, centralAngle: number, aspectratio: number, translation: Vector3, quaternion: Quaternion, pixelwidth: number, pixelheight: number, rendercall: Function, attributes?: Object): Mesh;
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
 * Saves the state of the given renderer and scene and stores it into the given state object.
 * Besides, the function also resets the state of the renderer and scene to its default values.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
declare function resetRendererAndSceneState(renderer: Renderer, scene: Scene, state?: Object): Object;
/**
 * Saves the state of the given renderer and stores it into the given state object.
 * Besides, the function also resets the state of the renderer to its default values.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
declare function resetRendererState(renderer: Renderer, state?: Object): Object;
/**
 * Saves the state of the given scene and stores it into the given state object.
 * Besides, the function also resets the state of the scene to its default values.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
declare function resetSceneState(scene: Scene, state?: Object): Object;
/**
 * Restores the state of the given renderer and scene from the given state object.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Scene} scene - The scene.
 * @param {Object} state - The state to restore.
 */
declare function restoreRendererAndSceneState(renderer: Renderer, scene: Scene, state: Object): void;
/**
 * Restores the state of the given renderer from the given state object.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Object} state - The state to restore.
 */
declare function restoreRendererState(renderer: Renderer, state: Object): void;
/**
 * Restores the state of the given scene from the given state object.
 *
 * @private
 * @function
 * @param {Scene} scene - The scene.
 * @param {Object} state - The state to restore.
 */
declare function restoreSceneState(scene: Scene, state: Object): void;
/**
 * Saves the state of the given renderer and scene and stores it into the given state object.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
declare function saveRendererAndSceneState(renderer: Renderer, scene: Scene, state?: Object): Object;
/**
 * Saves the state of the given renderer and stores it into the given state object.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
declare function saveRendererState(renderer: Renderer, state?: Object): Object;
/**
 * Saves the state of the given scene and stores it into the given state object.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
declare function saveSceneState(scene: Scene, state?: Object): Object;
declare class ShaderCallNodeInternal extends Node {
    constructor(shaderNode: any, rawInputs: any);
    shaderNode: any;
    rawInputs: any;
    isShaderCallNodeInternal: boolean;
    generateNodeType(builder: any): any;
    getElementType(builder: any): any;
    getMemberType(builder: any, name: any): any;
    call(builder: any): any;
    setupOutput(builder: any): any;
    getOutputNode(builder: any): any;
    build(builder: any, output?: null): any;
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
declare function Fn(jsFunc: any, layout?: null): () => void;
declare function ShaderNode(jsFunc: any, nodeType: any): ShaderNodeInternal;
/**
 * Add the given node to the current stack.
 *
 * @param {Node} node - The node to add.
 * @returns {Node} The node that was added to the stack.
 */
declare function Stack(node: Node): Node;
declare function addMethodChaining(name: any, nodeElement: any): void;
declare function addNodeElement(name: any): void;
/**
 * TSL function for defining a built-in ambient occlusion context for a given node.
 *
 * @tsl
 * @function
 * @param {Node} aoNode - The ambient occlusion value node to apply.
 * @param {Node} [node=null] - The node whose context should be modified.
 * @returns {ContextNode}
 */
declare function builtinAOContext(aoNode: Node, node?: Node): ContextNode;
/**
 * TSL function for defining a built-in shadow context for a given node.
 *
 * @tsl
 * @function
 * @param {ShadowNode} shadowNode - The shadow node representing the light's shadow.
 * @param {Light} light - The light associated with the shadow.
 * @param {Node} [node=null] - The node whose context should be modified.
 * @returns {ContextNode}
 */
declare function builtinShadowContext(shadowNode: ShadowNode, light: Light, node?: Node): ContextNode;
/**
 * TSL function for creating a cache node.
 *
 * @tsl
 * @function
 * @deprecated
 * @param {Node} node - The node that should be cached.
 * @param {boolean} [parent=true] - Whether this node refers to a shared parent cache or not.
 * @returns {IsolateNode}
 */
declare function cache(node: Node, parent?: boolean): IsolateNode;
declare function defined(value: any): boolean;
/**
 * Returns the MRT texture index for the given name.
 *
 * @param {Array<Texture>} textures - The textures of a MRT-configured render target.
 * @param {string} name - The name of the MRT texture which index is requested.
 * @return {number} The texture index.
 */
declare function getTextureIndex(textures: Array<Texture>, name: string): number;
/**
 * Creates an inspector node to wrap around a given node for inspection purposes.
 *
 * @tsl
 * @param {Node} node - The node to inspect.
 * @param {string} [name=''] - Optional name for the inspector node.
 * @param {Function|null} [callback=null] - Optional callback to modify the node during setup.
 * @returns {Node} The inspector node.
 */
declare function inspector(node: Node, name?: string, callback?: Function | null): Node;
/**
 * TSL function for defining a label context value for a given node.
 *
 * @tsl
 * @function
 * @deprecated
 * @param {Node} node - The node whose context should be modified.
 * @param {string} name - The name/label to set.
 * @returns {ContextNode}
 */
declare function label(node: Node, name: string): ContextNode;
/**
 * TSL function for getting the position in world space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<vec3>} The light's position in world space.
 */
declare function lightPosition(light: Light): UniformNode<any>;
/**
 * TSL function for getting projected uv coordinates for the given light.
 * Relevant when using maps with spot lights.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @param {Node<vec3>} [position=positionWorld] -The position to project.
 * @returns {Node<vec3>} The projected uvs.
 */
declare function lightProjectionUV(light: Light, position?: Node<any>): Node<any>;
/**
 * TSL function for getting a shadow matrix uniform node for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<mat4>} The shadow matrix uniform node.
 */
declare function lightShadowMatrix(light: Light): UniformNode<any>;
/**
 * TSL function for getting the light target position in world space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<vec3>} The light target position in world space.
 */
declare function lightTargetPosition(light: Light): UniformNode<any>;
/**
 * TSL function for getting the position in view space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light - The light source.
 * @returns {UniformNode<vec3>} The light's position in view space.
 */
declare function lightViewPosition(light: Light): UniformNode<any>;
/**
 * TSL function for creating an `OverrideContextNode` to override a single target node.
 *
 * ```js
 * material.contextNode = overrideNode( positionLocal, ( builder ) => positionLocal.add( vec3( 1, 0, 0 ) ) );
 * ```
 *
 * @tsl
 * @function
 * @param {Node} targetNode - The target node that should be overridden.
 * @param {Function|Node|null} [callback=null] - A callback function returning the overriding node (which receives the builder as its argument), or the overriding node itself.
 * @param {Node|null} [flowNode=null] - The node whose context should be modified.
 * @return {OverrideContextNode} The created override context node.
 */
declare function overrideNode(targetNode: Node, callback?: Function | Node | null, flowNode?: Node | null): OverrideContextNode;
/**
 * TSL function for creating an `OverrideContextNode` to override multiple target nodes.
 *
 * ```js
 * material.contextNode = overrideNodes( [
 * 	[ positionView, customPositionView ],
 * 	[ positionViewDirection, ( builder ) => customPositionViewDirection ]
 * ] );
 * ```
 *
 * @tsl
 * @function
 * @param {Map<Node, (Function|Node)>|Array<Array<Node|Function|Node>>} overrides - The overrides mapping target nodes to callback functions or overriding nodes.
 * @param {Node|null} [flowNode=null] - The node whose context should be modified.
 * @return {OverrideContextNode} The created override context node.
 */
declare function overrideNodes(overrides: Map<Node, (Function | Node)> | Array<Array<Node | Function | Node>>, flowNode?: Node | null): OverrideContextNode;
/**
 * Represents the texture of a pass node.
 *
 * @augments TextureNode
 */
declare class PassTextureNode extends TextureNode {
    /**
     * Constructs a new pass texture node.
     *
     * @param {PassNode} passNode - The pass node.
     * @param {Texture} texture - The output texture.
     */
    constructor(passNode: PassNode, texture: Texture);
    /**
     * A reference to the pass node.
     *
     * @type {PassNode}
     */
    passNode: PassNode;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @default true
     * @readonly
     */
    readonly isPassTextureNode: boolean;
    setup(builder: any): void;
    clone(): any;
}
/**
 * This node allows to remap a node value from one range into another but with enabled clamping. E.g a value of
 * `0.4` in the range `[ 0.3, 0.5 ]` should be remapped into the normalized range `[ 0, 1 ]`.
 * `remapClamp` takes care of that and converts the original value of `0.4` to `0.5`.
 *
 * @tsl
 * @function
 * @param {Node} node - The node that should be remapped.
 * @param {Node} inLowNode - The source or current lower bound of the range.
 * @param {Node} inHighNode - The source or current upper bound of the range.
 * @param {?Node} [outLowNode=float(0)] - The target lower bound of the range.
 * @param {?Node} [outHighNode=float(1)] - The target upper bound of the range.
 * @returns {Node}
 */
declare function remapClamp(node: Node, inLowNode: Node, inHighNode: Node, outLowNode?: Node | null, outHighNode?: Node | null): Node;
/**
 * Replaces the default UV coordinates used in texture lookups.
 *
 * ```js
 *material.contextNode = replaceDefaultUV( ( textureNode ) => {
 *
 *	// ...
 *	return customUVCoordinates;
 *
 *} );
 *```
 *
 * @tsl
 * @function
 * @param {function(Node):Node<vec2>|Node<vec2>} callback - A callback that receives the texture node
 * and must return the new uv coordinates.
 * @param {Node} [node=null] - An optional node to which the context will be applied.
 * @return {ContextNode} A context node that replaces the default UV coordinates.
 */
declare function replaceDefaultUV(callback: (arg0: Node) => Node<any> | Node<any>, node?: Node): ContextNode;
/**
 * Represents the element access on uniform array nodes.
 *
 * @augments ArrayElementNode
 */
declare class UniformArrayElementNode extends ArrayElementNode {
    /**
     * Constructs a new buffer node.
     *
     * @param {UniformArrayNode} uniformArrayNode - The uniform array node to access.
     * @param {IndexNode} indexNode - The index data that define the position of the accessed element in the array.
     */
    constructor(uniformArrayNode: UniformArrayNode, indexNode: IndexNode);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayBufferElementNode: boolean;
    generate(builder: any): any;
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
     * @param {BufferAttribute} attribute - The storage buffer attribute to read frm.
     * @param {ReadbackBuffer|ArrayBuffer} target - The storage buffer attribute.
     * @param {number} offset - The storage buffer attribute.
     * @param {number} count - The offset from which to start reading the
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: ReadbackBuffer | ArrayBuffer, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
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
     * @param {number} faceIndex - The face index.
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
    currentBlendSrc: any;
    currentBlendDst: number | null;
    currentBlendSrcAlpha: number | null;
    currentBlendDstAlpha: number | null;
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
    setMRTBlending(textures: any, mrt: any, material: any): void;
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
     * `gl.blendFunc()` and  `gl.blendFuncSeparate()` are only called when necessary.
     *
     * @param {number} blending - The blending type.
     * @param {number} blendEquation - The blending equation.
     * @param {number} blendSrc - Only relevant for custom blending. The RGB source blending factor.
     * @param {number} blendDst - Only relevant for custom blending. The RGB destination blending factor.
     * @param {number} blendEquationAlpha - Only relevant for custom blending. The blending equation for alpha.
     * @param {number} blendSrcAlpha - Only relevant for custom blending. The alpha source blending factor.
     * @param {number} blendDstAlpha - Only relevant for custom blending. The alpha destination blending factor.
     * @param {boolean} premultipliedAlpha - Whether premultiplied alpha is enabled or not.
     */
    setBlending(blending: number, blendEquation: number, blendSrc: number, blendDst: number, blendEquationAlpha: number, blendSrcAlpha: number, blendDstAlpha: number, premultipliedAlpha: boolean): void;
    currentBlendEquation: any;
    currentBlendEquationAlpha: number | undefined;
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
     * @param {number} name - The paramter to get the value for.
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
     */
    constructor(cacheKey: string, computeProgram: ProgrammableStage);
    /**
     * The pipeline's compute shader.
     *
     * @type {ProgrammableStage}
     */
    computeProgram: ProgrammableStage;
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
     * @param {?Array<Object>} [transforms=null] - The transforms (only relevant for compute stages with WebGL 2 which uses Transform Feedback).
     * @param {?Array<Object>} [attributes=null] - The attributes (only relevant for compute stages with WebGL 2 which uses Transform Feedback).
     */
    constructor(code: string, stage: ("vertex" | "fragment" | "compute"), name: string, transforms?: Array<Object> | null, attributes?: Array<Object> | null);
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
     * The transforms (only relevant for compute stages with WebGL 2 which uses Transform Feedback).
     *
     * @type {?Array<Object>}
     */
    transforms: Array<Object> | null;
    /**
     * The attributes (only relevant for compute stages with WebGL 2 which uses Transform Feedback).
     *
     * @type {?Array<Object>}
     */
    attributes: Array<Object> | null;
    /**
     * How often the programmable stage is currently in use.
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
     * This method creates the vertex buffer layout data which are
     * require when creating a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {Array<Object>} An array holding objects which describe the vertex buffer layout.
     */
    createShaderVertexBuffers(renderObject: RenderObject): Array<Object>;
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
     * @param {BufferAttribute} attribute - The storage buffer attribute to read frm.
     * @param {number} count - The offset from which to start reading the
     * @param {number} offset - The storage buffer attribute.
     * @param {ReadbackBuffer|ArrayBuffer} target - The storage buffer attribute.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: ReadbackBuffer | ArrayBuffer, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
    /**
     * Returns the vertex format of the given buffer attribute.
     *
     * @private
     * @param {BufferAttribute} geometryAttribute - The buffer attribute.
     * @return {string|undefined} The vertex format (e.g. 'float32x3').
     */
    private _getVertexFormat;
    /**
     * Utility method for handling interleaved buffer attributes correctly.
     * To process them, their `InterleavedBuffer` is returned.
     *
     * @private
     * @param {BufferAttribute} attribute - The attribute.
     * @return {BufferAttribute|InterleavedBuffer}
     */
    private _getBufferAttribute;
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
     * @param {number} cacheIndex - The cache index.
     * @param {number} version - The version.
     */
    createBindings(bindGroup: BindGroup, bindings: Array<BindGroup>, cacheIndex: number, version?: number): void;
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
     */
    createComputePipeline(pipeline: ComputePipeline, bindings: Array<BindGroup>): void;
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
     * @param {Texture} texture - The texture to create the sampler for.
     * @param {TextureNode} textureNode - The texture node to update the sampler with.
     * @return {string} The current sampler key.
     */
    updateSampler(texture: Texture, textureNode: TextureNode): string;
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
     * @param {number} faceIndex - The face index.
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
 * Represents an element of a 'workgroup' scoped buffer.
 *
 * @augments ArrayElementNode
 */
declare class WorkgroupInfoElementNode extends ArrayElementNode {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWorkgroupInfoElementNode: boolean;
    generate(builder: any, output: any): any;
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
     * The shader stages in which the binding's resource is visible.
     *
     * @return {number} The visibility bitmask.
     */
    getVisibility(): number;
    /**
     * Clones the binding.
     *
     * @return {Binding} The cloned binding.
     */
    clone(): Binding;
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
     * Returns a node builder state for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @param {boolean} [useAsync=false] - Whether to use async build with yielding.
     * @return {NodeBuilderState|Promise<NodeBuilderState>} The node builder state (or Promise if async).
     */
    getForRender(renderObject: RenderObject, useAsync?: boolean): NodeBuilderState | Promise<NodeBuilderState>;
    /**
     * Async version of getForRender() that yields to main thread during build.
     * Use this in compileAsync() to prevent blocking the main thread.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {Promise<NodeBuilderState>} A promise that resolves to the node builder state.
     */
    getForRenderAsync(renderObject: RenderObject): Promise<NodeBuilderState>;
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
     * @return {NodeBuilderState} The node builder state.
     */
    getForCompute(computeNode: Node): NodeBuilderState;
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
    getNodeFrame(renderer?: Renderer, scene?: null, object?: null, camera?: null, material?: null): Renderer;
    getNodeFrameForRender(renderObject: any): Renderer;
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
     * Returns `true` if the given render object requires a refresh.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {boolean} Whether the given render object requires a refresh or not.
     */
    needsRefresh(renderObject: RenderObject): boolean;
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
     * @param {Attributes} attributes - Renderer component for managing attributes.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(attributes: Attributes, info: Info);
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
     * Stores the event listeners attached to geometries.
     *
     * @private
     * @type {Map<BufferGeometry,Function>}
     */
    private _geometryDisposeListeners;
    /**
     * Returns `true` if the given render object has an initialized geometry.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {boolean} Whether if the given render object has an initialized geometry or not.
     */
    has(renderObject: RenderObject): boolean;
    /**
     * Prepares the geometry of the given render object for rendering.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    updateForRender(renderObject: RenderObject): void;
    /**
     * Initializes the geometry of the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     */
    initGeometry(renderObject: RenderObject): void;
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
/**
 * Data structure for the renderer. It allows defining values
 * with chained, hierarchical keys. Keys are meant to be
 * objects since the module internally works with Weak Maps
 * for performance reasons.
 *
 * @private
 */
declare class ChainMap {
    /**
     * A map of Weak Maps by their key length.
     *
     * @type {Object<number, WeakMap>}
     */
    weakMaps: {
        [x: number]: WeakMap<any, any>;
    };
    /**
     * Returns the Weak Map for the given keys.
     *
     * @param {Array<Object>} keys - List of keys.
     * @return {WeakMap} The weak map.
     */
    _getWeakMap(keys: Array<Object>): WeakMap<any, any>;
    /**
     * Returns the value for the given array of keys.
     *
     * @param {Array<Object>} keys - List of keys.
     * @return {any} The value. Returns `undefined` if no value was found.
     */
    get(keys: Array<Object>): any;
    /**
     * Sets the value for the given keys.
     *
     * @param {Array<Object>} keys - List of keys.
     * @param {any} value - The value to set.
     * @return {ChainMap} A reference to this Chain Map.
     */
    set(keys: Array<Object>, value: any): ChainMap;
    /**
     * Deletes a value for the given keys.
     *
     * @param {Array<Object>} keys - The keys.
     * @return {boolean} Returns `true` if the value has been removed successfully and `false` if the value has not be found.
     */
    delete(keys: Array<Object>): boolean;
}
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
     * Deletes the data for the given attribute.
     *
     * @param {BufferAttribute} attribute - The attribute.
     * @return {?Object} The deleted attribute data.
     */
    delete(attribute: BufferAttribute): Object | null;
    /**
     * Updates the given attribute. This method creates attribute buffers
     * for new attributes and updates data for existing ones.
     *
     * @param {BufferAttribute} attribute - The attribute to update.
     * @param {number} type - The attribute type.
     */
    update(attribute: BufferAttribute, type: number): void;
    /**
     * Utility method for handling interleaved buffer attributes correctly.
     * To process them, their `InterleavedBuffer` is returned.
     *
     * @param {BufferAttribute} attribute - The attribute.
     * @return {BufferAttribute|InterleavedBuffer}
     */
    _getBufferAttribute(attribute: BufferAttribute): BufferAttribute | InterleavedBuffer;
}
export { ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveBlending, AgXToneMapping, AlphaFormat, AlwaysCompare, AlwaysDepth, AlwaysStencilFunc, AmbientLight, ArrayCamera, BackSide, BasicShadowMap, BoxGeometry, BufferAttribute, BufferGeometry, ByteType, CineonToneMapping, ClampToEdgeWrapping, Color, ColorManagement, Compatibility, CubeCamera, CubeDepthTexture, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeUVReflectionMapping, CullFaceBack, CullFaceFront, CullFaceNone, CustomBlending, CylinderGeometry, DataArrayTexture, DataTexture, DecrementStencilOp, DecrementWrapStencilOp, DepthFormat, DepthStencilFormat, DepthTexture, DirectionalLight, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicDrawUsage, EqualCompare, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, EventDispatcher, FileLoader, Float16BufferAttribute, Float32BufferAttribute, FloatType, FramebufferTexture, FrontSide, Frustum, FrustumArray, GreaterCompare, GreaterDepth, GreaterEqualCompare, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, Group, HalfFloatType, HemisphereLight, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedInterleavedBuffer, IntType, InterleavedBuffer, InterleavedBufferAttribute, InvertStencilOp, KeepStencilOp, LessCompare, LessDepth, LessEqualCompare, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, LightProbe, LineBasicMaterial, LineDashedMaterial, LinearFilter, LinearMipMapLinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearSRGBColorSpace, LinearToneMapping, LinearTransfer, Loader, Material, MaterialBlending, MaterialLoader, MathUtils, Matrix2, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeutralToneMapping, NeverCompare, NeverDepth, NeverStencilFunc, NoBlending, NoColorSpace, NoNormalPacking, NoToneMapping, NormalBlending, NormalGAPacking, NormalRGPacking, NotEqualCompare, NotEqualDepth, NotEqualStencilFunc, Object3D, ObjectLoader, ObjectSpaceNormalMap, OneFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PerspectiveCamera, Plane, PlaneGeometry, PointLight, PointsMaterial, Quaternion, R11_EAC_Format, RED_GREEN_RGTC2_Format, RED_RGTC1_Format, REVISION, RG11_EAC_Format, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBFormat, RGBIntegerFormat, RGB_BPTC_SIGNED_Format, RGB_BPTC_UNSIGNED_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGFormat, RGIntegerFormat, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RenderTarget, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, SIGNED_R11_EAC_Format, SIGNED_RED_GREEN_RGTC2_Format, SIGNED_RED_RGTC1_Format, SIGNED_RG11_EAC_Format, SRGBColorSpace, SRGBTransfer, Scene, ShadowMaterial, ShortType, Sphere, SphereGeometry, SpotLight, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticDrawUsage, SubtractEquation, SubtractiveBlending, TangentSpaceNormalMap, Texture, TimestampQuery, UVMapping, Uint16BufferAttribute, Uint32BufferAttribute, UnsignedByteType, UnsignedInt101111Type, UnsignedInt248Type, UnsignedInt5999Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, WebGLCoordinateSystem, WebGPUCoordinateSystem, WebXRController, ZeroFactor, ZeroStencilOp, createCanvasElement, error, log$1 as log, warn, warnOnce };
export { AdditiveAnimationBlendMode, AnimationAction, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrowHelper, AttachedBindMode, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BasicDepthPacking, BatchedMesh, BezierInterpolant, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxHelper, BufferGeometryLoader, Cache, Camera, CameraHelper, CanvasTexture, CapsuleGeometry, CatmullRomCurve3, CircleGeometry, Clock, ColorKeyframeTrack, CompressedArrayTexture, CompressedCubeTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, ConstantAlphaFactor, ConstantColorFactor, Controls, CubeTextureLoader, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceFrontBack, Curve, CurvePath, CustomToneMapping, Cylindrical, Data3DTexture, DataTextureLoader, DataUtils, DefaultLoadingManager, DetachedBindMode, DirectionalLightHelper, DiscreteInterpolant, DodecahedronGeometry, DynamicCopyUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, Euler, ExternalTexture, ExtrudeGeometry, Fog, FogExp2, GLBufferAttribute, GLSL1, GLSL3, GridHelper, HTMLTexture, HemisphereLightHelper, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, InstancedBufferGeometry, InstancedMesh, Int16BufferAttribute, Int32BufferAttribute, Int8BufferAttribute, Interpolant, InterpolateBezier, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InterpolationSamplingMode, InterpolationSamplingType, KeyframeTrack, LOD, LatheGeometry, Layers, Light, Line, Line3, LineCurve, LineCurve3, LineLoop, LineSegments, LinearInterpolant, LinearMipMapNearestFilter, LoaderUtils, LoadingManager, LoopOnce, LoopPingPong, LoopRepeat, MOUSE, MeshDepthMaterial, MeshDistanceMaterial, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NormalAnimationBlendMode, NumberKeyframeTrack, OctahedronGeometry, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, Path, PlaneHelper, PointLightHelper, Points, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, QuaternionKeyframeTrack, QuaternionLinearInterpolant, RGBADepthPacking, RGBDepthPacking, RGDepthPacking, RawShaderMaterial, Ray, Raycaster, RenderTarget3D, RingGeometry, ShaderMaterial, Shape, ShapeGeometry, ShapePath, ShapeUtils, Skeleton, SkeletonHelper, SkinnedMesh, Source, Spherical, SphericalHarmonics3, SplineCurve, SpotLightHelper, Sprite, StaticCopyUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, TOUCH, TetrahedronGeometry, TextureLoader, TextureUtils, Timer, TorusGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeGeometry, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsGroup, VectorKeyframeTrack, VideoFrameTexture, VideoTexture, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGLRenderTarget, WireframeGeometry, WrapAroundEnding, ZeroCurvatureEnding, ZeroSlopeEnding, getConsoleFunction, setConsoleFunction } from "./three.core.js";
