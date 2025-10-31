import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import OperatorNode from "./OperatorNode.js";

export type MathNodeMethod1 =
    | typeof MathNode.RADIANS
    | typeof MathNode.DEGREES
    | typeof MathNode.EXP
    | typeof MathNode.EXP2
    | typeof MathNode.LOG
    | typeof MathNode.LOG2
    | typeof MathNode.SQRT
    | typeof MathNode.INVERSE_SQRT
    | typeof MathNode.FLOOR
    | typeof MathNode.CEIL
    | typeof MathNode.NORMALIZE
    | typeof MathNode.FRACT
    | typeof MathNode.SIN
    | typeof MathNode.COS
    | typeof MathNode.TAN
    | typeof MathNode.ASIN
    | typeof MathNode.ACOS
    | typeof MathNode.ATAN
    | typeof MathNode.ABS
    | typeof MathNode.SIGN
    | typeof MathNode.LENGTH
    | typeof MathNode.NEGATE
    | typeof MathNode.ONE_MINUS
    | typeof MathNode.DFDX
    | typeof MathNode.DFDY
    | typeof MathNode.ROUND
    | typeof MathNode.RECIPROCAL
    | typeof MathNode.TRUNC
    | typeof MathNode.FWIDTH
    | typeof MathNode.TRANSPOSE
    | typeof MathNode.DETERMINANT
    | typeof MathNode.INVERSE;

export type MathNodeMethod2 =
    | typeof MathNode.MIN
    | typeof MathNode.MAX
    | typeof MathNode.STEP
    | typeof MathNode.REFLECT
    | typeof MathNode.DISTANCE
    | typeof MathNode.DOT
    | typeof MathNode.CROSS
    | typeof MathNode.POW
    | typeof MathNode.TRANSFORM_DIRECTION;

export type MathNodeMethod3 =
    | typeof MathNode.MIX
    | typeof MathNode.CLAMP
    | typeof MathNode.REFRACT
    | typeof MathNode.SMOOTHSTEP
    | typeof MathNode.FACEFORWARD;

export type MathNodeMethod = MathNodeMethod1 | MathNodeMethod2 | MathNodeMethod3;

export default class MathNode extends TempNode {
    // 1 input

    static ALL: "all";
    static ANY: "any";
    static EQUALS: "equals";

    static RADIANS: "radians";
    static DEGREES: "degrees";
    static EXP: "exp";
    static EXP2: "exp2";
    static LOG: "log";
    static LOG2: "log2";
    static SQRT: "sqrt";
    static INVERSE_SQRT: "inversesqrt";
    static FLOOR: "floor";
    static CEIL: "ceil";
    static NORMALIZE: "normalize";
    static FRACT: "fract";
    static SIN: "sin";
    static COS: "cos";
    static TAN: "tan";
    static ASIN: "asin";
    static ACOS: "acos";
    static ATAN: "atan";
    static ABS: "abs";
    static SIGN: "sign";
    static LENGTH: "length";
    static NEGATE: "negate";
    static ONE_MINUS: "oneMinus";
    static DFDX: "dFdx";
    static DFDY: "dFdy";
    static ROUND: "round";
    static RECIPROCAL: "reciprocal";
    static TRUNC: "trunc";
    static FWIDTH: "fwidth";
    static TRANSPOSE: "transpose";
    static DETERMINANT: "determinant";
    static INVERSE: "inverse";

    // 2 inputs

    static MIN: "min";
    static MAX: "max";
    static STEP: "step";
    static REFLECT: "reflect";
    static DISTANCE: "distance";
    static DOT: "dot";
    static CROSS: "cross";
    static POW: "pow";
    static TRANSFORM_DIRECTION: "transformDirection";

    // 3 inputs

    static MIX: "mix";
    static CLAMP: "clamp";
    static REFRACT: "refract";
    static SMOOTHSTEP: "smoothstep";
    static FACEFORWARD: "faceforward";

    method: MathNodeMethod;
    aNode: Node;
    bNode: Node | null;
    cNode: Node | null;

    readonly isMathNode: true;

    constructor(method: MathNodeMethod1, aNode: Node);
    constructor(method: MathNodeMethod2, aNode: Node, bNode: Node);
    constructor(method: MathNodeMethod3, aNode: Node, bNode: Node, cNode: Node);
}

export const EPSILON: Node;
export const INFINITY: Node;
export const PI: Node;

/**
 * @deprecated Please use the non-deprecated version `TWO_PI`.
 */
export const PI2: Node;

export const TWO_PI: Node;

export const HALF_PI: Node;

type MathNodeParameter = Node | number;

type Unary = (a: MathNodeParameter) => MathNode;

export const all: Unary;
export const any: Unary;

/**
 * @deprecated "equals" is deprecated. Use "equal" inside a vector instead, like: "bvec*( equal( ... ) )"
 */
export const equals: Unary;

