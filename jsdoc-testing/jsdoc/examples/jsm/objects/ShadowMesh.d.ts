/**
 * A Shadow Mesh that follows a shadow-casting mesh in the scene,
 * but is confined to a single plane. This technique can be used as
 * a very performant alternative to classic shadow mapping. However,
 * it has serious limitations like:
 *
 * - Shadows can only be casted on flat planes.
 * - No soft shadows support.
 *
 * ```js
 * const cubeShadow = new ShadowMesh( cube );
 * scene.add( cubeShadow );
 * ```
 *
 * @augments Mesh
 * @three_import import { ShadowMesh } from 'three/addons/objects/ShadowMesh.js';
 */
export class ShadowMesh extends Mesh {
    /**
     * Constructs a new shadow mesh.
     *
     * @param {Mesh} mesh - The shadow-casting reference mesh.
     */
    constructor(mesh: Mesh);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowMesh: boolean;
    /**
     * Represent the world matrix of the reference mesh.
     *
     * @type {Matrix4}
     */
    meshMatrix: Matrix4;
    /**
     * Updates the shadow mesh so it follows its shadow-casting reference mesh.
     *
     * @param {Plane} plane - The plane onto the shadow mesh is projected.
     * @param {Vector4} lightPosition4D - The light position.
     */
    update(plane: Plane, lightPosition4D: Vector4): void;
}
import { Mesh } from 'three';
import { Matrix4 } from 'three';
