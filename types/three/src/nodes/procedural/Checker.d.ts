import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const checker: (coord?: NodeRepresentation) => ShaderNodeObject<Node>;
