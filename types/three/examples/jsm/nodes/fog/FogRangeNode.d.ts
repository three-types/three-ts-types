import FogNode from './FogNode';

export default class FogRangeNode extends FogNode {
    isFogRangeNode: true;
    nearNode: Node;
    farNode: Node;

    constructor(colorNode: Node, nearNode: Node, farNode: Node);
}
