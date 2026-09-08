export function WebGLBufferRenderer(gl: any, extensions: any, info: any): void;
export class WebGLBufferRenderer {
    constructor(gl: any, extensions: any, info: any);
    setMode: (value: any) => void;
    render: (start: any, count: any) => void;
    renderInstances: (start: any, count: any, primcount: any) => void;
    renderMultiDraw: (starts: any, counts: any, drawCount: any) => void;
}
