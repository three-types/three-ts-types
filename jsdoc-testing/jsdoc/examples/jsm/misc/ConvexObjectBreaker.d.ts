/**
 * This class can be used to subdivide a convex Geometry object into pieces.
 *
 * Use the function prepareBreakableObject to prepare a Mesh object to be broken.
 * Then, call the various functions to subdivide the object (subdivideByImpact, cutByPlane).
 * Sub-objects that are product of subdivision don't need prepareBreakableObject to be called on them.
 *
 * Requisites for the object:
 * - Mesh object must have a buffer geometry and a material.
 * - Vertex normals must be planar (not smoothed).
 * - The geometry must be convex (this is not checked in the library). You can create convex
 * geometries with {@link ConvexGeometry}. The {@link BoxGeometry}, {@link SphereGeometry} and other
 * convex primitives can also be used.
 *
 * Note: This lib adds member variables to object's userData member (see prepareBreakableObject function)
 * Use with caution and read the code when using with other libs.
 *
 * @three_import import { ConvexObjectBreaker } from 'three/addons/misc/ConvexObjectBreaker.js';
 */
export class ConvexObjectBreaker {
    static transformFreeVector(v: any, m: any): any;
    static transformFreeVectorInverse(v: any, m: any): any;
    static transformTiedVectorInverse(v: any, m: any): any;
    static transformPlaneToLocalSpace(plane: any, m: any, resultPlane: any): void;
    /**
     * Constructs a new convex object breaker.
     *
     * @param {number} [minSizeForBreak=1.4] - Min size a debris can have to break.
     * @param {number} [smallDelta=0.0001] - Max distance to consider that a point belongs to a plane.
     */
    constructor(minSizeForBreak?: number, smallDelta?: number);
    minSizeForBreak: number;
    smallDelta: number;
    tempLine1: Line3;
    tempPlane1: Plane;
    tempPlane2: Plane;
    tempPlane_Cut: Plane;
    tempCM1: Vector3;
    tempCM2: Vector3;
    tempVector3: Vector3;
    tempVector3_2: Vector3;
    tempVector3_3: Vector3;
    tempVector3_P0: Vector3;
    tempVector3_P1: Vector3;
    tempVector3_P2: Vector3;
    tempVector3_N0: Vector3;
    tempVector3_N1: Vector3;
    tempVector3_AB: Vector3;
    tempVector3_CB: Vector3;
    tempResultObjects: {
        object1: null;
        object2: null;
    };
    segments: boolean[];
    /**
     * Must be called for all 3D objects that should be breakable.
     *
     * @param {Object3D} object - The 3D object. It must have a convex geometry.
     * @param {number} mass - The 3D object's mass in kg. Must be greater than `0`.
     * @param {Vector3} velocity - The 3D object's velocity.
     * @param {Vector3} angularVelocity - The 3D object's angular velocity.
     * @param {boolean} breakable - Whether the 3D object is breakable or not.
     */
    prepareBreakableObject(object: Object3D, mass: number, velocity: Vector3, angularVelocity: Vector3, breakable: boolean): void;
    /**
     * Subdivides the given 3D object into pieces by an impact (meaning another object hits
     * the given 3D object at a certain surface point).
     *
     * @param {Object3D} object - The 3D object to subdivide.
     * @param {Vector3} pointOfImpact - The point of impact.
     * @param {Vector3} normal - The impact normal.
     * @param {number} maxRadialIterations - Iterations for radial cuts.
     * @param {number} maxRandomIterations - Max random iterations for not-radial cuts.
     * @return {Array<Object3D>} The array of pieces.
     */
    subdivideByImpact(object: Object3D, pointOfImpact: Vector3, normal: Vector3, maxRadialIterations: number, maxRandomIterations: number): Array<Object3D>;
    /**
     * Subdivides the given 3D object into pieces by a plane.
     *
     * @param {Object3D} object - The 3D object to subdivide.
     * @param {Plane} plane - The plane to cut the 3D object.
     * @param {{object1:?Mesh,object2:?Mesh}} output - An object that stores the pieces.
     * @return {number} The number of pieces.
     */
    cutByPlane(object: Object3D, plane: Plane, output: {
        object1: Mesh | null;
        object2: Mesh | null;
    }): number;
}
import { Line3 } from 'three';
import { Plane } from 'three';
import { Vector3 } from 'three';
import { Mesh } from 'three';
