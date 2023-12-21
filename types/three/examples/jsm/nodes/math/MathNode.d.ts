import Node from '../core/Node.js';
import TempNode from '../core/TempNode.js';
import { NodeRepresentation, ShaderNodeObject } from '../shadernode/ShaderNode.js';

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
    | typeof MathNode.ROUND;

export type MathNodeMethod2 =
    | typeof MathNode.ATAN2
    | typeof MathNode.MIN
    | typeof MathNode.MAX
    | typeof MathNode.MOD
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

    static RADIANS: 'radians';
    static DEGREES: 'degrees';
    static EXP: 'exp';
    static EXP2: 'exp2';
    static LOG: 'log';
    static LOG2: 'log2';
    static SQRT: 'sqrt';
    static INVERSE_SQRT: 'inversesqrt';
    static FLOOR: 'floor';
    static CEIL: 'ceil';
    static NORMALIZE: 'normalize';
    static FRACT: 'fract';
    static SIN: 'sin';
    static COS: 'cos';
    static TAN: 'tan';
    static ASIN: 'asin';
    static ACOS: 'acos';
    static ATAN: 'atan';
    static ABS: 'abs';
    static SIGN: 'sign';
    static LENGTH: 'length';
    static NEGATE: 'negate';
    static ONE_MINUS: 'oneMinus';
    static DFDX: 'dFdx';
    static DFDY: 'dFdy';
    static ROUND: 'round';
    static RECIPROCAL: 'reciprocal';

    // 2 inputs

    static ATAN2: 'atan2';
    static MIN: 'min';
    static MAX: 'max';
    static MOD: 'mod';
    static STEP: 'step';
    static REFLECT: 'reflect';
    static DISTANCE: 'distance';
    static DOT: 'dot';
    static CROSS: 'cross';
    static POW: 'pow';
    static TRANSFORM_DIRECTION: 'transformDirection';

    // 3 inputs

    static MIX: 'mix';
    static CLAMP: 'clamp';
    static REFRACT: 'refract';
    static SMOOTHSTEP: 'smoothstep';
    static FACEFORWARD: 'faceforward';

    method: MathNodeMethod;
    aNode: Node;
    bNode: Node | null;
    cNode: Node | null;

    constructor(method: MathNodeMethod1, aNode: Node);
    constructor(method: MathNodeMethod2, aNode: Node, bNode: Node);
    constructor(method: MathNodeMethod3, aNode: Node, bNode: Node, cNode: Node);
}

export const EPSILON: ShaderNodeObject<Node>;
export const INFINITY: ShaderNodeObject<Node>;

export type Unary = (a: NodeRepresentation) => ShaderNodeObject<MathNode>;

export const radians: Unary;
export const degrees: Unary;
export const exp: Unary;
export const exp2: Unary;
export const log: Unary;
export const log2: Unary;
export const sqrt: Unary;
export const inversesqrt: Unary;
export const floor: Unary;
export const ceil: Unary;
export const normalize: Unary;
export const fract: Unary;
export const sin: Unary;
export const cos: Unary;
export const tan: Unary;
export const asin: Unary;
export const acos: Unary;
export const atan: Unary;
export const abs: Unary;
export const sign: Unary;
export const length: Unary;
export const negate: Unary;
export const invert: Unary;
export const dFdx: Unary;
export const dFdy: Unary;
export const round: Unary;
export const reciprocal: Unary;

export type Binary = (a: NodeRepresentation, b: NodeRepresentation) => ShaderNodeObject<MathNode>;

export const atan2: Binary;
export const min: Binary;
export const max: Binary;
export const mod: Binary;
export const step: Binary;
export const reflect: Binary;
export const distance: Binary;
export const difference: Binary;
export const dot: Binary;
export const cross: Binary;
export const pow: Binary;
export const pow2: Binary;
export const pow3: Binary;
export const pow4: Binary;
export const transformDirection: Binary;

export type Ternary = (
    a: NodeRepresentation,
    b: NodeRepresentation,
    c: NodeRepresentation,
) => ShaderNodeObject<MathNode>;

export const mix: Ternary;
export const clamp: Ternary;
export const refract: Ternary;
export const smoothstep: Ternary;
export const faceforward: Ternary;
