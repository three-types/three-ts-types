export default InstancedMeshNode;
/**
 * TSL function for creating an instanced mesh node.
 *
 * @tsl
 * @function
 * @param {InstancedMesh} instancedMesh - The instancedMesh.
 * @returns {InstancedMeshNode}
 */
export const instancedMesh: any;
/**
 * This is a special version of `InstanceNode` which requires the usage of {@link InstancedMesh}.
 * It allows an easier setup of the instance node.
 *
 * @augments InstanceNode
 */
declare class InstancedMeshNode extends InstanceNode {
    /**
     * Constructs a new instanced mesh node.
     *
     * @param {InstancedMesh} instancedMesh - The instanced mesh.
     */
    constructor(instancedMesh: InstancedMesh);
    /**
     * A reference to the instanced mesh.
     *
     * @type {InstancedMesh}
     */
    instancedMesh: InstancedMesh;
}
import InstanceNode from './InstanceNode.js';
