import { EventDispatcher } from "../../core/EventDispatcher.js";
import { NodeUpdateType } from "./constants.js";
import NodeBuilder from "./NodeBuilder.js";
import NodeFrame from "./NodeFrame.js";
interface NodeJSONMeta {
    textures: {
        [key: string]: unknown;
    };
    images: {
        [key: string]: unknown;
    };
    nodes: {
        [key: string]: NodeJSONIntermediateOutputData;
    };
}
interface NodeJSONMetadata {
    version: number;
    type: "Node";
    generator: "Node.toJSON";
}
interface NodeJSONInputNodes {
    [property: string]:
        | string[]
        | {
            [index: string]: string | undefined;
        }
        | string
        | undefined;
}
export interface NodeJSONInputData {
    inputNodes?: NodeJSONInputNodes | undefined;
    meta: {
        textures: {
            [key: string]: unknown;
        };
        nodes: {
            [key: string]: Node;
        };
    };
}
export interface NodeJSONIntermediateOutputData {
    uuid: string;
    type: string | undefined;
    meta?: NodeJSONMeta | undefined;
    metadata?: NodeJSONMetadata;
    inputNodes?: NodeJSONInputNodes | undefined;
    textures?: unknown[];
    images?: unknown[];
    nodes?: NodeJSONIntermediateOutputData[];
}
interface NodeJSONOutputData {
    uuid: string;
    type: string | undefined;
    metadata?: NodeJSONMetadata;
    inputNodes?: NodeJSONInputNodes | undefined;
    textures?: unknown[];
    images?: unknown[];
    nodes?: NodeJSONOutputData[];
}
export interface NodeChild {
    property: string;
    index?: number | string;
    childNode: Node;
}
/**
 * Base class for all nodes.
 *
 * @augments EventDispatcher
 */
