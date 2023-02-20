import { DirectionalLight } from './../lights/DirectionalLight.js';
import { Line } from './../objects/Line.js';
import { Matrix4 } from './../math/Matrix4.js';
import { Object3D } from './../core/Object3D.js';
import { ColorRepresentation } from '../utils.js';

export class DirectionalLightHelper extends Object3D {
    /**
     * @param light
     * @param [size=1]
     * @param color
     */
    constructor(light: DirectionalLight, size?: number, color?: ColorRepresentation);

    light: DirectionalLight;
    lightPlane: Line;
    targetLine: Line;

    /**
     * @default undefined
     */
    color: ColorRepresentation | undefined;
    matrix: Matrix4;

    /**
     * @default false
     */
    matrixAutoUpdate: boolean;

    dispose(): void;
    update(): void;
}
