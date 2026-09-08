/**
 * Interpolant that evaluates to the sample value at the position preceding
 * the parameter.
 *
 * @augments Interpolant
 */
export class DiscreteInterpolant extends Interpolant {
    interpolate_(i1: any): TypedArray;
}
import { Interpolant } from '../Interpolant.js';
