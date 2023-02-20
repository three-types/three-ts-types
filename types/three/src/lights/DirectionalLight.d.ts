import { Object3D } from './../core/Object3D.js';
import { DirectionalLightShadow } from './DirectionalLightShadow.js';
import { Light } from './Light.js';
import { Vector3 } from '../math/Vector3.js';
import { ColorRepresentation } from '../utils.js';

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js|src/lights/DirectionalLight.js}
 *
 * @example
 * // White directional light at half intensity shining from the top.
 * const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * directionalLight.position.set( 0, 1, 0 );
 * scene.add( directionalLight );
 */
export class DirectionalLight extends Light {
    constructor(color?: ColorRepresentation, intensity?: number);

    /**
     * @default 'DirectionalLight'
     */
    type: string;

    /**
     * This is set equal to {@link Object3D.DEFAULT_UP} (0, 1, 0), so that the light shines from the top down.
     *
     * @default {@link Object3D.DEFAULT_UP}
     */
    readonly position: Vector3;

    /**
     * Target used for shadow camera orientation.
     * @default new THREE.Object3D()
     */
    target: Object3D;

    /**
     * Light's intensity.
     * @default 1
     */
    intensity: number;

    /**
     * @default new THREE.DirectionalLightShadow()
     */
    shadow: DirectionalLightShadow;
    readonly isDirectionalLight: true;
}
