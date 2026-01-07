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
/**
 * Converts a direction vector to a face direction vector based on the material's side.
 *
 * If the material is set to `BackSide`, the direction is inverted.
 * If the material is set to `DoubleSide`, the direction is multiplied by `faceDirection`.
 *
 * @tsl
 * @param {Node<vec3>} direction - The direction vector to convert.
 * @returns {Node<vec3>} The converted direction vector.
 */
export const directionToFaceDirection: () => void;
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
