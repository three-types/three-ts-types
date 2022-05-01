import { ColorRepresentation } from '../../../src/Three';

import { Pass } from './Pass';

export class ClearPass extends Pass {
    constructor(clearColor?: ColorRepresentation, clearAlpha?: number);
    clearColor: ColorRepresentation;
    clearAlpha: number;
}

export interface ClearPassConstructor {
    new (clearColor?: ColorRepresentation, clearAlpha?: number): ClearPass;
    prototype: ClearPass;
}
