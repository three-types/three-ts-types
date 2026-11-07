import { InspectorBase, InspectorBaseEventMap } from "three/webgpu";

export interface RendererInspectorEventMap extends InspectorBaseEventMap {
}

export interface RendererInspectorStats {
    uid: string;
    cid: string;
    name: string;
    timestamp: number;
    cpu: number;
    gpu: number;
    fps: number;
    children: RendererInspectorStats[];
    parent: RendererInspectorStats | RendererInspectorFrame | null;
}

export interface RendererInspectorFrame {
    frameId: number;
    resolvedCompute: boolean;
    resolvedRender: boolean;
    deltaTime: number;
    startTime: number;
    finishTime: number;
    miscellaneous: number;
    children: RendererInspectorStats[];
    renders: RendererInspectorStats[];
    computes: RendererInspectorStats[];
}

export class RendererInspector<TEventMap extends RendererInspectorEventMap = RendererInspectorEventMap>
    extends InspectorBase<TEventMap>
{
    frames: RendererInspectorFrame[];

    resolveTimestamp(): Promise<void>;
}
