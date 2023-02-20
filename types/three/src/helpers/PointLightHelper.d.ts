import { PointLight } from './../lights/PointLight.js';
import { Matrix4 } from './../math/Matrix4.js';
import { Object3D } from './../core/Object3D.js';
import { ColorRepresentation } from '../utils.js';

export class PointLightHelper extends Object3D {
    constructor(light: PointLight, sphereSize?: number, color?: ColorRepresentation);

    /**
     * @default 'PointLightHelper'
     */
    type: string;

    light: PointLight;
    color: ColorRepresentation | undefined;
    matrix: Matrix4;

    /**
     * @default false
     */
    matrixAutoUpdate: boolean;

    dispose(): void;
    update(): void;
}
