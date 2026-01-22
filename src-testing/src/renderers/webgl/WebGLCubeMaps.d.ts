import { Texture } from "../../textures/Texture.js";
import { WebGLRenderer } from "../WebGLRenderer.js";

export class WebGLCubeMaps {
    constructor(renderer: WebGLRenderer);

    get(texture: Texture): Texture | null;
    dispose(): void;
}
