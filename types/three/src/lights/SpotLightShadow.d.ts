import { PerspectiveCamera } from './../cameras/PerspectiveCamera.js';
import { LightShadow } from './LightShadow.js';

export class SpotLightShadow extends LightShadow {
    camera: PerspectiveCamera;
    readonly isSpotLightShadow: true;

    /**
     * @default 1
     */
    focus: number;
}
