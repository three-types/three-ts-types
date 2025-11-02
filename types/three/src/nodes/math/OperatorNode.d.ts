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

type NumberType = "float" | "int" | "uint";

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

// add/sub/mul/div

// add/sub/mul/div numbers and/or vecs
// Every parameter gets converted to the longest type

interface AddSubMulDivNumberVec<TNumber extends NumberType> {
    (a: Number<TNumber>, b: Number<TNumber>, ...params: Number<TNumber>[]): Node<TNumber>;
    (
        a: Vec2OrLessOrNumber<TNumber>,
        b: Vec2OrLessOrNumber<TNumber>,
        ...params: Vec2OrLessOrNumber<TNumber>[]
    ): Node<NumberToVec2<TNumber>>;
    (
        a: Vec3OrLessOrNumber<TNumber>,
        b: Vec3OrLessOrNumber<TNumber>,
        ...params: Vec3OrLessOrNumber<TNumber>[]
    ): Node<NumberToVec3<TNumber>>;
    (
        a: Vec4OrLessOrNumber<TNumber>,
        b: Vec4OrLessOrNumber<TNumber>,
        ...params: Vec4OrLessOrNumber<TNumber>[]
    ): Node<NumberToVec4<TNumber>>;
}

interface AddSubMulDivNumberVecNumberExtensions<TNumber extends NumberType> {
    (b: Number<TNumber>, ...params: Number<TNumber>[]): Node<TNumber>;
    (b: Vec2OrLessOrNumber<TNumber>, ...params: Vec2OrLessOrNumber<TNumber>[]): Node<NumberToVec2<TNumber>>;
    (b: Vec3OrLessOrNumber<TNumber>, ...params: Vec3OrLessOrNumber<TNumber>[]): Node<NumberToVec3<TNumber>>;
    (b: Vec4OrLessOrNumber<TNumber>, ...params: Vec4OrLessOrNumber<TNumber>[]): Node<NumberToVec4<TNumber>>;
}

interface AddSubMulDivNumberVecNumberAssignExtensions<TNumber extends NumberType> {
    (b: Number<TNumber>, ...params: Number<TNumber>[]): this;
}

interface AddSubMulDivNumberVecVec2Extensions<TNumber extends NumberType> {
    (b: Vec2OrLessOrNumber<TNumber>, ...params: Vec2OrLessOrNumber<TNumber>[]): Node<NumberToVec2<TNumber>>;
    (b: Vec3OrLessOrNumber<TNumber>, ...params: Vec3OrLessOrNumber<TNumber>[]): Node<NumberToVec3<TNumber>>;
    (b: Vec4OrLessOrNumber<TNumber>, ...params: Vec4OrLessOrNumber<TNumber>[]): Node<NumberToVec4<TNumber>>;
}

interface AddSubMulDivNumberVecVec2AssignExtensions<TNumber extends NumberType> {
    (b: Vec2OrLessOrNumber<TNumber>, ...params: Vec2OrLessOrNumber<TNumber>[]): this;
}

interface AddSubMulDivNumberVecVec3Extensions<TNumber extends NumberType> {
    (b: Vec3OrLessOrNumber<TNumber>, ...params: Vec3OrLessOrNumber<TNumber>[]): Node<NumberToVec3<TNumber>>;
    (b: Vec4OrLessOrNumber<TNumber>, ...params: Vec4OrLessOrNumber<TNumber>[]): Node<NumberToVec4<TNumber>>;
}

interface AddSubMulDivNumberVecVec3AssignExtensions<TNumber extends NumberType> {
    (b: Vec3OrLessOrNumber<TNumber>, ...params: Vec3OrLessOrNumber<TNumber>[]): this;
}

interface AddSubMulDivNumberVecVec4Extensions<TNumber extends NumberType> {
    (b: Vec4OrLessOrNumber<TNumber>, ...params: Vec4OrLessOrNumber<TNumber>[]): Node<NumberToVec4<TNumber>>;
}

interface AddSubMulDivNumberVecVec4AssignExtensions<TNumber extends NumberType> {
    (b: Vec4OrLessOrNumber<TNumber>, ...params: Vec4OrLessOrNumber<TNumber>[]): this;
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

interface AddSubMulMat2AssignExtensions {
    (b: Node<"mat2">): this;
}

interface AddSubMulMat3Extensions {
    (b: Node<"mat3">): Node<"mat3">;
}

interface AddSubMulMat3AssignExtensions {
    (b: Node<"mat3">): this;
}

interface AddSubMulMat4Extensions {
    (b: Node<"mat4">): Node<"mat4">;
}

interface AddSubMulMat4AssignExtensions {
    (b: Node<"mat3">): this;
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

interface AddSub
    extends AddSubMulDivNumberVec<"float">, AddSubMulDivNumberVec<"int">, AddSubMulDivNumberVec<"uint">, AddSubMulMat
{}

export const add: AddSub;
export const sub: AddSub;

interface Mul
    extends
        AddSubMulDivNumberVec<"float">,
        AddSubMulDivNumberVec<"int">,
        AddSubMulDivNumberVec<"uint">,
        AddSubMulMat,
        MulMatVec
{
}

interface MulMat2Extensions extends AddSubMulMat2Extensions, MulVecMatMat2Extensions {
}

interface MulMat3Extensions extends AddSubMulMat3Extensions, MulVecMatMat3Extensions {
}

interface MulMat4Extensions extends AddSubMulMat4Extensions, MulVecMatMat4Extensions {
}

export const mul: Mul;

interface Div extends AddSubMulDivNumberVec<"float">, AddSubMulDivNumberVec<"int">, AddSubMulDivNumberVec<"uint"> {
}
export const div: Div;

declare module "../core/Node.js" {
    interface FloatExtensions {
        add: AddSubMulDivNumberVecNumberExtensions<"float">;
        sub: AddSubMulDivNumberVecNumberExtensions<"float">;
        mul: AddSubMulDivNumberVecNumberExtensions<"float">;
        div: AddSubMulDivNumberVecNumberExtensions<"float">;

