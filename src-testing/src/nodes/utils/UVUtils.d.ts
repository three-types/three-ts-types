import Node from "../core/Node.js";

export const rotateUV: (
    uv: Node<"vec2">,
    rotation: Node<"float">,
    center?: Node<"vec2">,
) => Node<"vec2">;

export const spherizeUV: (
    uv: Node<"vec2">,
    strength: Node<"float"> | number,
    center?: Node<"vec2">,
) => Node<"vec2">;
