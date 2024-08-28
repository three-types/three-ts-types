import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const bleach: (color: NodeRepresentation, opacity?: number) => ShaderNodeObject<Node>;
