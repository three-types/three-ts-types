import { Node } from "three/webgpu";

export interface BoxBlurOptions {
    size?: Node<"int"> | undefined;
    separation?: Node<"int"> | undefined;
    premultipliedAlpha?: boolean | undefined;
}

export const boxBlur: (textureNode: Node<"vec4">, options?: BoxBlurOptions) => Node<"vec4">;
