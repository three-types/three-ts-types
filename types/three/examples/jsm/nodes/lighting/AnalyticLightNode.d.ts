import LightingNode from './LightingNode';
import { Light } from '../../../../src/Three';

export default class AnalyticLightNode<T extends Light> extends LightingNode {
    light: T | null;
    colorNode: Node;

    constructor(light?: T);
}
