export class Timeline extends Tab {
    constructor(options?: {});
    isRecording: boolean;
    frames: any[];
    baseTriangles: number;
    currentFrame: {
        id: any;
        calls: never[];
        fps: number;
        triangles: number;
    } | null;
    isHierarchicalView: boolean;
    callBlocks: WeakMap<object, any>;
    fallbackBlocks: any[];
    originalBackend: any;
    originalMethods: Map<any, any>;
    renderer: any;
    graph: Graph;
    init(inspector: any): void;
    buildHeader(): void;
    recordButton: HTMLButtonElement | undefined;
    viewModeSelect: HTMLSelectElement | undefined;
    recordRefreshButton: HTMLButtonElement | undefined;
    exportButton: HTMLButtonElement | undefined;
    frameInfo: HTMLSpanElement | undefined;
    buildUI(): void;
    graphSlider: HTMLDivElement | undefined;
    hoverIndicator: HTMLDivElement | undefined;
    playhead: HTMLDivElement | undefined;
    fixedScreenX: number | undefined;
    isTrackingLatest: boolean | undefined;
    isManualScrubbing: boolean | undefined;
    timelineTrack: HTMLDivElement | undefined;
    setRenderer(renderer: any): void;
    toggleRecording(): void;
    startRecording(): void;
    selectedFrameIndex: any;
    stopRecording(): void;
    clear(): void;
    exportData(): void;
    getRenderTargetDetails(renderTarget: any): {
        [x: string]: any;
        target: any;
    };
    getCallDetail(method: any, args: any): {
        scene: any;
        camera: any;
    } | {
        compute: any;
    } | {
        color: any;
        depth: any;
        stencil: any;
    } | {
        group: any;
        count: any;
    } | {
        group: any;
        size: string;
    } | {
        object: any;
    } | {
        name: any;
        count: any;
        itemSize: any;
    } | {
        target: any;
        width: any;
        height: any;
    } | {
        source: any;
        destination: any;
    } | {
        magFilter: any;
        minFilter: any;
        wrapS: any;
        wrapT: any;
        anisotropy: any;
    } | {
        texture: any;
    } | {
        node: any;
        bindings: number;
        dispatch: any;
        group?: undefined;
        x?: undefined;
        y?: undefined;
        width?: undefined;
        height?: undefined;
        stage?: undefined;
        name?: undefined;
    } | {
        group: any;
        node?: undefined;
        bindings?: undefined;
        dispatch?: undefined;
        x?: undefined;
        y?: undefined;
        width?: undefined;
        height?: undefined;
        stage?: undefined;
        name?: undefined;
    } | {
        x: any;
        y: any;
        width: any;
        height: any;
        node?: undefined;
        bindings?: undefined;
        dispatch?: undefined;
        group?: undefined;
        stage?: undefined;
        name?: undefined;
    } | {
        stage: any;
        name: any;
        node?: undefined;
        bindings?: undefined;
        dispatch?: undefined;
        group?: undefined;
        x?: undefined;
        y?: undefined;
        width?: undefined;
        height?: undefined;
    } | {
        name: any;
        node?: undefined;
        bindings?: undefined;
        dispatch?: undefined;
        group?: undefined;
        x?: undefined;
        y?: undefined;
        width?: undefined;
        height?: undefined;
        stage?: undefined;
    } | null;
    getTextureName(texture: any): any;
    getTextureFilterName(filter: any): any;
    getTextureWrapName(wrap: any): any;
    formatDetails(details: any): string;
    renderSlider(): void;
    selectFrame(index: any): void;
    getCallBlock(call: any, fallbackIndex: any, instanceIndex?: number): any;
    renderTimelineTrack(frame: any): void;
    collapsedGroups: Set<any> | undefined;
    getColorForMethod(method: any): "var(--color-green)" | "var(--text-secondary)" | "var(--color-red)" | "var(--color-yellow)";
}
import { Tab } from '../ui/Tab.js';
import { Graph } from '../ui/Graph.js';
