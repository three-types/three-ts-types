export default UserDataNode;
export function userData(name: string, inputType: string, userData: Object | null): UserDataNode;
/**
 * A special type of reference node that allows to link values in
 * `userData` fields to node objects.
 * ```js
 * sprite.userData.rotation = 1; // stores individual rotation per sprite
 *
 * const material = new THREE.SpriteNodeMaterial();
 * material.rotationNode = userData( 'rotation', 'float' );
 * ```
 * Since `UserDataNode` is extended from {@link ReferenceNode}, the node value
 * will automatically be updated when the `rotation` user data field changes.
 *
 * @augments ReferenceNode
 */
declare class UserDataNode extends ReferenceNode {
    /**
     * Constructs a new user data node.
     *
     * @param {string} property - The property name that should be referenced by the node.
     * @param {string} inputType - The node data type of the reference.
     * @param {?Object} [userData=null] - A reference to the `userData` object. If not provided, the `userData` property of the 3D object that uses the node material is evaluated.
     */
    constructor(property: string, inputType: string, userData?: Object | null);
    /**
     * A reference to the `userData` object. If not provided, the `userData`
     * property of the 3D object that uses the node material is evaluated.
     *
     * @type {?Object}
     * @default null
     */
    userData: Object | null;
}
import ReferenceNode from './ReferenceNode.js';
