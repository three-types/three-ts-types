import { RenderTarget, RenderTargetOptions } from "../../core/RenderTarget.js";
import TextureNode from "../accessors/TextureNode.js";
import Node from "../core/Node.js";

declare class RTTNode extends TextureNode {
    readonly isRTTNode: true;

    node: Node;
    width: number | null;
    height: number | null;

    renderTarget: RenderTarget | null;

    textureNeedsUpdate: boolean;
    autoUpdate: boolean;

    pixelRatio?: number;

    constructor(node: Node, width?: number | null, height?: number | null, options?: RenderTargetOptions);

    get autoResize(): boolean;

    setSize(width: number | null, height: number | null): void;

    setPixelRatio(pixelRatio: number): void;
}

export default RTTNode;

export const rtt: (
    node: Node,
    width?: number | null,
    height?: number | null,
    options?: RenderTargetOptions,
) => RTTNode;
export const convertToTexture: (
    node: Node,
    width?: number | null,
    height?: number | null,
    options?: RenderTargetOptions,
) => RTTNode;
