import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";

export type OperatorNodeOp =
    | "%"
    | "&"
    | "|"
    | "^"
    | ">>"
    | "<<"
    | "=="
    | "!="
    | "&&"
    | "||"
    | "^^"
    | "<"
    | ">"
    | "<="
    | ">="
    | "+"
    | "-"
    | "*"
    | "/";

export default class OperatorNode extends TempNode {
    aNode: Node;
    bNode: Node;
    op: OperatorNodeOp;

    readonly isOperatorNode: true;

    constructor(op: OperatorNodeOp, ...params: [Node, Node, ...Node[]]);
}

type FloatOrNumber = Node<"float"> | number;
type IntOrNumber = Node<"int"> | number;
type UintOrNumber = Node<"uint"> | number;

type Vec2OrLessOrFloat = FloatOrNumber | Node<"vec2">;
type Vec3OrLessOrFloat = Vec2OrLessOrFloat | Node<"vec3">;
type Vec4OrLessOrFloat = Vec3OrLessOrFloat | Node<"vec4">;

type Vec2OrLess = Node<"vec2">;
type Vec3OrLess = Vec2OrLess | Node<"vec3">;
type Vec4OrLess = Vec3OrLess | Node<"vec4">;

// add/sub/mul/div

// add/sub/mul/div floats and/or vecs
// Every parameter gets converted to the longest type

