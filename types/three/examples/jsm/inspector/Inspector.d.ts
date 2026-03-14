import { RendererInspector, RendererInspectorEventMap } from "./RendererInspector.js";
import { ParametersGroup } from "./tabs/Parameters.js";
import { Tab } from "./ui/Tab.js";

export interface InspectorEventMap extends RendererInspectorEventMap {
    resize: {};
}

declare class Inspector extends RendererInspector<InspectorEventMap> {
    createParameters(name: string): ParametersGroup;

    get domElement(): HTMLDivElement;

    hide(): void;
    show(): void;

    getSize(): { width: number; height: number };

    setActiveTab(tab: Tab): this;
    addTab(tab: Tab): this;
    removeTab(tab: Tab): this;
}

export { Inspector };
