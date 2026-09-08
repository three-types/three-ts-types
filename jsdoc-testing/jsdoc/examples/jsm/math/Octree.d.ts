/**
 * An octree is a hierarchical tree data structure used to partition a three-dimensional
 * space by recursively subdividing it into eight octants.
 *
 * This particular implementation can have up to sixteen levels and stores up to eight triangles
 * in leaf nodes.
 *
 * `Octree` can be used in games to compute collision between the game world and colliders from
 * the player or other dynamic 3D objects.
 *
 *
 * ```js
 * const octree = new Octree().fromGraphNode( scene );
 * const result = octree.capsuleIntersect( playerCollider ); // collision detection
 * ```
 *
 * @three_import import { Octree } from 'three/addons/math/Octree.js';
 */
export class Octree {
    /**
     * Constructs a new Octree.
     *
     * @param {Box3} [box] - The base box with enclose the entire Octree.
     */
    constructor(box?: Box3);
    /**
     * The base box with enclose the entire Octree.
     *
     * @type {Box3}
     */
    box: Box3;
    /**
     * The bounds of the Octree. Compared to {@link Octree#box}, no
     * margin is applied.
     *
     * @type {Box3}
     */
    bounds: Box3;
    /**
     * Can by used for layers configuration for refine testing.
     *
     * @type {Layers}
     */
    layers: Layers;
    /**
     * The number of triangles a leaf can store before it is split.
     *
     * @type {number}
     * @default 8
     */
    trianglesPerLeaf: number;
    /**
     * The maximum level of the Octree. It defines the maximum
     * hierarchical depth of the data structure.
     *
     * @type {number}
     * @default 16
     */
    maxLevel: number;
    subTrees: any[];
    triangles: any[];
    /**
     * Adds the given triangle to the Octree. The triangle vertices are clamped if they exceed
     * the bounds of the Octree.
     *
     * @param {Triangle} triangle - The triangle to add.
     * @return {Octree} A reference to this Octree.
     */
    addTriangle(triangle: Triangle): Octree;
    /**
     * Prepares {@link Octree#box} for the build.
     *
     * @return {Octree} A reference to this Octree.
     */
    calcBox(): Octree;
    /**
     * Splits the Octree. This method is used recursively when
     * building the Octree.
     *
     * @param {number} level - The current level.
     * @return {Octree} A reference to this Octree.
     */
    split(level: number): Octree;
    /**
     * Builds the Octree.
     *
     * @return {Octree} A reference to this Octree.
     */
    build(): Octree;
    /**
     * Computes the triangles that potentially intersect with the given ray.
     *
     * @param {Ray} ray - The ray to test.
     * @param {Array<Triangle>} triangles - The target array that holds the triangles.
     */
    getRayTriangles(ray: Ray, triangles: Array<Triangle>): void;
    /**
     * Computes the intersection between the given capsule and triangle.
     *
     * @param {Capsule} capsule - The capsule to test.
     * @param {Triangle} triangle - The triangle to test.
     * @return {Object|false} The intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    triangleCapsuleIntersect(capsule: Capsule, triangle: Triangle): Object | false;
    /**
     * Computes the intersection between the given bounding box and triangle.
     *
     * @param {Box3} box - The bounding box to test.
     * @param {Triangle} triangle - The triangle to test.
     * @return {Object|false} The intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    triangleBoxIntersect(box: Box3, triangle: Triangle): Object | false;
    /**
     * Computes the intersection between the given sphere and triangle.
     *
     * @param {Sphere} sphere - The sphere to test.
     * @param {Triangle} triangle - The triangle to test.
     * @return {Object|false} The intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    triangleSphereIntersect(sphere: Sphere, triangle: Triangle): Object | false;
    /**
     * Computes the triangles that potentially intersect with the given bounding sphere.
     *
     * @param {Sphere} sphere - The sphere to test.
     * @param {Array<Triangle>} triangles - The target array that holds the triangles.
     */
    getSphereTriangles(sphere: Sphere, triangles: Array<Triangle>): void;
    /**
     * Computes the triangles that potentially intersect with the given bounding box.
     *
     * @param {Box3} box - The bounding box.
     * @param {Array<Triangle>} triangles - The target array that holds the triangles.
     */
    getBoxTriangles(box: Box3, triangles: Array<Triangle>): void;
    /**
     * Computes the triangles that potentially intersect with the given capsule.
     *
     * @param {Capsule} capsule - The capsule to test.
     * @param {Array<Triangle>} triangles - The target array that holds the triangles.
     */
    getCapsuleTriangles(capsule: Capsule, triangles: Array<Triangle>): void;
    /**
     * Performs a bounding box intersection test with this Octree.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {Object|boolean} The intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    boxIntersect(box: Box3): Object | boolean;
    /**
     * Performs a bounding sphere intersection test with this Octree.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @return {Object|boolean} The intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    sphereIntersect(sphere: Sphere): Object | boolean;
    /**
     * Performs a capsule intersection test with this Octree.
     *
     * @param {Capsule} capsule - The capsule to test.
     * @return {Object|boolean} The intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    capsuleIntersect(capsule: Capsule): Object | boolean;
    /**
     * Performs a ray intersection test with this Octree.
     *
     * @param {Ray} ray - The ray to test.
     * @return {Object|boolean} The nearest intersection object. If no intersection
     * is detected, the method returns `false`.
     */
    rayIntersect(ray: Ray): Object | boolean;
    /**
     * Constructs the Octree from the given 3D object.
     *
     * @param {Object3D} group - The scene graph node.
     * @return {Octree} A reference to this Octree.
     */
    fromGraphNode(group: Object3D): Octree;
    /**
     * Clears the Octree by making it empty.
     *
     * @return {Octree} A reference to this Octree.
     */
    clear(): Octree;
}
import { Box3 } from 'three';
import { Layers } from 'three';
import { Triangle } from 'three';
import { Capsule } from '../math/Capsule.js';
import { Sphere } from 'three';
