import { Node } from "three/webgpu";

interface MotionBlur {
    (
        inputNode: Node<"vec3">,
        velocity: Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
        numSamples?: Node<"int">,
    ): Node<"vec3">;
    (
        inputNode: Node<"vec4">,
        velocity: Node<"vec2"> | Node<"vec3"> | Node<"vec4">,
        numSamples?: Node<"int">,
    ): Node<"vec4">;
}

export const motionBlur: MotionBlur;
