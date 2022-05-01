import { BufferGeometry, Curve, Mesh, Vector3 } from '../../../src/Three';

export class RollerCoasterGeometry extends BufferGeometry {
    constructor(curve: Curve<Vector3>, divisions: number);
}

export interface RollerCoasterGeometryConstructor {
    new (curve: Curve<Vector3>, divisions: number): RollerCoasterGeometry;
    prototype: RollerCoasterGeometry;
}

export class RollerCoasterLiftersGeometry extends BufferGeometry {
    constructor(curve: Curve<Vector3>, divisions: number);
}

export interface RollerCoasterLiftersGeometryConstructor {
    new (curve: Curve<Vector3>, divisions: number): RollerCoasterLiftersGeometry;
    prototype: RollerCoasterLiftersGeometry;
}

export class RollerCoasterShadowGeometry extends BufferGeometry {
    constructor(curve: Curve<Vector3>, divisions: number);
}

export interface RollerCoasterShadowGeometryConstructor {
    new (curve: Curve<Vector3>, divisions: number): RollerCoasterShadowGeometry;
    prototype: RollerCoasterShadowGeometry;
}

export class SkyGeometry extends BufferGeometry {
    constructor(curve: Curve<Vector3>, divisions: number);
}

export interface SkyGeometryConstructor {
    new (curve: Curve<Vector3>, divisions: number): SkyGeometry;
    prototype: SkyGeometry;
}

export class TreesGeometry extends BufferGeometry {
    constructor(landscape: Mesh);
}

export interface TreesGeometryConstructor {
    new (landscape: Mesh): TreesGeometry;
    prototype: TreesGeometry;
}
