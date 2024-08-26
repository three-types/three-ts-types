import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const directionToColor: (node: NodeRepresentation) => ShaderNodeObject<Node>;
export const colorToDirection: (node: NodeRepresentation) => ShaderNodeObject<Node>;
