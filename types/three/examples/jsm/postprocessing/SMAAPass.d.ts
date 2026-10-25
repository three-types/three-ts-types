import { ShaderMaterial, Texture, WebGLRenderTarget } from "three";

import { Pass } from "./Pass.js";

export class SMAAPass extends Pass {
    constructor();
    edgesRT: WebGLRenderTarget;
    weightsRT: WebGLRenderTarget;
    areaTexture: Texture;
    searchTexture: Texture;
    uniformsEdges: object;
    materialEdges: ShaderMaterial;
    uniformsWeights: object;
    materialWeights: ShaderMaterial;
    uniformsBlend: object;
    materialBlend: ShaderMaterial;

    getAreaTexture(): string;
    getSearchTexture(): string;
}
