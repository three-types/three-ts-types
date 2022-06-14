import { WebGLRenderTargetOptions, WebGLRenderTarget } from './WebGLRenderTarget';
import { WebGLRenderer } from './WebGLRenderer';
import { BaseTextureImageType, Texture } from './../textures/Texture';
import { CubeTexture } from './../textures/CubeTexture';

export class WebGLCubeRenderTarget extends WebGLRenderTarget<BaseTextureImageType[], CubeTexture, CubeTexture> {
    constructor(size: number, options?: WebGLRenderTargetOptions);

    fromEquirectangularTexture(renderer: WebGLRenderer, texture: Texture): this;

    clear(renderer: WebGLRenderer, color: boolean, depth: boolean, stencil: boolean): void;
}
