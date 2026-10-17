/**
 * ~ObjectParams
 */
export type LoopNode = {
    /**
     * - The initial value of the loop variable.
     */
    start?: number | Node<any> | Node<any>;
    /**
     * - The value the loop variable is compared against. If omitted, the loop counts down from `start - 1` to `0`.
     */
    end?: number | Node<any> | Node<any>;
    /**
     * - The name of the loop variable. Defaults to `i`, `j`, `k` and so on.
     */
    name?: string | undefined;
    /**
     * - The data type of the loop variable.
     */
    type?: string | undefined;
    /**
     * - The comparison operator. The loop runs as long as the comparison is true. Inferred from `start` and `end` if not set.
     */
    condition?: ">" | "<" | "<=" | ">=" | undefined;
    /**
     * - Defines how the loop variable is updated after each iteration. Inferred from `condition` and `type` if not set.
     */
    update?: string | number | Function | Node | undefined;
};
/**
 * The loop body.
 */
export type loopBodyCallback = (inputs: {
    [x: string]: Node;
}) => any;
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
 * @augments Node
 */
export class ArrayNode extends Node {
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
 * @augments Node
 */
export class AssignNode extends Node {
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
    static get ATOMIC_LOAD(): string;
    static get ATOMIC_STORE(): string;
    static get ATOMIC_ADD(): string;
    static get ATOMIC_SUB(): string;
    static get ATOMIC_MAX(): string;
    static get ATOMIC_MIN(): string;
    static get ATOMIC_AND(): string;
    static get ATOMIC_OR(): string;
    static get ATOMIC_XOR(): string;
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
export function BRDF_EON(): void;
export function BRDF_GGX(): void;
export function BRDF_Lambert(): void;
export function BRDF_Sheen(): void;
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
export function BasicPointShadowFilter(): void;
export function BasicShadowFilter(): void;
/**
 * This node represents an operation that reinterprets the bit representation of a value
 * in one type as a value in another type.
 *
 * @augments Node
 */
export class BitcastNode extends Node {
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
    static get COUNT_TRAILING_ZEROS(): string;
    static get COUNT_LEADING_ZEROS(): string;
    static get COUNT_ONE_BITS(): string;
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
    constructor(blending?: (number | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending | number));
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
    blending: (number | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending | number);
    /**
     * Defines the blending source factor.
     *
     * This determines how the source (incoming) fragment color is factored before being added
     * to the destination (existing) fragment color in the frame buffer.
     *
     * @type {(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default SrcAlphaFactor
     */
    blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
    /**
     * Defines the blending destination factor.
     *
     * This determines how the destination (existing) fragment color in the frame buffer
     * is factored before being combined with the source (incoming) fragment color.
     *
     * @type {(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default OneMinusSrcAlphaFactor
     */
    blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
    /**
     * Defines the blending equation.
     *
     * This determines how the source and destination colors are combined.
     *
     * @type {(AddEquation|SubtractEquation|ReverseSubtractEquation|MinEquation|MaxEquation)}
     * @default AddEquation
     */
    blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
    /**
     * Defines the blending source alpha factor.
     *
     * When set, this allows separate control of the alpha channel's source blending factor.
     * If `null`, {@link BlendMode#blendSrc} is used for the alpha channel as well.
     *
     * @type {?(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default null
     */
    blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
    /**
     * Defines the blending destination alpha factor.
     *
     * When set, this allows separate control of the alpha channel's destination blending factor.
     * If `null`, {@link BlendMode#blendDst} is used for the alpha channel as well.
     *
     * @type {?(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default null
     */
    blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
    /**
     * Defines the blending equation of the alpha channel.
     *
     * When set, this allows separate control of the alpha channel's blending equation.
     * If `null`, {@link BlendMode#blendEquation} is used for the alpha channel as well.
     *
     * @type {?(AddEquation|SubtractEquation|ReverseSubtractEquation|MinEquation|MaxEquation)}
     * @default null
     */
    blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
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
/**
 * TSL function for inserting a `break` expression into the shader.
 *
 * @tsl
 * @function
 * @returns {ExpressionNode}
 */
export function Break(): ExpressionNode;
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
 * @augments Node
 */
export class BumpMapNode extends Node {
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
/**
 * Data structure for the renderer. It allows defining values
 * with chained, hierarchical keys. Keys are meant to be
 * objects since the module internally works with Weak Maps
 * for performance reasons.
 *
 * @private
 */
export class ChainMap {
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
    hardwareClipping: any;
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
/**
 * A four-component version of {@link Color} which is internally
 * used by the renderer to represents clear color with alpha as
 * one object.
 *
 * @private
 * @augments Color
 */
export class Color4 extends Color {
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
 * This node represents a color space conversion. Meaning it converts
 * a color value from a source to a target color space.
 *
 * @augments Node
 */
export class ColorSpaceNode extends Node {
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
     * Returns the update type of {@link Node#updateBefore}.
     *
     * @param {NodeFrame} [frame] - The current node frame.
     * @return {NodeUpdateType} The update type.
     */
    getUpdateBeforeType(frame?: NodeFrame): {
        NONE: string;
        FRAME: string;
        RENDER: string;
        OBJECT: string;
    };
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
 * When the condition is itself a vector (e.g. the `bvec4` produced by
 * `someVec4.greaterThanEqual( someOtherVec4 )`), `select()` resolves
 * per-component - each output lane picks independently based on its own
 * condition component, the same way WGSL's native `select()` and GLSL's
 * `mix( x, y, bvecN )` do - rather than picking one branch for the whole
 * vector. The condition and values are converted to the largest vector width,
 * with the condition converted to boolean components. Scalar values are broadcast.
 *
 * ```js
 * // per-component: each channel picks independently
 * const clamped = value.greaterThan( vec3( 1.0 ) ).select( vec3( 1.0 ), value );
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
 * TSL function for creating a const node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node for which a constant should be created.
 * @param {?string} name - The name of the constant in the shader.
 * @returns {VarNode}
 */
export function Const(node: Node, name?: string | null): VarNode;
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
     * Whether this constant is an implicit number whose type can adapt to other operands.
     *
     * @type {boolean}
     * @default false
     */
    isWeak: boolean;
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
 * TSL function for inserting a `continue` expression into the shader.
 *
 * @tsl
 * @function
 * @returns {ExpressionNode}
 */
export function Continue(): ExpressionNode;
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
export function DFGLUT(): void;
export const D_GGX: any;
export const D_GGX_Anisotropic: any;
export class DebugNode extends Node {
    constructor(node: any, callback?: null);
    node: any;
    callback: any;
    generateNodeType(builder: any): any;
    setup(builder: any): any;
    analyze(builder: any): any;
    generate(builder: any): any;
}
/**
 * Represents a `discard` shader operation in TSL.
 *
 * @tsl
 * @function
 * @param {?ConditionalNode} conditional - An optional conditional node. It allows to decide whether the discard should be executed or not.
 * @return {Node} The `discard` expression.
 */
export function Discard(conditional: ConditionalNode | null): Node;
export function EON_DirectionalAlbedo(): void;
/**
 * A small value used to handle floating-point precision errors.
 *
 * @tsl
 * @type {Node<float>}
 */
export const EPSILON: Node<any>;
export function EnvironmentBRDF(): void;
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
    setup(builder: any): Node | null;
    update(frame: any): void;
    updateBefore(frame: any): void;
    updateAfter(frame: any): void;
}
export namespace EventNode {
    let OBJECT: string;
    let MATERIAL: string;
    let FRAME: string;
    let AFTER_OBJECT: string;
    let BEFORE_OBJECT: string;
    let BEFORE_MATERIAL: string;
    let BEFORE_FRAME: string;
    let BEFORE_RENDER_PIPELINE: string;
    let AFTER_RENDER_PIPELINE: string;
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
export function F_Schlick(): void;
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
 * @augments Node
 */
export class FlipNode extends Node {
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
export function Fn(jsFunc: any, layout?: null): () => void;
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
/**
 * This module represents the call of a {@link FunctionNode}. Developers are usually not confronted
 * with this module since they use the predefined TSL syntax `wgslFn` and `glslFn` which encapsulate
 * this logic.
 *
 * @augments Node
 */
export class FunctionCallNode extends Node {
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
 * Represents PI / 2.
 *
 * @tsl
 * @type {Node<float>}
 */
export const HALF_PI: Node<any>;
/**
 * Represents infinity.
 *
 * @tsl
 * @type {Node<float>}
 */
export const INFINITY: Node<any>;
/**
 * Represent a conditional node using if/else statements.
 *
 * ```js
 * If( condition, function )
 * 	.ElseIf( condition, function )
 * 	.Else( function )
 * ```
 * @tsl
 * @function
 * @param {...any} params - The parameters for the conditional node.
 * @returns {StackNode} The conditional node.
 */
export function If(...params: any[]): StackNode;
/**
 * This class represents shader indices of different types. The following predefined node
 * objects cover frequent use cases:
 *
 * - `vertexIndex`: The index of a vertex within a mesh.
 * - `instanceIndex`: The index of either a mesh instance or an invocation of a compute shader.
 * - `drawIndex`: The index of a draw call.
 * - `invocationLocalIndex`: The index of a compute invocation within the scope of a workgroup.
 * - `invocationSubgroupIndex`: The index of a compute invocation within the scope of a subgroup.
 * - `subgroupIndex`: The index of a compute invocation's subgroup within its workgroup.
 *
 * @augments Node
 */
export class IndexNode extends Node {
    /**
     * Constructs a new index node.
     *
     * @param {('vertex'|'instance'|'subgroup'|'invocationLocal'|'invocationSubgroup'|'draw')} scope - The scope of the index node.
     */
    constructor(scope: ("vertex" | "instance" | "subgroup" | "invocationLocal" | "invocationSubgroup" | "draw"));
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
     * Indicates whether the inspector is running.
     *
     * @type {boolean}
     * @default false
     */
    isRunning: boolean;
    /**
     * Indicates whether the inspector is enabled.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
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
    /**
     * Frees all internal resources of the inspector.
     */
    dispose(): void;
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
 * @augments Node
 */
export class JoinNode extends Node {
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
export const LTC_Evaluate: any;
export const LTC_Evaluate_Volume: any;
export const LTC_Uv: any;
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
     * Returns an array of the scene's lights.
     *
     * The light variations are shader-dependent;
     * if this array changes, the shader needs to be recreated.
     *
     * @return {Array<Light>} The scene's lights.
     */
    getBuiltinLights(): Array<Light>;
    /**
     * Whether the scene has lights or not.
     *
     * @type {boolean}
     */
    get hasLights(): boolean;
}
/**
 * TSL function for creating a loop node.
 *
 * @tsl
 * @function
 * @param {...(LoopNode~Params|loopBodyCallback)} params - Any number of loop parameters followed by the loop body.
 * @returns {LoopNode}
 */
export function Loop(...params: any[]): LoopNode;
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
     * Whether this node allows caching its result in a temporary variable.
     * Caching is enabled by default. Override this method to disable it.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether temporary caching is allowed.
     */
    isCacheable(): boolean;
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
     * @param {NodeFrame} [frame] - The current node frame.
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
     * @param {NodeFrame} [frame] - The current node frame.
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
     * @param {NodeFrame} [frame] - The current node frame.
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
 * The module also provides `Break()` and `Continue()` TSL expressions for loop control.
 * @augments Node
 */
export class LoopNode extends Node {
    /**
     * Constructs a new loop node.
     *
     * @param {Array<LoopNode~Params|loopBodyCallback>} params - Any number of loop parameters followed by the loop body.
     */
    constructor(params?: any[]);
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
    _getInternalParams(): any[];
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
     * A dictionary storing the clear colors for each output.
     *
     * @type {Object<string, Color4>}
     */
    clearColors: {
        [x: string]: Color4;
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
     * Sets the clear color for the given output name.
     *
     * @param {string} name - The name of the output.
     * @param {number|string|Color} color - The clear color.
     * @param {number} [alpha=1] - The clear alpha.
     * @return {MRTNode} The current MRT node.
     */
    setClearColor(name: string, color: number | string | Color, alpha?: number): MRTNode;
    /**
     * Returns the clear color for the given output name.
     *
     * @param {string} name - The name of the output.
     * @return {?Color4} The clear color. Returns `null` if no clear color is defined
     * which means the renderer's default clear policy is applied.
     */
    getClearColor(name: string): Color4 | null;
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
    let DIFFUSE_ROUGHNESS: string;
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
    let RETROREFLECTIVITY: string;
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
 * @augments Node
 */
export class MathNode extends Node {
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
export namespace NodeAccess {
    let READ_ONLY: string;
    let WRITE_ONLY: string;
    let READ_WRITE: string;
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
     * This node can be used to overwrite the final output of the material.
     *
     * Unlike {@link NodeMaterial#fragmentNode}, the built-in material logic
     * (diffuse color, lighting, etc.) is still evaluated; assigning a node
     * only replaces the resulting output color.
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
     * Returns `true` if the given 3D object uses instance buffers with dynamic draw usage.
     * Such buffers must be uploaded once per render so the render object requires a full refresh.
     *
     * @param {Object3D} object - The 3D object.
     * @return {boolean} Whether the given 3D object uses instance buffers with dynamic draw usage or not.
     */
    hasDynamicInstancing(object: Object3D): boolean;
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
     * Returns a texture data structure holding the texture state for
     * monitoring.
     *
     * @param {Texture} texture - The texture.
     * @return {Object} An object for monitoring the texture.
     */
    getTextureData(texture: Texture): Object;
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
     * @return {number} The refresh type, see {@link RenderObjectRefreshType}.
     */
    needsRefresh(renderObject: RenderObject, nodeFrame: NodeFrame): number;
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
    getTextureType: typeof getTextureType;
    getTypeFromLength: typeof getTypeFromLength;
    getTypedArrayFromType: typeof getTypedArrayFromType;
    getValueFromType: typeof getValueFromType;
    getValueType: typeof getValueType;
    hash: (...params: number[]) => number;
    hashArray: (array: Array<number>) => number;
    hashString: (str: string) => number;
    isArrayAsParameter: typeof isArrayAsParameter;
}>;
/**
 * This class can be used for applying normals maps to materials.
 *
 * ```js
 * material.normalNode = normalMap( texture( normalTex ) );
 * ```
 *
 * @augments Node
 */
export class NormalMapNode extends Node {
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
/**
 * Creates an event that triggers a function every time an object (Mesh|Sprite) has been rendered.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnAfterObjectUpdate(callback: Function): EventNode;
/**
 * Creates an event that triggers a function after the render pipeline is rendered.
 *
 * The node must be part of a node chain that is used as the output of a `RenderPipeline`,
 * otherwise the event is ignored.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnAfterRenderPipeline(callback: Function): EventNode;
/**
 * Creates an event that triggers a function before every frame.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnBeforeFrameUpdate(callback: Function): EventNode;
/**
 * Creates an event that triggers a function before the material is updated.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnBeforeMaterialUpdate(callback: Function): EventNode;
/**
 * Creates an event that triggers a function before an object (Mesh|Sprite) is updated.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnBeforeObjectUpdate(callback: Function): EventNode;
/**
 * Creates an event that triggers a function before the render pipeline is rendered.
 *
 * The node must be part of a node chain that is used as the output of a `RenderPipeline`,
 * otherwise the event is ignored.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnBeforeRenderPipeline(callback: Function): EventNode;
/**
 * Creates an event that triggers a function every frame.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnFrameUpdate(callback: Function): EventNode;
/**
 * Creates an event that triggers a function when the first object that uses the material is rendered.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnMaterialUpdate(callback: Function): EventNode;
/**
 * Creates an event that triggers a function every time an object (Mesh|Sprite) is rendered.
 *
 * The event will be bound to the declared TSL function `Fn()`; it must be declared within a `Fn()` or the JS function call must be inherited from one.
 *
 * @param {Function} callback - The callback function.
 * @returns {EventNode}
 */
export function OnObjectUpdate(callback: Function): EventNode;
/**
 * This node represents basic mathematical and logical operations like addition,
 * subtraction or comparisons (e.g. `equal()`).
 *
 * @augments Node
 */
export class OperatorNode extends Node {
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
export function PCFShadowFilter(): void;
/**
 * Represents PI.
 *
 * @tsl
 * @type {Node<float>}
 */
export const PI: Node<any>;
/**
 * Represents PI * 2. Please use the non-deprecated version `TWO_PI`.
 *
 * @tsl
 * @deprecated
 * @type {Node<float>}
 */
export const PI2: Node<any>;
/**
 * Generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) for
 * image-based lighting. The result is a cube render target whose mip levels
 * store GGX-filtered radiance at increasing roughness, from a mirror at level 0
 * to roughness 1. See {@link PMREMGenerator.lodToRoughness} for the mapping.
 *
 * Filtering assumes the view direction equals the surface normal. Sharp levels
 * use GGX visible normal sampling (Heitz, 2018), while rough levels integrate a
 * lower-resolution source cubemap.
 *
 * @see {@link https://jcgt.org/published/0007/04/01/ | Sampling the GGX Distribution of Visible Normals}
 */
export class PMREMGenerator {
    /**
     * Returns the roughness a mip level of a PMREM has been prefiltered for.
     * The inverse mapping is used by the renderers when sampling a PMREM.
     *
     * @param {number} lod - The mip level.
     * @param {number} maxLod - The last mip level of the PMREM.
     * @return {number} The roughness.
     */
    static lodToRoughness(lod: number, maxLod: number): number;
    /**
     * Constructs a new PMREM generator.
     *
     * @param {Renderer} renderer - The renderer.
     */
    constructor(renderer: Renderer);
    _renderer: Renderer;
    _cubeSize: number;
    _sourceTarget: any;
    _cubeCamera: CubeCamera;
    _boxMesh: Mesh;
    _cubemapMaterial: NodeMaterial | null;
    _equirectMaterial: NodeMaterial | null;
    _blurMaterial: NodeMaterial | null;
    _ggxMaterial: NodeMaterial | null;
    _integrationMaterial: NodeMaterial | null;
    /**
     * Generates a PMREM from a scene, optionally applying a Gaussian blur before
     * GGX filtering.
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM, rounded down to a power of two and at least 256.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @param {?CubeRenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {CubeRenderTarget} The resulting PMREM.
     */
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
        renderTarget?: CubeRenderTarget | null | undefined;
    }): CubeRenderTarget;
    /**
     * Asynchronous version of {@link PMREMGenerator#fromScene}.
     *
     * @deprecated
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM, rounded down to a power of two and at least 256.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @param {?CubeRenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {Promise<CubeRenderTarget>} A Promise that resolves with the PMREM.
     * @see {@link PMREMGenerator#fromScene}
     */
    fromSceneAsync(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
        renderTarget?: CubeRenderTarget | null | undefined;
    }): Promise<CubeRenderTarget>;
    /**
     * Generates a PMREM from an LDR or HDR equirectangular texture. The cube face
     * size is one quarter of the image width, rounded down to a power of two and
     * at least 256.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {CubeRenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangularAsync}
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: CubeRenderTarget | null): CubeRenderTarget;
    /**
     * Asynchronous version of {@link PMREMGenerator#fromEquirectangular}.
     *
     * @deprecated
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<CubeRenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangular}
     */
    fromEquirectangularAsync(equirectangular: Texture, renderTarget?: CubeRenderTarget | null): Promise<CubeRenderTarget>;
    /**
     * Generates a PMREM from an LDR or HDR cubemap. The cube face size matches
     * the input, rounded down to a power of two and at least 256.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {CubeRenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemapAsync}
     */
    fromCubemap(cubemap: Texture, renderTarget?: CubeRenderTarget | null): CubeRenderTarget;
    /**
     * Asynchronous version of {@link PMREMGenerator#fromCubemap}.
     *
     * @deprecated
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<CubeRenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemap}
     */
    fromCubemapAsync(cubemap: Texture, renderTarget?: CubeRenderTarget | null): Promise<CubeRenderTarget>;
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
     * Disposes of the PMREMGenerator's internal memory. The PMREMs it returned
     * belong to the caller and are not disposed.
     */
    dispose(): void;
    _setSize(cubeSize: any): void;
    _fromTexture(texture: any, renderTarget: any): any;
    _allocateTarget(): CubeRenderTarget;
    _getSourceTarget(depthBuffer?: boolean): CubeRenderTarget | null;
    _compileMaterial(material: any): Promise<void>;
    /**
     * Renders the box mesh with the given material into all six faces of a cube render target.
     *
     * @private
     * @param {CubeRenderTarget} target - The render target.
     * @param {number} lod - The mip level to render into.
     * @param {NodeMaterial} material - The material.
     */
    private _renderCube;
    _textureToCubemap(texture: any): void;
    /**
     * Prefilters the source cubemap into the mip levels of the PMREM. The sharp levels
     * integrate the GGX lobe of their roughness with VNDF importance sampling, reading the
     * mip level of the source that matches the solid angle of each sample. The rough
     * levels weight every texel of a small source mip with the GGX lobe instead.
     *
     * @private
     * @param {CubeRenderTarget} pmremTarget - The PMREM.
     */
    private _applyPMREM;
    /**
     * Applies the initial fromScene() blur in two passes using a golden-angle
     * spiral kernel. Level 0 of the PMREM serves as the intermediate target.
     *
     * @private
     * @param {CubeRenderTarget} pmremTarget - The PMREM.
     * @param {number} sigma - The blur radius in radians.
     */
    private _blur;
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
 * @augments Node
 */
export class PMREMNode extends Node {
    /**
     * Constructs a new PMREM node.
     *
     * @param {Texture} value - The input texture.
     * @param {Node<vec3>} [uvNode=null] - The uv node.
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
     * @type {Node<vec3>}
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
     * @type {CubeTextureNode}
     */
    private _texture;
    /**
     * A uniform representing the last mip level of the PMREM.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _maxLod;
    /**
     * A uniform representing the width of the sharpest mip level of the PMREM.
     *
     * @private
     * @type {UniformNode<float>}
     */
    private _size;
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
    setup(builder: any): any;
}
/**
 * This node represents an operation that packs floating-point values of a vector into an unsigned 32-bit integer
 *
 * @augments Node
 */
export class PackFloatNode extends Node {
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
     * The component layout of the packed integer.
     *
     * @type {'2x16' | '4x8'}
     * @default '2x16'
     */
    layout: "2x16" | "4x8";
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
 * Represents one of the built-in functions of WGSL's `packed_4x8_integer_dot_product`
 * language extension. If the extension is not available, the node falls back to an
 * emulation with plain integer bit operations.
 *
 * @augments Node
 */
export class Packed4x8IntegerNode extends Node {
    static get DOT4_U8_PACKED(): string;
    static get DOT4_I8_PACKED(): string;
    static get PACK4X_I8(): string;
    static get PACK4X_U8(): string;
    static get PACK4X_I8_CLAMP(): string;
    static get PACK4X_U8_CLAMP(): string;
    static get UNPACK4X_I8(): string;
    static get UNPACK4X_U8(): string;
    /**
     * Constructs a packed 4x8 integer function node.
     *
     * @param {string} method - The WGSL built-in function name.
     * @param {Node} aNode - The first argument.
     * @param {?Node} [bNode=null] - The optional second argument.
     */
    constructor(method: string, aNode: Node, bNode?: Node | null);
    /**
     * The WGSL built-in function name.
     *
     * @type {string}
     */
    method: string;
    /**
     * The first argument.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The optional second argument.
     *
     * @type {?Node}
     */
    bNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPacked4x8IntegerNode: boolean;
    getInputType(): "uint" | "ivec4" | "uvec4";
    generateNodeType(): "uint" | "int" | "ivec4" | "uvec4";
    /**
     * Returns the reusable `Fn()` definition that emulates this node's method.
     *
     * @private
     * @returns {Function} The emulation function.
     */
    private _getEmulatedFn;
    setup(builder: any): any;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
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
 * @augments Node
 */
export class PassNode extends Node {
    /**
     * @static
     * @type {'color'}
     * @default 'color'
     */
    static get COLOR(): "color";
    /**
     * @static
     * @type {'depth'}
     * @default 'depth'
     */
    static get DEPTH(): "depth";
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
     * @default true
     */
    transparent: boolean;
    /**
     * Whether the pass is opaque.
     *
     * @type {boolean}
     * @default true
     */
    opaque: boolean;
    lighting: any;
    /**
     * Whether the renderer should automatically clear before rendering the pass.
     *
     * @type {boolean}
     * @default true
     */
    autoClear: boolean;
    /**
     * Whether the color buffer should be cleared.
     *
     * @type {boolean}
     * @default true
     */
    autoClearColor: boolean;
    /**
     * Whether the depth buffer should be cleared.
     *
     * @type {boolean}
     * @default true
     */
    autoClearDepth: boolean;
    /**
     * Whether the stencil buffer should be cleared.
     *
     * @type {boolean}
     * @default true
     */
    autoClearStencil: boolean;
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
/**
 * Module for representing point lights as nodes.
 *
 * @augments AnalyticLightNode
 */
export class PointLightNode extends AnalyticLightNode {
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
export function PointShadowFilter(): void;
/**
 * Represents the shadow implementation for point light nodes.
 *
 * @augments ShadowNode
 */
export class PointShadowNode extends ShadowNode {
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
     * @param {NodeMaterial} material - The material to render the quad mesh with.
     */
    constructor(material: NodeMaterial);
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
     * @param {?number} [width=null] - The width of the internal render target. If no width is applied, the render target is automatically resized.
     * @param {?number} [height=null] - The height of the internal render target.
     * @param {Object} [options={}] - The options for the internal render target.
     * @param {number} [options.type=HalfFloatType] - The texture type.
     * @param {boolean} [options.autoUpdate=true] - Whether the texture should automatically be updated or not.
     * @param {number} [options.resolutionScale=1] - The resolution scale.
     */
    constructor(node: Node, width?: number | null, height?: number | null, options?: {
        type?: number | undefined;
        autoUpdate?: boolean | undefined;
        resolutionScale?: number | undefined;
    });
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
     * The internal quad mesh for RTT.
     *
     * @private
     * @type {QuadMesh}
     */
    private _quadMesh;
    /**
     * The renderer state saved and restored around the RTT render.
     * Kept per instance because nested RTT nodes must not share it.
     *
     * @private
     * @type {Object}
     */
    private _rendererState;
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
     * Sets the size of the internal render target.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
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
    /**
     * Renders the node's output into the internal render target before the main render pass.
     * Handles automatic resizing of the render target when `autoResize` is enabled,
     * and skips rendering if neither `textureNeedsUpdate` nor `autoUpdate` is true.
     *
     * @param {NodeFrame} frame - The current node frame, providing access to the renderer and other frame data.
     */
    updateBefore(frame: NodeFrame): void;
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
 * This class is only relevant if the referenced property is array-like.
 * In this case, `ReferenceElementNode` allows to refer to a specific
 * element inside the data structure via an index.
 *
 * @augments ArrayElementNode
 */
export class ReferenceElementNode extends ArrayElementNode {
    /**
     * Constructs a new reference element node.
     *
     * @param {(ReferenceBaseNode|ReferenceNode)} referenceNode - The reference node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(referenceNode: (ReferenceBaseNode | ReferenceNode), indexNode: Node);
    /**
     * Similar to {@link ReferenceNode#reference}, an additional
     * property references to the current node.
     *
     * @type {?(ReferenceBaseNode|ReferenceNode)}
     * @default null
     */
    referenceNode: (ReferenceBaseNode | ReferenceNode) | null;
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
 * @augments Node
 */
export class RenderOutputNode extends Node {
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
/**
 * Represents a `return` shader operation in TSL.
 *
 * @tsl
 * @function
 * @return {ExpressionNode} The `return` expression.
 */
export function Return(): ExpressionNode;
/**
 * Applies a rotation to the given position node.
 *
 * @augments Node
 */
export class RotateNode extends Node {
    /**
     * Constructs a new rotate node.
     *
     * @param {Node} positionNode - The position node.
     * @param {Node} rotationNode - Represents the rotation that is applied to the position node. Depending
     * on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     * @param {string} [order='XYZ'] - The Euler rotation order. Only used for 3D rotation.
     */
    constructor(positionNode: Node, rotationNode: Node, order?: string);
    /**
     * The position node.
     *
     * @type {Node}
     */
    positionNode: Node;
    /**
     * Represents the rotation that is applied to the position node.
     * Depending on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
     *
     * @type {Node}
     */
    rotationNode: Node;
    /**
     * The Euler rotation order.
     *
     * @private
     * @type {string}
     * @default 'XYZ'
     */
    private _order;
    /**
     * Sets the Euler rotation order.
     *
     * @param {string} value - The Euler rotation order.
     * @return {RotateNode} A reference to this node.
     */
    setOrder(value: string): RotateNode;
    /**
     * Gets the Euler rotation order.
     *
     * @return {string} The Euler rotation order.
     */
    getOrder(): string;
    /**
     * The type of the {@link RotateNode#positionNode} defines the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node's type.
     */
    generateNodeType(builder: NodeBuilder): string;
    setup(builder: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
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
export const Schlick_to_F0: any;
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
     * @param {('coordinate'|'viewport'|'size'|'uv')} scope - The node's scope.
     */
    constructor(scope: ("coordinate" | "viewport" | "size" | "uv"));
    /**
     * The node represents different metric depending on which scope is selected.
     *
     * - `ScreenNode.COORDINATE`: Window-relative coordinates of the current fragment according to WebGPU standards.
     * - `ScreenNode.VIEWPORT`: The current viewport defined as a four-dimensional vector.
     * - `ScreenNode.SIZE`: The dimensions of the current bound framebuffer.
     * - `ScreenNode.UV`: Normalized coordinates.
     *
     * @type {('coordinate'|'viewport'|'size'|'uv')}
     */
    scope: ("coordinate" | "viewport" | "size" | "uv");
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
     * @return {('vec2'|'vec4')} The node type.
     */
    generateNodeType(): ("vec2" | "vec4");
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
 * @augments Node
 */
export class SetNode extends Node {
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
export function ShaderNode(jsFunc: any, nodeType: any): ShaderNodeInternal;
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
     * Retrieves or creates a shadow material for the shadow casting light source.
     *
     * This method checks if a shadow material already exists for the provided light in the internal library.
     * If not, it creates a new `NodeMaterial` configured for shadow rendering and stores it for future use.
     *
     * @return {NodeMaterial} The shadow material associated with the given light.
     */
    getShadowMaterial(): NodeMaterial;
    /**
     * Disposes the shadow material for the shadow casting light source.
     */
    disposeShadowMaterial(): void;
    /**
     * Returns a function to render shadow objects in a scene for the given light shadow and renderer.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {LightShadow} [shadow=this.light.shadow] - The light shadow object containing shadow properties.
     * @return {Function} A function that renders shadow objects.
     */
    getShadowRenderObjectFunction(renderer: Renderer, shadow?: LightShadow): Function;
    /**
     * Setups the shadow position node which is by default the predefined TSL node object `shadowPositionWorld`.
     *
     * @param {NodeBuilder} object - A configuration object that must at least hold a material reference.
     */
    setupShadowPosition({ context, material }: NodeBuilder): void;
}
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
     * @default 0
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
/**
 * Add the given node to the current stack.
 *
 * @param {Node} node - The node to add.
 * @returns {Node} The node that was added to the stack.
 */
export function Stack(node: Node): Node;
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
     * This method is overwritten since the node type is inferred from the struct type if present.
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
 * This special version of a texture node can be used to
 * write data into a 3D storage texture with a compute shader.
 *
 * @augments StorageTextureNode
 */
export class StorageTexture3DNode extends StorageTextureNode {
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
 * @augments Node
 */
export class SubgroupFunctionNode extends Node {
    static get SUBGROUP_ELECT(): string;
    static get SUBGROUP_BALLOT(): string;
    static get SUBGROUP_ADD(): string;
    static get SUBGROUP_INCLUSIVE_ADD(): string;
    static get SUBGROUP_EXCLUSIVE_ADD(): string;
    static get SUBGROUP_MUL(): string;
    static get SUBGROUP_INCLUSIVE_MUL(): string;
    static get SUBGROUP_EXCLUSIVE_MUL(): string;
    static get SUBGROUP_AND(): string;
    static get SUBGROUP_OR(): string;
    static get SUBGROUP_XOR(): string;
    static get SUBGROUP_MIN(): string;
    static get SUBGROUP_MAX(): string;
    static get SUBGROUP_ALL(): string;
    static get SUBGROUP_ANY(): string;
    static get SUBGROUP_BROADCAST_FIRST(): string;
    static get QUAD_SWAP_X(): string;
    static get QUAD_SWAP_Y(): string;
    static get QUAD_SWAP_DIAGONAL(): string;
    static get SUBGROUP_BROADCAST(): string;
    static get SUBGROUP_SHUFFLE(): string;
    static get SUBGROUP_SHUFFLE_XOR(): string;
    static get SUBGROUP_SHUFFLE_UP(): string;
    static get SUBGROUP_SHUFFLE_DOWN(): string;
    static get QUAD_BROADCAST(): string;
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
    setup(builder: any): Node | null;
    generateNodeType(builder: any): string | null;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
/**
 * Represent a conditional node using switch/case statements.
 *
 * ```js
 * Switch( value )
 * 	.Case( 1, function )
 * 	.Case( 2, 3, 4, function )
 * 	.Default( function )
 * ```
 * @tsl
 * @function
 * @param {...any} params - The parameters for the conditional node.
 * @returns {StackNode} The conditional node.
 */
export function Switch(...params: any[]): StackNode;
/**
 * TSL object that represents the TBN matrix in view space.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const TBNViewMatrix: Node<any>;
/**
 * Represents PI * 2.
 *
 * @tsl
 * @type {Node<float>}
 */
export const TWO_PI: Node<any>;
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
     * The mergeable value is stored in a private property.
     *
     * @private
     * @type {boolean}
     * @default true
     */
    private _mergeable;
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
    /**
     * Whether the node is used as a comparison sampler, e.g. via `samplerComparison()`.
     *
     * @private
     * @type {boolean}
     * @default false
     */
    private _samplerComparison;
    set mergeable(value: boolean);
    /**
     * Whether the uniform may be merged with other uniforms at compile-time.
     *
     * @type {boolean}
     * @default true
     */
    get mergeable(): boolean;
    set value(value: Texture);
    /**
     * The texture value.
     *
     * @type {Texture}
     */
    get value(): Texture;
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
     * Returns `true` if the texture is sampled with a depth comparison,
     * meaning the node must be bound with a comparison sampler.
     *
     * @return {boolean} Whether comparison sampling is used or not.
     */
    isSampleCompare(): boolean;
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
    generate(builder: any): any;
}
export var Three_TSL: Readonly<{
    __proto__: null;
    BRDF_EON: () => void;
    BRDF_GGX: () => void;
    BRDF_Lambert: () => void;
    BRDF_Sheen: () => void;
    BasicPointShadowFilter: () => void;
    BasicShadowFilter: () => void;
    Break: () => ExpressionNode;
    Const: (node: Node, name?: string | null) => VarNode;
    Continue: () => ExpressionNode;
    DFGLUT: () => void;
    D_GGX: any;
    D_GGX_Anisotropic: any;
    Discard: (conditional: ConditionalNode | null) => Node;
    EON_DirectionalAlbedo: () => void;
    EPSILON: any;
    EnvironmentBRDF: () => void;
    F_Schlick: () => void;
    Fn: typeof Fn;
    HALF_PI: any;
    INFINITY: any;
    If: (...params: any[]) => StackNode;
    LTC_Evaluate: any;
    LTC_Evaluate_Volume: any;
    LTC_Uv: any;
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
    OnAfterObjectUpdate: (callback: Function) => EventNode;
    OnAfterRenderPipeline: (callback: Function) => EventNode;
    OnBeforeFrameUpdate: (callback: Function) => EventNode;
    OnBeforeMaterialUpdate: (callback: Function) => EventNode;
    OnBeforeObjectUpdate: (callback: Function) => EventNode;
    OnBeforeRenderPipeline: (callback: Function) => EventNode;
    OnFrameUpdate: (callback: Function) => EventNode;
    OnMaterialUpdate: (callback: Function) => EventNode;
    OnObjectUpdate: (callback: Function) => EventNode;
    PCFShadowFilter: () => void;
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
    V_GGX_SmithCorrelated_Anisotropic: any;
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
    batchIndirectIndex: any;
    bentNormalView: any;
    billboarding: () => void;
    bitAnd: any;
    bitNot: any;
    bitOr: any;
    bitXor: any;
    bitangentGeometry: any;
    bitangentLocal: any;
    bitangentView: any;
    bitangentViewFrame: any;
    bitangentWorld: any;
    bitcast: any;
    blendBurn: any;
    blendColor: any;
    blendDodge: any;
    blendOverlay: any;
    blendScreen: any;
    bool: any;
    buffer: (value: Array<number>, type: string, count: number) => BufferNode;
    bufferAttribute: (array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number) => BufferAttributeNode | Node;
    builtin: any;
    builtinAOContext: typeof builtinAOContext;
    builtinGIContext: typeof builtinGIContext;
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
    clipping: () => ClippingNode;
    clippingAlpha: () => ClippingNode;
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
    diffuseRoughness: any;
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
    distance: any;
    div: any;
    dot: any;
    dot4I8Packed: any;
    dot4U8Packed: any;
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
    getDistanceAttenuation: () => void;
    getGeometryRoughness: () => void;
    getNormalFromDepth: () => void;
    getParallaxCorrectNormal: () => void;
    getRoughness: () => void;
    getScreenPosition: () => void;
    getScreenPositionFromClip: any;
    getShIrradianceAt: () => void;
    getTextureIndex: typeof getTextureIndex;
    getViewPosition: () => void;
    globalId: any;
    glsl: (src: string, includes: Array<Node>) => CodeNode;
    glslFn: (code: any, includes: any) => any;
    grayscale: () => void;
    greaterThan: any;
    greaterThanEqual: any;
    hardwareClipping: () => ClippingNode;
    hash: () => void;
    highpModelNormalViewMatrix: any;
    highpModelViewMatrix: any;
    hue: () => void;
    increment: () => void;
    incrementBefore: () => void;
    inspect: typeof inspect;
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
    materialDiffuseRoughness: any;
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
    materialRetroreflectivity: any;
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
    mx_cell_noise_vec3: (texcoord?: any) => any;
    mx_contrast: (input: any, amount?: number, pivot?: number) => any;
    mx_divide: (in1: any, in2?: any) => any;
    mx_fractal_noise_float: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_float_2d: (texcoord?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_vec2: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_vec3: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_fractal_noise_vec4: (position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number) => any;
    mx_frame: () => any;
    mx_heighttonormal: (input: any, scale?: number, texcoord?: any) => any;
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
    mx_place2d: (texcoord: any, pivot?: any, scale?: any, rotate?: any, offset?: any, operationorder?: any) => any;
    mx_power: (in1: any, in2?: any) => any;
    mx_ramp4: (valuetl: any, valuetr: any, valuebl: any, valuebr: any, texcoord?: any) => any;
    mx_ramplr: (valuel: any, valuer: any, texcoord?: any) => any;
    mx_ramptb: (valueb: any, valuet: any, texcoord?: any) => any;
    mx_rgbtohsv: any;
    mx_rotate2d: (input: any, amount?: number) => any;
    mx_rotate3d: (input: any, amount?: number, axis?: any) => any;
    mx_safepower: (in1: any, in2?: number) => any;
    mx_separate: (in1: any, channelOrOut?: null) => any;
    mx_smoothstep: (inNode: any, low?: number, high?: number) => any;
    mx_splitlr: (valuel: any, valuer: any, center: any, texcoord?: any) => any;
    mx_splittb: (valueb: any, valuet: any, center: any, texcoord?: any) => any;
    mx_srgb_texture_to_lin_rec709: any;
    mx_subtract: (in1: any, in2?: any) => any;
    mx_timer: () => any;
    mx_transform_uv: (uv_scale?: number, uv_offset?: number, uv_geo?: any) => any;
    mx_unifiednoise2d: (noiseType: any, texcoord?: any, freq?: any, offset?: any, jitter?: number, outmin?: number, outmax?: number, clampoutput?: boolean, octaves?: number, lacunarity?: number, diminish?: number, style?: number) => void;
    mx_unifiednoise3d: (noiseType: any, texcoord?: any, freq?: any, offset?: any, jitter?: number, outmin?: number, outmax?: number, clampoutput?: boolean, octaves?: number, lacunarity?: number, diminish?: number, style?: number) => void;
    mx_worley_noise_float: (texcoord?: any, jitter?: number, style?: number) => void;
    mx_worley_noise_float_2d: (texcoord?: any, jitter?: number, style?: number) => void;
    mx_worley_noise_float_3d: (texcoord?: any, jitter?: number, style?: number) => void;
    mx_worley_noise_vec2: (texcoord?: any, jitter?: number) => any;
    mx_worley_noise_vec3: (texcoord?: any, jitter?: number, metric?: number) => any;
    mx_worley_noise_vec3_style: (texcoord?: any, jitter?: number, style?: number, metric?: number) => any;
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
    pack4xI8: any;
    pack4xI8Clamp: any;
    pack4xU8: any;
    pack4xU8Clamp: any;
    packHalf2x16: any;
    packNormalToRGB: (node: Node<any>) => Node<any>;
    packSnorm2x16: any;
    packSnorm4x8: any;
    packUnorm2x16: any;
    packUnorm4x8: any;
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
    retroreflectivity: any;
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
    storageElement: any;
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
    tangentViewFrame: any;
    tangentWorld: any;
    tanh: any;
    texture: (value?: (Texture | TextureNode) | null, uvNode?: Node<any | any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null) => TextureNode;
    texture3D: any;
    texture3DLevel: (value?: (Texture | TextureNode) | null, uvNode?: Node<any> | null, levelNode?: Node<any> | null) => TextureNode;
    texture3DLoad: (...params: any[]) => TextureNode;
    textureBarrier: () => BarrierNode;
    textureBicubic: () => void;
    textureBicubicLevel: () => void;
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
    unpack4xI8: any;
    unpack4xU8: any;
    unpackHalf2x16: any;
    unpackNormal: (xy: Node<any>) => Node<any>;
    unpackRGBToNormal: (node: Node<any>) => Node<any>;
    unpackSnorm2x16: any;
    unpackSnorm4x8: any;
    unpackUnorm2x16: any;
    unpackUnorm4x8: any;
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
/**
 * This node represents a tone mapping operation.
 *
 * @augments Node
 */
export class ToneMappingNode extends Node {
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
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayBufferNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from the
     * padded type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
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
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The padded type.
     */
    getPaddedType(builder: NodeBuilder): string;
    update(): void;
    /**
     * Composes a user-defined update with the buffer transfer.
     *
     * @param {Function} callback - The update function.
     * @param {string} updateType - The update type.
     * @return {UniformArrayNode} A reference to this node.
     */
    onUpdate(callback: Function, updateType: string): UniformArrayNode;
    /**
     * The method makes sure to correctly transfer the data from the (complex) objects
     * in the array to the internal, correctly padded value buffer.
     */
    updateBuffer(): void;
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
     * The sort key that determines the order of this group relative to other
     * uniform groups. Groups with a lower order are placed first. Shared groups
     * typically use a lower order so they precede regular per-object groups.
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
    /**
     * Uniform nodes with the same hash share a single uniform. This method returns the node
     * the shared uniform refers to which is the first node registered for the hash.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {UniformNode} The node the shared uniform refers to.
     */
    getSharedNode(builder: NodeBuilder): UniformNode;
    onUpdate(callback: any, updateType: any): Node;
    getInputType(builder: any): string;
    generate(builder: any, output: any): any;
}
/**
 * This node represents an operation that unpacks values from a 32-bit unsigned integer, reinterpreting the results as a floating-point vector
 *
 * @augments Node
 */
export class UnpackFloatNode extends Node {
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
     * The component layout of the packed integer.
     *
     * @type {'2x16' | '4x8'}
     * @default '2x16'
     */
    layout: "2x16" | "4x8";
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUnpackFloatNode: boolean;
    generateNodeType(): "vec2" | "vec4";
    generate(builder: any): string;
}
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
export function VSMShadowFilter(): void;
export const V_GGX_SmithCorrelated: any;
export const V_GGX_SmithCorrelated_Anisotropic: any;
/**
 * TSL function for creating a var node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node for which a variable should be created.
 * @param {?string} name - The name of the variable in the shader.
 * @returns {VarNode}
 */
export function Var(node: Node, name?: string | null): VarNode;
/**
 * TSL function for creating a var intent node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node for which a variable should be created.
 * @returns {VarNode}
 */
export function VarIntent(node: Node): VarNode;
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
/**
 * A node for representing motion or velocity vectors. Foundation
 * for advanced post processing effects like motion blur or TRAA.
 *
 * The node keeps track of the model, view and projection matrices
 * of the previous frame and uses them to compute offsets in NDC space.
 * These offsets represent the final velocity.
 *
 * @augments Node
 */
export class VelocityNode extends Node {
    /**
     * Constructs a new vertex color node.
     */
    constructor();
    /**
     * An optional projection matrix that overrides the camera's projection matrix.
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
     * The projection matrix of the current frame.
     *
     * @type {UniformNode<mat4>}
     */
    currentProjectionMatrix: UniformNode<any>;
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
    let DEPTH_BASE: string;
    let DEPTH: string;
    let LINEAR_DEPTH: string;
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
     * Constructs a new workgroup info node.
     *
     * @param {string} scope - The address space the buffer is scoped to. Currently only `'Workgroup'` is used.
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
     * Whether the node is atomic or not.
     *
     * @type {boolean}
     * @default false
     */
    isAtomic: boolean;
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
     * The address space the buffer is scoped to. Currently only `'Workgroup'` is used.
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
     * Defines whether the node is atomic or not.
     *
     * @param {boolean} value - The atomic flag.
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    setAtomic(value: boolean): WorkgroupInfoNode;
    /**
     * Convenience method for making this node atomic.
     *
     * @return {WorkgroupInfoNode} A reference to this node.
     */
    toAtomic(): WorkgroupInfoNode;
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
/**
 * Returns the absolute value of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const abs: any;
/**
 * ACESFilmic tone mapping.
 *
 * Reference: {@link https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const acesFilmicToneMapping: any;
/**
 * Returns the arccosine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const acos: any;
/**
 * Returns the inverse hyperbolic cosine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const acosh: any;
/**
 * Returns the addition of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const add: any;
export function addMethodChaining(name: any, nodeElement: any): void;
export function addNodeElement(name: any): void;
/**
 * AgX tone mapping.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const agxToneMapping: any;
/**
 * Returns `true` if all components of `x` are `true`.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node<bool>}
 */
export const all: any;
/**
 * TSL object that represents the shader variable `AlphaT`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const alphaT: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `AmbientOcclusion`.
 * If no value is assigned to this property, it defaults to a placeholder value of `1.0`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const ambientOcclusion: PropertyNode<any>;
/**
 * Performs a logical AND operation on multiple nodes.
 *
 * @tsl
 * @function
 * @param {...Node} nodes - The input nodes to be combined using AND.
 * @returns {OperatorNode}
 */
export const and: any;
/**
 * TSL object that represents the shader variable `Anisotropy`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const anisotropy: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `AnisotropyB`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const anisotropyB: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `AnisotropyT`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const anisotropyT: PropertyNode<any>;
/**
 * Returns `true` if any components of `x` are `true`.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node<bool>}
 */
export const any: any;
/**
 * TSL function for creating an array node.
 *
 * @tsl
 * @function
 * @param {string|Array<Node>} nodeTypeOrValues - A string representing the element type (e.g., 'vec3')
 * or an array containing the default values (e.g., [ vec3() ]).
 * @param {?number} [count] - Size of the array.
 * @returns {ArrayNode}
 */
export function array(...params: any[]): ArrayNode;
/**
 * Returns the arcsine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const asin: any;
/**
 * Returns the inverse hyperbolic sine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const asinh: any;
/**
 * TSL function for creating an assign node.
 *
 * @tsl
 * @function
 * @param {Node} targetNode - The target node.
 * @param {Node} sourceNode - The source type.
 * @returns {AssignNode}
 */
export const assign: any;
/**
 * Returns the arc-tangent of the parameter.
 * If two parameters are provided, the result is `atan2(y/x)`.
 *
 * @tsl
 * @function
 * @param {Node | number} y - The y parameter.
 * @param {?(Node | number)} x - The x parameter.
 * @returns {Node}
 */
export const atan: any;
/**
 * Returns the inverse hyperbolic tangent of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const atanh: any;
/**
 * Increments the value stored in the atomic variable.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicAdd(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Stores in an atomic variable the bitwise AND of its value with a parameter.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicAnd(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * TSL function for appending an atomic function call into the programmatic flow of a compute shader.
 *
 * @tsl
 * @function
 * @param {string} method - The signature of the atomic function to construct.
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicFunc(method: string, pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Loads the value stored in the atomic variable.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @returns {AtomicFunctionNode}
 */
export function atomicLoad(pointerNode: Node): AtomicFunctionNode;
/**
 * Stores in an atomic variable the maximum between its current value and a parameter.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicMax(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Stores in an atomic variable the minimum between its current value and a parameter.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicMin(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Stores in an atomic variable the bitwise OR of its value with a parameter.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicOr(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Stores a value in the atomic variable.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicStore(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Decrements the value stored in the atomic variable.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicSub(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * Stores in an atomic variable the bitwise XOR of its value with a parameter.
 *
 * @tsl
 * @function
 * @param {Node} pointerNode - An atomic variable or element of an atomic buffer.
 * @param {Node} valueNode - The value that mutates the atomic variable.
 * @returns {AtomicFunctionNode}
 */
export function atomicXor(pointerNode: Node, valueNode: Node): AtomicFunctionNode;
/**
 * TSL object that represents the shader variable `AttenuationColor`.
 *
 * @tsl
 * @type {PropertyNode<color>}
 */
export const attenuationColor: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `AttenuationDistance`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const attenuationDistance: PropertyNode<any>;
/**
 * TSL function for creating an attribute node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the attribute.
 * @param {?string} [nodeType=null] - The node type.
 * @returns {AttributeNode}
 */
export function attribute(name: string, nodeType?: string | null): AttributeNode;
/**
 * TSL function for creating a storage buffer node with a configured `StorageBufferAttribute`.
 *
 * @tsl
 * @function
 * @param {number|TypedArray} count - The data count. It is also valid to pass a typed array as an argument.
 * @param {string|Struct} [type='float'] - The data type.
 * @returns {StorageBufferNode}
 */
export function attributeArray(count: number | TypedArray, type?: string | Struct): StorageBufferNode;
/**
 * TSL object that represents the scene's background blurriness.
 *
 * @tsl
 * @type {Node<float>}
 */
export const backgroundBlurriness: Node<any>;
/**
 * TSL object that represents the scene's background intensity.
 *
 * @tsl
 * @type {Node<float>}
 */
export const backgroundIntensity: Node<any>;
/**
 * TSL object that represents the scene's background rotation.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const backgroundRotation: Node<any>;
export function batch(): void;
/**
 * TSL object representing a varying property for the batching color vector.
 *
 * @type {VaryingNode<vec4>}
 */
export const batchColor: VaryingNode<any>;
/**
 * TSL object representing a varying property for the batch indirect index (instance ID).
 *
 * @type {VaryingNode<uint>}
 */
export const batchIndirectIndex: VaryingNode<any>;
/**
 * TSL function for computing bent normals.
 *
 * @tsl
 * @function
 * @returns {Node<vec3>} Bent normals.
 */
export const bentNormalView: any;
export function billboarding(): void;
/**
 * Performs bitwise AND on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitAnd: any;
/**
 * Performs bitwise NOT on a node.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitNot: any;
/**
 * Performs bitwise OR on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitOr: any;
/**
 * Performs bitwise XOR on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitXor: any;
/**
 * TSL object that represents the bitangent attribute of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentGeometry: Node<any>;
/**
 * TSL object that represents the vertex bitangent in local space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentLocal: Node<any>;
/**
 * TSL object that represents the vertex bitangent in view space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentView: Node<any>;
/**
 * Bitangent vector in view space, computed dynamically from geometry and UV derivatives.
 * Complements the tangentViewFrame for constructing the tangent space basis.
 *
 * Reference: http://www.thetenthplanet.de/archives/1180
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentViewFrame: Node<any>;
/**
 * TSL object that represents the vertex bitangent in world space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentWorld: Node<any>;
/**
 * Reinterpret the bit representation of a value in one type as a value in another type.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @param {string} y - The new type.
 * @returns {Node}
 */
export const bitcast: any;
/**
 * Represents a "Color Burn" blend mode.
 *
 * It's designed to darken the base layer's colors based on the color of the blend layer.
 * It significantly increases the contrast of the base layer, making the colors more vibrant and saturated.
 * The darker the color in the blend layer, the stronger the darkening and contrast effect on the base layer.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color. A white (#ffffff) blend color does not alter the base color.
 * @return {Node<vec3>} The result.
 */
export const blendBurn: any;
/**
 * This function blends two color based on their alpha values by replicating the behavior of `THREE.NormalBlending`.
 * It assumes both input colors have non-premultiplied alpha.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} base - The base color.
 * @param {Node<vec4>} blend - The blend color
 * @return {Node<vec4>} The result.
 */
export const blendColor: any;
/**
 * Represents a "Color Dodge" blend mode.
 *
 * It's designed to lighten the base layer's colors based on the color of the blend layer.
 * It significantly increases the brightness of the base layer, making the colors lighter and more vibrant.
 * The brighter the color in the blend layer, the stronger the lightening and contrast effect on the base layer.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color. A black (#000000) blend color does not alter the base color.
 * @return {Node<vec3>} The result.
 */
export const blendDodge: any;
/**
 * Represents a "Overlay" blend mode.
 *
 * It's designed to increase the contrast of the base layer based on the color of the blend layer.
 * It amplifies the existing colors and contrast in the base layer, making lighter areas lighter and darker areas darker.
 * The color of the blend layer significantly influences the resulting contrast and color shift in the base layer.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color
 * @return {Node<vec3>} The result.
 */
export const blendOverlay: any;
/**
 * Represents a "Screen" blend mode.
 *
 * Similar to `blendDodge()`, this mode also lightens the base layer's colors based on the color of the blend layer.
 * The "Screen" blend mode is better for general brightening whereas the "Dodge" results in more subtle and nuanced
 * effects.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color. A black (#000000) blend color does not alter the base color.
 * @return {Node<vec3>} The result.
 */
export const blendScreen: any;
export const bool: any;
/**
 * TSL function for creating a buffer node.
 *
 * @tsl
 * @function
 * @param {Array<number>} value - Array-like buffer data.
 * @param {string} type - The data type of a buffer element.
 * @param {number} count - The count of buffer elements.
 * @returns {BufferNode}
 */
export function buffer(value: Array<number>, type: string, count: number): BufferNode;
/**
 * TSL function for creating a buffer attribute node.
 *
 * @tsl
 * @function
 * @param {BufferAttribute|InterleavedBuffer|TypedArray} array - The attribute data.
 * @param {?string} [type=null] - The buffer type (e.g. `'vec3'`).
 * @param {number} [stride=0] - The buffer stride.
 * @param {number} [offset=0] - The buffer offset.
 * @returns {BufferAttributeNode|Node}
 */
export function bufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode | Node;
/**
 * TSL function for creating a builtin node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the built-in shader variable.
 * @returns {BuiltinNode}
 */
export const builtin: any;
/**
 * TSL function for defining a built-in ambient occlusion context for a given node.
 *
 * @tsl
 * @function
 * @param {Node} aoNode - The ambient occlusion value node to apply.
 * @param {Node} [node=null] - The node whose context should be modified.
 * @returns {ContextNode}
 */
export function builtinAOContext(aoNode: Node, node?: Node): ContextNode;
/**
 * TSL function for defining a built-in global illumination context for a given node. The AO node
 * modulates the indirect lighting of the materials, the GI node is added to their irradiance
 * without being modulated by the AO since it already accounts for occlusion.
 *
 * @tsl
 * @function
 * @param {Node<float>} aoNode - The ambient occlusion value node to apply.
 * @param {Node<vec3>} giNode - The indirect diffuse irradiance node to add.
 * @param {Node} [node=null] - The node whose context should be modified.
 * @returns {ContextNode}
 */
export function builtinGIContext(aoNode: Node<any>, giNode: Node<any>, node?: Node): ContextNode;
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
export function builtinShadowContext(shadowNode: ShadowNode, light: Light, node?: Node): ContextNode;
/**
 * TSL function for creating a bump map node.
 *
 * @tsl
 * @function
 * @param {Node<float>} textureNode - Represents the bump map data.
 * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
 * @returns {BumpMapNode}
 */
export const bumpMap: any;
export const bvec2: any;
export const bvec3: any;
export const bvec4: any;
/**
 * TSL function for creating a bypass node.
 *
 * @tsl
 * @function
 * @param {Node} outputNode - The output node.
 * @param {Node} callNode - The call node.
 * @returns {BypassNode}
 */
export const bypass: any;
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
export function cache(node: Node, parent?: boolean): IsolateNode;
export function call(func: any, ...params: any[]): FunctionCallNode;
/**
 * TSL object that represents the `far` value of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const cameraFar: UniformNode<any>;
/**
 * TSL object that represents the current `index` value of the camera if used ArrayCamera.
 *
 * @tsl
 * @type {UniformNode<uint>}
 */
export const cameraIndex: UniformNode<any>;
/**
 * TSL object that represents the `near` value of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const cameraNear: UniformNode<any>;
/**
 * TSL object that represents the normal matrix of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<mat3>}
 */
export const cameraNormalMatrix: UniformNode<any>;
/**
 * TSL object that represents the position in world space of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<vec3>}
 */
export const cameraPosition: UniformNode<any>;
/**
 * TSL object that represents the projection matrix of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<mat4>}
 */
export const cameraProjectionMatrix: UniformNode<any>;
/**
 * TSL object that represents the inverse projection matrix of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<mat4>}
 */
export const cameraProjectionMatrixInverse: UniformNode<any>;
/**
 * TSL object that represents the view matrix of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<mat4>}
 */
export const cameraViewMatrix: UniformNode<any>;
/**
 * TSL object that represents the viewport of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<vec4>}
 */
export const cameraViewport: UniformNode<any>;
/**
 * TSL object that represents the world matrix of the camera used for the current render.
 *
 * @tsl
 * @type {UniformNode<mat4>}
 */
export const cameraWorldMatrix: UniformNode<any>;
/**
 * Returns the cube root of a number.
 *
 * @tsl
 * @function
 * @param {Node | number} a - The first parameter.
 * @returns {Node}
 */
export function cbrt(a: Node | number): Node;
export function cdl(): void;
/**
 * Finds the nearest integer that is greater than or equal to the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const ceil: any;
export function checker(): void;
/**
 * Cineon tone mapping.
 *
 * Reference: {@link http://filmicworlds.com/blog/filmic-tonemapping-operators/}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const cineonToneMapping: any;
/**
 * Constrains a value to lie between two further values.
 *
 * @tsl
 * @function
 * @param {Node | number} value - The value to constrain.
 * @param {Node | number} [low=0] - The lower bound.
 * @param {Node | number} [high=1] - The upper bound.
 * @returns {Node}
 */
export function clamp(value: Node | number, low?: Node | number, high?: Node | number): Node;
/**
 * TSL object that represents the shader variable `Clearcoat`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const clearcoat: PropertyNode<any>;
/**
 * TSL object that represents the clearcoat vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const clearcoatNormalView: Node<any>;
/**
 * TSL object that represents the shader variable `ClearcoatRoughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const clearcoatRoughness: PropertyNode<any>;
/**
 * TSL object that represents the clip space position of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec4>}
 */
export const clipSpace: VaryingNode<any>;
/**
 * TSL function for setting up the default clipping logic.
 *
 * @tsl
 * @function
 * @returns {ClippingNode}
 */
export function clipping(): ClippingNode;
/**
 * TSL function for setting up alpha to coverage.
 *
 * @tsl
 * @function
 * @returns {ClippingNode}
 */
export function clippingAlpha(): ClippingNode;
/**
 * TSL function for creating a code node.
 *
 * @tsl
 * @function
 * @param {string} [code] - The native code.
 * @param {?Array<Node>} [includes=[]] - An array of includes.
 * @param {?('js'|'wgsl'|'glsl')} [language=''] - The used language.
 * @returns {CodeNode}
 */
export const code: any;
export const color: any;
/**
 * TSL function for converting a given color node from the given color space to the current working color space.
 *
 * @tsl
 * @function
 * @param {Node} node - Represents the node to convert.
 * @param {string} sourceColorSpace - The source color space.
 * @returns {ColorSpaceNode}
 */
export function colorSpaceToWorking(node: Node, sourceColorSpace: string): ColorSpaceNode;
/**
 * @tsl
 * @function
 * @deprecated since r185. Use {@link unpackRGBToNormal} instead.
 * @param {Node<vec3>} node - The color to unpack.
 * @returns {Node<vec3>}
 */
export function colorToDirection(node: Node<any>): Node<any>;
/**
 * TSL function for creating a compute node.
 *
 * @tsl
 * @function
 * @param {Node} node - The TSL logic for the compute shader.
 * @param {number|Array<number>} count - The compute count or dispatch size.
 * @param {Array<number>} [workgroupSize=[64]] - The workgroup size.
 * @returns {ComputeNode}
,  */
export function compute(node: Node, count: number | Array<number>, workgroupSize?: Array<number>): ComputeNode;
/**
 * TSL function for creating a compute kernel node.
 *
 * @tsl
 * @function
 * @param {Node} node - The TSL logic for the compute shader.
 * @param {Array<number>} [workgroupSize=[64]] - The workgroup size.
 * @returns {ComputeNode}
 */
export function computeKernel(node: Node, workgroupSize?: Array<number>): ComputeNode;
export function computeSkinning(): void;
/**
 * TSL function for creating a context node.
 *
 * @tsl
 * @function
 * @param {Node|Object} [nodeOrValue={}] - The node whose context should be modified or the modified context data.
 * @param {Object} [value={}] - The modified context data.
 * @returns {ContextNode}
 */
export function context(nodeOrValue?: Node | Object, value?: Object): ContextNode;
export function convert(node: any, types: any): ConvertNode;
/**
 * TSL function for converting a given color node from one color space to another one.
 *
 * @tsl
 * @function
 * @param {Node} node - Represents the node to convert.
 * @param {string} sourceColorSpace - The source color space.
 * @param {string} targetColorSpace - The target color space.
 * @returns {ColorSpaceNode}
 */
export function convertColorSpace(node: Node, sourceColorSpace: string, targetColorSpace: string): ColorSpaceNode;
/**
 * TSL function for converting nodes to textures nodes.
 *
 * @tsl
 * @function
 * @param {Node} node - The node to render a texture with.
 * @param {?number} [width=null] - The width of the internal render target. If no width is applied, the render target is automatically resized.
 * @param {?number} [height=null] - The height of the internal render target.
 * @param {Object} [options={}] - The options for the internal render target.
 * @param {number} [options.type=HalfFloatType] - The texture type.
 * @param {boolean} [options.autoUpdate=true] - Whether the texture should automatically be updated or not.
 * @param {number} [options.resolutionScale=1] - The resolution scale.
 * @returns {RTTNode}
 */
export function convertToTexture(node: Node, ...params: any[]): RTTNode;
/**
 * Returns the cosine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const cos: any;
/**
 * Returns the hyperbolic cosine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const cosh: any;
/**
 * Finds the number of consecutive 0 bits starting from the most significant bit of the input value.
 *
 * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input value.
 * @returns {Node}
 */
export const countLeadingZeros: any;
/**
 * Finds the number of '1' bits set in the input value
 *
 * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @tsl
 * @function
 * @returns {Node}
 */
export const countOneBits: any;
/**
 * Finds the number of consecutive 0 bits from the least significant bit of the input value,
 * which is also the index of the least significant bit of the input value.
 *
 * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input value.
 * @returns {Node}
 */
export const countTrailingZeros: any;
/**
 * Calculates the cross product of two vectors.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3>} x - The first vector.
 * @param {Node<vec2|vec3>} y - The second vector.
 * @returns {Node<float|vec3>}
 */
export const cross: any;
/**
 * TSL function for creating a cube texture uniform node.
 *
 * @tsl
 * @function
 * @param {?(CubeTexture|CubeTextureNode)} [value=EmptyTexture] - The cube texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @param {?Node<float>} [biasNode=null] - The bias node.
 * @returns {CubeTextureNode}
 */
export function cubeTexture(value?: (CubeTexture | CubeTextureNode) | null, uvNode?: Node<any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null): CubeTextureNode;
/**
 * TSL function for creating a cube texture node.
 *
 * @tsl
 * @function
 * @param {CubeTexture} value - The cube texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @param {?Node<float>} [biasNode=null] - The bias node.
 * @returns {CubeTextureNode}
 */
export const cubeTextureBase: any;
/**
 * Returns the partial derivative of the parameter with respect to x.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const dFdx: any;
/**
 * Returns the partial derivative of the parameter with respect to y.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const dFdy: any;
/**
 * TSL object that represents the shader variable `dashSize`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const dashSize: PropertyNode<any>;
/**
 * TSL function for creating a debug node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node to debug.
 * @param {?Function} [callback=null] - Optional callback function to handle the debug output.
 * @returns {DebugNode}
 */
export function debug(node: Node, callback?: Function | null): DebugNode;
export function decrement(): void;
export function decrementBefore(): void;
export const defaultBuildStages: string[];
export const defaultShaderStages: string[];
export function defined(value: any): boolean;
/**
 * Convert a quantity in radians to degrees.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input in radians.
 * @returns {Node}
 */
export const degrees: any;
/**
 * Represents the delta time in seconds.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const deltaTime: UniformNode<any>;
export function densityFogFactor(): void;
/**
 * TSL object that represents the depth value for the current fragment.
 *
 * @tsl
 * @type {ViewportDepthNode}
 */
export const depth: ViewportDepthNode;
/**
 * TSL function for creating a depth pass node.
 *
 * @tsl
 * @function
 * @param {Scene} scene - A reference to the scene.
 * @param {Camera} camera - A reference to the camera.
 * @param {Object} options - Options for the internal render target.
 * @returns {PassNode}
 */
export function depthPass(scene: Scene, camera: Camera, options: Object): PassNode;
/**
 * Returns the determinant of a matrix.
 *
 * @tsl
 * @function
 * @param {Node<mat2|mat3|mat4>} x - The parameter.
 * @returns {Node<float>}
 */
export const determinant: any;
/**
 * Calculates the absolute difference between two values.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @param {Node | number} y - The second parameter.
 * @returns {Node}
 */
export const difference: any;
/**
 * TSL object that represents the shader variable `DiffuseColor`.
 *
 * @tsl
 * @type {PropertyNode<vec4>}
 */
export const diffuseColor: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `DiffuseContribution`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const diffuseContribution: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `DiffuseRoughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const diffuseRoughness: PropertyNode<any>;
export function directPointLight({ color, lightVector, cutoffDistance, decayExponent }: {
    color: any;
    lightVector: any;
    cutoffDistance: any;
    decayExponent: any;
}): {
    lightDirection: any;
    lightColor: any;
};
/**
 * @tsl
 * @function
 * @deprecated since r185. Use {@link packNormalToRGB} instead.
 * @param {Node<vec3>} node - The direction to pack.
 * @returns {Node<vec3>}
 */
export function directionToColor(node: Node<any>): Node<any>;
/**
 * Negates a vector if the rendering occurs on the back side of a face,
 * based on the material's side configuration.
 *
 * - If the material's side is `BackSide`, the vector is inverted (negated).
 * - If the material's side is `DoubleSide`, the vector is multiplied by `faceDirection`
 *   (negated only for back-facing fragments).
 * - If the material's side is `FrontSide` (default), the vector remains unchanged.
 *
 * @tsl
 * @function
 * @deprecated since r185. Use {@link negateOnBackSide} instead.
 * @param {Node<vec3>} vector - The vector to convert.
 * @returns {Node<vec3>} The converted vector.
 */
export function directionToFaceDirection(vector: Node<any>): Node<any>;
/**
 * TSL object that represents the shader variable `Dispersion`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const dispersion: PropertyNode<any>;
/**
 * Calculates the distance between two points.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} x - The first point.
 * @param {Node<vec2|vec3|vec4>} y - The second point.
 * @returns {Node<float>}
 */
export const distance: any;
/**
 * Returns the division of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const div: any;
/**
 * Calculates the dot product of two vectors.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} x - The first vector.
 * @param {Node<vec2|vec3|vec4>} y - The second vector.
 * @returns {Node<float>}
 */
export const dot: any;
/**
 * Computes the dot product of four signed 8-bit integer components packed
 * into each input.
 *
 * @tsl
 * @function
 * @param {Node<uint>} a - The first packed signed integer vector.
 * @param {Node<uint>} b - The second packed signed integer vector.
 * @returns {Node<int>} The dot product.
 */
export const dot4I8Packed: any;
/**
 * Computes the dot product of four unsigned 8-bit integer components packed
 * into each input.
 *
 * @tsl
 * @function
 * @param {Node<uint>} a - The first packed unsigned integer vector.
 * @param {Node<uint>} b - The second packed unsigned integer vector.
 * @returns {Node<uint>} The dot product.
 */
export const dot4U8Packed: any;
/**
 * TSL object that represents the index of a draw call.
 *
 * @tsl
 * @type {IndexNode}
 */
export const drawIndex: IndexNode;
/**
 * TSL function for creating a buffer attribute node but with dynamic draw usage.
 * Use this function if attribute data are updated per frame.
 *
 * @tsl
 * @function
 * @param {BufferAttribute|InterleavedBuffer|TypedArray} array - The attribute data.
 * @param {?string} [type=null] - The buffer type (e.g. `'vec3'`).
 * @param {number} [stride=0] - The buffer stride.
 * @param {number} [offset=0] - The buffer offset.
 * @returns {BufferAttributeNode|Node}
 */
export function dynamicBufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode | Node;
export const element: any;
/**
 * TSL object that represents the shader variable `EmissiveColor`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const emissive: PropertyNode<any>;
/**
 * Checks if two nodes are equal.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const equal: any;
export function equirectDirection(): void;
export function equirectUV(): void;
/**
 * Returns the natural exponentiation of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const exp: any;
/**
 * Returns 2 raised to the power of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const exp2: any;
export function exponentialHeightFogFactor(): void;
/**
 * TSL function for creating an expression node.
 *
 * @tsl
 * @function
 * @param {string} [snippet] - The native code snippet.
 * @param {?string} [nodeType='void'] - The node type.
 * @returns {ExpressionNode}
 */
export const expression: any;
/**
 * TSL object that represents the front facing status as a number instead of a bool.
 * `1` means front facing, `-1` means back facing.
 *
 * @tsl
 * @type {Node<float>}
 */
export const faceDirection: Node<any>;
/**
 * Returns a vector pointing in the same direction as another.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} N - The vector to orient.
 * @param {Node<vec2|vec3|vec4>} I - The incident vector.
 * @param {Node<vec2|vec3|vec4>} Nref - The reference vector.
 * @returns {Node<vec2|vec3|vec4>}
 */
export const faceForward: any;
export const faceforward: any;
export const float: any;
/**
 * Bitcasts a float or a vector of floats to a corresponding integer type with the same element size.
 *
 * @tsl
 * @function
 * @param {Node<float>} value - The float or vector of floats to bitcast.
 * @returns {BitcastNode}
 */
export function floatBitsToInt(value: Node<any>): BitcastNode;
/**
 * Bitcasts a float or a vector of floats to a corresponding unsigned integer type with the same element size.
 *
 * @tsl
 * @function
 * @param {Node<float>} value - The float or vector of floats to bitcast.
 * @returns {BitcastNode}
 */
export function floatBitsToUint(value: Node<any>): BitcastNode;
/**
 * Finds the nearest integer less than or equal to the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const floor: any;
export function fog(): void;
/**
 * Computes the fractional part of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const fract: any;
/**
 * TSL object that represents a shared uniform group node which is updated once per frame.
 *
 * @tsl
 * @type {UniformGroupNode}
 */
export const frameGroup: UniformGroupNode;
/**
 * Represents the current frame ID.
 *
 * @tsl
 * @type {UniformNode<uint>}
 */
export const frameId: UniformNode<any>;
/**
 * TSL object that represents whether a primitive is front or back facing
 *
 * @tsl
 * @type {FrontFacingNode<bool>}
 */
export const frontFacing: FrontFacingNode<any>;
/**
 * Returns the sum of the absolute derivatives in x and y.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const fwidth: any;
/**
 * A function that remaps the `[0,1]` interval into the `[0,1]` interval.
 * Expands the sides and compresses the center, and keeps `0.5` mapped to `0.5`.
 * Reference: {@link https://iquilezles.org/articles/functions/}.
 *
 * @tsl
 * @function
 * @param {Node<float>} x - The value to remap.
 * @param {Node<float>} k - `k=1` is the identity curve,`k<1` produces the classic `gain()` shape, and `k>1` produces "s" shaped curves.
 * @return {Node<float>} The remapped value.
 */
export function gain(x: Node<any>, k: Node<any>): Node<any>;
/**
 * TSL object that represents the shader variable `gapSize`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const gapSize: PropertyNode<any>;
export function getConstNodeType(value: any): any;
export function getCurrentStack(): any;
/**
 * Gets the object data that can be shared between different rendering steps.
 *
 * @private
 * @param {Object} object - The object to get the data for.
 * @return {Object} The object data.
 */
export function getDataFromObject(object: Object): Object;
export function getDistanceAttenuation(): void;
export function getGeometryRoughness(): void;
export function getNormalFromDepth(): void;
export function getParallaxCorrectNormal(): void;
export function getRoughness(): void;
export function getScreenPosition(): void;
/**
 * Converts a clip-space position into a screen position expressed as uv coordinates.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} clipPosition - The position in clip space.
 * @return {Node<vec2>} The screen position expressed as uv coordinates.
 */
export const getScreenPositionFromClip: any;
export function getShIrradianceAt(): void;
/**
 * Returns the MRT texture index for the given name.
 *
 * @param {Array<Texture>} textures - The textures of a MRT-configured render target.
 * @param {string} name - The name of the MRT texture which index is requested.
 * @return {number} The texture index.
 */
export function getTextureIndex(textures: Array<Texture>, name: string): number;
/**
 * Returns the node data type for the given texture.
 *
 * @private
 * @method
 * @param {Texture} texture - The texture.
 * @return {string} The data type.
 */
export function getTextureType(texture: Texture): string;
/**
 * Returns the data type for the given the length.
 *
 * @private
 * @method
 * @param {number} length - The length.
 * @return {string} The data type.
 */
export function getTypeFromLength(length: number): string;
export function getViewPosition(): void;
/**
 * A non-linearized 3-dimensional representation of the current invocation's position within a 3D global grid.
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const globalId: ComputeBuiltinNode<any>;
/**
 * TSL function for creating a GLSL code node.
 *
 * @tsl
 * @function
 * @param {string} src - The native code.
 * @param {Array<Node>} includes - An array of includes.
 * @returns {CodeNode}
 */
export function glsl(src: string, includes: Array<Node>): CodeNode;
export function glslFn(code: any, includes: any): any;
export function grayscale(): void;
/**
 * Checks if the first node is greater than the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const greaterThan: any;
/**
 * Checks if the first node is greater than or equal to the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const greaterThanEqual: any;
/**
 * TSL function for setting up hardware-based clipping.
 *
 * @tsl
 * @function
 * @returns {ClippingNode}
 */
export function hardwareClipping(): ClippingNode;
export function hash(): void;
/**
 * Computes a hash for the given array.
 *
 * @private
 * @method
 * @param {Array<number>} array - The array to be hashed.
 * @return {number} The hash.
 */
export function hashArray(array: Array<number>): number;
/**
 * Computes a hash for the given string.
 *
 * @private
 * @method
 * @param {string} str - The string to be hashed.
 * @return {number} The hash.
 */
export function hashString(str: string): number;
/**
 * TSL object that represents the object's model normal view in `highp` precision
 * which is achieved by computing the matrix in JS and not in the shader.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const highpModelNormalViewMatrix: Node<any>;
/**
 * TSL object that represents the object's model view in `highp` precision
 * which is achieved by computing the matrix in JS and not in the shader.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const highpModelViewMatrix: Node<any>;
export function hue(): void;
export function increment(): void;
export function incrementBefore(): void;
/**
 * Creates an inspector node to wrap around a given node for inspection purposes.
 *
 * @tsl
 * @param {Node} node - The node to inspect.
 * @param {string} [name=''] - Optional name for the inspector node.
 * @param {Function|null} [callback=null] - Optional callback to modify the node during setup.
 * @returns {Node} The inspector node.
 */
export function inspect(node: Node, name?: string, callback?: Function | null): Node;
export function instance(): void;
/**
 * TSL object representing a varying property for the instanced color vector.
 *
 * @type {VaryingNode<vec3>}
 */
export const instanceColor: VaryingNode<any>;
/**
 * TSL object that contextually represents specific index data depending on the shader stage.
 *
 * Within the vertex and fragment stages, `instanceIndex` will represent the index of the current mesh instance being evaluated by the shader.
 * In these stages, use `instanceIndex` to modify a mesh based on its instance or to select per-instance data.
 *
 * ```js
 * // instanceIndex will equal the current mesh's instance index between 0-500
 * const material = new THREE.BasicNodeMaterial();
 * material.positionNode = vec3( instanceIndex.mod( 10 ), instanceIndex.div( 10 ), 0 );
 * const mesh = new THREE.InstancedMesh( geometry, material, 500 );
 * ```
 *
 * Within the compute stage, `instanceIndex` will represent the global index of a compute invocation within the 3-dimensional compute workgroup load.
 * In this stage, use `instanceIndex` to modify or select data at a given index within a buffer, or derive values from the index itself.
 *
 * ```js
 * // instanceIndex will equal value between 0 - 255
 * const computeFn = Fn() => {
 *
 * 	storageBuffer.element( instanceIndex ).assign( instanceIndex );
 *
 * } )().compute( 255 )
 * ```
 *
 * @tsl
 * @type {IndexNode}
 */
export const instanceIndex: IndexNode;
/**
 * TSL function for creating a storage buffer node with a configured `StorageInstancedBufferAttribute`.
 *
 * @tsl
 * @function
 * @param {number|TypedArray} count - The data count. It is also valid to pass a typed array as an argument.
 * @param {string|Struct} [type='float'] - The data type.
 * @returns {StorageBufferNode}
 */
export function instancedArray(count: number | TypedArray, type?: string | Struct): StorageBufferNode;
/**
 * TSL function for creating a buffer attribute node but with enabled instancing
 *
 * @tsl
 * @function
 * @param {BufferAttribute|InterleavedBuffer|TypedArray} array - The attribute data.
 * @param {?string} [type=null] - The buffer type (e.g. `'vec3'`).
 * @param {number} [stride=0] - The buffer stride.
 * @param {number} [offset=0] - The buffer offset.
 * @returns {BufferAttributeNode|Node}
 */
export function instancedBufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode | Node;
/**
 * TSL function for creating a buffer attribute node but with dynamic draw usage and enabled instancing
 *
 * @tsl
 * @function
 * @param {BufferAttribute|InterleavedBuffer|TypedArray} array - The attribute data.
 * @param {?string} [type=null] - The buffer type (e.g. `'vec3'`).
 * @param {number} [stride=0] - The buffer stride.
 * @param {number} [offset=0] - The buffer offset.
 * @returns {BufferAttributeNode|Node}
 */
export function instancedDynamicBufferAttribute(array: BufferAttribute | InterleavedBuffer | TypedArray, type?: string | null, stride?: number, offset?: number): BufferAttributeNode | Node;
export function instancedMesh(): void;
export const int: any;
/**
 * Bitcasts an integer or a vector of integers to a corresponding float type with the same element size.
 *
 * @tsl
 * @function
 * @param {Node<int>} value - The integer or vector of integers to bitcast.
 * @returns {BitcastNode}
 */
export function intBitsToFloat(value: Node<any>): BitcastNode;
/**
 * Interleaved Gradient Noise (IGN) from Jimenez 2014.
 *
 * IGN has "low discrepancy" resulting in evenly distributed samples. It's superior compared to
 * default white noise, blue noise or Bayer.
 *
 * References:
 * - {@link https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/}
 * - {@link https://blog.demofox.org/2022/01/01/interleaved-gradient-noise-a-different-kind-of-low-discrepancy-sequence/}
 *
 * @tsl
 * @function
 * @param {Node<vec2>} position - The input position, usually screen coordinates.
 * @return {Node<float>} The noise value.
 */
export const interleavedGradientNoise: any;
/**
 * Returns the inverse of a matrix.
 *
 * @tsl
 * @function
 * @param {Node<mat2|mat3|mat4>} x - The parameter.
 * @returns {Node<mat2|mat3|mat4>}
 */
export const inverse: any;
/**
 * Returns the inverse of the square root of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const inverseSqrt: any;
export const inversesqrt: any;
/**
 * TSL object that represents the index of a compute invocation within the scope of a workgroup.
 *
 * ```js
 * // Execute 12 compute threads with a workgroup size of 4.
 * const computeFn = Fn( () => {
 *
 * 	storageBufferOne.element( instanceIndex ).assign( invocationLocalIndex );
 * 	storageBufferTwo.element( instanceIndex ).assign( workgroupId.x );
 *
 * } )().compute( 12, [ 4 ] );
 *
 * // instanceIndex =  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
 * // Buffer One ( Invocation Local Index ) =     [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ];
 * // Buffer Two ( Workgroup ID )           =     [ 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2 ];
 * ```
 *
 * @tsl
 * @type {IndexNode}
 */
export const invocationLocalIndex: IndexNode;
/**
 * TSL object that represents the index of a compute invocation within the scope of a subgroup.
 *
 * ```js
 * // Execute 12 compute threads with a workgroup size of 12. Example assumes a subgroup size of 3.
 * const computeFn = Fn( () => {
 *
 * 	storageBufferOne.element( instanceIndex ).assign( invocationSubgroupIndex );
 * 	storageBufferTwo.element( instanceIndex ).assign( subgroupIndex );
 *
 * } )().compute( 12, [ 12 ] );
 *
 * // instanceIndex =  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
 * // Buffer One ( Invocation Subgroup Index ) =  [ 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2 ];
 * // Buffer Two ( Subgroup Index )            =  [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3 ];
 * ```
 *
 * @tsl
 * @type {IndexNode}
 */
export const invocationSubgroupIndex: IndexNode;
/**
 * TSL object that represents the shader variable `IOR`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const ior: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `Iridescence`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const iridescence: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `IridescenceIOR`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const iridescenceIOR: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `IridescenceThickness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const iridescenceThickness: PropertyNode<any>;
/**
 * TSL function for creating a cache node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node that should be cached.
 * @returns {IsolateNode}
 */
export function isolate(node: Node): IsolateNode;
export const ivec2: any;
export const ivec3: any;
export const ivec4: any;
/**
 * TSL function for creating a JS code node.
 *
 * @tsl
 * @function
 * @param {string} src - The native code.
 * @param {Array<Node>} includes - An array of includes.
 * @returns {CodeNode}
 */
export function js(src: string, includes: Array<Node>): CodeNode;
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
export function label(node: Node, name: string): ContextNode;
/**
 * Calculates the length of a vector.
 *
 * @tsl
 * @function
 * @param {Node} x - The parameter.
 * @returns {Node<float>}
 */
export const length: any;
/**
 * Calculate the squared length of a vector.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} a - The vector.
 * @returns {Node<float>}
 */
export function lengthSq(a: Node<any | any | any>): Node<any>;
/**
 * Checks if the first node is less than the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const lessThan: any;
/**
 * Checks if the first node is less than or equal to the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const lessThanEqual: any;
/**
 * TSL function for getting the position in world space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<vec3>} The light's position in world space.
 */
export function lightPosition(light: Light): UniformNode<any>;
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
export function lightProjectionUV(light: Light, position?: Node<any>): Node<any>;
/**
 * TSL function for getting a shadow matrix uniform node for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<mat4>} The shadow matrix uniform node.
 */
export function lightShadowMatrix(light: Light): UniformNode<any>;
/**
 * TSL function for getting the light target direction for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {Node<vec3>} The light's target direction.
 */
export function lightTargetDirection(light: Light): Node<any>;
/**
 * TSL function for getting the light target position in world space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<vec3>} The light target position in world space.
 */
export function lightTargetPosition(light: Light): UniformNode<any>;
/**
 * TSL function for getting the position in view space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light - The light source.
 * @returns {UniformNode<vec3>} The light's position in view space.
 */
export function lightViewPosition(light: Light): UniformNode<any>;
export const lightingContext: any;
/**
 * TSL function for creating an instance of `LightsNode` and configuring
 * it with the given array of lights.
 *
 * @tsl
 * @function
 * @param {Array<Light>} lights - An array of lights.
 * @return {LightsNode} The created lights node.
 */
export function lights(lights?: Array<Light>): LightsNode;
/**
 * TSL function for converting a perspective depth value to linear depth.
 *
 * @tsl
 * @function
 * @param {?Node<float>} [value=null] - The perspective depth. If `null` is provided, the current fragment's depth is used.
 * @returns {ViewportDepthNode<float>}
 */
export const linearDepth: any;
/**
 * Linear tone mapping, exposure only.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const linearToneMapping: any;
/**
 * A non-linearized 3-dimensional representation of the current invocation's position within a 3D workgroup grid.
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const localId: ComputeBuiltinNode<any>;
/**
 * Returns the natural logarithm of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const log: any;
/**
 * Returns the base 2 logarithm of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const log2: any;
/**
 * TSL function for converting a logarithmic depth value to a viewZ value.
 *
 * @tsl
 * @function
 * @param {Node<float>} depth - The logarithmic depth.
 * @param {Node<float>} near - The camera's near value.
 * @param {Node<float>} far - The camera's far value.
 * @returns {Node<float>}
 */
export function logarithmicDepthToViewZ(depth: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * Computes the luminance for the given RGB color value.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color value to compute the luminance for.
 * @param {?Node<vec3>} luminanceCoefficients - The luminance coefficients. By default predefined values of the current working color space are used.
 * @return {Node<float>} The luminance.
 */
export function luminance(color: Node<any>, luminanceCoefficients?: Node<any> | null): Node<any>;
export const mat2: any;
export const mat3: any;
export const mat4: any;
/**
 * TSL function for creating a matcap uv node.
 *
 * Can be used to compute texture coordinates for projecting a
 * matcap onto a mesh. Used by {@link MeshMatcapNodeMaterial}.
 *
 * @tsl
 * @function
 * @returns {Node<vec2>} The matcap UV coordinates.
 */
export const matcapUV: any;
/**
 * TSL object that represents the ambient occlusion map of the current material.
 * The value is composed via `aoMap.r` - 1 * `aoMapIntensity` + 1.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialAO: Node<any>;
/**
 * TSL object that represents alpha test of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialAlphaTest: Node<any>;
/**
 * TSL object that represents the anisotropy of the current material.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const materialAnisotropy: Node<any>;
/**
 * TSL object that represents the anisotropy vector of the current material.
 *
 * @tsl
 * @type {Node<vec2>}
 */
export const materialAnisotropyVector: Node<any>;
/**
 * TSL object that represents the attenuation color of the current material.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialAttenuationColor: Node<any>;
/**
 * TSL object that represents the attenuation distance of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialAttenuationDistance: Node<any>;
/**
 * TSL object that represents the clearcoat of the current material.
 * The value is composed via `clearcoat` * `clearcoatMap.r`
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialClearcoat: Node<any>;
/**
 * TSL object that represents the clearcoat normal of the current material.
 * The value will be either `clearcoatNormalMap` or `normalView`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialClearcoatNormal: Node<any>;
/**
 * TSL object that represents the clearcoat roughness of the current material.
 * The value is composed via `clearcoatRoughness` * `clearcoatRoughnessMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialClearcoatRoughness: Node<any>;
/**
 * TSL object that represents the diffuse color of the current material.
 * The value is composed via `color` * `map`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialColor: Node<any>;
/**
 * TSL object that represents the diffuse roughness of the current material.
 * The value is composed via `diffuseRoughness` * `diffuseRoughnessMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialDiffuseRoughness: Node<any>;
/**
 * TSL object that represents the dispersion of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialDispersion: Node<any>;
/**
 * TSL object that represents the emissive color of the current material.
 * The value is composed via `emissive` * `emissiveIntensity` * `emissiveMap`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialEmissive: Node<any>;
/**
 * TSL object that represents the intensity of environment maps of PBR materials.
 * When `material.envMap` is set, the value is `material.envMapIntensity` otherwise `scene.environmentIntensity`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialEnvIntensity: Node<any>;
/**
 * TSL object that represents the rotation of environment maps.
 * When `material.envMap` is set, the value is `material.envMapRotation`.
 * `scene.environmentRotation` controls the rotation of `scene.environment` or `scene.environmentNode` instead.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const materialEnvRotation: Node<any>;
/**
 * TSL object that represents the IOR of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIOR: Node<any>;
/**
 * TSL object that represents the iridescence of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIridescence: Node<any>;
/**
 * TSL object that represents the iridescence IOR of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIridescenceIOR: Node<any>;
/**
 * TSL object that represents the iridescence thickness of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialIridescenceThickness: Node<any>;
/**
 * TSL object that represents the light map of the current material.
 * The value is composed via `lightMapIntensity` * `lightMap.rgb`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialLightMap: Node<any>;
/**
 * TSL object that represents the dash offset of the current line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineDashOffset: Node<any>;
/**
 * TSL object that represents the dash size of the current dashed line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineDashSize: Node<any>;
/**
 * TSL object that represents the gap size of the current dashed line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineGapSize: Node<any>;
/**
 * TSL object that represents the scale of the current dashed line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineScale: Node<any>;
/**
 * TSL object that represents the line width of the current line material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialLineWidth: Node<any>;
/**
 * TSL object that represents the metalness of the current material.
 * The value is composed via `metalness` * `metalnessMap.b`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialMetalness: Node<any>;
/**
 * TSL object that represents the normal of the current material.
 * The value will be either `normalMap` * `normalScale`, `bumpMap` * `bumpScale` or `normalView`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialNormal: Node<any>;
/**
 * TSL object that represents the opacity of the current material.
 * The value is composed via `opacity` * `alphaMap`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialOpacity: Node<any>;
/**
 * TSL object that represents the point size of the current points material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialPointSize: Node<any>;
/**
 * TSL function for creating a material reference node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the property the node refers to.
 * @param {string} type - The uniform type that should be used to represent the property value.
 * @param {?Material} [material=null] - The material the property belongs to.
 * When no material is set, the node refers to the material of the current rendered object.
 * @returns {MaterialReferenceNode}
 */
export function materialReference(name: string, type: string, material?: Material | null): MaterialReferenceNode;
/**
 * TSL object that represents the reflectivity of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialReflectivity: Node<any>;
/**
 * TSL object that represents the refraction ratio of the material used for rendering the current object.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const materialRefractionRatio: UniformNode<any>;
/**
 * TSL object that represents the retroreflective strength of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialRetroreflectivity: Node<any>;
/**
 * TSL object that represents the rotation of the current sprite material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialRotation: Node<any>;
/**
 * TSL object that represents the roughness of the current material.
 * The value is composed via `roughness` * `roughnessMap.g`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialRoughness: Node<any>;
/**
 * TSL object that represents the sheen color of the current material.
 * The value is composed via `sheen` * `sheenColor` * `sheenColorMap`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialSheen: Node<any>;
/**
 * TSL object that represents the sheen roughness of the current material.
 * The value is composed via `sheenRoughness` * `sheenRoughnessMap.a`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialSheenRoughness: Node<any>;
/**
 * TSL object that represents the shininess of the current material.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialShininess: Node<any>;
/**
 * TSL object that represents the specular of the current material.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialSpecular: Node<any>;
/**
 * TSL object that represents the specular color of the current material.
 * The value is composed via `specularColor` * `specularMap.rgb`.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const materialSpecularColor: Node<any>;
/**
 * TSL object that represents the specular intensity of the current material.
 * The value is composed via `specularIntensity` * `specularMap.a`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialSpecularIntensity: Node<any>;
/**
 * TSL object that represents the specular strength of the current material.
 * The value is composed via `specularMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialSpecularStrength: Node<any>;
/**
 * TSL object that represents the thickness of the current material.
 * The value is composed via `thickness` * `thicknessMap.g`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialThickness: Node<any>;
/**
 * TSL object that represents the transmission of the current material.
 * The value is composed via `transmission` * `transmissionMap.r`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialTransmission: Node<any>;
/**
 * Returns the greatest of the given values.
 *
 * @tsl
 * @function
 * @param {...(Node | number)} values - The values to compare.
 * @returns {Node}
 */
declare const max$1: any;
/**
 * TSL function for creating a max mip level node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - The texture node to compute the max mip level for.
 * @returns {MaxMipLevelNode}
 */
export const maxMipLevel: any;
/**
 * TSL object that represents the object's model view in `mediump` precision.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const mediumpModelViewMatrix: Node<any>;
/**
 * TSL object that represents the shader variable `Metalness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const metalness: PropertyNode<any>;
/**
 * Returns the least of the given values.
 *
 * @tsl
 * @function
 * @param {...(Node | number)} values - The values to compare.
 * @returns {Node}
 */
declare const min$1: any;
/**
 * Linearly interpolates between two values.
 *
 * @tsl
 * @function
 * @param {Node | number} a - The first parameter.
 * @param {Node | number} b - The second parameter.
 * @param {Node | number} t - The interpolation value.
 * @returns {Node}
 */
export const mix: any;
/**
 * Alias for `mix()` with a different parameter order.
 *
 * @tsl
 * @function
 * @param {Node | number} t - The interpolation value.
 * @param {Node | number} e1 - The first parameter.
 * @param {Node | number} e2 - The second parameter.
 * @returns {Node}
 */
export function mixElement(t: Node | number, e1: Node | number, e2: Node | number): Node;
/**
 * Computes the remainder of dividing the first node by the second one.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const mod: any;
/**
 * TSL object that represents the object's direction in world space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelDirection: ModelNode<any>;
/**
 * TSL object that represents the object's normal matrix.
 *
 * @tsl
 * @type {UniformNode<mat3>}
 */
export const modelNormalMatrix: UniformNode<any>;
/**
 * TSL object that represents the object's position in world space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelPosition: ModelNode<any>;
/**
 * TSL object that represents the object's radius.
 *
 * @tsl
 * @type {ModelNode<float>}
 */
export const modelRadius: ModelNode<any>;
/**
 * TSL object that represents the object's scale in world space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelScale: ModelNode<any>;
/**
 * TSL object that represents the object's model view matrix.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const modelViewMatrix: Node<any>;
/**
 * TSL object that represents the object's position in view/camera space.
 *
 * @tsl
 * @type {ModelNode<vec3>}
 */
export const modelViewPosition: ModelNode<any>;
/**
 * TSL object that represents the position in clip space after the model-view-projection transform of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec4>}
 */
export const modelViewProjection: VaryingNode<any>;
/**
 * TSL object that represents the object's world matrix.
 *
 * @tsl
 * @type {ModelNode<mat4>}
 */
export const modelWorldMatrix: ModelNode<any>;
/**
 * TSL object that represents the object's inverse world matrix.
 *
 * @tsl
 * @type {UniformNode<mat4>}
 */
export const modelWorldMatrixInverse: UniformNode<any>;
export function morphReference(): void;
/**
 * TSL function for creating a MRT node.
 *
 * @tsl
 * @function
 * @param {Object<string, Node>} outputNodes - The MRT outputs.
 * @returns {MRTNode}
 */
export const mrt: any;
/**
 * Returns the multiplication of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const mul: any;
export function mx_aastep(threshold: any, value: any): any;
export function mx_add(in1: any, in2?: any): any;
export function mx_atan2(in1?: any, in2?: any): any;
export function mx_cell_noise_float(texcoord?: any): any;
export function mx_cell_noise_vec3(texcoord?: any): any;
export function mx_contrast(input: any, amount?: number, pivot?: number): any;
export function mx_divide(in1: any, in2?: any): any;
export function mx_fractal_noise_float(position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number): any;
export function mx_fractal_noise_float_2d(texcoord?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number): any;
export function mx_fractal_noise_vec2(position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number): any;
export function mx_fractal_noise_vec3(position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number): any;
export function mx_fractal_noise_vec4(position?: any, octaves?: number, lacunarity?: number, diminish?: number, amplitude?: number): any;
export function mx_frame(): any;
export function mx_heighttonormal(input: any, scale?: number, texcoord?: any): any;
export const mx_hsvtorgb: any;
export function mx_ifequal(value1: any, value2: any, in1: any, in2: any): any;
export function mx_ifgreater(value1: any, value2: any, in1: any, in2: any): any;
export function mx_ifgreatereq(value1: any, value2: any, in1: any, in2: any): any;
export function mx_invert(in1: any, amount?: any): any;
export function mx_modulo(in1: any, in2?: any): any;
export function mx_multiply(in1: any, in2?: any): any;
export function mx_noise_float(texcoord?: any, amplitude?: number, pivot?: number): any;
export function mx_noise_vec3(texcoord?: any, amplitude?: number, pivot?: number): any;
export function mx_noise_vec4(texcoord?: any, amplitude?: number, pivot?: number): any;
export function mx_place2d(texcoord: any, pivot?: any, scale?: any, rotate?: any, offset?: any, operationorder?: any): any;
export function mx_power(in1: any, in2?: any): any;
export function mx_ramp4(valuetl: any, valuetr: any, valuebl: any, valuebr: any, texcoord?: any): any;
export function mx_ramplr(valuel: any, valuer: any, texcoord?: any): any;
export function mx_ramptb(valueb: any, valuet: any, texcoord?: any): any;
export const mx_rgbtohsv: any;
export function mx_rotate2d(input: any, amount?: number): any;
export function mx_rotate3d(input: any, amount?: number, axis?: any): any;
export function mx_safepower(in1: any, in2?: number): any;
export function mx_separate(in1: any, channelOrOut?: null): any;
export function mx_smoothstep(inNode: any, low?: number, high?: number): any;
export function mx_splitlr(valuel: any, valuer: any, center: any, texcoord?: any): any;
export function mx_splittb(valueb: any, valuet: any, center: any, texcoord?: any): any;
export const mx_srgb_texture_to_lin_rec709: any;
export function mx_subtract(in1: any, in2?: any): any;
export function mx_timer(): any;
export function mx_transform_uv(uv_scale?: number, uv_offset?: number, uv_geo?: any): any;
export function mx_unifiednoise2d(noiseType: any, texcoord?: any, freq?: any, offset?: any, jitter?: number, outmin?: number, outmax?: number, clampoutput?: boolean, octaves?: number, lacunarity?: number, diminish?: number, style?: number): void;
export function mx_unifiednoise3d(noiseType: any, texcoord?: any, freq?: any, offset?: any, jitter?: number, outmin?: number, outmax?: number, clampoutput?: boolean, octaves?: number, lacunarity?: number, diminish?: number, style?: number): void;
export function mx_worley_noise_float(texcoord?: any, jitter?: number, style?: number): void;
export function mx_worley_noise_float_2d(texcoord?: any, jitter?: number, style?: number): void;
export function mx_worley_noise_float_3d(texcoord?: any, jitter?: number, style?: number): void;
export function mx_worley_noise_vec2(texcoord?: any, jitter?: number): any;
export function mx_worley_noise_vec3(texcoord?: any, jitter?: number, metric?: number): any;
export function mx_worley_noise_vec3_style(texcoord?: any, jitter?: number, style?: number, metric?: number): any;
/**
 * Negates the value of the parameter (-x).
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const negate: any;
export function negateOnBackSide(): void;
/**
 * Neutral tone mapping.
 *
 * Reference: {@link https://modelviewer.dev/examples/tone-mapping}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const neutralToneMapping: any;
export function nodeArray(val: any, altType?: null): any;
export function nodeImmutable(NodeClass: any, ...params: any[]): any;
export function nodeObject(val: any, altType?: null): any;
export function nodeObjectIntent(val: any, altType?: null): any;
export function nodeObjects(val: any, altType?: null): any;
export function nodeProxy(NodeClass: any, scope?: null, factor?: null, settings?: null): any;
export function nodeProxyConstructor(constructorFunction: any, nodeInstance: any): any;
export function nodeProxyIntent(NodeClass: any, scope?: null, factor?: null, settings?: {}): any;
/**
 * TSL object that represents the flat vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalFlat: Node<any>;
/**
 * TSL object that represents the normal attribute of the current rendered object in local space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalGeometry: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in local space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalLocal: Node<any>;
/**
 * TSL function for creating a normal map node.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} node - Represents the normal map data.
 * @param {?Node<vec2>} [scaleNode=null] - Controls the intensity of the effect.
 * @returns {NormalMapNode}
 */
export const normalMap: any;
/**
 * TSL object that represents the vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalView: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalViewGeometry: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in world space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalWorld: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in world space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalWorldGeometry: Node<any>;
/**
 * Calculates the unit vector in the same direction as the original vector.
 *
 * @tsl
 * @function
 * @param {Node} x - The input vector.
 * @returns {Node}
 */
export const normalize: any;
/**
 * Performs logical NOT on a node.
 *
 * @tsl
 * @function
 * @param {Node} value - The value.
 * @returns {OperatorNode}
 */
export const not: any;
/**
 * Checks if two nodes are not equal.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const notEqual: any;
/**
 * Represents the number of workgroups dispatched by the compute shader.
 * ```js
 * // Run 512 invocations/threads with a workgroup size of 128.
 * const computeFn = Fn(() => {
 *
 *     // numWorkgroups.x = 4
 *     storageBuffer.element(0).assign(numWorkgroups.x)
 *
 * })().compute(512, [128]);
 *
 * // Run 512 invocations/threads with the default workgroup size of 64.
 * const computeFn = Fn(() => {
 *
 *     // numWorkgroups.x = 8
 *     storageBuffer.element(0).assign(numWorkgroups.x)
 *
 * })().compute(512);
 * ```
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const numWorkgroups: ComputeBuiltinNode<any>;
/**
 * TSL function for creating an object 3D node that represents the object's direction in world space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectDirection: any;
/**
 * TSL object that represents a uniform group node which is updated once per object.
 *
 * @tsl
 * @type {UniformGroupNode}
 */
export const objectGroup: UniformGroupNode;
/**
 * TSL function for creating an object 3D node that represents the object's position in world space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectPosition: any;
/**
 * TSL function for creating an object 3D node that represents the object's radius.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<float>}
 */
export const objectRadius: any;
/**
 * TSL function for creating an object 3D node that represents the object's scale in world space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectScale: any;
/**
 * TSL function for creating an object 3D node that represents the object's position in view/camera space.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<vec3>}
 */
export const objectViewPosition: any;
/**
 * TSL function for creating an object 3D node that represents the object's world matrix.
 *
 * @tsl
 * @function
 * @param {?Object3D} [object3d] - The 3D object.
 * @returns {Object3DNode<mat4>}
 */
export const objectWorldMatrix: any;
/**
 * Return `1` minus the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const oneMinus: any;
/**
 * Performs a logical OR operation on multiple nodes.
 *
 * @tsl
 * @function
 * @param {...Node} nodes - The input nodes to be combined using OR.
 * @returns {OperatorNode}
 */
export const or: any;
export function orthographicDepthToViewZ(): void;
/**
 * Generates a sawtooth wave oscillation based on a timer.
 *
 * @tsl
 * @function
 * @param {Node<float>} t - The timer to generate the oscillation with.
 * @return {Node<float>} The oscillation node.
 */
export function oscSawtooth(t?: Node<any>): Node<any>;
/**
 * Generates a sine wave oscillation based on a timer.
 *
 * @tsl
 * @function
 * @param {Node<float>} t - The timer to generate the oscillation with.
 * @return {Node<float>} The oscillation node.
 */
export function oscSine(t?: Node<any>): Node<any>;
/**
 * Generates a square wave oscillation based on a timer.
 *
 * @tsl
 * @function
 * @param {Node<float>} t - The timer to generate the oscillation with.
 * @return {Node<float>} The oscillation node.
 */
export function oscSquare(t?: Node<any>): Node<any>;
/**
 * Generates a triangle wave oscillation based on a timer.
 *
 * @tsl
 * @function
 * @param {Node<float>} t - The timer to generate the oscillation with.
 * @return {Node<float>} The oscillation node.
 */
export function oscTriangle(t?: Node<any>): Node<any>;
/**
 * TSL object that represents the shader variable `Output`.
 *
 * @tsl
 * @type {PropertyNode<vec4>}
 */
export const output: PropertyNode<any>;
/**
 * TSL function for creating an output struct node.
 *
 * @tsl
 * @function
 * @param {...Node} members - A parameter list of nodes.
 * @returns {OutputStructNode}
 */
export const outputStruct: any;
/**
 * TSL function for creating a function overloading node.
 *
 * @tsl
 * @function
 * @param {Array<Function>} functionNodes - Array of `Fn` function definitions.
 * @returns {FunctionOverloadingNode}
 */
export function overloadingFn(functionNodes: Array<Function>): FunctionOverloadingNode;
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
export function overrideNode(targetNode: Node, callback?: Function | Node | null, flowNode?: Node | null): OverrideContextNode;
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
export function overrideNodes(overrides: Map<Node, (Function | Node)> | Array<Array<Node | Function | Node>>, flowNode?: Node | null): OverrideContextNode;
/**
 * Packs the least significant 8 bits of four signed integers into a `uint`.
 *
 * @tsl
 * @function
 * @param {Node<ivec4>} value - The signed integer vector to pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xI8: any;
/**
 * Clamps four signed integers to the signed 8-bit range and packs them into a
 * `uint`.
 *
 * @tsl
 * @function
 * @param {Node<ivec4>} value - The signed integer vector to clamp and pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xI8Clamp: any;
/**
 * Packs the least significant 8 bits of four unsigned integers into a `uint`.
 *
 * @tsl
 * @function
 * @param {Node<uvec4>} value - The unsigned integer vector to pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xU8: any;
/**
 * Clamps four unsigned integers to the unsigned 8-bit range and packs them
 * into a `uint`.
 *
 * @tsl
 * @function
 * @param {Node<uvec4>} value - The unsigned integer vector to clamp and pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xU8Clamp: any;
/**
 * Converts each component of the vec2 to 16-bit floating-point values. The results are packed into a single unsigned integer.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} value - The 2-component vector to be packed
 * @returns {Node}
 */
export const packHalf2x16: any;
/**
 * Packs a normal vector into a color value.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} node - The direction to pack.
 * @return {Node<vec3>} The color.
 */
export function packNormalToRGB(node: Node<any>): Node<any>;
/**
 * Converts each component of the normalized float to 16-bit integer values. The results are packed into a single unsigned integer.
 * round(clamp(c, -1, +1) * 32767.0)
 *
 * @tsl
 * @function
 * @param {Node<vec2>} value - The 2-component vector to be packed
 * @returns {Node}
 */
export const packSnorm2x16: any;
/**
 * Converts each component of the normalized float to 8-bit integer values. The results are packed into a single unsigned integer.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} value - The 4-component vector to be packed
 * @returns {Node}
 */
export const packSnorm4x8: any;
/**
 * Converts each component of the normalized float to 16-bit integer values. The results are packed into a single unsigned integer.
 * round(clamp(c, 0, +1) * 65535.0)
 *
 * @tsl
 * @function
 * @param {Node<vec2>} value - The 2-component vector to be packed
 * @returns {Node}
 */
export const packUnorm2x16: any;
/**
 * Converts each component of the normalized float to 8-bit integer values. The results are packed into a single unsigned integer.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} value - The 4-component vector to be packed
 * @returns {Node}
 */
export const packUnorm4x8: any;
/**
 * A function that remaps the `[0,1]` interval into the `[0,1]` interval.
 * The corners are mapped to `0` and the center to `1`.
 * Reference: {@link https://iquilezles.org/articles/functions/}.
 *
 * @tsl
 * @function
 * @param {Node<float>} x - The value to remap.
 * @param {Node<float>} k - Allows to control the remapping functions shape by rising the parabola to a power `k`.
 * @return {Node<float>} The remapped value.
 */
export function parabola(x: Node<any>, k: Node<any>): Node<any>;
/**
 * TSL object that represents the parallax direction.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const parallaxDirection: Node<any>;
/**
 * TSL function for computing parallax uv coordinates.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} uv - A uv node.
 * @param {Node<vec2>} scale - A scale node.
 * @returns {Node<vec2>} Parallax uv coordinates.
 */
export function parallaxUV(uv: Node<any>, scale: Node<any>): Node<any>;
/**
 * TSL function for creating a parameter node.
 *
 * @tsl
 * @function
 * @param {string} type - The type of the node.
 * @param {?string} name - The name of the parameter in the shader.
 * @returns {ParameterNode}
 */
export function parameter(type: string, name: string | null): ParameterNode;
/**
 * TSL function for creating a pass node.
 *
 * @tsl
 * @function
 * @param {Scene} scene - A reference to the scene.
 * @param {Camera} camera - A reference to the camera.
 * @param {Object} options - Options for the internal render target.
 * @returns {PassNode}
 */
export function pass(scene: Scene, camera: Camera, options: Object): PassNode;
/**
 * TSL function for creating a pass texture node.
 *
 * @tsl
 * @function
 * @param {PassNode} pass - The pass node.
 * @param {Texture} texture - The output texture.
 * @returns {PassTextureNode}
 */
export function passTexture(pass: PassNode, texture: Texture): PassTextureNode;
/**
 * A function that remaps the `[0,1]` interval into the `[0,1]` interval.
 * A generalization of the `parabola()`. Keeps the corners mapped to 0 but allows the control of the shape one either side of the curve.
 * Reference: {@link https://iquilezles.org/articles/functions/}.
 *
 * @tsl
 * @function
 * @param {Node<float>} x - The value to remap.
 * @param {Node<float>} a - First control parameter.
 * @param {Node<float>} b - Second control parameter.
 * @return {Node<float>} The remapped value.
 */
export function pcurve(x: Node<any>, a: Node<any>, b: Node<any>): Node<any>;
export function perspectiveDepthToViewZ(): void;
/**
 * TSL function for creating a PMREM node.
 *
 * @tsl
 * @function
 * @param {Texture} value - The input texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<float>} [levelNode=null] - The level node.
 * @returns {PMREMNode}
 */
export const pmremTexture: any;
/**
 * TSL function for creating an instance of `PointShadowNode`.
 *
 * @tsl
 * @function
 * @param {PointLight} light - The shadow casting point light.
 * @param {?PointLightShadow} [shadow=null] - An optional point light shadow.
 * @return {PointShadowNode} The created point shadow node.
 */
export function pointShadow(light: PointLight, shadow?: PointLightShadow | null): PointShadowNode;
/**
 * TSL object that represents the uv coordinates of points.
 *
 * @tsl
 * @type {PointUVNode}
 */
export const pointUV: PointUVNode;
/**
 * TSL object that represents the shader variable `pointWidth`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const pointWidth: PropertyNode<any>;
/**
 * TSL object that represents the position attribute of the current rendered object.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionGeometry: AttributeNode<any>;
/**
 * TSL object that represents the transformed vertex position in local space of the current rendered object.
 *
 * The term "transformed" indicates that an object or material's properties, such as skinning, batch,
 * instancing, or displacement mapping, will change the vertex position of the node when present.
 * To use the pre-transformed local space position of the object, use {@link positionGeometry}.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionLocal: AttributeNode<any>;
/**
 * TSL object that represents the previous vertex position in local space of the current rendered object.
 * Used in context of {@link VelocityNode} for rendering motion vectors.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionPrevious: AttributeNode<any>;
/**
 * TSL object that represents the vertex position in view space of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionView: VaryingNode<any>;
/**
 * TSL object that represents the position view direction of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionViewDirection: VaryingNode<any>;
/**
 * TSL object that represents the vertex position in world space of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionWorld: VaryingNode<any>;
/**
 * TSL object that represents the position world direction of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const positionWorldDirection: Node<any>;
export function posterize(): void;
/**
 * Return the value of the first parameter raised to the power of the second one.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @param {Node | number} y - The second parameter.
 * @returns {Node}
 */
export const pow: any;
/**
 * Returns the square of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @returns {Node}
 */
export function pow2(x: Node | number): Node;
/**
 * Returns the cube of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @returns {Node}
 */
export function pow3(x: Node | number): Node;
/**
 * Returns the fourth power of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @returns {Node}
 */
export function pow4(x: Node | number): Node;
export function premultiplyAlpha(): void;
/**
 * TSL function for creating a property node.
 *
 * @tsl
 * @function
 * @param {string} type - The type of the node.
 * @param {?string} [name=null] - The name of the property in the shader.
 * @param {?Node} [placeholderNode=null] - The placeholder node if not assigned.
 * @returns {PropertyNode}
 */
export function property(type: string, name?: string | null, placeholderNode?: Node | null): PropertyNode;
/**
 * Broadcasts e from the quad invocation with id equal to id.
 *
 * @tsl
 * @method
 * @param {number} e - The value to broadcast.
 * @return {number} The broadcast value.
 */
export const quadBroadcast: any;
/**
 * Swaps e between invocations in the quad diagonally.
 *
 * @tsl
 * @method
 * @param {number} e - The value to swap from the current invocation.
 * @return {number} The value received from the swap operation.
 */
export const quadSwapDiagonal: any;
/**
 * Swaps e between invocations in the quad in the X direction.
 *
 * @tsl
 * @method
 * @param {number} e - The value to swap from the current invocation.
 * @return {number} The value received from the swap operation.
 */
export const quadSwapX: any;
/**
 * Swaps e between invocations in the quad in the Y direction.
 *
 * @tsl
 * @method
 * @param {number} e - The value to swap from the current invocation.
 * @return {number} The value received from the swap operation.
 */
export const quadSwapY: any;
/**
 * Converts a quantity in degrees to radians.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input in degrees.
 * @returns {Node}
 */
export const radians: any;
export function rand(): void;
/**
 * TSL function for creating a range node.
 *
 * @tsl
 * @function
 * @param {Node<any>} [minNode=float()] - A node defining the lower bound of the range.
 * @param {Node<any>} [maxNode=float()] - A node defining the upper bound of the range.
 * @returns {RangeNode}
 */
export const range: any;
export function rangeFogFactor(): void;
/**
 * Returns the reciprocal of the parameter `(1/x)`.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const reciprocal: any;
/**
 * TSL function for creating a reference node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the property the node refers to.
 * @param {string} type - The uniform type that should be used to represent the property value.
 * @param {?Object} [object] - The object the property belongs to.
 * @returns {ReferenceNode}
 */
export function reference(name: string, type: string, object?: Object | null): ReferenceNode;
/**
 * TSL function for creating a reference base node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the property the node refers to.
 * @param {string} type - The uniform type that should be used to represent the property value.
 * @param {Object} object - The object the property belongs to.
 * @returns {ReferenceBaseNode}
 */
export function reference$1(name: string, type: string, object: Object): ReferenceBaseNode;
/**
 * TSL function for creating a reference node. Use this function if you want need a reference
 * to an array-like property that should be represented as a uniform buffer.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the property the node refers to.
 * @param {string} type - The uniform type that should be used to represent the property value.
 * @param {number} count - The number of value inside the array-like object.
 * @param {Object} object - An array-like object the property belongs to.
 * @returns {ReferenceNode}
 */
export function referenceBuffer(name: string, type: string, count: number, object: Object): ReferenceNode;
/**
 * Calculates the reflection direction for an incident vector.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} I - The incident vector.
 * @param {Node<vec2|vec3|vec4>} N - The normal vector.
 * @returns {Node<vec2|vec3|vec4>}
 */
export const reflect: any;
/**
 * Used for sampling cube maps when using cube reflection mapping.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const reflectVector: Node<any>;
/**
 * The reflect vector in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const reflectView: Node<any>;
/**
 * TSL function for creating a reflector node.
 *
 * @tsl
 * @function
 * @param {Object} [parameters={}] - An object holding configuration parameters.
 * @param {Object3D} [parameters.target=new Object3D()] - The 3D object the reflector is linked to.
 * @param {number} [parameters.resolution=1] - The resolution scale.
 * @param {boolean} [parameters.generateMipmaps=false] - Whether mipmaps should be generated or not.
 * @param {boolean} [parameters.bounces=true] - Whether reflectors can render other reflector nodes or not.
 * @param {boolean} [parameters.depth=false] - Whether depth data should be generated or not.
 * @param {number} [parameters.samples] - Anti-Aliasing samples of the internal render-target.
 * @param {TextureNode} [parameters.defaultTexture] - The default texture node.
 * @param {ReflectorBaseNode} [parameters.reflector] - The reflector base node.
 * @returns {ReflectorNode}
 */
export function reflector(parameters?: {
    target?: Object3D | undefined;
    resolution?: number | undefined;
    generateMipmaps?: boolean | undefined;
    bounces?: boolean | undefined;
    depth?: boolean | undefined;
    samples?: number | undefined;
    defaultTexture?: TextureNode | undefined;
    reflector?: ReflectorBaseNode | undefined;
}): ReflectorNode;
/**
 * Calculates the refraction direction for an incident vector.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} I - The incident vector.
 * @param {Node<vec2|vec3|vec4>} N - The normal vector.
 * @param {Node<float>} eta - The ratio of indices of refraction.
 * @returns {Node<vec2|vec3|vec4>}
 */
export const refract: any;
/**
 * Used for sampling cube maps when using cube refraction mapping.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const refractVector: Node<any>;
/**
 * The refract vector in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const refractView: Node<any>;
/**
 * Reinhard tone mapping.
 *
 * Reference: {@link https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf}
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color that should be tone mapped.
 * @param {Node<float>} exposure - The exposure.
 * @return {Node<vec3>} The tone mapped color.
 */
export const reinhardToneMapping: any;
export function remap(): void;
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
export function remapClamp(node: Node, inLowNode: Node, inHighNode: Node, outLowNode?: Node | null, outHighNode?: Node | null): Node;
/**
 * TSL object that represents a shared uniform group node which is updated once per render.
 *
 * @tsl
 * @type {UniformGroupNode}
 */
export const renderGroup: UniformGroupNode;
/**
 * TSL function for creating a render output node.
 *
 * @tsl
 * @function
 * @param {Node} color - The color node to process.
 * @param {?number} [toneMapping=null] - The tone mapping type.
 * @param {?string} [outputColorSpace=null] - The output color space.
 * @returns {RenderOutputNode}
 */
export function renderOutput(color: Node, toneMapping?: number | null, outputColorSpace?: string | null): RenderOutputNode;
/**
 * TSL function for creating a renderer reference node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the property the node refers to.
 * @param {string} type - The uniform type that should be used to represent the property value.
 * @param {?Renderer} [renderer=null] - The renderer the property belongs to. When no renderer is set,
 * the node refers to the renderer of the current state.
 * @returns {RendererReferenceNode}
 */
export function rendererReference(name: string, type: string, renderer?: Renderer | null): RendererReferenceNode;
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
export function replaceDefaultUV(callback: (arg0: Node) => Node<any> | Node<any>, node?: Node): ContextNode;
/**
 * TSL object that represents the shader variable `Retroreflectivity`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const retroreflectivity: PropertyNode<any>;
/**
 * TSL function for creating a rotate node.
 *
 * @tsl
 * @function
 * @param {Node} positionNode - The position node.
 * @param {Node} rotationNode - Represents the rotation that is applied to the position node. Depending
 * on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.
 * @param {string} [order='XYZ'] - The Euler rotation order. Only used for 3D rotation.
 * @returns {RotateNode}
 */
export const rotate: any;
export function rotateUV(): void;
/**
 * TSL object that represents the shader variable `Roughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const roughness: PropertyNode<any>;
/**
 * Rounds the parameter to the nearest integer.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const round: any;
/**
 * TSL function for creating a RTT node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node to render a texture with.
 * @param {?number} [width=null] - The width of the internal render target. If no width is applied, the render target is automatically resized.
 * @param {?number} [height=null] - The height of the internal render target.
 * @param {Object} [options={}] - The options for the internal render target.
 * @param {number} [options.type=HalfFloatType] - The texture type.
 * @param {boolean} [options.autoUpdate=true] - Whether the texture should automatically be updated or not.
 * @param {number} [options.resolutionScale=1] - The resolution scale.
 * @returns {RTTNode}
 */
export function rtt(node: Node, ...params: any[]): RTTNode;
/**
 * Converts the given color value from sRGB to linear-sRGB color space.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The sRGB color.
 * @return {Node<vec3>} The linear-sRGB color.
 */
export const sRGBTransferEOTF: any;
/**
 * Converts the given color value from linear-sRGB to sRGB color space.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The linear-sRGB color.
 * @return {Node<vec3>} The sRGB color.
 */
export const sRGBTransferOETF: any;
/**
 * Helper function to create a SampleNode wrapped as a node object.
 *
 * @function
 * @param {Function} callback - The function to be called when sampling. Should accept a UV node and return a value.
 * @param {?Node<vec2>} [uv=null] - The UV node to be used in the texture sampling.
 * @returns {SampleNode} The created SampleNode instance wrapped as a node object.
 */
export function sample(callback: Function, uv?: Node<any> | null): SampleNode;
/**
 * Converts a texture or texture node to a sampler.
 *
 * @tsl
 * @function
 * @param {TextureNode|Texture} value - The texture or texture node to convert.
 * @returns {Node}
 */
export function sampler(value: TextureNode | Texture): Node;
/**
 * Converts a texture or texture node to a sampler comparison.
 *
 * @tsl
 * @function
 * @param {TextureNode|Texture} value - The texture or texture node to convert.
 * @returns {Node}
 */
export function samplerComparison(value: TextureNode | Texture): Node;
/**
 * Constrains a value between `0` and `1`.
 *
 * @tsl
 * @function
 * @param {Node | number} value - The value to constrain.
 * @returns {Node}
 */
export function saturate(value: Node | number): Node;
export function saturation(): void;
/**
 * TSL object that represents the current `x`/`y` pixel position on the screen in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const screenCoordinate: ScreenNode<any>;
/**
 * TSL object that represents the current DPR.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const screenDPR: UniformNode<any>;
/**
 * TSL object that represents the screen resolution in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const screenSize: ScreenNode<any>;
/**
 * TSL object that represents normalized screen coordinates, unitless in `[0, 1]`.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const screenUV: ScreenNode<any>;
/**
 * TSL function for creating a conditional node.
 *
 * @tsl
 * @function
 * @param {Node} condNode - The node that defines the condition.
 * @param {Node} ifNode - The node that is evaluate when the condition ends up `true`.
 * @param {?Node} [elseNode=null] - The node that is evaluate when the condition ends up `false`.
 * @returns {ConditionalNode}
 */
export const select: any;
export function setCurrentStack(stack: any): void;
/**
 * TSL function for defining a name for the context value for a given node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node whose context should be modified.
 * @param {string} name - The name to set.
 * @returns {ContextNode}
 */
export function setName(node: Node, name: string): ContextNode;
export const shaderStages: string[];
/**
 * TSL function for creating an instance of `ShadowNode`.
 *
 * @tsl
 * @function
 * @param {Light} light - The shadow casting light.
 * @param {?LightShadow} [shadow] - The light shadow.
 * @return {ShadowNode} The created shadow node.
 */
export function shadow(light: Light, shadow?: LightShadow | null): ShadowNode;
/**
 * TSL object that represents the vertex position in world space during the shadow pass.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const shadowPositionWorld: Node<any>;
export function shapeCircle(): void;
/**
 * TSL function for creating a shared uniform group node with the given name and order.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the uniform group node.
 * @param {number} [order=0] - Influences the internal sorting.
 * @returns {UniformGroupNode}
 */
export function sharedUniformGroup(name: string, order?: number, updateType?: null): UniformGroupNode;
/**
 * TSL object that represents the shader variable `Sheen`.
 *
 * @tsl
 * @type {PropertyNode<vec3>}
 */
export const sheen: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `SheenRoughness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const sheenRoughness: PropertyNode<any>;
/**
 * Shifts a node to the left.
 *
 * @tsl
 * @function
 * @param {Node} a - The node to shift.
 * @param {Node} b - The value to shift.
 * @returns {OperatorNode}
 */
export const shiftLeft: any;
/**
 * Shifts a node to the right.
 *
 * @tsl
 * @function
 * @param {Node} a - The node to shift.
 * @param {Node} b - The value to shift.
 * @returns {OperatorNode}
 */
export const shiftRight: any;
/**
 * TSL object that represents the shader variable `Shininess`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const shininess: PropertyNode<any>;
/**
 * Extracts the sign of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sign: any;
/**
 * Returns the sine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sin: any;
/**
 * A phase shifted sinus curve that starts at zero and ends at zero, with bouncing behavior.
 * Reference: {@link https://iquilezles.org/articles/functions/}.
 *
 * @tsl
 * @function
 * @param {Node<float>} x - The value to compute the sin for.
 * @param {Node<float>} k - Controls the amount of bounces.
 * @return {Node<float>} The result value.
 */
export function sinc(x: Node<any>, k: Node<any>): Node<any>;
/**
 * Returns the hyperbolic sine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sinh: any;
export function skinning(): void;
/**
 * Performs a Hermite interpolation between two values.
 *
 * @tsl
 * @function
 * @param {Node | number} low - The value of the lower edge of the Hermite function.
 * @param {Node | number} high - The value of the upper edge of the Hermite function.
 * @param {Node | number} x - The source value for interpolation.
 * @returns {Node}
 */
export const smoothstep: any;
/**
 * Alias for `smoothstep()` with a different parameter order.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The source value for interpolation.
 * @param {Node | number} low - The value of the lower edge of the Hermite function.
 * @param {Node | number} high - The value of the upper edge of the Hermite function.
 * @returns {Node}
 */
export function smoothstepElement(x: Node | number, low: Node | number, high: Node | number): Node;
/**
 * TSL object that represents the shader variable `SpecularColor`.
 *
 * @tsl
 * @type {PropertyNode<color>}
 */
export const specularColor: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `SpecularColorBlended`.
 *
 * @tsl
 * @type {PropertyNode<color>}
 */
export const specularColorBlended: PropertyNode<any>;
/**
 * TSL object that represents the shader variable `SpecularF90`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const specularF90: PropertyNode<any>;
export function spherizeUV(): void;
export function split(node: any, channels: any): SplitNode;
export function spritesheetUV(): void;
/**
 * Returns the square root of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sqrt: any;
/**
 * TSL function for creating a stack node.
 *
 * @tsl
 * @function
 * @param {?StackNode} [parent=null] - The parent stack node.
 * @returns {StackNode}
 */
export const stack: any;
/**
 * Generate a step function by comparing two values.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The y parameter.
 * @param {Node | number} y - The x parameter.
 * @returns {Node}
 */
export const step: any;
/**
 * Alias for `step()` with a different parameter order.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The source value for interpolation.
 * @param {Node | number} edge - The edge value.
 * @returns {Node}
 */
export function stepElement(x: Node | number, edge: Node | number): Node;
/**
 * TSL function for creating a storage buffer node.
 *
 * @tsl
 * @function
 * @param {StorageBufferAttribute|StorageInstancedBufferAttribute|BufferAttribute} value - The buffer data.
 * @param {?(string|Struct)} [type=null] - The buffer type (e.g. `'vec3'`).
 * @param {number} [count=0] - The buffer count.
 * @returns {StorageBufferNode}
 */
export function storage(value: StorageBufferAttribute | StorageInstancedBufferAttribute | BufferAttribute, type?: (string | Struct) | null, count?: number): StorageBufferNode;
/**
 * TSL function for creating a storage barrier. All invocations must
 * wait for each access to variables within the 'storage' address space
 * to complete before the barrier can be passed.
 *
 * @tsl
 * @function
 * @returns {BarrierNode}
 */
export function storageBarrier(): BarrierNode;
/**
 * TSL function for creating a storage element node.
 *
 * @tsl
 * @function
 * @param {StorageBufferNode} storageBufferNode - The storage buffer node.
 * @param {Node} indexNode - The index node that defines the element access.
 * @returns {StorageArrayElementNode}
 */
export const storageElement: any;
/**
 * TSL function for creating a storage texture node.
 *
 * @tsl
 * @function
 * @param {StorageTexture} value - The storage texture.
 * @param {?Node<vec2|vec3>} uvNode - The uv node.
 * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
 * @returns {StorageTextureNode}
 */
export const storageTexture: any;
/**
 * TSL function for creating a 3D storage texture node.
 *
 * @tsl
 * @function
 * @param {Storage3DTexture} value - The 3D storage texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
 * @returns {StorageTexture3DNode}
 */
export const storageTexture3D: any;
/**
 * TSL function for creating a struct node.
 *
 * @tsl
 * @function
 * @param {Object} membersLayout - The layout of the struct members.
 * @param {?string} [name=null] - The name of the struct.
 * @returns {Function} The struct function.
 */
export function struct(membersLayout: Object, name?: string | null): Function;
/**
 * Returns the subtraction of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const sub: any;
/**
 * Creates a new sub-build node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node to be built in the sub-build.
 * @param {string} name - The name of the sub-build.
 * @param {?string} [type=null] - The type of the node, if known.
 * @returns {Node} A node object wrapping the SubBuildNode instance.
 */
export function subBuild(node: Node, name: string, type?: string | null): Node;
/**
 * A reduction that adds e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The accumulated result of the reduction operation.
 */
export const subgroupAdd: any;
/**
 * Returns true if e is true for all active invocations in the subgroup.
 *
 * @tsl
 * @method
 * @param {boolean} e - The predicate provided by the current invocation.
 * @return {bool} The result of the computation.
 */
export const subgroupAll: any;
/**
 * A reduction that performs a bitwise and of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupAnd: any;
/**
 * Returns true if e is true for any active invocation in the subgroup
 *
 * @tsl
 * @method
 * @param {boolean} e - The predicate provided by the current invocation.
 * @return {bool} The result of the computation.
 */
export const subgroupAny: any;
/**
 * Returns a set of bitfields where the bit corresponding to subgroup_invocation_id
 * is 1 if pred is true for that active invocation and 0 otherwise.
 *
 * @tsl
 * @method
 * @param {bool} pred - A boolean that sets the bit corresponding to the invocations subgroup invocation id.
 * @return {vec4<u32>}- A bitfield corresponding to the pred value of each subgroup invocation.
 */
export const subgroupBallot: any;
/**
 * Broadcasts e from the invocation whose subgroup_invocation_id matches id, to all active invocations.
 *
 * @tsl
 * @method
 * @param {number} e - The value to broadcast from subgroup invocation 'id'.
 * @param {number} id - The subgroup invocation to broadcast from.
 * @return {number} The broadcast value.
 */
export const subgroupBroadcast: any;
/**
 * Broadcasts e from the active invocation with the lowest subgroup_invocation_id in the subgroup to all other active invocations.
 *
 * @tsl
 * @method
 * @param {number} e - The value to broadcast from the lowest subgroup invocation.
 * @return {number} The broadcast value.
 */
export const subgroupBroadcastFirst: any;
/**
 * Returns true if this invocation has the lowest subgroup_invocation_id
 * among active invocations in the subgroup.
 *
 * @tsl
 * @method
 * @return {bool} The result of the computation.
 */
export const subgroupElect: any;
/**
 * An exclusive scan that returns the sum of e for all active invocations with subgroup_invocation_id less than this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the exclusive scan by the current invocation.
 * @return {number} The accumulated result of the exclusive scan operation.
 */
export const subgroupExclusiveAdd: any;
/**
 * An exclusive scan that returns the product of e for all active invocations with subgroup_invocation_id less than this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the exclusive scan by the current invocation.
 * @return {number} The accumulated result of the exclusive scan operation.
 */
export const subgroupExclusiveMul: any;
/**
 * An inclusive scan returning the sum of e for all active invocations with subgroup_invocation_id less than or equal to this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the inclusive scan by the current invocation.
 * @return {number} The accumulated result of the inclusive scan operation.
 */
export const subgroupInclusiveAdd: any;
/**
 * An inclusive scan returning the product of e for all active invocations with subgroup_invocation_id less than or equal to this invocation.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the inclusive scan by the current invocation.
 * @return {number} The accumulated result of the inclusive scan operation.
 */
export const subgroupInclusiveMul: any;
/**
 * TSL object that represents the index of the subgroup the current compute invocation belongs to.
 * Subgroup indices are local to the workgroups to which they belong.
 *
 * ```js
 * // Execute 12 compute threads with a workgroup size of 9. Example assumes a subgroup size of 3.
 * const computeFn = Fn( () => {
 *
 * 	storageBufferOne.element( instanceIndex ).assign( subgroupIndex );
 * 	storageBufferTwo.element( instanceIndex ).assign( workgroupId.x );
 *
 * } )().compute( 12, [ 9 ] );
 *
 * // instanceIndex =  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
 * // Buffer One ( Subgroup Index ) =  [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0 ];
 * // Buffer Two ( Workgroup ID )   =  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ];
 * ```
 *
 * @tsl
 * @type {IndexNode}
 */
export const subgroupIndex: IndexNode;
/**
 * A reduction that performs a max of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupMax: any;
/**
 * A reduction that performs a min of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupMin: any;
/**
 * A reduction that multiplies e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The accumulated result of the reduction operation.
 */
export const subgroupMul: any;
/**
 * A reduction that performs a bitwise or of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupOr: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches id
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} id - The subgroup invocation which returns the value v.
 * @return {number} The broadcast value.
 */
export const subgroupShuffle: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches subgroup_invocation_id + delta
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} delta - A value that offsets the current subgroup invocation.
 * @return {number} The broadcast value.
 */
export const subgroupShuffleDown: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches subgroup_invocation_id - delta
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} delta - A value that offsets the current in.
 * @return {number} The broadcast value.
 */
export const subgroupShuffleUp: any;
/**
 * Returns v from the active invocation whose subgroup_invocation_id matches subgroup_invocation_id ^ mask.
 *
 * @tsl
 * @method
 * @param {number} v - The value to return from subgroup invocation id^mask.
 * @param {number} mask - A bitmask that determines the target invocation via a XOR operation.
 * @return {number} The broadcast value.
 */
export const subgroupShuffleXor: any;
/**
 * A device dependent variable that exposes the size of the current invocation's subgroup.
 *
 * @tsl
 * @type {ComputeBuiltinNode<uint>}
 */
export const subgroupSize: ComputeBuiltinNode<any>;
/**
 * A reduction that performs a bitwise xor of e among all active invocations and returns that result.
 *
 * @tsl
 * @method
 * @param {number} e - The value provided to the reduction by the current invocation.
 * @return {number} The result of the reduction operation.
 */
export const subgroupXor: any;
/**
 * Returns the tangent of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const tan: any;
/**
 * TSL object that represents the tangent attribute of the current rendered object.
 *
 * @tsl
 * @type {Node<vec4>}
 */
export const tangentGeometry: Node<any>;
/**
 * TSL object that represents the vertex tangent in local space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const tangentLocal: Node<any>;
/**
 * TSL object that represents the vertex tangent in view space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const tangentView: Node<any>;
/**
 * Tangent vector in view space, computed dynamically from geometry and UV derivatives.
 * Useful for normal mapping without precomputed tangents.
 *
 * Reference: http://www.thetenthplanet.de/archives/1180
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const tangentViewFrame: Node<any>;
/**
 * TSL object that represents the vertex tangent in world space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const tangentWorld: Node<any>;
/**
 * Returns the hyperbolic tangent of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const tanh: any;
/**
 * TSL function for creating a texture node or sample a texture node already existing.
 *
 * @tsl
 * @function
 * @param {?(Texture|TextureNode)} [value=EmptyTexture] - The texture.
 * @param {?Node<vec2|vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @param {?Node<float>} [biasNode=null] - The bias node.
 * @returns {TextureNode}
 */
export function texture(value?: (Texture | TextureNode) | null, uvNode?: Node<any | any> | null, levelNode?: Node<any> | null, biasNode?: Node<any> | null): TextureNode;
/**
 * TSL function for creating a 3D texture node.
 *
 * @tsl
 * @function
 * @param {Data3DTexture} value - The 3D texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @returns {Texture3DNode}
 */
export const texture3D: any;
/**
 * TSL function for creating a texture node that fetches/loads texels without interpolation.
 *
 * @tsl
 * @function
 * @param {?(Texture|TextureNode)} [value=EmptyTexture] - The texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @returns {TextureNode}
 */
export function texture3DLevel(value?: (Texture | TextureNode) | null, uvNode?: Node<any> | null, levelNode?: Node<any> | null): TextureNode;
/**
 * TSL function for creating a texture node that fetches/loads texels without interpolation.
 *
 * @tsl
 * @function
 * @param {?(Texture|TextureNode)} [value=EmptyTexture] - The texture.
 * @param {?Node<vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @param {?Node<float>} [biasNode=null] - The bias node.
 * @returns {TextureNode}
 */
export function texture3DLoad(...params: any[]): TextureNode;
/**
 * TSL function for creating a texture barrier. All invocations must
 * wait for each access to variables within the 'texture' address space
 * to complete before the barrier can be passed.
 *
 * @tsl
 * @function
 * @returns {BarrierNode}
 */
export function textureBarrier(): BarrierNode;
export function textureBicubic(): void;
export function textureBicubicLevel(): void;
export function textureLevel(value: any, uv: any, level: any): TextureNode;
/**
 * TSL function for creating a texture node that fetches/loads texels without interpolation.
 *
 * @tsl
 * @function
 * @param {?(Texture|TextureNode)} [value=EmptyTexture] - The texture.
 * @param {?Node<vec2|vec3>} [uvNode=null] - The uv node.
 * @param {?Node<int>} [levelNode=null] - The level node.
 * @param {?Node<float>} [biasNode=null] - The bias node.
 * @returns {TextureNode}
 */
export function textureLoad(...params: any[]): TextureNode;
/**
 * TSL function for creating a texture size node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - A texture node which size should be retrieved.
 * @param {?Node<int>} [levelNode=null] - A level node which defines the requested mip.
 * @returns {TextureSizeNode}
 */
export const textureSize: any;
/**
 * TSL function for storing a value in a storage texture.
 *
 * Unlike {@link storageTexture}, this function also accepts an existing storage
 * texture node and is intended for performing the store operation itself.
 *
 * @tsl
 * @function
 * @param {StorageTexture|StorageTextureNode} value - The storage texture or storage texture node.
 * @param {Node<vec2|vec3>} uvNode - The uv node.
 * @param {?Node} [storeNode=null] - The value node that should be stored in the texture.
 * @returns {StorageTextureNode}
 */
export function textureStore(value: StorageTexture | StorageTextureNode, uvNode: Node<any | any>, storeNode?: Node | null): StorageTextureNode;
/**
 * TSL object that represents the shader variable `Thickness`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const thickness: PropertyNode<any>;
/**
 * Represents the elapsed time in seconds.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const time: UniformNode<any>;
/**
 * TSL function for creating a tone mapping node.
 *
 * @tsl
 * @function
 * @param {number} mapping - The tone mapping type.
 * @param {Node<float> | number} exposure - The tone mapping exposure.
 * @param {Node<vec3> | Color} color - The color node to process.
 * @returns {ToneMappingNode<vec3>}
 */
export function toneMapping(mapping: number, exposure: Node<any> | number, color: Node<any> | Color): ToneMappingNode<any>;
/**
 * TSL object that represents the global tone mapping exposure of the renderer.
 *
 * @tsl
 * @type {RendererReferenceNode<vec3>}
 */
export const toneMappingExposure: RendererReferenceNode<any>;
/**
 * TSL function for creating a toon outline pass node.
 *
 * @tsl
 * @function
 * @param {Scene} scene - A reference to the scene.
 * @param {Camera} camera - A reference to the camera.
 * @param {Color} color - Defines the outline's color.
 * @param {number} [thickness=0.003] - Defines the outline's thickness.
 * @param {number} [alpha=1] - Defines the outline's alpha.
 * @returns {ToonOutlinePassNode}
 */
export function toonOutlinePass(scene: Scene, camera: Camera, color?: Color, thickness?: number, alpha?: number): ToonOutlinePassNode;
/**
 * Transforms the direction of a vector by a matrix and then normalizes the result.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} direction - The direction vector.
 * @param {Node<mat2|mat3|mat4>} matrix - The transformation matrix.
 * @returns {Node}
 */
export const transformDirection: any;
export function transformNormal(): void;
/**
 * Transforms a normal vector by the inverse of the view matrix and then normalizes the result.
 *
 * The upper-left 3x3 of the view matrix is assumed to be orthonormal, so post-multiplying
 * by the view matrix is equivalent to pre-multiplying by its inverse.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal vector, given in view space.
 * @param {Node<mat3|mat4>} viewMatrix - The view matrix.
 * @returns {Node<vec3>} The normal vector in world space.
 */
export function transformNormalByInverseViewMatrix(normal: Node<any>, viewMatrix: Node<any | any>): Node<any>;
/**
 * Transforms a normal vector by the view matrix and then normalizes the result.
 *
 * The upper-left 3x3 of the view matrix is assumed to be orthonormal, so the
 * normal can be transformed directly without involving the normal matrix.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal vector, given in world space.
 * @param {Node<mat3|mat4>} viewMatrix - The view matrix.
 * @returns {Node<vec3>} The normal vector in view space.
 */
export function transformNormalByViewMatrix(normal: Node<any>, viewMatrix: Node<any | any>): Node<any>;
export function transformNormalToView(): void;
/**
 * TSL object that represents the shader variable `Transmission`.
 *
 * @tsl
 * @type {PropertyNode<float>}
 */
export const transmission: PropertyNode<any>;
/**
 * Returns the transpose of a matrix.
 *
 * @tsl
 * @function
 * @param {Node<mat2|mat3|mat4>} x - The parameter.
 * @returns {Node}
 */
export const transpose: any;
/**
 * Generates a noise value from the given position, speed and time parameters.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} position - The position.
 * @param {Node<float>} speed - The speed.
 * @param {Node<float>} time - The time.
 * @return {Node<float>} The generated noise.
 */
export const triNoise3D: any;
/**
 * TSL function for creating a triplanar textures node.
 *
 * @tsl
 * @function
 * @param {Node} textureXNode - First texture node.
 * @param {?Node} [textureYNode=null] - Second texture node. When not set, the shader will sample from `textureXNode` instead.
 * @param {?Node} [textureZNode=null] - Third texture node. When not set, the shader will sample from `textureXNode` instead.
 * @param {?Node<float>} [scaleNode=float(1)] - The scale node.
 * @param {?Node<vec3>} [positionNode=positionLocal] - Vertex positions in local space.
 * @param {?Node<vec3>} [normalNode=normalLocal] - Normals in local space.
 * @returns {Node<vec4>}
 */
export function triplanarTexture(...params: any[]): Node<any>;
export function triplanarTextures(): void;
/**
 * Truncates the parameter, removing the fractional part.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const trunc: any;
export const uint: any;
/**
 * Bitcast an unsigned integer or a vector of unsigned integers to a corresponding float type with the same element size.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The unsigned integer or vector of unsigned integers to bitcast.
 * @returns {BitcastNode}
 */
export function uintBitsToFloat(value: Node<any>): BitcastNode;
/**
 * TSL function for creating a uniform node.
 *
 * @tsl
 * @function
 * @param {any|string} value - The value of this uniform or your type. Usually a JS primitive or three.js object (vector, matrix, color, texture).
 * @param {string} [type] - The node type. If no explicit type is defined, the node tries to derive the type from its value.
 * @returns {UniformNode}
 */
export function uniform(value: any | string, type?: string): UniformNode;
/**
 * TSL function for creating an uniform array node.
 *
 * @tsl
 * @function
 * @param {Array<any>} values - Array-like data.
 * @param {?string} [nodeType] - The data type of the array elements.
 * @returns {UniformArrayNode}
 */
export function uniformArray(values: Array<any>, nodeType?: string | null): UniformArrayNode;
/**
 * TSL function for creating a non-mergeable uniform cube texture node.
 *
 * @tsl
 * @function
 * @param {?CubeTexture} [value=EmptyTexture] - The cube texture.
 * @returns {CubeTextureNode}
 */
export function uniformCubeTexture(value?: CubeTexture | null): CubeTextureNode;
/**
 * TSL function for defining a uniformFlow context value for a given node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node whose dependencies should all execute within a uniform control-flow path.
 * @returns {ContextNode}
 */
export function uniformFlow(node: Node): ContextNode;
/**
 * TSL function for creating a uniform group node with the given name.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the uniform group node.
 * @returns {UniformGroupNode}
 */
export function uniformGroup(name: string, order?: number, updateType?: null): UniformGroupNode;
/**
 * TSL function for creating a non-mergeable uniform texture node.
 *
 * @tsl
 * @function
 * @param {?Texture} value - The texture.
 * @returns {TextureNode}
 */
export function uniformTexture(value?: Texture | null): TextureNode;
/**
 * Unpacks a `uint` into four sign-extended signed 8-bit integer components.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The packed value.
 * @returns {Node<ivec4>} The unpacked signed integer vector.
 */
export const unpack4xI8: any;
/**
 * Unpacks a `uint` into four zero-extended unsigned 8-bit integer components.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The packed value.
 * @returns {Node<uvec4>} The unpacked unsigned integer vector.
 */
export const unpack4xU8: any;
/**
 * Unpacks a 32-bit unsigned integer into two 16-bit values, interpreted as 16-bit floating-point numbers. Returns a vec2 with both values.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The unsigned integer to be unpacked
 * @returns {Node}
 */
export const unpackHalf2x16: any;
/**
 * Unpacks a tangent space normal, reconstructing the Z component by projecting the X,Y coordinates onto the hemisphere.
 * The X,Y coordinates are expected to be in the [-1, 1] range.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} xy - The X,Y coordinates of the normal.
 * @return {Node<vec3>} The resulting normal.
 */
export function unpackNormal(xy: Node<any>): Node<any>;
/**
 * Unpacks a color value into a normal vector.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} node - The color to unpack.
 * @return {Node<vec3>} The direction.
 */
export function unpackRGBToNormal(node: Node<any>): Node<any>;
/**
 * Unpacks a 32-bit unsigned integer into two 16-bit values, interpreted as normalized signed integers. Returns a vec2 with both values.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The unsigned integer to be unpacked
 * @returns {Node}
 */
export const unpackSnorm2x16: any;
/**
 * Unpacks a 32-bit unsigned integer into four 8-bit values, interpreted as normalized signed integers. Returns a vec4 with all values.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The unsigned integer to be unpacked
 * @returns {Node}
 */
export const unpackSnorm4x8: any;
/**
 * Unpacks a 32-bit unsigned integer into two 16-bit values, interpreted as normalized unsigned integers. Returns a vec2 with both values.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The unsigned integer to be unpacked
 * @returns {Node}
 */
export const unpackUnorm2x16: any;
/**
 * Unpacks a 32-bit unsigned integer into four 8-bit values, interpreted as normalized unsigned integers. Returns a vec4 with all values.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The unsigned integer to be unpacked
 * @returns {Node}
 */
export const unpackUnorm4x8: any;
export function unpremultiplyAlpha(): void;
/**
 * TSL function for creating a user data node.
 *
 * @tsl
 * @function
 * @param {string} name - The property name that should be referenced by the node.
 * @param {string} inputType - The node data type of the reference.
 * @param {?Object} userData - A reference to the `userData` object. If not provided, the `userData` property of the 3D object that uses the node material is evaluated.
 * @returns {UserDataNode}
 */
export function userData(name: string, inputType: string, userData: Object | null): UserDataNode;
/**
 * TSL function for creating an uv attribute node with the given index.
 *
 * @tsl
 * @function
 * @param {number} [index=0] - The uv index.
 * @return {AttributeNode<vec2>} The uv attribute node.
 */
declare function uv$1(index?: number): AttributeNode<any>;
export const uvec2: any;
export const uvec3: any;
export const uvec4: any;
/**
 * TSL function for creating a varying node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node for which a varying should be created.
 * @param {?string} name - The name of the varying in the shader.
 * @returns {VaryingNode}
 */
export const varying: any;
/**
 * TSL function for creating a varying property node.
 *
 * @tsl
 * @function
 * @param {string} type - The type of the node.
 * @param {?string} [name=null] - The name of the varying in the shader.
 * @param {?Node} [placeholderNode=null] - The placeholder node if not assigned.
 * @returns {PropertyNode}
 */
export function varyingProperty(type: string, name?: string | null, placeholderNode?: Node | null): PropertyNode;
export const vec2: any;
export const vec3: any;
export const vec4: any;
export const vectorComponents: string[];
/**
 * TSL object that represents the velocity of a render pass.
 *
 * @tsl
 * @type {VelocityNode}
 */
export const velocity: VelocityNode;
/**
 * TSL function for creating a reference node.
 *
 * @tsl
 * @function
 * @param {number} [index=0] - The attribute index.
 * @returns {VertexColorNode}
 */
export function vertexColor(index?: number): VertexColorNode;
/**
 * TSL object that represents the index of a vertex within a mesh.
 *
 * @tsl
 * @type {IndexNode}
 */
export const vertexIndex: IndexNode;
/**
 * Computes a node in the vertex stage.
 *
 * @tsl
 * @function
 * @param {Node} node - The node which should be executed in the vertex stage.
 * @returns {VaryingNode}
 */
export function vertexStage(node: Node): VaryingNode;
export function vibrance(): void;
/**
 * TSL function for converting a viewZ value to a logarithmic depth value.
 *
 * @tsl
 * @function
 * @param {Node<float>} viewZ - The viewZ node.
 * @param {Node<float>} near - The camera's near value.
 * @param {Node<float>} far - The camera's far value.
 * @returns {Node<float>}
 */
export function viewZToLogarithmicDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * TSL function for converting a viewZ value to an orthographic depth value.
 *
 * @tsl
 * @function
 * @param {Node<float>} viewZ - The viewZ node.
 * @param {Node<float>} near - The camera's near value.
 * @param {Node<float>} far - The camera's far value.
 * @returns {Node<float>}
 */
export function viewZToOrthographicDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * TSL function for converting a viewZ value to a perspective depth value.
 *
 * Note: {link https://twitter.com/gonnavis/status/1377183786949959682}.
 *
 * @tsl
 * @function
 * @param {Node<float>} viewZ - The viewZ node.
 * @param {Node<float>} near - The camera's near value.
 * @param {Node<float>} far - The camera's far value.
 * @returns {Node<float>}
 */
export function viewZToPerspectiveDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * TSL function for converting a viewZ value to a reversed orthographic depth value.
 *
 * @tsl
 * @function
 * @param {Node<float>} viewZ - The viewZ node.
 * @param {Node<float>} near - The camera's near value.
 * @param {Node<float>} far - The camera's far value.
 * @returns {Node<float>}
 */
export function viewZToReversedOrthographicDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * TSL function for converting a viewZ value to a reversed perspective depth value.
 *
 * @tsl
 * @function
 * @param {Node<float>} viewZ - The viewZ node.
 * @param {Node<float>} near - The camera's near value.
 * @param {Node<float>} far - The camera's far value.
 * @returns {Node<float>}
 */
export function viewZToReversedPerspectiveDepth(viewZ: Node<any>, near: Node<any>, far: Node<any>): Node<any>;
/**
 * TSL object that represents the viewport rectangle as `x`, `y`, `width` and `height` in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec4>}
 */
export const viewport: ScreenNode<any>;
/**
 * TSL object that represents the current `x`/`y` pixel position on the viewport in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const viewportCoordinate: ScreenNode<any>;
/**
 * TSL function for a viewport depth texture node.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @param {?DepthTexture} [depthTexture=null] - A depth texture. If not provided, a depth texture is created automatically.
 * @returns {ViewportDepthTextureNode}
 */
export const viewportDepthTexture: any;
/**
 * TSL object that represents the linear (orthographic) depth value of the current fragment
 *
 * @tsl
 * @type {ViewportDepthNode}
 */
export const viewportLinearDepth: ViewportDepthNode;
/**
 * TSL function for creating a viewport texture node with enabled mipmap generation.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
 * @returns {ViewportTextureNode}
 */
export const viewportMipTexture: any;
/**
 * TSL function for creating a viewport texture node with enabled mipmap generation.
 * The texture should only contain the opaque rendering objects.
 *
 * This should be used just in transparent or transmissive materials.
 *
 * @tsl
 * @function
 * @param {?Node} [uv=screenUV] - The uv node.
 * @param {?Node} [level=null] - The level node.
 * @returns {ViewportTextureNode}
 */
export function viewportOpaqueMipTexture(uv?: Node | null, level?: Node | null): ViewportTextureNode;
export function viewportSafeUV(): void;
/**
 * TSL function for creating a shared viewport texture node.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @returns {ViewportSharedTextureNode}
 */
export const viewportSharedTexture: any;
/**
 * TSL object that represents the viewport resolution in physical pixel units.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const viewportSize: ScreenNode<any>;
/**
 * TSL function for creating a viewport texture node.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
 * @returns {ViewportTextureNode}
 */
export const viewportTexture: any;
/**
 * TSL object that represents normalized viewport coordinates, unitless in `[0, 1]`.
 *
 * @tsl
 * @type {ScreenNode<vec2>}
 */
export const viewportUV: ScreenNode<any>;
/**
 * Vogel disk sampling for uniform circular distribution.
 *
 * This function generates sample points distributed uniformly on a disk using the golden angle,
 * resulting in an efficient low-discrepancy sequence for sampling. The rotation parameter (phi)
 * allows randomizing the pattern per-pixel when combined with IGN.
 *
 * @tsl
 * @function
 * @param {Node<int>} sampleIndex - The index of the current sample (0-based).
 * @param {Node<int>} samplesCount - The total number of samples.
 * @param {Node<float>} phi - Rotation angle in radians (typically from IGN * 2π).
 * @return {Node<vec2>} A 2D point on the unit disk.
 */
export const vogelDiskSample: any;
/**
 * TSL function for creating a WGSL code node.
 *
 * @tsl
 * @function
 * @param {string} src - The native code.
 * @param {Array<Node>} includes - An array of includes.
 * @returns {CodeNode}
 */
export function wgsl(src: string, includes: Array<Node>): CodeNode;
export function wgslFn(code: any, includes: any): any;
/**
 * TSL function for creating a workgroup info node.
 * Creates a new 'workgroup' scoped array buffer.
 *
 * @tsl
 * @function
 * @param {string} type - The data type of a 'workgroup' scoped buffer element.
 * @param {number} [count=0] - The number of elements in the buffer.
 * @returns {WorkgroupInfoNode}
 */
export function workgroupArray(type: string, count?: number): WorkgroupInfoNode;
/**
 * TSL function for creating a workgroup barrier. All compute shader
 * invocations must wait for each invocation within a workgroup to
 * complete before the barrier can be surpassed.
 *
 * @tsl
 * @function
 * @returns {BarrierNode}
 */
export function workgroupBarrier(): BarrierNode;
/**
 * Represents the 3-dimensional index of the workgroup the current compute invocation belongs to.
 * ```js
 * // Execute 12 compute threads with a workgroup size of 3.
 * const computeFn = Fn( () => {
 *
 * 	If( workgroupId.x.mod( 2 ).equal( 0 ), () => {
 *
 * 		storageBuffer.element( instanceIndex ).assign( instanceIndex );
 *
 * 	} ).Else( () => {
 *
 * 		storageBuffer.element( instanceIndex ).assign( 0 );
 *
 * 	} );
 *
 * } )().compute( 12, [ 3 ] );
 *
 * // workgroupId.x =  [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
 * // Buffer Output =  [0, 1, 2, 0, 0, 0, 6, 7, 8, 0, 0, 0];
 * ```
 *
 * @tsl
 * @type {ComputeBuiltinNode<uvec3>}
 */
export const workgroupId: ComputeBuiltinNode<any>;
/**
 * TSL function for converting a given color node from the current working color space to the given color space.
 *
 * @tsl
 * @function
 * @param {Node} node - Represents the node to convert.
 * @param {string} targetColorSpace - The target color space.
 * @returns {ColorSpaceNode}
 */
export function workingToColorSpace(node: Node, targetColorSpace: string): ColorSpaceNode;
/**
 * Performs logical XOR on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const xor: any;
import { Color } from './three.core.js';
import { BufferAttribute } from './three.core.js';
import { InterleavedBuffer } from './three.core.js';
import { Vector4 } from './three.core.js';
import { RenderTarget } from './three.core.js';
import { CubeTexture } from './three.core.js';
import { EventDispatcher } from './three.core.js';
import { Material } from './three.core.js';
import { Texture } from './three.core.js';
import { Object3D } from './three.core.js';
import { BufferGeometry } from './three.core.js';
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
declare function isArrayAsParameter(params: any): any;
import { CubeCamera } from './three.core.js';
import { Mesh } from './three.core.js';
import { Scene } from './three.core.js';
import { Vector3 } from './three.core.js';
import { OrthographicCamera } from './three.core.js';
/**
 * Holds the actual implementation of the reflector (virtual cameras, render
 * targets and the reflection rendering).
 *
 * This logic is kept separate from {@link ReflectorNode} because the latter is
 * a {@link TextureNode} representing a single texture view. A reflector can be
 * sampled by multiple texture nodes at once - e.g. one for color and one for
 * depth (see {@link ReflectorNode#getDepthNode}) - which all reference the same
 * base node so the reflection is rendered only once.
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
import { DepthTexture } from './three.core.js';
declare class ShaderCallNodeInternal extends Node {
    constructor(shaderNode: any, rawInputs: any);
    shaderNode: any;
    rawInputs: any;
    isShaderCallNodeInternal: boolean;
    isCacheable(builder: any): boolean;
    generateNodeType(builder: any): any;
    getElementType(builder: any): any;
    getMemberType(builder: any, name: any): any;
    call(builder: any): any;
    setupOutput(builder: any): any;
    getOutputNode(builder: any): any;
    build(builder: any, output?: null): any;
}
import { InstancedBufferAttribute } from './three.core.js';
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
import { Matrix4 } from './three.core.js';
import { FramebufferTexture } from './three.core.js';
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
export { max$1 as max, min$1 as min, uv$1 as uv };
