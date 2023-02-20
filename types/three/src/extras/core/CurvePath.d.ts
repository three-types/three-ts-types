import { Curve } from './Curve.js';
import { Vector } from './../../math/Vector2.js';

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
