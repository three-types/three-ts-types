import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";
import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";

declare class LoopNode extends Node {
    params: unknown[];

    constructor(params?: unknown[]);

    getProperties(builder: NodeBuilder): unknown;
}

export default LoopNode;

export const loop: (...params: unknown[]) => ShaderNodeObject<Node>;
export const Continue: () => ShaderNodeObject<Node>;
export const Break: () => ShaderNodeObject<Node>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        loop: (returns: NodeRepresentation, ...params: unknown[]) => ShaderNodeObject<Node>;
    }
}
