import {
    Camera,
    ColorSpace,
    CoordinateSystem,
    Scene,
    ToneMapping,
    Vector2,
    Vector4,
    Color,
    Object3D,
    RenderTarget,
} from '../../../../src/Three.js';
import Backend from './Backend.js';
import Info from './Info.js';
import Color4 from './../common/Color4.js';

/**
 * Generic Renderer interface containing either a WebGL or WebGPU backend.
 */
export default class Renderer {
    /**
     * @default true
     */
    readonly isRenderer: true;

    domElement: HTMLCanvasElement;

    /**
     * The renderer backend; could be WebGLBackend or WebGPUBackend
     */
    backend: Backend;

    /**
     * @default true
     */
    autoClear: boolean;

    /**
     * @default true
     */
    autoClearColor: boolean;

    /**
     * @default true
     */
    autoClearDepth: boolean;

    /**
     * @default true
     */
    autoClearStencil: boolean;

    /**
     * @default SRGBColorSpace
     */
    outputColorSpace: ColorSpace;

    /**
     * @default NoToneMapping
     */
    toneMapping: ToneMapping;

    /**
     * @default 1.0
     */
    toneMappingExposure: number;

    /**
     * @default true
     */
    sortObjects: boolean;

    /**
     * @default true
     */
    depth: boolean;

    /**
     * @default true
     */
    stencil: boolean;

    info: Info;

    constructor(backend: Backend, parameters?: { logarithmicDepthBuffer?: boolean | undefined });

    init(): Promise<void>;

    get coordinateSystem(): CoordinateSystem;

    render(scene: Scene, camera: Camera): Promise<void>;

    setAnimationLoop(callback: ((time: DOMHighResTimeStamp) => void) | null): Promise<void>;

    /**
     * Sets the pixel ratio of the Renderer.
     */
    setPixelRatio(value?: number): void;

    /**
     * Sets the width and height of the output canvas and optionally updates the CSS style on the DOM element.
     */
    setSize(width: number, height: number, updateStyle?: boolean): void;

    /**
     * Gets the Rendering Context of the renderer.
     */
    getContext(): RenderingContext;

    /**
     * Gets the current pixel ratio of the renderer.
     */
    getPixelRatio(): number;

    getDrawingBufferSize(target: Vector2): Vector2;

    getSize(target: Vector2): Vector2;

    setDrawingBufferSize(width: number, height: number, pixelRatio: number): void;

    /**
     * Sets the custom opaque sort function for the RenderLists. Pass null to use the default painterSortStable function.
     */
    setOpaqueSort(method: (a: any, b: any) => number): void;

    /**
     * Sets the custom transparent sort function for the RenderLists. Pass null to use the default reversePainterSortStable function.
     */
    setTransparentSort(method: (a: any, b: any) => number): void;

    /**
     * Copies the scissor area into target.
     */
    getScissor(target: Vector4): Vector4;

    /**
     * Sets the scissor area from (x, y) to (x + width, y + height).
     */
    setScissor(x: number, y: number, width: number, height: number): void;

    /**
     * Returns true if scissor test is enabled; returns false otherwise.
     */
    getScissorTest(): boolean;

    /**
     * Enable the scissor test. When this is enabled, only the pixels within the defined scissor area will be affected by further renderer actions.
     */
    setScissorTest(boolean: boolean): void;

    /**
     * Copies the viewport into target.
     */
    getViewport(target: Vector4): Vector4;

    /**
     * Sets the viewport to render from (x, y) to (x + width, y + height).
     * (x, y) is the lower-left corner of the region.
     */
    setViewport(x: number, y: number, width: number, height: number, minDepth?: number, maxDepth?: number): void;

    /**
     * Returns a Color4 instance with the current clear color.
     */
    getClearColor(target: Color4): Color4;

    /**
     * Sets the clear color, using color for the color and alpha for the opacity.
     */
    setClearColor(color: Color, alpha?: number): void;

    /**
     * Returns a float with the current clear alpha. Ranges from 0 to 1.
     */
    getClearAlpha(): number;

    setClearAlpha(alpha: number): void;

    getClearDepth(): number;

    setClearDepth(depth: number): void;

    getClearStencil(): number;

    setClearStencil(stencil: number): void;

    isOccluded(object: Object3D): boolean;

    /**
     * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
     * Arguments default to true
     */
    clear(color?: boolean, depth?: boolean, stencil?: boolean): void;

    clearColor(): void;

    clearDepth(): void;

    clearStencil(): void;

    get currentColorSpace(): ColorSpace;

    dispose(): void;

    setRenderTarget(renderTarget: RenderTarget, activeCubeFace?: number, activeMipmapLevel?: number): void;

    getRenderTarget(): RenderTarget;

    setRenderObjectFunction(renderObjectFunction: () => {}): void;

    getRenderObjectFunction(): () => {};
}
