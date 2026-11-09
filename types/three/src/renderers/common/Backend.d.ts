import { CoordinateSystem, TimestampQuery } from "../../constants.js";
import NodeBuilder from "../../nodes/core/NodeBuilder.js";
import Renderer from "./Renderer.js";
import TimestampQueryPool from "./TimestampQueryPool.js";

declare module "../../core/Object3D.js" {
    interface Object3D {
        // See https://github.com/mrdoob/three.js/pull/28683
        count?: number | undefined;
        // See https://github.com/mrdoob/three.js/pull/26335
        occlusionTest?: boolean | undefined;
    }
}

export interface BackendParameters {
    canvas?: HTMLCanvasElement | OffscreenCanvas | undefined;
}

export default abstract class Backend {
    renderer: Renderer | null;
    domElement: HTMLCanvasElement | OffscreenCanvas | null;
    timestampQueryPool: { render: TimestampQueryPool | null; compute: TimestampQueryPool | null };
    trackTimestamp: boolean;

    constructor(parameters?: BackendParameters);

    init(renderer: Renderer): void;

    abstract get coordinateSystem(): CoordinateSystem;

    getDomElement(): HTMLCanvasElement | OffscreenCanvas;

    getTimestampFrames(type: TimestampQuery): number[];
    getTimestamp(uid: string): number;
    get hasTimestamp(): boolean;
    hasTimestampQuery(uid: string): boolean;
}
