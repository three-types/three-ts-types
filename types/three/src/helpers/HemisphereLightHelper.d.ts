import { HemisphereLight } from './../lights/HemisphereLight.js';
import { Color } from './../math/Color.js';
import { Matrix4 } from './../math/Matrix4.js';
import { MeshBasicMaterial } from './../materials/MeshBasicMaterial.js';
import { Object3D } from './../core/Object3D.js';
import { ColorRepresentation } from '../utils.js';

export class HemisphereLightHelper extends Object3D {
    constructor(light: HemisphereLight, size: number, color?: ColorRepresentation);

    light: HemisphereLight;
    matrix: Matrix4;
    matrixAutoUpdate: boolean;
    material: MeshBasicMaterial;

    color: ColorRepresentation | undefined;

    dispose(): void;
    update(): void;
}
