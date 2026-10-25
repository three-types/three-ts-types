import { Camera, Color, MeshDepthMaterial, Scene, ShaderMaterial, WebGLRenderTarget } from "three";

import { Pass } from "./Pass.js";

export interface BokehPassParameters {
    focus?: number;
    aspect?: number;
    aperture?: number;
    maxblur?: number;
}

export class BokehPass extends Pass {
    constructor(scene: Scene, camera: Camera, params: BokehPassParameters);
    scene: Scene;
    camera: Camera;
    renderTargetColor: WebGLRenderTarget;
    renderTargetDepth: WebGLRenderTarget;
    materialDepth: MeshDepthMaterial;
    materialBokeh: ShaderMaterial;
    uniforms: object;
    oldClearColor: Color;
}
