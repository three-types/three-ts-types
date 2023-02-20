import { NodeTypeOption } from './constants.js';
import Node from './Node.js';
import NodeBuilder from './NodeBuilder.js';

export interface CodeNodeInclude {
    build(builder: NodeBuilder): void;
}

export default class CodeNode extends Node {
    isCodeNode: true;
    code: string;
    constructor(code?: string, includes?: CodeNodeInclude[]);

    setIncludes(includes: CodeNodeInclude[]): this;
    getIncludes(builder: NodeBuilder): CodeNodeInclude[];
}
