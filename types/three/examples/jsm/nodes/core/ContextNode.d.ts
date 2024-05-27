import { NodeRepresentation } from "../shadernode/ShaderNode.js";
import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";
declare class ContextNode<TContext> extends Node {
    readonly isContextNode: true;
    node: Node;
    context: TContext;
    constructor(node: Node, context?: TContext);
    getNodeType(builder: NodeBuilder): string | null;
    setup(builder: NodeBuilder): string | null;
    generate(builder: NodeBuilder, output?: string | null): string | null;
}
export default ContextNode;
export declare const context: (
    node: NodeRepresentation<Node>,
    context?: unknown,
) => import("../shadernode/ShaderNode.js").ShaderNodeObject<ContextNode<unknown>>;
export declare const label: (
    node: NodeRepresentation,
    name: string,
) => import("../shadernode/ShaderNode.js").ShaderNodeObject<ContextNode<unknown>>;
