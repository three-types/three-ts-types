import { Node, TempNode, TextureNode, UniformNode, Vector3 } from "three/webgpu";

interface LensflareNodeParams {
    ghostTint?: Node | undefined;
    threshold?: Node | undefined;
    ghostSamples?: Node | undefined;
    ghostSpacing?: Node | undefined;
    ghostAttenuationFactor?: Node | undefined;
    downSampleRatio?: number | undefined;
}

declare class LensflareNode extends TempNode<"vec4"> {
    textureNode: TextureNode;

    ghostTintNode: UniformNode<"vec3", Vector3>;
    thresholdNode: UniformNode<"float", number>;
    ghostSamplesNode: UniformNode<"float", number>;
    ghostSpacingNode: UniformNode<"float", number>;
    ghostAttenuationFactorNode: UniformNode<"float", number>;
    downSampleRatio: number;

    constructor(textureNode: TextureNode, params?: LensflareNodeParams);

    getTextureNode(): TextureNode;

    setSize(width: number, height: number): void;
}

export default LensflareNode;

export const lensflare: (
    inputNode: Node,
    params?: LensflareNodeParams,
) => LensflareNode;
