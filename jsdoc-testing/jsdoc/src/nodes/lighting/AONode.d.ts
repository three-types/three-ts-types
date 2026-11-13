export default AONode;
/**
 * A generic class that can be used by nodes which contribute
 * ambient occlusion to the scene. E.g. an ambient occlusion map
 * node can be used as input for this module. Used in {@link NodeMaterial}.
 *
 * @augments LightingNode
 */
declare class AONode extends LightingNode {
    /**
     * Constructs a new AO node.
     *
     * @param {?Node<float>} [aoNode=null] - The ambient occlusion node.
     */
    constructor(aoNode?: Node<float> | null);
    /**
     * The ambient occlusion node.
     *
     * @type {?Node<float>}
     * @default null
     */
    aoNode: Node<float> | null;
    setup(builder: any): void;
}
import LightingNode from './LightingNode.js';
