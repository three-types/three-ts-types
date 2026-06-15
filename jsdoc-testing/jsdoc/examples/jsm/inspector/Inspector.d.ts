export class Inspector extends RendererInspector {
    statsData: Map<any, any>;
    profiler: Profiler;
    performance: Performance;
    memory: Memory;
    console: Console;
    parameters: Parameters;
    viewer: Viewer;
    timeline: Timeline;
    settings: Settings;
    once: {};
    extensionsData: WeakMap<object, any>;
    displayCycle: {
        text: {
            needsUpdate: boolean;
            duration: number;
            time: number;
        };
        graph: {
            needsUpdate: boolean;
            duration: number;
            time: number;
        };
        toggleGraph: {
            needsUpdate: boolean;
            duration: number;
            time: number;
        };
    };
    get domElement(): HTMLDivElement | undefined;
    onExtension(name: any, callback: any): this;
    hide(): void;
    show(): void;
    getSize(): {
        width: number;
        height: number;
    };
    setActiveTab(tab: any): this;
    addTab(tab: any): this;
    removeTab(tab: any): this;
    setActiveExtension(name: any, value: any): this;
    resolveConsoleOnce(type: any, message: any): void;
    resolveConsole(type: any, message: any, stackTrace?: null): void;
    setRenderer(renderer: any): this;
    createParameters(name: any): {
        parameters: any;
        name: any;
        paramList: import("./ui/Item.js").Item;
        objects: any[];
        close(): /*elided*/ any;
        add(object: any, property: any, ...params: any[]): import("./ui/Values.js").ValueNumber | import("./ui/Values.js").ValueCheckbox | import("./ui/Values.js").ValueSlider | import("./ui/Values.js").ValueSelect | import("./ui/Values.js").ValueButton | import("./ui/Values.js").ValueString | null;
        _addInfo(editor: any, itemNode: any): void;
        _addParameter(object: any, property: any, editor: any, subItem: any): void;
        _registerParameter(object: any, property: any, editor: any, subItem: any): void;
        addString(object: any, property: any): import("./ui/Values.js").ValueString;
        addFolder(name: any): /*elided*/ any;
        addBoolean(object: any, property: any): import("./ui/Values.js").ValueCheckbox;
        addSelect(object: any, property: any, options: any): import("./ui/Values.js").ValueSelect;
        addColor(object: any, property: any): import("./ui/Values.js").ValueColor;
        addSlider(object: any, property: any, min?: number, max?: number, step?: number): import("./ui/Values.js").ValueSlider;
        addNumber(object: any, property: any, ...params: any[]): import("./ui/Values.js").ValueNumber;
        addButton(object: any, property: any): import("./ui/Values.js").ValueButton;
    };
    getStatsData(cid: any): any;
    resolveStats(stats: any): void;
    getNodes(): any[] | null;
    getAverageDeltaTime(statsData: any, property: any, frames?: number | undefined): number;
    resolveFrame(frame: any): void;
    updateCycle(cycle: any): void;
}
export function getItem(id: any): any;
export function setItem(id: any, state: any): void;
import { RendererInspector } from './RendererInspector.js';
import { Profiler } from './ui/Profiler.js';
import { Performance } from './tabs/Performance.js';
import { Memory } from './tabs/Memory.js';
import { Console } from './tabs/Console.js';
import { Parameters } from './tabs/Parameters.js';
import { Viewer } from './tabs/Viewer.js';
import { Timeline } from './tabs/Timeline.js';
import { Settings } from './tabs/Settings.js';
