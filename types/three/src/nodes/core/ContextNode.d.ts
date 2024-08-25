import { NodeRepresentation, ShaderNodeObject } from "../shadernode/ShaderNode.js";
import Node from "./Node.js";
import { NodeBuilderContext } from "./NodeBuilder.js";

declare class ContextNode extends Node {
    readonly isContextNode: true;

    node: Node;
    value: NodeBuilderContext;

    constructor(node: Node, value?: NodeBuilderContext);
}

export default ContextNode;

export const context: (node: NodeRepresentation, context?: NodeBuilderContext) => ShaderNodeObject<ContextNode>;
export const label: (node: NodeRepresentation, label: string) => ShaderNodeObject<ContextNode>;

declare module "../shadernode/ShaderNode.js" {
    interface NodeElements {
        context: typeof context;
        label: typeof label;
    }
}
