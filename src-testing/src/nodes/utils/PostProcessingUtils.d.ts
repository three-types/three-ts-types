import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";

export const getViewPosition: (
    screenPosition: NodeRepresentation,
    depth: NodeRepresentation,
    projectionMatrixInverse: NodeRepresentation,
) => ShaderNodeObject<Node>;
