/**
 * ColorWheel.js - DaVinci Resolve style interactive Color Wheel control widget
 */
export class ColorWheel {
    constructor(title: any, initialValues: {
        r: number;
        g: number;
        b: number;
    } | undefined, onChange: any, onRemove?: null);
    title: any;
    values: {
        r: number;
        g: number;
        b: number;
    };
    onChange: any;
    onRemove: any;
    domElement: HTMLDivElement;
    _buildUI(): void;
    canvas: HTMLCanvasElement | undefined;
    ctx: CanvasRenderingContext2D | null | undefined;
    ySlider: HTMLInputElement | undefined;
    inputs: {} | undefined;
    setValues(r: any, g: any, b: any, y?: undefined): void;
    draw(): void;
    _initEvents(): void;
}
