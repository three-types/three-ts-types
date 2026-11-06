import { Camera, Node, Texture, TextureNode, UniformNode } from "three/webgpu";

export type DenoiseQuality = "fast" | "quality";

export interface DenoiseNodeOptions {
    depth?: TextureNode | null | undefined;
    normal?: Node | null | undefined;
    camera?: Camera | null | undefined;
    position?: TextureNode | null | undefined;
    variance?: TextureNode | null | undefined;
    velocity?: Node | null | undefined;
    roughness?: Node | null | undefined;
    hitDistance?: Node | null | undefined;
    alpha?: boolean | undefined;
    coverage?: boolean | undefined;
    temporal?: boolean | undefined;
    quality?: DenoiseQuality | undefined;
}

/**
 * Denoises the noisy output of a screen-space effect, e.g. AO, GI or reflections, or a texture, e.g. a light map,
 * with the edge-aware à-trous wavelet filter of SVGF.
 *
 * @augments Node
 * @three_import import { denoise, temporalDenoise } from 'three/addons/tsl/display/DenoiseNode.js';
 */
declare class DenoiseNode extends Node<"vec4"> {
    readonly isDenoiseNode: true;

    inputNode: TextureNode;
    depthNode: TextureNode | null;
    normalNode: Node | null;
    camera: Camera | null;
    positionNode: TextureNode | null;
    varianceNode: TextureNode | null;
    velocityNode: Node | null;
    roughnessNode: Node | null;
    hitDistanceNode: Node | null;

    readonly alpha: boolean;
    readonly coverage: boolean;
    readonly temporal: boolean;
    readonly quality: DenoiseQuality;

    iterations: number;

    luminancePhi: UniformNode<"float">;
    normalPhi: UniformNode<"float">;
    planePhi: UniformNode<"float">;
    relativeNoise: UniformNode<"float">;
    maxFrames: UniformNode<"float">;

    autoUpdate: boolean;
    textureNeedsUpdate: boolean;

    constructor(inputNode: TextureNode, options?: DenoiseNodeOptions);

    getTextureNode(): TextureNode;

    getTexture(): Texture;

    setSize(width: number, height: number): void;

    reset(): void;

    dispose(): void;
}

export default DenoiseNode;

export const denoise: (node: Node, options?: DenoiseNodeOptions) => DenoiseNode;

export const temporalDenoise: (node: Node, options?: DenoiseNodeOptions) => DenoiseNode;
