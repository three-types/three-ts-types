import { Node, ShaderNodeObject, UniformNode } from "three/tsl";
import { BoxGeometry, Mesh, NodeMaterial, Vector3 } from "three/webgpu";

declare class Sky extends Mesh<BoxGeometry, NodeMaterial> {
    turbidity: ShaderNodeObject<UniformNode<number>>;
    rayleigh: ShaderNodeObject<UniformNode<number>>;
    mieCoefficient: ShaderNodeObject<UniformNode<number>>;
    mieDirectionalG: ShaderNodeObject<UniformNode<number>>;
    sunPosition: ShaderNodeObject<UniformNode<Vector3>>;
    upUniform: ShaderNodeObject<UniformNode<Vector3>>;
    cameraPosition: ShaderNodeObject<Node>;

    readonly isSky: true;

    constructor();
}

export { Sky };
