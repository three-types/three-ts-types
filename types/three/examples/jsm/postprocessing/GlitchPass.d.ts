import { DataTexture, ShaderMaterial } from "three";

import { Pass } from "./Pass.js";

export class GlitchPass extends Pass {
    constructor(dt_size?: number);
    uniforms: object;
    material: ShaderMaterial;
    goWild: boolean;
    curF: number;
    randX: number;

    generateTrigger(): void;
    generateHeightmap(dt_size: number): DataTexture;
}
