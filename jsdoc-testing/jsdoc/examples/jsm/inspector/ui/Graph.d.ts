export class Graph {
    constructor(maxPoints?: number);
    maxPoints: number;
    lines: {};
    limit: number;
    limitIndex: number;
    domElement: SVGSVGElement;
    addLine(id: any, color: any): void;
    addPoint(lineId: any, value: any): void;
    resetLimit(): void;
    update(): void;
}
