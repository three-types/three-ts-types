import { Scene, Camera } from '../../../src/Three';

import { Pass } from './Pass';

export class MaskPass extends Pass {
    constructor(scene: Scene, camera: Camera);
    scene: Scene;
    camera: Camera;
    inverse: boolean;
}

export interface MaskPassConstructor {
    new (scene: Scene, camera: Camera): MaskPass;
    prototype: MaskPass;
}

export class ClearMaskPass extends Pass {
    constructor();
}

export interface ClearMaskPassConstructor {
    new (): ClearMaskPass;
    prototype: ClearMaskPass;
}
