import ContextNode from "../core/ContextNode.js";
import Node from "../core/Node.js";

export function replaceDefaultUV(callback: (node: Node) => Node, node?: Node | null): ContextNode<unknown>;

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
