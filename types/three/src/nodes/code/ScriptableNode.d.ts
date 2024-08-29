import Node from "../core/Node.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";

declare class ScriptableNode extends Node {
    codeNode: Node | null;
    parameters: Record<string, unknown>;

    constructor(codeNode?: Node | null, parameters?: Record<string, unknown>);
}

export default ScriptableNode;

export const scriptable: (
    codeNode?: NodeRepresentation | null,
    parameters?: Record<string, unknown>,
) => ShaderNodeObject<ScriptableNode>;
