import Node from './Node';
import NodeBuilder from './NodeBuilder';

export default class AttributeNode extends Node {
    name: string;

    constructor(name: string, type: string);

    setAttributeName: (name: string) => AttributeNode;

    getAttributeName: <TBuilder extends NodeBuilder = NodeBuilder>(builder?: TBuilder) => string;
}
