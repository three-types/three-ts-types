import { BoxGeometry, Mesh, NodeMaterial, UniformNode } from "three/webgpu";

declare class SkyMesh extends Mesh<BoxGeometry, NodeMaterial> {
    /**
     * @deprecated since r188. Multiply {@link SkyMesh#mieCoefficient} by turbidity / 2 instead.
     */
    turbidity: UniformNode<"float">;
    rayleigh: UniformNode<"float">;
    mieCoefficient: UniformNode<"float">;
    mieDirectionalG: UniformNode<"float">;
    mieDirectionalGSpread: UniformNode<"float">;
    mieColor: UniformNode<"color">;
    mieAlbedo: UniformNode<"color">;
    absorptionScale: UniformNode<"float">;
    absorptionColor: UniformNode<"color">;
    sunPosition: UniformNode<"vec3">;
    sunSize: UniformNode<"float">;
    cloudScale: UniformNode<"float">;
    cloudSpeed: UniformNode<"float">;
    cloudCoverage: UniformNode<"float">;
    cloudDensity: UniformNode<"float">;
    cloudElevation: UniformNode<"float">;
    showSunDisc: UniformNode<"float", number | boolean>;

    /**
     * @deprecated
     */
    readonly isSky: true;

    readonly isSkyMesh: true;

    constructor();

    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the sky is no longer used in your app.
     */
    dispose(): void;
}

export { SkyMesh };
