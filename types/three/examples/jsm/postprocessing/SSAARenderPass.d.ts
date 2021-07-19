import { Scene, Camera, CapsulatedColor, ShaderMaterial, WebGLRenderTarget } from '../../../src/Three';

import { Pass } from './Pass';

export class SSAARenderPass extends Pass {
    constructor(scene: Scene, camera: Camera, clearColor: CapsulatedColor, clearAlpha: number);
    scene: Scene;
    camera: Camera;
    sampleLevel: number;
    unbiased: boolean;
    clearColor: CapsulatedColor;
    clearAlpha: number;
    copyUniforms: object;
    copyMaterial: ShaderMaterial;
    fsQuad: object;
    sampleRenderTarget: undefined | WebGLRenderTarget;
}
