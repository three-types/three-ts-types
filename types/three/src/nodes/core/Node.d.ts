import { EventDispatcher } from "../../core/EventDispatcher.js";
import { NodeUpdateType } from "./constants.js";
import NodeBuilder from "./NodeBuilder.js";
import NodeFrame from "./NodeFrame.js";
export interface NodeJSONMeta {
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
export interface NodeJSONMetadata {
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
declare class NodeClass extends EventDispatcher<{
    dispose: {};
}> {
    static get type(): string;
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
     * Constructs a new node.
     *
     * @param {?string} nodeType - The node type.
     */
    constructor(nodeType?: string | null);
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
    getChildren(): Generator<Node<unknown>, void, unknown>;
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
    getElementType(builder: NodeBuilder): "float" | "int" | "uint" | "bool" | "vec2" | "vec3" | "vec4" | null;
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
    /**
     * Constructs a new node.
     *
     * @param {?string} nodeType - The node type.
     */
    new<TNodeType>(nodeType?: string | null): Node<TNodeType>;
    new(nodeType?: string | null): Node;
    get type(): string;
};
export interface NodeElements {
}
type NumberToVec = {
    float: "vec";
    int: "ivec";
    uint: "uvec";
};
type NumberToVec2<TNumber extends NumberType> = `${NumberToVec[TNumber]}2`;
type NumberToVec3<TNumber extends NumberType> = `${NumberToVec[TNumber]}3`;
type NumberToVec4<TNumber extends NumberType> = `${NumberToVec[TNumber]}4`;
type Number<TNumber extends NumberType> = Node<TNumber> | number;
type Vec2OrLessOrNumber<TNumber extends NumberType> = Number<TNumber> | Node<NumberToVec2<TNumber>>;
type Vec3OrLessOrNumber<TNumber extends NumberType> = Vec2OrLessOrNumber<TNumber> | Node<NumberToVec3<TNumber>>;
type Vec4OrLessOrNumber<TNumber extends NumberType> = Vec3OrLessOrNumber<TNumber> | Node<NumberToVec4<TNumber>>;
interface Swizzle1In1Out<TNumber extends NumberType> {
    get x(): Node<TNumber>;
    set x(value: Vec4OrLessOrNumber<TNumber>);
    get r(): Node<TNumber>;
    set r(value: Vec4OrLessOrNumber<TNumber>);
    get s(): Node<TNumber>;
    set s(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle2In1Out<TNumber extends NumberType> extends Swizzle1In1Out<TNumber> {
    get y(): Node<TNumber>;
    set y(value: Vec4OrLessOrNumber<TNumber>);
    get g(): Node<TNumber>;
    set g(value: Vec4OrLessOrNumber<TNumber>);
    get t(): Node<TNumber>;
    set t(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle3In1Out<TNumber extends NumberType> extends Swizzle2In1Out<TNumber> {
    get z(): Node<TNumber>;
    set z(value: Vec4OrLessOrNumber<TNumber>);
    get b(): Node<TNumber>;
    set b(value: Vec4OrLessOrNumber<TNumber>);
    get p(): Node<TNumber>;
    set p(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle4In1Out<TNumber extends NumberType> extends Swizzle3In1Out<TNumber> {
    get w(): Node<TNumber>;
    set w(value: Vec4OrLessOrNumber<TNumber>);
    get a(): Node<TNumber>;
    set a(value: Vec4OrLessOrNumber<TNumber>);
    get q(): Node<TNumber>;
    set q(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle1In2Out<TNumber extends NumberType> {
    get xx(): Node<NumberToVec2<TNumber>>;
    set xx(value: Vec4OrLessOrNumber<TNumber>);
    get rr(): Node<NumberToVec2<TNumber>>;
    set rr(value: Vec4OrLessOrNumber<TNumber>);
    get ss(): Node<NumberToVec2<TNumber>>;
    set ss(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle2In2Out<TNumber extends NumberType> extends Swizzle1In2Out<TNumber> {
    get xy(): Node<NumberToVec2<TNumber>>;
    set xy(value: Vec4OrLessOrNumber<TNumber>);
    get rg(): Node<NumberToVec2<TNumber>>;
    set rg(value: Vec4OrLessOrNumber<TNumber>);
    get st(): Node<NumberToVec2<TNumber>>;
    set st(value: Vec4OrLessOrNumber<TNumber>);
    get yx(): Node<NumberToVec2<TNumber>>;
    set yx(value: Vec4OrLessOrNumber<TNumber>);
    get gr(): Node<NumberToVec2<TNumber>>;
    set gr(value: Vec4OrLessOrNumber<TNumber>);
    get ts(): Node<NumberToVec2<TNumber>>;
    set ts(value: Vec4OrLessOrNumber<TNumber>);
    get yy(): Node<NumberToVec2<TNumber>>;
    set yy(value: Vec4OrLessOrNumber<TNumber>);
    get gg(): Node<NumberToVec2<TNumber>>;
    set gg(value: Vec4OrLessOrNumber<TNumber>);
    get tt(): Node<NumberToVec2<TNumber>>;
    set tt(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle3In2Out<TNumber extends NumberType> extends Swizzle2In2Out<TNumber> {
    get xz(): Node<NumberToVec2<TNumber>>;
    set xz(value: Vec4OrLessOrNumber<TNumber>);
    get rb(): Node<NumberToVec2<TNumber>>;
    set rb(value: Vec4OrLessOrNumber<TNumber>);
    get sp(): Node<NumberToVec2<TNumber>>;
    set sp(value: Vec4OrLessOrNumber<TNumber>);
    get yz(): Node<NumberToVec2<TNumber>>;
    set yz(value: Vec4OrLessOrNumber<TNumber>);
    get gb(): Node<NumberToVec2<TNumber>>;
    set gb(value: Vec4OrLessOrNumber<TNumber>);
    get tp(): Node<NumberToVec2<TNumber>>;
    set tp(value: Vec4OrLessOrNumber<TNumber>);
    get zx(): Node<NumberToVec2<TNumber>>;
    set zx(value: Vec4OrLessOrNumber<TNumber>);
    get br(): Node<NumberToVec2<TNumber>>;
    set br(value: Vec4OrLessOrNumber<TNumber>);
    get ps(): Node<NumberToVec2<TNumber>>;
    set ps(value: Vec4OrLessOrNumber<TNumber>);
    get zy(): Node<NumberToVec2<TNumber>>;
    set zy(value: Vec4OrLessOrNumber<TNumber>);
    get bg(): Node<NumberToVec2<TNumber>>;
    set bg(value: Vec4OrLessOrNumber<TNumber>);
    get pt(): Node<NumberToVec2<TNumber>>;
    set pt(value: Vec4OrLessOrNumber<TNumber>);
    get zz(): Node<NumberToVec2<TNumber>>;
    set zz(value: Vec4OrLessOrNumber<TNumber>);
    get bb(): Node<NumberToVec2<TNumber>>;
    set bb(value: Vec4OrLessOrNumber<TNumber>);
    get pp(): Node<NumberToVec2<TNumber>>;
    set pp(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle4In2Out<TNumber extends NumberType> extends Swizzle3In2Out<TNumber> {
    get xw(): Node<NumberToVec2<TNumber>>;
    set xw(value: Vec4OrLessOrNumber<TNumber>);
    get ra(): Node<NumberToVec2<TNumber>>;
    set ra(value: Vec4OrLessOrNumber<TNumber>);
    get sq(): Node<NumberToVec2<TNumber>>;
    set sq(value: Vec4OrLessOrNumber<TNumber>);
    get yw(): Node<NumberToVec2<TNumber>>;
    set yw(value: Vec4OrLessOrNumber<TNumber>);
    get ga(): Node<NumberToVec2<TNumber>>;
    set ga(value: Vec4OrLessOrNumber<TNumber>);
    get tq(): Node<NumberToVec2<TNumber>>;
    set tq(value: Vec4OrLessOrNumber<TNumber>);
    get zw(): Node<NumberToVec2<TNumber>>;
    set zw(value: Vec4OrLessOrNumber<TNumber>);
    get ba(): Node<NumberToVec2<TNumber>>;
    set ba(value: Vec4OrLessOrNumber<TNumber>);
    get pq(): Node<NumberToVec2<TNumber>>;
    set pq(value: Vec4OrLessOrNumber<TNumber>);
    get wx(): Node<NumberToVec2<TNumber>>;
    set wx(value: Vec4OrLessOrNumber<TNumber>);
    get ar(): Node<NumberToVec2<TNumber>>;
    set ar(value: Vec4OrLessOrNumber<TNumber>);
    get qs(): Node<NumberToVec2<TNumber>>;
    set qs(value: Vec4OrLessOrNumber<TNumber>);
    get wy(): Node<NumberToVec2<TNumber>>;
    set wy(value: Vec4OrLessOrNumber<TNumber>);
    get ag(): Node<NumberToVec2<TNumber>>;
    set ag(value: Vec4OrLessOrNumber<TNumber>);
    get qt(): Node<NumberToVec2<TNumber>>;
    set qt(value: Vec4OrLessOrNumber<TNumber>);
    get wz(): Node<NumberToVec2<TNumber>>;
    set wz(value: Vec4OrLessOrNumber<TNumber>);
    get ab(): Node<NumberToVec2<TNumber>>;
    set ab(value: Vec4OrLessOrNumber<TNumber>);
    get qp(): Node<NumberToVec2<TNumber>>;
    set qp(value: Vec4OrLessOrNumber<TNumber>);
    get ww(): Node<NumberToVec2<TNumber>>;
    set ww(value: Vec4OrLessOrNumber<TNumber>);
    get aa(): Node<NumberToVec2<TNumber>>;
    set aa(value: Vec4OrLessOrNumber<TNumber>);
    get qq(): Node<NumberToVec2<TNumber>>;
    set qq(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle1In3Out<TNumber extends NumberType> {
    get xxx(): Node<NumberToVec3<TNumber>>;
    set xxx(value: Vec4OrLessOrNumber<TNumber>);
    get rrr(): Node<NumberToVec3<TNumber>>;
    set rrr(value: Vec4OrLessOrNumber<TNumber>);
    get sss(): Node<NumberToVec3<TNumber>>;
    set sss(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle2In3Out<TNumber extends NumberType> extends Swizzle1In3Out<TNumber> {
    get xxy(): Node<NumberToVec3<TNumber>>;
    set xxy(value: Vec4OrLessOrNumber<TNumber>);
    get rrg(): Node<NumberToVec3<TNumber>>;
    set rrg(value: Vec4OrLessOrNumber<TNumber>);
    get sst(): Node<NumberToVec3<TNumber>>;
    set sst(value: Vec4OrLessOrNumber<TNumber>);
    get xyx(): Node<NumberToVec3<TNumber>>;
    set xyx(value: Vec4OrLessOrNumber<TNumber>);
    get rgr(): Node<NumberToVec3<TNumber>>;
    set rgr(value: Vec4OrLessOrNumber<TNumber>);
    get sts(): Node<NumberToVec3<TNumber>>;
    set sts(value: Vec4OrLessOrNumber<TNumber>);
    get xyy(): Node<NumberToVec3<TNumber>>;
    set xyy(value: Vec4OrLessOrNumber<TNumber>);
    get rgg(): Node<NumberToVec3<TNumber>>;
    set rgg(value: Vec4OrLessOrNumber<TNumber>);
    get stt(): Node<NumberToVec3<TNumber>>;
    set stt(value: Vec4OrLessOrNumber<TNumber>);
    get yxx(): Node<NumberToVec3<TNumber>>;
    set yxx(value: Vec4OrLessOrNumber<TNumber>);
    get grr(): Node<NumberToVec3<TNumber>>;
    set grr(value: Vec4OrLessOrNumber<TNumber>);
    get tss(): Node<NumberToVec3<TNumber>>;
    set tss(value: Vec4OrLessOrNumber<TNumber>);
    get yxy(): Node<NumberToVec3<TNumber>>;
    set yxy(value: Vec4OrLessOrNumber<TNumber>);
    get grg(): Node<NumberToVec3<TNumber>>;
    set grg(value: Vec4OrLessOrNumber<TNumber>);
    get tst(): Node<NumberToVec3<TNumber>>;
    set tst(value: Vec4OrLessOrNumber<TNumber>);
    get yyx(): Node<NumberToVec3<TNumber>>;
    set yyx(value: Vec4OrLessOrNumber<TNumber>);
    get ggr(): Node<NumberToVec3<TNumber>>;
    set ggr(value: Vec4OrLessOrNumber<TNumber>);
    get tts(): Node<NumberToVec3<TNumber>>;
    set tts(value: Vec4OrLessOrNumber<TNumber>);
    get yyy(): Node<NumberToVec3<TNumber>>;
    set yyy(value: Vec4OrLessOrNumber<TNumber>);
    get ggg(): Node<NumberToVec3<TNumber>>;
    set ggg(value: Vec4OrLessOrNumber<TNumber>);
    get ttt(): Node<NumberToVec3<TNumber>>;
    set ttt(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle3In3Out<TNumber extends NumberType> extends Swizzle2In3Out<TNumber> {
    get xxz(): Node<NumberToVec3<TNumber>>;
    set xxz(value: Vec4OrLessOrNumber<TNumber>);
    get rrb(): Node<NumberToVec3<TNumber>>;
    set rrb(value: Vec4OrLessOrNumber<TNumber>);
    get ssp(): Node<NumberToVec3<TNumber>>;
    set ssp(value: Vec4OrLessOrNumber<TNumber>);
    get xyz(): Node<NumberToVec3<TNumber>>;
    set xyz(value: Vec4OrLessOrNumber<TNumber>);
    get rgb(): Node<NumberToVec3<TNumber>>;
    set rgb(value: Vec4OrLessOrNumber<TNumber>);
    get stp(): Node<NumberToVec3<TNumber>>;
    set stp(value: Vec4OrLessOrNumber<TNumber>);
    get xzx(): Node<NumberToVec3<TNumber>>;
    set xzx(value: Vec4OrLessOrNumber<TNumber>);
    get rbr(): Node<NumberToVec3<TNumber>>;
    set rbr(value: Vec4OrLessOrNumber<TNumber>);
    get sps(): Node<NumberToVec3<TNumber>>;
    set sps(value: Vec4OrLessOrNumber<TNumber>);
    get xzy(): Node<NumberToVec3<TNumber>>;
    set xzy(value: Vec4OrLessOrNumber<TNumber>);
    get rbg(): Node<NumberToVec3<TNumber>>;
    set rbg(value: Vec4OrLessOrNumber<TNumber>);
    get spt(): Node<NumberToVec3<TNumber>>;
    set spt(value: Vec4OrLessOrNumber<TNumber>);
    get xzz(): Node<NumberToVec3<TNumber>>;
    set xzz(value: Vec4OrLessOrNumber<TNumber>);
    get rbb(): Node<NumberToVec3<TNumber>>;
    set rbb(value: Vec4OrLessOrNumber<TNumber>);
    get spp(): Node<NumberToVec3<TNumber>>;
    set spp(value: Vec4OrLessOrNumber<TNumber>);
    get yxz(): Node<NumberToVec3<TNumber>>;
    set yxz(value: Vec4OrLessOrNumber<TNumber>);
    get grb(): Node<NumberToVec3<TNumber>>;
    set grb(value: Vec4OrLessOrNumber<TNumber>);
    get tsp(): Node<NumberToVec3<TNumber>>;
    set tsp(value: Vec4OrLessOrNumber<TNumber>);
    get yyz(): Node<NumberToVec3<TNumber>>;
    set yyz(value: Vec4OrLessOrNumber<TNumber>);
    get ggb(): Node<NumberToVec3<TNumber>>;
    set ggb(value: Vec4OrLessOrNumber<TNumber>);
    get ttp(): Node<NumberToVec3<TNumber>>;
    set ttp(value: Vec4OrLessOrNumber<TNumber>);
    get yzx(): Node<NumberToVec3<TNumber>>;
    set yzx(value: Vec4OrLessOrNumber<TNumber>);
    get gbr(): Node<NumberToVec3<TNumber>>;
    set gbr(value: Vec4OrLessOrNumber<TNumber>);
    get tps(): Node<NumberToVec3<TNumber>>;
    set tps(value: Vec4OrLessOrNumber<TNumber>);
    get yzy(): Node<NumberToVec3<TNumber>>;
    set yzy(value: Vec4OrLessOrNumber<TNumber>);
    get gbg(): Node<NumberToVec3<TNumber>>;
    set gbg(value: Vec4OrLessOrNumber<TNumber>);
    get tpt(): Node<NumberToVec3<TNumber>>;
    set tpt(value: Vec4OrLessOrNumber<TNumber>);
    get yzz(): Node<NumberToVec3<TNumber>>;
    set yzz(value: Vec4OrLessOrNumber<TNumber>);
    get gbb(): Node<NumberToVec3<TNumber>>;
    set gbb(value: Vec4OrLessOrNumber<TNumber>);
    get tpp(): Node<NumberToVec3<TNumber>>;
    set tpp(value: Vec4OrLessOrNumber<TNumber>);
    get zxx(): Node<NumberToVec3<TNumber>>;
    set zxx(value: Vec4OrLessOrNumber<TNumber>);
    get brr(): Node<NumberToVec3<TNumber>>;
    set brr(value: Vec4OrLessOrNumber<TNumber>);
    get pss(): Node<NumberToVec3<TNumber>>;
    set pss(value: Vec4OrLessOrNumber<TNumber>);
    get zxy(): Node<NumberToVec3<TNumber>>;
    set zxy(value: Vec4OrLessOrNumber<TNumber>);
    get brg(): Node<NumberToVec3<TNumber>>;
    set brg(value: Vec4OrLessOrNumber<TNumber>);
    get pst(): Node<NumberToVec3<TNumber>>;
    set pst(value: Vec4OrLessOrNumber<TNumber>);
    get zxz(): Node<NumberToVec3<TNumber>>;
    set zxz(value: Vec4OrLessOrNumber<TNumber>);
    get brb(): Node<NumberToVec3<TNumber>>;
    set brb(value: Vec4OrLessOrNumber<TNumber>);
    get psp(): Node<NumberToVec3<TNumber>>;
    set psp(value: Vec4OrLessOrNumber<TNumber>);
    get zyx(): Node<NumberToVec3<TNumber>>;
    set zyx(value: Vec4OrLessOrNumber<TNumber>);
    get bgr(): Node<NumberToVec3<TNumber>>;
    set bgr(value: Vec4OrLessOrNumber<TNumber>);
    get pts(): Node<NumberToVec3<TNumber>>;
    set pts(value: Vec4OrLessOrNumber<TNumber>);
    get zyy(): Node<NumberToVec3<TNumber>>;
    set zyy(value: Vec4OrLessOrNumber<TNumber>);
    get bgg(): Node<NumberToVec3<TNumber>>;
    set bgg(value: Vec4OrLessOrNumber<TNumber>);
    get ptt(): Node<NumberToVec3<TNumber>>;
    set ptt(value: Vec4OrLessOrNumber<TNumber>);
    get zyz(): Node<NumberToVec3<TNumber>>;
    set zyz(value: Vec4OrLessOrNumber<TNumber>);
    get bgb(): Node<NumberToVec3<TNumber>>;
    set bgb(value: Vec4OrLessOrNumber<TNumber>);
    get ptp(): Node<NumberToVec3<TNumber>>;
    set ptp(value: Vec4OrLessOrNumber<TNumber>);
    get zzx(): Node<NumberToVec3<TNumber>>;
    set zzx(value: Vec4OrLessOrNumber<TNumber>);
    get bbr(): Node<NumberToVec3<TNumber>>;
    set bbr(value: Vec4OrLessOrNumber<TNumber>);
    get pps(): Node<NumberToVec3<TNumber>>;
    set pps(value: Vec4OrLessOrNumber<TNumber>);
    get zzy(): Node<NumberToVec3<TNumber>>;
    set zzy(value: Vec4OrLessOrNumber<TNumber>);
    get bbg(): Node<NumberToVec3<TNumber>>;
    set bbg(value: Vec4OrLessOrNumber<TNumber>);
    get ppt(): Node<NumberToVec3<TNumber>>;
    set ppt(value: Vec4OrLessOrNumber<TNumber>);
    get zzz(): Node<NumberToVec3<TNumber>>;
    set zzz(value: Vec4OrLessOrNumber<TNumber>);
    get bbb(): Node<NumberToVec3<TNumber>>;
    set bbb(value: Vec4OrLessOrNumber<TNumber>);
    get ppp(): Node<NumberToVec3<TNumber>>;
    set ppp(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle4In3Out<TNumber extends NumberType> extends Swizzle3In3Out<TNumber> {
    get xxw(): Node<NumberToVec3<TNumber>>;
    set xxw(value: Vec4OrLessOrNumber<TNumber>);
    get rra(): Node<NumberToVec3<TNumber>>;
    set rra(value: Vec4OrLessOrNumber<TNumber>);
    get ssq(): Node<NumberToVec3<TNumber>>;
    set ssq(value: Vec4OrLessOrNumber<TNumber>);
    get xyw(): Node<NumberToVec3<TNumber>>;
    set xyw(value: Vec4OrLessOrNumber<TNumber>);
    get rga(): Node<NumberToVec3<TNumber>>;
    set rga(value: Vec4OrLessOrNumber<TNumber>);
    get stq(): Node<NumberToVec3<TNumber>>;
    set stq(value: Vec4OrLessOrNumber<TNumber>);
    get xzw(): Node<NumberToVec3<TNumber>>;
    set xzw(value: Vec4OrLessOrNumber<TNumber>);
    get rba(): Node<NumberToVec3<TNumber>>;
    set rba(value: Vec4OrLessOrNumber<TNumber>);
    get spq(): Node<NumberToVec3<TNumber>>;
    set spq(value: Vec4OrLessOrNumber<TNumber>);
    get xwx(): Node<NumberToVec3<TNumber>>;
    set xwx(value: Vec4OrLessOrNumber<TNumber>);
    get rar(): Node<NumberToVec3<TNumber>>;
    set rar(value: Vec4OrLessOrNumber<TNumber>);
    get sqs(): Node<NumberToVec3<TNumber>>;
    set sqs(value: Vec4OrLessOrNumber<TNumber>);
    get xwy(): Node<NumberToVec3<TNumber>>;
    set xwy(value: Vec4OrLessOrNumber<TNumber>);
    get rag(): Node<NumberToVec3<TNumber>>;
    set rag(value: Vec4OrLessOrNumber<TNumber>);
    get sqt(): Node<NumberToVec3<TNumber>>;
    set sqt(value: Vec4OrLessOrNumber<TNumber>);
    get xwz(): Node<NumberToVec3<TNumber>>;
    set xwz(value: Vec4OrLessOrNumber<TNumber>);
    get rab(): Node<NumberToVec3<TNumber>>;
    set rab(value: Vec4OrLessOrNumber<TNumber>);
    get sqp(): Node<NumberToVec3<TNumber>>;
    set sqp(value: Vec4OrLessOrNumber<TNumber>);
    get xww(): Node<NumberToVec3<TNumber>>;
    set xww(value: Vec4OrLessOrNumber<TNumber>);
    get raa(): Node<NumberToVec3<TNumber>>;
    set raa(value: Vec4OrLessOrNumber<TNumber>);
    get sqq(): Node<NumberToVec3<TNumber>>;
    set sqq(value: Vec4OrLessOrNumber<TNumber>);
    get yxw(): Node<NumberToVec3<TNumber>>;
    set yxw(value: Vec4OrLessOrNumber<TNumber>);
    get gra(): Node<NumberToVec3<TNumber>>;
    set gra(value: Vec4OrLessOrNumber<TNumber>);
    get tsq(): Node<NumberToVec3<TNumber>>;
    set tsq(value: Vec4OrLessOrNumber<TNumber>);
    get yyw(): Node<NumberToVec3<TNumber>>;
    set yyw(value: Vec4OrLessOrNumber<TNumber>);
    get gga(): Node<NumberToVec3<TNumber>>;
    set gga(value: Vec4OrLessOrNumber<TNumber>);
    get ttq(): Node<NumberToVec3<TNumber>>;
    set ttq(value: Vec4OrLessOrNumber<TNumber>);
    get yzw(): Node<NumberToVec3<TNumber>>;
    set yzw(value: Vec4OrLessOrNumber<TNumber>);
    get gba(): Node<NumberToVec3<TNumber>>;
    set gba(value: Vec4OrLessOrNumber<TNumber>);
    get tpq(): Node<NumberToVec3<TNumber>>;
    set tpq(value: Vec4OrLessOrNumber<TNumber>);
    get ywx(): Node<NumberToVec3<TNumber>>;
    set ywx(value: Vec4OrLessOrNumber<TNumber>);
    get gar(): Node<NumberToVec3<TNumber>>;
    set gar(value: Vec4OrLessOrNumber<TNumber>);
    get tqs(): Node<NumberToVec3<TNumber>>;
    set tqs(value: Vec4OrLessOrNumber<TNumber>);
    get ywy(): Node<NumberToVec3<TNumber>>;
    set ywy(value: Vec4OrLessOrNumber<TNumber>);
    get gag(): Node<NumberToVec3<TNumber>>;
    set gag(value: Vec4OrLessOrNumber<TNumber>);
    get tqt(): Node<NumberToVec3<TNumber>>;
    set tqt(value: Vec4OrLessOrNumber<TNumber>);
    get ywz(): Node<NumberToVec3<TNumber>>;
    set ywz(value: Vec4OrLessOrNumber<TNumber>);
    get gab(): Node<NumberToVec3<TNumber>>;
    set gab(value: Vec4OrLessOrNumber<TNumber>);
    get tqp(): Node<NumberToVec3<TNumber>>;
    set tqp(value: Vec4OrLessOrNumber<TNumber>);
    get yww(): Node<NumberToVec3<TNumber>>;
    set yww(value: Vec4OrLessOrNumber<TNumber>);
    get gaa(): Node<NumberToVec3<TNumber>>;
    set gaa(value: Vec4OrLessOrNumber<TNumber>);
    get tqq(): Node<NumberToVec3<TNumber>>;
    set tqq(value: Vec4OrLessOrNumber<TNumber>);
    get zxw(): Node<NumberToVec3<TNumber>>;
    set zxw(value: Vec4OrLessOrNumber<TNumber>);
    get bra(): Node<NumberToVec3<TNumber>>;
    set bra(value: Vec4OrLessOrNumber<TNumber>);
    get psq(): Node<NumberToVec3<TNumber>>;
    set psq(value: Vec4OrLessOrNumber<TNumber>);
    get zyw(): Node<NumberToVec3<TNumber>>;
    set zyw(value: Vec4OrLessOrNumber<TNumber>);
    get bga(): Node<NumberToVec3<TNumber>>;
    set bga(value: Vec4OrLessOrNumber<TNumber>);
    get ptq(): Node<NumberToVec3<TNumber>>;
    set ptq(value: Vec4OrLessOrNumber<TNumber>);
    get zzw(): Node<NumberToVec3<TNumber>>;
    set zzw(value: Vec4OrLessOrNumber<TNumber>);
    get bba(): Node<NumberToVec3<TNumber>>;
    set bba(value: Vec4OrLessOrNumber<TNumber>);
    get ppq(): Node<NumberToVec3<TNumber>>;
    set ppq(value: Vec4OrLessOrNumber<TNumber>);
    get zwx(): Node<NumberToVec3<TNumber>>;
    set zwx(value: Vec4OrLessOrNumber<TNumber>);
    get bar(): Node<NumberToVec3<TNumber>>;
    set bar(value: Vec4OrLessOrNumber<TNumber>);
    get pqs(): Node<NumberToVec3<TNumber>>;
    set pqs(value: Vec4OrLessOrNumber<TNumber>);
    get zwy(): Node<NumberToVec3<TNumber>>;
    set zwy(value: Vec4OrLessOrNumber<TNumber>);
    get bag(): Node<NumberToVec3<TNumber>>;
    set bag(value: Vec4OrLessOrNumber<TNumber>);
    get pqt(): Node<NumberToVec3<TNumber>>;
    set pqt(value: Vec4OrLessOrNumber<TNumber>);
    get zwz(): Node<NumberToVec3<TNumber>>;
    set zwz(value: Vec4OrLessOrNumber<TNumber>);
    get bab(): Node<NumberToVec3<TNumber>>;
    set bab(value: Vec4OrLessOrNumber<TNumber>);
    get pqp(): Node<NumberToVec3<TNumber>>;
    set pqp(value: Vec4OrLessOrNumber<TNumber>);
    get zww(): Node<NumberToVec3<TNumber>>;
    set zww(value: Vec4OrLessOrNumber<TNumber>);
    get baa(): Node<NumberToVec3<TNumber>>;
    set baa(value: Vec4OrLessOrNumber<TNumber>);
    get pqq(): Node<NumberToVec3<TNumber>>;
    set pqq(value: Vec4OrLessOrNumber<TNumber>);
    get wxx(): Node<NumberToVec3<TNumber>>;
    set wxx(value: Vec4OrLessOrNumber<TNumber>);
    get arr(): Node<NumberToVec3<TNumber>>;
    set arr(value: Vec4OrLessOrNumber<TNumber>);
    get qss(): Node<NumberToVec3<TNumber>>;
    set qss(value: Vec4OrLessOrNumber<TNumber>);
    get wxy(): Node<NumberToVec3<TNumber>>;
    set wxy(value: Vec4OrLessOrNumber<TNumber>);
    get arg(): Node<NumberToVec3<TNumber>>;
    set arg(value: Vec4OrLessOrNumber<TNumber>);
    get qst(): Node<NumberToVec3<TNumber>>;
    set qst(value: Vec4OrLessOrNumber<TNumber>);
    get wxz(): Node<NumberToVec3<TNumber>>;
    set wxz(value: Vec4OrLessOrNumber<TNumber>);
    get arb(): Node<NumberToVec3<TNumber>>;
    set arb(value: Vec4OrLessOrNumber<TNumber>);
    get qsp(): Node<NumberToVec3<TNumber>>;
    set qsp(value: Vec4OrLessOrNumber<TNumber>);
    get wxw(): Node<NumberToVec3<TNumber>>;
    set wxw(value: Vec4OrLessOrNumber<TNumber>);
    get ara(): Node<NumberToVec3<TNumber>>;
    set ara(value: Vec4OrLessOrNumber<TNumber>);
    get qsq(): Node<NumberToVec3<TNumber>>;
    set qsq(value: Vec4OrLessOrNumber<TNumber>);
    get wyx(): Node<NumberToVec3<TNumber>>;
    set wyx(value: Vec4OrLessOrNumber<TNumber>);
    get agr(): Node<NumberToVec3<TNumber>>;
    set agr(value: Vec4OrLessOrNumber<TNumber>);
    get qts(): Node<NumberToVec3<TNumber>>;
    set qts(value: Vec4OrLessOrNumber<TNumber>);
    get wyy(): Node<NumberToVec3<TNumber>>;
    set wyy(value: Vec4OrLessOrNumber<TNumber>);
    get agg(): Node<NumberToVec3<TNumber>>;
    set agg(value: Vec4OrLessOrNumber<TNumber>);
    get qtt(): Node<NumberToVec3<TNumber>>;
    set qtt(value: Vec4OrLessOrNumber<TNumber>);
    get wyz(): Node<NumberToVec3<TNumber>>;
    set wyz(value: Vec4OrLessOrNumber<TNumber>);
    get agb(): Node<NumberToVec3<TNumber>>;
    set agb(value: Vec4OrLessOrNumber<TNumber>);
    get qtp(): Node<NumberToVec3<TNumber>>;
    set qtp(value: Vec4OrLessOrNumber<TNumber>);
    get wyw(): Node<NumberToVec3<TNumber>>;
    set wyw(value: Vec4OrLessOrNumber<TNumber>);
    get aga(): Node<NumberToVec3<TNumber>>;
    set aga(value: Vec4OrLessOrNumber<TNumber>);
    get qtq(): Node<NumberToVec3<TNumber>>;
    set qtq(value: Vec4OrLessOrNumber<TNumber>);
    get wzx(): Node<NumberToVec3<TNumber>>;
    set wzx(value: Vec4OrLessOrNumber<TNumber>);
    get abr(): Node<NumberToVec3<TNumber>>;
    set abr(value: Vec4OrLessOrNumber<TNumber>);
    get qps(): Node<NumberToVec3<TNumber>>;
    set qps(value: Vec4OrLessOrNumber<TNumber>);
    get wzy(): Node<NumberToVec3<TNumber>>;
    set wzy(value: Vec4OrLessOrNumber<TNumber>);
    get abg(): Node<NumberToVec3<TNumber>>;
    set abg(value: Vec4OrLessOrNumber<TNumber>);
    get qpt(): Node<NumberToVec3<TNumber>>;
    set qpt(value: Vec4OrLessOrNumber<TNumber>);
    get wzz(): Node<NumberToVec3<TNumber>>;
    set wzz(value: Vec4OrLessOrNumber<TNumber>);
    get abb(): Node<NumberToVec3<TNumber>>;
    set abb(value: Vec4OrLessOrNumber<TNumber>);
    get qpp(): Node<NumberToVec3<TNumber>>;
    set qpp(value: Vec4OrLessOrNumber<TNumber>);
    get wzw(): Node<NumberToVec3<TNumber>>;
    set wzw(value: Vec4OrLessOrNumber<TNumber>);
    get aba(): Node<NumberToVec3<TNumber>>;
    set aba(value: Vec4OrLessOrNumber<TNumber>);
    get qpq(): Node<NumberToVec3<TNumber>>;
    set qpq(value: Vec4OrLessOrNumber<TNumber>);
    get wwx(): Node<NumberToVec3<TNumber>>;
    set wwx(value: Vec4OrLessOrNumber<TNumber>);
    get aar(): Node<NumberToVec3<TNumber>>;
    set aar(value: Vec4OrLessOrNumber<TNumber>);
    get qqs(): Node<NumberToVec3<TNumber>>;
    set qqs(value: Vec4OrLessOrNumber<TNumber>);
    get wwy(): Node<NumberToVec3<TNumber>>;
    set wwy(value: Vec4OrLessOrNumber<TNumber>);
    get aag(): Node<NumberToVec3<TNumber>>;
    set aag(value: Vec4OrLessOrNumber<TNumber>);
    get qqt(): Node<NumberToVec3<TNumber>>;
    set qqt(value: Vec4OrLessOrNumber<TNumber>);
    get wwz(): Node<NumberToVec3<TNumber>>;
    set wwz(value: Vec4OrLessOrNumber<TNumber>);
    get aab(): Node<NumberToVec3<TNumber>>;
    set aab(value: Vec4OrLessOrNumber<TNumber>);
    get qqp(): Node<NumberToVec3<TNumber>>;
    set qqp(value: Vec4OrLessOrNumber<TNumber>);
    get www(): Node<NumberToVec3<TNumber>>;
    set www(value: Vec4OrLessOrNumber<TNumber>);
    get aaa(): Node<NumberToVec3<TNumber>>;
    set aaa(value: Vec4OrLessOrNumber<TNumber>);
    get qqq(): Node<NumberToVec3<TNumber>>;
    set qqq(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle1In4Out<TNumber extends NumberType> {
    get xxxx(): Node<NumberToVec4<TNumber>>;
    set xxxx(value: Vec4OrLessOrNumber<TNumber>);
    get rrrr(): Node<NumberToVec4<TNumber>>;
    set rrrr(value: Vec4OrLessOrNumber<TNumber>);
    get ssss(): Node<NumberToVec4<TNumber>>;
    set ssss(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle2In4Out<TNumber extends NumberType> extends Swizzle1In4Out<TNumber> {
    get xxxy(): Node<NumberToVec4<TNumber>>;
    set xxxy(value: Vec4OrLessOrNumber<TNumber>);
    get rrrg(): Node<NumberToVec4<TNumber>>;
    set rrrg(value: Vec4OrLessOrNumber<TNumber>);
    get ssst(): Node<NumberToVec4<TNumber>>;
    set ssst(value: Vec4OrLessOrNumber<TNumber>);
    get xxyx(): Node<NumberToVec4<TNumber>>;
    set xxyx(value: Vec4OrLessOrNumber<TNumber>);
    get rrgr(): Node<NumberToVec4<TNumber>>;
    set rrgr(value: Vec4OrLessOrNumber<TNumber>);
    get ssts(): Node<NumberToVec4<TNumber>>;
    set ssts(value: Vec4OrLessOrNumber<TNumber>);
    get xxyy(): Node<NumberToVec4<TNumber>>;
    set xxyy(value: Vec4OrLessOrNumber<TNumber>);
    get rrgg(): Node<NumberToVec4<TNumber>>;
    set rrgg(value: Vec4OrLessOrNumber<TNumber>);
    get sstt(): Node<NumberToVec4<TNumber>>;
    set sstt(value: Vec4OrLessOrNumber<TNumber>);
    get xyxx(): Node<NumberToVec4<TNumber>>;
    set xyxx(value: Vec4OrLessOrNumber<TNumber>);
    get rgrr(): Node<NumberToVec4<TNumber>>;
    set rgrr(value: Vec4OrLessOrNumber<TNumber>);
    get stss(): Node<NumberToVec4<TNumber>>;
    set stss(value: Vec4OrLessOrNumber<TNumber>);
    get xyxy(): Node<NumberToVec4<TNumber>>;
    set xyxy(value: Vec4OrLessOrNumber<TNumber>);
    get rgrg(): Node<NumberToVec4<TNumber>>;
    set rgrg(value: Vec4OrLessOrNumber<TNumber>);
    get stst(): Node<NumberToVec4<TNumber>>;
    set stst(value: Vec4OrLessOrNumber<TNumber>);
    get xyyx(): Node<NumberToVec4<TNumber>>;
    set xyyx(value: Vec4OrLessOrNumber<TNumber>);
    get rggr(): Node<NumberToVec4<TNumber>>;
    set rggr(value: Vec4OrLessOrNumber<TNumber>);
    get stts(): Node<NumberToVec4<TNumber>>;
    set stts(value: Vec4OrLessOrNumber<TNumber>);
    get xyyy(): Node<NumberToVec4<TNumber>>;
    set xyyy(value: Vec4OrLessOrNumber<TNumber>);
    get rggg(): Node<NumberToVec4<TNumber>>;
    set rggg(value: Vec4OrLessOrNumber<TNumber>);
    get sttt(): Node<NumberToVec4<TNumber>>;
    set sttt(value: Vec4OrLessOrNumber<TNumber>);
    get yxxx(): Node<NumberToVec4<TNumber>>;
    set yxxx(value: Vec4OrLessOrNumber<TNumber>);
    get grrr(): Node<NumberToVec4<TNumber>>;
    set grrr(value: Vec4OrLessOrNumber<TNumber>);
    get tsss(): Node<NumberToVec4<TNumber>>;
    set tsss(value: Vec4OrLessOrNumber<TNumber>);
    get yxxy(): Node<NumberToVec4<TNumber>>;
    set yxxy(value: Vec4OrLessOrNumber<TNumber>);
    get grrg(): Node<NumberToVec4<TNumber>>;
    set grrg(value: Vec4OrLessOrNumber<TNumber>);
    get tsst(): Node<NumberToVec4<TNumber>>;
    set tsst(value: Vec4OrLessOrNumber<TNumber>);
    get yxyx(): Node<NumberToVec4<TNumber>>;
    set yxyx(value: Vec4OrLessOrNumber<TNumber>);
    get grgr(): Node<NumberToVec4<TNumber>>;
    set grgr(value: Vec4OrLessOrNumber<TNumber>);
    get tsts(): Node<NumberToVec4<TNumber>>;
    set tsts(value: Vec4OrLessOrNumber<TNumber>);
    get yxyy(): Node<NumberToVec4<TNumber>>;
    set yxyy(value: Vec4OrLessOrNumber<TNumber>);
    get grgg(): Node<NumberToVec4<TNumber>>;
    set grgg(value: Vec4OrLessOrNumber<TNumber>);
    get tstt(): Node<NumberToVec4<TNumber>>;
    set tstt(value: Vec4OrLessOrNumber<TNumber>);
    get yyxx(): Node<NumberToVec4<TNumber>>;
    set yyxx(value: Vec4OrLessOrNumber<TNumber>);
    get ggrr(): Node<NumberToVec4<TNumber>>;
    set ggrr(value: Vec4OrLessOrNumber<TNumber>);
    get ttss(): Node<NumberToVec4<TNumber>>;
    set ttss(value: Vec4OrLessOrNumber<TNumber>);
    get yyxy(): Node<NumberToVec4<TNumber>>;
    set yyxy(value: Vec4OrLessOrNumber<TNumber>);
    get ggrg(): Node<NumberToVec4<TNumber>>;
    set ggrg(value: Vec4OrLessOrNumber<TNumber>);
    get ttst(): Node<NumberToVec4<TNumber>>;
    set ttst(value: Vec4OrLessOrNumber<TNumber>);
    get yyyx(): Node<NumberToVec4<TNumber>>;
    set yyyx(value: Vec4OrLessOrNumber<TNumber>);
    get gggr(): Node<NumberToVec4<TNumber>>;
    set gggr(value: Vec4OrLessOrNumber<TNumber>);
    get ttts(): Node<NumberToVec4<TNumber>>;
    set ttts(value: Vec4OrLessOrNumber<TNumber>);
    get yyyy(): Node<NumberToVec4<TNumber>>;
    set yyyy(value: Vec4OrLessOrNumber<TNumber>);
    get gggg(): Node<NumberToVec4<TNumber>>;
    set gggg(value: Vec4OrLessOrNumber<TNumber>);
    get tttt(): Node<NumberToVec4<TNumber>>;
    set tttt(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle3In4Out<TNumber extends NumberType> extends Swizzle2In4Out<TNumber> {
    get xxxz(): Node<NumberToVec4<TNumber>>;
    set xxxz(value: Vec4OrLessOrNumber<TNumber>);
    get rrrb(): Node<NumberToVec4<TNumber>>;
    set rrrb(value: Vec4OrLessOrNumber<TNumber>);
    get sssp(): Node<NumberToVec4<TNumber>>;
    set sssp(value: Vec4OrLessOrNumber<TNumber>);
    get xxyz(): Node<NumberToVec4<TNumber>>;
    set xxyz(value: Vec4OrLessOrNumber<TNumber>);
    get rrgb(): Node<NumberToVec4<TNumber>>;
    set rrgb(value: Vec4OrLessOrNumber<TNumber>);
    get sstp(): Node<NumberToVec4<TNumber>>;
    set sstp(value: Vec4OrLessOrNumber<TNumber>);
    get xxzx(): Node<NumberToVec4<TNumber>>;
    set xxzx(value: Vec4OrLessOrNumber<TNumber>);
    get rrbr(): Node<NumberToVec4<TNumber>>;
    set rrbr(value: Vec4OrLessOrNumber<TNumber>);
    get ssps(): Node<NumberToVec4<TNumber>>;
    set ssps(value: Vec4OrLessOrNumber<TNumber>);
    get xxzy(): Node<NumberToVec4<TNumber>>;
    set xxzy(value: Vec4OrLessOrNumber<TNumber>);
    get rrbg(): Node<NumberToVec4<TNumber>>;
    set rrbg(value: Vec4OrLessOrNumber<TNumber>);
    get sspt(): Node<NumberToVec4<TNumber>>;
    set sspt(value: Vec4OrLessOrNumber<TNumber>);
    get xxzz(): Node<NumberToVec4<TNumber>>;
    set xxzz(value: Vec4OrLessOrNumber<TNumber>);
    get rrbb(): Node<NumberToVec4<TNumber>>;
    set rrbb(value: Vec4OrLessOrNumber<TNumber>);
    get sspp(): Node<NumberToVec4<TNumber>>;
    set sspp(value: Vec4OrLessOrNumber<TNumber>);
    get xyxz(): Node<NumberToVec4<TNumber>>;
    set xyxz(value: Vec4OrLessOrNumber<TNumber>);
    get rgrb(): Node<NumberToVec4<TNumber>>;
    set rgrb(value: Vec4OrLessOrNumber<TNumber>);
    get stsp(): Node<NumberToVec4<TNumber>>;
    set stsp(value: Vec4OrLessOrNumber<TNumber>);
    get xyyz(): Node<NumberToVec4<TNumber>>;
    set xyyz(value: Vec4OrLessOrNumber<TNumber>);
    get rggb(): Node<NumberToVec4<TNumber>>;
    set rggb(value: Vec4OrLessOrNumber<TNumber>);
    get sttp(): Node<NumberToVec4<TNumber>>;
    set sttp(value: Vec4OrLessOrNumber<TNumber>);
    get xyzx(): Node<NumberToVec4<TNumber>>;
    set xyzx(value: Vec4OrLessOrNumber<TNumber>);
    get rgbr(): Node<NumberToVec4<TNumber>>;
    set rgbr(value: Vec4OrLessOrNumber<TNumber>);
    get stps(): Node<NumberToVec4<TNumber>>;
    set stps(value: Vec4OrLessOrNumber<TNumber>);
    get xyzy(): Node<NumberToVec4<TNumber>>;
    set xyzy(value: Vec4OrLessOrNumber<TNumber>);
    get rgbg(): Node<NumberToVec4<TNumber>>;
    set rgbg(value: Vec4OrLessOrNumber<TNumber>);
    get stpt(): Node<NumberToVec4<TNumber>>;
    set stpt(value: Vec4OrLessOrNumber<TNumber>);
    get xyzz(): Node<NumberToVec4<TNumber>>;
    set xyzz(value: Vec4OrLessOrNumber<TNumber>);
    get rgbb(): Node<NumberToVec4<TNumber>>;
    set rgbb(value: Vec4OrLessOrNumber<TNumber>);
    get stpp(): Node<NumberToVec4<TNumber>>;
    set stpp(value: Vec4OrLessOrNumber<TNumber>);
    get xzxx(): Node<NumberToVec4<TNumber>>;
    set xzxx(value: Vec4OrLessOrNumber<TNumber>);
    get rbrr(): Node<NumberToVec4<TNumber>>;
    set rbrr(value: Vec4OrLessOrNumber<TNumber>);
    get spss(): Node<NumberToVec4<TNumber>>;
    set spss(value: Vec4OrLessOrNumber<TNumber>);
    get xzxy(): Node<NumberToVec4<TNumber>>;
    set xzxy(value: Vec4OrLessOrNumber<TNumber>);
    get rbrg(): Node<NumberToVec4<TNumber>>;
    set rbrg(value: Vec4OrLessOrNumber<TNumber>);
    get spst(): Node<NumberToVec4<TNumber>>;
    set spst(value: Vec4OrLessOrNumber<TNumber>);
    get xzxz(): Node<NumberToVec4<TNumber>>;
    set xzxz(value: Vec4OrLessOrNumber<TNumber>);
    get rbrb(): Node<NumberToVec4<TNumber>>;
    set rbrb(value: Vec4OrLessOrNumber<TNumber>);
    get spsp(): Node<NumberToVec4<TNumber>>;
    set spsp(value: Vec4OrLessOrNumber<TNumber>);
    get xzyx(): Node<NumberToVec4<TNumber>>;
    set xzyx(value: Vec4OrLessOrNumber<TNumber>);
    get rbgr(): Node<NumberToVec4<TNumber>>;
    set rbgr(value: Vec4OrLessOrNumber<TNumber>);
    get spts(): Node<NumberToVec4<TNumber>>;
    set spts(value: Vec4OrLessOrNumber<TNumber>);
    get xzyy(): Node<NumberToVec4<TNumber>>;
    set xzyy(value: Vec4OrLessOrNumber<TNumber>);
    get rbgg(): Node<NumberToVec4<TNumber>>;
    set rbgg(value: Vec4OrLessOrNumber<TNumber>);
    get sptt(): Node<NumberToVec4<TNumber>>;
    set sptt(value: Vec4OrLessOrNumber<TNumber>);
    get xzyz(): Node<NumberToVec4<TNumber>>;
    set xzyz(value: Vec4OrLessOrNumber<TNumber>);
    get rbgb(): Node<NumberToVec4<TNumber>>;
    set rbgb(value: Vec4OrLessOrNumber<TNumber>);
    get sptp(): Node<NumberToVec4<TNumber>>;
    set sptp(value: Vec4OrLessOrNumber<TNumber>);
    get xzzx(): Node<NumberToVec4<TNumber>>;
    set xzzx(value: Vec4OrLessOrNumber<TNumber>);
    get rbbr(): Node<NumberToVec4<TNumber>>;
    set rbbr(value: Vec4OrLessOrNumber<TNumber>);
    get spps(): Node<NumberToVec4<TNumber>>;
    set spps(value: Vec4OrLessOrNumber<TNumber>);
    get xzzy(): Node<NumberToVec4<TNumber>>;
    set xzzy(value: Vec4OrLessOrNumber<TNumber>);
    get rbbg(): Node<NumberToVec4<TNumber>>;
    set rbbg(value: Vec4OrLessOrNumber<TNumber>);
    get sppt(): Node<NumberToVec4<TNumber>>;
    set sppt(value: Vec4OrLessOrNumber<TNumber>);
    get xzzz(): Node<NumberToVec4<TNumber>>;
    set xzzz(value: Vec4OrLessOrNumber<TNumber>);
    get rbbb(): Node<NumberToVec4<TNumber>>;
    set rbbb(value: Vec4OrLessOrNumber<TNumber>);
    get sppp(): Node<NumberToVec4<TNumber>>;
    set sppp(value: Vec4OrLessOrNumber<TNumber>);
    get yxxz(): Node<NumberToVec4<TNumber>>;
    set yxxz(value: Vec4OrLessOrNumber<TNumber>);
    get grrb(): Node<NumberToVec4<TNumber>>;
    set grrb(value: Vec4OrLessOrNumber<TNumber>);
    get tssp(): Node<NumberToVec4<TNumber>>;
    set tssp(value: Vec4OrLessOrNumber<TNumber>);
    get yxyz(): Node<NumberToVec4<TNumber>>;
    set yxyz(value: Vec4OrLessOrNumber<TNumber>);
    get grgb(): Node<NumberToVec4<TNumber>>;
    set grgb(value: Vec4OrLessOrNumber<TNumber>);
    get tstp(): Node<NumberToVec4<TNumber>>;
    set tstp(value: Vec4OrLessOrNumber<TNumber>);
    get yxzx(): Node<NumberToVec4<TNumber>>;
    set yxzx(value: Vec4OrLessOrNumber<TNumber>);
    get grbr(): Node<NumberToVec4<TNumber>>;
    set grbr(value: Vec4OrLessOrNumber<TNumber>);
    get tsps(): Node<NumberToVec4<TNumber>>;
    set tsps(value: Vec4OrLessOrNumber<TNumber>);
    get yxzy(): Node<NumberToVec4<TNumber>>;
    set yxzy(value: Vec4OrLessOrNumber<TNumber>);
    get grbg(): Node<NumberToVec4<TNumber>>;
    set grbg(value: Vec4OrLessOrNumber<TNumber>);
    get tspt(): Node<NumberToVec4<TNumber>>;
    set tspt(value: Vec4OrLessOrNumber<TNumber>);
    get yxzz(): Node<NumberToVec4<TNumber>>;
    set yxzz(value: Vec4OrLessOrNumber<TNumber>);
    get grbb(): Node<NumberToVec4<TNumber>>;
    set grbb(value: Vec4OrLessOrNumber<TNumber>);
    get tspp(): Node<NumberToVec4<TNumber>>;
    set tspp(value: Vec4OrLessOrNumber<TNumber>);
    get yyxz(): Node<NumberToVec4<TNumber>>;
    set yyxz(value: Vec4OrLessOrNumber<TNumber>);
    get ggrb(): Node<NumberToVec4<TNumber>>;
    set ggrb(value: Vec4OrLessOrNumber<TNumber>);
    get ttsp(): Node<NumberToVec4<TNumber>>;
    set ttsp(value: Vec4OrLessOrNumber<TNumber>);
    get yyyz(): Node<NumberToVec4<TNumber>>;
    set yyyz(value: Vec4OrLessOrNumber<TNumber>);
    get gggb(): Node<NumberToVec4<TNumber>>;
    set gggb(value: Vec4OrLessOrNumber<TNumber>);
    get tttp(): Node<NumberToVec4<TNumber>>;
    set tttp(value: Vec4OrLessOrNumber<TNumber>);
    get yyzx(): Node<NumberToVec4<TNumber>>;
    set yyzx(value: Vec4OrLessOrNumber<TNumber>);
    get ggbr(): Node<NumberToVec4<TNumber>>;
    set ggbr(value: Vec4OrLessOrNumber<TNumber>);
    get ttps(): Node<NumberToVec4<TNumber>>;
    set ttps(value: Vec4OrLessOrNumber<TNumber>);
    get yyzy(): Node<NumberToVec4<TNumber>>;
    set yyzy(value: Vec4OrLessOrNumber<TNumber>);
    get ggbg(): Node<NumberToVec4<TNumber>>;
    set ggbg(value: Vec4OrLessOrNumber<TNumber>);
    get ttpt(): Node<NumberToVec4<TNumber>>;
    set ttpt(value: Vec4OrLessOrNumber<TNumber>);
    get yyzz(): Node<NumberToVec4<TNumber>>;
    set yyzz(value: Vec4OrLessOrNumber<TNumber>);
    get ggbb(): Node<NumberToVec4<TNumber>>;
    set ggbb(value: Vec4OrLessOrNumber<TNumber>);
    get ttpp(): Node<NumberToVec4<TNumber>>;
    set ttpp(value: Vec4OrLessOrNumber<TNumber>);
    get yzxx(): Node<NumberToVec4<TNumber>>;
    set yzxx(value: Vec4OrLessOrNumber<TNumber>);
    get gbrr(): Node<NumberToVec4<TNumber>>;
    set gbrr(value: Vec4OrLessOrNumber<TNumber>);
    get tpss(): Node<NumberToVec4<TNumber>>;
    set tpss(value: Vec4OrLessOrNumber<TNumber>);
    get yzxy(): Node<NumberToVec4<TNumber>>;
    set yzxy(value: Vec4OrLessOrNumber<TNumber>);
    get gbrg(): Node<NumberToVec4<TNumber>>;
    set gbrg(value: Vec4OrLessOrNumber<TNumber>);
    get tpst(): Node<NumberToVec4<TNumber>>;
    set tpst(value: Vec4OrLessOrNumber<TNumber>);
    get yzxz(): Node<NumberToVec4<TNumber>>;
    set yzxz(value: Vec4OrLessOrNumber<TNumber>);
    get gbrb(): Node<NumberToVec4<TNumber>>;
    set gbrb(value: Vec4OrLessOrNumber<TNumber>);
    get tpsp(): Node<NumberToVec4<TNumber>>;
    set tpsp(value: Vec4OrLessOrNumber<TNumber>);
    get yzyx(): Node<NumberToVec4<TNumber>>;
    set yzyx(value: Vec4OrLessOrNumber<TNumber>);
    get gbgr(): Node<NumberToVec4<TNumber>>;
    set gbgr(value: Vec4OrLessOrNumber<TNumber>);
    get tpts(): Node<NumberToVec4<TNumber>>;
    set tpts(value: Vec4OrLessOrNumber<TNumber>);
    get yzyy(): Node<NumberToVec4<TNumber>>;
    set yzyy(value: Vec4OrLessOrNumber<TNumber>);
    get gbgg(): Node<NumberToVec4<TNumber>>;
    set gbgg(value: Vec4OrLessOrNumber<TNumber>);
    get tptt(): Node<NumberToVec4<TNumber>>;
    set tptt(value: Vec4OrLessOrNumber<TNumber>);
    get yzyz(): Node<NumberToVec4<TNumber>>;
    set yzyz(value: Vec4OrLessOrNumber<TNumber>);
    get gbgb(): Node<NumberToVec4<TNumber>>;
    set gbgb(value: Vec4OrLessOrNumber<TNumber>);
    get tptp(): Node<NumberToVec4<TNumber>>;
    set tptp(value: Vec4OrLessOrNumber<TNumber>);
    get yzzx(): Node<NumberToVec4<TNumber>>;
    set yzzx(value: Vec4OrLessOrNumber<TNumber>);
    get gbbr(): Node<NumberToVec4<TNumber>>;
    set gbbr(value: Vec4OrLessOrNumber<TNumber>);
    get tpps(): Node<NumberToVec4<TNumber>>;
    set tpps(value: Vec4OrLessOrNumber<TNumber>);
    get yzzy(): Node<NumberToVec4<TNumber>>;
    set yzzy(value: Vec4OrLessOrNumber<TNumber>);
    get gbbg(): Node<NumberToVec4<TNumber>>;
    set gbbg(value: Vec4OrLessOrNumber<TNumber>);
    get tppt(): Node<NumberToVec4<TNumber>>;
    set tppt(value: Vec4OrLessOrNumber<TNumber>);
    get yzzz(): Node<NumberToVec4<TNumber>>;
    set yzzz(value: Vec4OrLessOrNumber<TNumber>);
    get gbbb(): Node<NumberToVec4<TNumber>>;
    set gbbb(value: Vec4OrLessOrNumber<TNumber>);
    get tppp(): Node<NumberToVec4<TNumber>>;
    set tppp(value: Vec4OrLessOrNumber<TNumber>);
    get zxxx(): Node<NumberToVec4<TNumber>>;
    set zxxx(value: Vec4OrLessOrNumber<TNumber>);
    get brrr(): Node<NumberToVec4<TNumber>>;
    set brrr(value: Vec4OrLessOrNumber<TNumber>);
    get psss(): Node<NumberToVec4<TNumber>>;
    set psss(value: Vec4OrLessOrNumber<TNumber>);
    get zxxy(): Node<NumberToVec4<TNumber>>;
    set zxxy(value: Vec4OrLessOrNumber<TNumber>);
    get brrg(): Node<NumberToVec4<TNumber>>;
    set brrg(value: Vec4OrLessOrNumber<TNumber>);
    get psst(): Node<NumberToVec4<TNumber>>;
    set psst(value: Vec4OrLessOrNumber<TNumber>);
    get zxxz(): Node<NumberToVec4<TNumber>>;
    set zxxz(value: Vec4OrLessOrNumber<TNumber>);
    get brrb(): Node<NumberToVec4<TNumber>>;
    set brrb(value: Vec4OrLessOrNumber<TNumber>);
    get pssp(): Node<NumberToVec4<TNumber>>;
    set pssp(value: Vec4OrLessOrNumber<TNumber>);
    get zxyx(): Node<NumberToVec4<TNumber>>;
    set zxyx(value: Vec4OrLessOrNumber<TNumber>);
    get brgr(): Node<NumberToVec4<TNumber>>;
    set brgr(value: Vec4OrLessOrNumber<TNumber>);
    get psts(): Node<NumberToVec4<TNumber>>;
    set psts(value: Vec4OrLessOrNumber<TNumber>);
    get zxyy(): Node<NumberToVec4<TNumber>>;
    set zxyy(value: Vec4OrLessOrNumber<TNumber>);
    get brgg(): Node<NumberToVec4<TNumber>>;
    set brgg(value: Vec4OrLessOrNumber<TNumber>);
    get pstt(): Node<NumberToVec4<TNumber>>;
    set pstt(value: Vec4OrLessOrNumber<TNumber>);
    get zxyz(): Node<NumberToVec4<TNumber>>;
    set zxyz(value: Vec4OrLessOrNumber<TNumber>);
    get brgb(): Node<NumberToVec4<TNumber>>;
    set brgb(value: Vec4OrLessOrNumber<TNumber>);
    get pstp(): Node<NumberToVec4<TNumber>>;
    set pstp(value: Vec4OrLessOrNumber<TNumber>);
    get zxzx(): Node<NumberToVec4<TNumber>>;
    set zxzx(value: Vec4OrLessOrNumber<TNumber>);
    get brbr(): Node<NumberToVec4<TNumber>>;
    set brbr(value: Vec4OrLessOrNumber<TNumber>);
    get psps(): Node<NumberToVec4<TNumber>>;
    set psps(value: Vec4OrLessOrNumber<TNumber>);
    get zxzy(): Node<NumberToVec4<TNumber>>;
    set zxzy(value: Vec4OrLessOrNumber<TNumber>);
    get brbg(): Node<NumberToVec4<TNumber>>;
    set brbg(value: Vec4OrLessOrNumber<TNumber>);
    get pspt(): Node<NumberToVec4<TNumber>>;
    set pspt(value: Vec4OrLessOrNumber<TNumber>);
    get zxzz(): Node<NumberToVec4<TNumber>>;
    set zxzz(value: Vec4OrLessOrNumber<TNumber>);
    get brbb(): Node<NumberToVec4<TNumber>>;
    set brbb(value: Vec4OrLessOrNumber<TNumber>);
    get pspp(): Node<NumberToVec4<TNumber>>;
    set pspp(value: Vec4OrLessOrNumber<TNumber>);
    get zyxx(): Node<NumberToVec4<TNumber>>;
    set zyxx(value: Vec4OrLessOrNumber<TNumber>);
    get bgrr(): Node<NumberToVec4<TNumber>>;
    set bgrr(value: Vec4OrLessOrNumber<TNumber>);
    get ptss(): Node<NumberToVec4<TNumber>>;
    set ptss(value: Vec4OrLessOrNumber<TNumber>);
    get zyxy(): Node<NumberToVec4<TNumber>>;
    set zyxy(value: Vec4OrLessOrNumber<TNumber>);
    get bgrg(): Node<NumberToVec4<TNumber>>;
    set bgrg(value: Vec4OrLessOrNumber<TNumber>);
    get ptst(): Node<NumberToVec4<TNumber>>;
    set ptst(value: Vec4OrLessOrNumber<TNumber>);
    get zyxz(): Node<NumberToVec4<TNumber>>;
    set zyxz(value: Vec4OrLessOrNumber<TNumber>);
    get bgrb(): Node<NumberToVec4<TNumber>>;
    set bgrb(value: Vec4OrLessOrNumber<TNumber>);
    get ptsp(): Node<NumberToVec4<TNumber>>;
    set ptsp(value: Vec4OrLessOrNumber<TNumber>);
    get zyyx(): Node<NumberToVec4<TNumber>>;
    set zyyx(value: Vec4OrLessOrNumber<TNumber>);
    get bggr(): Node<NumberToVec4<TNumber>>;
    set bggr(value: Vec4OrLessOrNumber<TNumber>);
    get ptts(): Node<NumberToVec4<TNumber>>;
    set ptts(value: Vec4OrLessOrNumber<TNumber>);
    get zyyy(): Node<NumberToVec4<TNumber>>;
    set zyyy(value: Vec4OrLessOrNumber<TNumber>);
    get bggg(): Node<NumberToVec4<TNumber>>;
    set bggg(value: Vec4OrLessOrNumber<TNumber>);
    get pttt(): Node<NumberToVec4<TNumber>>;
    set pttt(value: Vec4OrLessOrNumber<TNumber>);
    get zyyz(): Node<NumberToVec4<TNumber>>;
    set zyyz(value: Vec4OrLessOrNumber<TNumber>);
    get bggb(): Node<NumberToVec4<TNumber>>;
    set bggb(value: Vec4OrLessOrNumber<TNumber>);
    get pttp(): Node<NumberToVec4<TNumber>>;
    set pttp(value: Vec4OrLessOrNumber<TNumber>);
    get zyzx(): Node<NumberToVec4<TNumber>>;
    set zyzx(value: Vec4OrLessOrNumber<TNumber>);
    get bgbr(): Node<NumberToVec4<TNumber>>;
    set bgbr(value: Vec4OrLessOrNumber<TNumber>);
    get ptps(): Node<NumberToVec4<TNumber>>;
    set ptps(value: Vec4OrLessOrNumber<TNumber>);
    get zyzy(): Node<NumberToVec4<TNumber>>;
    set zyzy(value: Vec4OrLessOrNumber<TNumber>);
    get bgbg(): Node<NumberToVec4<TNumber>>;
    set bgbg(value: Vec4OrLessOrNumber<TNumber>);
    get ptpt(): Node<NumberToVec4<TNumber>>;
    set ptpt(value: Vec4OrLessOrNumber<TNumber>);
    get zyzz(): Node<NumberToVec4<TNumber>>;
    set zyzz(value: Vec4OrLessOrNumber<TNumber>);
    get bgbb(): Node<NumberToVec4<TNumber>>;
    set bgbb(value: Vec4OrLessOrNumber<TNumber>);
    get ptpp(): Node<NumberToVec4<TNumber>>;
    set ptpp(value: Vec4OrLessOrNumber<TNumber>);
    get zzxx(): Node<NumberToVec4<TNumber>>;
    set zzxx(value: Vec4OrLessOrNumber<TNumber>);
    get bbrr(): Node<NumberToVec4<TNumber>>;
    set bbrr(value: Vec4OrLessOrNumber<TNumber>);
    get ppss(): Node<NumberToVec4<TNumber>>;
    set ppss(value: Vec4OrLessOrNumber<TNumber>);
    get zzxy(): Node<NumberToVec4<TNumber>>;
    set zzxy(value: Vec4OrLessOrNumber<TNumber>);
    get bbrg(): Node<NumberToVec4<TNumber>>;
    set bbrg(value: Vec4OrLessOrNumber<TNumber>);
    get ppst(): Node<NumberToVec4<TNumber>>;
    set ppst(value: Vec4OrLessOrNumber<TNumber>);
    get zzxz(): Node<NumberToVec4<TNumber>>;
    set zzxz(value: Vec4OrLessOrNumber<TNumber>);
    get bbrb(): Node<NumberToVec4<TNumber>>;
    set bbrb(value: Vec4OrLessOrNumber<TNumber>);
    get ppsp(): Node<NumberToVec4<TNumber>>;
    set ppsp(value: Vec4OrLessOrNumber<TNumber>);
    get zzyx(): Node<NumberToVec4<TNumber>>;
    set zzyx(value: Vec4OrLessOrNumber<TNumber>);
    get bbgr(): Node<NumberToVec4<TNumber>>;
    set bbgr(value: Vec4OrLessOrNumber<TNumber>);
    get ppts(): Node<NumberToVec4<TNumber>>;
    set ppts(value: Vec4OrLessOrNumber<TNumber>);
    get zzyy(): Node<NumberToVec4<TNumber>>;
    set zzyy(value: Vec4OrLessOrNumber<TNumber>);
    get bbgg(): Node<NumberToVec4<TNumber>>;
    set bbgg(value: Vec4OrLessOrNumber<TNumber>);
    get pptt(): Node<NumberToVec4<TNumber>>;
    set pptt(value: Vec4OrLessOrNumber<TNumber>);
    get zzyz(): Node<NumberToVec4<TNumber>>;
    set zzyz(value: Vec4OrLessOrNumber<TNumber>);
    get bbgb(): Node<NumberToVec4<TNumber>>;
    set bbgb(value: Vec4OrLessOrNumber<TNumber>);
    get pptp(): Node<NumberToVec4<TNumber>>;
    set pptp(value: Vec4OrLessOrNumber<TNumber>);
    get zzzx(): Node<NumberToVec4<TNumber>>;
    set zzzx(value: Vec4OrLessOrNumber<TNumber>);
    get bbbr(): Node<NumberToVec4<TNumber>>;
    set bbbr(value: Vec4OrLessOrNumber<TNumber>);
    get ppps(): Node<NumberToVec4<TNumber>>;
    set ppps(value: Vec4OrLessOrNumber<TNumber>);
    get zzzy(): Node<NumberToVec4<TNumber>>;
    set zzzy(value: Vec4OrLessOrNumber<TNumber>);
    get bbbg(): Node<NumberToVec4<TNumber>>;
    set bbbg(value: Vec4OrLessOrNumber<TNumber>);
    get pppt(): Node<NumberToVec4<TNumber>>;
    set pppt(value: Vec4OrLessOrNumber<TNumber>);
    get zzzz(): Node<NumberToVec4<TNumber>>;
    set zzzz(value: Vec4OrLessOrNumber<TNumber>);
    get bbbb(): Node<NumberToVec4<TNumber>>;
    set bbbb(value: Vec4OrLessOrNumber<TNumber>);
    get pppp(): Node<NumberToVec4<TNumber>>;
    set pppp(value: Vec4OrLessOrNumber<TNumber>);
}
interface Swizzle4In4Out<TNumber extends NumberType> extends Swizzle3In4Out<TNumber> {
    get xxxw(): Node<NumberToVec4<TNumber>>;
    set xxxw(value: Vec4OrLessOrNumber<TNumber>);
    get rrra(): Node<NumberToVec4<TNumber>>;
    set rrra(value: Vec4OrLessOrNumber<TNumber>);
    get sssq(): Node<NumberToVec4<TNumber>>;
    set sssq(value: Vec4OrLessOrNumber<TNumber>);
    get xxyw(): Node<NumberToVec4<TNumber>>;
    set xxyw(value: Vec4OrLessOrNumber<TNumber>);
    get rrga(): Node<NumberToVec4<TNumber>>;
    set rrga(value: Vec4OrLessOrNumber<TNumber>);
    get sstq(): Node<NumberToVec4<TNumber>>;
    set sstq(value: Vec4OrLessOrNumber<TNumber>);
    get xxzw(): Node<NumberToVec4<TNumber>>;
    set xxzw(value: Vec4OrLessOrNumber<TNumber>);
    get rrba(): Node<NumberToVec4<TNumber>>;
    set rrba(value: Vec4OrLessOrNumber<TNumber>);
    get sspq(): Node<NumberToVec4<TNumber>>;
    set sspq(value: Vec4OrLessOrNumber<TNumber>);
    get xxwx(): Node<NumberToVec4<TNumber>>;
    set xxwx(value: Vec4OrLessOrNumber<TNumber>);
    get rrar(): Node<NumberToVec4<TNumber>>;
    set rrar(value: Vec4OrLessOrNumber<TNumber>);
    get ssqs(): Node<NumberToVec4<TNumber>>;
    set ssqs(value: Vec4OrLessOrNumber<TNumber>);
    get xxwy(): Node<NumberToVec4<TNumber>>;
    set xxwy(value: Vec4OrLessOrNumber<TNumber>);
    get rrag(): Node<NumberToVec4<TNumber>>;
    set rrag(value: Vec4OrLessOrNumber<TNumber>);
    get ssqt(): Node<NumberToVec4<TNumber>>;
    set ssqt(value: Vec4OrLessOrNumber<TNumber>);
    get xxwz(): Node<NumberToVec4<TNumber>>;
    set xxwz(value: Vec4OrLessOrNumber<TNumber>);
    get rrab(): Node<NumberToVec4<TNumber>>;
    set rrab(value: Vec4OrLessOrNumber<TNumber>);
    get ssqp(): Node<NumberToVec4<TNumber>>;
    set ssqp(value: Vec4OrLessOrNumber<TNumber>);
    get xxww(): Node<NumberToVec4<TNumber>>;
    set xxww(value: Vec4OrLessOrNumber<TNumber>);
    get rraa(): Node<NumberToVec4<TNumber>>;
    set rraa(value: Vec4OrLessOrNumber<TNumber>);
    get ssqq(): Node<NumberToVec4<TNumber>>;
    set ssqq(value: Vec4OrLessOrNumber<TNumber>);
    get xyxw(): Node<NumberToVec4<TNumber>>;
    set xyxw(value: Vec4OrLessOrNumber<TNumber>);
    get rgra(): Node<NumberToVec4<TNumber>>;
    set rgra(value: Vec4OrLessOrNumber<TNumber>);
    get stsq(): Node<NumberToVec4<TNumber>>;
    set stsq(value: Vec4OrLessOrNumber<TNumber>);
    get xyyw(): Node<NumberToVec4<TNumber>>;
    set xyyw(value: Vec4OrLessOrNumber<TNumber>);
    get rgga(): Node<NumberToVec4<TNumber>>;
    set rgga(value: Vec4OrLessOrNumber<TNumber>);
    get sttq(): Node<NumberToVec4<TNumber>>;
    set sttq(value: Vec4OrLessOrNumber<TNumber>);
    get xyzw(): Node<NumberToVec4<TNumber>>;
    set xyzw(value: Vec4OrLessOrNumber<TNumber>);
    get rgba(): Node<NumberToVec4<TNumber>>;
    set rgba(value: Vec4OrLessOrNumber<TNumber>);
    get stpq(): Node<NumberToVec4<TNumber>>;
    set stpq(value: Vec4OrLessOrNumber<TNumber>);
    get xywx(): Node<NumberToVec4<TNumber>>;
    set xywx(value: Vec4OrLessOrNumber<TNumber>);
    get rgar(): Node<NumberToVec4<TNumber>>;
    set rgar(value: Vec4OrLessOrNumber<TNumber>);
    get stqs(): Node<NumberToVec4<TNumber>>;
    set stqs(value: Vec4OrLessOrNumber<TNumber>);
    get xywy(): Node<NumberToVec4<TNumber>>;
    set xywy(value: Vec4OrLessOrNumber<TNumber>);
    get rgag(): Node<NumberToVec4<TNumber>>;
    set rgag(value: Vec4OrLessOrNumber<TNumber>);
    get stqt(): Node<NumberToVec4<TNumber>>;
    set stqt(value: Vec4OrLessOrNumber<TNumber>);
    get xywz(): Node<NumberToVec4<TNumber>>;
    set xywz(value: Vec4OrLessOrNumber<TNumber>);
    get rgab(): Node<NumberToVec4<TNumber>>;
    set rgab(value: Vec4OrLessOrNumber<TNumber>);
    get stqp(): Node<NumberToVec4<TNumber>>;
    set stqp(value: Vec4OrLessOrNumber<TNumber>);
    get xyww(): Node<NumberToVec4<TNumber>>;
    set xyww(value: Vec4OrLessOrNumber<TNumber>);
    get rgaa(): Node<NumberToVec4<TNumber>>;
    set rgaa(value: Vec4OrLessOrNumber<TNumber>);
    get stqq(): Node<NumberToVec4<TNumber>>;
    set stqq(value: Vec4OrLessOrNumber<TNumber>);
    get xzxw(): Node<NumberToVec4<TNumber>>;
    set xzxw(value: Vec4OrLessOrNumber<TNumber>);
    get rbra(): Node<NumberToVec4<TNumber>>;
    set rbra(value: Vec4OrLessOrNumber<TNumber>);
    get spsq(): Node<NumberToVec4<TNumber>>;
    set spsq(value: Vec4OrLessOrNumber<TNumber>);
    get xzyw(): Node<NumberToVec4<TNumber>>;
    set xzyw(value: Vec4OrLessOrNumber<TNumber>);
    get rbga(): Node<NumberToVec4<TNumber>>;
    set rbga(value: Vec4OrLessOrNumber<TNumber>);
    get sptq(): Node<NumberToVec4<TNumber>>;
    set sptq(value: Vec4OrLessOrNumber<TNumber>);
    get xzzw(): Node<NumberToVec4<TNumber>>;
    set xzzw(value: Vec4OrLessOrNumber<TNumber>);
    get rbba(): Node<NumberToVec4<TNumber>>;
    set rbba(value: Vec4OrLessOrNumber<TNumber>);
    get sppq(): Node<NumberToVec4<TNumber>>;
    set sppq(value: Vec4OrLessOrNumber<TNumber>);
    get xzwx(): Node<NumberToVec4<TNumber>>;
    set xzwx(value: Vec4OrLessOrNumber<TNumber>);
    get rbar(): Node<NumberToVec4<TNumber>>;
    set rbar(value: Vec4OrLessOrNumber<TNumber>);
    get spqs(): Node<NumberToVec4<TNumber>>;
    set spqs(value: Vec4OrLessOrNumber<TNumber>);
    get xzwy(): Node<NumberToVec4<TNumber>>;
    set xzwy(value: Vec4OrLessOrNumber<TNumber>);
    get rbag(): Node<NumberToVec4<TNumber>>;
    set rbag(value: Vec4OrLessOrNumber<TNumber>);
    get spqt(): Node<NumberToVec4<TNumber>>;
    set spqt(value: Vec4OrLessOrNumber<TNumber>);
    get xzwz(): Node<NumberToVec4<TNumber>>;
    set xzwz(value: Vec4OrLessOrNumber<TNumber>);
    get rbab(): Node<NumberToVec4<TNumber>>;
    set rbab(value: Vec4OrLessOrNumber<TNumber>);
    get spqp(): Node<NumberToVec4<TNumber>>;
    set spqp(value: Vec4OrLessOrNumber<TNumber>);
    get xzww(): Node<NumberToVec4<TNumber>>;
    set xzww(value: Vec4OrLessOrNumber<TNumber>);
    get rbaa(): Node<NumberToVec4<TNumber>>;
    set rbaa(value: Vec4OrLessOrNumber<TNumber>);
    get spqq(): Node<NumberToVec4<TNumber>>;
    set spqq(value: Vec4OrLessOrNumber<TNumber>);
    get xwxx(): Node<NumberToVec4<TNumber>>;
    set xwxx(value: Vec4OrLessOrNumber<TNumber>);
    get rarr(): Node<NumberToVec4<TNumber>>;
    set rarr(value: Vec4OrLessOrNumber<TNumber>);
    get sqss(): Node<NumberToVec4<TNumber>>;
    set sqss(value: Vec4OrLessOrNumber<TNumber>);
    get xwxy(): Node<NumberToVec4<TNumber>>;
    set xwxy(value: Vec4OrLessOrNumber<TNumber>);
    get rarg(): Node<NumberToVec4<TNumber>>;
    set rarg(value: Vec4OrLessOrNumber<TNumber>);
    get sqst(): Node<NumberToVec4<TNumber>>;
    set sqst(value: Vec4OrLessOrNumber<TNumber>);
    get xwxz(): Node<NumberToVec4<TNumber>>;
    set xwxz(value: Vec4OrLessOrNumber<TNumber>);
    get rarb(): Node<NumberToVec4<TNumber>>;
    set rarb(value: Vec4OrLessOrNumber<TNumber>);
    get sqsp(): Node<NumberToVec4<TNumber>>;
    set sqsp(value: Vec4OrLessOrNumber<TNumber>);
    get xwxw(): Node<NumberToVec4<TNumber>>;
    set xwxw(value: Vec4OrLessOrNumber<TNumber>);
    get rara(): Node<NumberToVec4<TNumber>>;
    set rara(value: Vec4OrLessOrNumber<TNumber>);
    get sqsq(): Node<NumberToVec4<TNumber>>;
    set sqsq(value: Vec4OrLessOrNumber<TNumber>);
    get xwyx(): Node<NumberToVec4<TNumber>>;
    set xwyx(value: Vec4OrLessOrNumber<TNumber>);
    get ragr(): Node<NumberToVec4<TNumber>>;
    set ragr(value: Vec4OrLessOrNumber<TNumber>);
    get sqts(): Node<NumberToVec4<TNumber>>;
    set sqts(value: Vec4OrLessOrNumber<TNumber>);
    get xwyy(): Node<NumberToVec4<TNumber>>;
    set xwyy(value: Vec4OrLessOrNumber<TNumber>);
    get ragg(): Node<NumberToVec4<TNumber>>;
    set ragg(value: Vec4OrLessOrNumber<TNumber>);
    get sqtt(): Node<NumberToVec4<TNumber>>;
    set sqtt(value: Vec4OrLessOrNumber<TNumber>);
    get xwyz(): Node<NumberToVec4<TNumber>>;
    set xwyz(value: Vec4OrLessOrNumber<TNumber>);
    get ragb(): Node<NumberToVec4<TNumber>>;
    set ragb(value: Vec4OrLessOrNumber<TNumber>);
    get sqtp(): Node<NumberToVec4<TNumber>>;
    set sqtp(value: Vec4OrLessOrNumber<TNumber>);
    get xwyw(): Node<NumberToVec4<TNumber>>;
    set xwyw(value: Vec4OrLessOrNumber<TNumber>);
    get raga(): Node<NumberToVec4<TNumber>>;
    set raga(value: Vec4OrLessOrNumber<TNumber>);
    get sqtq(): Node<NumberToVec4<TNumber>>;
    set sqtq(value: Vec4OrLessOrNumber<TNumber>);
    get xwzx(): Node<NumberToVec4<TNumber>>;
    set xwzx(value: Vec4OrLessOrNumber<TNumber>);
    get rabr(): Node<NumberToVec4<TNumber>>;
    set rabr(value: Vec4OrLessOrNumber<TNumber>);
    get sqps(): Node<NumberToVec4<TNumber>>;
    set sqps(value: Vec4OrLessOrNumber<TNumber>);
    get xwzy(): Node<NumberToVec4<TNumber>>;
    set xwzy(value: Vec4OrLessOrNumber<TNumber>);
    get rabg(): Node<NumberToVec4<TNumber>>;
    set rabg(value: Vec4OrLessOrNumber<TNumber>);
    get sqpt(): Node<NumberToVec4<TNumber>>;
    set sqpt(value: Vec4OrLessOrNumber<TNumber>);
    get xwzz(): Node<NumberToVec4<TNumber>>;
    set xwzz(value: Vec4OrLessOrNumber<TNumber>);
    get rabb(): Node<NumberToVec4<TNumber>>;
    set rabb(value: Vec4OrLessOrNumber<TNumber>);
    get sqpp(): Node<NumberToVec4<TNumber>>;
    set sqpp(value: Vec4OrLessOrNumber<TNumber>);
    get xwzw(): Node<NumberToVec4<TNumber>>;
    set xwzw(value: Vec4OrLessOrNumber<TNumber>);
    get raba(): Node<NumberToVec4<TNumber>>;
    set raba(value: Vec4OrLessOrNumber<TNumber>);
    get sqpq(): Node<NumberToVec4<TNumber>>;
    set sqpq(value: Vec4OrLessOrNumber<TNumber>);
    get xwwx(): Node<NumberToVec4<TNumber>>;
    set xwwx(value: Vec4OrLessOrNumber<TNumber>);
    get raar(): Node<NumberToVec4<TNumber>>;
    set raar(value: Vec4OrLessOrNumber<TNumber>);
    get sqqs(): Node<NumberToVec4<TNumber>>;
    set sqqs(value: Vec4OrLessOrNumber<TNumber>);
    get xwwy(): Node<NumberToVec4<TNumber>>;
    set xwwy(value: Vec4OrLessOrNumber<TNumber>);
    get raag(): Node<NumberToVec4<TNumber>>;
    set raag(value: Vec4OrLessOrNumber<TNumber>);
    get sqqt(): Node<NumberToVec4<TNumber>>;
    set sqqt(value: Vec4OrLessOrNumber<TNumber>);
    get xwwz(): Node<NumberToVec4<TNumber>>;
    set xwwz(value: Vec4OrLessOrNumber<TNumber>);
    get raab(): Node<NumberToVec4<TNumber>>;
    set raab(value: Vec4OrLessOrNumber<TNumber>);
    get sqqp(): Node<NumberToVec4<TNumber>>;
    set sqqp(value: Vec4OrLessOrNumber<TNumber>);
    get xwww(): Node<NumberToVec4<TNumber>>;
    set xwww(value: Vec4OrLessOrNumber<TNumber>);
    get raaa(): Node<NumberToVec4<TNumber>>;
    set raaa(value: Vec4OrLessOrNumber<TNumber>);
    get sqqq(): Node<NumberToVec4<TNumber>>;
    set sqqq(value: Vec4OrLessOrNumber<TNumber>);
    get yxxw(): Node<NumberToVec4<TNumber>>;
    set yxxw(value: Vec4OrLessOrNumber<TNumber>);
    get grra(): Node<NumberToVec4<TNumber>>;
    set grra(value: Vec4OrLessOrNumber<TNumber>);
    get tssq(): Node<NumberToVec4<TNumber>>;
    set tssq(value: Vec4OrLessOrNumber<TNumber>);
    get yxyw(): Node<NumberToVec4<TNumber>>;
    set yxyw(value: Vec4OrLessOrNumber<TNumber>);
    get grga(): Node<NumberToVec4<TNumber>>;
    set grga(value: Vec4OrLessOrNumber<TNumber>);
    get tstq(): Node<NumberToVec4<TNumber>>;
    set tstq(value: Vec4OrLessOrNumber<TNumber>);
    get yxzw(): Node<NumberToVec4<TNumber>>;
    set yxzw(value: Vec4OrLessOrNumber<TNumber>);
    get grba(): Node<NumberToVec4<TNumber>>;
    set grba(value: Vec4OrLessOrNumber<TNumber>);
    get tspq(): Node<NumberToVec4<TNumber>>;
    set tspq(value: Vec4OrLessOrNumber<TNumber>);
    get yxwx(): Node<NumberToVec4<TNumber>>;
    set yxwx(value: Vec4OrLessOrNumber<TNumber>);
    get grar(): Node<NumberToVec4<TNumber>>;
    set grar(value: Vec4OrLessOrNumber<TNumber>);
    get tsqs(): Node<NumberToVec4<TNumber>>;
    set tsqs(value: Vec4OrLessOrNumber<TNumber>);
    get yxwy(): Node<NumberToVec4<TNumber>>;
    set yxwy(value: Vec4OrLessOrNumber<TNumber>);
    get grag(): Node<NumberToVec4<TNumber>>;
    set grag(value: Vec4OrLessOrNumber<TNumber>);
    get tsqt(): Node<NumberToVec4<TNumber>>;
    set tsqt(value: Vec4OrLessOrNumber<TNumber>);
    get yxwz(): Node<NumberToVec4<TNumber>>;
    set yxwz(value: Vec4OrLessOrNumber<TNumber>);
    get grab(): Node<NumberToVec4<TNumber>>;
    set grab(value: Vec4OrLessOrNumber<TNumber>);
    get tsqp(): Node<NumberToVec4<TNumber>>;
    set tsqp(value: Vec4OrLessOrNumber<TNumber>);
    get yxww(): Node<NumberToVec4<TNumber>>;
    set yxww(value: Vec4OrLessOrNumber<TNumber>);
    get graa(): Node<NumberToVec4<TNumber>>;
    set graa(value: Vec4OrLessOrNumber<TNumber>);
    get tsqq(): Node<NumberToVec4<TNumber>>;
    set tsqq(value: Vec4OrLessOrNumber<TNumber>);
    get yyxw(): Node<NumberToVec4<TNumber>>;
    set yyxw(value: Vec4OrLessOrNumber<TNumber>);
    get ggra(): Node<NumberToVec4<TNumber>>;
    set ggra(value: Vec4OrLessOrNumber<TNumber>);
    get ttsq(): Node<NumberToVec4<TNumber>>;
    set ttsq(value: Vec4OrLessOrNumber<TNumber>);
    get yyyw(): Node<NumberToVec4<TNumber>>;
    set yyyw(value: Vec4OrLessOrNumber<TNumber>);
    get ggga(): Node<NumberToVec4<TNumber>>;
    set ggga(value: Vec4OrLessOrNumber<TNumber>);
    get tttq(): Node<NumberToVec4<TNumber>>;
    set tttq(value: Vec4OrLessOrNumber<TNumber>);
    get yyzw(): Node<NumberToVec4<TNumber>>;
    set yyzw(value: Vec4OrLessOrNumber<TNumber>);
    get ggba(): Node<NumberToVec4<TNumber>>;
    set ggba(value: Vec4OrLessOrNumber<TNumber>);
    get ttpq(): Node<NumberToVec4<TNumber>>;
    set ttpq(value: Vec4OrLessOrNumber<TNumber>);
    get yywx(): Node<NumberToVec4<TNumber>>;
    set yywx(value: Vec4OrLessOrNumber<TNumber>);
    get ggar(): Node<NumberToVec4<TNumber>>;
    set ggar(value: Vec4OrLessOrNumber<TNumber>);
    get ttqs(): Node<NumberToVec4<TNumber>>;
    set ttqs(value: Vec4OrLessOrNumber<TNumber>);
    get yywy(): Node<NumberToVec4<TNumber>>;
    set yywy(value: Vec4OrLessOrNumber<TNumber>);
    get ggag(): Node<NumberToVec4<TNumber>>;
    set ggag(value: Vec4OrLessOrNumber<TNumber>);
    get ttqt(): Node<NumberToVec4<TNumber>>;
    set ttqt(value: Vec4OrLessOrNumber<TNumber>);
    get yywz(): Node<NumberToVec4<TNumber>>;
    set yywz(value: Vec4OrLessOrNumber<TNumber>);
    get ggab(): Node<NumberToVec4<TNumber>>;
    set ggab(value: Vec4OrLessOrNumber<TNumber>);
    get ttqp(): Node<NumberToVec4<TNumber>>;
    set ttqp(value: Vec4OrLessOrNumber<TNumber>);
    get yyww(): Node<NumberToVec4<TNumber>>;
    set yyww(value: Vec4OrLessOrNumber<TNumber>);
    get ggaa(): Node<NumberToVec4<TNumber>>;
    set ggaa(value: Vec4OrLessOrNumber<TNumber>);
    get ttqq(): Node<NumberToVec4<TNumber>>;
    set ttqq(value: Vec4OrLessOrNumber<TNumber>);
    get yzxw(): Node<NumberToVec4<TNumber>>;
    set yzxw(value: Vec4OrLessOrNumber<TNumber>);
    get gbra(): Node<NumberToVec4<TNumber>>;
    set gbra(value: Vec4OrLessOrNumber<TNumber>);
    get tpsq(): Node<NumberToVec4<TNumber>>;
    set tpsq(value: Vec4OrLessOrNumber<TNumber>);
    get yzyw(): Node<NumberToVec4<TNumber>>;
    set yzyw(value: Vec4OrLessOrNumber<TNumber>);
    get gbga(): Node<NumberToVec4<TNumber>>;
    set gbga(value: Vec4OrLessOrNumber<TNumber>);
    get tptq(): Node<NumberToVec4<TNumber>>;
    set tptq(value: Vec4OrLessOrNumber<TNumber>);
    get yzzw(): Node<NumberToVec4<TNumber>>;
    set yzzw(value: Vec4OrLessOrNumber<TNumber>);
    get gbba(): Node<NumberToVec4<TNumber>>;
    set gbba(value: Vec4OrLessOrNumber<TNumber>);
    get tppq(): Node<NumberToVec4<TNumber>>;
    set tppq(value: Vec4OrLessOrNumber<TNumber>);
    get yzwx(): Node<NumberToVec4<TNumber>>;
    set yzwx(value: Vec4OrLessOrNumber<TNumber>);
    get gbar(): Node<NumberToVec4<TNumber>>;
    set gbar(value: Vec4OrLessOrNumber<TNumber>);
    get tpqs(): Node<NumberToVec4<TNumber>>;
    set tpqs(value: Vec4OrLessOrNumber<TNumber>);
    get yzwy(): Node<NumberToVec4<TNumber>>;
    set yzwy(value: Vec4OrLessOrNumber<TNumber>);
    get gbag(): Node<NumberToVec4<TNumber>>;
    set gbag(value: Vec4OrLessOrNumber<TNumber>);
    get tpqt(): Node<NumberToVec4<TNumber>>;
    set tpqt(value: Vec4OrLessOrNumber<TNumber>);
    get yzwz(): Node<NumberToVec4<TNumber>>;
    set yzwz(value: Vec4OrLessOrNumber<TNumber>);
    get gbab(): Node<NumberToVec4<TNumber>>;
    set gbab(value: Vec4OrLessOrNumber<TNumber>);
    get tpqp(): Node<NumberToVec4<TNumber>>;
    set tpqp(value: Vec4OrLessOrNumber<TNumber>);
    get yzww(): Node<NumberToVec4<TNumber>>;
    set yzww(value: Vec4OrLessOrNumber<TNumber>);
    get gbaa(): Node<NumberToVec4<TNumber>>;
    set gbaa(value: Vec4OrLessOrNumber<TNumber>);
    get tpqq(): Node<NumberToVec4<TNumber>>;
    set tpqq(value: Vec4OrLessOrNumber<TNumber>);
    get ywxx(): Node<NumberToVec4<TNumber>>;
    set ywxx(value: Vec4OrLessOrNumber<TNumber>);
    get garr(): Node<NumberToVec4<TNumber>>;
    set garr(value: Vec4OrLessOrNumber<TNumber>);
    get tqss(): Node<NumberToVec4<TNumber>>;
    set tqss(value: Vec4OrLessOrNumber<TNumber>);
    get ywxy(): Node<NumberToVec4<TNumber>>;
    set ywxy(value: Vec4OrLessOrNumber<TNumber>);
    get garg(): Node<NumberToVec4<TNumber>>;
    set garg(value: Vec4OrLessOrNumber<TNumber>);
    get tqst(): Node<NumberToVec4<TNumber>>;
    set tqst(value: Vec4OrLessOrNumber<TNumber>);
    get ywxz(): Node<NumberToVec4<TNumber>>;
    set ywxz(value: Vec4OrLessOrNumber<TNumber>);
    get garb(): Node<NumberToVec4<TNumber>>;
    set garb(value: Vec4OrLessOrNumber<TNumber>);
    get tqsp(): Node<NumberToVec4<TNumber>>;
    set tqsp(value: Vec4OrLessOrNumber<TNumber>);
    get ywxw(): Node<NumberToVec4<TNumber>>;
    set ywxw(value: Vec4OrLessOrNumber<TNumber>);
    get gara(): Node<NumberToVec4<TNumber>>;
    set gara(value: Vec4OrLessOrNumber<TNumber>);
    get tqsq(): Node<NumberToVec4<TNumber>>;
    set tqsq(value: Vec4OrLessOrNumber<TNumber>);
    get ywyx(): Node<NumberToVec4<TNumber>>;
    set ywyx(value: Vec4OrLessOrNumber<TNumber>);
    get gagr(): Node<NumberToVec4<TNumber>>;
    set gagr(value: Vec4OrLessOrNumber<TNumber>);
    get tqts(): Node<NumberToVec4<TNumber>>;
    set tqts(value: Vec4OrLessOrNumber<TNumber>);
    get ywyy(): Node<NumberToVec4<TNumber>>;
    set ywyy(value: Vec4OrLessOrNumber<TNumber>);
    get gagg(): Node<NumberToVec4<TNumber>>;
    set gagg(value: Vec4OrLessOrNumber<TNumber>);
    get tqtt(): Node<NumberToVec4<TNumber>>;
    set tqtt(value: Vec4OrLessOrNumber<TNumber>);
    get ywyz(): Node<NumberToVec4<TNumber>>;
    set ywyz(value: Vec4OrLessOrNumber<TNumber>);
    get gagb(): Node<NumberToVec4<TNumber>>;
    set gagb(value: Vec4OrLessOrNumber<TNumber>);
    get tqtp(): Node<NumberToVec4<TNumber>>;
    set tqtp(value: Vec4OrLessOrNumber<TNumber>);
    get ywyw(): Node<NumberToVec4<TNumber>>;
    set ywyw(value: Vec4OrLessOrNumber<TNumber>);
    get gaga(): Node<NumberToVec4<TNumber>>;
    set gaga(value: Vec4OrLessOrNumber<TNumber>);
    get tqtq(): Node<NumberToVec4<TNumber>>;
    set tqtq(value: Vec4OrLessOrNumber<TNumber>);
    get ywzx(): Node<NumberToVec4<TNumber>>;
    set ywzx(value: Vec4OrLessOrNumber<TNumber>);
    get gabr(): Node<NumberToVec4<TNumber>>;
    set gabr(value: Vec4OrLessOrNumber<TNumber>);
    get tqps(): Node<NumberToVec4<TNumber>>;
    set tqps(value: Vec4OrLessOrNumber<TNumber>);
    get ywzy(): Node<NumberToVec4<TNumber>>;
    set ywzy(value: Vec4OrLessOrNumber<TNumber>);
    get gabg(): Node<NumberToVec4<TNumber>>;
    set gabg(value: Vec4OrLessOrNumber<TNumber>);
    get tqpt(): Node<NumberToVec4<TNumber>>;
    set tqpt(value: Vec4OrLessOrNumber<TNumber>);
    get ywzz(): Node<NumberToVec4<TNumber>>;
    set ywzz(value: Vec4OrLessOrNumber<TNumber>);
    get gabb(): Node<NumberToVec4<TNumber>>;
    set gabb(value: Vec4OrLessOrNumber<TNumber>);
    get tqpp(): Node<NumberToVec4<TNumber>>;
    set tqpp(value: Vec4OrLessOrNumber<TNumber>);
    get ywzw(): Node<NumberToVec4<TNumber>>;
    set ywzw(value: Vec4OrLessOrNumber<TNumber>);
    get gaba(): Node<NumberToVec4<TNumber>>;
    set gaba(value: Vec4OrLessOrNumber<TNumber>);
    get tqpq(): Node<NumberToVec4<TNumber>>;
    set tqpq(value: Vec4OrLessOrNumber<TNumber>);
    get ywwx(): Node<NumberToVec4<TNumber>>;
    set ywwx(value: Vec4OrLessOrNumber<TNumber>);
    get gaar(): Node<NumberToVec4<TNumber>>;
    set gaar(value: Vec4OrLessOrNumber<TNumber>);
    get tqqs(): Node<NumberToVec4<TNumber>>;
    set tqqs(value: Vec4OrLessOrNumber<TNumber>);
    get ywwy(): Node<NumberToVec4<TNumber>>;
    set ywwy(value: Vec4OrLessOrNumber<TNumber>);
    get gaag(): Node<NumberToVec4<TNumber>>;
    set gaag(value: Vec4OrLessOrNumber<TNumber>);
    get tqqt(): Node<NumberToVec4<TNumber>>;
    set tqqt(value: Vec4OrLessOrNumber<TNumber>);
    get ywwz(): Node<NumberToVec4<TNumber>>;
    set ywwz(value: Vec4OrLessOrNumber<TNumber>);
    get gaab(): Node<NumberToVec4<TNumber>>;
    set gaab(value: Vec4OrLessOrNumber<TNumber>);
    get tqqp(): Node<NumberToVec4<TNumber>>;
    set tqqp(value: Vec4OrLessOrNumber<TNumber>);
    get ywww(): Node<NumberToVec4<TNumber>>;
    set ywww(value: Vec4OrLessOrNumber<TNumber>);
    get gaaa(): Node<NumberToVec4<TNumber>>;
    set gaaa(value: Vec4OrLessOrNumber<TNumber>);
    get tqqq(): Node<NumberToVec4<TNumber>>;
    set tqqq(value: Vec4OrLessOrNumber<TNumber>);
    get zxxw(): Node<NumberToVec4<TNumber>>;
    set zxxw(value: Vec4OrLessOrNumber<TNumber>);
    get brra(): Node<NumberToVec4<TNumber>>;
    set brra(value: Vec4OrLessOrNumber<TNumber>);
    get pssq(): Node<NumberToVec4<TNumber>>;
    set pssq(value: Vec4OrLessOrNumber<TNumber>);
    get zxyw(): Node<NumberToVec4<TNumber>>;
    set zxyw(value: Vec4OrLessOrNumber<TNumber>);
    get brga(): Node<NumberToVec4<TNumber>>;
    set brga(value: Vec4OrLessOrNumber<TNumber>);
    get pstq(): Node<NumberToVec4<TNumber>>;
    set pstq(value: Vec4OrLessOrNumber<TNumber>);
    get zxzw(): Node<NumberToVec4<TNumber>>;
    set zxzw(value: Vec4OrLessOrNumber<TNumber>);
    get brba(): Node<NumberToVec4<TNumber>>;
    set brba(value: Vec4OrLessOrNumber<TNumber>);
    get pspq(): Node<NumberToVec4<TNumber>>;
    set pspq(value: Vec4OrLessOrNumber<TNumber>);
    get zxwx(): Node<NumberToVec4<TNumber>>;
    set zxwx(value: Vec4OrLessOrNumber<TNumber>);
    get brar(): Node<NumberToVec4<TNumber>>;
    set brar(value: Vec4OrLessOrNumber<TNumber>);
    get psqs(): Node<NumberToVec4<TNumber>>;
    set psqs(value: Vec4OrLessOrNumber<TNumber>);
    get zxwy(): Node<NumberToVec4<TNumber>>;
    set zxwy(value: Vec4OrLessOrNumber<TNumber>);
    get brag(): Node<NumberToVec4<TNumber>>;
    set brag(value: Vec4OrLessOrNumber<TNumber>);
    get psqt(): Node<NumberToVec4<TNumber>>;
    set psqt(value: Vec4OrLessOrNumber<TNumber>);
    get zxwz(): Node<NumberToVec4<TNumber>>;
    set zxwz(value: Vec4OrLessOrNumber<TNumber>);
    get brab(): Node<NumberToVec4<TNumber>>;
    set brab(value: Vec4OrLessOrNumber<TNumber>);
    get psqp(): Node<NumberToVec4<TNumber>>;
    set psqp(value: Vec4OrLessOrNumber<TNumber>);
    get zxww(): Node<NumberToVec4<TNumber>>;
    set zxww(value: Vec4OrLessOrNumber<TNumber>);
    get braa(): Node<NumberToVec4<TNumber>>;
    set braa(value: Vec4OrLessOrNumber<TNumber>);
    get psqq(): Node<NumberToVec4<TNumber>>;
    set psqq(value: Vec4OrLessOrNumber<TNumber>);
    get zyxw(): Node<NumberToVec4<TNumber>>;
    set zyxw(value: Vec4OrLessOrNumber<TNumber>);
    get bgra(): Node<NumberToVec4<TNumber>>;
    set bgra(value: Vec4OrLessOrNumber<TNumber>);
    get ptsq(): Node<NumberToVec4<TNumber>>;
    set ptsq(value: Vec4OrLessOrNumber<TNumber>);
    get zyyw(): Node<NumberToVec4<TNumber>>;
    set zyyw(value: Vec4OrLessOrNumber<TNumber>);
    get bgga(): Node<NumberToVec4<TNumber>>;
    set bgga(value: Vec4OrLessOrNumber<TNumber>);
    get pttq(): Node<NumberToVec4<TNumber>>;
    set pttq(value: Vec4OrLessOrNumber<TNumber>);
    get zyzw(): Node<NumberToVec4<TNumber>>;
    set zyzw(value: Vec4OrLessOrNumber<TNumber>);
    get bgba(): Node<NumberToVec4<TNumber>>;
    set bgba(value: Vec4OrLessOrNumber<TNumber>);
    get ptpq(): Node<NumberToVec4<TNumber>>;
    set ptpq(value: Vec4OrLessOrNumber<TNumber>);
    get zywx(): Node<NumberToVec4<TNumber>>;
    set zywx(value: Vec4OrLessOrNumber<TNumber>);
    get bgar(): Node<NumberToVec4<TNumber>>;
    set bgar(value: Vec4OrLessOrNumber<TNumber>);
    get ptqs(): Node<NumberToVec4<TNumber>>;
    set ptqs(value: Vec4OrLessOrNumber<TNumber>);
    get zywy(): Node<NumberToVec4<TNumber>>;
    set zywy(value: Vec4OrLessOrNumber<TNumber>);
    get bgag(): Node<NumberToVec4<TNumber>>;
    set bgag(value: Vec4OrLessOrNumber<TNumber>);
    get ptqt(): Node<NumberToVec4<TNumber>>;
    set ptqt(value: Vec4OrLessOrNumber<TNumber>);
    get zywz(): Node<NumberToVec4<TNumber>>;
    set zywz(value: Vec4OrLessOrNumber<TNumber>);
    get bgab(): Node<NumberToVec4<TNumber>>;
    set bgab(value: Vec4OrLessOrNumber<TNumber>);
    get ptqp(): Node<NumberToVec4<TNumber>>;
    set ptqp(value: Vec4OrLessOrNumber<TNumber>);
    get zyww(): Node<NumberToVec4<TNumber>>;
    set zyww(value: Vec4OrLessOrNumber<TNumber>);
    get bgaa(): Node<NumberToVec4<TNumber>>;
    set bgaa(value: Vec4OrLessOrNumber<TNumber>);
    get ptqq(): Node<NumberToVec4<TNumber>>;
    set ptqq(value: Vec4OrLessOrNumber<TNumber>);
    get zzxw(): Node<NumberToVec4<TNumber>>;
    set zzxw(value: Vec4OrLessOrNumber<TNumber>);
    get bbra(): Node<NumberToVec4<TNumber>>;
    set bbra(value: Vec4OrLessOrNumber<TNumber>);
    get ppsq(): Node<NumberToVec4<TNumber>>;
    set ppsq(value: Vec4OrLessOrNumber<TNumber>);
    get zzyw(): Node<NumberToVec4<TNumber>>;
    set zzyw(value: Vec4OrLessOrNumber<TNumber>);
    get bbga(): Node<NumberToVec4<TNumber>>;
    set bbga(value: Vec4OrLessOrNumber<TNumber>);
    get pptq(): Node<NumberToVec4<TNumber>>;
    set pptq(value: Vec4OrLessOrNumber<TNumber>);
    get zzzw(): Node<NumberToVec4<TNumber>>;
    set zzzw(value: Vec4OrLessOrNumber<TNumber>);
    get bbba(): Node<NumberToVec4<TNumber>>;
    set bbba(value: Vec4OrLessOrNumber<TNumber>);
    get pppq(): Node<NumberToVec4<TNumber>>;
    set pppq(value: Vec4OrLessOrNumber<TNumber>);
    get zzwx(): Node<NumberToVec4<TNumber>>;
    set zzwx(value: Vec4OrLessOrNumber<TNumber>);
    get bbar(): Node<NumberToVec4<TNumber>>;
    set bbar(value: Vec4OrLessOrNumber<TNumber>);
    get ppqs(): Node<NumberToVec4<TNumber>>;
    set ppqs(value: Vec4OrLessOrNumber<TNumber>);
    get zzwy(): Node<NumberToVec4<TNumber>>;
    set zzwy(value: Vec4OrLessOrNumber<TNumber>);
    get bbag(): Node<NumberToVec4<TNumber>>;
    set bbag(value: Vec4OrLessOrNumber<TNumber>);
    get ppqt(): Node<NumberToVec4<TNumber>>;
    set ppqt(value: Vec4OrLessOrNumber<TNumber>);
    get zzwz(): Node<NumberToVec4<TNumber>>;
    set zzwz(value: Vec4OrLessOrNumber<TNumber>);
    get bbab(): Node<NumberToVec4<TNumber>>;
    set bbab(value: Vec4OrLessOrNumber<TNumber>);
    get ppqp(): Node<NumberToVec4<TNumber>>;
    set ppqp(value: Vec4OrLessOrNumber<TNumber>);
    get zzww(): Node<NumberToVec4<TNumber>>;
    set zzww(value: Vec4OrLessOrNumber<TNumber>);
    get bbaa(): Node<NumberToVec4<TNumber>>;
    set bbaa(value: Vec4OrLessOrNumber<TNumber>);
    get ppqq(): Node<NumberToVec4<TNumber>>;
    set ppqq(value: Vec4OrLessOrNumber<TNumber>);
    get zwxx(): Node<NumberToVec4<TNumber>>;
    set zwxx(value: Vec4OrLessOrNumber<TNumber>);
    get barr(): Node<NumberToVec4<TNumber>>;
    set barr(value: Vec4OrLessOrNumber<TNumber>);
    get pqss(): Node<NumberToVec4<TNumber>>;
    set pqss(value: Vec4OrLessOrNumber<TNumber>);
    get zwxy(): Node<NumberToVec4<TNumber>>;
    set zwxy(value: Vec4OrLessOrNumber<TNumber>);
    get barg(): Node<NumberToVec4<TNumber>>;
    set barg(value: Vec4OrLessOrNumber<TNumber>);
    get pqst(): Node<NumberToVec4<TNumber>>;
    set pqst(value: Vec4OrLessOrNumber<TNumber>);
    get zwxz(): Node<NumberToVec4<TNumber>>;
    set zwxz(value: Vec4OrLessOrNumber<TNumber>);
    get barb(): Node<NumberToVec4<TNumber>>;
    set barb(value: Vec4OrLessOrNumber<TNumber>);
    get pqsp(): Node<NumberToVec4<TNumber>>;
    set pqsp(value: Vec4OrLessOrNumber<TNumber>);
    get zwxw(): Node<NumberToVec4<TNumber>>;
    set zwxw(value: Vec4OrLessOrNumber<TNumber>);
    get bara(): Node<NumberToVec4<TNumber>>;
    set bara(value: Vec4OrLessOrNumber<TNumber>);
    get pqsq(): Node<NumberToVec4<TNumber>>;
    set pqsq(value: Vec4OrLessOrNumber<TNumber>);
    get zwyx(): Node<NumberToVec4<TNumber>>;
    set zwyx(value: Vec4OrLessOrNumber<TNumber>);
    get bagr(): Node<NumberToVec4<TNumber>>;
    set bagr(value: Vec4OrLessOrNumber<TNumber>);
    get pqts(): Node<NumberToVec4<TNumber>>;
    set pqts(value: Vec4OrLessOrNumber<TNumber>);
    get zwyy(): Node<NumberToVec4<TNumber>>;
    set zwyy(value: Vec4OrLessOrNumber<TNumber>);
    get bagg(): Node<NumberToVec4<TNumber>>;
    set bagg(value: Vec4OrLessOrNumber<TNumber>);
    get pqtt(): Node<NumberToVec4<TNumber>>;
    set pqtt(value: Vec4OrLessOrNumber<TNumber>);
    get zwyz(): Node<NumberToVec4<TNumber>>;
    set zwyz(value: Vec4OrLessOrNumber<TNumber>);
    get bagb(): Node<NumberToVec4<TNumber>>;
    set bagb(value: Vec4OrLessOrNumber<TNumber>);
    get pqtp(): Node<NumberToVec4<TNumber>>;
    set pqtp(value: Vec4OrLessOrNumber<TNumber>);
    get zwyw(): Node<NumberToVec4<TNumber>>;
    set zwyw(value: Vec4OrLessOrNumber<TNumber>);
    get baga(): Node<NumberToVec4<TNumber>>;
    set baga(value: Vec4OrLessOrNumber<TNumber>);
    get pqtq(): Node<NumberToVec4<TNumber>>;
    set pqtq(value: Vec4OrLessOrNumber<TNumber>);
    get zwzx(): Node<NumberToVec4<TNumber>>;
    set zwzx(value: Vec4OrLessOrNumber<TNumber>);
    get babr(): Node<NumberToVec4<TNumber>>;
    set babr(value: Vec4OrLessOrNumber<TNumber>);
    get pqps(): Node<NumberToVec4<TNumber>>;
    set pqps(value: Vec4OrLessOrNumber<TNumber>);
    get zwzy(): Node<NumberToVec4<TNumber>>;
    set zwzy(value: Vec4OrLessOrNumber<TNumber>);
    get babg(): Node<NumberToVec4<TNumber>>;
    set babg(value: Vec4OrLessOrNumber<TNumber>);
    get pqpt(): Node<NumberToVec4<TNumber>>;
    set pqpt(value: Vec4OrLessOrNumber<TNumber>);
    get zwzz(): Node<NumberToVec4<TNumber>>;
    set zwzz(value: Vec4OrLessOrNumber<TNumber>);
    get babb(): Node<NumberToVec4<TNumber>>;
    set babb(value: Vec4OrLessOrNumber<TNumber>);
    get pqpp(): Node<NumberToVec4<TNumber>>;
    set pqpp(value: Vec4OrLessOrNumber<TNumber>);
    get zwzw(): Node<NumberToVec4<TNumber>>;
    set zwzw(value: Vec4OrLessOrNumber<TNumber>);
    get baba(): Node<NumberToVec4<TNumber>>;
    set baba(value: Vec4OrLessOrNumber<TNumber>);
    get pqpq(): Node<NumberToVec4<TNumber>>;
    set pqpq(value: Vec4OrLessOrNumber<TNumber>);
    get zwwx(): Node<NumberToVec4<TNumber>>;
    set zwwx(value: Vec4OrLessOrNumber<TNumber>);
    get baar(): Node<NumberToVec4<TNumber>>;
    set baar(value: Vec4OrLessOrNumber<TNumber>);
    get pqqs(): Node<NumberToVec4<TNumber>>;
    set pqqs(value: Vec4OrLessOrNumber<TNumber>);
    get zwwy(): Node<NumberToVec4<TNumber>>;
    set zwwy(value: Vec4OrLessOrNumber<TNumber>);
    get baag(): Node<NumberToVec4<TNumber>>;
    set baag(value: Vec4OrLessOrNumber<TNumber>);
    get pqqt(): Node<NumberToVec4<TNumber>>;
    set pqqt(value: Vec4OrLessOrNumber<TNumber>);
    get zwwz(): Node<NumberToVec4<TNumber>>;
    set zwwz(value: Vec4OrLessOrNumber<TNumber>);
    get baab(): Node<NumberToVec4<TNumber>>;
    set baab(value: Vec4OrLessOrNumber<TNumber>);
    get pqqp(): Node<NumberToVec4<TNumber>>;
    set pqqp(value: Vec4OrLessOrNumber<TNumber>);
    get zwww(): Node<NumberToVec4<TNumber>>;
    set zwww(value: Vec4OrLessOrNumber<TNumber>);
    get baaa(): Node<NumberToVec4<TNumber>>;
    set baaa(value: Vec4OrLessOrNumber<TNumber>);
    get pqqq(): Node<NumberToVec4<TNumber>>;
    set pqqq(value: Vec4OrLessOrNumber<TNumber>);
    get wxxx(): Node<NumberToVec4<TNumber>>;
    set wxxx(value: Vec4OrLessOrNumber<TNumber>);
    get arrr(): Node<NumberToVec4<TNumber>>;
    set arrr(value: Vec4OrLessOrNumber<TNumber>);
    get qsss(): Node<NumberToVec4<TNumber>>;
    set qsss(value: Vec4OrLessOrNumber<TNumber>);
    get wxxy(): Node<NumberToVec4<TNumber>>;
    set wxxy(value: Vec4OrLessOrNumber<TNumber>);
    get arrg(): Node<NumberToVec4<TNumber>>;
    set arrg(value: Vec4OrLessOrNumber<TNumber>);
    get qsst(): Node<NumberToVec4<TNumber>>;
    set qsst(value: Vec4OrLessOrNumber<TNumber>);
    get wxxz(): Node<NumberToVec4<TNumber>>;
    set wxxz(value: Vec4OrLessOrNumber<TNumber>);
    get arrb(): Node<NumberToVec4<TNumber>>;
    set arrb(value: Vec4OrLessOrNumber<TNumber>);
    get qssp(): Node<NumberToVec4<TNumber>>;
    set qssp(value: Vec4OrLessOrNumber<TNumber>);
    get wxxw(): Node<NumberToVec4<TNumber>>;
    set wxxw(value: Vec4OrLessOrNumber<TNumber>);
    get arra(): Node<NumberToVec4<TNumber>>;
    set arra(value: Vec4OrLessOrNumber<TNumber>);
    get qssq(): Node<NumberToVec4<TNumber>>;
    set qssq(value: Vec4OrLessOrNumber<TNumber>);
    get wxyx(): Node<NumberToVec4<TNumber>>;
    set wxyx(value: Vec4OrLessOrNumber<TNumber>);
    get argr(): Node<NumberToVec4<TNumber>>;
    set argr(value: Vec4OrLessOrNumber<TNumber>);
    get qsts(): Node<NumberToVec4<TNumber>>;
    set qsts(value: Vec4OrLessOrNumber<TNumber>);
    get wxyy(): Node<NumberToVec4<TNumber>>;
    set wxyy(value: Vec4OrLessOrNumber<TNumber>);
    get argg(): Node<NumberToVec4<TNumber>>;
    set argg(value: Vec4OrLessOrNumber<TNumber>);
    get qstt(): Node<NumberToVec4<TNumber>>;
    set qstt(value: Vec4OrLessOrNumber<TNumber>);
    get wxyz(): Node<NumberToVec4<TNumber>>;
    set wxyz(value: Vec4OrLessOrNumber<TNumber>);
    get argb(): Node<NumberToVec4<TNumber>>;
    set argb(value: Vec4OrLessOrNumber<TNumber>);
    get qstp(): Node<NumberToVec4<TNumber>>;
    set qstp(value: Vec4OrLessOrNumber<TNumber>);
    get wxyw(): Node<NumberToVec4<TNumber>>;
    set wxyw(value: Vec4OrLessOrNumber<TNumber>);
    get arga(): Node<NumberToVec4<TNumber>>;
    set arga(value: Vec4OrLessOrNumber<TNumber>);
    get qstq(): Node<NumberToVec4<TNumber>>;
    set qstq(value: Vec4OrLessOrNumber<TNumber>);
    get wxzx(): Node<NumberToVec4<TNumber>>;
    set wxzx(value: Vec4OrLessOrNumber<TNumber>);
    get arbr(): Node<NumberToVec4<TNumber>>;
    set arbr(value: Vec4OrLessOrNumber<TNumber>);
    get qsps(): Node<NumberToVec4<TNumber>>;
    set qsps(value: Vec4OrLessOrNumber<TNumber>);
    get wxzy(): Node<NumberToVec4<TNumber>>;
    set wxzy(value: Vec4OrLessOrNumber<TNumber>);
    get arbg(): Node<NumberToVec4<TNumber>>;
    set arbg(value: Vec4OrLessOrNumber<TNumber>);
    get qspt(): Node<NumberToVec4<TNumber>>;
    set qspt(value: Vec4OrLessOrNumber<TNumber>);
    get wxzz(): Node<NumberToVec4<TNumber>>;
    set wxzz(value: Vec4OrLessOrNumber<TNumber>);
    get arbb(): Node<NumberToVec4<TNumber>>;
    set arbb(value: Vec4OrLessOrNumber<TNumber>);
    get qspp(): Node<NumberToVec4<TNumber>>;
    set qspp(value: Vec4OrLessOrNumber<TNumber>);
    get wxzw(): Node<NumberToVec4<TNumber>>;
    set wxzw(value: Vec4OrLessOrNumber<TNumber>);
    get arba(): Node<NumberToVec4<TNumber>>;
    set arba(value: Vec4OrLessOrNumber<TNumber>);
    get qspq(): Node<NumberToVec4<TNumber>>;
    set qspq(value: Vec4OrLessOrNumber<TNumber>);
    get wxwx(): Node<NumberToVec4<TNumber>>;
    set wxwx(value: Vec4OrLessOrNumber<TNumber>);
    get arar(): Node<NumberToVec4<TNumber>>;
    set arar(value: Vec4OrLessOrNumber<TNumber>);
    get qsqs(): Node<NumberToVec4<TNumber>>;
    set qsqs(value: Vec4OrLessOrNumber<TNumber>);
    get wxwy(): Node<NumberToVec4<TNumber>>;
    set wxwy(value: Vec4OrLessOrNumber<TNumber>);
    get arag(): Node<NumberToVec4<TNumber>>;
    set arag(value: Vec4OrLessOrNumber<TNumber>);
    get qsqt(): Node<NumberToVec4<TNumber>>;
    set qsqt(value: Vec4OrLessOrNumber<TNumber>);
    get wxwz(): Node<NumberToVec4<TNumber>>;
    set wxwz(value: Vec4OrLessOrNumber<TNumber>);
    get arab(): Node<NumberToVec4<TNumber>>;
    set arab(value: Vec4OrLessOrNumber<TNumber>);
    get qsqp(): Node<NumberToVec4<TNumber>>;
    set qsqp(value: Vec4OrLessOrNumber<TNumber>);
    get wxww(): Node<NumberToVec4<TNumber>>;
    set wxww(value: Vec4OrLessOrNumber<TNumber>);
    get araa(): Node<NumberToVec4<TNumber>>;
    set araa(value: Vec4OrLessOrNumber<TNumber>);
    get qsqq(): Node<NumberToVec4<TNumber>>;
    set qsqq(value: Vec4OrLessOrNumber<TNumber>);
    get wyxx(): Node<NumberToVec4<TNumber>>;
    set wyxx(value: Vec4OrLessOrNumber<TNumber>);
    get agrr(): Node<NumberToVec4<TNumber>>;
    set agrr(value: Vec4OrLessOrNumber<TNumber>);
    get qtss(): Node<NumberToVec4<TNumber>>;
    set qtss(value: Vec4OrLessOrNumber<TNumber>);
    get wyxy(): Node<NumberToVec4<TNumber>>;
    set wyxy(value: Vec4OrLessOrNumber<TNumber>);
    get agrg(): Node<NumberToVec4<TNumber>>;
    set agrg(value: Vec4OrLessOrNumber<TNumber>);
    get qtst(): Node<NumberToVec4<TNumber>>;
    set qtst(value: Vec4OrLessOrNumber<TNumber>);
    get wyxz(): Node<NumberToVec4<TNumber>>;
    set wyxz(value: Vec4OrLessOrNumber<TNumber>);
    get agrb(): Node<NumberToVec4<TNumber>>;
    set agrb(value: Vec4OrLessOrNumber<TNumber>);
    get qtsp(): Node<NumberToVec4<TNumber>>;
    set qtsp(value: Vec4OrLessOrNumber<TNumber>);
    get wyxw(): Node<NumberToVec4<TNumber>>;
    set wyxw(value: Vec4OrLessOrNumber<TNumber>);
    get agra(): Node<NumberToVec4<TNumber>>;
    set agra(value: Vec4OrLessOrNumber<TNumber>);
    get qtsq(): Node<NumberToVec4<TNumber>>;
    set qtsq(value: Vec4OrLessOrNumber<TNumber>);
    get wyyx(): Node<NumberToVec4<TNumber>>;
    set wyyx(value: Vec4OrLessOrNumber<TNumber>);
    get aggr(): Node<NumberToVec4<TNumber>>;
    set aggr(value: Vec4OrLessOrNumber<TNumber>);
    get qtts(): Node<NumberToVec4<TNumber>>;
    set qtts(value: Vec4OrLessOrNumber<TNumber>);
    get wyyy(): Node<NumberToVec4<TNumber>>;
    set wyyy(value: Vec4OrLessOrNumber<TNumber>);
    get aggg(): Node<NumberToVec4<TNumber>>;
    set aggg(value: Vec4OrLessOrNumber<TNumber>);
    get qttt(): Node<NumberToVec4<TNumber>>;
    set qttt(value: Vec4OrLessOrNumber<TNumber>);
    get wyyz(): Node<NumberToVec4<TNumber>>;
    set wyyz(value: Vec4OrLessOrNumber<TNumber>);
    get aggb(): Node<NumberToVec4<TNumber>>;
    set aggb(value: Vec4OrLessOrNumber<TNumber>);
    get qttp(): Node<NumberToVec4<TNumber>>;
    set qttp(value: Vec4OrLessOrNumber<TNumber>);
    get wyyw(): Node<NumberToVec4<TNumber>>;
    set wyyw(value: Vec4OrLessOrNumber<TNumber>);
    get agga(): Node<NumberToVec4<TNumber>>;
    set agga(value: Vec4OrLessOrNumber<TNumber>);
    get qttq(): Node<NumberToVec4<TNumber>>;
    set qttq(value: Vec4OrLessOrNumber<TNumber>);
    get wyzx(): Node<NumberToVec4<TNumber>>;
    set wyzx(value: Vec4OrLessOrNumber<TNumber>);
    get agbr(): Node<NumberToVec4<TNumber>>;
    set agbr(value: Vec4OrLessOrNumber<TNumber>);
    get qtps(): Node<NumberToVec4<TNumber>>;
    set qtps(value: Vec4OrLessOrNumber<TNumber>);
    get wyzy(): Node<NumberToVec4<TNumber>>;
    set wyzy(value: Vec4OrLessOrNumber<TNumber>);
    get agbg(): Node<NumberToVec4<TNumber>>;
    set agbg(value: Vec4OrLessOrNumber<TNumber>);
    get qtpt(): Node<NumberToVec4<TNumber>>;
    set qtpt(value: Vec4OrLessOrNumber<TNumber>);
    get wyzz(): Node<NumberToVec4<TNumber>>;
    set wyzz(value: Vec4OrLessOrNumber<TNumber>);
    get agbb(): Node<NumberToVec4<TNumber>>;
    set agbb(value: Vec4OrLessOrNumber<TNumber>);
    get qtpp(): Node<NumberToVec4<TNumber>>;
    set qtpp(value: Vec4OrLessOrNumber<TNumber>);
    get wyzw(): Node<NumberToVec4<TNumber>>;
    set wyzw(value: Vec4OrLessOrNumber<TNumber>);
    get agba(): Node<NumberToVec4<TNumber>>;
    set agba(value: Vec4OrLessOrNumber<TNumber>);
    get qtpq(): Node<NumberToVec4<TNumber>>;
    set qtpq(value: Vec4OrLessOrNumber<TNumber>);
    get wywx(): Node<NumberToVec4<TNumber>>;
    set wywx(value: Vec4OrLessOrNumber<TNumber>);
    get agar(): Node<NumberToVec4<TNumber>>;
    set agar(value: Vec4OrLessOrNumber<TNumber>);
    get qtqs(): Node<NumberToVec4<TNumber>>;
    set qtqs(value: Vec4OrLessOrNumber<TNumber>);
    get wywy(): Node<NumberToVec4<TNumber>>;
    set wywy(value: Vec4OrLessOrNumber<TNumber>);
    get agag(): Node<NumberToVec4<TNumber>>;
    set agag(value: Vec4OrLessOrNumber<TNumber>);
    get qtqt(): Node<NumberToVec4<TNumber>>;
    set qtqt(value: Vec4OrLessOrNumber<TNumber>);
    get wywz(): Node<NumberToVec4<TNumber>>;
    set wywz(value: Vec4OrLessOrNumber<TNumber>);
    get agab(): Node<NumberToVec4<TNumber>>;
    set agab(value: Vec4OrLessOrNumber<TNumber>);
    get qtqp(): Node<NumberToVec4<TNumber>>;
    set qtqp(value: Vec4OrLessOrNumber<TNumber>);
    get wyww(): Node<NumberToVec4<TNumber>>;
    set wyww(value: Vec4OrLessOrNumber<TNumber>);
    get agaa(): Node<NumberToVec4<TNumber>>;
    set agaa(value: Vec4OrLessOrNumber<TNumber>);
    get qtqq(): Node<NumberToVec4<TNumber>>;
    set qtqq(value: Vec4OrLessOrNumber<TNumber>);
    get wzxx(): Node<NumberToVec4<TNumber>>;
    set wzxx(value: Vec4OrLessOrNumber<TNumber>);
    get abrr(): Node<NumberToVec4<TNumber>>;
    set abrr(value: Vec4OrLessOrNumber<TNumber>);
    get qpss(): Node<NumberToVec4<TNumber>>;
    set qpss(value: Vec4OrLessOrNumber<TNumber>);
    get wzxy(): Node<NumberToVec4<TNumber>>;
    set wzxy(value: Vec4OrLessOrNumber<TNumber>);
    get abrg(): Node<NumberToVec4<TNumber>>;
    set abrg(value: Vec4OrLessOrNumber<TNumber>);
    get qpst(): Node<NumberToVec4<TNumber>>;
    set qpst(value: Vec4OrLessOrNumber<TNumber>);
    get wzxz(): Node<NumberToVec4<TNumber>>;
    set wzxz(value: Vec4OrLessOrNumber<TNumber>);
    get abrb(): Node<NumberToVec4<TNumber>>;
    set abrb(value: Vec4OrLessOrNumber<TNumber>);
    get qpsp(): Node<NumberToVec4<TNumber>>;
    set qpsp(value: Vec4OrLessOrNumber<TNumber>);
    get wzxw(): Node<NumberToVec4<TNumber>>;
    set wzxw(value: Vec4OrLessOrNumber<TNumber>);
    get abra(): Node<NumberToVec4<TNumber>>;
    set abra(value: Vec4OrLessOrNumber<TNumber>);
    get qpsq(): Node<NumberToVec4<TNumber>>;
    set qpsq(value: Vec4OrLessOrNumber<TNumber>);
    get wzyx(): Node<NumberToVec4<TNumber>>;
    set wzyx(value: Vec4OrLessOrNumber<TNumber>);
    get abgr(): Node<NumberToVec4<TNumber>>;
    set abgr(value: Vec4OrLessOrNumber<TNumber>);
    get qpts(): Node<NumberToVec4<TNumber>>;
    set qpts(value: Vec4OrLessOrNumber<TNumber>);
    get wzyy(): Node<NumberToVec4<TNumber>>;
    set wzyy(value: Vec4OrLessOrNumber<TNumber>);
    get abgg(): Node<NumberToVec4<TNumber>>;
    set abgg(value: Vec4OrLessOrNumber<TNumber>);
    get qptt(): Node<NumberToVec4<TNumber>>;
    set qptt(value: Vec4OrLessOrNumber<TNumber>);
    get wzyz(): Node<NumberToVec4<TNumber>>;
    set wzyz(value: Vec4OrLessOrNumber<TNumber>);
    get abgb(): Node<NumberToVec4<TNumber>>;
    set abgb(value: Vec4OrLessOrNumber<TNumber>);
    get qptp(): Node<NumberToVec4<TNumber>>;
    set qptp(value: Vec4OrLessOrNumber<TNumber>);
    get wzyw(): Node<NumberToVec4<TNumber>>;
    set wzyw(value: Vec4OrLessOrNumber<TNumber>);
    get abga(): Node<NumberToVec4<TNumber>>;
    set abga(value: Vec4OrLessOrNumber<TNumber>);
    get qptq(): Node<NumberToVec4<TNumber>>;
    set qptq(value: Vec4OrLessOrNumber<TNumber>);
    get wzzx(): Node<NumberToVec4<TNumber>>;
    set wzzx(value: Vec4OrLessOrNumber<TNumber>);
    get abbr(): Node<NumberToVec4<TNumber>>;
    set abbr(value: Vec4OrLessOrNumber<TNumber>);
    get qpps(): Node<NumberToVec4<TNumber>>;
    set qpps(value: Vec4OrLessOrNumber<TNumber>);
    get wzzy(): Node<NumberToVec4<TNumber>>;
    set wzzy(value: Vec4OrLessOrNumber<TNumber>);
    get abbg(): Node<NumberToVec4<TNumber>>;
    set abbg(value: Vec4OrLessOrNumber<TNumber>);
    get qppt(): Node<NumberToVec4<TNumber>>;
    set qppt(value: Vec4OrLessOrNumber<TNumber>);
    get wzzz(): Node<NumberToVec4<TNumber>>;
    set wzzz(value: Vec4OrLessOrNumber<TNumber>);
    get abbb(): Node<NumberToVec4<TNumber>>;
    set abbb(value: Vec4OrLessOrNumber<TNumber>);
    get qppp(): Node<NumberToVec4<TNumber>>;
    set qppp(value: Vec4OrLessOrNumber<TNumber>);
    get wzzw(): Node<NumberToVec4<TNumber>>;
    set wzzw(value: Vec4OrLessOrNumber<TNumber>);
    get abba(): Node<NumberToVec4<TNumber>>;
    set abba(value: Vec4OrLessOrNumber<TNumber>);
    get qppq(): Node<NumberToVec4<TNumber>>;
    set qppq(value: Vec4OrLessOrNumber<TNumber>);
    get wzwx(): Node<NumberToVec4<TNumber>>;
    set wzwx(value: Vec4OrLessOrNumber<TNumber>);
    get abar(): Node<NumberToVec4<TNumber>>;
    set abar(value: Vec4OrLessOrNumber<TNumber>);
    get qpqs(): Node<NumberToVec4<TNumber>>;
    set qpqs(value: Vec4OrLessOrNumber<TNumber>);
    get wzwy(): Node<NumberToVec4<TNumber>>;
    set wzwy(value: Vec4OrLessOrNumber<TNumber>);
    get abag(): Node<NumberToVec4<TNumber>>;
    set abag(value: Vec4OrLessOrNumber<TNumber>);
    get qpqt(): Node<NumberToVec4<TNumber>>;
    set qpqt(value: Vec4OrLessOrNumber<TNumber>);
    get wzwz(): Node<NumberToVec4<TNumber>>;
    set wzwz(value: Vec4OrLessOrNumber<TNumber>);
    get abab(): Node<NumberToVec4<TNumber>>;
    set abab(value: Vec4OrLessOrNumber<TNumber>);
    get qpqp(): Node<NumberToVec4<TNumber>>;
    set qpqp(value: Vec4OrLessOrNumber<TNumber>);
    get wzww(): Node<NumberToVec4<TNumber>>;
    set wzww(value: Vec4OrLessOrNumber<TNumber>);
    get abaa(): Node<NumberToVec4<TNumber>>;
    set abaa(value: Vec4OrLessOrNumber<TNumber>);
    get qpqq(): Node<NumberToVec4<TNumber>>;
    set qpqq(value: Vec4OrLessOrNumber<TNumber>);
    get wwxx(): Node<NumberToVec4<TNumber>>;
    set wwxx(value: Vec4OrLessOrNumber<TNumber>);
    get aarr(): Node<NumberToVec4<TNumber>>;
    set aarr(value: Vec4OrLessOrNumber<TNumber>);
    get qqss(): Node<NumberToVec4<TNumber>>;
    set qqss(value: Vec4OrLessOrNumber<TNumber>);
    get wwxy(): Node<NumberToVec4<TNumber>>;
    set wwxy(value: Vec4OrLessOrNumber<TNumber>);
    get aarg(): Node<NumberToVec4<TNumber>>;
    set aarg(value: Vec4OrLessOrNumber<TNumber>);
    get qqst(): Node<NumberToVec4<TNumber>>;
    set qqst(value: Vec4OrLessOrNumber<TNumber>);
    get wwxz(): Node<NumberToVec4<TNumber>>;
    set wwxz(value: Vec4OrLessOrNumber<TNumber>);
    get aarb(): Node<NumberToVec4<TNumber>>;
    set aarb(value: Vec4OrLessOrNumber<TNumber>);
    get qqsp(): Node<NumberToVec4<TNumber>>;
    set qqsp(value: Vec4OrLessOrNumber<TNumber>);
    get wwxw(): Node<NumberToVec4<TNumber>>;
    set wwxw(value: Vec4OrLessOrNumber<TNumber>);
    get aara(): Node<NumberToVec4<TNumber>>;
    set aara(value: Vec4OrLessOrNumber<TNumber>);
    get qqsq(): Node<NumberToVec4<TNumber>>;
    set qqsq(value: Vec4OrLessOrNumber<TNumber>);
    get wwyx(): Node<NumberToVec4<TNumber>>;
    set wwyx(value: Vec4OrLessOrNumber<TNumber>);
    get aagr(): Node<NumberToVec4<TNumber>>;
    set aagr(value: Vec4OrLessOrNumber<TNumber>);
    get qqts(): Node<NumberToVec4<TNumber>>;
    set qqts(value: Vec4OrLessOrNumber<TNumber>);
    get wwyy(): Node<NumberToVec4<TNumber>>;
    set wwyy(value: Vec4OrLessOrNumber<TNumber>);
    get aagg(): Node<NumberToVec4<TNumber>>;
    set aagg(value: Vec4OrLessOrNumber<TNumber>);
    get qqtt(): Node<NumberToVec4<TNumber>>;
    set qqtt(value: Vec4OrLessOrNumber<TNumber>);
    get wwyz(): Node<NumberToVec4<TNumber>>;
    set wwyz(value: Vec4OrLessOrNumber<TNumber>);
    get aagb(): Node<NumberToVec4<TNumber>>;
    set aagb(value: Vec4OrLessOrNumber<TNumber>);
    get qqtp(): Node<NumberToVec4<TNumber>>;
    set qqtp(value: Vec4OrLessOrNumber<TNumber>);
    get wwyw(): Node<NumberToVec4<TNumber>>;
    set wwyw(value: Vec4OrLessOrNumber<TNumber>);
    get aaga(): Node<NumberToVec4<TNumber>>;
    set aaga(value: Vec4OrLessOrNumber<TNumber>);
    get qqtq(): Node<NumberToVec4<TNumber>>;
    set qqtq(value: Vec4OrLessOrNumber<TNumber>);
    get wwzx(): Node<NumberToVec4<TNumber>>;
    set wwzx(value: Vec4OrLessOrNumber<TNumber>);
    get aabr(): Node<NumberToVec4<TNumber>>;
    set aabr(value: Vec4OrLessOrNumber<TNumber>);
    get qqps(): Node<NumberToVec4<TNumber>>;
    set qqps(value: Vec4OrLessOrNumber<TNumber>);
    get wwzy(): Node<NumberToVec4<TNumber>>;
    set wwzy(value: Vec4OrLessOrNumber<TNumber>);
    get aabg(): Node<NumberToVec4<TNumber>>;
    set aabg(value: Vec4OrLessOrNumber<TNumber>);
    get qqpt(): Node<NumberToVec4<TNumber>>;
    set qqpt(value: Vec4OrLessOrNumber<TNumber>);
    get wwzz(): Node<NumberToVec4<TNumber>>;
    set wwzz(value: Vec4OrLessOrNumber<TNumber>);
    get aabb(): Node<NumberToVec4<TNumber>>;
    set aabb(value: Vec4OrLessOrNumber<TNumber>);
    get qqpp(): Node<NumberToVec4<TNumber>>;
    set qqpp(value: Vec4OrLessOrNumber<TNumber>);
    get wwzw(): Node<NumberToVec4<TNumber>>;
    set wwzw(value: Vec4OrLessOrNumber<TNumber>);
    get aaba(): Node<NumberToVec4<TNumber>>;
    set aaba(value: Vec4OrLessOrNumber<TNumber>);
    get qqpq(): Node<NumberToVec4<TNumber>>;
    set qqpq(value: Vec4OrLessOrNumber<TNumber>);
    get wwwx(): Node<NumberToVec4<TNumber>>;
    set wwwx(value: Vec4OrLessOrNumber<TNumber>);
    get aaar(): Node<NumberToVec4<TNumber>>;
    set aaar(value: Vec4OrLessOrNumber<TNumber>);
    get qqqs(): Node<NumberToVec4<TNumber>>;
    set qqqs(value: Vec4OrLessOrNumber<TNumber>);
    get wwwy(): Node<NumberToVec4<TNumber>>;
    set wwwy(value: Vec4OrLessOrNumber<TNumber>);
    get aaag(): Node<NumberToVec4<TNumber>>;
    set aaag(value: Vec4OrLessOrNumber<TNumber>);
    get qqqt(): Node<NumberToVec4<TNumber>>;
    set qqqt(value: Vec4OrLessOrNumber<TNumber>);
    get wwwz(): Node<NumberToVec4<TNumber>>;
    set wwwz(value: Vec4OrLessOrNumber<TNumber>);
    get aaab(): Node<NumberToVec4<TNumber>>;
    set aaab(value: Vec4OrLessOrNumber<TNumber>);
    get qqqp(): Node<NumberToVec4<TNumber>>;
    set qqqp(value: Vec4OrLessOrNumber<TNumber>);
    get wwww(): Node<NumberToVec4<TNumber>>;
    set wwww(value: Vec4OrLessOrNumber<TNumber>);
    get aaaa(): Node<NumberToVec4<TNumber>>;
    set aaaa(value: Vec4OrLessOrNumber<TNumber>);
    get qqqq(): Node<NumberToVec4<TNumber>>;
    set qqqq(value: Vec4OrLessOrNumber<TNumber>);
}
type X = "x";
type R = "r";
type S = "s";
type NumberSwizzleMethods<TNumber extends NumberType> =
    & {
        [Key in X | R | S as `set${Uppercase<Key>}`]: (value: Vec4OrLessOrNumber<TNumber>) => Node<TNumber>;
    }
    & {
        [Key in X | R | S as `flip${Uppercase<Key>}`]: () => Node<TNumber>;
    }
    & {
        [Key in `${X}${X}` | `${R}${R}` | `${S}${S}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<TNumber>;
    }
    & {
        [Key in `${X}${X}` | `${R}${R}` | `${S}${S}` as `flip${Uppercase<Key>}`]: () => Node<TNumber>;
    }
    & {
        [Key in `${X}${X}${X}` | `${R}${R}${R}` | `${S}${S}${S}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<TNumber>;
    }
    & {
        [Key in `${X}${X}${X}` | `${R}${R}${R}` | `${S}${S}${S}` as `flip${Uppercase<Key>}`]: () => Node<TNumber>;
    }
    & {
        [Key in `${X}${X}${X}${X}` | `${R}${R}${R}${R}` | `${S}${S}${S}${S}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<TNumber>;
    }
    & {
        [Key in `${X}${X}${X}${X}` | `${R}${R}${R}${R}` | `${S}${S}${S}${S}` as `flip${Uppercase<Key>}`]: () => Node<
            TNumber
        >;
    };
type XY = "x" | "y";
type RG = "r" | "g";
type ST = "s" | "t";
type Vec2SwizzleMethods<TNumber extends NumberType> =
    & {
        [Key in XY | RG | ST as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec2<TNumber>>;
    }
    & {
        [Key in XY | RG | ST as `flip${Uppercase<Key>}`]: () => Node<NumberToVec2<TNumber>>;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec2<TNumber>>;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}` as `flip${Uppercase<Key>}`]: () => Node<
            NumberToVec2<TNumber>
        >;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec2<TNumber>>;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}` as `flip${Uppercase<Key>}`]: () => Node<
            NumberToVec2<TNumber>
        >;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec2<TNumber>>;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}` as `flip${Uppercase<Key>}`]:
            () => Node<NumberToVec2<TNumber>>;
    };
type XYZ = "x" | "y" | "z";
type RGB = "r" | "g" | "b";
type STP = "s" | "t" | "p";
type Vec3SwizzleMethods<TNumber extends NumberType> =
    & {
        [Key in XYZ | RGB | STP as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec3<TNumber>>;
    }
    & {
        [Key in XYZ | RGB | STP as `flip${Uppercase<Key>}`]: () => Node<NumberToVec3<TNumber>>;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec3<TNumber>>;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}` as `flip${Uppercase<Key>}`]: () => Node<
            NumberToVec3<TNumber>
        >;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec3<TNumber>>;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}` as `flip${Uppercase<Key>}`]: () =>
            Node<NumberToVec3<TNumber>>;
    }
    & {
        [
            Key in
                | `${XYZ}${XYZ}${XYZ}${XYZ}`
                | `${RGB}${RGB}${RGB}${RGB}`
                | `${STP}${STP}${STP}${STP}` as `set${Uppercase<Key>}`
        ]: (value: Vec4OrLessOrNumber<TNumber>) => Node<NumberToVec3<TNumber>>;
    }
    & {
        [
            Key in
                | `${XYZ}${XYZ}${XYZ}${XYZ}`
                | `${RGB}${RGB}${RGB}${RGB}`
                | `${STP}${STP}${STP}${STP}` as `flip${Uppercase<Key>}`
        ]: () => Node<NumberToVec3<TNumber>>;
    };
type XYZW = "x" | "y" | "z" | "w";
type RGBA = "r" | "g" | "b" | "a";
type STPQ = "s" | "t" | "p" | "q";
type Vec4SwizzleMethods<TNumber extends NumberType> =
    & {
        [Key in XYZW | RGBA | STPQ as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec4<TNumber>>;
    }
    & {
        [Key in XYZW | RGBA | STPQ as `flip${Uppercase<Key>}`]: () => Node<NumberToVec4<TNumber>>;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}` as `set${Uppercase<Key>}`]: (
            value: Vec4OrLessOrNumber<TNumber>,
        ) => Node<NumberToVec4<TNumber>>;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}` as `flip${Uppercase<Key>}`]: () => Node<
            NumberToVec4<TNumber>
        >;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}` as `set${Uppercase<Key>}`]:
            (value: Vec4OrLessOrNumber<TNumber>) => Node<NumberToVec4<TNumber>>;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}` as `flip${Uppercase<Key>}`]:
            () => Node<NumberToVec4<TNumber>>;
    }
    & {
        [
            Key in
                | `${XYZW}${XYZW}${XYZW}${XYZW}`
                | `${RGBA}${RGBA}${RGBA}${RGBA}`
                | `${STPQ}${STPQ}${STPQ}${STPQ}` as `set${Uppercase<Key>}`
        ]: (value: Vec4OrLessOrNumber<TNumber>) => Node<NumberToVec4<TNumber>>;
    }
    & {
        [
            Key in
                | `${XYZW}${XYZW}${XYZW}${XYZW}`
                | `${RGBA}${RGBA}${RGBA}${RGBA}`
                | `${STPQ}${STPQ}${STPQ}${STPQ}` as `flip${Uppercase<Key>}`
        ]: () => Node<NumberToVec4<TNumber>>;
    };
interface NumberSwizzle<TNumber extends NumberType>
    extends
        Swizzle1In1Out<TNumber>,
        Swizzle1In2Out<TNumber>,
        Swizzle1In3Out<TNumber>,
        Swizzle1In4Out<TNumber>,
        NumberSwizzleMethods<TNumber>
{
}
interface Vec2Swizzle<TNumber extends NumberType>
    extends
        Swizzle2In1Out<TNumber>,
        Swizzle2In2Out<TNumber>,
        Swizzle2In3Out<TNumber>,
        Swizzle2In4Out<TNumber>,
        Vec2SwizzleMethods<TNumber>
{
}
interface Vec3Swizzle<TNumber extends NumberType>
    extends
        Swizzle3In1Out<TNumber>,
        Swizzle3In2Out<TNumber>,
        Swizzle3In3Out<TNumber>,
        Swizzle3In4Out<TNumber>,
        Vec3SwizzleMethods<TNumber>
{
}
interface Vec4Swizzle<TNumber extends NumberType>
    extends
        Swizzle4In1Out<TNumber>,
        Swizzle4In2Out<TNumber>,
        Swizzle4In3Out<TNumber>,
        Swizzle4In4Out<TNumber>,
        Vec4SwizzleMethods<TNumber>
{
}
export type NumberType = "float" | "int" | "uint";
export type IntegerType = "int" | "uint";
export type FloatVectorType = "vec2" | "vec3" | "vec4";
export type MatrixType = "mat2" | "mat3" | "mat4";
export interface NodeExtensions<TValue> {
}
export interface FloatExtensions {
}
export interface IntExtensions {
}
export interface UintExtensions {
}
export interface NumberExtensions<TNumber extends NumberType> {
}
export interface IntegerExtensions<TInteger extends IntegerType> {
}
export interface BoolExtensions {
}
export interface Vec2Extensions {
}
export interface Ivec2Extensions {
}
export interface Uvec2Extensions {
}
export interface Vector2Extensions<TNumber extends NumberType> {
}
export interface Vec3Extensions {
}
export interface Ivec3Extensions {
}
export interface Uvec3Extensions {
}
export interface Vector3Extensions<TNumber extends NumberType> {
}
export interface Vec4Extensions {
}
export interface Ivec4Extensions {
}
export interface Uvec4Extensions {
}
export interface Vector4Extensions<TNumber extends NumberType> {
}
export interface FloatVectorExtensions<TVec extends FloatVectorType> {
}
export interface BvecExtensions {
}
export interface Matrix2Extensions {
}
export interface Matrix3Extensions {
}
export interface Matrix4Extensions {
}
export interface MatrixExtensions<TMat extends MatrixType> {
}
export interface ColorExtensions {
}
type Node<TValue = unknown> =
    & NodeClass
    & NodeElements
    & NodeExtensions<TValue>
    & (TValue extends "float" ? NumberSwizzle<"float"> & FloatExtensions & NumberExtensions<"float">
        : TValue extends "int"
            ? NumberSwizzle<"int"> & IntExtensions & NumberExtensions<"int"> & IntegerExtensions<"int">
        : TValue extends "uint"
            ? NumberSwizzle<"uint"> & UintExtensions & NumberExtensions<"uint"> & IntegerExtensions<"uint">
        : TValue extends "bool" ? BoolExtensions
        : TValue extends "vec2"
            ? Vec2Swizzle<"float"> & Vec2Extensions & Vector2Extensions<"float"> & FloatVectorExtensions<"vec2">
        : TValue extends "ivec2" ? Vec2Swizzle<"int"> & Ivec2Extensions & Vector2Extensions<"int">
        : TValue extends "uvec2" ? Vec2Swizzle<"uint"> & Uvec2Extensions & Vector2Extensions<"uint">
        : TValue extends "bvec2" ? BvecExtensions
        : TValue extends "vec3"
            ? Vec3Swizzle<"float"> & Vec3Extensions & Vector3Extensions<"float"> & FloatVectorExtensions<"vec3">
        : TValue extends "ivec3" ? Vec3Swizzle<"int"> & Ivec3Extensions & Vector3Extensions<"int">
        : TValue extends "uvec3" ? Vec3Swizzle<"uint"> & Uvec3Extensions & Vector3Extensions<"uint">
        : TValue extends "bvec3" ? BvecExtensions
        : TValue extends "vec4"
            ? Vec4Swizzle<"float"> & Vec4Extensions & Vector4Extensions<"float"> & FloatVectorExtensions<"vec4">
        : TValue extends "ivec4" ? Vec4Swizzle<"int"> & Ivec4Extensions & Vector4Extensions<"int">
        : TValue extends "uvec4" ? Vec4Swizzle<"uint"> & Uvec4Extensions & Vector4Extensions<"uint">
        : TValue extends "bvec4" ? BvecExtensions
        : TValue extends "mat2" ? Matrix2Extensions & MatrixExtensions<"mat2">
        : TValue extends "mat3" ? Matrix3Extensions & MatrixExtensions<"mat3">
        : TValue extends "mat4" ? Matrix4Extensions & MatrixExtensions<"mat4">
        : TValue extends "color" ? Vec3Swizzle<"float"> & ColorExtensions
        : {})
    & {
        __TypeScript_VALUE__: TValue;
    };
export default Node;
