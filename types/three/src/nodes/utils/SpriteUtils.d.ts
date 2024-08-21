import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const billboarding: (
    args: { position?: NodeRepresentation | null; horizontal?: boolean; vertical?: boolean },
) => ShaderNodeObject<Node>;
