import { PerspectiveCamera } from './../cameras/PerspectiveCamera.js';
import { LightShadow } from './LightShadow.js';

export class PointLightShadow extends LightShadow {
    camera: PerspectiveCamera;
}
