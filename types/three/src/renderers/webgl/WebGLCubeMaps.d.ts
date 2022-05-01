import { WebGLRenderer } from '../WebGLRenderer';

export class WebGLCubeMaps {
    constructor(renderer: WebGLRenderer);

    get(texture: any): any;
    dispose(): void;
}

export interface WebGLCubeMapsConstructor {
    new (renderer: WebGLRenderer): WebGLCubeMaps;
    prototype: WebGLCubeMaps;
}
