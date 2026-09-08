export class InstancedMeshGenerator {
    constructor(parameters: any, createGeometry: any, createMaterial: any, name: any, receiveShadow?: boolean);
    parameters: any;
    geometry: any;
    material: any;
    mesh: InstancedMesh | null;
    _createGeometry: any;
    _createMaterial: any;
    _name: any;
    _receiveShadow: boolean;
    _parametersKey: any;
    build(placements: any): InstancedMesh;
    dispose(): void;
}
export function createInstances(geometry: any, material: any, count: any, name: any): InstancedMesh;
export function updateInstances(mesh: any, placements: any): void;
import { InstancedMesh } from 'three';