export const radians: Unary;
export const degrees: Unary;
export const exp: Unary;
export const exp2: Unary;
export const log: Unary;
export const log2: Unary;
export const sqrt: (e: Node<"float">) => Node<"float">;
export const inverseSqrt: Unary;
export const floor: Unary;
export const ceil: Unary;
export const normalize: (a: Node<"vec3">) => Node<"vec3">;
export const fract: Unary;
export const sin: (e: Node<"float"> | number) => Node<"float">;
export const cos: (e: Node<"float"> | number) => Node<"float">;
export const tan: (e: Node<"float"> | number) => Node<"float">;
export const asin: Unary;
export const acos: Unary;
export const atan: (a: MathNodeParameter, b?: MathNodeParameter) => MathNode;
export const abs: Unary;
export const sign: Unary;
export const length: (e: Node<"vec2"> | Node<"vec3"> | Node<"vec4">) => Node<"float">;
export const negate: Unary;
export const oneMinus: Unary;
export const dFdx: Unary;
export const dFdy: Unary;
export const round: Unary;
export const reciprocal: Unary;
export const trunc: Unary;
export const fwidth: Unary;
export const transpose: Unary;
export const determinant: (x: Node) => MathNode;
export const inverse: (x: Node) => MathNode;

type Binary = (a: MathNodeParameter, b: MathNodeParameter) => MathNode;

export const min: (
    x: Node<"float"> | number,
    y: Node<"float"> | number,
    ...values: (Node<"float"> | number)[]
) => Node<"float">;
export const max: (
    x: Node<"float"> | number,
    y: Node<"float"> | number,
    ...values: (Node<"float"> | number)[]
) => Node<"float">;

export const step: Binary;
export const reflect: Binary;
export const distance: Binary;
export const difference: Binary;

interface Dot {
    (e1: Node<"vec2">, e2: Node<"vec2">): Node<"vec2">;
    (e1: Node<"vec3">, e2: Node<"vec3">): Node<"vec3">;
    (e1: Node<"vec4">, e2: Node<"vec4">): Node<"vec4">;
}

export const dot: Dot;
export const cross: (x: Node, y: Node) => MathNode;
export const pow: (x: Node<"float"> | number, y: Node<"float"> | number) => Node<"float">;
export const pow2: Unary;
export const pow3: Unary;
export const pow4: Unary;
export const transformDirection: Binary;
export const cbrt: Unary;
export const lengthSq: Unary;

type Ternary = (a: MathNodeParameter, b: MathNodeParameter, c: MathNodeParameter) => MathNode;

export const mix: Ternary;
export const clamp: (
    a: MathNodeParameter,
    b?: MathNodeParameter,
    c?: MathNodeParameter,
) => MathNode;
export const saturate: Unary;

interface Refract {
    (e1: Node<"vec2">, e2: Node<"vec2">, e3: Node<"float">): Node<"vec2">;
    (e1: Node<"vec3">, e2: Node<"vec3">, e3: Node<"float">): Node<"vec3">;
    (e1: Node<"vec4">, e2: Node<"vec4">, e3: Node<"float">): Node<"vec4">;
}

export const refract: Refract;
export const smoothstep: Ternary;
export const faceForward: Ternary;

export const rand: (uv: MathNodeParameter) => OperatorNode;

export const mixElement: Ternary;
export const smoothstepElement: Ternary;
export const stepElement: Binary;

/**
 * @deprecated
 */
export const atan2: Binary;

// GLSL alias function

export const faceforward: typeof faceForward;
export const inversesqrt: typeof inverseSqrt;

interface MixFloat {
    (b: Node<"float"> | number, c: Node<"float"> | number): Node<"float">;
    (b: Node<"color"> | number, c: Node<"color"> | number): Node<"color">;
    (b: Node<"vec3"> | number, c: Node<"vec3"> | number): Node<"vec3">;
    (b: Node<"vec4"> | number, c: Node<"vec4"> | number): Node<"vec4">;
}

// Method chaining

declare module "../core/Node.js" {
    interface NodeElements {
        all: () => MathNode;
        allAssign: () => this;

        any: () => MathNode;
        anyAssign: () => this;

        /**
         * @deprecated "equals" is deprecated. Use "equal" inside a vector instead, like: "bvec*( equal( ... ) )"
         */
        equals: () => MathNode;
        /**
         * @deprecated "equals" is deprecated. Use "equal" inside a vector instead, like: "bvec*( equal( ... ) )"
         */
        equalsAssign: () => this;

        radians: () => MathNode;
        radiansAssign: () => this;

        degrees: () => MathNode;
        degreesAssign: () => this;

        exp: () => MathNode;
        expAssign: () => this;

        exp2: () => MathNode;
        exp2Assign: () => this;

        log: () => MathNode;
        logAssign: () => this;

        log2: () => MathNode;
        log2Assign: () => this;

        sqrt: () => MathNode;
        sqrtAssign: () => this;

        inverseSqrt: () => MathNode;
        inverseSqrtAssign: () => this;

        ceil: () => MathNode;
        ceilAssign: () => this;

        fract: () => MathNode;
        fractAssign: () => this;

