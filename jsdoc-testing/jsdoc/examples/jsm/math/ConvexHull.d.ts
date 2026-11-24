/**
 * Can be used to compute the convex hull in 3D space for a given set of points. It
 * is primarily intended for {@link ConvexGeometry}.
 *
 * This Quickhull 3D implementation is a port of [quickhull3d](https://github.com/maurizzzio/quickhull3d/)
 * by Mauricio Poppe.
 *
 * @three_import import { ConvexHull } from 'three/addons/math/ConvexHull.js';
 */
export class ConvexHull {
    tolerance: number;
    faces: any[];
    newFaces: any[];
    assigned: VertexList;
    unassigned: VertexList;
    vertices: any[];
    /**
     * Computes to convex hull for the given array of points.
     *
     * @param {Array<Vector3>} points - The array of points in 3D space.
     * @return {ConvexHull} A reference to this convex hull.
     */
    setFromPoints(points: Array<Vector3>): ConvexHull;
    /**
     * Computes the convex hull of the given 3D object (including its descendants),
     * accounting for the world transforms of both the 3D object and its descendants.
     *
     * @param {Object3D} object - The 3D object to compute the convex hull for.
     * @return {ConvexHull} A reference to this convex hull.
     */
    setFromObject(object: Object3D): ConvexHull;
    /**
     * Returns `true` if the given point lies in the convex hull.
     *
     * @param {Vector3} point - The point to test.
     * @return {boolean} Whether the given point lies in the convex hull or not.
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Computes the intersections point of the given ray and this convex hull.
     *
     * @param {Ray} ray - The ray to test.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {?Vector3} The intersection point. Returns `null` if not intersection was detected.
     */
    intersectRay(ray: Ray, target: Vector3): Vector3 | null;
    /**
     * Returns `true` if the given ray intersects with this convex hull.
     *
     * @param {Ray} ray - The ray to test.
     * @return {boolean} Whether the given ray intersects with this convex hull or not.
     */
    intersectsRay(ray: Ray): boolean;
    /**
     * Makes the convex hull empty.
     *
     * @return {ConvexHull} A reference to this convex hull.
     */
    makeEmpty(): ConvexHull;
    /**
     * Adds a vertex to the 'assigned' list of vertices and assigns it to the given face.
     *
     * @private
     * @param {VertexNode} vertex - The vertex to add.
     * @param {Face} face - The target face.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _addVertexToFace;
    /**
     * Removes a vertex from the 'assigned' list of vertices and from the given face.
     * It also makes sure that the link from 'face' to the first vertex it sees in 'assigned'
     * is linked correctly after the removal.
     *
     * @private
     * @param {VertexNode} vertex - The vertex to remove.
     * @param {Face} face - The target face.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _removeVertexFromFace;
    /**
     * Removes all the visible vertices that a given face is able to see which are stored in
     * the 'assigned' vertex list.
     *
     * @private
     * @param {Face} face - The target face.
     * @return {VertexNode|undefined} A reference to this convex hull.
     */
    private _removeAllVerticesFromFace;
    /**
     * Removes all the visible vertices that `face` is able to see.
     *
     * - If `absorbingFace` doesn't exist, then all the removed vertices will be added to the 'unassigned' vertex list.
     * - If `absorbingFace` exists, then this method will assign all the vertices of 'face' that can see 'absorbingFace'.
     * - If a vertex cannot see `absorbingFace`, it's added to the 'unassigned' vertex list.
     *
     * @private
     * @param {Face} face - The given face.
     * @param {Face} [absorbingFace] - An optional face that tries to absorb the vertices of the first face.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _deleteFaceVertices;
    /**
     * Reassigns as many vertices as possible from the unassigned list to the new faces.
     *
     * @private
     * @param {Array<Face>} newFaces - The new faces.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _resolveUnassignedPoints;
    /**
     * Computes the extremes values (min/max vectors) which will be used to
     * compute the initial hull.
     *
     * @private
     * @return {Object} The extremes.
     */
    private _computeExtremes;
    /**
     * Computes the initial simplex assigning to its faces all the points that are
     * candidates to form part of the hull.
     *
     * @private
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _computeInitialHull;
    /**
     * Removes inactive (e.g. deleted) faces from the internal face list.
     *
     * @private
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _reindexFaces;
    /**
     * Finds the next vertex to create faces with the current hull.
     *
     * - Let the initial face be the first face existing in the 'assigned' vertex list.
     * - If a face doesn't exist then return since there're no vertices left.
     * - Otherwise for each vertex that face sees find the one furthest away from it.
     *
     * @private
     * @return {?VertexNode} The next vertex to add.
     */
    private _nextVertexToAdd;
    /**
     * Computes a chain of half edges in CCW order called the 'horizon'. For an edge
     * to be part of the horizon it must join a face that can see 'eyePoint' and a face
     * that cannot see 'eyePoint'.
     *
     * @private
     * @param {Vector3} eyePoint - The 3D-coordinates of a point.
     * @param {HalfEdge} crossEdge - The edge used to jump to the current face.
     * @param {Face} face - The current face being tested.
     * @param {Array<HalfEdge>} horizon - The edges that form part of the horizon in CCW order.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _computeHorizon;
    /**
     * Creates a face with the vertices 'eyeVertex.point', 'horizonEdge.tail' and 'horizonEdge.head'
     * in CCW order. All the half edges are created in CCW order thus the face is always pointing
     * outside the hull.
     *
     * @private
     * @param {VertexNode} eyeVertex - The vertex that is added to the hull.
     * @param {HalfEdge} horizonEdge - A single edge of the horizon.
     * @return {HalfEdge} The half edge whose vertex is the eyeVertex.
     */
    private _addAdjoiningFace;
    /**
     * Adds 'horizon.length' faces to the hull, each face will be linked with the horizon
     * opposite face and the face on the left/right.
     *
     * @private
     * @param {VertexNode} eyeVertex - The vertex that is added to the hull.
     * @param {Array<HalfEdge>} horizon - The horizon.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _addNewFaces;
    /**
     * Adds a vertex to the hull with the following algorithm:
     *
     * - Compute the 'horizon' which is a chain of half edges. For an edge to belong to this group
     * it must be the edge connecting a face that can see 'eyeVertex' and a face which cannot see 'eyeVertex'.
     * - All the faces that can see 'eyeVertex' have its visible vertices removed from the assigned vertex list.
     * - A new set of faces is created with each edge of the 'horizon' and 'eyeVertex'. Each face is connected
     * with the opposite horizon face and the face on the left/right.
     * - The vertices removed from all the visible faces are assigned to the new faces if possible.
     *
     * @private
     * @param {VertexNode} eyeVertex - The vertex to add.
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _addVertexToHull;
    /**
     * Cleans up internal properties after computing the convex hull.
     *
     * @private
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _cleanup;
    /**
     * Starts the execution of the quick hull algorithm.
     *
     * @private
     * @return {ConvexHull} A reference to this convex hull.
     */
    private _compute;
}
/**
 * Represents a section bounded by a specific amount of half-edges.
 * The current implementation assumes that a face always consist of three edges.
 *
 * @private
 */
