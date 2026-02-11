export default DebugNode;
export function debug(node: Node, callback?: Function | null): DebugNode;
declare class DebugNode extends TempNode {
    constructor(node: any, callback?: null);
    node: any;
    callback: any;
    getNodeType(builder: any): any;
    setup(builder: any): any;
    analyze(builder: any): any;
    generate(builder: any): any;
}
import TempNode from '../core/TempNode.js';
