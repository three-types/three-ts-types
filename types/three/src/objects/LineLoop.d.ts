import { Line } from './Line';
import { Material } from './../materials/Material';
import { BufferGeometry } from '../core/BufferGeometry';

export class LineLoop<
    Geom extends BufferGeometry = BufferGeometry,
    Mat extends Material | Material[] = Material
> extends Line {
    constructor(geometry?: Geom, material?: Mat);

    type: 'LineLoop';
    readonly isLineLoop: true;
}
