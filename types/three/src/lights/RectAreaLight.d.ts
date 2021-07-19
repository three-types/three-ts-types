import { Light } from './Light';
import { CapsulatedColor } from '../utils';

export class RectAreaLight extends Light {
    constructor(color?: CapsulatedColor, intensity?: number, width?: number, height?: number);

    /**
     * @default 'RectAreaLight'
     */
    type: string;

    /**
     * @default 10
     */
    width: number;

    /**
     * @default 10
     */
    height: number;

    /**
     * @default 1
     */
    intensity: number;

    readonly isRectAreaLight: true;
}
