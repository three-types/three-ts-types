import { Camera, Node, TempNode, TextureNode, UniformNode, Vector2 } from "three/webgpu";

declare class GTAONode extends TempNode<"float"> {
    depthNode: Node;
    normalNode: Node;

    resolutionScale: number;

    radius: UniformNode<"float", number>;
    resolution: UniformNode<"vec2", Vector2>;
    thickness: UniformNode<"float", number>;
    /**
     * @deprecated Since the switch to quadratic ray stepping with sphere falloff, step distribution is fixed at `t²`
     * and this uniform has no effect. Kept for backward compatibility and will be removed in a future release.
     */
    distanceExponent: UniformNode<"float", number>;
    /**
     * @deprecated Replaced by the sphere falloff `mix( max( h, sH ), h, (dist/radius)² )`, which has no tunable
     * parameter. Kept for backward compatibility and will be removed in a future release.
     */
    distanceFallOff: UniformNode<"float", number>;
    scale: UniformNode<"float", number>;
    samples: UniformNode<"float", number>;

    useTemporalFiltering: boolean;

    constructor(depthNode: Node, normalNode: Node, camera: Camera);

    getTextureNode(): TextureNode;

    setSize(width: number, height: number): void;
}

export default GTAONode;

export const ao: (
    depthNode: Node,
    normalNode: Node,
    camera: Camera,
) => GTAONode;
