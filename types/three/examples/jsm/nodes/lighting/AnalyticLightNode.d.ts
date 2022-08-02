import LightingNode from './LightingNode';
import { Light } from '../../../../src/Three';
import Node from '../core/Node';
import NodeFrame from '../core/NodeFrame';

export default class AnalyticLightNode<T extends Light> extends LightingNode {
    light: T | null;
    colorNode: Node;

    constructor(light?: T | null);
}
