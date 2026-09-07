export default LightingNode;
/**
 * Base class for lighting nodes.
 *
 * @augments Node
 */
declare class LightingNode extends Node {
    /**
     * Constructs a new lighting node.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLightingNode: boolean;
}
import Node from '../core/Node.js';
