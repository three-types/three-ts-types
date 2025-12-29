import { WebGLRenderer } from "../WebGLRenderer.js";
import { Texture } from '../../textures/Texture.js';

export class WebGLCubeMaps {
    constructor(renderer: WebGLRenderer);

    get(texture: Texture): Texture | null;
    dispose(): void;
}
