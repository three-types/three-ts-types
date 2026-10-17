import { Camera, Node, UniformNode } from "three/webgpu";

declare class DenoiseNode extends Node {
    textureNode: Node;
    depthNode: Node;
    normalNode: Node;

    noiseNode: Node;

    lumaPhi: UniformNode<"float", number>;
    depthPhi: UniformNode<"float", number>;
    normalPhi: UniformNode<"float", number>;
    radius: UniformNode<"float", number>;
    index: UniformNode<"float", number>;

    constructor(textureNode: Node, depthNode: Node, normalNode: Node, noiseNode: Node, camera: Camera);
}

export default DenoiseNode;

export const denoise: (
    node: Node,
    depthNode: Node,
    normalNode: Node,
    camera: Camera,
) => DenoiseNode;
