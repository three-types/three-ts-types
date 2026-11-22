export default AmbientLightNode;
/**
 * Module for representing ambient lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class AmbientLightNode extends AnalyticLightNode {
    setup(builder: any): void;
}
import AnalyticLightNode from './AnalyticLightNode.js';
