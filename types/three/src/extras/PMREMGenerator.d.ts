import { WebGLRenderer } from '../renderers/WebGLRenderer.js';
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js';
import { Texture } from '../textures/Texture.js';
import { CubeTexture } from '../textures/CubeTexture.js';
import { Scene } from '../scenes/Scene.js';

export class PMREMGenerator {
    constructor(renderer: WebGLRenderer);
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number): WebGLRenderTarget;
    fromEquirectangular(equirectangular: Texture, renderTarget?: WebGLRenderTarget | null): WebGLRenderTarget;
    fromCubemap(cubemap: CubeTexture, renderTarget?: WebGLRenderTarget | null): WebGLRenderTarget;
    compileCubemapShader(): void;
    compileEquirectangularShader(): void;
    dispose(): void;
}