export class Face {
    /**
     * Creates a face from the given vertex nodes.
     *
     * @private
     * @param {VertexNode} a - The first vertex node.
     * @param {VertexNode} b - The second vertex node.
     * @param {VertexNode} c - The third vertex node.
     * @return {Face} The created face.
     */
    private static create;
    /**
     * The normal vector of the face.
     *
     * @private
     * @type {Vector3}
     */
    private normal;
    /**
     * The midpoint or centroid of the face.
     *
     * @private
     * @type {Vector3}
     */
    private midpoint;
    /**
     * The area of the face.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private area;
    /**
     * Signed distance from face to the origin.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private constant;
    /**
     * Reference to a vertex in a vertex list this face can see.
     *
     * @private
     * @type {?VertexNode}
     * @default null
     */
    private outside;
    mark: number;
    /**
     * Reference to the base edge of a face. To retrieve all edges, you can use the
     * `next` reference of the current edge.
     *
     * @private
     * @type {?HalfEdge}
     * @default null
     */
    private edge;
    /**
     * Returns an edge by the given index.
     *
     * @private
     * @param {number} i - The edge index.
     * @return {HalfEdge} The edge.
     */
    private getEdge;
    /**
     * Computes all properties of the face.
     *
     * @private
     * @return {Face} A reference to this face.
     */
    private compute;
    /**
     * Returns the signed distance from a given point to the plane representation of this face.
     *
     * @private
     * @param {Vector3} point - The point to compute the distance to.
     * @return {number} The distance.
     */
    private distanceToPoint;
}
/**
 * The basis for a half-edge data structure, also known as doubly
 * connected edge list (DCEL).
 *
 * @private
 */
