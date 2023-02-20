import { EllipseCurve } from './EllipseCurve.js';
export class ArcCurve extends EllipseCurve {
    constructor(aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aClockwise: boolean);

    /**
     * @default 'ArcCurve'
     */
    type: string;
}
