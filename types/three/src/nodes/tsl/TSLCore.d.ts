import { Color } from "../../math/Color.js";
import { Matrix2 } from "../../math/Matrix2.js";
import { Matrix3 } from "../../math/Matrix3.js";
import { Matrix4 } from "../../math/Matrix4.js";
import { Vector2 } from "../../math/Vector2.js";
import { Vector3 } from "../../math/Vector3.js";
import { Vector4 } from "../../math/Vector4.js";
import ConstNode from "../core/ConstNode.js";
import Node, { NumOrBoolType } from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";
import StackNode from "../core/StackNode.js";
import JoinNode from "../utils/JoinNode.js";

export function addMethodChaining(name: string, nodeElement: unknown): void;

declare module "../core/Node.js" {
    interface NodeElements {
        assign: (sourceNode: Node | number) => this;
        get: (value: string) => Node;
    }
}

type XYZWCharacter = "x" | "y" | "z" | "w";
type RGBACharacter = "r" | "g" | "b" | "a";
type STPQCharacter = "s" | "t" | "p" | "q";

type XYZWSwizzle =
    | `${XYZWCharacter}`
    | `${XYZWCharacter}${XYZWCharacter}`
    | `${XYZWCharacter}${XYZWCharacter}${XYZWCharacter}`
    | `${XYZWCharacter}${XYZWCharacter}${XYZWCharacter}${XYZWCharacter}`;

type RGBASwizzle =
    | `${RGBACharacter}`
    | `${RGBACharacter}${RGBACharacter}`
    | `${RGBACharacter}${RGBACharacter}${RGBACharacter}`
    | `${RGBACharacter}${RGBACharacter}${RGBACharacter}${RGBACharacter}`;

type STPQSwizzle =
    | `${STPQCharacter}`
    | `${STPQCharacter}${STPQCharacter}`
    | `${STPQCharacter}${STPQCharacter}${STPQCharacter}`
    | `${STPQCharacter}${STPQCharacter}${STPQCharacter}${STPQCharacter}`;

export type SwizzleOption = XYZWSwizzle | RGBASwizzle | STPQSwizzle;

export type ArrayElementIndex =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;

export type Swizzable = {
    [Key in SwizzleOption | ArrayElementIndex]: Node;
};

declare module "../core/Node.js" {
    interface NodeElements extends Swizzable {
    }
}

type NumOrBoolToJsType = {
    float: number;
    int: number;
    uint: number;
    bool: boolean;
};
type NumOrBool<TNumOrBool extends NumOrBoolType> = Node<TNumOrBool> | NumOrBoolToJsType[TNumOrBool];

type NumOrBoolToVec = {
    float: "vec";
    int: "ivec";
    uint: "uvec";
    bool: "bvec";
};
type NumOrBoolToVec2<TNumOrBool extends NumOrBoolType> = `${NumOrBoolToVec[TNumOrBool]}2`;
type NumOrBoolToVec3<TNumOrBool extends NumOrBoolType> = `${NumOrBoolToVec[TNumOrBool]}3`;
type NumOrBoolToVec4<TNumOrBool extends NumOrBoolType> = `${NumOrBoolToVec[TNumOrBool]}4`;

interface SetSwizzle1<TNumOrBool extends NumOrBoolType> {
    setX(value: NumOrBool<TNumOrBool> | Node): Node<TNumOrBool>;
    setR(value: NumOrBool<TNumOrBool> | Node): Node<TNumOrBool>;
    setS(value: NumOrBool<TNumOrBool> | Node): Node<TNumOrBool>;
}