interface NodeInterface extends
    EventDispatcher<{
        dispose: {};
    }>
{
    nodeType: string | null;
    updateType: NodeUpdateType;
    updateBeforeType: NodeUpdateType;
    updateAfterType: NodeUpdateType;
    uuid: string;
    version: number;
    name: string | null;
    _cacheKey: number | null;
    _cacheKeyVersion: number;
    global: boolean;
    parents: boolean;
    readonly isNode: true;
    readonly id: number;
    self?: this;
    /**
     * Set this property to `true` when the node should be regenerated.
     *
     * @type {boolean}
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
    /**
     * The type of the class. The value is usually the constructor name.
     *
     * @type {string}
     * @readonly
     */
    get type(): string | undefined;
    /**
     * Convenient method for defining {@link Node#update}.
     *
     * @param {Function} callback - The update method.
     * @param {string} updateType - The update type.
     * @return {Node} A reference to this node.
     */
    onUpdate(callback: (this: this, frame: NodeFrame) => unknown, updateType: NodeUpdateType): this;
    /**
     * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
     * this method automatically sets the update type to `FRAME`.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onFrameUpdate(callback: (this: this, frame: NodeFrame) => void): this;
    /**
     * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
     * this method automatically sets the update type to `RENDER`.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onRenderUpdate(callback: (this: this, frame: NodeFrame) => void): this;
    /**
     * Convenient method for defining {@link Node#update}. Similar to {@link Node#onUpdate}, but
     * this method automatically sets the update type to `OBJECT`.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onObjectUpdate(callback: (this: this, frame: NodeFrame) => void): this;
    /**
     * Convenient method for defining {@link Node#updateReference}.
     *
     * @param {Function} callback - The update method.
     * @return {Node} A reference to this node.
     */
    onReference(callback: (this: this, frame: NodeBuilder | NodeFrame) => unknown): this;
    /**
     * Nodes might refer to other objects like materials. This method allows to dynamically update the reference
     * to such objects based on a given state (e.g. the current node frame or builder).
     *
     * @param {any} state - This method can be invocated in different contexts so `state` can refer to any object type.
     * @return {any} The updated reference.
     */
    updateReference(state: NodeBuilder | NodeFrame): unknown;
    /**
     * By default this method returns the value of the {@link Node#global} flag. This method
     * can be overwritten in derived classes if an analytical way is required to determine the
     * global cache referring to the current shader-stage.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether this node is global or not.
     */
    isGlobal(builder: NodeBuilder): boolean;
    /**
     * Generator function that can be used to iterate over the child nodes.
     *
     * @generator
     * @yields {Node} A child node.
     */
    getChildren(): Generator<Node, void, unknown>;
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
    traverse(callback: (node: Node) => void): void;
    /**
     * Returns the child nodes of this node.
     *
     * @private
     * @param {Set<Node>} [ignores=new Set()] - A set of nodes to ignore during the search to avoid circular references.
     * @returns {Array<Object>} An array of objects describing the child nodes.
     */
    _getChildren(ignores?: Set<Node>): NodeChild[];
    /**
     * Returns the cache key for this node.
     *
     * @param {boolean} [force=false] - When set to `true`, a recomputation of the cache key is forced.
     * @param {Set<Node>} [ignores=null] - A set of nodes to ignore during the computation of the cache key.
     * @return {number} The cache key of the node.
     */
    getCacheKey(force?: boolean, ignores?: Set<Node> | null): number;
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
    getScope(): this;
    /**
     * Returns the hash of the node which is used to identify the node. By default it's
     * the {@link Node#uuid} however derived node classes might have to overwrite this method
     * depending on their implementation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * Returns the update type of {@link Node#update}.
     *
     * @return {NodeUpdateType} The update type.
     */
    getUpdateType(): NodeUpdateType;
    /**
     * Returns the update type of {@link Node#updateBefore}.
     *
     * @return {NodeUpdateType} The update type.
     */
    getUpdateBeforeType(): NodeUpdateType;
    /**
     * Returns the update type of {@link Node#updateAfter}.
     *
     * @return {NodeUpdateType} The update type.
     */
    getUpdateAfterType(): NodeUpdateType;
    /**
     * Certain types are composed of multiple elements. For example a `vec3`
     * is composed of three `float` values. This method returns the type of
     * these elements.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The type of the node.
     */
    getElementType(builder: NodeBuilder): "bool" | "int" | "float" | "vec2" | "vec3" | "vec4" | "uint" | null;
    /**
     * Returns the node member type for the given name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The name of the member.
     * @return {string} The type of the node.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    /**
     * Returns the node's type.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The type of the node.
     */
    getNodeType(builder: NodeBuilder): string | null;
    /**
     * This method is used during the build process of a node and ensures
     * equal nodes are not built multiple times but just once. For example if
     * `attribute( 'uv' )` is used multiple times by the user, the build
     * process makes sure to process just the first node.
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
    getArrayCount(builder: NodeBuilder): number | null;
    /**
     * Represents the setup stage which is the first step of the build process, see {@link Node#build} method.
     * This method is often overwritten in derived modules to prepare the node which is used as a node's output/result.
     * If an output node is prepared, then it must be returned in the `return` statement of the derived module's setup function.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {?Node} The output node.
     */
    setup(builder: NodeBuilder): unknown;
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
    generate(builder: NodeBuilder, output?: string | null): string | null | undefined;
    /**
     * The method can be implemented to update the node's internal state before it is used to render an object.
     * The {@link Node#updateBeforeType} property defines how often the update is executed.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
     */
    updateBefore(frame: NodeFrame): void;
    /**
     * The method can be implemented to update the node's internal state after it was used to render an object.
     * The {@link Node#updateAfterType} property defines how often the update is executed.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
     */
    updateAfter(frame: NodeFrame): void;
    /**
     * The method can be implemented to update the node's internal state when it is used to render an object.
     * The {@link Node#updateType} property defines how often the update is executed.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {?boolean} An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).
     */
    update(frame: NodeFrame): void;
    before(node: Node): this;
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
    build(builder: NodeBuilder, output?: string | Node | null): Node | string | null;
    /**
     * Returns the child nodes as a JSON object.
     *
     * @return {Generator<Object>} An iterable list of serialized child objects as JSON.
     */
    getSerializeChildren(): NodeChild[];
    /**
     * Serializes the node to JSON.
     *
     * @param {Object} json - The output JSON object.
     */
    serialize(json: NodeJSONIntermediateOutputData): void;
    /**
     * Deserializes the node from the given JSON.
     *
     * @param {Object} json - The JSON object.
     */
    deserialize(json: NodeJSONInputData): void;
    /**
     * Serializes the node into the three.js JSON Object/Scene format.
     *
     * @param {?Object} meta - An optional JSON object that already holds serialized data from other scene objects.
     * @return {Object} The serialized node.
     */
    toJSON(meta?: NodeJSONMeta | string): NodeJSONOutputData;
}
declare const Node: {
    prototype: Node;
    /**
     * Constructs a new node.
     *
     * @param {?string} nodeType - The node type.
     */
    new<TNodeValue>(nodeType?: string | null): Node<TNodeValue>;
    new(nodeType?: string | null): Node;
    get type(): string;
};
export interface NodeElements {
}
type XY = "x" | "y";
type RG = "r" | "g";
type ST = "s" | "t";
type Vec2Swizzle =
    & {
        [Key in XY | RG | ST]: Node<"float">;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}`]: Node<"vec2">;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}`]: Node<"vec3">;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}`]: Node<"vec4">;
    };
type Ivec2Swizzle =
    & {
        [Key in XY | RG | ST]: Node<"int">;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}`]: Node<"ivec2">;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}`]: Node<"ivec3">;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}`]: Node<"ivec4">;
    };
