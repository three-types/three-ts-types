import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const textureBicubic: (textureNode: Node, lodNode?: NodeRepresentation) => ShaderNodeObject<Node>;
