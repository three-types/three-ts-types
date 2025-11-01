import { BoxGeometry, Mesh, NodeMaterial, UniformNode, Vector3 } from "three/webgpu";

declare class SkyMesh extends Mesh<BoxGeometry, NodeMaterial> {
    turbidity: UniformNode<"float", number>;
    rayleigh: UniformNode<"float", number>;
    mieCoefficient: UniformNode<"float", number>;
    mieDirectionalG: UniformNode<"float", number>;
    sunPosition: UniformNode<"vec3", Vector3>;
    upUniform: UniformNode<"vec3", Vector3>;

    readonly isSky: true;

    constructor();
}

export { SkyMesh };
