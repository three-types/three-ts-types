import { IUniform, ShaderMaterial, WebGLRenderTarget } from "three";

import { FullScreenQuad, Pass } from "./Pass.js";

export class AfterimagePass extends Pass {
    uniforms: Record<string, IUniform>;

    compFsMaterial: ShaderMaterial;
    copyFsMaterial: ShaderMaterial;

    constructor(damp?: number);

    get damp(): number;
    set damp(value: number);
}
