import { Node } from "three/tsl";

export interface RadialBlurOptions {
    center?: Node | undefined;
    weight?: Node | undefined;
    decay?: Node | undefined;
    count?: Node | undefined;
    exposure?: Node | undefined;
    premultipliedAlpha?: boolean | undefined;
}

export const radialBlur: (textureNode: Node, options?: RadialBlurOptions) => Node;
