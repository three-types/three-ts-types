export function WebGLOutput(type: any, width: any, height: any, antialias: any, depth: any, stencil: any): void;
export class WebGLOutput {
    constructor(type: any, width: any, height: any, antialias: any, depth: any, stencil: any);
    setSize: (width: any, height: any) => void;
    setEffects: (effects: any) => void;
    begin: (renderer: any, renderTarget: any) => boolean;
    hasRenderPass: () => boolean;
    end: (renderer: any, deltaTime: any) => void;
    isCompositing: () => boolean;
    dispose: () => void;
}
