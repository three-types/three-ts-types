import { BufferGeometry, Euler, Mesh, Vector3 } from '../../../src/Three';

export class DecalGeometry extends BufferGeometry {
    constructor(mesh: Mesh, position: Vector3, orientation: Euler, size: Vector3);
}

export interface DecalGeometryConstructor {
    new (mesh: Mesh, position: Vector3, orientation: Euler, size: Vector3): DecalGeometry;
    prototype: DecalGeometry;
}

export class DecalVertex {
    constructor(position: Vector3, normal: Vector3);
    clone(): this;
}

export interface DecalVertexConstructor {
    new (position: Vector3, normal: Vector3): DecalVertex;
    prototype: DecalVertex;
}
