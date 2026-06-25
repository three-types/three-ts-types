import { Camera, TempNode, TextureNode } from "three/webgpu";

export type TemporalReprojectMode = "diffuse" | "specular";

export interface TemporalReprojectNodeOptions {
    mode?: TemporalReprojectMode | undefined;
    hitPointReprojection?: boolean | undefined;
    accumulate?: boolean | undefined;
}

declare class TemporalReprojectNode extends TempNode<"vec4"> {
    constructor(
        beautyNode: TextureNode,
        depthNode: TextureNode,
        normalNode: TextureNode,
        velocityNode: TextureNode,
        camera: Camera,
        options?: TemporalReprojectNodeOptions,
    );
}

export default TemporalReprojectNode;

export const temporalReproject: (
    beautyNode: TextureNode,
    depthNode: TextureNode,
    normalNode: TextureNode,
    velocityNode: TextureNode,
    camera: Camera,
    options?: TemporalReprojectNodeOptions,
) => TemporalReprojectNode;
