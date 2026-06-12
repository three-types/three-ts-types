/**
 * @classdesc Can be used to include Ammo.js as a Physics engine into
 * `three.js` apps. Make sure to include `ammo.wasm.js` first:
 * ```
 * <script src="jsm/libs/ammo.wasm.js"></script>
 * ```
 * It is then possible to initialize the API via:
 * ```js
 * const physics = await AmmoPhysics();
 * ```
 *
 * @name AmmoPhysics
 * @class
 * @hideconstructor
 * @three_import import { AmmoPhysics } from 'three/addons/physics/AmmoPhysics.js';
 */
export function AmmoPhysics(): Promise<{
    /**
     * Adds the given scene to this physics simulation. Only meshes with a
     * `physics` object in their {@link Object3D#userData} field will be honored.
     * The object can be used to store the mass of the mesh. E.g.:
     * ```js
     * box.userData.physics = { mass: 1 };
     * ```
     *
     * @method
     * @name AmmoPhysics#addScene
     * @param {Object3D} scene The scene or any type of 3D object to add.
     */
    addScene: (scene: any) => void;
    /**
     * Adds the given mesh to this physics simulation.
     *
     * @method
     * @name AmmoPhysics#addMesh
     * @param {Mesh} mesh The mesh to add.
     * @param {number} [mass=0] The mass in kg of the mesh.
     * @param {number} [restitution=0] The restitution of the mesh, usually from 0 to 1. Represents how "bouncy" objects are when they collide with each other.
     */
    addMesh: (mesh: any, mass?: number, restitution?: number) => void;
    /**
     * Set the position of the given mesh which is part of the physics simulation. Calling this
     * method will reset the current simulated velocity of the mesh.
     *
     * @method
     * @name AmmoPhysics#setMeshPosition
     * @param {Mesh} mesh The mesh to update the position for.
     * @param {Vector3} position - The new position.
     * @param {number} [index=0] - If the mesh is instanced, the index represents the instanced ID.
     */
    setMeshPosition: (mesh: any, position: any, index?: number) => void;
} | undefined>;
export class AmmoPhysics {
}
