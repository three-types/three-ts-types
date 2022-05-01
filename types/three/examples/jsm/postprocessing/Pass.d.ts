import { Material, WebGLRenderer, WebGLRenderTarget } from '../../../src/Three';

export class Pass {
    constructor();
    enabled: boolean;
    needsSwap: boolean;
    clear: boolean;
    renderToScreen: boolean;

    setSize(width: number, height: number): void;
    render(
        renderer: WebGLRenderer,
        writeBuffer: WebGLRenderTarget,
        readBuffer: WebGLRenderTarget,
        deltaTime: number,
        maskActive: boolean,
    ): void;
}

export interface PassConstructor {
    new (): Pass;
    prototype: Pass;
}

export class FullScreenQuad {
    constructor(material?: Material);

    render(renderer: WebGLRenderer): void;
    dispose(): void;

    material: Material;
}

export interface FullScreenQuadConstructor {
    new (material?: Material): FullScreenQuad;
    prototype: FullScreenQuad;
}
