import { RenderTarget } from "../../core/RenderTarget.js";
import { Vector4 } from "../../math/Vector4.js";
import { DepthTexture } from "../../textures/DepthTexture.js";
import { Texture } from "../../textures/Texture.js";
import ClippingContext from "./ClippingContext.js";
declare class RenderContext {
    id: number;
    color: boolean;
    clearColor: boolean;
    clearColorValue: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    depth: boolean;
    clearDepth: boolean;
    clearDepthValue: number;
    stencil: boolean;
    clearStencil: boolean;
    clearStencilValue: number;
    viewport: boolean;
    viewportValue: Vector4;
    scissor: boolean;
    scissorValue: Vector4;
    textures: Texture[] | null;
    depthTexture: DepthTexture | null;
    activeCubeFace: number;
    sampleCount: number;
    width: number;
    height: number;
    readonly isRenderContext: true;
    clippingContext?: ClippingContext | undefined;
    depthClearValue?: number | undefined;
    stencilClearValue?: number | undefined;
    renderTarget?: RenderTarget | undefined;
    activeMipmapLevel?: number | undefined;
    occlusionQueryCount?: number | undefined;
    constructor();
    getCacheKey(): string;
}
export declare function getCacheKey(renderContext: RenderContext): string;
export default RenderContext;
