import { Vector3 } from './../math/Vector3';
import { Line } from './../objects/Line';
import { Mesh } from './../objects/Mesh';
import { Color } from './../math/Color';
import { Object3D } from './../core/Object3D';

// Extras / Helpers /////////////////////////////////////////////////////////////////////

export class ArrowHelper extends Object3D {
    /**
     * @param [dir=new THREE.Vector3( 0, 0, 1 )] Direction from origin. Must be a unit vector.
     * @param [origin=new THREE.Vector3( 0, 0, 0 )] Point at which the arrow starts.
     * @param [length=1] Length of the arrow.
     * @param [color=0xffff00] Hexadecimal value to define color.
     * @param [headLength=0.2 * length] The length of the head of the arrow.
     * @param [headWidth=0.2 * headLength] The width of the head of the arrow.
     */
    constructor(
        dir?: Vector3,
        origin?: Vector3,
        length?: number,
        color?: Color | string | number,
        headLength?: number,
        headWidth?: number,
    );

    /**
     * @default 'ArrowHelper'
     */
    type: string;

    /**
     * Contains the line part of the arrowHelper.
     */
    line: Line;

    /**
     * Contains the cone part of the arrowHelper.
     */
    cone: Mesh;

    /**
     * @param dir The desired direction. Must be a unit vector.
     */
    setDirection(dir: Vector3): void;

    /**
     * @param length The desired length.
     * @param [headLength=0.2 * length] The length of the head of the arrow.
     * @param [headWidth=0.2 * headLength] The width of the head of the arrow.
     */
    setLength(length: number, headLength?: number, headWidth?: number): void;

    /**
     * @param color The desired color.
     */
    setColor(color: Color | string | number): void;
}
