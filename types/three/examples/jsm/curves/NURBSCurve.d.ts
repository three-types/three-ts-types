import { Curve, Vector2, Vector3, Vector4 } from '../../../src/Three';

export class NURBSCurve extends Curve<Vector3> {
    constructor(
        degree: number,
        knots: number[],
        controlPoints: Vector2[] | Vector3[] | Vector4[],
        startKnot: number,
        endKnot: number,
    );
}

export interface NURBSCurveConstructor {
    new (
        degree: number,
        knots: number[],
        controlPoints: Vector2[] | Vector3[] | Vector4[],
        startKnot: number,
        endKnot: number,
    ): NURBSCurve;
    prototype: NURBSCurve;
}