        addAssign: AddSubMulDivNumberVecNumberAssignExtensions<"float">;
        subAssign: AddSubMulDivNumberVecNumberAssignExtensions<"float">;
        mulAssign: AddSubMulDivNumberVecNumberAssignExtensions<"float">;
        divAssign: AddSubMulDivNumberVecNumberAssignExtensions<"float">;
    }

    interface IntExtensions {
        add: AddSubMulDivNumberVecNumberExtensions<"int">;
        sub: AddSubMulDivNumberVecNumberExtensions<"int">;
        mul: AddSubMulDivNumberVecNumberExtensions<"int">;
        div: AddSubMulDivNumberVecNumberExtensions<"int">;

        addAssign: AddSubMulDivNumberVecNumberAssignExtensions<"int">;
        subAssign: AddSubMulDivNumberVecNumberAssignExtensions<"int">;
        mulAssign: AddSubMulDivNumberVecNumberAssignExtensions<"int">;
        divAssign: AddSubMulDivNumberVecNumberAssignExtensions<"int">;
    }

    interface UintExtensions {
        add: AddSubMulDivNumberVecNumberExtensions<"uint">;
        sub: AddSubMulDivNumberVecNumberExtensions<"uint">;
        mul: AddSubMulDivNumberVecNumberExtensions<"uint">;
        div: AddSubMulDivNumberVecNumberExtensions<"uint">;

        addAssign: AddSubMulDivNumberVecNumberAssignExtensions<"uint">;
        subAssign: AddSubMulDivNumberVecNumberAssignExtensions<"uint">;
        mulAssign: AddSubMulDivNumberVecNumberAssignExtensions<"uint">;
        divAssign: AddSubMulDivNumberVecNumberAssignExtensions<"uint">;
    }

    interface Vector2Extensions {
        add: AddSubMulDivNumberVecVec2Extensions<"float">;
        sub: AddSubMulDivNumberVecVec2Extensions<"float">;
        mul: AddSubMulDivNumberVecVec2Extensions<"float">;
        div: AddSubMulDivNumberVecVec2Extensions<"float">;

        addAssign: AddSubMulDivNumberVecVec2AssignExtensions<"float">;
        subAssign: AddSubMulDivNumberVecVec2AssignExtensions<"float">;
        mulAssign: AddSubMulDivNumberVecVec2AssignExtensions<"float">;
        divAssign: AddSubMulDivNumberVecVec2AssignExtensions<"float">;
    }

    interface Ivec2Extensions {
        add: AddSubMulDivNumberVecVec2Extensions<"int">;
        sub: AddSubMulDivNumberVecVec2Extensions<"int">;
        mul: AddSubMulDivNumberVecVec2Extensions<"int">;
        div: AddSubMulDivNumberVecVec2Extensions<"int">;

        addAssign: AddSubMulDivNumberVecVec2AssignExtensions<"int">;
        subAssign: AddSubMulDivNumberVecVec2AssignExtensions<"int">;
        mulAssign: AddSubMulDivNumberVecVec2AssignExtensions<"int">;
        divAssign: AddSubMulDivNumberVecVec2AssignExtensions<"int">;
    }

    interface Uvec2Extensions {
        add: AddSubMulDivNumberVecVec2Extensions<"uint">;
        sub: AddSubMulDivNumberVecVec2Extensions<"uint">;
        mul: AddSubMulDivNumberVecVec2Extensions<"uint">;
        div: AddSubMulDivNumberVecVec2Extensions<"uint">;

        addAssign: AddSubMulDivNumberVecVec2AssignExtensions<"uint">;
        subAssign: AddSubMulDivNumberVecVec2AssignExtensions<"uint">;
        mulAssign: AddSubMulDivNumberVecVec2AssignExtensions<"uint">;
        divAssign: AddSubMulDivNumberVecVec2AssignExtensions<"uint">;
    }

    interface Vector3Extensions {
        add: AddSubMulDivNumberVecVec3Extensions<"float">;
        sub: AddSubMulDivNumberVecVec3Extensions<"float">;
        mul: AddSubMulDivNumberVecVec3Extensions<"float">;
        div: AddSubMulDivNumberVecVec3Extensions<"float">;

