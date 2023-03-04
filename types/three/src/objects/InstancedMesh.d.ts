import { BufferGeometry } from '../core/BufferGeometry';
import { Material } from './../materials/Material';
import { BufferAttribute } from './../core/BufferAttribute';
import { InstancedBufferAttribute } from '../core/InstancedBufferAttribute';
import { Mesh } from './Mesh';
import { Matrix4 } from './../math/Matrix4';
import { Color } from './../math/Color';
import { EmptyEvent, Object3DEventMap } from '../Three';
import { Disposable, DisposableEventMap } from '../types';

export interface InstancedMeshEventMap extends Object3DEventMap, DisposableEventMap {}

// prettier needs to be ignored here. Create a format that Conflict rules from lint and prettier
// prettier-ignore
export class InstancedMesh<
        TGeometry extends BufferGeometry = BufferGeometry,
        TMaterial extends Material | Material[] = Material | Material[],
        TEventMap extends InstancedMeshEventMap = InstancedMeshEventMap,
    >
    extends Mesh<TGeometry, TMaterial, TEventMap>
    implements Disposable {
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
