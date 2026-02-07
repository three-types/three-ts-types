export default NodeBuilder;
/**
 * Base class for builders which generate a shader program based
 * on a 3D object and its node material definition.
 */
declare class NodeBuilder {
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
     * @type {Array<Node>}
     */
    nodes: Array<Node>;
    /**
     * A list of all sequential nodes.
     *
     * @type {Array<Node>}
     */
    sequentialNodes: Array<Node>;
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
     * Returns the bind groups of the current renderer.
     *
     * @return {ChainMap} The cache.
     */
    getBindGroupsCache(): ChainMap;
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
     * Calling this method increases the usage count for the given node by one.
     *
     * @param {Node} node - The node to increase the usage count for.
     * @return {number} The updated usage count.
     */
    increaseUsage(node: Node): number;
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
     * @return {NodeAttribute} The node attribute.
     */
    getBufferAttributeFromNode(node: BufferAttributeNode, type: string): NodeAttribute;
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
     * @return {string} The variable code section.
     */
    getVars(shaderStage: ("vertex" | "fragment" | "compute" | "any")): string;
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
     * Central build method which controls the build for the given object.
     *
     * @return {NodeBuilder} A reference to this node builder.
     */
    build(): NodeBuilder;
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
import BindGroup from '../../renderers/common/BindGroup.js';
import NodeAttribute from './NodeAttribute.js';
import NodeVarying from './NodeVarying.js';
import NodeCode from './NodeCode.js';
import NodeVar from './NodeVar.js';
import FunctionNode from '../code/FunctionNode.js';
import NodeCache from './NodeCache.js';
import ChainMap from '../../renderers/common/ChainMap.js';
import { RenderTarget } from '../../core/RenderTarget.js';
import CubeRenderTarget from '../../renderers/common/CubeRenderTarget.js';
import StructType from './StructType.js';
import NodeUniform from './NodeUniform.js';
