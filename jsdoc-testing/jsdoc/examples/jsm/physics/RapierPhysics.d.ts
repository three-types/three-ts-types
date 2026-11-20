/**
 * @classdesc Can be used to include Rapier as a Physics engine into
 * `three.js` apps. The API can be initialized via:
 * ```js
 * const physics = await RapierPhysics();
 * ```
 * The component automatically imports Rapier from a CDN so make sure
 * to use the component with an active Internet connection.
 *
 * @name RapierPhysics
 * @class
 * @hideconstructor
 * @three_import import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
 */
export function RapierPhysics(): Promise<{
    RAPIER: any;
    world: any;
    /**
     * Adds the given scene to this physics simulation. Only meshes with a
     * `physics` object in their {@link Object3D#userData} field will be honored.
     * The object can be used to store the mass and restitution of the mesh. E.g.:
     * ```js
     * box.userData.physics = { mass: 1, restitution: 0 };
     * ```
     *
     * @method
     * @name RapierPhysics#addScene
     * @param {Object3D} scene The scene or any type of 3D object to add.
     */
    addScene: (scene: any) => void;
    /**
     * Adds the given mesh to this physics simulation.
     *
     * @method
     * @name RapierPhysics#addMesh
     * @param {Mesh} mesh The mesh to add.
     * @param {number} [mass=0] The mass in kg of the mesh.
     * @param {number} [restitution=0] The restitution of the mesh, usually from 0 to 1. Represents how "bouncy" objects are when they collide with each other.
     */
    addMesh: (mesh: any, mass?: number, restitution?: number) => void;
    /**
     * Removes the given mesh from this physics simulation.
     *
     * @method
     * @name RapierPhysics#removeMesh
     * @param {Mesh} mesh The mesh to remove.
     */
    removeMesh: (mesh: any) => void;
    /**
     * Set the position of the given mesh which is part of the physics simulation. Calling this
     * method will reset the current simulated velocity of the mesh.
     *
     * @method
     * @name RapierPhysics#setMeshPosition
     * @param {Mesh} mesh The mesh to update the position for.
     * @param {Vector3} position - The new position.
     * @param {number} [index=0] - If the mesh is instanced, the index represents the instanced ID.
     */
    setMeshPosition: (mesh: any, position: any, index?: number) => void;
    /**
     * Set the velocity of the given mesh which is part of the physics simulation.
     *
     * @method
     * @name RapierPhysics#setMeshVelocity
     * @param {Mesh} mesh The mesh to update the velocity for.
     * @param {Vector3} velocity - The new velocity.
     * @param {number} [index=0] - If the mesh is instanced, the index represents the instanced ID.
     */
    setMeshVelocity: (mesh: any, velocity: any, index?: number) => void;
    /**
     * Adds a heightfield terrain to the physics simulation.
     *
     * @method
     * @name RapierPhysics#addHeightfield
     * @param {Mesh} mesh - The Three.js mesh representing the terrain.
     * @param {number} width - The number of vertices along the width (x-axis) of the heightfield.
     * @param {number} depth - The number of vertices along the depth (z-axis) of the heightfield.
     * @param {Float32Array} heights - Array of height values for each vertex in the heightfield.
     * @param {Object} scale - Scale factors for the heightfield dimensions.
     * @param {number} scale.x - Scale factor for width.
     * @param {number} scale.y - Scale factor for height.
     * @param {number} scale.z - Scale factor for depth.
     * @returns {RigidBody} The created Rapier rigid body for the heightfield.
     */
    addHeightfield: (mesh: any, width: any, depth: any, heights: any, scale: any) => any;
    /**
     * Applies an impulse to the given mesh which is part of the physics simulation.
     *
     * @method
     * @name RapierPhysics#applyImpulse
     * @param {Mesh} mesh - The mesh to apply the impulse to.
     * @param {Vector3} impulse - The impulse to apply.
     * @param {number} [index=0] - If the mesh is instanced, the index represents the instanced ID.
     */
    applyImpulse: (mesh: any, impulse: any, index?: number) => void;
}>;
export class RapierPhysics {
}
