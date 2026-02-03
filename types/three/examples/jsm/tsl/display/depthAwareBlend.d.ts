import { Camera, Color, Node } from "three/webgpu";

export interface DepthAwareBlendOptions {
    blendColor?: Node | Color;
    edgeRadius?: number;
    edgeStrength?: number;
}

export const depthAwareBlend: (
    baseNode: Node,
    blendNode: Node,
    depthNode: Node,
    camera: Camera,
    options?: DepthAwareBlendOptions,
) => Node<"vec4">;
