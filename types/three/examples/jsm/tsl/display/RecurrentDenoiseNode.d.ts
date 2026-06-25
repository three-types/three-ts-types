import { Camera, Node, TempNode, TextureNode } from "three/webgpu";

export type DenoiseMode = "diffuse" | "specular";

export interface RecurrentDenoiseNodeOptions {
    depth?: Node<"float"> | null | undefined;
    normal?: Node<"vec3"> | null | undefined;
    metalRoughness?: Node<"vec4"> | null | undefined;
    diffuse?: Node<"vec4"> | null | undefined;
    raw?: Node<"vec4"> | null | undefined;
    mode?: DenoiseMode | undefined;
    accumulate?: boolean | undefined;
}

declare class RecurrentDenoiseNode extends TempNode<"vec4"> {
    constructor(inputTexture: TextureNode, camera: Camera, options?: RecurrentDenoiseNodeOptions);
}

export default RecurrentDenoiseNode;

export const recurrentDenoise: (
    inputTexture: TextureNode,
    camera: Camera,
    options?: RecurrentDenoiseNodeOptions,
) => RecurrentDenoiseNode;
