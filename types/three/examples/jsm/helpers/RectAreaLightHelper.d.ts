import { Line, RectAreaLight, CapsulatedColor } from '../../../src/Three';

export class RectAreaLightHelper extends Line {
    constructor(light: RectAreaLight, color?: CapsulatedColor);

    light: RectAreaLight;
    color: CapsulatedColor | undefined;

    dispose(): void;
}
