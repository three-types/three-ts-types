import { Vector3 } from "three";
import { NodeRepresentation, ShaderNodeObject, TempNode, TextureNode, UniformNode } from "three/tsl";

interface LensflareNodeParams {
    ghostTint: ShaderNodeObject<UniformNode<Vector3>>;
    threshold: ShaderNodeObject<UniformNode<number>>;
    ghostSamples: ShaderNodeObject<UniformNode<number>>;
    ghostSpacing: ShaderNodeObject<UniformNode<number>>;
    ghostAttenuationFactor: ShaderNodeObject<UniformNode<number>>;
    downSampleRatio: number;
}

declare class LensflareNode extends TempNode {
    textureNode: TextureNode;

    ghostTint: ShaderNodeObject<UniformNode<Vector3>>;
    threshold: ShaderNodeObject<UniformNode<number>>;
    ghostSamples: ShaderNodeObject<UniformNode<number>>;
    ghostSpacing: ShaderNodeObject<UniformNode<number>>;
    ghostAttenuationFactor: ShaderNodeObject<UniformNode<number>>;
    downSampleRatio: number;

    constructor(textureNode: TextureNode, params?: LensflareNodeParams);

    getTextureNode(): TextureNode;

    setSize(width: number, height: number): void;
}

export default LensflareNode;

export const lensflare: (
    inputNode: NodeRepresentation,
    params?: LensflareNodeParams,
) => ShaderNodeObject<LensflareNode>;
