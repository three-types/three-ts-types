import Node from './Node';
import NodeBuilder from './NodeBuilder';

export default class InputNode extends Node {
    constant: boolean;
    isInputNode: boolean;

    constructor(type: string);

    setConst: (value: boolean) => InputNode;

    getConst: () => boolean;

    generateConst: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder) => string;
}
