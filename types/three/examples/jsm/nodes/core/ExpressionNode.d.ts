import { NodeTypeOption } from './constants.js';
import TempNode from './TempNode.js';

export default class ExpressionNode extends TempNode {
    snipped: string; /* sic */
    constructor(snipped?: string, nodeType?: NodeTypeOption);
}
