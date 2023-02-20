import { WebGLCubeRenderTarget } from './../renderers/WebGLCubeRenderTarget.js';
import { Scene } from './../scenes/Scene.js';
import { WebGLRenderer } from './../renderers/WebGLRenderer.js';
import { Object3D } from './../core/Object3D.js';

export class CubeCamera extends Object3D {
    constructor(near: number, far: number, renderTarget: WebGLCubeRenderTarget);

    type: 'CubeCamera';

    renderTarget: WebGLCubeRenderTarget;

    update(renderer: WebGLRenderer, scene: Scene): void;
}
