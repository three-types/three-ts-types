export default AmbientLightNode;
/**
 * Module for representing ambient lights as nodes.
 *
 * @augments AnalyticLightNode
 */
declare class AmbientLightNode extends AnalyticLightNode {
    setup({ context }: {
        context: any;
    }): void;
}
import AnalyticLightNode from './AnalyticLightNode.js';
