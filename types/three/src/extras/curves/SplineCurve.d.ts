import { Vector2 } from './../../math/Vector2.js';
import { Curve } from './../core/Curve.js';

export class SplineCurve extends Curve<Vector2> {
    constructor(points?: Vector2[]);

    /**
     * @default 'SplineCurve'
     */
    type: string;

    /**
     * @default []
     */
    points: Vector2[];
}
