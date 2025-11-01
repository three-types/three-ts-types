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

interface AddSub {
    (a: FloatOrNumber, b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (a: Vec2OrLessOrFloat, b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (a: Vec3OrLessOrFloat, b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (a: Vec4OrLessOrFloat, b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;

    (a: Node<"mat2">, b: Node<"mat2">): Node<"mat2">;
    (a: Node<"mat3">, b: Node<"mat3">): Node<"mat3">;
    (a: Node<"mat4">, b: Node<"mat4">): Node<"mat4">;
}
export const add: AddSub;
export const sub: AddSub;

interface Mul {
    (a: FloatOrNumber, b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (a: Vec2OrLessOrFloat, b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (a: Vec3OrLessOrFloat, b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (a: Vec4OrLessOrFloat, b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;

    (a: Node<"mat2">, b: Vec4OrLess): Node<"vec2">;
    (a: Node<"mat3">, b: Vec4OrLess): Node<"vec3">;
    (a: Node<"mat4">, b: Vec4OrLess): Node<"vec4">;

    (a: Node<"mat2">, b: Node<"mat2">): Node<"mat2">;
    (a: Node<"mat3">, b: Node<"mat3">): Node<"mat3">;
    (a: Node<"mat4">, b: Node<"mat4">): Node<"mat4">;
}
export const mul: Mul;

interface Div {
    (a: FloatOrNumber, b: FloatOrNumber, ...params: FloatOrNumber[]): Node<"float">;
    (a: Vec2OrLessOrFloat, b: Vec2OrLessOrFloat, ...params: Vec2OrLessOrFloat[]): Node<"vec2">;
    (a: Vec3OrLessOrFloat, b: Vec3OrLessOrFloat, ...params: Vec3OrLessOrFloat[]): Node<"vec3">;
    (a: Vec4OrLessOrFloat, b: Vec4OrLessOrFloat, ...params: Vec4OrLessOrFloat[]): Node<"vec4">;
}
export const div: Div;

interface Mod {
    (a: FloatOrNumber, b: FloatOrNumber): Node<"float">;
}
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

interface ModFloatExtension {
    (b: FloatOrNumber): Node<"float">;
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

interface AddSubMat2Extension {
    (b: Node<"mat2">): Node<"mat2">;
}

interface MulMat2Extension {
    (b: Vec4OrLess): Node<"vec2">;
    (b: Node<"mat2">): Node<"mat2">;
}

interface AddSubMat3Extension {
    (b: Node<"mat3">): Node<"mat3">;
}

interface MulMat3Extension {
    (b: Vec4OrLess): Node<"vec3">;
    (b: Node<"mat3">): Node<"mat3">;
}

interface AddSubMat4Extension {
    (b: Node<"mat4">): Node<"mat4">;
}

interface MulMat4Extension {
    (b: Vec4OrLess): Node<"vec4">;
    (b: Node<"mat4">): Node<"mat4">;
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

        mod: ModFloatExtension;

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
        add: AddSubMat2Extension;
        sub: AddSubMat2Extension;
        mul: MulMat2Extension;
    }

    interface Matrix3Extensions {
        add: AddSubMat3Extension;
        sub: AddSubMat3Extension;
        mul: MulMat3Extension;
    }

    interface Matrix4Extensions {
        add: AddSubMat4Extension;
        sub: AddSubMat4Extension;
        mul: MulMat4Extension;
    }
}

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: unknown;
