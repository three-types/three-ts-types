import { Node } from "three/webgpu";

export interface BoxBlurOptions {
    size?: Node<"int"> | Node<"float"> | undefined;
    separation?: Node<"int"> | Node<"float"> | undefined;
    premultipliedAlpha?: boolean | undefined;
}

export const boxBlur: (textureNode: Node<"vec4">, options?: BoxBlurOptions) => Node<"vec4">;
