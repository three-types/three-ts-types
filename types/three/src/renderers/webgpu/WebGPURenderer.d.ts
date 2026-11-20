import Renderer, { RendererParameters } from "../common/Renderer.js";
import { WebGLBackendParameters } from "../webgl-fallback/WebGLBackend.js";
import StandardNodeLibrary from "./nodes/StandardNodeLibrary.js";
import { WebGPUBackendParameters } from "./WebGPUBackend.js";

export interface WebGPURendererParameters
    extends RendererParameters, Omit<WebGPUBackendParameters, "context">, Omit<WebGLBackendParameters, "context">
{
    forceWebGL?: boolean | undefined;
    context?: GPUCanvasContext | WebGL2RenderingContext | undefined;
}

declare class WebGPURenderer extends Renderer {
    library: StandardNodeLibrary;

    readonly isWebGPURenderer: true;

    constructor(parameters?: WebGPURendererParameters);
}

export default WebGPURenderer;
