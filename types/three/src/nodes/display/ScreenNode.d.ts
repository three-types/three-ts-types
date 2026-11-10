import Node from "../core/Node.js";
import UniformNode from "../core/UniformNode.js";

// Screen

export const screenDPR: UniformNode<"float">;
export const screenSize: UniformNode<"vec2">;
export const screenCoordinate: Node<"vec2">;
export const screenUV: Node<"vec2">;

// Viewport

export const viewport: UniformNode<"vec4">;
export const viewportSize: Node<"vec2">;
export const viewportCoordinate: Node<"vec2">;
export const viewportUV: Node<"vec2">;
