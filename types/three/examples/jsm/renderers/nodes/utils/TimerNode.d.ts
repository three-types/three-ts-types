import FloatNode from '../inputs/FloatNode.js';
import NodeFrame from '../core/NodeFrame.js';

export class TimerNode extends FloatNode {
    updateType: string;
    value: number;

    constructor();

    update: <TFrame extends NodeFrame = NodeFrame>(frame: TFrame) => void;
}

export default TimerNode;