interface AddSubMulDivFloatVec {
    (a: FloatOrNumber, b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (a: Vec2OrLessOrFloat, b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (a: Vec3OrLessOrFloat, b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (a: Vec4OrLessOrFloat, b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivFloatVecFloatExtensions {
    (b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivFloatVecVec2Extensions {
    (b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivFloatVecVec3Extensions {
    (b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivFloatVecVec4Extensions {
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

// add/sub/mul mats

interface AddSubMulMat {
    (a: Node<"mat2">, b: Node<"mat2">): Node<"mat2">;
    (a: Node<"mat3">, b: Node<"mat3">): Node<"mat3">;
    (a: Node<"mat4">, b: Node<"mat4">): Node<"mat4">;
}

interface AddSubMulMat2Extensions {
    (b: Node<"mat2">): Node<"mat2">;
}

interface AddSubMulMat3Extensions {
    (b: Node<"mat3">): Node<"mat3">;
}

interface AddSubMulMat4Extensions {
    (b: Node<"mat4">): Node<"mat4">;
}

// mut mats and vecs
// The vec parameter gets converted to matrix length

interface MulMatVec {
    (a: Node<"mat2">, b: Vec4OrLess): Node<"vec2">;
    (a: Node<"mat3">, b: Vec4OrLess): Node<"vec3">;
    (a: Node<"mat4">, b: Vec4OrLess): Node<"vec4">;
}

interface MulVecMatMat2Extensions {
    (b: Vec4OrLess): Node<"vec2">;
}

interface MulVecMatMat3Extensions {
    (b: Vec4OrLess): Node<"vec3">;
}

interface MulVecMatMat4Extensions {
    (b: Vec4OrLess): Node<"vec4">;
}

// Exports

interface AddSub extends AddSubMulDivFloatVec, AddSubMulMat {}

export const add: AddSub;
export const sub: AddSub;

interface Mul extends AddSubMulDivFloatVec, AddSubMulMat, MulMatVec {
}

interface MulMat2Extensions extends AddSubMulMat2Extensions, MulVecMatMat2Extensions {
}

interface MulMat3Extensions extends AddSubMulMat3Extensions, MulVecMatMat3Extensions {
}

interface MulMat4Extensions extends AddSubMulMat4Extensions, MulVecMatMat4Extensions {
}

export const mul: Mul;

interface Div extends AddSubMulDivFloatVec {
}
export const div: Div;

declare module "../core/Node.js" {
    interface FloatExtensions {
        add: AddSubMulDivFloatVecFloatExtensions;
        sub: AddSubMulDivFloatVecFloatExtensions;
        mul: AddSubMulDivFloatVecFloatExtensions;
        div: AddSubMulDivFloatVecFloatExtensions;
    }

    interface Vector2Extensions {
        add: AddSubMulDivFloatVecVec2Extensions;
        sub: AddSubMulDivFloatVecVec2Extensions;
        mul: AddSubMulDivFloatVecVec2Extensions;
        div: AddSubMulDivFloatVecVec2Extensions;
    }

    interface Vector3Extensions {
        add: AddSubMulDivFloatVecVec3Extensions;
        sub: AddSubMulDivFloatVecVec3Extensions;
        mul: AddSubMulDivFloatVecVec3Extensions;
        div: AddSubMulDivFloatVecVec3Extensions;
    }

    interface Vector4Extensions {
        add: AddSubMulDivFloatVecVec4Extensions;
        sub: AddSubMulDivFloatVecVec4Extensions;
        mul: AddSubMulDivFloatVecVec4Extensions;
        div: AddSubMulDivFloatVecVec4Extensions;
    }

    interface Matrix2Extensions {
        add: AddSubMulMat2Extensions;
        sub: AddSubMulMat2Extensions;
        mul: MulMat2Extensions;
    }

    interface Matrix3Extensions {
        add: AddSubMulMat3Extensions;
        sub: AddSubMulMat3Extensions;
        mul: MulMat3Extensions;
    }

    interface Matrix4Extensions {
        add: AddSubMulMat4Extensions;
        sub: AddSubMulMat4Extensions;
        mul: MulMat4Extensions;
    }
}

// mod

interface Mod {
    (a: FloatOrNumber, b: FloatOrNumber): Node<"float">;
}
export const mod: Mod;

interface ModFloatExtension {
    (b: FloatOrNumber): Node<"float">;
}

declare module "../core/Node.js" {
    interface FloatExtensions {
        mod: ModFloatExtension;
    }
}

// Comparison operators

interface ComparisonOperator {
    (a: FloatOrNumber, b: FloatOrNumber): Node<"bool">;
    (a: IntOrNumber, b: IntOrNumber): Node<"bool">;
    (a: UintOrNumber, b: UintOrNumber): Node<"bool">;
}
export const equal: ComparisonOperator;
export const notEqual: ComparisonOperator;
export const lessThan: ComparisonOperator;
export const greaterThan: ComparisonOperator;
export const lessThanEqual: ComparisonOperator;
export const greaterThanEqual: ComparisonOperator;

interface ComparisonOperatorFloatExtensions {
    (b: FloatOrNumber): Node<"bool">;
}

interface ComparisonOperatorIntExtensions {
    (b: IntOrNumber): Node<"bool">;
}

interface ComparisonOperatorUintExtensions {
    (b: UintOrNumber): Node<"bool">;
}

declare module "../core/Node.js" {
    interface FloatExtensions {
        equal: ComparisonOperatorFloatExtensions;
        notEqual: ComparisonOperatorFloatExtensions;
        lessThan: ComparisonOperatorFloatExtensions;
        greaterThan: ComparisonOperatorFloatExtensions;
        lessThanEqual: ComparisonOperatorFloatExtensions;
        greaterThanEqual: ComparisonOperatorFloatExtensions;
    }

    interface IntExtensions {
        equal: ComparisonOperatorIntExtensions;
        notEqual: ComparisonOperatorIntExtensions;
        lessThan: ComparisonOperatorIntExtensions;
        greaterThan: ComparisonOperatorIntExtensions;
        lessThanEqual: ComparisonOperatorIntExtensions;
        greaterThanEqual: ComparisonOperatorIntExtensions;
    }

    interface UintExtensions {
        equal: ComparisonOperatorUintExtensions;
        notEqual: ComparisonOperatorUintExtensions;
        lessThan: ComparisonOperatorUintExtensions;
        greaterThan: ComparisonOperatorUintExtensions;
        lessThanEqual: ComparisonOperatorUintExtensions;
        greaterThanEqual: ComparisonOperatorUintExtensions;
    }
}

// and/or

interface AndOr {
    (a: Node<"bool">, b: Node<"bool">, ...params: Node<"bool">[]): Node<"bool">;
}
export const and: AndOr;
export const or: AndOr;

interface AndOrBoolExtensions {
    (b: Node<"bool">, ...params: Node<"bool">[]): Node<"bool">;
}

declare module "../core/Node.js" {
    interface BoolExtensions {
        and: AndOrBoolExtensions;
        or: AndOrBoolExtensions;
    }
}

export const not: unknown;
export const xor: unknown;
export const bitAnd: unknown;
export const bitNot: unknown;
export const bitOr: unknown;
export const bitXor: unknown;
export const shiftLeft: unknown;
export const shiftRight: unknown;

export const incrementBefore: unknown;
export const decrementBefore: unknown;
export const increment: unknown;
export const decrement: unknown;

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: unknown;
