export class RendererInspector extends InspectorBase {
    currentFrame: Object | null;
    currentRender: any;
    currentNodes: any[] | null;
    lastFrame: Object | null;
    frames: any[];
    framesLib: {};
    maxFrames: number;
    _lastFinishTime: number;
    _resolveTimestampPromise: any;
    isRendererInspector: boolean;
    getParent(): any;
    fps: number | undefined;
    _getFPS(): number;
    _createFrame(): {
        frameId: any;
        resolvedCompute: boolean;
        resolvedRender: boolean;
        deltaTime: number;
        startTime: number;
        finishTime: number;
        miscellaneous: number;
        children: never[];
        renders: never[];
        computes: never[];
    };
    getFrame(): Object | null;
    getFrameById(frameId: any): any;
    updateTabs(): void;
    resolveFrame(): void;
    resolveTimestamp(): Promise<any>;
    get isAvailable(): boolean;
    addFrame(frame: any): void;
    inspect(node: any): void;
    beginCompute(uid: any, computeNode: any): void;
    currentCompute: any;
    beginRender(uid: any, scene: any, camera: any, renderTarget: any): void;
}
import { InspectorBase } from 'three/webgpu';
