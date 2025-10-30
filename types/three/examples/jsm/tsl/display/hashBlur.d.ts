import { Node } from "three/webgpu";

interface HashBlurOptions {
    repeats?: Node<"float"> | number | undefined;
    premultipliedAlpha?: boolean | undefined;
}

export const hashBlur: (
    textureNode: Node<"vec4">,
    bluramount?: Node<"float"> | number,
    options?: HashBlurOptions,
) => Node<"vec4">;
