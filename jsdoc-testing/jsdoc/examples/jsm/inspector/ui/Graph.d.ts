export class Graph {
    constructor(maxPoints?: number);
    maxPoints: number;
    lines: {};
    limit: number;
    limitIndex: number;
    domElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    devicePixelRatio: number;
    resize(width: any, height: any): void;
    addLine(id: any, color: any): void;
    addPoint(lineId: any, value: any): void;
    resetLimit(): void;
    update(): void;
    draw(): void;
    _resolveColor(color: any): {
        color: any;
        transparent: string;
    } | null;
    dispose(): void;
}
