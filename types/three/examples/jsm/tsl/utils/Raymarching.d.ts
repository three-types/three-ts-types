import { ShaderNodeObject } from "three/tsl";
import { FunctionNode, Node, Texture, TextureNode } from "three/webgpu";

export const RaymarchingBox: (
    steps: number | Node,
    callback: ((params: { positionRay: Node }) => void) | FunctionNode<{ positionRay: Node }>,
) => void;

export const raymarchingTexture3D: (
    params: {
        texture: Texture | TextureNode;
        range: number | Node;
        threshold: number | Node;
        opacity: number | Node;
        steps: number | Node;
    },
) => ShaderNodeObject<Node>;
