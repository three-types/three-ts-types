import { CapsulatedColor } from '../../../src/Three';

import { Pass } from './Pass';

export class ClearPass extends Pass {
    constructor(clearColor?: CapsulatedColor, clearAlpha?: number);
    clearColor: CapsulatedColor;
    clearAlpha: number;
}
