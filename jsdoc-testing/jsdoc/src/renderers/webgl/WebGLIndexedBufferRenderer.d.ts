export function WebGLIndexedBufferRenderer(gl: any, extensions: any, info: any): void;
export class WebGLIndexedBufferRenderer {
    constructor(gl: any, extensions: any, info: any);
    setMode: (value: any) => void;
    setIndex: (value: any) => void;
    render: (start: any, count: any) => void;
    renderInstances: (start: any, count: any, primcount: any) => void;
    renderMultiDraw: (starts: any, counts: any, drawCount: any) => void;
}
