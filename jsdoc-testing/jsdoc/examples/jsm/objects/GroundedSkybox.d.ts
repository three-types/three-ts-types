/**
 * A ground-projected skybox.
 *
 * By default the object is centered at the camera, so it is often helpful to set
 * `skybox.position.y = height` to put the ground at the origin.
 *
 * ```js
 * const height = 15, radius = 100;
 *
 * const skybox = new GroundedSkybox( envMap, height, radius );
 * skybox.position.y = height;
 * scene.add( skybox );
 * ```
 *
 * @augments Mesh
 * @three_import import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js';
 */
export class GroundedSkybox extends Mesh {
    /**
     * Constructs a new ground-projected skybox.
     *
     * @param {Texture} map - The environment map to use.
     * @param {number} height - The height is how far the camera that took the photo was above the ground.
     * A larger value will magnify the downward part of the image.
     * @param {number} radius - The radius of the skybox. Must be large enough to ensure the scene's camera stays inside.
     * @param {number} [resolution=128] - The geometry resolution of the skybox.
     */
    constructor(map: Texture, height: number, radius: number, resolution?: number);
}
import { Mesh } from 'three';
