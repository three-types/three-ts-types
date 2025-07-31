export default FrontFacingNode;
/**
 * TSL object that represents whether a primitive is front or back facing
 *
 * @tsl
 * @type {FrontFacingNode<bool>}
 */
export const frontFacing: FrontFacingNode<bool>;
/**
 * TSL object that represents the front facing status as a number instead of a bool.
 * `1` means front facing, `-1` means back facing.
 *
 * @tsl
 * @type {Node<float>}
 */
export const faceDirection: Node<any>;
export function directionToFaceDirection(...params: any[]): any;
export namespace directionToFaceDirection { }
/**
 * This node can be used to evaluate whether a primitive is front or back facing.
 *
 * @augments Node
 */
declare class FrontFacingNode extends Node {
    /**
     * Constructs a new front facing node.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isFrontFacingNode: boolean;
    generate(builder: any): any;
}
import Node from '../core/Node.js';
