export class WebGLBufferRenderer {
    constructor(backend: any);
    gl: any;
    extensions: any;
    info: any;
    mode: any;
    index: number;
    type: any;
    object: any;
    render(start: any, count: any): void;
    renderInstances(start: any, count: any, primcount: any): void;
    renderMultiDraw(starts: any, counts: any, drawCount: any): void;
    renderMultiDrawInstances(starts: any, counts: any, drawCount: any, primcount: any): void;
}
