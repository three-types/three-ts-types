import { Camera } from "../../cameras/Camera.js";
import { Scene } from "../../scenes/Scene.js";
import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";
import PassNode from "./PassNode.js";

declare class PixelationNode extends TempNode {
    textureNode: Node;
    depthNode: Node;
    normalNode: Node;

    pixelSize: Node;
    normalEdgeStrength: Node;
    depthEdgeStrength: Node;

    constructor(
        textureNode: Node,
        depthNode: Node,
        normalNode: Node,
        pixelSize: Node,
        normalEdgeStrength: Node,
        depthEdgeStrength: Node,
    );
}

declare const pixelation: (
    node: NodeRepresentation,
    depthNode: NodeRepresentation,
    normalNode: NodeRepresentation,
    pixelSize?: number,
    normalEdgeStrength?: number,
    depthEdgeStrength?: number,
) => ShaderNodeObject<PixelationNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        pixelation: typeof pixelation;
    }
}

declare class PixelationPassNode extends PassNode {
    pixelSize: number;
    normalEdgeStrength: number;
    depthEdgeStrength: number;

    readonly isPixelationPassNode: true;

    constructor(
        scene: Scene,
        camera: Camera,
        pixelSize?: number,
        normalEdgeStrength?: number,
        depthEdgeStrength?: number,
    );
}

export const pixelationPass: (
    scene: Scene,
    camera: Camera,
    pixelSize?: number,
    normalEdgeStrength?: number,
    depthEdgeStrength?: number,
) => ShaderNodeObject<PixelationPassNode>;

export default PixelationPassNode;
