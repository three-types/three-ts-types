import { Curve, Vector3 } from '../../../src/Three';

export class GrannyKnot extends Curve<Vector3> {
    constructor();
}

export interface GrannyKnotConstructor {
    new (): GrannyKnot;
    prototype: GrannyKnot;
}

export class HeartCurve extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface HeartCurveConstructor {
    new (scale?: number): HeartCurve;
    prototype: HeartCurve;
}

export class VivianiCurve extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface VivianiCurveConstructor {
    new (scale?: number): VivianiCurve;
    prototype: VivianiCurve;
}

export class KnotCurve extends Curve<Vector3> {
    constructor();
}

export interface KnotCurveConstructor {
    new (): KnotCurve;
    prototype: KnotCurve;
}

export class HelixCurve extends Curve<Vector3> {
    constructor();
}

export interface HelixCurveConstructor {
    new (): HelixCurve;
    prototype: HelixCurve;
}

export class TrefoilKnot extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface TrefoilKnotConstructor {
    new (scale?: number): TrefoilKnot;
    prototype: TrefoilKnot;
}

export class TorusKnot extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface TorusKnotConstructor {
    new (scale?: number): TorusKnot;
    prototype: TorusKnot;
}

export class CinquefoilKnot extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface CinquefoilKnotConstructor {
    new (scale?: number): CinquefoilKnot;
    prototype: CinquefoilKnot;
}

export class TrefoilPolynomialKnot extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface TrefoilPolynomialKnotConstructor {
    new (scale?: number): TrefoilPolynomialKnot;
    prototype: TrefoilPolynomialKnot;
}

export class FigureEightPolynomialKnot extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface FigureEightPolynomialKnotConstructor {
    new (scale?: number): FigureEightPolynomialKnot;
    prototype: FigureEightPolynomialKnot;
}

export class DecoratedTorusKnot4a extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface DecoratedTorusKnot4aConstructor {
    new (scale?: number): DecoratedTorusKnot4a;
    prototype: DecoratedTorusKnot4a;
}

export class DecoratedTorusKnot4b extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface DecoratedTorusKnot4bConstructor {
    new (scale?: number): DecoratedTorusKnot4b;
    prototype: DecoratedTorusKnot4b;
}

export class DecoratedTorusKnot5a extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface DecoratedTorusKnot5aConstructor {
    new (scale?: number): DecoratedTorusKnot5a;
    prototype: DecoratedTorusKnot5a;
}

export class DecoratedTorusKnot5c extends Curve<Vector3> {
    constructor(scale?: number);
    scale: number;
}

export interface DecoratedTorusKnot5cConstructor {
    new (scale?: number): DecoratedTorusKnot5c;
    prototype: DecoratedTorusKnot5c;
}
