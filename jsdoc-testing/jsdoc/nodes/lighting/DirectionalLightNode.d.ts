export default DirectionalLightNode;
/**
 * Module for representing directional lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class DirectionalLightNode extends AnalyticLightNode {
    setupDirect(): {
        lightDirection: any;
        lightColor: Node;
    };
}
import AnalyticLightNode from './AnalyticLightNode.js';
