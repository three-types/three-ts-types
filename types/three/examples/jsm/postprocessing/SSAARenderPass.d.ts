import { Camera, ColorRepresentation, Scene, ShaderMaterial, WebGLRenderTarget } from "three";

import { Pass } from "./Pass.js";

export class SSAARenderPass extends Pass {
    scene: Scene;
    camera: Camera;

    sampleLevel: number;
    unbiased: boolean;

    stencilBuffer: boolean;

    clearColor: ColorRepresentation;
    clearAlpha: number;

    copyUniforms: object;

    copyMaterial: ShaderMaterial;


    sampleRenderTarget?: WebGLRenderTarget | undefined;

    constructor(scene: Scene, camera: Camera, clearColor?: ColorRepresentation, clearAlpha?: number);
}
