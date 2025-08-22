import { ShaderNodeObject } from "three/tsl";
import { Node } from "three/webgpu";

export interface BoxBlurOptions {
    size?: Node | undefined;
    separation?: Node | undefined;
    premultipliedAlpha?: boolean | undefined;
}

export const boxBlur: (textureNode: Node, options?: BoxBlurOptions) => ShaderNodeObject<Node>;
