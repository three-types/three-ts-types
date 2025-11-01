import { Camera, Node, PassNode, Scene } from "three/webgpu";

declare class PixelationPassNode extends PassNode {
    pixelSize: Node<"float">;
    normalEdgeStrength: Node<"float">;
    depthEdgeStrength: Node<"float">;

    readonly isPixelationPassNode: true;

    constructor(
        scene: Scene,
        camera: Camera,
        pixelSize: number,
        normalEdgeStrength: number,
        depthEdgeStrength: number,
    );
}

export const pixelationPass: (
    scene: Scene,
    camera: Camera,
    pixelSize: Node<"float">,
    normalEdgeStrength: Node<"float">,
    depthEdgeStrength: Node<"float">,
) => PixelationPassNode;

export default PixelationPassNode;
