/**
 * This class is designed to assist with raycasting. Raycasting is used for
 * mouse picking (working out what objects in the 3d space the mouse is over)
 * amongst other things.
 */
export class Raycaster {
    /**
     * Constructs a new raycaster.
     *
     * @param {Vector3} origin - The origin vector where the ray casts from.
     * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
     * @param {number} [near=0] - All results returned are further away than near. Near can't be negative.
     * @param {number} [far=Infinity] - All results returned are closer than far. Far can't be lower than near.
     */
    constructor(origin: Vector3, direction: Vector3, near?: number, far?: number);
    /**
     * The ray used for raycasting.
     *
     * @type {Ray}
     */
    ray: Ray;
    /**
     * All results returned are further away than near. Near can't be negative.
     *
     * @type {number}
     * @default 0
     */
    near: number;
    /**
     * All results returned are closer than far. Far can't be lower than near.
     *
     * @type {number}
     * @default Infinity
     */
    far: number;
    /**
     * The camera to use when raycasting against view-dependent objects such as
     * billboarded objects like sprites. This field can be set manually or
     * is set when calling `setFromCamera()`.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    /**
     * Allows to selectively ignore 3D objects when performing intersection tests.
     * The following code example ensures that only 3D objects on layer `1` will be
     * honored by raycaster.
     * ```js
     * raycaster.layers.set( 1 );
     * object.layers.enable( 1 );
     * ```
     *
     * @type {Layers}
     */
    layers: Layers;
    /**
     * A parameter object that configures the raycasting. It has the structure:
     *
     * ```
     * {
     * 	Mesh: {},
     * 	Line: { threshold: 1 },
     * 	LOD: {},
     * 	Points: { threshold: 1 },
     * 	Sprite: {}
     * }
     * ```
     * Where `threshold` is the precision of the raycaster when intersecting objects, in world units.
     *
     * @type {Object}
     */
    params: Object;
    /**
     * Updates the ray with a new origin and direction by copying the values from the arguments.
     *
     * @param {Vector3} origin - The origin vector where the ray casts from.
     * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
     */
    set(origin: Vector3, direction: Vector3): void;
    /**
     * Uses the given coordinates and camera to compute a new origin and direction for the internal ray.
     *
     * @param {Vector2} coords - 2D coordinates of the mouse, in normalized device coordinates (NDC).
     * X and Y components should be between `-1` and `1`.
     * @param {Camera} camera - The camera from which the ray should originate.
     */
    setFromCamera(coords: Vector2, camera: Camera): void;
    /**
     * Uses the given WebXR controller to compute a new origin and direction for the internal ray.
     *
     * @param {WebXRController} controller - The controller to copy the position and direction from.
     * @return {Raycaster} A reference to this raycaster.
     */
    setFromXRController(controller: WebXRController): Raycaster;
    /**
     * The intersection point of a raycaster intersection test.
     * @typedef {Object} Raycaster~Intersection
     * @property {number} distance - The distance from the ray's origin to the intersection point.
     * @property {number} distanceToRay -  Some 3D objects e.g. {@link Points} provide the distance of the
     * intersection to the nearest point on the ray. For other objects it will be `undefined`.
     * @property {Vector3} point - The intersection point, in world coordinates.
     * @property {Object} face - The face that has been intersected.
     * @property {number} faceIndex - The face index.
     * @property {Object3D} object - The 3D object that has been intersected.
     * @property {Vector2} uv - U,V coordinates at point of intersection.
     * @property {Vector2} uv1 - Second set of U,V coordinates at point of intersection.
     * @property {Vector3} normal - Interpolated normal vector at point of intersection.
     * @property {number} instanceId - The index number of the instance where the ray
     * intersects the {@link InstancedMesh}.
     */
    /**
     * Checks all intersection between the ray and the object with or without the
     * descendants. Intersections are returned sorted by distance, closest first.
     *
     * `Raycaster` delegates to the `raycast()` method of the passed 3D object, when
     * evaluating whether the ray intersects the object or not. This allows meshes to respond
     * differently to ray casting than lines or points.
     *
     * Note that for meshes, faces must be pointed towards the origin of the ray in order
     * to be detected; intersections of the ray passing through the back of a face will not
     * be detected. To raycast against both faces of an object, you'll want to set  {@link Material#side}
     * to `THREE.DoubleSide`.
     *
     * @param {Object3D} object - The 3D object to check for intersection with the ray.
     * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
     * Otherwise it only checks intersection with the object.
     * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
     * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
     */
    intersectObject(object: Object3D, recursive?: boolean, intersects?: any[]): Array<Raycaster>;
    /**
     * Checks all intersection between the ray and the objects with or without
     * the descendants. Intersections are returned sorted by distance, closest first.
     *
     * @param {Array<Object3D>} objects - The 3D objects to check for intersection with the ray.
     * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
     * Otherwise it only checks intersection with the object.
     * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
     * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
     */
    intersectObjects(objects: Array<Object3D>, recursive?: boolean, intersects?: any[]): Array<Raycaster>;
}
import { Ray } from '../math/Ray.js';
import { Layers } from './Layers.js';
