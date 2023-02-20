import AnalyticLightNode from './AnalyticLightNode.js';
import Node from '../core/Node.js';
import { PointLight, SpotLight } from '../../../../src/Three.js';

export type PunctualLight = PointLight | SpotLight;

export default class PunctualLightNode extends AnalyticLightNode<PunctualLight> {
    cutoffDistanceNode: Node;
    decayExponentNode: Node;

    constructor(light?: PunctualLight | null);
}