export class HalfEdge {
    /**
     * Constructs a new half edge.
     *
     * @param {VertexNode} vertex - A reference to its destination vertex.
     * @param {Face} face - A reference to its face.
     */
    constructor(vertex: VertexNode, face: Face);
    /**
     * A reference to its destination vertex.
     *
     * @private
     * @type {VertexNode}
     */
    private vertex;
    /**
     * Reference to the previous half-edge of the same face.
     *
     * @private
     * @type {?HalfEdge}
     * @default null
     */
    private prev;
    /**
     * Reference to the next half-edge of the same face.
     *
     * @private
     * @type {?HalfEdge}
     * @default null
     */
    private next;
    /**
     * Reference to the twin half-edge to reach the opposite face.
     *
     * @private
     * @type {?HalfEdge}
     * @default null
     */
    private twin;
    /**
     * A reference to its face.
     *
     * @private
     * @type {Face}
     */
    private face;
    /**
     * Returns the destination vertex.
     *
     * @private
     * @return {VertexNode} The destination vertex.
     */
    private head;
    /**
     * Returns the origin vertex.
     *
     * @private
     * @return {?VertexNode} The destination vertex.
     */
    private tail;
    /**
     * Returns the Euclidean length (straight-line length) of the edge.
     *
     * @private
     * @return {number} The edge's length.
     */
    private length;
    /**
     * Returns the square of the Euclidean length (straight-line length) of the edge.
     *
     * @private
     * @return {number} The square of the edge's length.
     */
    private lengthSquared;
    /**
     * Sets the twin edge of this half-edge. It also ensures that the twin reference
     * of the given half-edge is correctly set.
     *
     * @private
     * @param {HalfEdge} edge - The twin edge to set.
     * @return {HalfEdge} A reference to this edge.
     */
    private setTwin;
}
/**
 * A vertex as a double linked list node.
 *
 * @private
 */
export class VertexNode {
    /**
     * Constructs a new vertex node.
     *
     * @param {Vector3} point - A point in 3D space.
     */
    constructor(point: Vector3);
    /**
     * A point in 3D space.
     *
     * @private
     * @type {Vector3}
     */
    private point;
    /**
     * Reference to the previous vertex in the double linked list.
     *
     * @private
     * @type {?VertexNode}
     * @default null
     */
    private prev;
    /**
     * Reference to the next vertex in the double linked list.
     *
     * @private
     * @type {?VertexNode}
     * @default null
     */
    private next;
    /**
     * Reference to the face that is able to see this vertex.
     *
     * @private
     * @type {?Face}
     * @default null
     */
    private face;
}
/**
 * A doubly linked list of vertices.
 *
 * @private
 */
export class VertexList {
    /**
     * Reference to the first vertex of the linked list.
     *
     * @private
     * @type {?VertexNode}
     * @default null
     */
    private head;
    /**
     * Reference to the last vertex of the linked list.
     *
     * @private
     * @type {?VertexNode}
     * @default null
     */
    private tail;
    /**
     * Returns the head reference.
     *
     * @private
     * @return {VertexNode} The head reference.
     */
    private first;
    /**
     * Returns the tail reference.
     *
     * @private
     * @return {VertexNode} The tail reference.
     */
    private last;
    /**
     * Clears the linked list.
     *
     * @private
     * @return {VertexList} A reference to this vertex list.
     */
    private clear;
    /**
     * Inserts a vertex before a target vertex.
     *
     * @private
     * @param {VertexNode} target - The target.
     * @param {VertexNode} vertex - The vertex to insert.
     * @return {VertexList} A reference to this vertex list.
     */
    private insertBefore;
    /**
     * Inserts a vertex after a target vertex.
     *
     * @private
     * @param {VertexNode} target - The target.
     * @param {VertexNode} vertex - The vertex to insert.
     * @return {VertexList} A reference to this vertex list.
     */
    private insertAfter;
    /**
     * Appends a vertex to this vertex list.
     *
     * @private
     * @param {VertexNode} vertex - The vertex to append.
     * @return {VertexList} A reference to this vertex list.
     */
    private append;
    /**
     * Appends a chain of vertices where the given vertex is the head.
     *
     * @private
     * @param {VertexNode} vertex - The head vertex of a chain of vertices.
     * @return {VertexList} A reference to this vertex list.
     */
    private appendChain;
    /**
     * Removes a vertex from the linked list.
     *
     * @private
     * @param {VertexNode} vertex - The vertex to remove.
     * @return {VertexList} A reference to this vertex list.
     */
    private remove;
    /**
     * Removes a sublist of vertices from the linked list.
     *
     * @private
     * @param {VertexNode} a - The head of the sublist.
     * @param {VertexNode} b - The tail of the sublist.
     * @return {VertexList} A reference to this vertex list.
     */
    private removeSubList;
    /**
     * Returns `true` if the linked list is empty.
     *
     * @private
     * @return {boolean} Whether the linked list is empty or not.
     */
    private isEmpty;
}
import { Vector3 } from 'three';
