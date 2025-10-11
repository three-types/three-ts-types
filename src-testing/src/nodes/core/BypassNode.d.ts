import { ShaderNodeObject } from "../tsl/TSLCore.js";
import Node from "./Node.js";

export default class BypassNode extends Node {
    isBypassNode: true;
    outputNode: Node;
    callNode: Node;

    constructor(returnNode: Node, callNode: Node);
}

export const bypass: (returnNode: Node, callNode: Node) => ShaderNodeObject<BypassNode>;

declare module "../Nodes.js" {
    interface Node {
        bypass: (callNode: Node) => BypassNode;
        bypassAssign: (callNode: Node) => this;
    }
}
