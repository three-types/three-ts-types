import { Scene, Camera, ShaderMaterial, Vector2, MeshNormalMaterial, WebGLRenderTarget } from '../../../src/Three';

import { Pass } from './Pass';

export interface RenderPixelatedPassParameters {
    normalEdgeStrength?: number;
    depthEdgeStrength?: number;
}

export class RenderPixelatedPass extends Pass {
    constructor(pixelSize: number, scene: Scene, camera: Camera, options?: RenderPixelatedPassParameters);
    pixelSize: number;
    resolution: Vector2;
    renderResolution: Vector2;

    pixelatedMaterial: ShaderMaterial;
    normalMaterial: MeshNormalMaterial;

    fsQuad: object;
    scene: Scene;
    camera: Camera;

    normalEdgeStrength: RenderPixelatedPassParameters['normalEdgeStrength'];
    depthEdgeStrength: RenderPixelatedPassParameters['depthEdgeStrength'];

    beautyRenderTarget: WebGLRenderTarget;
    normalRenderTarget: WebGLRenderTarget;
}
