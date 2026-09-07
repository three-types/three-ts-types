/**
 * A modifier for making meshes bend around curves.
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * import the class from `CurveModifierGPU.js`.
 *
 * @three_import import { Flow } from 'three/addons/modifiers/CurveModifier.js';
 */
export class Flow {
    /**
     * Constructs a new Flow instance.
     *
     * @param {Mesh} mesh - The mesh to clone and modify to bend around the curve.
     * @param {number} numberOfCurves - The amount of space that should preallocated for additional curves.
     */
    constructor(mesh: Mesh, numberOfCurves?: number);
    curveArray: any[];
    curveLengthArray: any[];
    object3D: import("three").Object3D;
    splineTexture: DataTexture;
    uniforms: Object;
    /**
     * Updates the curve for the given curve index.
     *
     * @param {number} index - The curve index.
     * @param {Curve} curve - The curve that should be used to bend the mesh.
     */
    updateCurve(index: number, curve: Curve): void;
    /**
     * Moves the mesh along the curve.
     *
     * @param {number} amount - The offset.
     */
    moveAlongCurve(amount: number): void;
}
/**
 * An instanced version of {@link Flow} for making meshes bend around curves, where the instances are placed on the curve.
 *
 * This module can only be used with {@link WebGLRenderer}.
 *
 * @augments Flow
 * @three_import import { InstancedFlow } from 'three/addons/modifiers/CurveModifier.js';
 */
export class InstancedFlow extends Flow {
    /**
     * Constructs a new InstancedFlow instance.
     *
     * @param {number} count - The number of instanced elements.
     * @param {number} curveCount - The number of curves to preallocate for.
     * @param {Geometry} geometry - The geometry to use for the instanced mesh.
     * @param {Material} material - The material to use for the instanced mesh.
     */
    constructor(count: number, curveCount: number, geometry: Geometry, material: Material);
    offsets: any[];
    whichCurve: any[];
    /**
     * The extra information about which curve and curve position is stored in the translation components of the matrix for the instanced objects
     * This writes that information to the matrix and marks it as needing update.
     *
     * @param {number} index - The index of tge instanced element to update.
     */
    writeChanges(index: number): void;
    /**
     * Move an individual element along the curve by a specific amount.
     *
     * @param {number} index - Which element to update.
     * @param {number} offset - The offset.
     */
    moveIndividualAlongCurve(index: number, offset: number): void;
    /**
     * Select which curve to use for an element.
     *
     * @param {number} index - The index of the instanced element to update.
     * @param {number} curveNo - The index of the curve it should use.
     */
    setCurve(index: number, curveNo: number): void;
}
import { DataTexture } from 'three';
import { Mesh } from 'three';
