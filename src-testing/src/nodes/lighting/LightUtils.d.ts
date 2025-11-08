import Node from "../core/Node.js";

export const getDistanceAttenuation: (args: {
    lightDistance: Node<"float">;
    cutoffDistance: Node<"float">;
    decayExponent: Node<"float">;
}) => Node<"float">;
