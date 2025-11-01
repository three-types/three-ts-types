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
type Vec2OrLessOrFloat = FloatOrNumber | Node<"vec2">;
type Vec3OrLessOrFloat = Vec2OrLessOrFloat | Node<"vec3">;
type Vec4OrLessOrFloat = Vec3OrLessOrFloat | Node<"vec4">;

type Vec2OrLess = Node<"vec2">;
type Vec3OrLess = Vec2OrLess | Node<"vec3">;
type Vec4OrLess = Vec3OrLess | Node<"vec4">;

type Mat2OrLess = Node<"mat2">;
type Mat3OrLess = Mat2OrLess | Node<"mat3">;
type Mat4OrLess = Mat3OrLess | Node<"mat4">;

interface AddSubDiv {
    (a: FloatOrNumber, b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (a: Vec2OrLessOrFloat, b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (a: Vec3OrLessOrFloat, b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (a: Vec4OrLessOrFloat, b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}
export const add: AddSubDiv;
export const sub: AddSubDiv;
interface Mul {
    (a: FloatOrNumber, b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (a: Vec2OrLessOrFloat, b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (a: Vec3OrLessOrFloat, b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (a: Vec4OrLessOrFloat, b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;

    (a: Mat2OrLess, b: Vec2OrLess): Node<"vec2">;
    (a: Mat3OrLess, b: Vec3OrLess): Node<"vec3">;
    (a: Mat4OrLess, b: Vec4OrLess): Node<"vec4">;
}
export const mul: Mul;
export const div: AddSubDiv;

export const mod: unknown;

type IntOrNumber = Node<"int"> | number;
type UintOrNumber = Node<"uint"> | number;

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

interface AndOr {
    (a: Node<"bool">, b: Node<"bool">, ...params: Node<"bool">[]): Node<"bool">;
}
export const and: AndOr;
export const or: AndOr;

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

interface AddSubMulDivFloatExtension {
    (b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivVec2Extension {
    (b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivVec3Extension {
    (b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface AddSubMulDivVec4Extension {
    (b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}

interface MulMat2Extension {
    (b: Vec2OrLess): Node<"vec2">;
    (b: Vec3OrLess): Node<"vec3">;
    (b: Vec4OrLess): Node<"vec4">;
}

interface MulMat3Extension {
    (b: Vec3OrLess): Node<"vec3">;
    (b: Vec4OrLess): Node<"vec4">;
}

interface MulMat4Extension {
    (b: Vec4OrLess): Node<"vec4">;
}

interface ComparisonOperatorFloatExtension {
    (b: FloatOrNumber): Node<"bool">;
}

interface ComparisonOperatorIntExtension {
    (b: IntOrNumber): Node<"bool">;
}

interface ComparisonOperatorUintExtension {
    (b: UintOrNumber): Node<"bool">;
}

interface AndOrBoolExtensions {
    (b: Node<"bool">, ...params: Node<"bool">[]): Node<"bool">;
}

declare module '../core/Node.js' {
    interface FloatExtensions {
        add: AddSubMulDivFloatExtension;
        sub: AddSubMulDivFloatExtension;
        mul: AddSubMulDivFloatExtension;
        div: AddSubMulDivFloatExtension;

        equal: ComparisonOperatorFloatExtension;
        notEqual: ComparisonOperatorFloatExtension;
        lessThan: ComparisonOperatorFloatExtension;
        greaterThan: ComparisonOperatorFloatExtension;
        lessThanEqual: ComparisonOperatorFloatExtension;
        greaterThanEqual: ComparisonOperatorFloatExtension;
    }

    interface IntExtensions {
        equal: ComparisonOperatorIntExtension;
        notEqual: ComparisonOperatorIntExtension;
        lessThan: ComparisonOperatorIntExtension;
        greaterThan: ComparisonOperatorIntExtension;
        lessThanEqual: ComparisonOperatorIntExtension;
        greaterThanEqual: ComparisonOperatorIntExtension;
    }

    interface UintExtensions {
        equal: ComparisonOperatorUintExtension;
        notEqual: ComparisonOperatorUintExtension;
        lessThan: ComparisonOperatorUintExtension;
        greaterThan: ComparisonOperatorUintExtension;
        lessThanEqual: ComparisonOperatorUintExtension;
        greaterThanEqual: ComparisonOperatorUintExtension;
    }

    interface BoolExtensions {
        and: AndOrBoolExtensions;
        or: AndOrBoolExtensions;
    }

    interface Vector2Extensions {
        add: AddSubMulDivVec2Extension;
        sub: AddSubMulDivVec2Extension;
        mul: AddSubMulDivVec2Extension;
        div: AddSubMulDivVec2Extension;
    }

    interface Vector3Extensions {
        add: AddSubMulDivVec3Extension;
        sub: AddSubMulDivVec3Extension;
        mul: AddSubMulDivVec3Extension;
        div: AddSubMulDivVec3Extension;
    }

    interface Vector4Extensions {
        add: AddSubMulDivVec4Extension;
        sub: AddSubMulDivVec4Extension;
        mul: AddSubMulDivVec4Extension;
        div: AddSubMulDivVec4Extension;
    }

    interface Matrix2Extensions {
        mul: MulMat2Extension;
    }

    interface Matrix3Extensions {
        mul: MulMat3Extension;
    }

    interface Matrix4Extensions {
        mul: MulMat4Extension;
    }
}

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: unknown;
