import { OrthographicCamera } from './../cameras/OrthographicCamera.js';
import { LightShadow } from './LightShadow.js';

export class DirectionalLightShadow extends LightShadow {
    camera: OrthographicCamera;
    readonly isDirectionalLightShadow: true;
}
