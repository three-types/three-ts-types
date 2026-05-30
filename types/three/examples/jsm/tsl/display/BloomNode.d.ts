import { Node, TempNode, TextureNode, UniformNode } from "three/webgpu";

declare class BloomNode extends TempNode<"vec4"> {
    inputNode: Node;
    strength: UniformNode<"float", number>;
    radius: UniformNode<"float", number>;
    threshold: UniformNode<"float", number>;

    smoothWidth: UniformNode<"float", number>;

    highPassFn: (
        params: { input: Node; threshold: UniformNode<"float", number>; smoothWidth: UniformNode<"float", number> },
    ) => void;

    constructor(inputNode: Node, strength?: number, radius?: number, threshold?: number);

    getTexture(): TextureNode;

    setResolutionScale(resolutionScale: number): this;

    getResolutionScale(): number;

    setSize(width: number, height: number): void;
}

export const bloom: (
    node: Node,
    strength?: number,
    radius?: number,
    threshold?: number,
) => BloomNode;

export default BloomNode;
