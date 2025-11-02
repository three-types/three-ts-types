import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";

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

export const EPSILON: unknown;
export const INFINITY: unknown;
export const PI: unknown;

/**
 * @deprecated Please use the non-deprecated version `TWO_PI`.
 */
export const PI2: unknown;

export const TWO_PI: unknown;

export const HALF_PI: unknown;

export const all: unknown;
export const any: unknown;

/**
 * @deprecated "equals" is deprecated. Use "equal" inside a vector instead, like: "bvec*( equal( ... ) )"
 */
export const equals: unknown;

export const radians: unknown;
export const degrees: unknown;
export const exp: unknown;
export const exp2: unknown;
export const log: unknown;
export const log2: unknown;
export const sqrt: unknown;
export const inverseSqrt: unknown;
export const floor: unknown;
export const ceil: unknown;
export const normalize: unknown;

export const fract: unknown;

export const sin: unknown;
export const cos: unknown;
export const tan: unknown;
export const asin: unknown;
export const acos: unknown;
export const atan: unknown;

export const abs: unknown;

export const sign: unknown;
export const length: unknown;
export const negate: unknown;
export const oneMinus: unknown;
export const dFdx: unknown;
export const dFdy: unknown;
export const round: unknown;
export const reciprocal: unknown;
export const trunc: unknown;

export const fwidth: unknown;
export const transpose: unknown;
export const determinant: unknown;
export const inverse: unknown;

export const min: unknown;
export const max: unknown;

export const step: unknown;
export const reflect: unknown;

export const distance: unknown;

export const difference: unknown;

export const dot: unknown;
export const cross: unknown;
export const pow: unknown;
export const pow2: unknown;
export const pow3: unknown;
export const pow4: unknown;
export const transformDirection: unknown;
export const cbrt: unknown;
export const lengthSq: unknown;

export const mix: unknown;
export const clamp: unknown;
export const saturate: unknown;

export const refract: unknown;
export const smoothstep: unknown;
export const faceForward: unknown;

export const rand: unknown;

export const mixElement: unknown;
export const smoothstepElement: unknown;
export const stepElement: unknown;

/**
 * @deprecated
 */
export const atan2: unknown;

// GLSL alias function

export const faceforward: typeof faceForward;
export const inversesqrt: typeof inverseSqrt;

// Method chaining
