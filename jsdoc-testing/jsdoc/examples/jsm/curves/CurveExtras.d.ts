/**
 * A bunch of parametric curves
 *
 * Formulas collected from various sources
 * http://mathworld.wolfram.com/HeartCurve.html
 * http://en.wikipedia.org/wiki/Viviani%27s_curve
 * http://www.mi.sanu.ac.rs/vismath/taylorapril2011/Taylor.pdf
 * https://prideout.net/blog/old/blog/index.html@p=44.html
 */
/**
 * A Granny Knot curve.
 *
 * @augments Curve
 * @three_import import { GrannyKnot } from 'three/addons/curves/CurveExtras.js';
 */
export class GrannyKnot extends Curve {
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A heart curve.
 *
 * @augments Curve
 * @three_import import { HeartCurve } from 'three/addons/curves/CurveExtras.js';
 */
export class HeartCurve extends Curve {
    /**
     * Constructs a new heart curve.
     *
     * @param {number} [scale=5] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 5
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Viviani curve.
 *
 * @augments Curve
 * @three_import import { VivianiCurve } from 'three/addons/curves/CurveExtras.js';
 */
export class VivianiCurve extends Curve {
    /**
     * Constructs a new Viviani curve.
     *
     * @param {number} [scale=70] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 70
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A knot curve.
 *
 * @augments Curve
 * @three_import import { KnotCurve } from 'three/addons/curves/CurveExtras.js';
 */
export class KnotCurve extends Curve {
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A helix curve.
 *
 * @augments Curve
 * @three_import import { HelixCurve } from 'three/addons/curves/CurveExtras.js';
 */
export class HelixCurve extends Curve {
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Trefoil Knot.
 *
 * @augments Curve
 * @three_import import { TrefoilKnot } from 'three/addons/curves/CurveExtras.js';
 */
export class TrefoilKnot extends Curve {
    /**
     * Constructs a new Trefoil Knot.
     *
     * @param {number} [scale=10] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 10
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A torus knot.
 *
 * @augments Curve
 * @three_import import { TorusKnot } from 'three/addons/curves/CurveExtras.js';
 */
export class TorusKnot extends Curve {
    /**
     * Constructs a new torus knot.
     *
     * @param {number} [scale=10] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 10
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Cinquefoil Knot.
 *
 * @augments Curve
 * @three_import import { CinquefoilKnot } from 'three/addons/curves/CurveExtras.js';
 */
export class CinquefoilKnot extends Curve {
    /**
     * Constructs a new Cinquefoil Knot.
     *
     * @param {number} [scale=10] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 10
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Trefoil Polynomial Knot.
 *
 * @augments Curve
 * @three_import import { TrefoilPolynomialKnot } from 'three/addons/curves/CurveExtras.js';
 */
export class TrefoilPolynomialKnot extends Curve {
    /**
     * Constructs a new Trefoil Polynomial Knot.
     *
     * @param {number} [scale=10] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 10
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Figure Eight Polynomial Knot.
 *
 * @augments Curve
 * @three_import import { FigureEightPolynomialKnot } from 'three/addons/curves/CurveExtras.js';
 */
export class FigureEightPolynomialKnot extends Curve {
    /**
     * Constructs a new Figure Eight Polynomial Knot.
     *
     * @param {number} [scale=1] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 1
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Decorated Torus Knot 4a.
 *
 * @augments Curve
 * @three_import import { DecoratedTorusKnot4a } from 'three/addons/curves/CurveExtras.js';
 */
export class DecoratedTorusKnot4a extends Curve {
    /**
     * Constructs a new Decorated Torus Knot 4a.
     *
     * @param {number} [scale=1] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 40
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Decorated Torus Knot 4b.
 *
 * @augments Curve
 * @three_import import { DecoratedTorusKnot4b } from 'three/addons/curves/CurveExtras.js';
 */
export class DecoratedTorusKnot4b extends Curve {
    /**
     * Constructs a new Decorated Torus Knot 4b.
     *
     * @param {number} [scale=1] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 40
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Decorated Torus Knot 5a.
 *
 * @augments Curve
 * @three_import import { DecoratedTorusKnot5a } from 'three/addons/curves/CurveExtras.js';
 */
export class DecoratedTorusKnot5a extends Curve {
    /**
     * Constructs a new Decorated Torus Knot 5a.
     *
     * @param {number} [scale=1] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 40
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
/**
 * A Decorated Torus Knot 5c.
 *
 * @augments Curve
 * @three_import import { DecoratedTorusKnot5c } from 'three/addons/curves/CurveExtras.js';
 */
export class DecoratedTorusKnot5c extends Curve {
    /**
     * Constructs a new Decorated Torus Knot 5c.
     *
     * @param {number} [scale=1] - The curve's scale.
     */
    constructor(scale?: number);
    /**
     * The curve's scale.
     *
     * @type {number}
     * @default 40
     */
    scale: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
}
import { Curve } from 'three';
import { Vector3 } from 'three';
