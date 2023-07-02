import { Texture } from '../textures/Texture';
import { WebGLRenderTarget, WebGLRenderTargetOptions } from './WebGLRenderTarget';

export class WebGLMultipleRenderTargets extends WebGLRenderTarget {
    /**
     * @param width The width of the render target.
     * @param height The height of the render target.
     * @param count The number of render targets.
     * @param options object that holds texture parameters for an auto-generated target texture and depthBuffer/stencilBuffer booleans.
     * For an explanation of the texture parameters see {@link Texture}.
     */
    constructor(width?: number, height?: number, count?: number, options?: WebGLRenderTargetOptions);

    readonly isWebGLMultipleRenderTargets: true;

    texture: Texture[];
}
