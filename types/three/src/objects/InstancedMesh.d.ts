import { BufferGeometry } from '../core/BufferGeometry.js';
import { Material } from './../materials/Material.js';
import { BufferAttribute } from './../core/BufferAttribute.js';
import { InstancedBufferAttribute } from '../core/InstancedBufferAttribute.js';
import { Mesh } from './Mesh.js';
import { Matrix4 } from './../math/Matrix4.js';
import { Color } from './../math/Color.js';

export class InstancedMesh<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Mesh<TGeometry, TMaterial> {
    constructor(geometry: TGeometry | undefined, material: TMaterial | undefined, count: number);

    count: number;
    instanceColor: null | InstancedBufferAttribute;
    instanceMatrix: InstancedBufferAttribute;
    readonly isInstancedMesh: true;

    getColorAt(index: number, color: Color): void;
    getMatrixAt(index: number, matrix: Matrix4): void;
    setColorAt(index: number, color: Color): void;
    setMatrixAt(index: number, matrix: Matrix4): void;
    dispose(): void;
}
