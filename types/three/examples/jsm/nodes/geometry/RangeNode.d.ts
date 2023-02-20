import { Color, Vector2, Vector3, Vector4 } from '../../../../src/Three.js';
import Node from '../core/Node.js';

export type RangeModeBound = number | Color | Vector2 | Vector3 | Vector4;

export default class RangeNode extends Node {
    min: RangeModeBound;
    max: RangeModeBound;

    constructor(min: RangeModeBound, max: RangeModeBound);
    getVectorLength(): number;
}
