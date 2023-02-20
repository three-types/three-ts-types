import { Light } from './../lights/Light.js';
import { Matrix4 } from './../math/Matrix4.js';
import { Object3D } from './../core/Object3D.js';
import { LineSegments } from '../objects/LineSegments.js';
import { ColorRepresentation } from '../utils.js';

export class SpotLightHelper extends Object3D {
    constructor(light: Light, color?: ColorRepresentation);

    light: Light;
    matrix: Matrix4;

    /**
     * @default false
     */
    matrixAutoUpdate: boolean;
    color: ColorRepresentation | undefined;
    cone: LineSegments;

    dispose(): void;
    update(): void;
}
