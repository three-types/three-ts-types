import Node from "../core/Node.js";
import MathNode from "../math/MathNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const saturation: (
    color: NodeRepresentation,
    adjustment?: NodeRepresentation,
) => ShaderNodeObject<Node>;

export const vibrance: (
    color: NodeRepresentation,
    adjustment?: NodeRepresentation,
) => ShaderNodeObject<Node>;

export const hue: (
    color: NodeRepresentation,
    adjustment?: NodeRepresentation,
) => ShaderNodeObject<Node>;

export const luminance: (
    color: NodeRepresentation,
    luminanceCoefficients?: NodeRepresentation,
) => ShaderNodeObject<MathNode>;

export const threshold: (color: NodeRepresentation, thershold: NodeRepresentation) => ShaderNodeObject<MathNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        saturation: typeof saturation;
        vibrance: typeof vibrance;
        hue: typeof hue;
        threshold: typeof threshold;
    }
}
