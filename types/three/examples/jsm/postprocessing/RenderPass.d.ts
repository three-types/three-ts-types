import { Scene, Camera, Material, Color } from '../../../src/Three';

import { Pass } from './Pass';

export class RenderPass extends Pass {
    constructor(scene: Scene, camera: Camera, overrideMaterial?: Material, clearColor?: Color, clearAlpha?: number);
    scene: Scene;
    camera: Camera;
    overrideMaterial: Material;
    clearColor: Color;
    clearAlpha: number;
    clearDepth: boolean;
}

export interface RenderPassConstructor {
    new (
        scene: Scene,
        camera: Camera,
        overrideMaterial?: Material,
        clearColor?: Color,
        clearAlpha?: number,
    ): RenderPass;
    prototype: RenderPass;
}
