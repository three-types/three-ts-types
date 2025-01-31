import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";
/** @module StructTypeNode **/
export interface MembersLayout {
    [name: string]: string | {
        type: string;
        atomic?: boolean;
    };
}
export interface MemberLayout {
    name: string;
    type: string;
    atomic: boolean;
}
declare class StructTypeNode extends Node {
    static get type(): string;
    membersLayout: MemberLayout[];
    name: string | null;
    readonly isStructLayoutNode: true;
    constructor(membersLayout: MembersLayout, name?: string | null);
    getLength(): number;
    getMemberType(builder: NodeBuilder, name: string): string;
    getNodeType(builder: NodeBuilder): string;
    generate(builder: NodeBuilder): string;
}
export default StructTypeNode;
