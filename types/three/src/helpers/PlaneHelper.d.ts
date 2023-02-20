import { Plane } from './../math/Plane.js';
import { LineSegments } from './../objects/LineSegments.js';

export class PlaneHelper extends LineSegments {
    /**
     * @param plane
     * @param [size=1]
     * @param [hex=0xffff00]
     */
    constructor(plane: Plane, size?: number, hex?: number);

    /**
     * @default 'PlaneHelper'
     */
    type: string;

    plane: Plane;

    /**
     * @default 1
     */
    size: number;

    updateMatrixWorld(force?: boolean): void;

    dispose(): void;
}
