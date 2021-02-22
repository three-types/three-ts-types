import Node from './Node';
import NodeBuilder from './NodeBuilder';

export class InputNode extends Node {
    constant: boolean;
    isInputNode: boolean;

    constructor(type: string);

    setConst: (value: boolean) => InputNode;

    getConst: () => boolean;

    generateConst: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder) => string;

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default InputNode;
