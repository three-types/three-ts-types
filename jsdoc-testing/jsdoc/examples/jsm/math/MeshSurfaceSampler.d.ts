/**
 * Utility class for sampling weighted random points on the surface of a mesh.
 *
 * Building the sampler is a one-time O(n) operation. Once built, any number of
 * random samples may be selected in O(logn) time. Memory usage is O(n).
 *
 * References:
 * - {@link http://www.joesfer.com/?p=84}
 * - {@link https://stackoverflow.com/a/4322940/1314762}
 *
 * ```js
 * const sampler = new MeshSurfaceSampler( surfaceMesh )
 * 	.setWeightAttribute( 'color' )
 * 	.build();
 *
 * const mesh = new THREE.InstancedMesh( sampleGeometry, sampleMaterial, 100 );
 *
 * const position = new THREE.Vector3();
 * const matrix = new THREE.Matrix4();
 *
 * // Sample randomly from the surface, creating an instance of the sample geometry at each sample point.
 *
 * for ( let i = 0; i < 100; i ++ ) {
 *
 * 	sampler.sample( position );
 * 	matrix.makeTranslation( position.x, position.y, position.z );
 * 	mesh.setMatrixAt( i, matrix );
 *
 * }
 *
 * scene.add( mesh );
 * ```
 *
 * @three_import import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
 */
export class MeshSurfaceSampler {
    /**
     * Constructs a mesh surface sampler.
     *
     * @param {Mesh} mesh - Surface mesh from which to sample.
     */
    constructor(mesh: Mesh);
    geometry: any;
    randomFunction: () => number;
    indexAttribute: any;
    positionAttribute: any;
    normalAttribute: any;
    colorAttribute: any;
    uvAttribute: any;
    weightAttribute: any;
    distribution: Float32Array<ArrayBuffer> | null;
    /**
     * Specifies a vertex attribute to be used as a weight when sampling from the surface.
     * Faces with higher weights are more likely to be sampled, and those with weights of
     * zero will not be sampled at all. For vector attributes, only .x is used in sampling.
     *
     * If no weight attribute is selected, sampling is randomly distributed by area.
     *
     * @param {string} name - The attribute name.
     * @return {MeshSurfaceSampler} A reference to this sampler.
     */
    setWeightAttribute(name: string): MeshSurfaceSampler;
    /**
     * Processes the input geometry and prepares to return samples. Any configuration of the
     * geometry or sampler must occur before this method is called. Time complexity is O(n)
     * for a surface with n faces.
     *
     * @return {MeshSurfaceSampler} A reference to this sampler.
     */
    build(): MeshSurfaceSampler;
    /**
     * Allows to set a custom random number generator. Default is `Math.random()`.
     *
     * @param {Function} randomFunction - A random number generator.
     * @return {MeshSurfaceSampler} A reference to this sampler.
     */
    setRandomGenerator(randomFunction: Function): MeshSurfaceSampler;
    /**
     * Selects a random point on the surface of the input geometry, returning the
     * position and optionally the normal vector, color and UV Coordinate at that point.
     * Time complexity is O(log n) for a surface with n faces.
     *
     * @param {Vector3} targetPosition - The target object holding the sampled position.
     * @param {Vector3} targetNormal - The target object holding the sampled normal.
     * @param {Color} targetColor - The target object holding the sampled color.
     * @param {Vector2} targetUV -  The target object holding the sampled uv coordinates.
     * @return {MeshSurfaceSampler} A reference to this sampler.
     */
    sample(targetPosition: Vector3, targetNormal: Vector3, targetColor: Color, targetUV: Vector2): MeshSurfaceSampler;
    _sampleFaceIndex(): number;
    _binarySearch(x: any): number;
    _sampleFace(faceIndex: any, targetPosition: any, targetNormal: any, targetColor: any, targetUV: any): this;
}
import { Vector3 } from 'three';
import { Vector2 } from 'three';
