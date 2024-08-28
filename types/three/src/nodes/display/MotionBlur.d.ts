import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const motionBlur: (
    inputNode: NodeRepresentation,
    velocity: NodeRepresentation,
    numSamples?: NodeRepresentation,
) => ShaderNodeObject<Node>;
