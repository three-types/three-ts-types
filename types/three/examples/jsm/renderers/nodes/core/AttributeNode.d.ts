import Node from './Node';
import NodeBuilder from './NodeBuilder';

export class AttributeNode extends Node {
    name: string;

    constructor(name: string, type: string);

    setAttributeName: (name: string) => AttributeNode;

    getAttributeName: <TBuilder extends NodeBuilder = NodeBuilder>(builder?: TBuilder) => string;

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default AttributeNode;
