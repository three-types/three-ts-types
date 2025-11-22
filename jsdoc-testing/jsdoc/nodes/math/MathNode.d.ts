export default MathNode;
/**
 * A small value used to handle floating-point precision errors.
 *
 * @tsl
 * @type {Node<float>}
 */
export const EPSILON: Node<any>;
/**
 * Represents infinity.
 *
 * @tsl
 * @type {Node<float>}
 */
export const INFINITY: Node<any>;
/**
 * Represents PI.
 *
 * @tsl
 * @type {Node<float>}
 */
export const PI: Node<any>;
/**
 * Represents PI * 2. Please use the non-deprecated version `TWO_PI`.
 *
 * @tsl
 * @deprecated
 * @type {Node<float>}
 */
export const PI2: Node<any>;
/**
 * Represents PI * 2.
 *
 * @tsl
 * @type {Node<float>}
 */
export const TWO_PI: Node<any>;
/**
 * Represents PI / 2.
 *
 * @tsl
 * @type {Node<float>}
 */
export const HALF_PI: Node<any>;
/**
 * Returns `true` if all components of `x` are `true`.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node<bool>}
 */
export const all: any;
/**
 * Returns `true` if any components of `x` are `true`.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node<bool>}
 */
export const any: any;
/**
 * Converts a quantity in degrees to radians.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input in degrees.
 * @returns {Node}
 */
export const radians: any;
/**
 * Convert a quantity in radians to degrees.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input in radians.
 * @returns {Node}
 */
export const degrees: any;
/**
 * Returns the natural exponentiation of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const exp: any;
/**
 * Returns 2 raised to the power of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const exp2: any;
/**
 * Returns the natural logarithm of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const log: any;
/**
 * Returns the base 2 logarithm of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const log2: any;
/**
 * Returns the square root of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sqrt: any;
/**
 * Returns the inverse of the square root of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const inverseSqrt: any;
/**
 * Finds the nearest integer less than or equal to the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const floor: any;
/**
 * Finds the nearest integer that is greater than or equal to the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const ceil: any;
/**
 * Calculates the unit vector in the same direction as the original vector.
 *
 * @tsl
 * @function
 * @param {Node} x - The input vector.
 * @returns {Node}
 */
export const normalize: any;
/**
 * Computes the fractional part of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const fract: any;
/**
 * Returns the sine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sin: any;
/**
 * Returns the cosine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const cos: any;
/**
 * Returns the tangent of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const tan: any;
/**
 * Returns the arcsine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const asin: any;
/**
 * Returns the arccosine of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const acos: any;
/**
 * Returns the arc-tangent of the parameter.
 * If two parameters are provided, the result is `atan2(y/x)`.
 *
 * @tsl
 * @function
 * @param {Node | number} y - The y parameter.
 * @param {?(Node | number)} x - The x parameter.
 * @returns {Node}
 */
export const atan: any;
/**
 * Returns the absolute value of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const abs: any;
/**
 * Extracts the sign of the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const sign: any;
/**
 * Calculates the length of a vector.
 *
 * @tsl
 * @function
 * @param {Node} x - The parameter.
 * @returns {Node<float>}
 */
export const length: any;
/**
 * Negates the value of the parameter (-x).
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const negate: any;
/**
 * Return `1` minus the parameter.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const oneMinus: any;
/**
 * Returns the partial derivative of the parameter with respect to x.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const dFdx: any;
/**
 * Returns the partial derivative of the parameter with respect to y.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const dFdy: any;
/**
 * Rounds the parameter to the nearest integer.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const round: any;
/**
 * Returns the reciprocal of the parameter `(1/x)`.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const reciprocal: any;
/**
 * Truncates the parameter, removing the fractional part.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const trunc: any;
/**
 * Returns the sum of the absolute derivatives in x and y.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @returns {Node}
 */
export const fwidth: any;
/**
 * Returns the transpose of a matrix.
 *
 * @tsl
 * @function
 * @param {Node<mat2|mat3|mat4>} x - The parameter.
 * @returns {Node}
 */
export const transpose: any;
/**
 * Returns the determinant of a matrix.
 *
 * @tsl
 * @function
 * @param {Node<mat2|mat3|mat4>} x - The parameter.
 * @returns {Node<float>}
 */
export const determinant: any;
/**
 * Returns the inverse of a matrix.
 *
 * @tsl
 * @function
 * @param {Node<mat2|mat3|mat4>} x - The parameter.
 * @returns {Node<mat2|mat3|mat4>}
 */
export const inverse: any;
export function equals(x: Node | number, y: Node | number): Node<bool>;
/**
 * Returns the least of the given values.
 *
 * @tsl
 * @function
 * @param {...(Node | number)} values - The values to compare.
 * @returns {Node}
 */
export const min: any;
/**
 * Returns the greatest of the given values.
 *
 * @tsl
 * @function
 * @param {...(Node | number)} values - The values to compare.
 * @returns {Node}
 */
export const max: any;
/**
 * Generate a step function by comparing two values.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The y parameter.
 * @param {Node | number} y - The x parameter.
 * @returns {Node}
 */
export const step: any;
/**
 * Calculates the reflection direction for an incident vector.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} I - The incident vector.
 * @param {Node<vec2|vec3|vec4>} N - The normal vector.
 * @returns {Node<vec2|vec3|vec4>}
 */
export const reflect: any;
/**
 * Calculates the distance between two points.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} x - The first point.
 * @param {Node<vec2|vec3|vec4>} y - The second point.
 * @returns {Node<float>}
 */
export const distance: any;
/**
 * Calculates the absolute difference between two values.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @param {Node | number} y - The second parameter.
 * @returns {Node}
 */