type Uvec2Swizzle =
    & {
        [Key in XY | RG | ST]: Node<"uint">;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}`]: Node<"uvec2">;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}`]: Node<"uvec3">;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}`]: Node<"uvec4">;
    };
type XYZ = "x" | "y" | "z";
type RGB = "r" | "g" | "b";
type STP = "s" | "t" | "p";
type Vec3Swizzle =
    & {
        [Key in XYZ | RGB | STP]: Node<"float">;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}`]: Node<"vec2">;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}`]: Node<"vec3">;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}${STP}`]: Node<"vec4">;
    };
type Ivec3Swizzle =
    & {
        [Key in XYZ | RGB | STP]: Node<"int">;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}`]: Node<"ivec2">;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}`]: Node<"ivec3">;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}${STP}`]: Node<"ivec4">;
    };
type Uvec3Swizzle =
    & {
        [Key in XYZ | RGB | STP]: Node<"uint">;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}`]: Node<"uvec2">;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}`]: Node<"uvec3">;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}${STP}`]: Node<"uvec4">;
    };
type XYZW = "x" | "y" | "z" | "w";
type RGBA = "r" | "g" | "b" | "a";
type STPQ = "s" | "t" | "p" | "q";
type Vec4Swizzle =
    & {
        [Key in XYZW | RGBA | STPQ]: Node<"float">;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}`]: Node<"vec2">;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}`]: Node<"vec3">;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}${STPQ}`]: Node<
            "vec4"
        >;
    };
type Ivec4Swizzle =
    & {
        [Key in XYZW | RGBA | STPQ]: Node<"int">;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}`]: Node<"ivec2">;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}`]: Node<"ivec3">;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}${STPQ}`]: Node<
            "ivec4"
        >;
    };
type Uvec4Swizzle =
    & {
        [Key in XYZW | RGBA | STPQ]: Node<"uint">;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}`]: Node<"uvec2">;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}`]: Node<"uvec3">;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}${STPQ}`]: Node<
            "uvec4"
        >;
    };
export interface NodeExtensions<TValue> {
}
export interface FloatExtensions {
}
export interface IntExtensions {
}
export interface UintExtensions {
}
export interface NumberExtensions<TNumber extends "float" | "int" | "uint"> {
}
export interface BoolExtensions {
}
export interface VectorExtensions<TValue> {
}
export interface Vector2Extensions {
}
export interface Ivec2Extensions {
}
export interface Uvec2Extensions {
}
export interface Vector3Extensions {
}
export interface Ivec3Extensions {
}
export interface Uvec3Extensions {
}
export interface Vector4Extensions {
}
export interface Ivec4Extensions {
}
export interface Uvec4Extensions {
}
export interface Matrix2Extensions {
}
export interface Matrix3Extensions {
}
export interface Matrix4Extensions {
}
type Node<TValue = unknown> =
    & NodeInterface
    & NodeElements
    & NodeExtensions<TValue>
    & (TValue extends "float" ? FloatExtensions & NumberExtensions<"float">
        : TValue extends "int" ? IntExtensions & NumberExtensions<"int">
        : TValue extends "uint" ? UintExtensions & NumberExtensions<"uint">
        : TValue extends "bool" ? BoolExtensions
        : TValue extends "vec2" ? Vec2Swizzle & VectorExtensions<TValue> & Vector2Extensions
        : TValue extends "ivec2" ? Ivec2Swizzle & VectorExtensions<TValue> & Ivec2Extensions
        : TValue extends "uvec2" ? Uvec2Swizzle & VectorExtensions<TValue> & Uvec2Extensions
        : TValue extends "vec3" ? Vec3Swizzle & VectorExtensions<TValue> & Vector3Extensions
        : TValue extends "ivec3" ? Ivec3Swizzle & VectorExtensions<TValue> & Ivec3Extensions
        : TValue extends "uvec3" ? Uvec3Swizzle & VectorExtensions<TValue> & Uvec3Extensions
        : TValue extends "vec4" ? Vec4Swizzle & VectorExtensions<TValue> & Vector4Extensions
        : TValue extends "ivec4" ? Ivec4Swizzle & VectorExtensions<TValue> & Ivec4Extensions
        : TValue extends "uvec4" ? Uvec4Swizzle & VectorExtensions<TValue> & Uvec4Extensions
        : TValue extends "mat2" ? Matrix2Extensions
        : TValue extends "mat3" ? Matrix3Extensions
        : TValue extends "mat4" ? Matrix4Extensions
        : {})
    & {
        __TypeScript_VALUE__: TValue;
    };
export default Node;
