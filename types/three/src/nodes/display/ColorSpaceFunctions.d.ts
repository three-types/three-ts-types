import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";

export const sRGBToLinearShader: (color: NodeRepresentation) => ShaderNodeObject<Node>;

export const LinearTosRGBShader: (color: NodeRepresentation) => ShaderNodeObject<Node>;
