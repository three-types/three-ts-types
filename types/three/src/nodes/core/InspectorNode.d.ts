import { ShaderNodeObject } from "../tsl/TSLCore.js";
import Node from "./Node.js";

declare class InspectorNode extends Node {
    constructor(node: Node, name?: string, callback?: (node: Node) => Node);
}

export default InspectorNode;

export function inspector(node: Node, name?: string, callback?: (node: Node) => Node): ShaderNodeObject<Node>;

declare module "../tsl/TSLCore.js" {
    interface NodeElements {
        toInspector: typeof inspector;
    }
}
