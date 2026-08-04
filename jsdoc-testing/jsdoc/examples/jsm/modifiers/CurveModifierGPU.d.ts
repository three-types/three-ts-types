/**
 * A modifier for making meshes bend around curves.
 *
 * This module can only be used with {@link WebGPURenderer}. When using {@link WebGLRenderer},
 * import the class from `CurveModifier.js`.
 *
 * @three_import import { Flow } from 'three/addons/modifiers/CurveModifierGPU.js';
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
import { DataTexture } from 'three';
import { Mesh } from 'three';
