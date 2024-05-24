import { NodeUpdateType } from "./constants.js";
import NodeBuilder from "./NodeBuilder.js";
import NodeFrame from "./NodeFrame.js";

export type NodeTypeOption =
    | "bool"
    | "int"
    | "float"
    | "vec2"
    | "vec3"
    | "vec4"
    | "mat2"
    | "mat3"
    | "mat4"
    | "code" /* CodeNode */
    | "color" /* NodeUtis.getValueType */
    | "uint"
    | "int" /* NodeBuilder.getComponentType */
    | "void"
    | "property"
    | "sampler"
    | "texture"
    | "cubeTexture" /* NodeBuilder.isReference */
    | "ivec2"
    | "uvec2"
    | "bvec2" /* ShaderNodeBaseElements */
    | "ivec3"
    | "uvec3"
    | "bvec3"
    | "ivec4"
    | "uvec4"
    | "bvec4"
    | "imat3"
    | "umat3"
    | "bmat3"
    | "imat4"
    | "umat4"
    | "bmat4";

export default abstract class Node {
    nodeType: NodeTypeOption | null;

    updateType: NodeUpdateType;
    updateBeforeType: NodeUpdateType;

    uuid: string;

    version: number;

    readonly isNode: true;

    readonly id: number;

    constructor(nodeType?: NodeTypeOption | null);

    set needsUpdate(value: boolean);

    get type(): number;

    isGlobal(builder: NodeBuilder): boolean;

    getChildren(): Node[];

    getCacheKey(force?: boolean): string;

    getHash(builder: NodeBuilder): string;

    getUpdateType(): NodeUpdateType;

    getUpdateBeforeType(): NodeUpdateType;

    getElementType(builder: NodeBuilder): NodeTypeOption | null;

    getNodeType(builder: NodeBuilder, output?: string | null): NodeTypeOption | null;

    getReference(builder: NodeBuilder): Node;

    setup(builder: NodeBuilder): Node | null;

    increaseUsage(builder: NodeBuilder): number;

    analyze(builder: NodeBuilder): void;

    generate(builder: NodeBuilder, output?: string | null): string;

    updateBefore(frame: NodeFrame): void;

    /** This method must be overriden when {@link updateType} !== 'none' */
    update(frame: NodeFrame): void;

    build(builder: NodeBuilder, output?: string | null): string;

    serialize(json: unknown): void;

    deserialize(json: unknown): void;

    toJSON(meta?: string | { textures: {}; images: {}; nodes: {} }): unknown;
}
