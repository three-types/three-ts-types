import { BoxGeometry, Mesh, NodeMaterial, UniformNode, Vector3 } from "three/webgpu";

declare class SkyMesh extends Mesh<BoxGeometry, NodeMaterial> {
    turbidity: UniformNode<number>;
    rayleigh: UniformNode<number>;
    mieCoefficient: UniformNode<number>;
    mieDirectionalG: UniformNode<number>;
    sunPosition: UniformNode<Vector3>;
    upUniform: UniformNode<Vector3>;
    cloudScale: UniformNode<number>;
    cloudSpeed: UniformNode<number>;
    cloudCoverage: UniformNode<number>;
    cloudDensity: UniformNode<number>;
    cloudElevation: UniformNode<number>;

    /**
     * @deprecated
     */
    readonly isSky: true;

    readonly isSkyMesh: true;

    constructor();
}

export { SkyMesh };
