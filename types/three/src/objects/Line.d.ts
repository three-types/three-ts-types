import { Material } from './../materials/Material.js';
import { Raycaster } from './../core/Raycaster.js';
import { Object3D } from './../core/Object3D.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Intersection } from '../core/Raycaster.js';

export class Line<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Object3D {
    constructor(geometry?: TGeometry, material?: TMaterial);

    geometry: TGeometry;
    material: TMaterial;

    type: 'Line' | 'LineLoop' | 'LineSegments' | string;
    readonly isLine: true;

    morphTargetInfluences?: number[] | undefined;
    morphTargetDictionary?: { [key: string]: number } | undefined;

    computeLineDistances(): this;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
    updateMorphTargets(): void;
}
