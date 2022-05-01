import { BufferGeometry, Vector3 } from '../../../src/Three';

export class ConvexGeometry extends BufferGeometry {
    constructor(points?: Vector3[]);
}

export interface ConvexGeometryConstructor {
    new (points?: Vector3[]): ConvexGeometry;
    prototype: ConvexGeometry;
}
