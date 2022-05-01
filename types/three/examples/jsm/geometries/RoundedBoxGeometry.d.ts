import { BoxGeometry } from '../../../src/Three';

export class RoundedBoxGeometry extends BoxGeometry {
    constructor(width?: number, height?: number, depth?: number, segments?: number, radius?: number);
}

export interface RoundedBoxGeometryConstructor {
    new (width?: number, height?: number, depth?: number, segments?: number, radius?: number): RoundedBoxGeometry;
    prototype: RoundedBoxGeometry;
}
