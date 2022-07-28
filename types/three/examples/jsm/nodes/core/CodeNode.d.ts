import { NodeTypeOption } from './constants';
import Node from './Node';
import NodeBuilder from './NodeBuilder';

export default class CodeNode extends Node {
    isCodeNode: true;
    code: string;
    constructor(code: string, nodeType?: NodeTypeOption);

    setIncludes(includes: any[]): this;
    getIncludes(builder: NodeBuilder): any[];
}