export const difference: any;
/**
 * Calculates the dot product of two vectors.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} x - The first vector.
 * @param {Node<vec2|vec3|vec4>} y - The second vector.
 * @returns {Node<float>}
 */
export const dot: any;
/**
 * Calculates the cross product of two vectors.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3>} x - The first vector.
 * @param {Node<vec2|vec3>} y - The second vector.
 * @returns {Node<float|vec3>}
 */
export const cross: any;
/**
 * Return the value of the first parameter raised to the power of the second one.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The first parameter.
 * @param {Node | number} y - The second parameter.
 * @returns {Node}
 */
export const pow: any;
export function pow2(x: Node | number): Node;
export function pow3(x: Node | number): Node;
export function pow4(x: Node | number): Node;
/**
 * Transforms the direction of a vector by a matrix and then normalizes the result.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} direction - The direction vector.
 * @param {Node<mat2|mat3|mat4>} matrix - The transformation matrix.
 * @returns {Node}
 */
export const transformDirection: any;
export function cbrt(a: Node | number): Node;
export function lengthSq(a: Node<any | any | any>): Node<any>;
/**
 * Linearly interpolates between two values.
 *
 * @tsl
 * @function
 * @param {Node | number} a - The first parameter.
 * @param {Node | number} b - The second parameter.
 * @param {Node | number} t - The interpolation value.
 * @returns {Node}
 */
export const mix: any;
export function clamp(value: Node | number, low?: Node | number, high?: Node | number): Node;
export function saturate(value: Node | number): Node;
/**
 * Calculates the refraction direction for an incident vector.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} I - The incident vector.
 * @param {Node<vec2|vec3|vec4>} N - The normal vector.
 * @param {Node<float>} eta - The ratio of indices of refraction.
 * @returns {Node<vec2|vec3|vec4>}
 */
export const refract: any;
/**
 * Performs a Hermite interpolation between two values.
 *
 * @tsl
 * @function
 * @param {Node | number} low - The value of the lower edge of the Hermite function.
 * @param {Node | number} high - The value of the upper edge of the Hermite function.
 * @param {Node | number} x - The source value for interpolation.
 * @returns {Node}
 */
export const smoothstep: any;
/**
 * Returns a vector pointing in the same direction as another.
 *
 * @tsl
 * @function
 * @param {Node<vec2|vec3|vec4>} N - The vector to orient.
 * @param {Node<vec2|vec3|vec4>} I - The incident vector.
 * @param {Node<vec2|vec3|vec4>} Nref - The reference vector.
 * @returns {Node<vec2|vec3|vec4>}
 */
export const faceForward: any;
/**
 * Returns a random value for the given uv.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} uv - The uv node.
 * @returns {Node<float>}
 */
export const rand: () => void;
export function mixElement(t: Node | number, e1: Node | number, e2: Node | number): Node;
export function smoothstepElement(x: Node | number, low: Node | number, high: Node | number): Node;
export function stepElement(x: Node | number, edge: Node | number): Node;
export function atan2(y: Node | number, x: Node | number): Node;
export const faceforward: any;
export const inversesqrt: any;
/**
 * This node represents a variety of mathematical methods available in shaders.
 * They are divided into three categories:
 *
 * - Methods with one input like `sin`, `cos` or `normalize`.
 * - Methods with two inputs like `dot`, `cross` or `pow`.
 * - Methods with three inputs like `mix`, `clamp` or `smoothstep`.
 *
 * @augments TempNode
 */
declare class MathNode extends TempNode {
    /**
     * Constructs a new math node.
     *
     * @param {string} method - The method name.
     * @param {Node} aNode - The first input.
     * @param {?Node} [bNode=null] - The second input.
     * @param {?Node} [cNode=null] - The third input.
     */
    constructor(method: string, aNode: Node, bNode?: Node | null, cNode?: Node | null, ...args: any[]);
    /**
     * The method name.
     *
     * @type {string}
     */
    method: string;
    /**
     * The first input.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The second input.
     *
     * @type {?Node}
     * @default null
     */
    bNode: Node | null;
    /**
     * The third input.
     *
     * @type {?Node}
     * @default null
     */
    cNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMathNode: boolean;
    /**
     * The input type is inferred from the node types of the input nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(builder: NodeBuilder): string;
    setup(builder: any): any;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
declare namespace MathNode {
    let ALL: string;
    let ANY: string;
    let RADIANS: string;
    let DEGREES: string;
    let EXP: string;
    let EXP2: string;
    let LOG: string;
    let LOG2: string;
    let SQRT: string;
    let INVERSE_SQRT: string;
    let FLOOR: string;
    let CEIL: string;
    let NORMALIZE: string;
    let FRACT: string;
    let SIN: string;
    let COS: string;
    let TAN: string;
    let ASIN: string;
    let ACOS: string;
    let ATAN: string;
    let ABS: string;
    let SIGN: string;
    let LENGTH: string;
    let NEGATE: string;
    let ONE_MINUS: string;
    let DFDX: string;
    let DFDY: string;
    let ROUND: string;
    let RECIPROCAL: string;
    let TRUNC: string;
    let FWIDTH: string;
    let TRANSPOSE: string;
    let DETERMINANT: string;
    let INVERSE: string;
    let EQUALS: string;
    let MIN: string;
    let MAX: string;
    let STEP: string;
    let REFLECT: string;
    let DISTANCE: string;
    let DIFFERENCE: string;
    let DOT: string;
    let CROSS: string;
    let POW: string;
    let TRANSFORM_DIRECTION: string;
    let MIX: string;
    let CLAMP: string;
    let REFRACT: string;
    let SMOOTHSTEP: string;
    let FACEFORWARD: string;
}
import TempNode from '../core/TempNode.js';
