import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const viewportSafeUV: (uv?: NodeRepresentation | null) => ShaderNodeObject<Node>;