        sin: () => MathNode;
        sinAssign: () => this;

        cos: () => MathNode;
        cosAssign: () => this;

        tan: () => MathNode;
        tanAssign: () => this;

        asin: () => MathNode;
        asinAssign: () => this;

        acos: () => MathNode;
        acosAssign: () => this;

        atan: (b?: MathNodeParameter) => MathNode;
        atanAssign: (b?: MathNodeParameter) => this;

        abs: () => MathNode;
        absAssign: () => this;

        sign: () => MathNode;
        signAssign: () => this;

        dFdx: () => MathNode;
        dFdxAssign: () => this;

        dFdy: () => MathNode;
        dFdyAssign: () => this;

        round: () => MathNode;
        roundAssign: () => this;

        reciprocal: () => MathNode;
        reciprocalAssign: () => this;

        trunc: () => MathNode;
        truncAssign: () => this;

        fwidth: () => MathNode;
        fwidthAssign: () => this;

        /**
         * @deprecated
         */
        atan2: (b: MathNodeParameter) => MathNode;
        /**
         * @deprecated
         */
        atan2Assign: (b: MathNodeParameter) => this;

        step: (b: MathNodeParameter) => MathNode;
        stepAssign: (b: MathNodeParameter) => this;

        reflect: (b: MathNodeParameter) => MathNode;
        reflectAssign: (b: MathNodeParameter) => this;

        dot: (b: MathNodeParameter) => MathNode;
        dotAssign: (b: MathNodeParameter) => this;

        cross: (y: Node) => MathNode;
        crossAssign: (y: Node) => this;

        pow2: () => MathNode;
        pow2Assign: () => this;

        pow3: () => MathNode;
        pow3Assign: () => this;

        pow4: () => MathNode;
        pow4Assign: () => this;

        transformDirection: (b: MathNodeParameter) => MathNode;
        transformDirectionAssign: (b: MathNodeParameter) => this;

        refract: (b: MathNodeParameter, c: MathNodeParameter) => MathNode;
        refractAssign: (b: MathNodeParameter, c: MathNodeParameter) => this;

        faceForward: (b: MathNodeParameter, c: MathNodeParameter) => MathNode;
        faceForwardAssign: (b: MathNodeParameter, c: MathNodeParameter) => this;

        difference: (b: MathNodeParameter) => MathNode;
        differenceAssign: (b: MathNodeParameter) => this;

        cbrt: () => MathNode;
        cbrtAssign: () => this;

        transpose: () => MathNode;
        transposeAssign: () => this;

        determinant: () => MathNode;
        determinantAssign: () => this;

        inverse: () => MathNode;
        inverseAssign: () => this;

        rand: () => OperatorNode;
        randAssign: () => this;
    }

    interface FloatExtensions {
        oneMinus: () => Node<"float">;
        oneMinusAssign: () => this;

        pow: (b: Node<"float"> | number) => Node<"float">;
        powAssign: (b: Node<"float"> | number) => this;

        mix: MixFloat;
        mixAssign: (b: Node<"color">, c: Node<"color">) => this;

        clamp: (b?: Node<"float"> | number, c?: Node<"float"> | number) => Node<"float">;
        clampAssign: (b?: Node<"float"> | number, c?: Node<"float"> | number) => this;

        floor: () => Node<"float">;
        floorAssign: () => this;

        distance: (b: Node<"float"> | number) => Node<"float">;
        distanceAssign: (b: Node<"float">) => this;

        smoothstep: (b: Node<"float"> | number, c: Node<"float"> | number) => Node<"float">;
        smoothstepAssign: (b: Node<"float"> | number, c: Node<"float"> | number) => this;

        saturate: () => Node<"float">;
        saturateAssign: () => this;

        min: (
            y: Node<"float"> | number,
            ...values: (Node<"float"> | number)[]
        ) => Node<"float">;
        minAssign: (
            y: Node<"float"> | number,
            ...values: (Node<"float"> | number)[]
        ) => this;

        max: (
            y: Node<"float"> | number,
            ...values: (Node<"float"> | number)[]
        ) => Node<"float">;
        maxAssign: (
            y: Node<"float"> | number,
            ...values: (Node<"float"> | number)[]
        ) => this;
    }

    interface VectorExtensions<TValue> {
        distance: (b: Node<TValue> | number) => Node<"float">;
        distanceAssign: (b: Node<TValue>) => this;

        normalize: () => Node<TValue>;
        normalizeAssign: () => this;

        negate: () => Node<TValue>;
        negateAssign: () => this;

        clamp: (b?: Node<TValue>, c?: Node<TValue>) => Node<TValue>;
        clampAssign: (b?: Node<TValue>, c?: Node<TValue>) => this;

        oneMinus: () => Node<TValue>;
        oneMinusAssign: () => this;

        floor: () => Node<TValue>;
        floorAssign: () => this;

        length: () => MathNode;
        lengthAssign: () => this;

        lengthSq: () => MathNode;
        lengthSqAssign: () => this;
    }
}
