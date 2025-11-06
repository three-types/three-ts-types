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
    get xx(): NumberToVec2<TNumber>;
    set xx(value: Vec4OrLessOrNumber<TNumber>);
    get rr(): NumberToVec2<TNumber>;
    set rr(value: Vec4OrLessOrNumber<TNumber>);
    get ss(): NumberToVec2<TNumber>;
    set ss(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle2In2Out<TNumber extends NumberType> extends Swizzle1In2Out<TNumber> {
    get xy(): NumberToVec2<TNumber>;
    set xy(value: Vec4OrLessOrNumber<TNumber>);
    get rg(): NumberToVec2<TNumber>;
    set rg(value: Vec4OrLessOrNumber<TNumber>);
    get st(): NumberToVec2<TNumber>;
    set st(value: Vec4OrLessOrNumber<TNumber>);
    get yx(): NumberToVec2<TNumber>;
    set yx(value: Vec4OrLessOrNumber<TNumber>);
    get gr(): NumberToVec2<TNumber>;
    set gr(value: Vec4OrLessOrNumber<TNumber>);
    get ts(): NumberToVec2<TNumber>;
    set ts(value: Vec4OrLessOrNumber<TNumber>);
    get yy(): NumberToVec2<TNumber>;
    set yy(value: Vec4OrLessOrNumber<TNumber>);
    get gg(): NumberToVec2<TNumber>;
    set gg(value: Vec4OrLessOrNumber<TNumber>);
    get tt(): NumberToVec2<TNumber>;
    set tt(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle3In2Out<TNumber extends NumberType> extends Swizzle2In2Out<TNumber> {
    get xz(): NumberToVec2<TNumber>;
    set xz(value: Vec4OrLessOrNumber<TNumber>);
    get rb(): NumberToVec2<TNumber>;
    set rb(value: Vec4OrLessOrNumber<TNumber>);
    get sp(): NumberToVec2<TNumber>;
    set sp(value: Vec4OrLessOrNumber<TNumber>);
    get yz(): NumberToVec2<TNumber>;
    set yz(value: Vec4OrLessOrNumber<TNumber>);
    get gb(): NumberToVec2<TNumber>;
    set gb(value: Vec4OrLessOrNumber<TNumber>);
    get tp(): NumberToVec2<TNumber>;
    set tp(value: Vec4OrLessOrNumber<TNumber>);
    get zx(): NumberToVec2<TNumber>;
    set zx(value: Vec4OrLessOrNumber<TNumber>);
    get br(): NumberToVec2<TNumber>;
    set br(value: Vec4OrLessOrNumber<TNumber>);
    get ps(): NumberToVec2<TNumber>;
    set ps(value: Vec4OrLessOrNumber<TNumber>);
    get zy(): NumberToVec2<TNumber>;
    set zy(value: Vec4OrLessOrNumber<TNumber>);
    get bg(): NumberToVec2<TNumber>;
    set bg(value: Vec4OrLessOrNumber<TNumber>);
    get pt(): NumberToVec2<TNumber>;
    set pt(value: Vec4OrLessOrNumber<TNumber>);
    get zz(): NumberToVec2<TNumber>;
    set zz(value: Vec4OrLessOrNumber<TNumber>);
    get bb(): NumberToVec2<TNumber>;
    set bb(value: Vec4OrLessOrNumber<TNumber>);
    get pp(): NumberToVec2<TNumber>;
    set pp(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle4In2Out<TNumber extends NumberType> extends Swizzle3In2Out<TNumber> {
    get xw(): NumberToVec2<TNumber>;
    set xw(value: Vec4OrLessOrNumber<TNumber>);
    get ra(): NumberToVec2<TNumber>;
    set ra(value: Vec4OrLessOrNumber<TNumber>);
    get sq(): NumberToVec2<TNumber>;
    set sq(value: Vec4OrLessOrNumber<TNumber>);
    get yw(): NumberToVec2<TNumber>;
    set yw(value: Vec4OrLessOrNumber<TNumber>);
    get ga(): NumberToVec2<TNumber>;
    set ga(value: Vec4OrLessOrNumber<TNumber>);
    get tq(): NumberToVec2<TNumber>;
    set tq(value: Vec4OrLessOrNumber<TNumber>);
    get zw(): NumberToVec2<TNumber>;
    set zw(value: Vec4OrLessOrNumber<TNumber>);
    get ba(): NumberToVec2<TNumber>;
    set ba(value: Vec4OrLessOrNumber<TNumber>);
    get pq(): NumberToVec2<TNumber>;
    set pq(value: Vec4OrLessOrNumber<TNumber>);
    get wx(): NumberToVec2<TNumber>;
    set wx(value: Vec4OrLessOrNumber<TNumber>);
    get ar(): NumberToVec2<TNumber>;
    set ar(value: Vec4OrLessOrNumber<TNumber>);
    get qs(): NumberToVec2<TNumber>;
    set qs(value: Vec4OrLessOrNumber<TNumber>);
    get wy(): NumberToVec2<TNumber>;
    set wy(value: Vec4OrLessOrNumber<TNumber>);
    get ag(): NumberToVec2<TNumber>;
    set ag(value: Vec4OrLessOrNumber<TNumber>);
    get qt(): NumberToVec2<TNumber>;
    set qt(value: Vec4OrLessOrNumber<TNumber>);
    get wz(): NumberToVec2<TNumber>;
    set wz(value: Vec4OrLessOrNumber<TNumber>);
    get ab(): NumberToVec2<TNumber>;
    set ab(value: Vec4OrLessOrNumber<TNumber>);
    get qp(): NumberToVec2<TNumber>;
    set qp(value: Vec4OrLessOrNumber<TNumber>);
    get ww(): NumberToVec2<TNumber>;
    set ww(value: Vec4OrLessOrNumber<TNumber>);
    get aa(): NumberToVec2<TNumber>;
    set aa(value: Vec4OrLessOrNumber<TNumber>);
    get qq(): NumberToVec2<TNumber>;
    set qq(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle1In3Out<TNumber extends NumberType> {
    get xxx(): NumberToVec3<TNumber>;
    set xxx(value: Vec4OrLessOrNumber<TNumber>);
    get rrr(): NumberToVec3<TNumber>;
    set rrr(value: Vec4OrLessOrNumber<TNumber>);
    get sss(): NumberToVec3<TNumber>;
    set sss(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle2In3Out<TNumber extends NumberType> extends Swizzle1In3Out<TNumber> {
    get xxy(): NumberToVec3<TNumber>;
    set xxy(value: Vec4OrLessOrNumber<TNumber>);
    get rrg(): NumberToVec3<TNumber>;
    set rrg(value: Vec4OrLessOrNumber<TNumber>);
    get sst(): NumberToVec3<TNumber>;
    set sst(value: Vec4OrLessOrNumber<TNumber>);
    get xyx(): NumberToVec3<TNumber>;
    set xyx(value: Vec4OrLessOrNumber<TNumber>);
    get rgr(): NumberToVec3<TNumber>;
    set rgr(value: Vec4OrLessOrNumber<TNumber>);
    get sts(): NumberToVec3<TNumber>;
    set sts(value: Vec4OrLessOrNumber<TNumber>);
    get xyy(): NumberToVec3<TNumber>;
    set xyy(value: Vec4OrLessOrNumber<TNumber>);
    get rgg(): NumberToVec3<TNumber>;
    set rgg(value: Vec4OrLessOrNumber<TNumber>);
    get stt(): NumberToVec3<TNumber>;
    set stt(value: Vec4OrLessOrNumber<TNumber>);
    get yxx(): NumberToVec3<TNumber>;
    set yxx(value: Vec4OrLessOrNumber<TNumber>);
    get grr(): NumberToVec3<TNumber>;
    set grr(value: Vec4OrLessOrNumber<TNumber>);
    get tss(): NumberToVec3<TNumber>;
    set tss(value: Vec4OrLessOrNumber<TNumber>);
    get yxy(): NumberToVec3<TNumber>;
    set yxy(value: Vec4OrLessOrNumber<TNumber>);
    get grg(): NumberToVec3<TNumber>;
    set grg(value: Vec4OrLessOrNumber<TNumber>);
    get tst(): NumberToVec3<TNumber>;
    set tst(value: Vec4OrLessOrNumber<TNumber>);
    get yyx(): NumberToVec3<TNumber>;
    set yyx(value: Vec4OrLessOrNumber<TNumber>);
    get ggr(): NumberToVec3<TNumber>;
    set ggr(value: Vec4OrLessOrNumber<TNumber>);
    get tts(): NumberToVec3<TNumber>;
    set tts(value: Vec4OrLessOrNumber<TNumber>);
    get yyy(): NumberToVec3<TNumber>;
    set yyy(value: Vec4OrLessOrNumber<TNumber>);
    get ggg(): NumberToVec3<TNumber>;
    set ggg(value: Vec4OrLessOrNumber<TNumber>);
    get ttt(): NumberToVec3<TNumber>;
    set ttt(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle3In3Out<TNumber extends NumberType> extends Swizzle2In3Out<TNumber> {
    get xxz(): NumberToVec3<TNumber>;
    set xxz(value: Vec4OrLessOrNumber<TNumber>);
    get rrb(): NumberToVec3<TNumber>;
    set rrb(value: Vec4OrLessOrNumber<TNumber>);
    get ssp(): NumberToVec3<TNumber>;
    set ssp(value: Vec4OrLessOrNumber<TNumber>);
    get xyz(): NumberToVec3<TNumber>;
    set xyz(value: Vec4OrLessOrNumber<TNumber>);
    get rgb(): NumberToVec3<TNumber>;
    set rgb(value: Vec4OrLessOrNumber<TNumber>);
    get stp(): NumberToVec3<TNumber>;
    set stp(value: Vec4OrLessOrNumber<TNumber>);
    get xzx(): NumberToVec3<TNumber>;
    set xzx(value: Vec4OrLessOrNumber<TNumber>);
    get rbr(): NumberToVec3<TNumber>;
    set rbr(value: Vec4OrLessOrNumber<TNumber>);
    get sps(): NumberToVec3<TNumber>;
    set sps(value: Vec4OrLessOrNumber<TNumber>);
    get xzy(): NumberToVec3<TNumber>;
    set xzy(value: Vec4OrLessOrNumber<TNumber>);
    get rbg(): NumberToVec3<TNumber>;
    set rbg(value: Vec4OrLessOrNumber<TNumber>);
    get spt(): NumberToVec3<TNumber>;
    set spt(value: Vec4OrLessOrNumber<TNumber>);
    get xzz(): NumberToVec3<TNumber>;
    set xzz(value: Vec4OrLessOrNumber<TNumber>);
    get rbb(): NumberToVec3<TNumber>;
    set rbb(value: Vec4OrLessOrNumber<TNumber>);
    get spp(): NumberToVec3<TNumber>;
    set spp(value: Vec4OrLessOrNumber<TNumber>);
    get yxz(): NumberToVec3<TNumber>;
    set yxz(value: Vec4OrLessOrNumber<TNumber>);
    get grb(): NumberToVec3<TNumber>;
    set grb(value: Vec4OrLessOrNumber<TNumber>);
    get tsp(): NumberToVec3<TNumber>;
    set tsp(value: Vec4OrLessOrNumber<TNumber>);
    get yyz(): NumberToVec3<TNumber>;
    set yyz(value: Vec4OrLessOrNumber<TNumber>);
    get ggb(): NumberToVec3<TNumber>;
    set ggb(value: Vec4OrLessOrNumber<TNumber>);
    get ttp(): NumberToVec3<TNumber>;
    set ttp(value: Vec4OrLessOrNumber<TNumber>);
    get yzx(): NumberToVec3<TNumber>;
    set yzx(value: Vec4OrLessOrNumber<TNumber>);
    get gbr(): NumberToVec3<TNumber>;
    set gbr(value: Vec4OrLessOrNumber<TNumber>);
    get tps(): NumberToVec3<TNumber>;
    set tps(value: Vec4OrLessOrNumber<TNumber>);
    get yzy(): NumberToVec3<TNumber>;
    set yzy(value: Vec4OrLessOrNumber<TNumber>);
    get gbg(): NumberToVec3<TNumber>;
    set gbg(value: Vec4OrLessOrNumber<TNumber>);
    get tpt(): NumberToVec3<TNumber>;
    set tpt(value: Vec4OrLessOrNumber<TNumber>);
    get yzz(): NumberToVec3<TNumber>;
    set yzz(value: Vec4OrLessOrNumber<TNumber>);
    get gbb(): NumberToVec3<TNumber>;
    set gbb(value: Vec4OrLessOrNumber<TNumber>);
    get tpp(): NumberToVec3<TNumber>;
    set tpp(value: Vec4OrLessOrNumber<TNumber>);
    get zxx(): NumberToVec3<TNumber>;
    set zxx(value: Vec4OrLessOrNumber<TNumber>);
    get brr(): NumberToVec3<TNumber>;
    set brr(value: Vec4OrLessOrNumber<TNumber>);
    get pss(): NumberToVec3<TNumber>;
    set pss(value: Vec4OrLessOrNumber<TNumber>);
    get zxy(): NumberToVec3<TNumber>;
    set zxy(value: Vec4OrLessOrNumber<TNumber>);
    get brg(): NumberToVec3<TNumber>;
    set brg(value: Vec4OrLessOrNumber<TNumber>);
    get pst(): NumberToVec3<TNumber>;
    set pst(value: Vec4OrLessOrNumber<TNumber>);
    get zxz(): NumberToVec3<TNumber>;
    set zxz(value: Vec4OrLessOrNumber<TNumber>);
    get brb(): NumberToVec3<TNumber>;
    set brb(value: Vec4OrLessOrNumber<TNumber>);
    get psp(): NumberToVec3<TNumber>;
    set psp(value: Vec4OrLessOrNumber<TNumber>);
    get zyx(): NumberToVec3<TNumber>;
    set zyx(value: Vec4OrLessOrNumber<TNumber>);
    get bgr(): NumberToVec3<TNumber>;
    set bgr(value: Vec4OrLessOrNumber<TNumber>);
    get pts(): NumberToVec3<TNumber>;
    set pts(value: Vec4OrLessOrNumber<TNumber>);
    get zyy(): NumberToVec3<TNumber>;
    set zyy(value: Vec4OrLessOrNumber<TNumber>);
    get bgg(): NumberToVec3<TNumber>;
    set bgg(value: Vec4OrLessOrNumber<TNumber>);
    get ptt(): NumberToVec3<TNumber>;
    set ptt(value: Vec4OrLessOrNumber<TNumber>);
    get zyz(): NumberToVec3<TNumber>;
    set zyz(value: Vec4OrLessOrNumber<TNumber>);
    get bgb(): NumberToVec3<TNumber>;
    set bgb(value: Vec4OrLessOrNumber<TNumber>);
    get ptp(): NumberToVec3<TNumber>;
    set ptp(value: Vec4OrLessOrNumber<TNumber>);
    get zzx(): NumberToVec3<TNumber>;
    set zzx(value: Vec4OrLessOrNumber<TNumber>);
    get bbr(): NumberToVec3<TNumber>;
    set bbr(value: Vec4OrLessOrNumber<TNumber>);
    get pps(): NumberToVec3<TNumber>;
    set pps(value: Vec4OrLessOrNumber<TNumber>);
    get zzy(): NumberToVec3<TNumber>;
    set zzy(value: Vec4OrLessOrNumber<TNumber>);
    get bbg(): NumberToVec3<TNumber>;
    set bbg(value: Vec4OrLessOrNumber<TNumber>);
    get ppt(): NumberToVec3<TNumber>;
    set ppt(value: Vec4OrLessOrNumber<TNumber>);
    get zzz(): NumberToVec3<TNumber>;
    set zzz(value: Vec4OrLessOrNumber<TNumber>);
    get bbb(): NumberToVec3<TNumber>;
    set bbb(value: Vec4OrLessOrNumber<TNumber>);
    get ppp(): NumberToVec3<TNumber>;
    set ppp(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle4In3Out<TNumber extends NumberType> extends Swizzle3In3Out<TNumber> {
    get xxw(): NumberToVec3<TNumber>;
    set xxw(value: Vec4OrLessOrNumber<TNumber>);
    get rra(): NumberToVec3<TNumber>;
    set rra(value: Vec4OrLessOrNumber<TNumber>);
    get ssq(): NumberToVec3<TNumber>;
    set ssq(value: Vec4OrLessOrNumber<TNumber>);
    get xyw(): NumberToVec3<TNumber>;
    set xyw(value: Vec4OrLessOrNumber<TNumber>);
    get rga(): NumberToVec3<TNumber>;
    set rga(value: Vec4OrLessOrNumber<TNumber>);
    get stq(): NumberToVec3<TNumber>;
    set stq(value: Vec4OrLessOrNumber<TNumber>);
    get xzw(): NumberToVec3<TNumber>;
    set xzw(value: Vec4OrLessOrNumber<TNumber>);
    get rba(): NumberToVec3<TNumber>;
    set rba(value: Vec4OrLessOrNumber<TNumber>);
    get spq(): NumberToVec3<TNumber>;
    set spq(value: Vec4OrLessOrNumber<TNumber>);
    get xwx(): NumberToVec3<TNumber>;
    set xwx(value: Vec4OrLessOrNumber<TNumber>);
    get rar(): NumberToVec3<TNumber>;
    set rar(value: Vec4OrLessOrNumber<TNumber>);
    get sqs(): NumberToVec3<TNumber>;
    set sqs(value: Vec4OrLessOrNumber<TNumber>);
    get xwy(): NumberToVec3<TNumber>;
    set xwy(value: Vec4OrLessOrNumber<TNumber>);
    get rag(): NumberToVec3<TNumber>;
    set rag(value: Vec4OrLessOrNumber<TNumber>);
    get sqt(): NumberToVec3<TNumber>;
    set sqt(value: Vec4OrLessOrNumber<TNumber>);
    get xwz(): NumberToVec3<TNumber>;
    set xwz(value: Vec4OrLessOrNumber<TNumber>);
    get rab(): NumberToVec3<TNumber>;
    set rab(value: Vec4OrLessOrNumber<TNumber>);
    get sqp(): NumberToVec3<TNumber>;
    set sqp(value: Vec4OrLessOrNumber<TNumber>);
    get xww(): NumberToVec3<TNumber>;
    set xww(value: Vec4OrLessOrNumber<TNumber>);
    get raa(): NumberToVec3<TNumber>;
    set raa(value: Vec4OrLessOrNumber<TNumber>);
    get sqq(): NumberToVec3<TNumber>;
    set sqq(value: Vec4OrLessOrNumber<TNumber>);
    get yxw(): NumberToVec3<TNumber>;
    set yxw(value: Vec4OrLessOrNumber<TNumber>);
    get gra(): NumberToVec3<TNumber>;
    set gra(value: Vec4OrLessOrNumber<TNumber>);
    get tsq(): NumberToVec3<TNumber>;
    set tsq(value: Vec4OrLessOrNumber<TNumber>);
    get yyw(): NumberToVec3<TNumber>;
    set yyw(value: Vec4OrLessOrNumber<TNumber>);
    get gga(): NumberToVec3<TNumber>;
    set gga(value: Vec4OrLessOrNumber<TNumber>);
    get ttq(): NumberToVec3<TNumber>;
    set ttq(value: Vec4OrLessOrNumber<TNumber>);
    get yzw(): NumberToVec3<TNumber>;
    set yzw(value: Vec4OrLessOrNumber<TNumber>);
    get gba(): NumberToVec3<TNumber>;
    set gba(value: Vec4OrLessOrNumber<TNumber>);
    get tpq(): NumberToVec3<TNumber>;
    set tpq(value: Vec4OrLessOrNumber<TNumber>);
    get ywx(): NumberToVec3<TNumber>;
    set ywx(value: Vec4OrLessOrNumber<TNumber>);
    get gar(): NumberToVec3<TNumber>;
    set gar(value: Vec4OrLessOrNumber<TNumber>);
    get tqs(): NumberToVec3<TNumber>;
    set tqs(value: Vec4OrLessOrNumber<TNumber>);
    get ywy(): NumberToVec3<TNumber>;
    set ywy(value: Vec4OrLessOrNumber<TNumber>);
    get gag(): NumberToVec3<TNumber>;
    set gag(value: Vec4OrLessOrNumber<TNumber>);
    get tqt(): NumberToVec3<TNumber>;
    set tqt(value: Vec4OrLessOrNumber<TNumber>);
    get ywz(): NumberToVec3<TNumber>;
    set ywz(value: Vec4OrLessOrNumber<TNumber>);
    get gab(): NumberToVec3<TNumber>;
    set gab(value: Vec4OrLessOrNumber<TNumber>);
    get tqp(): NumberToVec3<TNumber>;
    set tqp(value: Vec4OrLessOrNumber<TNumber>);
    get yww(): NumberToVec3<TNumber>;
    set yww(value: Vec4OrLessOrNumber<TNumber>);
    get gaa(): NumberToVec3<TNumber>;
    set gaa(value: Vec4OrLessOrNumber<TNumber>);
    get tqq(): NumberToVec3<TNumber>;
    set tqq(value: Vec4OrLessOrNumber<TNumber>);
    get zxw(): NumberToVec3<TNumber>;
    set zxw(value: Vec4OrLessOrNumber<TNumber>);
    get bra(): NumberToVec3<TNumber>;
    set bra(value: Vec4OrLessOrNumber<TNumber>);
    get psq(): NumberToVec3<TNumber>;
    set psq(value: Vec4OrLessOrNumber<TNumber>);
    get zyw(): NumberToVec3<TNumber>;
    set zyw(value: Vec4OrLessOrNumber<TNumber>);
    get bga(): NumberToVec3<TNumber>;
    set bga(value: Vec4OrLessOrNumber<TNumber>);
    get ptq(): NumberToVec3<TNumber>;
    set ptq(value: Vec4OrLessOrNumber<TNumber>);
    get zzw(): NumberToVec3<TNumber>;
    set zzw(value: Vec4OrLessOrNumber<TNumber>);
    get bba(): NumberToVec3<TNumber>;
    set bba(value: Vec4OrLessOrNumber<TNumber>);
    get ppq(): NumberToVec3<TNumber>;
    set ppq(value: Vec4OrLessOrNumber<TNumber>);
    get zwx(): NumberToVec3<TNumber>;
    set zwx(value: Vec4OrLessOrNumber<TNumber>);
    get bar(): NumberToVec3<TNumber>;
    set bar(value: Vec4OrLessOrNumber<TNumber>);
    get pqs(): NumberToVec3<TNumber>;
    set pqs(value: Vec4OrLessOrNumber<TNumber>);
    get zwy(): NumberToVec3<TNumber>;
    set zwy(value: Vec4OrLessOrNumber<TNumber>);
    get bag(): NumberToVec3<TNumber>;
    set bag(value: Vec4OrLessOrNumber<TNumber>);
    get pqt(): NumberToVec3<TNumber>;
    set pqt(value: Vec4OrLessOrNumber<TNumber>);
    get zwz(): NumberToVec3<TNumber>;
    set zwz(value: Vec4OrLessOrNumber<TNumber>);
    get bab(): NumberToVec3<TNumber>;
    set bab(value: Vec4OrLessOrNumber<TNumber>);
    get pqp(): NumberToVec3<TNumber>;
    set pqp(value: Vec4OrLessOrNumber<TNumber>);
    get zww(): NumberToVec3<TNumber>;
    set zww(value: Vec4OrLessOrNumber<TNumber>);
    get baa(): NumberToVec3<TNumber>;
    set baa(value: Vec4OrLessOrNumber<TNumber>);
    get pqq(): NumberToVec3<TNumber>;
    set pqq(value: Vec4OrLessOrNumber<TNumber>);
    get wxx(): NumberToVec3<TNumber>;
    set wxx(value: Vec4OrLessOrNumber<TNumber>);
    get arr(): NumberToVec3<TNumber>;
    set arr(value: Vec4OrLessOrNumber<TNumber>);
    get qss(): NumberToVec3<TNumber>;
    set qss(value: Vec4OrLessOrNumber<TNumber>);
    get wxy(): NumberToVec3<TNumber>;
    set wxy(value: Vec4OrLessOrNumber<TNumber>);
    get arg(): NumberToVec3<TNumber>;
    set arg(value: Vec4OrLessOrNumber<TNumber>);
    get qst(): NumberToVec3<TNumber>;
    set qst(value: Vec4OrLessOrNumber<TNumber>);
    get wxz(): NumberToVec3<TNumber>;
    set wxz(value: Vec4OrLessOrNumber<TNumber>);
    get arb(): NumberToVec3<TNumber>;
    set arb(value: Vec4OrLessOrNumber<TNumber>);
    get qsp(): NumberToVec3<TNumber>;
    set qsp(value: Vec4OrLessOrNumber<TNumber>);
    get wxw(): NumberToVec3<TNumber>;
    set wxw(value: Vec4OrLessOrNumber<TNumber>);
    get ara(): NumberToVec3<TNumber>;
    set ara(value: Vec4OrLessOrNumber<TNumber>);
    get qsq(): NumberToVec3<TNumber>;
    set qsq(value: Vec4OrLessOrNumber<TNumber>);
    get wyx(): NumberToVec3<TNumber>;
    set wyx(value: Vec4OrLessOrNumber<TNumber>);
    get agr(): NumberToVec3<TNumber>;
    set agr(value: Vec4OrLessOrNumber<TNumber>);
    get qts(): NumberToVec3<TNumber>;
    set qts(value: Vec4OrLessOrNumber<TNumber>);
    get wyy(): NumberToVec3<TNumber>;
    set wyy(value: Vec4OrLessOrNumber<TNumber>);
    get agg(): NumberToVec3<TNumber>;
    set agg(value: Vec4OrLessOrNumber<TNumber>);
    get qtt(): NumberToVec3<TNumber>;
    set qtt(value: Vec4OrLessOrNumber<TNumber>);
    get wyz(): NumberToVec3<TNumber>;
    set wyz(value: Vec4OrLessOrNumber<TNumber>);
    get agb(): NumberToVec3<TNumber>;
    set agb(value: Vec4OrLessOrNumber<TNumber>);
    get qtp(): NumberToVec3<TNumber>;
    set qtp(value: Vec4OrLessOrNumber<TNumber>);
    get wyw(): NumberToVec3<TNumber>;
    set wyw(value: Vec4OrLessOrNumber<TNumber>);
    get aga(): NumberToVec3<TNumber>;
    set aga(value: Vec4OrLessOrNumber<TNumber>);
    get qtq(): NumberToVec3<TNumber>;
    set qtq(value: Vec4OrLessOrNumber<TNumber>);
    get wzx(): NumberToVec3<TNumber>;
    set wzx(value: Vec4OrLessOrNumber<TNumber>);
    get abr(): NumberToVec3<TNumber>;
    set abr(value: Vec4OrLessOrNumber<TNumber>);
    get qps(): NumberToVec3<TNumber>;
    set qps(value: Vec4OrLessOrNumber<TNumber>);
    get wzy(): NumberToVec3<TNumber>;
    set wzy(value: Vec4OrLessOrNumber<TNumber>);
    get abg(): NumberToVec3<TNumber>;
    set abg(value: Vec4OrLessOrNumber<TNumber>);
    get qpt(): NumberToVec3<TNumber>;
    set qpt(value: Vec4OrLessOrNumber<TNumber>);
    get wzz(): NumberToVec3<TNumber>;
    set wzz(value: Vec4OrLessOrNumber<TNumber>);
    get abb(): NumberToVec3<TNumber>;
    set abb(value: Vec4OrLessOrNumber<TNumber>);
    get qpp(): NumberToVec3<TNumber>;
    set qpp(value: Vec4OrLessOrNumber<TNumber>);
    get wzw(): NumberToVec3<TNumber>;
    set wzw(value: Vec4OrLessOrNumber<TNumber>);
    get aba(): NumberToVec3<TNumber>;
    set aba(value: Vec4OrLessOrNumber<TNumber>);
    get qpq(): NumberToVec3<TNumber>;
    set qpq(value: Vec4OrLessOrNumber<TNumber>);
    get wwx(): NumberToVec3<TNumber>;
    set wwx(value: Vec4OrLessOrNumber<TNumber>);
    get aar(): NumberToVec3<TNumber>;
    set aar(value: Vec4OrLessOrNumber<TNumber>);
    get qqs(): NumberToVec3<TNumber>;
    set qqs(value: Vec4OrLessOrNumber<TNumber>);
    get wwy(): NumberToVec3<TNumber>;
    set wwy(value: Vec4OrLessOrNumber<TNumber>);
    get aag(): NumberToVec3<TNumber>;
    set aag(value: Vec4OrLessOrNumber<TNumber>);
    get qqt(): NumberToVec3<TNumber>;
    set qqt(value: Vec4OrLessOrNumber<TNumber>);
    get wwz(): NumberToVec3<TNumber>;
    set wwz(value: Vec4OrLessOrNumber<TNumber>);
    get aab(): NumberToVec3<TNumber>;
    set aab(value: Vec4OrLessOrNumber<TNumber>);
    get qqp(): NumberToVec3<TNumber>;
    set qqp(value: Vec4OrLessOrNumber<TNumber>);
    get www(): NumberToVec3<TNumber>;
    set www(value: Vec4OrLessOrNumber<TNumber>);
    get aaa(): NumberToVec3<TNumber>;
    set aaa(value: Vec4OrLessOrNumber<TNumber>);
    get qqq(): NumberToVec3<TNumber>;
    set qqq(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle1In4Out<TNumber extends NumberType> {
    get xxxx(): NumberToVec4<TNumber>;
    set xxxx(value: Vec4OrLessOrNumber<TNumber>);
    get rrrr(): NumberToVec4<TNumber>;
    set rrrr(value: Vec4OrLessOrNumber<TNumber>);
    get ssss(): NumberToVec4<TNumber>;
    set ssss(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle2In4Out<TNumber extends NumberType> extends Swizzle1In4Out<TNumber> {
    get xxxy(): NumberToVec4<TNumber>;
    set xxxy(value: Vec4OrLessOrNumber<TNumber>);
    get rrrg(): NumberToVec4<TNumber>;
    set rrrg(value: Vec4OrLessOrNumber<TNumber>);
    get ssst(): NumberToVec4<TNumber>;
    set ssst(value: Vec4OrLessOrNumber<TNumber>);
    get xxyx(): NumberToVec4<TNumber>;
    set xxyx(value: Vec4OrLessOrNumber<TNumber>);
    get rrgr(): NumberToVec4<TNumber>;
    set rrgr(value: Vec4OrLessOrNumber<TNumber>);
    get ssts(): NumberToVec4<TNumber>;
    set ssts(value: Vec4OrLessOrNumber<TNumber>);
    get xxyy(): NumberToVec4<TNumber>;
    set xxyy(value: Vec4OrLessOrNumber<TNumber>);
    get rrgg(): NumberToVec4<TNumber>;
    set rrgg(value: Vec4OrLessOrNumber<TNumber>);
    get sstt(): NumberToVec4<TNumber>;
    set sstt(value: Vec4OrLessOrNumber<TNumber>);
    get xyxx(): NumberToVec4<TNumber>;
    set xyxx(value: Vec4OrLessOrNumber<TNumber>);
    get rgrr(): NumberToVec4<TNumber>;
    set rgrr(value: Vec4OrLessOrNumber<TNumber>);
    get stss(): NumberToVec4<TNumber>;
    set stss(value: Vec4OrLessOrNumber<TNumber>);
    get xyxy(): NumberToVec4<TNumber>;
    set xyxy(value: Vec4OrLessOrNumber<TNumber>);
    get rgrg(): NumberToVec4<TNumber>;
    set rgrg(value: Vec4OrLessOrNumber<TNumber>);
    get stst(): NumberToVec4<TNumber>;
    set stst(value: Vec4OrLessOrNumber<TNumber>);
    get xyyx(): NumberToVec4<TNumber>;
    set xyyx(value: Vec4OrLessOrNumber<TNumber>);
    get rggr(): NumberToVec4<TNumber>;
    set rggr(value: Vec4OrLessOrNumber<TNumber>);
    get stts(): NumberToVec4<TNumber>;
    set stts(value: Vec4OrLessOrNumber<TNumber>);
    get xyyy(): NumberToVec4<TNumber>;
    set xyyy(value: Vec4OrLessOrNumber<TNumber>);
    get rggg(): NumberToVec4<TNumber>;
    set rggg(value: Vec4OrLessOrNumber<TNumber>);
    get sttt(): NumberToVec4<TNumber>;
    set sttt(value: Vec4OrLessOrNumber<TNumber>);
    get yxxx(): NumberToVec4<TNumber>;
    set yxxx(value: Vec4OrLessOrNumber<TNumber>);
    get grrr(): NumberToVec4<TNumber>;
    set grrr(value: Vec4OrLessOrNumber<TNumber>);
    get tsss(): NumberToVec4<TNumber>;
    set tsss(value: Vec4OrLessOrNumber<TNumber>);
    get yxxy(): NumberToVec4<TNumber>;
    set yxxy(value: Vec4OrLessOrNumber<TNumber>);
    get grrg(): NumberToVec4<TNumber>;
    set grrg(value: Vec4OrLessOrNumber<TNumber>);
    get tsst(): NumberToVec4<TNumber>;
    set tsst(value: Vec4OrLessOrNumber<TNumber>);
    get yxyx(): NumberToVec4<TNumber>;
    set yxyx(value: Vec4OrLessOrNumber<TNumber>);
    get grgr(): NumberToVec4<TNumber>;
    set grgr(value: Vec4OrLessOrNumber<TNumber>);
    get tsts(): NumberToVec4<TNumber>;
    set tsts(value: Vec4OrLessOrNumber<TNumber>);
    get yxyy(): NumberToVec4<TNumber>;
    set yxyy(value: Vec4OrLessOrNumber<TNumber>);
    get grgg(): NumberToVec4<TNumber>;
    set grgg(value: Vec4OrLessOrNumber<TNumber>);
    get tstt(): NumberToVec4<TNumber>;
    set tstt(value: Vec4OrLessOrNumber<TNumber>);
    get yyxx(): NumberToVec4<TNumber>;
    set yyxx(value: Vec4OrLessOrNumber<TNumber>);
    get ggrr(): NumberToVec4<TNumber>;
    set ggrr(value: Vec4OrLessOrNumber<TNumber>);
    get ttss(): NumberToVec4<TNumber>;
    set ttss(value: Vec4OrLessOrNumber<TNumber>);
    get yyxy(): NumberToVec4<TNumber>;
    set yyxy(value: Vec4OrLessOrNumber<TNumber>);
    get ggrg(): NumberToVec4<TNumber>;
    set ggrg(value: Vec4OrLessOrNumber<TNumber>);
    get ttst(): NumberToVec4<TNumber>;
    set ttst(value: Vec4OrLessOrNumber<TNumber>);
    get yyyx(): NumberToVec4<TNumber>;
    set yyyx(value: Vec4OrLessOrNumber<TNumber>);
    get gggr(): NumberToVec4<TNumber>;
    set gggr(value: Vec4OrLessOrNumber<TNumber>);
    get ttts(): NumberToVec4<TNumber>;
    set ttts(value: Vec4OrLessOrNumber<TNumber>);
    get yyyy(): NumberToVec4<TNumber>;
    set yyyy(value: Vec4OrLessOrNumber<TNumber>);
    get gggg(): NumberToVec4<TNumber>;
    set gggg(value: Vec4OrLessOrNumber<TNumber>);
    get tttt(): NumberToVec4<TNumber>;
    set tttt(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle3In4Out<TNumber extends NumberType> extends Swizzle2In4Out<TNumber> {
    get xxxz(): NumberToVec4<TNumber>;
    set xxxz(value: Vec4OrLessOrNumber<TNumber>);
    get rrrb(): NumberToVec4<TNumber>;
    set rrrb(value: Vec4OrLessOrNumber<TNumber>);
    get sssp(): NumberToVec4<TNumber>;
    set sssp(value: Vec4OrLessOrNumber<TNumber>);
    get xxyz(): NumberToVec4<TNumber>;
    set xxyz(value: Vec4OrLessOrNumber<TNumber>);
    get rrgb(): NumberToVec4<TNumber>;
    set rrgb(value: Vec4OrLessOrNumber<TNumber>);
    get sstp(): NumberToVec4<TNumber>;
    set sstp(value: Vec4OrLessOrNumber<TNumber>);
    get xxzx(): NumberToVec4<TNumber>;
    set xxzx(value: Vec4OrLessOrNumber<TNumber>);
    get rrbr(): NumberToVec4<TNumber>;
    set rrbr(value: Vec4OrLessOrNumber<TNumber>);
    get ssps(): NumberToVec4<TNumber>;
    set ssps(value: Vec4OrLessOrNumber<TNumber>);
    get xxzy(): NumberToVec4<TNumber>;
    set xxzy(value: Vec4OrLessOrNumber<TNumber>);
    get rrbg(): NumberToVec4<TNumber>;
    set rrbg(value: Vec4OrLessOrNumber<TNumber>);
    get sspt(): NumberToVec4<TNumber>;
    set sspt(value: Vec4OrLessOrNumber<TNumber>);
    get xxzz(): NumberToVec4<TNumber>;
    set xxzz(value: Vec4OrLessOrNumber<TNumber>);
    get rrbb(): NumberToVec4<TNumber>;
    set rrbb(value: Vec4OrLessOrNumber<TNumber>);
    get sspp(): NumberToVec4<TNumber>;
    set sspp(value: Vec4OrLessOrNumber<TNumber>);
    get xyxz(): NumberToVec4<TNumber>;
    set xyxz(value: Vec4OrLessOrNumber<TNumber>);
    get rgrb(): NumberToVec4<TNumber>;
    set rgrb(value: Vec4OrLessOrNumber<TNumber>);
    get stsp(): NumberToVec4<TNumber>;
    set stsp(value: Vec4OrLessOrNumber<TNumber>);
    get xyyz(): NumberToVec4<TNumber>;
    set xyyz(value: Vec4OrLessOrNumber<TNumber>);
    get rggb(): NumberToVec4<TNumber>;
    set rggb(value: Vec4OrLessOrNumber<TNumber>);
    get sttp(): NumberToVec4<TNumber>;
    set sttp(value: Vec4OrLessOrNumber<TNumber>);
    get xyzx(): NumberToVec4<TNumber>;
    set xyzx(value: Vec4OrLessOrNumber<TNumber>);
    get rgbr(): NumberToVec4<TNumber>;
    set rgbr(value: Vec4OrLessOrNumber<TNumber>);
    get stps(): NumberToVec4<TNumber>;
    set stps(value: Vec4OrLessOrNumber<TNumber>);
    get xyzy(): NumberToVec4<TNumber>;
    set xyzy(value: Vec4OrLessOrNumber<TNumber>);
    get rgbg(): NumberToVec4<TNumber>;
    set rgbg(value: Vec4OrLessOrNumber<TNumber>);
    get stpt(): NumberToVec4<TNumber>;
    set stpt(value: Vec4OrLessOrNumber<TNumber>);
    get xyzz(): NumberToVec4<TNumber>;
    set xyzz(value: Vec4OrLessOrNumber<TNumber>);
    get rgbb(): NumberToVec4<TNumber>;
    set rgbb(value: Vec4OrLessOrNumber<TNumber>);
    get stpp(): NumberToVec4<TNumber>;
    set stpp(value: Vec4OrLessOrNumber<TNumber>);
    get xzxx(): NumberToVec4<TNumber>;
    set xzxx(value: Vec4OrLessOrNumber<TNumber>);
    get rbrr(): NumberToVec4<TNumber>;
    set rbrr(value: Vec4OrLessOrNumber<TNumber>);
    get spss(): NumberToVec4<TNumber>;
    set spss(value: Vec4OrLessOrNumber<TNumber>);
    get xzxy(): NumberToVec4<TNumber>;
    set xzxy(value: Vec4OrLessOrNumber<TNumber>);
    get rbrg(): NumberToVec4<TNumber>;
    set rbrg(value: Vec4OrLessOrNumber<TNumber>);
    get spst(): NumberToVec4<TNumber>;
    set spst(value: Vec4OrLessOrNumber<TNumber>);
    get xzxz(): NumberToVec4<TNumber>;
    set xzxz(value: Vec4OrLessOrNumber<TNumber>);
    get rbrb(): NumberToVec4<TNumber>;
    set rbrb(value: Vec4OrLessOrNumber<TNumber>);
    get spsp(): NumberToVec4<TNumber>;
    set spsp(value: Vec4OrLessOrNumber<TNumber>);
    get xzyx(): NumberToVec4<TNumber>;
    set xzyx(value: Vec4OrLessOrNumber<TNumber>);
    get rbgr(): NumberToVec4<TNumber>;
    set rbgr(value: Vec4OrLessOrNumber<TNumber>);
    get spts(): NumberToVec4<TNumber>;
    set spts(value: Vec4OrLessOrNumber<TNumber>);
    get xzyy(): NumberToVec4<TNumber>;
    set xzyy(value: Vec4OrLessOrNumber<TNumber>);
    get rbgg(): NumberToVec4<TNumber>;
    set rbgg(value: Vec4OrLessOrNumber<TNumber>);
    get sptt(): NumberToVec4<TNumber>;
    set sptt(value: Vec4OrLessOrNumber<TNumber>);
    get xzyz(): NumberToVec4<TNumber>;
    set xzyz(value: Vec4OrLessOrNumber<TNumber>);
    get rbgb(): NumberToVec4<TNumber>;
    set rbgb(value: Vec4OrLessOrNumber<TNumber>);
    get sptp(): NumberToVec4<TNumber>;
    set sptp(value: Vec4OrLessOrNumber<TNumber>);
    get xzzx(): NumberToVec4<TNumber>;
    set xzzx(value: Vec4OrLessOrNumber<TNumber>);
    get rbbr(): NumberToVec4<TNumber>;
    set rbbr(value: Vec4OrLessOrNumber<TNumber>);
    get spps(): NumberToVec4<TNumber>;
    set spps(value: Vec4OrLessOrNumber<TNumber>);
    get xzzy(): NumberToVec4<TNumber>;
    set xzzy(value: Vec4OrLessOrNumber<TNumber>);
    get rbbg(): NumberToVec4<TNumber>;
    set rbbg(value: Vec4OrLessOrNumber<TNumber>);
    get sppt(): NumberToVec4<TNumber>;
    set sppt(value: Vec4OrLessOrNumber<TNumber>);
    get xzzz(): NumberToVec4<TNumber>;
    set xzzz(value: Vec4OrLessOrNumber<TNumber>);
    get rbbb(): NumberToVec4<TNumber>;
    set rbbb(value: Vec4OrLessOrNumber<TNumber>);
    get sppp(): NumberToVec4<TNumber>;
    set sppp(value: Vec4OrLessOrNumber<TNumber>);
    get yxxz(): NumberToVec4<TNumber>;
    set yxxz(value: Vec4OrLessOrNumber<TNumber>);
    get grrb(): NumberToVec4<TNumber>;
    set grrb(value: Vec4OrLessOrNumber<TNumber>);
    get tssp(): NumberToVec4<TNumber>;
    set tssp(value: Vec4OrLessOrNumber<TNumber>);
    get yxyz(): NumberToVec4<TNumber>;
    set yxyz(value: Vec4OrLessOrNumber<TNumber>);
    get grgb(): NumberToVec4<TNumber>;
    set grgb(value: Vec4OrLessOrNumber<TNumber>);
    get tstp(): NumberToVec4<TNumber>;
    set tstp(value: Vec4OrLessOrNumber<TNumber>);
    get yxzx(): NumberToVec4<TNumber>;
    set yxzx(value: Vec4OrLessOrNumber<TNumber>);
    get grbr(): NumberToVec4<TNumber>;
    set grbr(value: Vec4OrLessOrNumber<TNumber>);
    get tsps(): NumberToVec4<TNumber>;
    set tsps(value: Vec4OrLessOrNumber<TNumber>);
    get yxzy(): NumberToVec4<TNumber>;
    set yxzy(value: Vec4OrLessOrNumber<TNumber>);
    get grbg(): NumberToVec4<TNumber>;
    set grbg(value: Vec4OrLessOrNumber<TNumber>);
    get tspt(): NumberToVec4<TNumber>;
    set tspt(value: Vec4OrLessOrNumber<TNumber>);
    get yxzz(): NumberToVec4<TNumber>;
    set yxzz(value: Vec4OrLessOrNumber<TNumber>);
    get grbb(): NumberToVec4<TNumber>;
    set grbb(value: Vec4OrLessOrNumber<TNumber>);
    get tspp(): NumberToVec4<TNumber>;
    set tspp(value: Vec4OrLessOrNumber<TNumber>);
    get yyxz(): NumberToVec4<TNumber>;
    set yyxz(value: Vec4OrLessOrNumber<TNumber>);
    get ggrb(): NumberToVec4<TNumber>;
    set ggrb(value: Vec4OrLessOrNumber<TNumber>);
    get ttsp(): NumberToVec4<TNumber>;
    set ttsp(value: Vec4OrLessOrNumber<TNumber>);
    get yyyz(): NumberToVec4<TNumber>;
    set yyyz(value: Vec4OrLessOrNumber<TNumber>);
    get gggb(): NumberToVec4<TNumber>;
    set gggb(value: Vec4OrLessOrNumber<TNumber>);
    get tttp(): NumberToVec4<TNumber>;
    set tttp(value: Vec4OrLessOrNumber<TNumber>);
    get yyzx(): NumberToVec4<TNumber>;
    set yyzx(value: Vec4OrLessOrNumber<TNumber>);
    get ggbr(): NumberToVec4<TNumber>;
    set ggbr(value: Vec4OrLessOrNumber<TNumber>);
    get ttps(): NumberToVec4<TNumber>;
    set ttps(value: Vec4OrLessOrNumber<TNumber>);
    get yyzy(): NumberToVec4<TNumber>;
    set yyzy(value: Vec4OrLessOrNumber<TNumber>);
    get ggbg(): NumberToVec4<TNumber>;
    set ggbg(value: Vec4OrLessOrNumber<TNumber>);
    get ttpt(): NumberToVec4<TNumber>;
    set ttpt(value: Vec4OrLessOrNumber<TNumber>);
    get yyzz(): NumberToVec4<TNumber>;
    set yyzz(value: Vec4OrLessOrNumber<TNumber>);
    get ggbb(): NumberToVec4<TNumber>;
    set ggbb(value: Vec4OrLessOrNumber<TNumber>);
    get ttpp(): NumberToVec4<TNumber>;
    set ttpp(value: Vec4OrLessOrNumber<TNumber>);
    get yzxx(): NumberToVec4<TNumber>;
    set yzxx(value: Vec4OrLessOrNumber<TNumber>);
    get gbrr(): NumberToVec4<TNumber>;
    set gbrr(value: Vec4OrLessOrNumber<TNumber>);
    get tpss(): NumberToVec4<TNumber>;
    set tpss(value: Vec4OrLessOrNumber<TNumber>);
    get yzxy(): NumberToVec4<TNumber>;
    set yzxy(value: Vec4OrLessOrNumber<TNumber>);
    get gbrg(): NumberToVec4<TNumber>;
    set gbrg(value: Vec4OrLessOrNumber<TNumber>);
    get tpst(): NumberToVec4<TNumber>;
    set tpst(value: Vec4OrLessOrNumber<TNumber>);
    get yzxz(): NumberToVec4<TNumber>;
    set yzxz(value: Vec4OrLessOrNumber<TNumber>);
    get gbrb(): NumberToVec4<TNumber>;
    set gbrb(value: Vec4OrLessOrNumber<TNumber>);
    get tpsp(): NumberToVec4<TNumber>;
    set tpsp(value: Vec4OrLessOrNumber<TNumber>);
    get yzyx(): NumberToVec4<TNumber>;
    set yzyx(value: Vec4OrLessOrNumber<TNumber>);
    get gbgr(): NumberToVec4<TNumber>;
    set gbgr(value: Vec4OrLessOrNumber<TNumber>);
    get tpts(): NumberToVec4<TNumber>;
    set tpts(value: Vec4OrLessOrNumber<TNumber>);
    get yzyy(): NumberToVec4<TNumber>;
    set yzyy(value: Vec4OrLessOrNumber<TNumber>);
    get gbgg(): NumberToVec4<TNumber>;
    set gbgg(value: Vec4OrLessOrNumber<TNumber>);
    get tptt(): NumberToVec4<TNumber>;
    set tptt(value: Vec4OrLessOrNumber<TNumber>);
    get yzyz(): NumberToVec4<TNumber>;
    set yzyz(value: Vec4OrLessOrNumber<TNumber>);
    get gbgb(): NumberToVec4<TNumber>;
    set gbgb(value: Vec4OrLessOrNumber<TNumber>);
    get tptp(): NumberToVec4<TNumber>;
    set tptp(value: Vec4OrLessOrNumber<TNumber>);
    get yzzx(): NumberToVec4<TNumber>;
    set yzzx(value: Vec4OrLessOrNumber<TNumber>);
    get gbbr(): NumberToVec4<TNumber>;
    set gbbr(value: Vec4OrLessOrNumber<TNumber>);
    get tpps(): NumberToVec4<TNumber>;
    set tpps(value: Vec4OrLessOrNumber<TNumber>);
    get yzzy(): NumberToVec4<TNumber>;
    set yzzy(value: Vec4OrLessOrNumber<TNumber>);
    get gbbg(): NumberToVec4<TNumber>;
    set gbbg(value: Vec4OrLessOrNumber<TNumber>);
    get tppt(): NumberToVec4<TNumber>;
    set tppt(value: Vec4OrLessOrNumber<TNumber>);
    get yzzz(): NumberToVec4<TNumber>;
    set yzzz(value: Vec4OrLessOrNumber<TNumber>);
    get gbbb(): NumberToVec4<TNumber>;
    set gbbb(value: Vec4OrLessOrNumber<TNumber>);
    get tppp(): NumberToVec4<TNumber>;
    set tppp(value: Vec4OrLessOrNumber<TNumber>);
    get zxxx(): NumberToVec4<TNumber>;
    set zxxx(value: Vec4OrLessOrNumber<TNumber>);
    get brrr(): NumberToVec4<TNumber>;
    set brrr(value: Vec4OrLessOrNumber<TNumber>);
    get psss(): NumberToVec4<TNumber>;
    set psss(value: Vec4OrLessOrNumber<TNumber>);
    get zxxy(): NumberToVec4<TNumber>;
    set zxxy(value: Vec4OrLessOrNumber<TNumber>);
    get brrg(): NumberToVec4<TNumber>;
    set brrg(value: Vec4OrLessOrNumber<TNumber>);
    get psst(): NumberToVec4<TNumber>;
    set psst(value: Vec4OrLessOrNumber<TNumber>);
    get zxxz(): NumberToVec4<TNumber>;
    set zxxz(value: Vec4OrLessOrNumber<TNumber>);
    get brrb(): NumberToVec4<TNumber>;
    set brrb(value: Vec4OrLessOrNumber<TNumber>);
    get pssp(): NumberToVec4<TNumber>;
    set pssp(value: Vec4OrLessOrNumber<TNumber>);
    get zxyx(): NumberToVec4<TNumber>;
    set zxyx(value: Vec4OrLessOrNumber<TNumber>);
    get brgr(): NumberToVec4<TNumber>;
    set brgr(value: Vec4OrLessOrNumber<TNumber>);
    get psts(): NumberToVec4<TNumber>;
    set psts(value: Vec4OrLessOrNumber<TNumber>);
    get zxyy(): NumberToVec4<TNumber>;
    set zxyy(value: Vec4OrLessOrNumber<TNumber>);
    get brgg(): NumberToVec4<TNumber>;
    set brgg(value: Vec4OrLessOrNumber<TNumber>);
    get pstt(): NumberToVec4<TNumber>;
    set pstt(value: Vec4OrLessOrNumber<TNumber>);
    get zxyz(): NumberToVec4<TNumber>;
    set zxyz(value: Vec4OrLessOrNumber<TNumber>);
    get brgb(): NumberToVec4<TNumber>;
    set brgb(value: Vec4OrLessOrNumber<TNumber>);
    get pstp(): NumberToVec4<TNumber>;
    set pstp(value: Vec4OrLessOrNumber<TNumber>);
    get zxzx(): NumberToVec4<TNumber>;
    set zxzx(value: Vec4OrLessOrNumber<TNumber>);
    get brbr(): NumberToVec4<TNumber>;
    set brbr(value: Vec4OrLessOrNumber<TNumber>);
    get psps(): NumberToVec4<TNumber>;
    set psps(value: Vec4OrLessOrNumber<TNumber>);
    get zxzy(): NumberToVec4<TNumber>;
    set zxzy(value: Vec4OrLessOrNumber<TNumber>);
    get brbg(): NumberToVec4<TNumber>;
    set brbg(value: Vec4OrLessOrNumber<TNumber>);
    get pspt(): NumberToVec4<TNumber>;
    set pspt(value: Vec4OrLessOrNumber<TNumber>);
    get zxzz(): NumberToVec4<TNumber>;
    set zxzz(value: Vec4OrLessOrNumber<TNumber>);
    get brbb(): NumberToVec4<TNumber>;
    set brbb(value: Vec4OrLessOrNumber<TNumber>);
    get pspp(): NumberToVec4<TNumber>;
    set pspp(value: Vec4OrLessOrNumber<TNumber>);
    get zyxx(): NumberToVec4<TNumber>;
    set zyxx(value: Vec4OrLessOrNumber<TNumber>);
    get bgrr(): NumberToVec4<TNumber>;
    set bgrr(value: Vec4OrLessOrNumber<TNumber>);
    get ptss(): NumberToVec4<TNumber>;
    set ptss(value: Vec4OrLessOrNumber<TNumber>);
    get zyxy(): NumberToVec4<TNumber>;
    set zyxy(value: Vec4OrLessOrNumber<TNumber>);
    get bgrg(): NumberToVec4<TNumber>;
    set bgrg(value: Vec4OrLessOrNumber<TNumber>);
    get ptst(): NumberToVec4<TNumber>;
    set ptst(value: Vec4OrLessOrNumber<TNumber>);
    get zyxz(): NumberToVec4<TNumber>;
    set zyxz(value: Vec4OrLessOrNumber<TNumber>);
    get bgrb(): NumberToVec4<TNumber>;
    set bgrb(value: Vec4OrLessOrNumber<TNumber>);
    get ptsp(): NumberToVec4<TNumber>;
    set ptsp(value: Vec4OrLessOrNumber<TNumber>);
    get zyyx(): NumberToVec4<TNumber>;
    set zyyx(value: Vec4OrLessOrNumber<TNumber>);
    get bggr(): NumberToVec4<TNumber>;
    set bggr(value: Vec4OrLessOrNumber<TNumber>);
    get ptts(): NumberToVec4<TNumber>;
    set ptts(value: Vec4OrLessOrNumber<TNumber>);
    get zyyy(): NumberToVec4<TNumber>;
    set zyyy(value: Vec4OrLessOrNumber<TNumber>);
    get bggg(): NumberToVec4<TNumber>;
    set bggg(value: Vec4OrLessOrNumber<TNumber>);
    get pttt(): NumberToVec4<TNumber>;
    set pttt(value: Vec4OrLessOrNumber<TNumber>);
    get zyyz(): NumberToVec4<TNumber>;
    set zyyz(value: Vec4OrLessOrNumber<TNumber>);
    get bggb(): NumberToVec4<TNumber>;
    set bggb(value: Vec4OrLessOrNumber<TNumber>);
    get pttp(): NumberToVec4<TNumber>;
    set pttp(value: Vec4OrLessOrNumber<TNumber>);
    get zyzx(): NumberToVec4<TNumber>;
    set zyzx(value: Vec4OrLessOrNumber<TNumber>);
    get bgbr(): NumberToVec4<TNumber>;
    set bgbr(value: Vec4OrLessOrNumber<TNumber>);
    get ptps(): NumberToVec4<TNumber>;
    set ptps(value: Vec4OrLessOrNumber<TNumber>);
    get zyzy(): NumberToVec4<TNumber>;
    set zyzy(value: Vec4OrLessOrNumber<TNumber>);
    get bgbg(): NumberToVec4<TNumber>;
    set bgbg(value: Vec4OrLessOrNumber<TNumber>);
    get ptpt(): NumberToVec4<TNumber>;
    set ptpt(value: Vec4OrLessOrNumber<TNumber>);
    get zyzz(): NumberToVec4<TNumber>;
    set zyzz(value: Vec4OrLessOrNumber<TNumber>);
    get bgbb(): NumberToVec4<TNumber>;
    set bgbb(value: Vec4OrLessOrNumber<TNumber>);
    get ptpp(): NumberToVec4<TNumber>;
    set ptpp(value: Vec4OrLessOrNumber<TNumber>);
    get zzxx(): NumberToVec4<TNumber>;
    set zzxx(value: Vec4OrLessOrNumber<TNumber>);
    get bbrr(): NumberToVec4<TNumber>;
    set bbrr(value: Vec4OrLessOrNumber<TNumber>);
    get ppss(): NumberToVec4<TNumber>;
    set ppss(value: Vec4OrLessOrNumber<TNumber>);
    get zzxy(): NumberToVec4<TNumber>;
    set zzxy(value: Vec4OrLessOrNumber<TNumber>);
    get bbrg(): NumberToVec4<TNumber>;
    set bbrg(value: Vec4OrLessOrNumber<TNumber>);
    get ppst(): NumberToVec4<TNumber>;
    set ppst(value: Vec4OrLessOrNumber<TNumber>);
    get zzxz(): NumberToVec4<TNumber>;
    set zzxz(value: Vec4OrLessOrNumber<TNumber>);
    get bbrb(): NumberToVec4<TNumber>;
    set bbrb(value: Vec4OrLessOrNumber<TNumber>);
    get ppsp(): NumberToVec4<TNumber>;
    set ppsp(value: Vec4OrLessOrNumber<TNumber>);
    get zzyx(): NumberToVec4<TNumber>;
    set zzyx(value: Vec4OrLessOrNumber<TNumber>);
    get bbgr(): NumberToVec4<TNumber>;
    set bbgr(value: Vec4OrLessOrNumber<TNumber>);
    get ppts(): NumberToVec4<TNumber>;
    set ppts(value: Vec4OrLessOrNumber<TNumber>);
    get zzyy(): NumberToVec4<TNumber>;
    set zzyy(value: Vec4OrLessOrNumber<TNumber>);
    get bbgg(): NumberToVec4<TNumber>;
    set bbgg(value: Vec4OrLessOrNumber<TNumber>);
    get pptt(): NumberToVec4<TNumber>;
    set pptt(value: Vec4OrLessOrNumber<TNumber>);
    get zzyz(): NumberToVec4<TNumber>;
    set zzyz(value: Vec4OrLessOrNumber<TNumber>);
    get bbgb(): NumberToVec4<TNumber>;
    set bbgb(value: Vec4OrLessOrNumber<TNumber>);
    get pptp(): NumberToVec4<TNumber>;
    set pptp(value: Vec4OrLessOrNumber<TNumber>);
    get zzzx(): NumberToVec4<TNumber>;
    set zzzx(value: Vec4OrLessOrNumber<TNumber>);
    get bbbr(): NumberToVec4<TNumber>;
    set bbbr(value: Vec4OrLessOrNumber<TNumber>);
    get ppps(): NumberToVec4<TNumber>;
    set ppps(value: Vec4OrLessOrNumber<TNumber>);
    get zzzy(): NumberToVec4<TNumber>;
    set zzzy(value: Vec4OrLessOrNumber<TNumber>);
    get bbbg(): NumberToVec4<TNumber>;
    set bbbg(value: Vec4OrLessOrNumber<TNumber>);
    get pppt(): NumberToVec4<TNumber>;
    set pppt(value: Vec4OrLessOrNumber<TNumber>);
    get zzzz(): NumberToVec4<TNumber>;
    set zzzz(value: Vec4OrLessOrNumber<TNumber>);
    get bbbb(): NumberToVec4<TNumber>;
    set bbbb(value: Vec4OrLessOrNumber<TNumber>);
    get pppp(): NumberToVec4<TNumber>;
    set pppp(value: Vec4OrLessOrNumber<TNumber>);
}

interface Swizzle4In4Out<TNumber extends NumberType> extends Swizzle3In4Out<TNumber> {
    get xxxw(): NumberToVec4<TNumber>;
    set xxxw(value: Vec4OrLessOrNumber<TNumber>);
    get rrra(): NumberToVec4<TNumber>;
    set rrra(value: Vec4OrLessOrNumber<TNumber>);
    get sssq(): NumberToVec4<TNumber>;
    set sssq(value: Vec4OrLessOrNumber<TNumber>);
    get xxyw(): NumberToVec4<TNumber>;
    set xxyw(value: Vec4OrLessOrNumber<TNumber>);
    get rrga(): NumberToVec4<TNumber>;
    set rrga(value: Vec4OrLessOrNumber<TNumber>);
    get sstq(): NumberToVec4<TNumber>;
    set sstq(value: Vec4OrLessOrNumber<TNumber>);
    get xxzw(): NumberToVec4<TNumber>;
    set xxzw(value: Vec4OrLessOrNumber<TNumber>);
    get rrba(): NumberToVec4<TNumber>;
    set rrba(value: Vec4OrLessOrNumber<TNumber>);
    get sspq(): NumberToVec4<TNumber>;
    set sspq(value: Vec4OrLessOrNumber<TNumber>);
    get xxwx(): NumberToVec4<TNumber>;
    set xxwx(value: Vec4OrLessOrNumber<TNumber>);
    get rrar(): NumberToVec4<TNumber>;
    set rrar(value: Vec4OrLessOrNumber<TNumber>);
    get ssqs(): NumberToVec4<TNumber>;
    set ssqs(value: Vec4OrLessOrNumber<TNumber>);
    get xxwy(): NumberToVec4<TNumber>;
    set xxwy(value: Vec4OrLessOrNumber<TNumber>);
    get rrag(): NumberToVec4<TNumber>;
    set rrag(value: Vec4OrLessOrNumber<TNumber>);
    get ssqt(): NumberToVec4<TNumber>;
    set ssqt(value: Vec4OrLessOrNumber<TNumber>);
    get xxwz(): NumberToVec4<TNumber>;
    set xxwz(value: Vec4OrLessOrNumber<TNumber>);
    get rrab(): NumberToVec4<TNumber>;
    set rrab(value: Vec4OrLessOrNumber<TNumber>);
    get ssqp(): NumberToVec4<TNumber>;
    set ssqp(value: Vec4OrLessOrNumber<TNumber>);
    get xxww(): NumberToVec4<TNumber>;
    set xxww(value: Vec4OrLessOrNumber<TNumber>);
    get rraa(): NumberToVec4<TNumber>;
    set rraa(value: Vec4OrLessOrNumber<TNumber>);
    get ssqq(): NumberToVec4<TNumber>;
    set ssqq(value: Vec4OrLessOrNumber<TNumber>);
    get xyxw(): NumberToVec4<TNumber>;
    set xyxw(value: Vec4OrLessOrNumber<TNumber>);
    get rgra(): NumberToVec4<TNumber>;
    set rgra(value: Vec4OrLessOrNumber<TNumber>);
    get stsq(): NumberToVec4<TNumber>;
    set stsq(value: Vec4OrLessOrNumber<TNumber>);
    get xyyw(): NumberToVec4<TNumber>;
    set xyyw(value: Vec4OrLessOrNumber<TNumber>);
    get rgga(): NumberToVec4<TNumber>;
    set rgga(value: Vec4OrLessOrNumber<TNumber>);
    get sttq(): NumberToVec4<TNumber>;
    set sttq(value: Vec4OrLessOrNumber<TNumber>);
    get xyzw(): NumberToVec4<TNumber>;
    set xyzw(value: Vec4OrLessOrNumber<TNumber>);
    get rgba(): NumberToVec4<TNumber>;
    set rgba(value: Vec4OrLessOrNumber<TNumber>);
    get stpq(): NumberToVec4<TNumber>;
    set stpq(value: Vec4OrLessOrNumber<TNumber>);
    get xywx(): NumberToVec4<TNumber>;
    set xywx(value: Vec4OrLessOrNumber<TNumber>);
    get rgar(): NumberToVec4<TNumber>;
    set rgar(value: Vec4OrLessOrNumber<TNumber>);
    get stqs(): NumberToVec4<TNumber>;
    set stqs(value: Vec4OrLessOrNumber<TNumber>);
    get xywy(): NumberToVec4<TNumber>;
    set xywy(value: Vec4OrLessOrNumber<TNumber>);
    get rgag(): NumberToVec4<TNumber>;
    set rgag(value: Vec4OrLessOrNumber<TNumber>);
    get stqt(): NumberToVec4<TNumber>;
    set stqt(value: Vec4OrLessOrNumber<TNumber>);
    get xywz(): NumberToVec4<TNumber>;
    set xywz(value: Vec4OrLessOrNumber<TNumber>);
    get rgab(): NumberToVec4<TNumber>;
    set rgab(value: Vec4OrLessOrNumber<TNumber>);
    get stqp(): NumberToVec4<TNumber>;
    set stqp(value: Vec4OrLessOrNumber<TNumber>);
    get xyww(): NumberToVec4<TNumber>;
    set xyww(value: Vec4OrLessOrNumber<TNumber>);
    get rgaa(): NumberToVec4<TNumber>;
    set rgaa(value: Vec4OrLessOrNumber<TNumber>);
    get stqq(): NumberToVec4<TNumber>;
    set stqq(value: Vec4OrLessOrNumber<TNumber>);
    get xzxw(): NumberToVec4<TNumber>;
    set xzxw(value: Vec4OrLessOrNumber<TNumber>);
    get rbra(): NumberToVec4<TNumber>;
    set rbra(value: Vec4OrLessOrNumber<TNumber>);
    get spsq(): NumberToVec4<TNumber>;
    set spsq(value: Vec4OrLessOrNumber<TNumber>);
    get xzyw(): NumberToVec4<TNumber>;
    set xzyw(value: Vec4OrLessOrNumber<TNumber>);
    get rbga(): NumberToVec4<TNumber>;
    set rbga(value: Vec4OrLessOrNumber<TNumber>);
    get sptq(): NumberToVec4<TNumber>;
    set sptq(value: Vec4OrLessOrNumber<TNumber>);
    get xzzw(): NumberToVec4<TNumber>;
    set xzzw(value: Vec4OrLessOrNumber<TNumber>);
    get rbba(): NumberToVec4<TNumber>;
    set rbba(value: Vec4OrLessOrNumber<TNumber>);
    get sppq(): NumberToVec4<TNumber>;
    set sppq(value: Vec4OrLessOrNumber<TNumber>);
    get xzwx(): NumberToVec4<TNumber>;
    set xzwx(value: Vec4OrLessOrNumber<TNumber>);
    get rbar(): NumberToVec4<TNumber>;
    set rbar(value: Vec4OrLessOrNumber<TNumber>);
    get spqs(): NumberToVec4<TNumber>;
    set spqs(value: Vec4OrLessOrNumber<TNumber>);
    get xzwy(): NumberToVec4<TNumber>;
    set xzwy(value: Vec4OrLessOrNumber<TNumber>);
    get rbag(): NumberToVec4<TNumber>;
    set rbag(value: Vec4OrLessOrNumber<TNumber>);
    get spqt(): NumberToVec4<TNumber>;
    set spqt(value: Vec4OrLessOrNumber<TNumber>);
    get xzwz(): NumberToVec4<TNumber>;
    set xzwz(value: Vec4OrLessOrNumber<TNumber>);
    get rbab(): NumberToVec4<TNumber>;
    set rbab(value: Vec4OrLessOrNumber<TNumber>);
    get spqp(): NumberToVec4<TNumber>;
    set spqp(value: Vec4OrLessOrNumber<TNumber>);
    get xzww(): NumberToVec4<TNumber>;
    set xzww(value: Vec4OrLessOrNumber<TNumber>);
    get rbaa(): NumberToVec4<TNumber>;
    set rbaa(value: Vec4OrLessOrNumber<TNumber>);
    get spqq(): NumberToVec4<TNumber>;
    set spqq(value: Vec4OrLessOrNumber<TNumber>);
    get xwxx(): NumberToVec4<TNumber>;
    set xwxx(value: Vec4OrLessOrNumber<TNumber>);
    get rarr(): NumberToVec4<TNumber>;
    set rarr(value: Vec4OrLessOrNumber<TNumber>);
    get sqss(): NumberToVec4<TNumber>;
    set sqss(value: Vec4OrLessOrNumber<TNumber>);
    get xwxy(): NumberToVec4<TNumber>;
    set xwxy(value: Vec4OrLessOrNumber<TNumber>);
    get rarg(): NumberToVec4<TNumber>;
    set rarg(value: Vec4OrLessOrNumber<TNumber>);
    get sqst(): NumberToVec4<TNumber>;
    set sqst(value: Vec4OrLessOrNumber<TNumber>);
    get xwxz(): NumberToVec4<TNumber>;
    set xwxz(value: Vec4OrLessOrNumber<TNumber>);
    get rarb(): NumberToVec4<TNumber>;
    set rarb(value: Vec4OrLessOrNumber<TNumber>);
    get sqsp(): NumberToVec4<TNumber>;
    set sqsp(value: Vec4OrLessOrNumber<TNumber>);
    get xwxw(): NumberToVec4<TNumber>;
    set xwxw(value: Vec4OrLessOrNumber<TNumber>);
    get rara(): NumberToVec4<TNumber>;
    set rara(value: Vec4OrLessOrNumber<TNumber>);
    get sqsq(): NumberToVec4<TNumber>;
    set sqsq(value: Vec4OrLessOrNumber<TNumber>);
    get xwyx(): NumberToVec4<TNumber>;
    set xwyx(value: Vec4OrLessOrNumber<TNumber>);
    get ragr(): NumberToVec4<TNumber>;
    set ragr(value: Vec4OrLessOrNumber<TNumber>);
    get sqts(): NumberToVec4<TNumber>;
    set sqts(value: Vec4OrLessOrNumber<TNumber>);
    get xwyy(): NumberToVec4<TNumber>;
    set xwyy(value: Vec4OrLessOrNumber<TNumber>);
    get ragg(): NumberToVec4<TNumber>;
    set ragg(value: Vec4OrLessOrNumber<TNumber>);
    get sqtt(): NumberToVec4<TNumber>;
    set sqtt(value: Vec4OrLessOrNumber<TNumber>);
    get xwyz(): NumberToVec4<TNumber>;
    set xwyz(value: Vec4OrLessOrNumber<TNumber>);
    get ragb(): NumberToVec4<TNumber>;
    set ragb(value: Vec4OrLessOrNumber<TNumber>);
    get sqtp(): NumberToVec4<TNumber>;
    set sqtp(value: Vec4OrLessOrNumber<TNumber>);
    get xwyw(): NumberToVec4<TNumber>;
    set xwyw(value: Vec4OrLessOrNumber<TNumber>);
    get raga(): NumberToVec4<TNumber>;
    set raga(value: Vec4OrLessOrNumber<TNumber>);
    get sqtq(): NumberToVec4<TNumber>;
    set sqtq(value: Vec4OrLessOrNumber<TNumber>);
    get xwzx(): NumberToVec4<TNumber>;
    set xwzx(value: Vec4OrLessOrNumber<TNumber>);
    get rabr(): NumberToVec4<TNumber>;
    set rabr(value: Vec4OrLessOrNumber<TNumber>);
    get sqps(): NumberToVec4<TNumber>;
    set sqps(value: Vec4OrLessOrNumber<TNumber>);
    get xwzy(): NumberToVec4<TNumber>;
    set xwzy(value: Vec4OrLessOrNumber<TNumber>);
    get rabg(): NumberToVec4<TNumber>;
    set rabg(value: Vec4OrLessOrNumber<TNumber>);
    get sqpt(): NumberToVec4<TNumber>;
    set sqpt(value: Vec4OrLessOrNumber<TNumber>);
    get xwzz(): NumberToVec4<TNumber>;
    set xwzz(value: Vec4OrLessOrNumber<TNumber>);
    get rabb(): NumberToVec4<TNumber>;
    set rabb(value: Vec4OrLessOrNumber<TNumber>);
    get sqpp(): NumberToVec4<TNumber>;
    set sqpp(value: Vec4OrLessOrNumber<TNumber>);
    get xwzw(): NumberToVec4<TNumber>;
    set xwzw(value: Vec4OrLessOrNumber<TNumber>);
    get raba(): NumberToVec4<TNumber>;
    set raba(value: Vec4OrLessOrNumber<TNumber>);
    get sqpq(): NumberToVec4<TNumber>;
    set sqpq(value: Vec4OrLessOrNumber<TNumber>);
    get xwwx(): NumberToVec4<TNumber>;
    set xwwx(value: Vec4OrLessOrNumber<TNumber>);
    get raar(): NumberToVec4<TNumber>;
    set raar(value: Vec4OrLessOrNumber<TNumber>);
    get sqqs(): NumberToVec4<TNumber>;
    set sqqs(value: Vec4OrLessOrNumber<TNumber>);
    get xwwy(): NumberToVec4<TNumber>;
    set xwwy(value: Vec4OrLessOrNumber<TNumber>);
    get raag(): NumberToVec4<TNumber>;
    set raag(value: Vec4OrLessOrNumber<TNumber>);
    get sqqt(): NumberToVec4<TNumber>;
    set sqqt(value: Vec4OrLessOrNumber<TNumber>);
    get xwwz(): NumberToVec4<TNumber>;
    set xwwz(value: Vec4OrLessOrNumber<TNumber>);
    get raab(): NumberToVec4<TNumber>;
    set raab(value: Vec4OrLessOrNumber<TNumber>);
    get sqqp(): NumberToVec4<TNumber>;
    set sqqp(value: Vec4OrLessOrNumber<TNumber>);
    get xwww(): NumberToVec4<TNumber>;
    set xwww(value: Vec4OrLessOrNumber<TNumber>);
    get raaa(): NumberToVec4<TNumber>;
    set raaa(value: Vec4OrLessOrNumber<TNumber>);
    get sqqq(): NumberToVec4<TNumber>;
    set sqqq(value: Vec4OrLessOrNumber<TNumber>);
    get yxxw(): NumberToVec4<TNumber>;
    set yxxw(value: Vec4OrLessOrNumber<TNumber>);
    get grra(): NumberToVec4<TNumber>;
    set grra(value: Vec4OrLessOrNumber<TNumber>);
    get tssq(): NumberToVec4<TNumber>;
    set tssq(value: Vec4OrLessOrNumber<TNumber>);
    get yxyw(): NumberToVec4<TNumber>;
    set yxyw(value: Vec4OrLessOrNumber<TNumber>);
    get grga(): NumberToVec4<TNumber>;
    set grga(value: Vec4OrLessOrNumber<TNumber>);
    get tstq(): NumberToVec4<TNumber>;
    set tstq(value: Vec4OrLessOrNumber<TNumber>);
    get yxzw(): NumberToVec4<TNumber>;
    set yxzw(value: Vec4OrLessOrNumber<TNumber>);
    get grba(): NumberToVec4<TNumber>;
    set grba(value: Vec4OrLessOrNumber<TNumber>);
    get tspq(): NumberToVec4<TNumber>;
    set tspq(value: Vec4OrLessOrNumber<TNumber>);
    get yxwx(): NumberToVec4<TNumber>;
    set yxwx(value: Vec4OrLessOrNumber<TNumber>);
    get grar(): NumberToVec4<TNumber>;
    set grar(value: Vec4OrLessOrNumber<TNumber>);
    get tsqs(): NumberToVec4<TNumber>;
    set tsqs(value: Vec4OrLessOrNumber<TNumber>);
    get yxwy(): NumberToVec4<TNumber>;
    set yxwy(value: Vec4OrLessOrNumber<TNumber>);
    get grag(): NumberToVec4<TNumber>;
    set grag(value: Vec4OrLessOrNumber<TNumber>);
    get tsqt(): NumberToVec4<TNumber>;
    set tsqt(value: Vec4OrLessOrNumber<TNumber>);
    get yxwz(): NumberToVec4<TNumber>;
    set yxwz(value: Vec4OrLessOrNumber<TNumber>);
    get grab(): NumberToVec4<TNumber>;
    set grab(value: Vec4OrLessOrNumber<TNumber>);
    get tsqp(): NumberToVec4<TNumber>;
    set tsqp(value: Vec4OrLessOrNumber<TNumber>);
    get yxww(): NumberToVec4<TNumber>;
    set yxww(value: Vec4OrLessOrNumber<TNumber>);
    get graa(): NumberToVec4<TNumber>;
    set graa(value: Vec4OrLessOrNumber<TNumber>);
    get tsqq(): NumberToVec4<TNumber>;
    set tsqq(value: Vec4OrLessOrNumber<TNumber>);
    get yyxw(): NumberToVec4<TNumber>;
    set yyxw(value: Vec4OrLessOrNumber<TNumber>);
    get ggra(): NumberToVec4<TNumber>;
    set ggra(value: Vec4OrLessOrNumber<TNumber>);
    get ttsq(): NumberToVec4<TNumber>;
    set ttsq(value: Vec4OrLessOrNumber<TNumber>);
    get yyyw(): NumberToVec4<TNumber>;
    set yyyw(value: Vec4OrLessOrNumber<TNumber>);
    get ggga(): NumberToVec4<TNumber>;
    set ggga(value: Vec4OrLessOrNumber<TNumber>);
    get tttq(): NumberToVec4<TNumber>;
    set tttq(value: Vec4OrLessOrNumber<TNumber>);
    get yyzw(): NumberToVec4<TNumber>;
    set yyzw(value: Vec4OrLessOrNumber<TNumber>);
    get ggba(): NumberToVec4<TNumber>;
    set ggba(value: Vec4OrLessOrNumber<TNumber>);
    get ttpq(): NumberToVec4<TNumber>;
    set ttpq(value: Vec4OrLessOrNumber<TNumber>);
    get yywx(): NumberToVec4<TNumber>;
    set yywx(value: Vec4OrLessOrNumber<TNumber>);
    get ggar(): NumberToVec4<TNumber>;
    set ggar(value: Vec4OrLessOrNumber<TNumber>);
    get ttqs(): NumberToVec4<TNumber>;
    set ttqs(value: Vec4OrLessOrNumber<TNumber>);
    get yywy(): NumberToVec4<TNumber>;
    set yywy(value: Vec4OrLessOrNumber<TNumber>);
    get ggag(): NumberToVec4<TNumber>;
    set ggag(value: Vec4OrLessOrNumber<TNumber>);
    get ttqt(): NumberToVec4<TNumber>;
    set ttqt(value: Vec4OrLessOrNumber<TNumber>);
    get yywz(): NumberToVec4<TNumber>;
    set yywz(value: Vec4OrLessOrNumber<TNumber>);
    get ggab(): NumberToVec4<TNumber>;
    set ggab(value: Vec4OrLessOrNumber<TNumber>);
    get ttqp(): NumberToVec4<TNumber>;
    set ttqp(value: Vec4OrLessOrNumber<TNumber>);
    get yyww(): NumberToVec4<TNumber>;
    set yyww(value: Vec4OrLessOrNumber<TNumber>);
    get ggaa(): NumberToVec4<TNumber>;
    set ggaa(value: Vec4OrLessOrNumber<TNumber>);
    get ttqq(): NumberToVec4<TNumber>;
    set ttqq(value: Vec4OrLessOrNumber<TNumber>);
    get yzxw(): NumberToVec4<TNumber>;
    set yzxw(value: Vec4OrLessOrNumber<TNumber>);
    get gbra(): NumberToVec4<TNumber>;
    set gbra(value: Vec4OrLessOrNumber<TNumber>);
    get tpsq(): NumberToVec4<TNumber>;
    set tpsq(value: Vec4OrLessOrNumber<TNumber>);
    get yzyw(): NumberToVec4<TNumber>;
    set yzyw(value: Vec4OrLessOrNumber<TNumber>);
    get gbga(): NumberToVec4<TNumber>;
    set gbga(value: Vec4OrLessOrNumber<TNumber>);
    get tptq(): NumberToVec4<TNumber>;
    set tptq(value: Vec4OrLessOrNumber<TNumber>);
    get yzzw(): NumberToVec4<TNumber>;
    set yzzw(value: Vec4OrLessOrNumber<TNumber>);
    get gbba(): NumberToVec4<TNumber>;
    set gbba(value: Vec4OrLessOrNumber<TNumber>);
    get tppq(): NumberToVec4<TNumber>;
    set tppq(value: Vec4OrLessOrNumber<TNumber>);
    get yzwx(): NumberToVec4<TNumber>;
    set yzwx(value: Vec4OrLessOrNumber<TNumber>);
    get gbar(): NumberToVec4<TNumber>;
    set gbar(value: Vec4OrLessOrNumber<TNumber>);
    get tpqs(): NumberToVec4<TNumber>;
    set tpqs(value: Vec4OrLessOrNumber<TNumber>);
    get yzwy(): NumberToVec4<TNumber>;
    set yzwy(value: Vec4OrLessOrNumber<TNumber>);
    get gbag(): NumberToVec4<TNumber>;
    set gbag(value: Vec4OrLessOrNumber<TNumber>);
    get tpqt(): NumberToVec4<TNumber>;
    set tpqt(value: Vec4OrLessOrNumber<TNumber>);
    get yzwz(): NumberToVec4<TNumber>;
    set yzwz(value: Vec4OrLessOrNumber<TNumber>);
    get gbab(): NumberToVec4<TNumber>;
    set gbab(value: Vec4OrLessOrNumber<TNumber>);
    get tpqp(): NumberToVec4<TNumber>;
    set tpqp(value: Vec4OrLessOrNumber<TNumber>);
    get yzww(): NumberToVec4<TNumber>;
    set yzww(value: Vec4OrLessOrNumber<TNumber>);
    get gbaa(): NumberToVec4<TNumber>;
    set gbaa(value: Vec4OrLessOrNumber<TNumber>);
    get tpqq(): NumberToVec4<TNumber>;
    set tpqq(value: Vec4OrLessOrNumber<TNumber>);
    get ywxx(): NumberToVec4<TNumber>;
    set ywxx(value: Vec4OrLessOrNumber<TNumber>);
    get garr(): NumberToVec4<TNumber>;
    set garr(value: Vec4OrLessOrNumber<TNumber>);
    get tqss(): NumberToVec4<TNumber>;
    set tqss(value: Vec4OrLessOrNumber<TNumber>);
    get ywxy(): NumberToVec4<TNumber>;
    set ywxy(value: Vec4OrLessOrNumber<TNumber>);
    get garg(): NumberToVec4<TNumber>;
    set garg(value: Vec4OrLessOrNumber<TNumber>);
    get tqst(): NumberToVec4<TNumber>;
    set tqst(value: Vec4OrLessOrNumber<TNumber>);
    get ywxz(): NumberToVec4<TNumber>;
    set ywxz(value: Vec4OrLessOrNumber<TNumber>);
    get garb(): NumberToVec4<TNumber>;
    set garb(value: Vec4OrLessOrNumber<TNumber>);
    get tqsp(): NumberToVec4<TNumber>;
    set tqsp(value: Vec4OrLessOrNumber<TNumber>);
    get ywxw(): NumberToVec4<TNumber>;
    set ywxw(value: Vec4OrLessOrNumber<TNumber>);
    get gara(): NumberToVec4<TNumber>;
    set gara(value: Vec4OrLessOrNumber<TNumber>);
    get tqsq(): NumberToVec4<TNumber>;
    set tqsq(value: Vec4OrLessOrNumber<TNumber>);
    get ywyx(): NumberToVec4<TNumber>;
    set ywyx(value: Vec4OrLessOrNumber<TNumber>);
    get gagr(): NumberToVec4<TNumber>;
    set gagr(value: Vec4OrLessOrNumber<TNumber>);
    get tqts(): NumberToVec4<TNumber>;
    set tqts(value: Vec4OrLessOrNumber<TNumber>);
    get ywyy(): NumberToVec4<TNumber>;
    set ywyy(value: Vec4OrLessOrNumber<TNumber>);
    get gagg(): NumberToVec4<TNumber>;
    set gagg(value: Vec4OrLessOrNumber<TNumber>);
    get tqtt(): NumberToVec4<TNumber>;
    set tqtt(value: Vec4OrLessOrNumber<TNumber>);
    get ywyz(): NumberToVec4<TNumber>;
    set ywyz(value: Vec4OrLessOrNumber<TNumber>);
    get gagb(): NumberToVec4<TNumber>;
    set gagb(value: Vec4OrLessOrNumber<TNumber>);
    get tqtp(): NumberToVec4<TNumber>;
    set tqtp(value: Vec4OrLessOrNumber<TNumber>);
    get ywyw(): NumberToVec4<TNumber>;
    set ywyw(value: Vec4OrLessOrNumber<TNumber>);
    get gaga(): NumberToVec4<TNumber>;
    set gaga(value: Vec4OrLessOrNumber<TNumber>);
    get tqtq(): NumberToVec4<TNumber>;
    set tqtq(value: Vec4OrLessOrNumber<TNumber>);
    get ywzx(): NumberToVec4<TNumber>;
    set ywzx(value: Vec4OrLessOrNumber<TNumber>);
    get gabr(): NumberToVec4<TNumber>;
    set gabr(value: Vec4OrLessOrNumber<TNumber>);
    get tqps(): NumberToVec4<TNumber>;
    set tqps(value: Vec4OrLessOrNumber<TNumber>);
    get ywzy(): NumberToVec4<TNumber>;
    set ywzy(value: Vec4OrLessOrNumber<TNumber>);
    get gabg(): NumberToVec4<TNumber>;
    set gabg(value: Vec4OrLessOrNumber<TNumber>);
    get tqpt(): NumberToVec4<TNumber>;
    set tqpt(value: Vec4OrLessOrNumber<TNumber>);
    get ywzz(): NumberToVec4<TNumber>;
    set ywzz(value: Vec4OrLessOrNumber<TNumber>);
    get gabb(): NumberToVec4<TNumber>;
    set gabb(value: Vec4OrLessOrNumber<TNumber>);
    get tqpp(): NumberToVec4<TNumber>;
    set tqpp(value: Vec4OrLessOrNumber<TNumber>);
    get ywzw(): NumberToVec4<TNumber>;
    set ywzw(value: Vec4OrLessOrNumber<TNumber>);
    get gaba(): NumberToVec4<TNumber>;
    set gaba(value: Vec4OrLessOrNumber<TNumber>);
    get tqpq(): NumberToVec4<TNumber>;
    set tqpq(value: Vec4OrLessOrNumber<TNumber>);
    get ywwx(): NumberToVec4<TNumber>;
    set ywwx(value: Vec4OrLessOrNumber<TNumber>);
    get gaar(): NumberToVec4<TNumber>;
    set gaar(value: Vec4OrLessOrNumber<TNumber>);
    get tqqs(): NumberToVec4<TNumber>;
    set tqqs(value: Vec4OrLessOrNumber<TNumber>);
    get ywwy(): NumberToVec4<TNumber>;
    set ywwy(value: Vec4OrLessOrNumber<TNumber>);
    get gaag(): NumberToVec4<TNumber>;
    set gaag(value: Vec4OrLessOrNumber<TNumber>);
    get tqqt(): NumberToVec4<TNumber>;
    set tqqt(value: Vec4OrLessOrNumber<TNumber>);
    get ywwz(): NumberToVec4<TNumber>;
    set ywwz(value: Vec4OrLessOrNumber<TNumber>);
    get gaab(): NumberToVec4<TNumber>;
    set gaab(value: Vec4OrLessOrNumber<TNumber>);
    get tqqp(): NumberToVec4<TNumber>;
    set tqqp(value: Vec4OrLessOrNumber<TNumber>);
    get ywww(): NumberToVec4<TNumber>;
    set ywww(value: Vec4OrLessOrNumber<TNumber>);
    get gaaa(): NumberToVec4<TNumber>;
    set gaaa(value: Vec4OrLessOrNumber<TNumber>);
    get tqqq(): NumberToVec4<TNumber>;
    set tqqq(value: Vec4OrLessOrNumber<TNumber>);
    get zxxw(): NumberToVec4<TNumber>;
    set zxxw(value: Vec4OrLessOrNumber<TNumber>);
    get brra(): NumberToVec4<TNumber>;
    set brra(value: Vec4OrLessOrNumber<TNumber>);
    get pssq(): NumberToVec4<TNumber>;
    set pssq(value: Vec4OrLessOrNumber<TNumber>);
    get zxyw(): NumberToVec4<TNumber>;
    set zxyw(value: Vec4OrLessOrNumber<TNumber>);
    get brga(): NumberToVec4<TNumber>;
    set brga(value: Vec4OrLessOrNumber<TNumber>);
    get pstq(): NumberToVec4<TNumber>;
    set pstq(value: Vec4OrLessOrNumber<TNumber>);
    get zxzw(): NumberToVec4<TNumber>;
    set zxzw(value: Vec4OrLessOrNumber<TNumber>);
    get brba(): NumberToVec4<TNumber>;
    set brba(value: Vec4OrLessOrNumber<TNumber>);
    get pspq(): NumberToVec4<TNumber>;
    set pspq(value: Vec4OrLessOrNumber<TNumber>);
    get zxwx(): NumberToVec4<TNumber>;
    set zxwx(value: Vec4OrLessOrNumber<TNumber>);
    get brar(): NumberToVec4<TNumber>;
    set brar(value: Vec4OrLessOrNumber<TNumber>);
    get psqs(): NumberToVec4<TNumber>;
    set psqs(value: Vec4OrLessOrNumber<TNumber>);
    get zxwy(): NumberToVec4<TNumber>;
    set zxwy(value: Vec4OrLessOrNumber<TNumber>);
    get brag(): NumberToVec4<TNumber>;
    set brag(value: Vec4OrLessOrNumber<TNumber>);
    get psqt(): NumberToVec4<TNumber>;
    set psqt(value: Vec4OrLessOrNumber<TNumber>);
    get zxwz(): NumberToVec4<TNumber>;
    set zxwz(value: Vec4OrLessOrNumber<TNumber>);
    get brab(): NumberToVec4<TNumber>;
    set brab(value: Vec4OrLessOrNumber<TNumber>);
    get psqp(): NumberToVec4<TNumber>;
    set psqp(value: Vec4OrLessOrNumber<TNumber>);
    get zxww(): NumberToVec4<TNumber>;
    set zxww(value: Vec4OrLessOrNumber<TNumber>);
    get braa(): NumberToVec4<TNumber>;
    set braa(value: Vec4OrLessOrNumber<TNumber>);
    get psqq(): NumberToVec4<TNumber>;
    set psqq(value: Vec4OrLessOrNumber<TNumber>);
    get zyxw(): NumberToVec4<TNumber>;
    set zyxw(value: Vec4OrLessOrNumber<TNumber>);
    get bgra(): NumberToVec4<TNumber>;
    set bgra(value: Vec4OrLessOrNumber<TNumber>);
    get ptsq(): NumberToVec4<TNumber>;
    set ptsq(value: Vec4OrLessOrNumber<TNumber>);
    get zyyw(): NumberToVec4<TNumber>;
    set zyyw(value: Vec4OrLessOrNumber<TNumber>);
    get bgga(): NumberToVec4<TNumber>;
    set bgga(value: Vec4OrLessOrNumber<TNumber>);
    get pttq(): NumberToVec4<TNumber>;
    set pttq(value: Vec4OrLessOrNumber<TNumber>);
    get zyzw(): NumberToVec4<TNumber>;
    set zyzw(value: Vec4OrLessOrNumber<TNumber>);
    get bgba(): NumberToVec4<TNumber>;
    set bgba(value: Vec4OrLessOrNumber<TNumber>);
    get ptpq(): NumberToVec4<TNumber>;
    set ptpq(value: Vec4OrLessOrNumber<TNumber>);
    get zywx(): NumberToVec4<TNumber>;
    set zywx(value: Vec4OrLessOrNumber<TNumber>);
    get bgar(): NumberToVec4<TNumber>;
    set bgar(value: Vec4OrLessOrNumber<TNumber>);
    get ptqs(): NumberToVec4<TNumber>;
    set ptqs(value: Vec4OrLessOrNumber<TNumber>);
    get zywy(): NumberToVec4<TNumber>;
    set zywy(value: Vec4OrLessOrNumber<TNumber>);
    get bgag(): NumberToVec4<TNumber>;
    set bgag(value: Vec4OrLessOrNumber<TNumber>);
    get ptqt(): NumberToVec4<TNumber>;
    set ptqt(value: Vec4OrLessOrNumber<TNumber>);
    get zywz(): NumberToVec4<TNumber>;
    set zywz(value: Vec4OrLessOrNumber<TNumber>);
    get bgab(): NumberToVec4<TNumber>;
    set bgab(value: Vec4OrLessOrNumber<TNumber>);
    get ptqp(): NumberToVec4<TNumber>;
    set ptqp(value: Vec4OrLessOrNumber<TNumber>);
    get zyww(): NumberToVec4<TNumber>;
    set zyww(value: Vec4OrLessOrNumber<TNumber>);
    get bgaa(): NumberToVec4<TNumber>;
    set bgaa(value: Vec4OrLessOrNumber<TNumber>);
    get ptqq(): NumberToVec4<TNumber>;
    set ptqq(value: Vec4OrLessOrNumber<TNumber>);
    get zzxw(): NumberToVec4<TNumber>;
    set zzxw(value: Vec4OrLessOrNumber<TNumber>);
    get bbra(): NumberToVec4<TNumber>;
    set bbra(value: Vec4OrLessOrNumber<TNumber>);
    get ppsq(): NumberToVec4<TNumber>;
    set ppsq(value: Vec4OrLessOrNumber<TNumber>);
    get zzyw(): NumberToVec4<TNumber>;
    set zzyw(value: Vec4OrLessOrNumber<TNumber>);
    get bbga(): NumberToVec4<TNumber>;
    set bbga(value: Vec4OrLessOrNumber<TNumber>);
    get pptq(): NumberToVec4<TNumber>;
    set pptq(value: Vec4OrLessOrNumber<TNumber>);
    get zzzw(): NumberToVec4<TNumber>;
    set zzzw(value: Vec4OrLessOrNumber<TNumber>);
    get bbba(): NumberToVec4<TNumber>;
    set bbba(value: Vec4OrLessOrNumber<TNumber>);
    get pppq(): NumberToVec4<TNumber>;
    set pppq(value: Vec4OrLessOrNumber<TNumber>);
    get zzwx(): NumberToVec4<TNumber>;
    set zzwx(value: Vec4OrLessOrNumber<TNumber>);
    get bbar(): NumberToVec4<TNumber>;
    set bbar(value: Vec4OrLessOrNumber<TNumber>);
    get ppqs(): NumberToVec4<TNumber>;
    set ppqs(value: Vec4OrLessOrNumber<TNumber>);
    get zzwy(): NumberToVec4<TNumber>;
    set zzwy(value: Vec4OrLessOrNumber<TNumber>);
    get bbag(): NumberToVec4<TNumber>;
    set bbag(value: Vec4OrLessOrNumber<TNumber>);
    get ppqt(): NumberToVec4<TNumber>;
    set ppqt(value: Vec4OrLessOrNumber<TNumber>);
    get zzwz(): NumberToVec4<TNumber>;
    set zzwz(value: Vec4OrLessOrNumber<TNumber>);
    get bbab(): NumberToVec4<TNumber>;
    set bbab(value: Vec4OrLessOrNumber<TNumber>);
    get ppqp(): NumberToVec4<TNumber>;
    set ppqp(value: Vec4OrLessOrNumber<TNumber>);
    get zzww(): NumberToVec4<TNumber>;
    set zzww(value: Vec4OrLessOrNumber<TNumber>);
    get bbaa(): NumberToVec4<TNumber>;
    set bbaa(value: Vec4OrLessOrNumber<TNumber>);
    get ppqq(): NumberToVec4<TNumber>;
    set ppqq(value: Vec4OrLessOrNumber<TNumber>);
    get zwxx(): NumberToVec4<TNumber>;
    set zwxx(value: Vec4OrLessOrNumber<TNumber>);
    get barr(): NumberToVec4<TNumber>;
    set barr(value: Vec4OrLessOrNumber<TNumber>);
    get pqss(): NumberToVec4<TNumber>;
    set pqss(value: Vec4OrLessOrNumber<TNumber>);
    get zwxy(): NumberToVec4<TNumber>;
    set zwxy(value: Vec4OrLessOrNumber<TNumber>);
    get barg(): NumberToVec4<TNumber>;
    set barg(value: Vec4OrLessOrNumber<TNumber>);
    get pqst(): NumberToVec4<TNumber>;
    set pqst(value: Vec4OrLessOrNumber<TNumber>);
    get zwxz(): NumberToVec4<TNumber>;
    set zwxz(value: Vec4OrLessOrNumber<TNumber>);
    get barb(): NumberToVec4<TNumber>;
    set barb(value: Vec4OrLessOrNumber<TNumber>);
    get pqsp(): NumberToVec4<TNumber>;
    set pqsp(value: Vec4OrLessOrNumber<TNumber>);
    get zwxw(): NumberToVec4<TNumber>;
    set zwxw(value: Vec4OrLessOrNumber<TNumber>);
    get bara(): NumberToVec4<TNumber>;
    set bara(value: Vec4OrLessOrNumber<TNumber>);
    get pqsq(): NumberToVec4<TNumber>;
    set pqsq(value: Vec4OrLessOrNumber<TNumber>);
    get zwyx(): NumberToVec4<TNumber>;
    set zwyx(value: Vec4OrLessOrNumber<TNumber>);
    get bagr(): NumberToVec4<TNumber>;
    set bagr(value: Vec4OrLessOrNumber<TNumber>);
    get pqts(): NumberToVec4<TNumber>;
    set pqts(value: Vec4OrLessOrNumber<TNumber>);
    get zwyy(): NumberToVec4<TNumber>;
    set zwyy(value: Vec4OrLessOrNumber<TNumber>);
    get bagg(): NumberToVec4<TNumber>;
    set bagg(value: Vec4OrLessOrNumber<TNumber>);
    get pqtt(): NumberToVec4<TNumber>;
    set pqtt(value: Vec4OrLessOrNumber<TNumber>);
    get zwyz(): NumberToVec4<TNumber>;
    set zwyz(value: Vec4OrLessOrNumber<TNumber>);
    get bagb(): NumberToVec4<TNumber>;
    set bagb(value: Vec4OrLessOrNumber<TNumber>);
    get pqtp(): NumberToVec4<TNumber>;
    set pqtp(value: Vec4OrLessOrNumber<TNumber>);
    get zwyw(): NumberToVec4<TNumber>;
    set zwyw(value: Vec4OrLessOrNumber<TNumber>);
    get baga(): NumberToVec4<TNumber>;
    set baga(value: Vec4OrLessOrNumber<TNumber>);
    get pqtq(): NumberToVec4<TNumber>;
    set pqtq(value: Vec4OrLessOrNumber<TNumber>);
    get zwzx(): NumberToVec4<TNumber>;
    set zwzx(value: Vec4OrLessOrNumber<TNumber>);
    get babr(): NumberToVec4<TNumber>;
    set babr(value: Vec4OrLessOrNumber<TNumber>);
    get pqps(): NumberToVec4<TNumber>;
    set pqps(value: Vec4OrLessOrNumber<TNumber>);
    get zwzy(): NumberToVec4<TNumber>;
    set zwzy(value: Vec4OrLessOrNumber<TNumber>);
    get babg(): NumberToVec4<TNumber>;
    set babg(value: Vec4OrLessOrNumber<TNumber>);
    get pqpt(): NumberToVec4<TNumber>;
    set pqpt(value: Vec4OrLessOrNumber<TNumber>);
    get zwzz(): NumberToVec4<TNumber>;
    set zwzz(value: Vec4OrLessOrNumber<TNumber>);
    get babb(): NumberToVec4<TNumber>;
    set babb(value: Vec4OrLessOrNumber<TNumber>);
    get pqpp(): NumberToVec4<TNumber>;
    set pqpp(value: Vec4OrLessOrNumber<TNumber>);
    get zwzw(): NumberToVec4<TNumber>;
    set zwzw(value: Vec4OrLessOrNumber<TNumber>);
    get baba(): NumberToVec4<TNumber>;
    set baba(value: Vec4OrLessOrNumber<TNumber>);
    get pqpq(): NumberToVec4<TNumber>;
    set pqpq(value: Vec4OrLessOrNumber<TNumber>);
    get zwwx(): NumberToVec4<TNumber>;
    set zwwx(value: Vec4OrLessOrNumber<TNumber>);
    get baar(): NumberToVec4<TNumber>;
    set baar(value: Vec4OrLessOrNumber<TNumber>);
    get pqqs(): NumberToVec4<TNumber>;
    set pqqs(value: Vec4OrLessOrNumber<TNumber>);
    get zwwy(): NumberToVec4<TNumber>;
    set zwwy(value: Vec4OrLessOrNumber<TNumber>);
    get baag(): NumberToVec4<TNumber>;
    set baag(value: Vec4OrLessOrNumber<TNumber>);
    get pqqt(): NumberToVec4<TNumber>;
    set pqqt(value: Vec4OrLessOrNumber<TNumber>);
    get zwwz(): NumberToVec4<TNumber>;
    set zwwz(value: Vec4OrLessOrNumber<TNumber>);
    get baab(): NumberToVec4<TNumber>;
    set baab(value: Vec4OrLessOrNumber<TNumber>);
    get pqqp(): NumberToVec4<TNumber>;
    set pqqp(value: Vec4OrLessOrNumber<TNumber>);
    get zwww(): NumberToVec4<TNumber>;
    set zwww(value: Vec4OrLessOrNumber<TNumber>);
    get baaa(): NumberToVec4<TNumber>;
    set baaa(value: Vec4OrLessOrNumber<TNumber>);
    get pqqq(): NumberToVec4<TNumber>;
    set pqqq(value: Vec4OrLessOrNumber<TNumber>);
    get wxxx(): NumberToVec4<TNumber>;
    set wxxx(value: Vec4OrLessOrNumber<TNumber>);
    get arrr(): NumberToVec4<TNumber>;
    set arrr(value: Vec4OrLessOrNumber<TNumber>);
    get qsss(): NumberToVec4<TNumber>;
    set qsss(value: Vec4OrLessOrNumber<TNumber>);
    get wxxy(): NumberToVec4<TNumber>;
    set wxxy(value: Vec4OrLessOrNumber<TNumber>);
    get arrg(): NumberToVec4<TNumber>;
    set arrg(value: Vec4OrLessOrNumber<TNumber>);
    get qsst(): NumberToVec4<TNumber>;
    set qsst(value: Vec4OrLessOrNumber<TNumber>);
    get wxxz(): NumberToVec4<TNumber>;
    set wxxz(value: Vec4OrLessOrNumber<TNumber>);
    get arrb(): NumberToVec4<TNumber>;
    set arrb(value: Vec4OrLessOrNumber<TNumber>);
    get qssp(): NumberToVec4<TNumber>;
    set qssp(value: Vec4OrLessOrNumber<TNumber>);
    get wxxw(): NumberToVec4<TNumber>;
    set wxxw(value: Vec4OrLessOrNumber<TNumber>);
    get arra(): NumberToVec4<TNumber>;
    set arra(value: Vec4OrLessOrNumber<TNumber>);
    get qssq(): NumberToVec4<TNumber>;
    set qssq(value: Vec4OrLessOrNumber<TNumber>);
    get wxyx(): NumberToVec4<TNumber>;
    set wxyx(value: Vec4OrLessOrNumber<TNumber>);
    get argr(): NumberToVec4<TNumber>;
    set argr(value: Vec4OrLessOrNumber<TNumber>);
    get qsts(): NumberToVec4<TNumber>;
    set qsts(value: Vec4OrLessOrNumber<TNumber>);
    get wxyy(): NumberToVec4<TNumber>;
    set wxyy(value: Vec4OrLessOrNumber<TNumber>);
    get argg(): NumberToVec4<TNumber>;
    set argg(value: Vec4OrLessOrNumber<TNumber>);
    get qstt(): NumberToVec4<TNumber>;
    set qstt(value: Vec4OrLessOrNumber<TNumber>);
    get wxyz(): NumberToVec4<TNumber>;
    set wxyz(value: Vec4OrLessOrNumber<TNumber>);
    get argb(): NumberToVec4<TNumber>;
    set argb(value: Vec4OrLessOrNumber<TNumber>);
    get qstp(): NumberToVec4<TNumber>;
    set qstp(value: Vec4OrLessOrNumber<TNumber>);
    get wxyw(): NumberToVec4<TNumber>;
    set wxyw(value: Vec4OrLessOrNumber<TNumber>);
    get arga(): NumberToVec4<TNumber>;
    set arga(value: Vec4OrLessOrNumber<TNumber>);
    get qstq(): NumberToVec4<TNumber>;
    set qstq(value: Vec4OrLessOrNumber<TNumber>);
    get wxzx(): NumberToVec4<TNumber>;
    set wxzx(value: Vec4OrLessOrNumber<TNumber>);
    get arbr(): NumberToVec4<TNumber>;
    set arbr(value: Vec4OrLessOrNumber<TNumber>);
    get qsps(): NumberToVec4<TNumber>;
    set qsps(value: Vec4OrLessOrNumber<TNumber>);
    get wxzy(): NumberToVec4<TNumber>;
    set wxzy(value: Vec4OrLessOrNumber<TNumber>);
    get arbg(): NumberToVec4<TNumber>;
    set arbg(value: Vec4OrLessOrNumber<TNumber>);
    get qspt(): NumberToVec4<TNumber>;
    set qspt(value: Vec4OrLessOrNumber<TNumber>);
    get wxzz(): NumberToVec4<TNumber>;
    set wxzz(value: Vec4OrLessOrNumber<TNumber>);
    get arbb(): NumberToVec4<TNumber>;
    set arbb(value: Vec4OrLessOrNumber<TNumber>);
    get qspp(): NumberToVec4<TNumber>;
    set qspp(value: Vec4OrLessOrNumber<TNumber>);
    get wxzw(): NumberToVec4<TNumber>;
    set wxzw(value: Vec4OrLessOrNumber<TNumber>);
    get arba(): NumberToVec4<TNumber>;
    set arba(value: Vec4OrLessOrNumber<TNumber>);
    get qspq(): NumberToVec4<TNumber>;
    set qspq(value: Vec4OrLessOrNumber<TNumber>);
    get wxwx(): NumberToVec4<TNumber>;
    set wxwx(value: Vec4OrLessOrNumber<TNumber>);
    get arar(): NumberToVec4<TNumber>;
    set arar(value: Vec4OrLessOrNumber<TNumber>);
    get qsqs(): NumberToVec4<TNumber>;
    set qsqs(value: Vec4OrLessOrNumber<TNumber>);
    get wxwy(): NumberToVec4<TNumber>;
    set wxwy(value: Vec4OrLessOrNumber<TNumber>);
    get arag(): NumberToVec4<TNumber>;
    set arag(value: Vec4OrLessOrNumber<TNumber>);
    get qsqt(): NumberToVec4<TNumber>;
    set qsqt(value: Vec4OrLessOrNumber<TNumber>);
    get wxwz(): NumberToVec4<TNumber>;
    set wxwz(value: Vec4OrLessOrNumber<TNumber>);
    get arab(): NumberToVec4<TNumber>;
    set arab(value: Vec4OrLessOrNumber<TNumber>);
    get qsqp(): NumberToVec4<TNumber>;
    set qsqp(value: Vec4OrLessOrNumber<TNumber>);
    get wxww(): NumberToVec4<TNumber>;
    set wxww(value: Vec4OrLessOrNumber<TNumber>);
    get araa(): NumberToVec4<TNumber>;
    set araa(value: Vec4OrLessOrNumber<TNumber>);
    get qsqq(): NumberToVec4<TNumber>;
    set qsqq(value: Vec4OrLessOrNumber<TNumber>);
    get wyxx(): NumberToVec4<TNumber>;
    set wyxx(value: Vec4OrLessOrNumber<TNumber>);
    get agrr(): NumberToVec4<TNumber>;
    set agrr(value: Vec4OrLessOrNumber<TNumber>);
    get qtss(): NumberToVec4<TNumber>;
    set qtss(value: Vec4OrLessOrNumber<TNumber>);
    get wyxy(): NumberToVec4<TNumber>;
    set wyxy(value: Vec4OrLessOrNumber<TNumber>);
    get agrg(): NumberToVec4<TNumber>;
    set agrg(value: Vec4OrLessOrNumber<TNumber>);
    get qtst(): NumberToVec4<TNumber>;
    set qtst(value: Vec4OrLessOrNumber<TNumber>);
    get wyxz(): NumberToVec4<TNumber>;
    set wyxz(value: Vec4OrLessOrNumber<TNumber>);
    get agrb(): NumberToVec4<TNumber>;
    set agrb(value: Vec4OrLessOrNumber<TNumber>);
    get qtsp(): NumberToVec4<TNumber>;
    set qtsp(value: Vec4OrLessOrNumber<TNumber>);
    get wyxw(): NumberToVec4<TNumber>;
    set wyxw(value: Vec4OrLessOrNumber<TNumber>);
    get agra(): NumberToVec4<TNumber>;
    set agra(value: Vec4OrLessOrNumber<TNumber>);
    get qtsq(): NumberToVec4<TNumber>;
    set qtsq(value: Vec4OrLessOrNumber<TNumber>);
    get wyyx(): NumberToVec4<TNumber>;
    set wyyx(value: Vec4OrLessOrNumber<TNumber>);
    get aggr(): NumberToVec4<TNumber>;
    set aggr(value: Vec4OrLessOrNumber<TNumber>);
    get qtts(): NumberToVec4<TNumber>;
    set qtts(value: Vec4OrLessOrNumber<TNumber>);
    get wyyy(): NumberToVec4<TNumber>;
    set wyyy(value: Vec4OrLessOrNumber<TNumber>);
    get aggg(): NumberToVec4<TNumber>;
    set aggg(value: Vec4OrLessOrNumber<TNumber>);
    get qttt(): NumberToVec4<TNumber>;
    set qttt(value: Vec4OrLessOrNumber<TNumber>);
    get wyyz(): NumberToVec4<TNumber>;
    set wyyz(value: Vec4OrLessOrNumber<TNumber>);
    get aggb(): NumberToVec4<TNumber>;
    set aggb(value: Vec4OrLessOrNumber<TNumber>);
    get qttp(): NumberToVec4<TNumber>;
    set qttp(value: Vec4OrLessOrNumber<TNumber>);
    get wyyw(): NumberToVec4<TNumber>;
    set wyyw(value: Vec4OrLessOrNumber<TNumber>);
    get agga(): NumberToVec4<TNumber>;
    set agga(value: Vec4OrLessOrNumber<TNumber>);
    get qttq(): NumberToVec4<TNumber>;
    set qttq(value: Vec4OrLessOrNumber<TNumber>);
    get wyzx(): NumberToVec4<TNumber>;
    set wyzx(value: Vec4OrLessOrNumber<TNumber>);
    get agbr(): NumberToVec4<TNumber>;
    set agbr(value: Vec4OrLessOrNumber<TNumber>);
    get qtps(): NumberToVec4<TNumber>;
    set qtps(value: Vec4OrLessOrNumber<TNumber>);
    get wyzy(): NumberToVec4<TNumber>;
    set wyzy(value: Vec4OrLessOrNumber<TNumber>);
    get agbg(): NumberToVec4<TNumber>;
    set agbg(value: Vec4OrLessOrNumber<TNumber>);
    get qtpt(): NumberToVec4<TNumber>;
    set qtpt(value: Vec4OrLessOrNumber<TNumber>);
    get wyzz(): NumberToVec4<TNumber>;
    set wyzz(value: Vec4OrLessOrNumber<TNumber>);
    get agbb(): NumberToVec4<TNumber>;
    set agbb(value: Vec4OrLessOrNumber<TNumber>);
    get qtpp(): NumberToVec4<TNumber>;
    set qtpp(value: Vec4OrLessOrNumber<TNumber>);
    get wyzw(): NumberToVec4<TNumber>;
    set wyzw(value: Vec4OrLessOrNumber<TNumber>);
    get agba(): NumberToVec4<TNumber>;
    set agba(value: Vec4OrLessOrNumber<TNumber>);
    get qtpq(): NumberToVec4<TNumber>;
    set qtpq(value: Vec4OrLessOrNumber<TNumber>);
    get wywx(): NumberToVec4<TNumber>;
    set wywx(value: Vec4OrLessOrNumber<TNumber>);
    get agar(): NumberToVec4<TNumber>;
    set agar(value: Vec4OrLessOrNumber<TNumber>);
    get qtqs(): NumberToVec4<TNumber>;
    set qtqs(value: Vec4OrLessOrNumber<TNumber>);
    get wywy(): NumberToVec4<TNumber>;
    set wywy(value: Vec4OrLessOrNumber<TNumber>);
    get agag(): NumberToVec4<TNumber>;
    set agag(value: Vec4OrLessOrNumber<TNumber>);
    get qtqt(): NumberToVec4<TNumber>;
    set qtqt(value: Vec4OrLessOrNumber<TNumber>);
    get wywz(): NumberToVec4<TNumber>;
    set wywz(value: Vec4OrLessOrNumber<TNumber>);
    get agab(): NumberToVec4<TNumber>;
    set agab(value: Vec4OrLessOrNumber<TNumber>);
    get qtqp(): NumberToVec4<TNumber>;
    set qtqp(value: Vec4OrLessOrNumber<TNumber>);
    get wyww(): NumberToVec4<TNumber>;
    set wyww(value: Vec4OrLessOrNumber<TNumber>);
    get agaa(): NumberToVec4<TNumber>;
    set agaa(value: Vec4OrLessOrNumber<TNumber>);
    get qtqq(): NumberToVec4<TNumber>;
    set qtqq(value: Vec4OrLessOrNumber<TNumber>);
    get wzxx(): NumberToVec4<TNumber>;
    set wzxx(value: Vec4OrLessOrNumber<TNumber>);
    get abrr(): NumberToVec4<TNumber>;
    set abrr(value: Vec4OrLessOrNumber<TNumber>);
    get qpss(): NumberToVec4<TNumber>;
    set qpss(value: Vec4OrLessOrNumber<TNumber>);
    get wzxy(): NumberToVec4<TNumber>;
    set wzxy(value: Vec4OrLessOrNumber<TNumber>);
    get abrg(): NumberToVec4<TNumber>;
    set abrg(value: Vec4OrLessOrNumber<TNumber>);
    get qpst(): NumberToVec4<TNumber>;
    set qpst(value: Vec4OrLessOrNumber<TNumber>);
    get wzxz(): NumberToVec4<TNumber>;
    set wzxz(value: Vec4OrLessOrNumber<TNumber>);
    get abrb(): NumberToVec4<TNumber>;
    set abrb(value: Vec4OrLessOrNumber<TNumber>);
    get qpsp(): NumberToVec4<TNumber>;
    set qpsp(value: Vec4OrLessOrNumber<TNumber>);
    get wzxw(): NumberToVec4<TNumber>;
    set wzxw(value: Vec4OrLessOrNumber<TNumber>);
    get abra(): NumberToVec4<TNumber>;
    set abra(value: Vec4OrLessOrNumber<TNumber>);
    get qpsq(): NumberToVec4<TNumber>;
    set qpsq(value: Vec4OrLessOrNumber<TNumber>);
    get wzyx(): NumberToVec4<TNumber>;
    set wzyx(value: Vec4OrLessOrNumber<TNumber>);
    get abgr(): NumberToVec4<TNumber>;
    set abgr(value: Vec4OrLessOrNumber<TNumber>);
    get qpts(): NumberToVec4<TNumber>;
    set qpts(value: Vec4OrLessOrNumber<TNumber>);
    get wzyy(): NumberToVec4<TNumber>;
    set wzyy(value: Vec4OrLessOrNumber<TNumber>);
    get abgg(): NumberToVec4<TNumber>;
    set abgg(value: Vec4OrLessOrNumber<TNumber>);
    get qptt(): NumberToVec4<TNumber>;
    set qptt(value: Vec4OrLessOrNumber<TNumber>);
    get wzyz(): NumberToVec4<TNumber>;
    set wzyz(value: Vec4OrLessOrNumber<TNumber>);
    get abgb(): NumberToVec4<TNumber>;
    set abgb(value: Vec4OrLessOrNumber<TNumber>);
    get qptp(): NumberToVec4<TNumber>;
    set qptp(value: Vec4OrLessOrNumber<TNumber>);
    get wzyw(): NumberToVec4<TNumber>;
    set wzyw(value: Vec4OrLessOrNumber<TNumber>);
    get abga(): NumberToVec4<TNumber>;
    set abga(value: Vec4OrLessOrNumber<TNumber>);
    get qptq(): NumberToVec4<TNumber>;
    set qptq(value: Vec4OrLessOrNumber<TNumber>);
    get wzzx(): NumberToVec4<TNumber>;
    set wzzx(value: Vec4OrLessOrNumber<TNumber>);
    get abbr(): NumberToVec4<TNumber>;
    set abbr(value: Vec4OrLessOrNumber<TNumber>);
    get qpps(): NumberToVec4<TNumber>;
    set qpps(value: Vec4OrLessOrNumber<TNumber>);
    get wzzy(): NumberToVec4<TNumber>;
    set wzzy(value: Vec4OrLessOrNumber<TNumber>);
    get abbg(): NumberToVec4<TNumber>;
    set abbg(value: Vec4OrLessOrNumber<TNumber>);
    get qppt(): NumberToVec4<TNumber>;
    set qppt(value: Vec4OrLessOrNumber<TNumber>);
    get wzzz(): NumberToVec4<TNumber>;
    set wzzz(value: Vec4OrLessOrNumber<TNumber>);
    get abbb(): NumberToVec4<TNumber>;
    set abbb(value: Vec4OrLessOrNumber<TNumber>);
    get qppp(): NumberToVec4<TNumber>;
    set qppp(value: Vec4OrLessOrNumber<TNumber>);
    get wzzw(): NumberToVec4<TNumber>;
    set wzzw(value: Vec4OrLessOrNumber<TNumber>);
    get abba(): NumberToVec4<TNumber>;
    set abba(value: Vec4OrLessOrNumber<TNumber>);
    get qppq(): NumberToVec4<TNumber>;
    set qppq(value: Vec4OrLessOrNumber<TNumber>);
    get wzwx(): NumberToVec4<TNumber>;
    set wzwx(value: Vec4OrLessOrNumber<TNumber>);
    get abar(): NumberToVec4<TNumber>;
    set abar(value: Vec4OrLessOrNumber<TNumber>);
    get qpqs(): NumberToVec4<TNumber>;
    set qpqs(value: Vec4OrLessOrNumber<TNumber>);
    get wzwy(): NumberToVec4<TNumber>;
    set wzwy(value: Vec4OrLessOrNumber<TNumber>);
    get abag(): NumberToVec4<TNumber>;
    set abag(value: Vec4OrLessOrNumber<TNumber>);
    get qpqt(): NumberToVec4<TNumber>;
    set qpqt(value: Vec4OrLessOrNumber<TNumber>);
    get wzwz(): NumberToVec4<TNumber>;
    set wzwz(value: Vec4OrLessOrNumber<TNumber>);
    get abab(): NumberToVec4<TNumber>;
    set abab(value: Vec4OrLessOrNumber<TNumber>);
    get qpqp(): NumberToVec4<TNumber>;
    set qpqp(value: Vec4OrLessOrNumber<TNumber>);
    get wzww(): NumberToVec4<TNumber>;
    set wzww(value: Vec4OrLessOrNumber<TNumber>);
    get abaa(): NumberToVec4<TNumber>;
    set abaa(value: Vec4OrLessOrNumber<TNumber>);
    get qpqq(): NumberToVec4<TNumber>;
    set qpqq(value: Vec4OrLessOrNumber<TNumber>);
    get wwxx(): NumberToVec4<TNumber>;
    set wwxx(value: Vec4OrLessOrNumber<TNumber>);
    get aarr(): NumberToVec4<TNumber>;
    set aarr(value: Vec4OrLessOrNumber<TNumber>);
    get qqss(): NumberToVec4<TNumber>;
    set qqss(value: Vec4OrLessOrNumber<TNumber>);
    get wwxy(): NumberToVec4<TNumber>;
    set wwxy(value: Vec4OrLessOrNumber<TNumber>);
    get aarg(): NumberToVec4<TNumber>;
    set aarg(value: Vec4OrLessOrNumber<TNumber>);
    get qqst(): NumberToVec4<TNumber>;
    set qqst(value: Vec4OrLessOrNumber<TNumber>);
    get wwxz(): NumberToVec4<TNumber>;
    set wwxz(value: Vec4OrLessOrNumber<TNumber>);
    get aarb(): NumberToVec4<TNumber>;
    set aarb(value: Vec4OrLessOrNumber<TNumber>);
    get qqsp(): NumberToVec4<TNumber>;
    set qqsp(value: Vec4OrLessOrNumber<TNumber>);
    get wwxw(): NumberToVec4<TNumber>;
    set wwxw(value: Vec4OrLessOrNumber<TNumber>);
    get aara(): NumberToVec4<TNumber>;
    set aara(value: Vec4OrLessOrNumber<TNumber>);
    get qqsq(): NumberToVec4<TNumber>;
    set qqsq(value: Vec4OrLessOrNumber<TNumber>);
    get wwyx(): NumberToVec4<TNumber>;
    set wwyx(value: Vec4OrLessOrNumber<TNumber>);
    get aagr(): NumberToVec4<TNumber>;
    set aagr(value: Vec4OrLessOrNumber<TNumber>);
    get qqts(): NumberToVec4<TNumber>;
    set qqts(value: Vec4OrLessOrNumber<TNumber>);
    get wwyy(): NumberToVec4<TNumber>;
    set wwyy(value: Vec4OrLessOrNumber<TNumber>);
    get aagg(): NumberToVec4<TNumber>;
    set aagg(value: Vec4OrLessOrNumber<TNumber>);
    get qqtt(): NumberToVec4<TNumber>;
    set qqtt(value: Vec4OrLessOrNumber<TNumber>);
    get wwyz(): NumberToVec4<TNumber>;
    set wwyz(value: Vec4OrLessOrNumber<TNumber>);
    get aagb(): NumberToVec4<TNumber>;
    set aagb(value: Vec4OrLessOrNumber<TNumber>);
    get qqtp(): NumberToVec4<TNumber>;
    set qqtp(value: Vec4OrLessOrNumber<TNumber>);
    get wwyw(): NumberToVec4<TNumber>;
    set wwyw(value: Vec4OrLessOrNumber<TNumber>);
    get aaga(): NumberToVec4<TNumber>;
    set aaga(value: Vec4OrLessOrNumber<TNumber>);
    get qqtq(): NumberToVec4<TNumber>;
    set qqtq(value: Vec4OrLessOrNumber<TNumber>);
    get wwzx(): NumberToVec4<TNumber>;
    set wwzx(value: Vec4OrLessOrNumber<TNumber>);
    get aabr(): NumberToVec4<TNumber>;
    set aabr(value: Vec4OrLessOrNumber<TNumber>);
    get qqps(): NumberToVec4<TNumber>;
    set qqps(value: Vec4OrLessOrNumber<TNumber>);
    get wwzy(): NumberToVec4<TNumber>;
    set wwzy(value: Vec4OrLessOrNumber<TNumber>);
    get aabg(): NumberToVec4<TNumber>;
    set aabg(value: Vec4OrLessOrNumber<TNumber>);
    get qqpt(): NumberToVec4<TNumber>;
    set qqpt(value: Vec4OrLessOrNumber<TNumber>);
    get wwzz(): NumberToVec4<TNumber>;
    set wwzz(value: Vec4OrLessOrNumber<TNumber>);
    get aabb(): NumberToVec4<TNumber>;
    set aabb(value: Vec4OrLessOrNumber<TNumber>);
    get qqpp(): NumberToVec4<TNumber>;
    set qqpp(value: Vec4OrLessOrNumber<TNumber>);
    get wwzw(): NumberToVec4<TNumber>;
    set wwzw(value: Vec4OrLessOrNumber<TNumber>);
    get aaba(): NumberToVec4<TNumber>;
    set aaba(value: Vec4OrLessOrNumber<TNumber>);
    get qqpq(): NumberToVec4<TNumber>;
    set qqpq(value: Vec4OrLessOrNumber<TNumber>);
    get wwwx(): NumberToVec4<TNumber>;
    set wwwx(value: Vec4OrLessOrNumber<TNumber>);
    get aaar(): NumberToVec4<TNumber>;
    set aaar(value: Vec4OrLessOrNumber<TNumber>);
    get qqqs(): NumberToVec4<TNumber>;
    set qqqs(value: Vec4OrLessOrNumber<TNumber>);
    get wwwy(): NumberToVec4<TNumber>;
    set wwwy(value: Vec4OrLessOrNumber<TNumber>);
    get aaag(): NumberToVec4<TNumber>;
    set aaag(value: Vec4OrLessOrNumber<TNumber>);
    get qqqt(): NumberToVec4<TNumber>;
    set qqqt(value: Vec4OrLessOrNumber<TNumber>);
    get wwwz(): NumberToVec4<TNumber>;
    set wwwz(value: Vec4OrLessOrNumber<TNumber>);
    get aaab(): NumberToVec4<TNumber>;
    set aaab(value: Vec4OrLessOrNumber<TNumber>);
    get qqqp(): NumberToVec4<TNumber>;
    set qqqp(value: Vec4OrLessOrNumber<TNumber>);
    get wwww(): NumberToVec4<TNumber>;
    set wwww(value: Vec4OrLessOrNumber<TNumber>);
    get aaaa(): NumberToVec4<TNumber>;
    set aaaa(value: Vec4OrLessOrNumber<TNumber>);
    get qqqq(): NumberToVec4<TNumber>;
    set qqqq(value: Vec4OrLessOrNumber<TNumber>);
}

interface Vec2Swizzle<TNumber extends NumberType>
    extends Swizzle2In1Out<TNumber>, Swizzle2In2Out<TNumber>, Swizzle2In3Out<TNumber>, Swizzle2In4Out<TNumber>
{}

interface Vec3Swizzle<TNumber extends NumberType>
    extends Swizzle3In1Out<TNumber>, Swizzle3In2Out<TNumber>, Swizzle3In3Out<TNumber>, Swizzle3In4Out<TNumber>
{}

interface Vec4Swizzle<TNumber extends NumberType>
    extends Swizzle4In1Out<TNumber>, Swizzle4In2Out<TNumber>, Swizzle4In3Out<TNumber>, Swizzle4In4Out<TNumber>
{}

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
type Node<TValue = unknown> =
    & NodeInterface
    & NodeElements
    & NodeExtensions<TValue>
    & (TValue extends "float" ? FloatExtensions & NumberExtensions<"float">
        : TValue extends "int" ? IntExtensions & NumberExtensions<"int"> & IntegerExtensions<"int">
        : TValue extends "uint" ? UintExtensions & NumberExtensions<"uint"> & IntegerExtensions<"uint">
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
        : {})
    & {
        __TypeScript_VALUE__: TValue;
    };
export default Node;
