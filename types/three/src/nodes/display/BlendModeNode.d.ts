import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { JoinNode } from "../Nodes.js";
import { NodeRepresentation, ShaderNode, ShaderNodeObject } from "../shadernode/ShaderNode.js";

export const burn: (base: NodeRepresentation, blend: NodeRepresentation) => ShaderNodeObject<Node>;

export const dodge: (base: NodeRepresentation, blend: NodeRepresentation) => ShaderNodeObject<Node>;

export const screen: (base: NodeRepresentation, blend: NodeRepresentation) => ShaderNodeObject<Node>;

export const overlay: (base: NodeRepresentation, blend: NodeRepresentation) => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        burn: typeof burn;
        dodge: typeof dodge;
        overlay: typeof overlay;
        screen: typeof screen;
    }
}
