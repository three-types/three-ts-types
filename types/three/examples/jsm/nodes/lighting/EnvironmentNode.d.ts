import LightingNode from './LightingNode';

export default class EnvironmentNode extends LightingNode {
    envNode: Node | null;

    constructor(envNode?: Node);
}
