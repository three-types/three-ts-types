import { ShaderNodeObject } from "three/tsl";
import { Node, TempNode, TextureNode, Vector2 } from "three/webgpu";

export interface GaussianBlurNodeOptions {
    premultipliedAlpha?: boolean | undefined;
    resolution?: Vector2 | undefined;
}

declare class GaussianBlurNode extends TempNode {
    textureNode: TextureNode;
    directionNode: Node | null;
    sigma: number;

    resolution: Vector2;

    premultipliedAlpha: boolean;

    constructor(
        textureNode: TextureNode,
        directionNode?: Node | null,
        sigma?: number,
        options?: GaussianBlurNodeOptions,
    );

    setSize(width: number, height: number): void;

    getTextureNode(): TextureNode;
}

export default GaussianBlurNode;

export const gaussianBlur: (
    node: Node,
    directionNode?: Node | number | null,
    sigma?: number,
    options?: GaussianBlurNodeOptions,
) => ShaderNodeObject<GaussianBlurNode>;

/**
 * @deprecated "premultipliedGaussianBlur()" is deprecated. Use "gaussianBlur()" with "premultipliedAlpha: true" option instead.
 */
export const premultipliedGaussianBlur: (
    node: Node,
    directionNode?: Node | number | null,
    sigma?: number,
) => ShaderNodeObject<GaussianBlurNode>;
