import { PointLight } from './../lights/PointLight';
import { Matrix4 } from './../math/Matrix4';
import { Object3D } from './../core/Object3D';
import { CapsulatedColor } from '../utils';

export class PointLightHelper extends Object3D {
    constructor(light: PointLight, sphereSize?: number, color?: CapsulatedColor);

    /**
     * @default 'PointLightHelper'
     */
    type: string;

    light: PointLight;
    color: CapsulatedColor | undefined;
    matrix: Matrix4;

    /**
     * @default false
     */
    matrixAutoUpdate: boolean;

    dispose(): void;
    update(): void;
}
