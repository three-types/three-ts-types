export class ColorGrading extends Extension {
    constructor(options?: {});
    params: {
        exposure: number;
        brightness: number;
        contrast: number;
        contrastPivot: number;
        gamma: number;
        saturation: number;
        vibrance: number;
        temperature: number;
        tint: number;
        hueShift: number;
        lift: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        gammaBal: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        gain: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        offset: {
            r: number;
            g: number;
            b: number;
            y: number;
        };
        channelMixer: {
            red: {
                r: number;
                g: number;
                b: number;
            };
            green: {
                r: number;
                g: number;
                b: number;
            };
            blue: {
                r: number;
                g: number;
                b: number;
            };
        };
        curves: {
            rgb: {
                x: number;
                y: number;
            }[];
            red: {
                x: number;
                y: number;
            }[];
            green: {
                x: number;
                y: number;
            }[];
            blue: {
                x: number;
                y: number;
            }[];
        };
    };
    lutSize: number;
    lutTexture: Data3DTexture | null;
    lutPassNode: import("three/addons/tsl/display/Lut3DNode.js").default | null;
    sceneGradingEnabled: boolean;
    selectedToneMapping: number;
    _lutNeedsUpdate: boolean;
    _lutSizeChanged: boolean;
    activeTab: string;
    modulesMap: Map<any, any>;
    cardsMap: Map<any, any>;
    _createSvgIcon(svgPath: any, width?: number, height?: number, strokeWidth?: number): SVGSVGElement;
    _buildHeader(): void;
    _buildMainView(): void;
    viewContainer: HTMLDivElement | undefined;
    dockContainer: HTMLDivElement | undefined;
    lutSizeSelect: HTMLSelectElement | undefined;
    gradingBtn: HTMLButtonElement | undefined;
    updateGradingBtnState: (() => void) | undefined;
    pipelineOrder: any[] | string[] | undefined;
    cardsRow: HTMLDivElement | undefined;
    _cardsResizeObserver: ResizeObserver | null | undefined;
    _windowResizeHandler: (() => void) | null | undefined;
    _isVerticalMode(): boolean | null;
    _updateCardsRowAlignment(): void;
    _setupPanAndWheelScroll(container: any, cardsRow: any): void;
    _renderCardsFlow(): void;
    _updateLiveFlowConnectors(): void;
    _openAddCardModal(insertIndex: any): void;
    _activeModalOverlay: HTMLDivElement | null | undefined;
    _modalKeyDownHandler: ((e: any) => void) | null | undefined;
    _closeAddCardModal(): void;
    _addCardAt(type: any, insertIndex: any, initialParams?: {}, customId?: null): WhiteBalanceModule | ExposureModule | BrightnessModule | HueModule | ColorWheelModule | CurvesModule | ContrastModule | SaturationModule | VibranceModule | null;
    _removeCard(modId: any): void;
    _setupCardDragAndDrop(card: any, moduleId: any): void;
    _draggedModuleId: any;
    _updateRendererCardState(): void;
    _onParamChange(): void;
    generate3DLUTData(size?: number, buffer?: null): null;
    _getExportFileName(defaultBase?: string): any;
    _exportCubeFile(): void;
    _exportPngFile(): void;
    toJSON(): {
        version: number;
        lutSize: number;
        selectedToneMapping: number;
        sceneGradingEnabled: boolean;
        pipelineOrder: any[];
        modules: {};
        params: {};
    };
    serialize(): {
        version: number;
        lutSize: number;
        selectedToneMapping: number;
        sceneGradingEnabled: boolean;
        pipelineOrder: any[];
        modules: {};
        params: {};
    };
    deserialize(data: any): void;
    _applyParamsToModule(modId: any, params: any): void;
    load(data: any): void;
    _exportJsonFile(): void;
    _importJsonFile(): void;
    _createImportedCubeCard(modId: any): HTMLDivElement;
    _removeImportedCubeCard(modId: any): void;
    _importCubeFileAt(insertIndex: any): void;
    _importCubeFile(): void;
    onOrientationChange(event: any): void;
    update(inspector: any): void;
    _getRenderPipeline(renderer: any): any;
    _toggleSceneGrading(enable: any): void;
    _updateLiveGrading(): void;
    _applyLiveGrading(): void;
    _createdPipeline: RenderPipeline | null | undefined;
    _origRendererRender: any;
    _originalPipelineSettings: {
        outputNode: any;
        outputColorTransform: any;
        rendererToneMapping: any;
    } | null | undefined;
    _removeLiveGrading(): void;
}
import { Extension } from 'three/addons/inspector/Extension.js';
import { Data3DTexture } from 'three/webgpu';
import { WhiteBalanceModule } from './modules/WhiteBalanceModule.js';
import { ExposureModule } from './modules/ExposureModule.js';
import { BrightnessModule } from './modules/BrightnessModule.js';
import { HueModule } from './modules/HueModule.js';
import { ColorWheelModule } from './modules/ColorWheelModule.js';
import { CurvesModule } from './modules/CurvesModule.js';
import { ContrastModule } from './modules/ContrastModule.js';
import { SaturationModule } from './modules/SaturationModule.js';
import { VibranceModule } from './modules/VibranceModule.js';
import { RenderPipeline } from 'three/webgpu';
