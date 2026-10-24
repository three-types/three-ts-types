export default DebugNode;
export function debug(node: Node, callback?: Function | null): DebugNode;
declare class DebugNode extends Node {
    constructor(node: any, callback?: null);
    node: any;
    callback: any;
    generateNodeType(builder: any): any;
    setup(builder: any): any;
    analyze(builder: any): any;
    generate(builder: any): any;
}
import Node from '../core/Node.js';
