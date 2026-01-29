import ContextNode from "../core/ContextNode.js";
import Node from "../core/Node.js";

export function replaceDefaultUV(callback: (node: Node) => Node, node?: Node | null): ContextNode<unknown>;

export const rotateUV: (
    uv: Node,
    rotation: Node,
    center?: Node,
) => Node<"vec2">;

export const spherizeUV: (
    uv: Node,
    strength: Node | number,
    center?: Node,
) => Node<"vec2">;
