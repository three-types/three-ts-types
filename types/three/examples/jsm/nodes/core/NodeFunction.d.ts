import NodeFunctionInput from './NodeFunctionInput';

export default class NodeFunction {
    isNodeFunction: true;
    type: string;
    inputs: NodeFunctionInput[];
    name: string;
    presicion: string;

    constructor(type: string, inputs: NodeFunctionInput[], name?: string, presicion?: string);

    getCode(name?: string): string;
}
