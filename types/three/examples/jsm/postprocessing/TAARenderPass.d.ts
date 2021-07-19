import { Scene, Camera, CapsulatedColor } from '../../../src/Three';

import { SSAARenderPass } from './SSAARenderPass';

export class TAARenderPass extends SSAARenderPass {
    constructor(scene: Scene, camera: Camera, clearColor: CapsulatedColor, clearAlpha: number);
    accumulate: boolean;
}
