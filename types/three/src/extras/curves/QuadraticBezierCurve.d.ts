import { Vector2 } from './../../math/Vector2.js';
import { Curve } from './../core/Curve.js';

export class QuadraticBezierCurve extends Curve<Vector2> {
    constructor(v0: Vector2, v1: Vector2, v2: Vector2);

    /**
     * @default 'QuadraticBezierCurve'
     */
    type: string;

    /**
     * @default new THREE.Vector2()
     */
    v0: Vector2;

    /**
     * @default new THREE.Vector2()
     */
    v1: Vector2;

    /**
     * @default new THREE.Vector2()
     */
    v2: Vector2;
}
