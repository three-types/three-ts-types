import Renderer, { RendererParameters } from '../common/Renderer.js';
import { WebGPUBackendParameters } from './WebGPUBackend';

export interface WebGPURendererParameters extends RendererParameters, WebGPUBackendParameters {}

export default class WebGPURenderer extends Renderer {
    constructor(parameters?: WebGPURendererParameters);
}
