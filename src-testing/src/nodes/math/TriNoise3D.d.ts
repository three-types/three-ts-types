import Node from "../core/Node.js";

export const tri: (x: Node<"float">) => Node<"float">;

export const tri3: (p: Node<"vec3">) => Node<"vec3">;

export const triNoise3D: (
    position: Node<"vec3">,
    speed: Node<"float"> | number,
    time: Node<"float"> | number,
) => Node<"float">;
