/**
 * A special type of 3D object that takes a position from the scene graph hierarchy
 * but uses its local rotation as world rotation. It works like real-world gyroscope -
 * you can move it around using hierarchy while its orientation stays fixed with
 * respect to the world.
 *
 * @augments Object3D
 * @three_import import { Gyroscope } from 'three/addons/misc/Gyroscope.js';
 */
export class Gyroscope extends Object3D {
    updateMatrixWorld(force: any): void;
}
import { Object3D } from 'three';
