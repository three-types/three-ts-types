/**
 * A component for providing a basic Level of Detail (LOD) mechanism.
 *
 * Every LOD level is associated with an object, and rendering can be switched
 * between them at the distances specified. Typically you would create, say,
 * three meshes, one for far away (low detail), one for mid range (medium
 * detail) and one for close up (high detail).
 *
 * ```js
 * const lod = new THREE.LOD();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 *
 * //Create spheres with 3 levels of detail and create new LOD levels for them
 * for( let i = 0; i < 3; i++ ) {
 *
 * 	const geometry = new THREE.IcosahedronGeometry( 10, 3 - i );
 * 	const mesh = new THREE.Mesh( geometry, material );
 * 	lod.addLevel( mesh, i * 75 );
 *
 * }
 *
 * scene.add( lod );
 * ```
 *
 * @augments Object3D
 */
export class LOD extends Object3D {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLOD: boolean;
    /**
     * The current LOD index.
     *
     * @private
     * @type {number}
     * @default 0
     */
    private _currentLevel;
    type: string;
    /**
     * Whether the LOD object is updated automatically by the renderer per frame
     * or not. If set to `false`, you have to call {@link LOD#update} in the
     * render loop by yourself.
     *
     * @type {boolean}
     * @default true
     */
    autoUpdate: boolean;
    copy(source: any): this;
    /**
     * Adds a mesh that will display at a certain distance and greater. Typically
     * the further away the distance, the lower the detail on the mesh.
     *
     * @param {Object3D} object - The 3D object to display at this level.
     * @param {number} [distance=0] - The distance at which to display this level of detail.
     * @param {number} [hysteresis=0] - Threshold used to avoid flickering at LOD boundaries, as a fraction of distance.
     * @return {LOD} A reference to this instance.
     */
    addLevel(object: Object3D, distance?: number, hysteresis?: number): LOD;
    /**
     * Removes an existing level, based on the distance from the camera.
     * Returns `true` when the level has been removed. Otherwise `false`.
     *
     * @param {number} distance - Distance of the level to remove.
     * @return {boolean} Whether the level has been removed or not.
     */
    removeLevel(distance: number): boolean;
    /**
     * Returns the currently active LOD level index.
     *
     * @return {number} The current active LOD level index.
     */
    getCurrentLevel(): number;
    /**
     * Returns a reference to the first 3D object that is greater than
     * the given distance.
     *
     * @param {number} distance - The LOD distance.
     * @return {?Object3D} The found 3D object. `null` if no 3D object has been found.
     */
    getObjectForDistance(distance: number): Object3D | null;
    /**
     * Computes intersection points between a casted ray and this LOD.
     *
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - The target array that holds the intersection points.
     */
    raycast(raycaster: Raycaster, intersects: Array<Object>): void;
    /**
     * Updates the LOD by computing which LOD level should be visible according
     * to the current distance of the given camera.
     *
     * @param {Camera} camera - The camera the scene is rendered with.
     */
    update(camera: Camera): void;
    toJSON(meta: any): Object;
}
import { Object3D } from '../core/Object3D.js';
