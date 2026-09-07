export default MaterialReferenceNode;
export function materialReference(name: string, type: string, material?: Material | null): MaterialReferenceNode;
/**
 * This node is a special type of reference node which is intended
 * for linking material properties with node values.
 * ```js
 * const opacityNode = materialReference( 'opacity', 'float', material );
 * ```
 * When changing `material.opacity`, the node value of `opacityNode` will
 * automatically be updated.
 *
 * @augments ReferenceNode
 */
declare class MaterialReferenceNode extends ReferenceNode {
    /**
     * Constructs a new material reference node.
     *
     * @param {string} property - The name of the property the node refers to.
     * @param {string} inputType - The uniform type that should be used to represent the property value.
     * @param {?Material} [material=null] - The material the property belongs to. When no material is set,
     * the node refers to the material of the current rendered object.
     */
    constructor(property: string, inputType: string, material?: Material | null);
    /**
     * The material the property belongs to. When no material is set,
     * the node refers to the material of the current rendered object.
     *
     * @type {?Material}
     * @default null
     */
    material: Material | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMaterialReferenceNode: boolean;
}
import ReferenceNode from './ReferenceNode.js';
