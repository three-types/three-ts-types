import { Curve, CurveJSON } from './Curve';
import { Vector } from './../../math/Vector2';

export interface CurvePathJSON<Type extends string = "CurvePath"> extends CurveJSON<Type> {

    autoClose: boolean;

    curves: CurveJSON[];
}

export class CurvePath<T extends Vector> extends Curve<T> {
    constructor();

    /**
     * @default 'CurvePath'
     */
    type: string;

    /**
     * @default []
     */
    curves: Array<Curve<T>>;

    /**
     * @default false
     */
    autoClose: boolean;

    add(curve: Curve<T>): void;
    closePath(): void;
    getPoint(t: number, optionalTarget?: T): T;
    getCurveLengths(): number[];
}
