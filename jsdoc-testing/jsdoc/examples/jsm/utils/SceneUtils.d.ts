/**
 * This function creates a mesh for each instance of the given instanced mesh and
 * adds it to a group. Each mesh will honor the current 3D transformation of its
 * corresponding instance.
 *
 * @param {InstancedMesh} instancedMesh - The instanced mesh.
 * @return {Group} A group of meshes.
 */
export function createMeshesFromInstancedMesh(instancedMesh: InstancedMesh): Group;
/**
 * This function creates a mesh for each geometry-group of the given multi-material mesh and
 * adds it to a group.
 *
 * @param {Mesh} mesh - The multi-material mesh.
 * @return {Group} A group of meshes.
 */
export function createMeshesFromMultiMaterialMesh(mesh: Mesh): Group;
/**
 * This function represents an alternative way to create 3D objects with multiple materials.
 * Normally, {@link BufferGeometry#groups} are used which might introduce issues e.g. when
 * exporting the object to a 3D format. This function accepts a geometry and an array of
 * materials and creates for each material a mesh that is added to a group.
 *
 * @param {BufferGeometry} geometry - The geometry.
 * @param {Array<Material>} materials - An array of materials.
 * @return {Group} A group representing a multi-material object.
 */
export function createMultiMaterialObject(geometry: BufferGeometry, materials: Array<Material>): Group;
/**
 * Executes a reducer function for each vertex of the given 3D object.
 * `reduceVertices()` returns a single value: the function's accumulated result.
 *
 * @param {Object3D} object - The 3D object that should be processed. It must have a
 * geometry with a `position` attribute.
 * @param {function(number,Vector3):number} func - The reducer function. First argument
 * is the current value, second argument the current vertex.
 * @param {any} initialValue - The initial value.
 * @return {any} The result.
 */
export function reduceVertices(object: Object3D, func: (arg0: number, arg1: Vector3) => number, initialValue: any): any;
/**
 * Sorts the instances of the given instanced mesh.
 *
 * @param {InstancedMesh} mesh - The instanced mesh to sort.
 * @param {function(number, number):number} compareFn - A custom compare function for the sort.
 */
export function sortInstancedMesh(mesh: InstancedMesh, compareFn: (arg0: number, arg1: number) => number): void;
/**
 * Generator based alternative to {@link Object3D#traverse}.
 *
 * @param {Object3D} object - Object to traverse.
 * @yields {Object3D} Objects that passed the filter condition.
 */
export function traverseGenerator(object: Object3D): any;
/**
 * Generator based alternative to {@link Object3D#traverseVisible}.
 *
 * @param {Object3D} object Object to traverse.
 * @yields {Object3D} Objects that passed the filter condition.
 */
export function traverseVisibleGenerator(object: Object3D): any;
/**
 * Generator based alternative to {@link Object3D#traverseAncestors}.
 *
 * @param {Object3D} object Object to traverse.
 * @yields {Object3D} Objects that passed the filter condition.
 */
export function traverseAncestorsGenerator(object: Object3D): any;
import { Group } from 'three';
import { Mesh } from 'three';
import { BufferGeometry } from 'three';
import { Vector3 } from 'three';
