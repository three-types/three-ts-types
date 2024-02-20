import { RenderTarget, RenderTargetOptions } from "../core/RenderTarget.js";
import { Texture } from "../textures/Texture";

export class WebGLRenderTarget<TTarget extends Texture | Texture[] = Texture> extends RenderTarget<TTarget> {
    constructor(width?: number, height?: number, options?: RenderTargetOptions);

    readonly isWebGLRenderTarget: true;
}
