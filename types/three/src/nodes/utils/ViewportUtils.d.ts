import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const viewportSafeUV: (args: [NodeRepresentation | null | undefined]) => ShaderNodeObject<Node>;
