export class CurveEditor {
    constructor(options?: {});
    curves: any;
    activeChannel: any;
    onChange: any;
    selectedIndex: number;
    isDragging: boolean;
    pointRadius: number;
    domElement: HTMLDivElement;
    _buildUI(): void;
    channelBtns: {} | undefined;
    canvasContainer: HTMLDivElement | undefined;
    canvas: HTMLCanvasElement | undefined;
    ctx: CanvasRenderingContext2D | null | undefined;
    _onResize(): void;
    setChannel(channelId: any): void;
    setCurves(curves: any): void;
    getCurves(): {
        rgb: any;
        red: any;
        green: any;
        blue: any;
    };
    _getChannelColor(channelId?: any): "#e0e0e0" | "#ff3344" | "#22dd55" | "#3388ff";
    _normToCanvas(point: any): {
        x: number;
        y: number;
    };
    _canvasToNorm(px: any, py: any): {
        x: number;
        y: number;
    };
    _initEvents(): void;
    _dragStartSnapshot: any;
    notifyChange(): void;
    render(): void;
}
