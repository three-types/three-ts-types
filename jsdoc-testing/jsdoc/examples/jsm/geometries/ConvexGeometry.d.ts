/**
 * This class can be used to generate a convex hull for a given array of 3D points.
 * The average time complexity for this task is considered to be O(nlog(n)).
 *
 * ```js
 * const geometry = new ConvexGeometry( points );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @three_import import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
 */
export class ConvexGeometry extends BufferGeometry {
    /**
     * Constructs a new convex geometry.
     *
     * @param {Array<Vector3>} points - An array of points in 3D space which should be enclosed by the convex hull.
     */
    constructor(points?: Array<Vector3>);
}
import { BufferGeometry } from 'three';
