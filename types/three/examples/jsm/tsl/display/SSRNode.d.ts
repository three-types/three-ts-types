import { ShaderNodeObject } from "three/tsl";
import { Camera, Node, TempNode, TextureNode, UniformNode } from "three/webgpu";

declare class SSRNode extends TempNode {
    colorNode: ShaderNodeObject<Node>;
    depthNode: ShaderNodeObject<Node>;
    normalNode: ShaderNodeObject<Node>;
    metalnessRoughnessNode: ShaderNodeObject<Node>;
    camera: Camera;

    resolutionScale: number;

    maxDistance: UniformNode<number>;
    thickness: UniformNode<number>;
    opacity: UniformNode<number>;
    quality: UniformNode<number>;
    blurQuality: UniformNode<number>;

    constructor(
        colorNode: ShaderNodeObject<Node>,
        depthNode: ShaderNodeObject<Node>,
        normalNode: ShaderNodeObject<Node>,
        metalnessRoughnessNode: ShaderNodeObject<Node>,
        camera: Camera,
        blurred?: boolean,
    );

    getTextureNode(): ShaderNodeObject<TextureNode>;

    setSize(width: number, height: number): void;
}

export default SSRNode;

export const ssr: (
    colorNode: Node,
    depthNode: Node,
    normalNode: Node,
    metalnessRoughnessNode: Node,
    camera: Camera,
    blurred?: boolean,
) => ShaderNodeObject<SSRNode>;
