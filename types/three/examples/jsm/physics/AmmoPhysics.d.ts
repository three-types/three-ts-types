import { Mesh, Vector3 } from '../../../src/Three';

export class AmmoPhysics {
    constructor();
    addMesh(mesh: Mesh, mass: number): void;
    setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
}

export interface AmmoPhysicsConstructor {
    new (): AmmoPhysics;
    prototype: AmmoPhysics;
}
