import { RenderTarget } from "../../core/RenderTarget.js";
import MRTNode from "../../nodes/core/MRTNode.js";
import RenderContext from "./RenderContext.js";
/**
 * This module manages the render contexts of the renderer.
 */
declare class RenderContexts {
    _renderContexts: {
        [renderStateKey: string]: RenderContext | undefined;
    };
    /**
     * Constructs a new render context management component.
     */
    constructor();
    /**
     * Returns a render context for the given scene, camera and render target.
     *
     * @param {?RenderTarget} [renderTarget=null] - The active render target.
     * @param {?MRTNode} [mrt=null] - The MRT configuration
     * @param {?number} [callDepth=0] - The call depth of the renderer.
     * @return {RenderContext} The render context.
     */
    get(renderTarget?: RenderTarget | null, mrt?: MRTNode | null, callDepth?: number): RenderContext;
    /**
     * Frees internal resources.
     */
    dispose(): void;
}
export default RenderContexts;
