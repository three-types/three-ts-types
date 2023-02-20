import { Box3 } from './../math/Box3.js';
import { Color } from './../math/Color.js';
import { LineSegments } from './../objects/LineSegments.js';

export class Box3Helper extends LineSegments {
    /**
     * @param box
     * @param [color=0xffff00]
     */
    constructor(box: Box3, color?: Color);

    /**
     * @default 'Box3Helper'
     */
    type: string;

    box: Box3;

    dispose(): void;
}
