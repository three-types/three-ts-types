/**
 * ~IK
 */
export type CCDIKSolver = {
    /**
     * - The target bone index which refers to a bone in the `Skeleton.bones` array.
     */
    target: number;
    /**
     * - The effector bone index which refers to a bone in the `Skeleton.bones` array.
     */
    effector: number;
    /**
     * ~BoneLink>} links - An array of bone links.
     */
    "": Array<CCDIKSolver>;
    /**
     * - Iteration number of calculation. Smaller is faster but less precise.
     */
    iteration?: number | undefined;
    /**
     * - Minimum rotation angle in a step in radians.
     */
    minAngle?: number | undefined;
    /**
     * - Minimum rotation angle in a step in radians.
     */
    maxAngle?: number | undefined;
    /**
     * - The blend factor.
     */
    blendFactor?: number | undefined;
};
/**
 * This class solves the Inverse Kinematics Problem with a [CCD Algorithm](https://web.archive.org/web/20221206080850/https://sites.google.com/site/auraliusproject/ccd-algorithm).
 *
 * `CCDIKSolver` is designed to work with instances of {@link SkinnedMesh}.
 *
 * @three_import import { CCDIKSolver } from 'three/addons/animation/CCDIKSolver.js';
 */
export class CCDIKSolver {
    /**
     * @param {SkinnedMesh} mesh - The skinned mesh.
     * @param {Array<CCDIKSolver~IK>} [iks=[]] - The IK objects.
     */
    constructor(mesh: SkinnedMesh, iks?: any[]);
    /**
     * The skinned mesh.
     *
     * @type {SkinnedMesh}
     */
    mesh: SkinnedMesh;
    /**
     * The IK objects.
     *
     * @type {Array<CCDIKSolver~IK>}
     */
    iks: Array<CCDIKSolver>;
    _initialQuaternions: Quaternion[][];
    _workingQuaternion: Quaternion;
    /**
     * Updates all IK bones by solving the CCD algorithm.
     *
     * @param {number} [globalBlendFactor=1.0] - Blend factor applied if an IK chain doesn't have its own .blendFactor.
     * @return {CCDIKSolver} A reference to this instance.
     */
    update(globalBlendFactor?: number): CCDIKSolver;
    /**
     * Updates one IK bone solving the CCD algorithm.
     *
     * @param {CCDIKSolver~IK} ik - The IK to update.
     * @param {number} [overrideBlend=1.0] - If the IK object does not define `blendFactor`, this value is used.
     * @return {CCDIKSolver} A reference to this instance.
     */
    updateOne(ik: any, overrideBlend?: number): CCDIKSolver;
    /**
     * Creates a helper for visualizing the CCDIK.
     *
     * @param {number} sphereSize - The sphere size.
     * @return {CCDIKHelper} The created helper.
     */
    createHelper(sphereSize: number): CCDIKHelper;
    _valid(): void;
}
/**
 * Helper for visualizing IK bones.
 *
 * @augments Object3D
 * @three_import import { CCDIKHelper } from 'three/addons/animation/CCDIKSolver.js';
 */
export class CCDIKHelper extends Object3D {
    /**
     * @param {SkinnedMesh} mesh - The skinned mesh.
     * @param {Array<CCDIKSolver~IK>} [iks=[]] - The IK objects.
     * @param {number} [sphereSize=0.25] - The sphere size.
     */
    constructor(mesh: SkinnedMesh, iks?: any[], sphereSize?: number);
    /**
     * The skinned mesh this helper refers to.
     *
     * @type {SkinnedMesh}
     */
    root: SkinnedMesh;
    /**
     * The IK objects.
     *
     * @type {Array<CCDIKSolver~IK>}
     */
    iks: Array<CCDIKSolver>;
    /**
     * The helpers sphere geometry.
     *
     * @type {SphereGeometry}
     */
    sphereGeometry: SphereGeometry;
    /**
     * The material for the target spheres.
     *
     * @type {MeshBasicMaterial}
     */
    targetSphereMaterial: MeshBasicMaterial;
    /**
     * The material for the effector spheres.
     *
     * @type {MeshBasicMaterial}
     */
    effectorSphereMaterial: MeshBasicMaterial;
    /**
     * The material for the link spheres.
     *
     * @type {MeshBasicMaterial}
     */
    linkSphereMaterial: MeshBasicMaterial;
    /**
     * A global line material.
     *
     * @type {LineBasicMaterial}
     */
    lineMaterial: LineBasicMaterial;
    updateMatrixWorld(force: any): void;
    /**
     * Frees the GPU-related resources allocated by this instance.
     * Call this method whenever this instance is no longer used in your app.
     */
    dispose(): void;
    _init(): void;
}
import { Quaternion } from 'three';
import { Object3D } from 'three';
import { SphereGeometry } from 'three';
import { MeshBasicMaterial } from 'three';
import { LineBasicMaterial } from 'three';
