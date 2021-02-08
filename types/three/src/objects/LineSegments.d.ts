import { Material } from './../materials/Material';
import { Line } from './Line';
import { BufferGeometry } from '../core/BufferGeometry';

/**
 * @deprecated
 */
export const LineStrip: number;
/**
 * @deprecated
 */
export const LinePieces: number;

export class LineSegments<
    Geom extends BufferGeometry = BufferGeometry,
    Mat extends Material | Material[] = Material
> extends Line {
    constructor(geometry?: Geom, material?: Mat);

    /**
     * @default 'LineSegments'
     */
    type: 'LineSegments' | string;
    readonly isLineSegments: true;
}
