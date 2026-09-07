/**
 * Computes the world-space bounding box of all voxelizable meshes.
 *
 * @param {Scene} scene - The scene.
 * @param {Layers} layers - Only objects that pass the layer test are considered.
 * @param {Set<Object3D>} exclude - Objects to skip.
 * @param {Box3} target - The target box.
 * @return {Box3} The bounding box.
 */
export function computeSceneBounds(scene: Scene, layers: Layers, exclude: Set<Object3D>, target: Box3): Box3;
/**
 * Collects the triangles of all meshes in the scene as flat, world-space records suitable
 * for GPU voxelization. Per-triangle albedo and emissive colors are resolved on the CPU
 * (material color multiplied with a texture lookup at the triangle's centroid). Large
 * triangles are subdivided so every record covers a bounded number of voxels.
 *
 * @param {Scene} scene - The scene.
 * @param {Object} options - Options.
 * @param {Box3} options.bounds - Triangles outside these bounds are skipped.
 * @param {Layers} options.layers - Objects must pass this layer test.
 * @param {Set<Object3D>} options.exclude - Objects to skip.
 * @param {number} options.subVoxelSize - Size of a sub-voxel in world units.
 * @param {number} options.maxEdge - Maximum triangle edge length in sub-voxels before subdivision.
 * @param {number} options.minOpacity - Triangles with lower opacity are skipped.
 * @return {{data: Float32Array, count: number}} The triangle records and triangle count.
 */
export function collectSceneTriangles(scene: Scene, options: {
    bounds: Box3;
    layers: Layers;
    exclude: Set<Object3D>;
    subVoxelSize: number;
    maxEdge: number;
    minOpacity: number;
}): {
    data: Float32Array;
    count: number;
};
/**
 * Number of floats per triangle record: three positions (vec4 each, w unused),
 * albedo (rgb + side flag) and emissive (rgb + unused).
 */
export const TRIANGLE_STRIDE: 20;
import { Box3 } from 'three/webgpu';
