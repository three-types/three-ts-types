import Node, { IntegerType, NumberType } from "../core/Node.js";
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

type Vec2OrLess = Node<"vec2">;
type Vec3OrLess = Vec2OrLess | Node<"vec3">;
type Vec4OrLess = Vec3OrLess | Node<"vec4">;

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

type AnyNumber = Node<"float"> | Node<"int"> | Node<"uint"> | number;

// add/sub/mul/div

// add/sub/mul/div numbers and/or vecs
// Every parameter gets converted to the longest type
// If the parameters are the same length, it gets converted to the first type
// FIXME We handle the case of converting number types, but not converting between vectors of different number types

interface AddSubMulDivNumberVec<TNumber extends NumberType> {
    (a: Number<TNumber>, b: AnyNumber, ...params: AnyNumber[]): Node<TNumber>;
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
    (b: AnyNumber, ...params: AnyNumber[]): Node<TNumber>;
    (b: Vec2OrLessOrNumber<TNumber>, ...params: Vec2OrLessOrNumber<TNumber>[]): Node<NumberToVec2<TNumber>>;
    (b: Vec3OrLessOrNumber<TNumber>, ...params: Vec3OrLessOrNumber<TNumber>[]): Node<NumberToVec3<TNumber>>;
    (b: Vec4OrLessOrNumber<TNumber>, ...params: Vec4OrLessOrNumber<TNumber>[]): Node<NumberToVec4<TNumber>>;
}

interface AddSubMulDivNumberVecNumberAssignExtensions {
    (b: AnyNumber, ...params: AnyNumber[]): this;
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
    (a: Vec4OrLess, b: Node<"mat2">): Node<"vec2">;
    (a: Vec4OrLess, b: Node<"mat3">): Node<"vec3">;
    (a: Vec4OrLess, b: Node<"mat4">): Node<"vec4">;
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

interface MulVecMatVecExtensions {
    (b: Node<"mat2">): Node<"vec2">;
    (b: Node<"mat3">): Node<"vec3">;
    (b: Node<"mat4">): Node<"vec4">;
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

interface MulVec2Extensions<TNumber extends NumberType>
    extends AddSubMulDivNumberVecVec2Extensions<TNumber>, MulVecMatVecExtensions
{
}

interface MulVec3Extensions<TNumber extends NumberType>
    extends AddSubMulDivNumberVecVec3Extensions<TNumber>, MulVecMatVecExtensions
{
}

interface MulVec4Extensions<TNumber extends NumberType>
    extends AddSubMulDivNumberVecVec4Extensions<TNumber>, MulVecMatVecExtensions
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
    interface NumberExtensions<TNumber extends NumberType> {
        add: AddSubMulDivNumberVecNumberExtensions<TNumber>;
        sub: AddSubMulDivNumberVecNumberExtensions<TNumber>;
        mul: AddSubMulDivNumberVecNumberExtensions<TNumber>;
        div: AddSubMulDivNumberVecNumberExtensions<TNumber>;

        addAssign: AddSubMulDivNumberVecNumberAssignExtensions;
        subAssign: AddSubMulDivNumberVecNumberAssignExtensions;
        mulAssign: AddSubMulDivNumberVecNumberAssignExtensions;
        divAssign: AddSubMulDivNumberVecNumberAssignExtensions;
    }

    interface Vector2Extensions<TNumber extends NumberType> {
        add: AddSubMulDivNumberVecVec2Extensions<TNumber>;
        sub: AddSubMulDivNumberVecVec2Extensions<TNumber>;
        mul: MulVec2Extensions<TNumber>;
        div: AddSubMulDivNumberVecVec2Extensions<TNumber>;

        addAssign: AddSubMulDivNumberVecVec2AssignExtensions<TNumber>;
        subAssign: AddSubMulDivNumberVecVec2AssignExtensions<TNumber>;
        mulAssign: AddSubMulDivNumberVecVec2AssignExtensions<TNumber>;
        divAssign: AddSubMulDivNumberVecVec2AssignExtensions<TNumber>;
    }

    interface Vector3Extensions<TNumber extends NumberType> {
        add: AddSubMulDivNumberVecVec3Extensions<TNumber>;
        sub: AddSubMulDivNumberVecVec3Extensions<TNumber>;
        mul: MulVec3Extensions<TNumber>;
        div: AddSubMulDivNumberVecVec3Extensions<TNumber>;

