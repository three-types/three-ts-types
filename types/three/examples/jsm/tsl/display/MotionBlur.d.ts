import { Node } from "three/webgpu";

export const motionBlur: (
    inputNode: Node<"vec4">,
    velocity: Node<"vec2">,
    numSamples?: Node<"int">,
) => Node<"vec4">;
