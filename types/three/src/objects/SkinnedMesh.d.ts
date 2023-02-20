import { Material } from './../materials/Material.js';
import { Matrix4 } from './../math/Matrix4.js';
import { Vector3 } from './../math/Vector3.js';
import { Skeleton } from './Skeleton.js';
import { Mesh } from './Mesh.js';
import { BufferGeometry } from '../core/BufferGeometry.js';

export class SkinnedMesh<
    TGeometry extends BufferGeometry = BufferGeometry,
    TMaterial extends Material | Material[] = Material | Material[],
> extends Mesh<TGeometry, TMaterial> {
    constructor(geometry?: TGeometry, material?: TMaterial, useVertexTexture?: boolean);

    bindMode: string;
    bindMatrix: Matrix4;
    bindMatrixInverse: Matrix4;
    skeleton: Skeleton;
    readonly isSkinnedMesh: true;

    bind(skeleton: Skeleton, bindMatrix?: Matrix4): void;
    pose(): void;
    normalizeSkinWeights(): void;
    updateMatrixWorld(force?: boolean): void;
    boneTransform(index: number, target: Vector3): Vector3;
}