        addAssign: AddSubMulDivNumberVecVec3AssignExtensions<TNumber>;
        subAssign: AddSubMulDivNumberVecVec3AssignExtensions<TNumber>;
        mulAssign: AddSubMulDivNumberVecVec3AssignExtensions<TNumber>;
        divAssign: AddSubMulDivNumberVecVec3AssignExtensions<TNumber>;
    }

    interface Vector4Extensions<TNumber extends NumberType> {
        add: AddSubMulDivNumberVecVec4Extensions<TNumber>;
        sub: AddSubMulDivNumberVecVec4Extensions<TNumber>;
        mul: MulVec4Extensions<TNumber>;
        div: AddSubMulDivNumberVecVec4Extensions<TNumber>;

        addAssign: AddSubMulDivNumberVecVec4AssignExtensions<TNumber>;
        subAssign: AddSubMulDivNumberVecVec4AssignExtensions<TNumber>;
        mulAssign: AddSubMulDivNumberVecVec4AssignExtensions<TNumber>;
        divAssign: AddSubMulDivNumberVecVec4AssignExtensions<TNumber>;
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
    (a: Number<"float">, b: Vec4OrLessOrNumber<"float">): Node<"float">;
    (a: Node<"vec2">, b: Vec4OrLessOrNumber<"float">): Node<"vec2">;
    (a: Node<"vec3">, b: Vec4OrLessOrNumber<"float">): Node<"vec3">;
    (a: Node<"vec4">, b: Vec4OrLessOrNumber<"float">): Node<"vec4">;

    (a: Number<"int">, b: Vec4OrLessOrNumber<"int">): Node<"int">;
    (a: Node<"ivec2">, b: Vec4OrLessOrNumber<"int">): Node<"ivec2">;
    (a: Node<"ivec3">, b: Vec4OrLessOrNumber<"int">): Node<"ivec3">;
    (a: Node<"ivec4">, b: Vec4OrLessOrNumber<"int">): Node<"ivec4">;

    (a: Number<"uint">, b: Vec4OrLessOrNumber<"uint">): Node<"uint">;
    (a: Node<"uvec2">, b: Vec4OrLessOrNumber<"uint">): Node<"uvec2">;
    (a: Node<"uvec3">, b: Vec4OrLessOrNumber<"uint">): Node<"uvec3">;
    (a: Node<"uvec4">, b: Vec4OrLessOrNumber<"uint">): Node<"uvec4">;
}

export const mod: Mod;

declare module "../core/Node.js" {
    interface NumberExtensions<TNumber extends NumberType> {
        mod: (b: Vec4OrLessOrNumber<TNumber>) => Node<TNumber>;
        modAssign: (b: Vec4OrLessOrNumber<TNumber>) => this;
    }
    interface Vector2Extensions<TNumber extends NumberType> {
        mod: (b: Vec4OrLessOrNumber<TNumber>) => Node<NumberToVec2<TNumber>>;
        modAssign: (b: Vec4OrLessOrNumber<TNumber>) => this;
    }
    interface Vector3Extensions<TNumber extends NumberType> {
        mod: (b: Vec4OrLessOrNumber<TNumber>) => Node<NumberToVec3<TNumber>>;
        modAssign: (b: Vec4OrLessOrNumber<TNumber>) => this;
    }
    interface Vector4Extensions<TNumber extends NumberType> {
        mod: (b: Vec4OrLessOrNumber<TNumber>) => Node<NumberToVec4<TNumber>>;
        modAssign: (b: Vec4OrLessOrNumber<TNumber>) => this;
    }
}

// Comparison operators

interface ComparisonOperator {
    (a: Number<"float">, b: Number<"float">): Node<"bool">;
    (a: Number<"int"> | Number<"uint">, b: Number<"int"> | Number<"uint">): Node<"bool">;
}
export const equal: ComparisonOperator;
export const notEqual: ComparisonOperator;
export const lessThan: ComparisonOperator;
export const greaterThan: ComparisonOperator;
export const lessThanEqual: ComparisonOperator;
export const greaterThanEqual: ComparisonOperator;

interface ComparisonOperatorNumberExtensions<TNumber extends NumberType> {
    (b: Number<TNumber>): Node<"bool">;
}

declare module "../core/Node.js" {
    interface FloatExtensions {
        equal: ComparisonOperatorNumberExtensions<"float">;
        notEqual: ComparisonOperatorNumberExtensions<"float">;
        lessThan: ComparisonOperatorNumberExtensions<"float">;
        greaterThan: ComparisonOperatorNumberExtensions<"float">;
        lessThanEqual: ComparisonOperatorNumberExtensions<"float">;
        greaterThanEqual: ComparisonOperatorNumberExtensions<"float">;
    }

