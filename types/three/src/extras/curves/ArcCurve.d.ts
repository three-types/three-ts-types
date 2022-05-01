import { EllipseCurve } from './EllipseCurve';
export class ArcCurve extends EllipseCurve {
    constructor(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean);

    /**
     * @default 'ArcCurve'
     */
    type: string;
}

export interface ArcCurveConstructor {
    new (
        aX: number,
        aY: number,
        aRadius: number,
        aStartAngle: number,
        aEndAngle: number,
        aClockwise: boolean,
    ): ArcCurve;
    prototype: ArcCurve;
}
