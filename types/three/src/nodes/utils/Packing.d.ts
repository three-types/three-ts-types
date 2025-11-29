import Node from "../core/Node.js";

interface PackingFunction {
    (node: Node<"vec3">): Node<"vec3">;
    (node: Node<"vec4">): Node<"vec4">;
}

export const directionToColor: PackingFunction;
export const colorToDirection: PackingFunction;
export const unpackNormal: (xy: Node<"vec2">) => Node<"vec3">;