        addAssign: AddSubMulDivNumberVecVec3AssignExtensions<"float">;
        subAssign: AddSubMulDivNumberVecVec3AssignExtensions<"float">;
        mulAssign: AddSubMulDivNumberVecVec3AssignExtensions<"float">;
        divAssign: AddSubMulDivNumberVecVec3AssignExtensions<"float">;
    }

    interface Ivec3Extensions {
        add: AddSubMulDivNumberVecVec3Extensions<"int">;
        sub: AddSubMulDivNumberVecVec3Extensions<"int">;
        mul: AddSubMulDivNumberVecVec3Extensions<"int">;
        div: AddSubMulDivNumberVecVec3Extensions<"int">;

        addAssign: AddSubMulDivNumberVecVec3AssignExtensions<"int">;
        subAssign: AddSubMulDivNumberVecVec3AssignExtensions<"int">;
        mulAssign: AddSubMulDivNumberVecVec3AssignExtensions<"int">;
        divAssign: AddSubMulDivNumberVecVec3AssignExtensions<"int">;
    }

    interface Uvec3Extensions {
        add: AddSubMulDivNumberVecVec3Extensions<"uint">;
        sub: AddSubMulDivNumberVecVec3Extensions<"uint">;
        mul: AddSubMulDivNumberVecVec3Extensions<"uint">;
        div: AddSubMulDivNumberVecVec3Extensions<"uint">;

        addAssign: AddSubMulDivNumberVecVec3AssignExtensions<"uint">;
        subAssign: AddSubMulDivNumberVecVec3AssignExtensions<"uint">;
        mulAssign: AddSubMulDivNumberVecVec3AssignExtensions<"uint">;
        divAssign: AddSubMulDivNumberVecVec3AssignExtensions<"uint">;
    }

    interface Vector4Extensions {
        add: AddSubMulDivNumberVecVec4Extensions<"float">;
        sub: AddSubMulDivNumberVecVec4Extensions<"float">;
        mul: AddSubMulDivNumberVecVec4Extensions<"float">;
        div: AddSubMulDivNumberVecVec4Extensions<"float">;

        addAssign: AddSubMulDivNumberVecVec4AssignExtensions<"float">;
        subAssign: AddSubMulDivNumberVecVec4AssignExtensions<"float">;
        mulAssign: AddSubMulDivNumberVecVec4AssignExtensions<"float">;
        divAssign: AddSubMulDivNumberVecVec4AssignExtensions<"float">;
    }

    interface Ivec4Extensions {
        add: AddSubMulDivNumberVecVec4Extensions<"int">;
        sub: AddSubMulDivNumberVecVec4Extensions<"int">;
        mul: AddSubMulDivNumberVecVec4Extensions<"int">;
        div: AddSubMulDivNumberVecVec4Extensions<"int">;

        addAssign: AddSubMulDivNumberVecVec4AssignExtensions<"int">;
        subAssign: AddSubMulDivNumberVecVec4AssignExtensions<"int">;
        mulAssign: AddSubMulDivNumberVecVec4AssignExtensions<"int">;
        divAssign: AddSubMulDivNumberVecVec4AssignExtensions<"int">;
    }

    interface Uvec4Extensions {
        add: AddSubMulDivNumberVecVec4Extensions<"uint">;
        sub: AddSubMulDivNumberVecVec4Extensions<"uint">;
        mul: AddSubMulDivNumberVecVec4Extensions<"uint">;
        div: AddSubMulDivNumberVecVec4Extensions<"uint">;

        addAssign: AddSubMulDivNumberVecVec4AssignExtensions<"uint">;
        subAssign: AddSubMulDivNumberVecVec4AssignExtensions<"uint">;
        mulAssign: AddSubMulDivNumberVecVec4AssignExtensions<"uint">;
        divAssign: AddSubMulDivNumberVecVec4AssignExtensions<"uint">;
    }

    interface Matrix2Extensions {
        add: AddSubMulMat2Extensions;
        sub: AddSubMulMat2Extensions;
        mul: MulMat2Extensions;

        addAssign: AddSubMulMat2AssignExtensions;
        subAssign: AddSubMulMat2AssignExtensions;
        mulAssign: AddSubMulMat2AssignExtensions;
    }

    interface Matrix3Extensions {
        add: AddSubMulMat3Extensions;
        sub: AddSubMulMat3Extensions;
        mul: MulMat3Extensions;

        addAssign: AddSubMulMat3AssignExtensions;
        subAssign: AddSubMulMat3AssignExtensions;
        mulAssign: AddSubMulMat3AssignExtensions;
    }

    interface Matrix4Extensions {
        add: AddSubMulMat4Extensions;
        sub: AddSubMulMat4Extensions;
        mul: MulMat4Extensions;

        addAssign: AddSubMulMat4AssignExtensions;
        subAssign: AddSubMulMat4AssignExtensions;
        mulAssign: AddSubMulMat4AssignExtensions;
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

interface ModFloatAssignExtension {
    (b: FloatOrNumber): this;
}

declare module "../core/Node.js" {
    interface FloatExtensions {
        mod: ModFloatExtension;

        modAssign: ModFloatAssignExtension;
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
