import NodeFunction from "../../../nodes/core/NodeFunction";

export default class WGSLNodeFunction extends NodeFunction {
    constructor(source: string);
    getCode(name?: string);
}
