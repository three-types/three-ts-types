export default class ExpressionNode extends Node {
    snippet: string;

    constructor(snippet?: string, nodeType?: string);
}

export const expression: (snippet: string, nodeType?: string) => ExpressionNode;
