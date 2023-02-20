import { Material } from './../materials/Material.js';
import { Line } from './Line.js';
import { BufferGeometry } from '../core/BufferGeometry.js';

/**
 * @deprecated
 */
export const LineStrip: number;
/**
 * @deprecated
 */
export const LinePieces: number;

export class LineSegments<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Line<TGeometry, TMaterial> {
    constructor(geometry?: TGeometry, material?: TMaterial);

    /**
     * @default 'LineSegments'
     */
    type: 'LineSegments' | string;
    readonly isLineSegments: true;
}
