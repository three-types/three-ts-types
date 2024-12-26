import { Camera } from "../../cameras/Camera.js";
import { Object3D } from "../../core/Object3D.js";
import { RenderTarget } from "../../core/RenderTarget.js";
import ChainMap from "./ChainMap.js";
import RenderContext from "./RenderContext.js";
declare class RenderContexts {
    chainMaps: {
        [attachmentState: string]:
            | ChainMap<
                | readonly [Object3D, Camera]
                | readonly [Object3D, Camera, {
                    id: "default";
                }],
                RenderContext
            >
            | undefined;
    };
    constructor();
    get(scene?: Object3D | null, camera?: Camera | null, renderTarget?: RenderTarget | null): RenderContext;
    getChainMap(
        attachmentState: string,
    ): ChainMap<
        | readonly [Object3D<import("../../core/Object3D.js").Object3DEventMap>, Camera]
        | readonly [Object3D<import("../../core/Object3D.js").Object3DEventMap>, Camera, {
            id: "default";
        }],
        RenderContext
    >;
    dispose(): void;
}
export default RenderContexts;
