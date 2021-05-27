import { WebGLRenderTarget } from './WebGLRenderTarget';
import { Texture } from '../textures/Texture';

export class WebGLMultipleRenderTargets extends WebGLRenderTarget {
    constructor(width: number, height: number, count: number);

    readonly isWebGLMultipleRenderTargets: true;

    texture: Texture[];
}