interface SetSwizzle2<TNumOrBool extends NumOrBoolType> {
    setX(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setR(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setS(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setY(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setG(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setT(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setXY(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setRG(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
    setST(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec2<TNumOrBool>>;
}

interface SetSwizzle3<TNumOrBool extends NumOrBoolType> {
    setX(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setR(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setS(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setY(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setG(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setT(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setZ(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setB(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setP(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setXY(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setRG(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setST(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setXZ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setRB(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setSP(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setYZ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setGB(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setTP(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setXYZ(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setRGB(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
    setSTP(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec3<TNumOrBool>>;
}

interface SetSwizzle4<TNumOrBool extends NumOrBoolType> {
    setX(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setR(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setS(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setY(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setG(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setT(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setZ(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setB(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setP(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setW(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setA(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setQ(value: NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXY(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRG(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setST(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXZ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRB(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setSP(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setYZ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setGB(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setTP(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXW(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRA(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setSQ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setYW(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setGA(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setTQ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setZW(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setBA(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setPQ(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXYZ(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRGB(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setSTP(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXYW(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRGA(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setSTQ(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXZW(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRBA(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setSPQ(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setYZW(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setGBA(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setTPQ(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setXYZW(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setRGBA(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
    setSTPQ(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool> | Node): Node<NumOrBoolToVec4<TNumOrBool>>;
}

declare module "../core/Node.js" {
    interface NumOrBoolExtensions<TNumOrBool extends NumOrBoolType> extends SetSwizzle1<TNumOrBool> {
    }

    interface NumOrBoolVec2Extensions<TNumOrBool extends NumOrBoolType> extends SetSwizzle2<TNumOrBool> {
    }

    interface NumOrBoolVec3Extensions<TNumOrBool extends NumOrBoolType> extends SetSwizzle3<TNumOrBool> {
    }

    interface NumOrBoolVec4Extensions<TNumOrBool extends NumOrBoolType> extends SetSwizzle4<TNumOrBool> {
    }
}

interface FlipSwizzle1 {
    flipX(): Node<"float">;
    flipR(): Node<"float">;
    flipS(): Node<"float">;
}

interface FlipSwizzle2 {
    flipX(): Node<"vec2">;
    flipR(): Node<"vec2">;
    flipS(): Node<"vec2">;
    flipY(): Node<"vec2">;
    flipG(): Node<"vec2">;
    flipT(): Node<"vec2">;
    flipXY(): Node<"vec2">;
    flipRG(): Node<"vec2">;
    flipST(): Node<"vec2">;
}

interface FlipSwizzle3 {
    flipX(): Node<"vec3">;
    flipR(): Node<"vec3">;
    flipS(): Node<"vec3">;
    flipY(): Node<"vec3">;
    flipG(): Node<"vec3">;
    flipT(): Node<"vec3">;
    flipZ(): Node<"vec3">;
    flipB(): Node<"vec3">;
    flipP(): Node<"vec3">;
    flipXY(): Node<"vec3">;
    flipRG(): Node<"vec3">;
    flipST(): Node<"vec3">;
    flipXZ(): Node<"vec3">;
    flipRB(): Node<"vec3">;
    flipSP(): Node<"vec3">;
    flipYZ(): Node<"vec3">;
    flipGB(): Node<"vec3">;
    flipTP(): Node<"vec3">;
    flipXYZ(): Node<"vec3">;
    flipRGB(): Node<"vec3">;
    flipSTP(): Node<"vec3">;
}

interface FlipSwizzle4 {
    flipX(): Node<"vec4">;
    flipR(): Node<"vec4">;
    flipS(): Node<"vec4">;
    flipY(): Node<"vec4">;
    flipG(): Node<"vec4">;
    flipT(): Node<"vec4">;
    flipZ(): Node<"vec4">;
    flipB(): Node<"vec4">;
    flipP(): Node<"vec4">;
    flipW(): Node<"vec4">;
    flipA(): Node<"vec4">;
    flipQ(): Node<"vec4">;
    flipXY(): Node<"vec4">;
    flipRG(): Node<"vec4">;
    flipST(): Node<"vec4">;
    flipXZ(): Node<"vec4">;
    flipRB(): Node<"vec4">;
    flipSP(): Node<"vec4">;
    flipYZ(): Node<"vec4">;
    flipGB(): Node<"vec4">;
    flipTP(): Node<"vec4">;
    flipXW(): Node<"vec4">;
    flipRA(): Node<"vec4">;
    flipSQ(): Node<"vec4">;
    flipYW(): Node<"vec4">;
    flipGA(): Node<"vec4">;
    flipTQ(): Node<"vec4">;
    flipZW(): Node<"vec4">;
    flipBA(): Node<"vec4">;
    flipPQ(): Node<"vec4">;
    flipXYZ(): Node<"vec4">;
    flipRGB(): Node<"vec4">;
    flipSTP(): Node<"vec4">;
    flipXYW(): Node<"vec4">;
    flipRGA(): Node<"vec4">;
    flipSTQ(): Node<"vec4">;
    flipXZW(): Node<"vec4">;
    flipRBA(): Node<"vec4">;
    flipSPQ(): Node<"vec4">;
    flipYZW(): Node<"vec4">;
    flipGBA(): Node<"vec4">;
    flipTPQ(): Node<"vec4">;
    flipXYZW(): Node<"vec4">;
    flipRGBA(): Node<"vec4">;
    flipSTPQ(): Node<"vec4">;
}

declare module "../core/Node.js" {
    interface FloatExtensions extends FlipSwizzle1 {
    }

    interface Vec2Extensions extends FlipSwizzle2 {
    }

    interface Vec3Extensions extends FlipSwizzle3 {
    }

    interface Vec4Extensions extends FlipSwizzle4 {
    }
}

/** anything that can be passed to {@link nodeObject} */
export type NodeObjectOption = Node | number | string;

// same logic as in ShaderNodeObject: number,boolean,node->node, otherwise do nothing
export type NodeObject<T> = T extends Node ? T
    : T extends number ? Node<"float">
    : T extends boolean ? Node<"bool">
    : T;

// opposite of NodeObject: node -> node|boolean|number, otherwise do nothing
type Proxied<T> = T extends Node | number ? Node | number : T;
// https://github.com/microsoft/TypeScript/issues/42435#issuecomment-765557874
export type ProxiedTuple<T extends readonly [...unknown[]]> = [...{ [index in keyof T]: Proxied<T[index]> }];
export type ProxiedObject<T> = { [index in keyof T]: Proxied<T[index]> };
type RemoveTail<T extends readonly [...unknown[]]> = T extends [unknown, ...infer X] ? X : [];
type RemoveHeadAndTail<T extends readonly [...unknown[]]> = T extends [unknown, ...infer X, unknown] ? X : [];

/**
 * Temporary type to save signatures of 4 constructors. Each element may be tuple or undefined.
 *
 * We use an object instead of tuple or union as it makes stuff easier, especially in Typescript 4.0.
 */
interface Constructors<
    A extends undefined | [...unknown[]],
    B extends undefined | [...unknown[]],
    C extends undefined | [...unknown[]],
    D extends undefined | [...unknown[]],
> {
    a: A;
    b: B;
    c: C;
    d: D;
}

/**
 * Returns all constructors
 *
 * <https://github.com/microsoft/TypeScript/issues/37079>
 * <https://stackoverflow.com/a/52761156/1623826>
 */
type OverloadedConstructorsOf<T> = T extends {
    new(...args: infer A1): unknown;
    new(...args: infer A2): unknown;
    new(...args: infer A3): unknown;
    new(...args: infer A4): unknown;
} ? Constructors<A1, A2, A3, A4>
    : T extends {
        new(...args: infer A1): unknown;
        new(...args: infer A2): unknown;
        new(...args: infer A3): unknown;
    } ? Constructors<A1, A2, A3, undefined>
    : T extends {
        new(...args: infer A1): unknown;
        new(...args: infer A2): unknown;
    } ? Constructors<A1, A2, undefined, undefined>
    : T extends new(...args: infer A) => unknown ? Constructors<A, undefined, undefined, undefined>
    : Constructors<undefined, undefined, undefined, undefined>;

type AnyConstructors = Constructors<any, any, any, any>;

/**
 * Returns all constructors where the first parameter is assignable to given "scope"
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type FilterConstructorsByScope<T extends AnyConstructors, S> = {
    a: S extends T["a"][0] ? T["a"] : undefined;
    b: S extends T["b"][0] ? T["b"] : undefined;
    c: S extends T["c"][0] ? T["c"] : undefined;
    d: S extends T["d"][0] ? T["d"] : undefined;
};
/**
 * "flattens" the tuple into an union type
 */
type ConstructorUnion<T extends AnyConstructors> =
    | Exclude<T["a"], undefined>
    | Exclude<T["b"], undefined>
    | Exclude<T["c"], undefined>
    | Exclude<T["d"], undefined>;

/**
 * Extract list of possible scopes - union of the first parameter
 * of all constructors, should it be string
 */
type ExtractScopes<T extends AnyConstructors> =
    | (T["a"][0] extends string ? T["a"][0] : never)
    | (T["b"][0] extends string ? T["b"][0] : never)
    | (T["c"][0] extends string ? T["c"][0] : never)
    | (T["d"][0] extends string ? T["d"][0] : never);

type GetConstructorsByScope<T, S> = ConstructorUnion<FilterConstructorsByScope<OverloadedConstructorsOf<T>, S>>;
type GetConstructors<T> = ConstructorUnion<OverloadedConstructorsOf<T>>;
type GetPossibleScopes<T> = ExtractScopes<OverloadedConstructorsOf<T>>;

type NodeArray<T extends NodeObjectOption[]> = { [index in keyof T]: NodeObject<T[index]> };
type NodeObjects<T> = { [key in keyof T]: T[key] extends NodeObjectOption ? NodeObject<T[key]> : T[key] };
type ConstructedNode<T> = T extends new(...args: any[]) => infer R ? (R extends Node ? R : never) : never;

export type NodeOrType = Node | string;

type ShaderCallNodeInternal<TNodeType> = Node<TNodeType>;

type ShaderNodeInternal<TNodeType> = Node<TNodeType>;

export const defined: (v: unknown) => unknown;

export const getConstNodeType: (value: NodeOrType) => string | null;

export class ShaderNode<T = {}, R extends Node = Node> {
    constructor(jsFunc: (inputs: NodeObjects<T>, builder: NodeBuilder) => R);
    call: (
        inputs: { [key in keyof T]: T[key] extends Node ? Node : T[key] },
        builder?: NodeBuilder,
    ) => R;
}

export function nodeObject<T extends NodeObjectOption>(obj: T): NodeObject<T>;
export function nodeObjectIntent<T extends NodeObjectOption>(obj: T): NodeObject<T>;
export function nodeObjects<T>(obj: T): NodeObjects<T>;

export function nodeArray<T extends NodeObjectOption[]>(obj: readonly [...T]): NodeArray<T>;

export function nodeProxy<T>(
    nodeClass: T,
): (...params: ProxiedTuple<GetConstructors<T>>) => ConstructedNode<T>;

export function nodeProxy<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
): (...params: ProxiedTuple<RemoveTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

export function nodeProxy<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
    factor: NodeObjectOption,
): (...params: ProxiedTuple<RemoveHeadAndTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

export function nodeImmutable<T>(
    nodeClass: T,
    ...params: ProxiedTuple<GetConstructors<T>>
): ConstructedNode<T>;

export function nodeProxyIntent<T>(
    nodeClass: T,
): (...params: ProxiedTuple<GetConstructors<T>>) => ConstructedNode<T>;

export function nodeProxyIntent<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
): (...params: ProxiedTuple<RemoveTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

export function nodeProxyIntent<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
    factor: NodeObjectOption,
): (...params: ProxiedTuple<RemoveHeadAndTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

interface Layout {
    name: string;
    type: string;
    inputs: {
        name: string;
        type: string;
        qualifier?: "in" | "out" | "inout";
    }[];
}

export interface FnNode<Args extends readonly unknown[], TReturn> {
    (...args: Args): TReturn extends void ? ShaderCallNodeInternal<void> : TReturn;

    shaderNode: ShaderNodeInternal<TReturn>;
    id: number;

    getNodeType: (builder: NodeBuilder) => string | null;
    getCacheKey: (force?: boolean) => number;

    setLayout: (layout: Layout) => this;

    once: (subBuilds?: string[] | null) => this;
}

export function Fn<TReturn>(
    jsFunc: (builder: NodeBuilder) => TReturn,
    layout?: string | Record<string, string>,
): FnNode<[], TReturn>;
export function Fn<TArgs extends readonly unknown[], TReturn>(
    jsFunc: (args: TArgs, builder: NodeBuilder) => TReturn,
    layout?: string | Record<string, string>,
): FnNode<ProxiedTuple<TArgs>, TReturn>;
export function Fn<TArgs extends { readonly [key: string]: unknown }, TReturn>(
    jsFunc: (args: TArgs, builder: NodeBuilder) => TReturn,
    layout?: string | Record<string, string>,
): FnNode<[ProxiedObject<TArgs>], TReturn>;

export const setCurrentStack: (stack: StackNode | null) => void;

export const getCurrentStack: () => StackNode | null;

export const If: (boolNode: Node, method: () => void) => StackNode;
export const Switch: (expression: Node) => StackNode;

export function Stack(node: Node): Node;

declare module "../core/Node.js" {
    interface NodeElements {
        toStack: () => Node;
    }
}

interface ColorFunction {
    // The first branch in `ConvertType` will forward the parameters to the `Color` constructor if there are no
    //   parameters or all the parameters are non-objects
    (color?: string | number): ConstNode<"color", Color>;
    (r: number, g: number, b: number): ConstNode<"color", Color>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (color: Color): ConstNode<"color", Color>;
    (node: Node): Node<"color">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object. Not sure which cases are worth considering here.
}

export const color: ColorFunction;

interface FloatFunction {
    (value?: number): ConstNode<"float", number>;
    (node: Node): Node<"float">;
}

export const float: FloatFunction;

interface IntFunction {
    (value?: number): ConstNode<"int", number>;
    (node: Node): Node<"int">;
}

export const int: IntFunction;

interface UintFunction {
    (value?: number): ConstNode<"uint", number>;
    (node: Node): Node<"uint">;
}

export const uint: UintFunction;

interface BoolFunction {
    (value?: boolean): ConstNode<"bool", boolean>;
    (node: Node): Node<"bool">;
}

export const bool: BoolFunction;

interface Vec2Function {
    // The first branch in `ConvertType` will forward the parameters to the `Vector2` constructor if there are no
    //   parameters or all the parameters are non-objects
    (x?: number, y?: number): ConstNode<"vec2", Vector2>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (value: Vector2): ConstNode<"vec2", Vector2>;
    (node: Node): Node<"vec2">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object.
    (x: Node | number, y: Node | number): Node<"vec2">;
}

export const vec2: Vec2Function;
export const ivec2: (node: Node) => Node<"ivec2">;
export const uvec2: (node: Node) => Node<"uvec2">;
export const bvec2: (node: Node) => Node<"bvec2">;

interface Vec3Function {
    // The first branch in `ConvertType` will forward the parameters to the `Vector3` constructor if there are no
    //   parameters or all the parameters are non-objects
    (x?: number, y?: number, z?: number): ConstNode<"vec3", Vector3>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (value: Vector3): ConstNode<"vec3", Vector3>;
    (value: [number, number, number]): ConstNode<"vec3", Vector3>;
    (node: Node): Node<"vec3">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object.
    (x: Node | number, y: Node | number, z?: Node | number): Node<"vec3">;
}

export const vec3: Vec3Function;
export const ivec3: (node: Node) => Node<"ivec3">;
export const uvec3: (node: Node) => Node<"uvec3">;
export const bvec3: (node: Node) => Node<"bvec3">;

interface Vec4Function {
    // The first branch in `ConvertType` will forward the parameters to the `Vector4` constructor if there are no
    //   parameters or all the parameters are non-objects
    (x?: number, y?: number, z?: number, w?: number): ConstNode<"vec4", Vector4>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (value: Vector4): ConstNode<"vec4", Vector4>;
    (node: Node): Node<"vec4">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object.
    (x: Node | number, y: Node | number, z?: Node | number, w?: Node | number): Node<"vec4">;
}

export const vec4: Vec4Function;
export const ivec4: (node: Node) => Node<"ivec4">;
export const uvec4: (node: Node) => Node<"uvec4">;
export const bvec4: (node: Node) => Node<"bvec4">;

interface Mat2Function {
    (value: Matrix2): ConstNode<"mat2", Matrix2>;
    (node: Node): Node<"mat2">;
}

export const mat2: Mat2Function;

interface Mat3Function {
    (value: Matrix3): ConstNode<"mat3", Matrix3>;
    (
        n11: number | Node,
        n12: number | Node,
        n13: number | Node,
        n21: number | Node,
        n22: number | Node,
        n23: number | Node,
        n31: number | Node,
        n32: number | Node,
        n33: number | Node,
    ): Node<"mat3">;
    (): ConstNode<"mat3", Matrix3>;
    (
        p1: Node,
        p2: Node,
        p3: Node,
    ): Node<"mat3">;
    (node: Node): Node<"mat3">;
}

export const mat3: Mat3Function;

interface Mat4Function {
    (value: Matrix4): ConstNode<"mat4", Matrix4>;
    (
        n11: number | Node,
        n12: number | Node,
        n13: number | Node,
        n14: number | Node,
        n21: number | Node,
        n22: number | Node,
        n23: number | Node,
        n24: number | Node,
        n31: number | Node,
        n32: number | Node,
        n33: number | Node,
        n34: number | Node,
        n41: number | Node,
        n42: number | Node,
        n43: number | Node,
        n44: number | Node,
    ): Node<"mat4">;
    (): ConstNode<"mat4", Matrix4>;
    (
        p1: Node,
        p2: Node,
        p3: Node,
        p4: Node,
    ): Node<"mat4">;
    (node: Node): Node<"mat4">;
}

export const mat4: Mat4Function;

export const string: (value?: string) => Node<"string">;
export const arrayBuffer: (value: ArrayBuffer) => Node<"ArrayBuffer">;

declare module "../core/Node.js" {
    interface NodeElements {
        toColor: () => Node<"color">;
        toFloat: () => Node<"float">;
        toInt: () => Node<"int">;
        toUint: () => Node<"uint">;
        toBool: () => Node<"bool">;
        toVec2: () => Node<"vec2">;
        toIVec2: () => Node<"ivec2">;
        toUVec2: () => Node<"uvec2">;
        toBVec2: () => Node<"bvec2">;
        toVec3: () => Node<"vec3">;
        toIVec3: () => Node<"ivec3">;
        toUVec3: () => Node<"uvec3">;
        toBVec3: () => Node<"bvec3">;
        toVec4: () => Node<"vec4">;
        toIVec4: () => Node<"ivec4">;
        toUVec4: () => Node<"uvec4">;
        toBVec4: () => Node<"bvec4">;
        toMat2: () => Node<"mat2">;
        toMat3: () => Node<"mat3">;
        toMat4: () => Node<"mat4">;
    }
}

export const element: (node: Node, indexNode: Node) => Node;
export const convert: (node: Node, types: string) => Node;
export const split: (node: Node, channels?: string) => Node;

declare module "../core/Node.js" {
    interface NodeElements {
        element: (indexNode: Node) => Node;

        convert: (types: string) => Node;
    }
}

/**
 * @deprecated append() has been renamed to Stack().
 */
export const append: (node: Node) => Node;

declare module "../core/Node.js" {
    interface NodeElements {
        /**
         * @deprecated append() has been renamed to Stack().
         */
        append: () => Node;
    }
}