    interface IntExtensions {
        equal: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        notEqual: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        lessThan: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        greaterThan: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        lessThanEqual: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        greaterThanEqual: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
    }

    interface UintExtensions {
        equal: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        notEqual: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        lessThan: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        greaterThan: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        lessThanEqual: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
        greaterThanEqual: (b: Number<"int"> | Number<"uint">) => Node<"bool">;
    }
}

// and/or/not/xor

interface AndOr {
    (a: Node<"bool">, b: Node<"bool">, ...params: Node<"bool">[]): Node<"bool">;
}
export const and: AndOr;
export const or: AndOr;

interface AndOrBoolExtensions {
    (b: Node<"bool">, ...params: Node<"bool">[]): Node<"bool">;
}

export const not: (a: Node<"bool">) => Node<"bool">;
export const xor: (a: Node<"bool">, b: Node<"bool">) => Node<"bool">;

declare module "../core/Node.js" {
    interface BoolExtensions {
        and: AndOrBoolExtensions;
        or: AndOrBoolExtensions;
        not: () => Node<"bool">;
        xor: (b: Node<"bool">) => Node<"bool">;
    }
}

// bit operators

interface UnaryBitOperator {
    (a: Number<"int">): Node<"int">;
    (a: Number<"uint">): Node<"uint">;
}

interface BinaryBitOperator {
    (a: Number<"int">, b: Number<"int">): Node<"int">;
    (a: Number<"uint">, b: Number<"uint">): Node<"uint">;
}

export const bitAnd: BinaryBitOperator;
export const bitNot: UnaryBitOperator;
export const bitOr: BinaryBitOperator;
export const bitXor: BinaryBitOperator;
export const shiftLeft: BinaryBitOperator;
export const shiftRight: BinaryBitOperator;

interface BinaryBitOperatorIntegerExtensions<TInteger extends IntegerType> {
    (b: Number<TInteger>): Node<TInteger>;
}

interface BinaryBitOperatorIntegerAssignExtensions<TInteger extends IntegerType> {
    (b: Number<TInteger>): this;
}

declare module "../core/Node.js" {
    interface IntegerExtensions<TInteger extends IntegerType> {
        bitAnd: BinaryBitOperatorIntegerExtensions<TInteger>;
        bitNot: () => Node<TInteger>;
        bitOr: BinaryBitOperatorIntegerExtensions<TInteger>;
        bitXor: BinaryBitOperatorIntegerExtensions<TInteger>;
        shiftLeft: BinaryBitOperatorIntegerExtensions<TInteger>;
        shiftRight: BinaryBitOperatorIntegerExtensions<TInteger>;

        bitAndAssign: BinaryBitOperatorIntegerAssignExtensions<TInteger>;
        bitNotAssign: () => this;
        bitOrAssign: BinaryBitOperatorIntegerAssignExtensions<TInteger>;
        bitXorAssign: BinaryBitOperatorIntegerAssignExtensions<TInteger>;
        shiftLeftAssign: BinaryBitOperatorIntegerAssignExtensions<TInteger>;
        shiftRightAssign: BinaryBitOperatorIntegerAssignExtensions<TInteger>;
    }
}

// increment/decrement

interface IncrementDecrement {
    (a: Number<"int">): Node<"int">;
    (a: Number<"uint">): Node<"uint">;
}

export const incrementBefore: IncrementDecrement;
export const decrementBefore: IncrementDecrement;
export const increment: IncrementDecrement;
export const decrement: IncrementDecrement;

interface IncrementDecrementIntegerExtensions<TInteger extends IntegerType> {
    (): Node<TInteger>;
}

declare module "../core/Node.js" {
    interface IntegerExtensions<TInteger extends IntegerType> {
        incrementBefore: IncrementDecrementIntegerExtensions<TInteger>;
        decrementBefore: IncrementDecrementIntegerExtensions<TInteger>;
        increment: IncrementDecrementIntegerExtensions<TInteger>;
        decrement: IncrementDecrementIntegerExtensions<TInteger>;
    }
}

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: Mod;

declare module "../core/Node.js" {
    interface NumberExtensions<TNumber extends NumberType> {
        /**
         * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
         */
        modInt: (b: Number<TNumber>) => Node<TNumber>;
        /**
         * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
         */
        modIntAssign: (b: Number<TNumber>) => this;
    }
}
