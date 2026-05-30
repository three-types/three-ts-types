/**
 * ~Options
 */
export type SceneOptimizer = {
    /**
     * - Whether to enable debug mode or not.
     */
    debug?: boolean | undefined;
};
/**
 * This class can be used to optimized scenes by converting
 * individual meshes into {@link BatchedMesh}. This component
 * is an experimental attempt to implement auto-batching in three.js.
 *
 * @three_import import { SceneOptimizer } from 'three/addons/utils/SceneOptimizer.js';
 */
export class SceneOptimizer {
    /**
     * Constructs a new scene optimizer.
     *
     * @param {Scene} scene - The scene to optimize.
     * @param {SceneOptimizer~Options} options - The configuration options.
     */
    constructor(scene: Scene, options?: {});
    scene: Scene;
    debug: any;
    _bufferToHash(buffer: any): number;
    _getMaterialPropertiesHash(material: any): string;
    _getAttributesSignature(geometry: any): string;
    _getGeometryHash(geometry: any): string;
    _getBatchKey(materialProps: any, attributesSignature: any): string;
    _analyzeModel(): {
        batchGroups: Map<any, any>;
        singleGroups: Map<any, any>;
        uniqueGeometries: number;
    };
    _createBatchedMeshes(batchGroups: any): Set<any>;
    /**
     * Removes empty nodes from all descendants of the given 3D object.
     *
     * @param {Object3D} object - The 3D object to process.
     */
    removeEmptyNodes(object: Object3D): void;
    /**
     * Removes the given array of meshes from the scene.
     *
     * @param {Set<Mesh>} meshesToRemove - The meshes to remove.
     */
    disposeMeshes(meshesToRemove: Set<Mesh>): void;
    _logDebugInfo(stats: any): void;
    /**
     * Performs the auto-baching by identifying groups of meshes in the scene
     * that can be represented as a single {@link BatchedMesh}. The method modifies
     * the scene by adding instances of `BatchedMesh` and removing the now redundant
     * individual meshes.
     *
     * @return {Scene} The optimized scene.
     */
    toBatchedMesh(): Scene;
    /**
     * Performs the auto-instancing by identifying groups of meshes in the scene
     * that can be represented as a single {@link InstancedMesh}. The method modifies
     * the scene by adding instances of `InstancedMesh` and removing the now redundant
     * individual meshes.
     *
     * This method is not yet implemented.
     *
     * @abstract
     * @return {Scene} The optimized scene.
     */
    toInstancingMesh(): Scene;
}
