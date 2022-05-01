import { WebGLRenderer, WebGLRendererParameters } from './WebGLRenderer';

export class WebGL1Renderer extends WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters);
    readonly isWebGL1Renderer: true;
}

export interface WebGL1RendererConstructor {
    new (parameters?: WebGLRendererParameters): WebGL1Renderer;
    prototype: WebGL1Renderer;
}
