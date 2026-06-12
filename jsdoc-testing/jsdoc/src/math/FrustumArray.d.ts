/**
 * FrustumArray is used to determine if an object is visible in at least one camera
 * from an array of cameras. This is particularly useful for multi-view renderers.
*/
export class FrustumArray {
    /**
     * The coordinate system to use.
     *
     * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
     * @default WebGLCoordinateSystem
     */
    coordinateSystem: number | WebGPUCoordinateSystem;
    /**
     * Returns `true` if the 3D object's bounding sphere is intersecting any frustum
     * from the camera array.
     *
     * @param {Object3D} object - The 3D object to test.
     * @param {Object} cameraArray - An object with a cameras property containing an array of cameras.
     * @return {boolean} Whether the 3D object is visible in any camera.
     */
    intersectsObject(object: Object3D, cameraArray: Object): boolean;
    /**
     * Returns `true` if the given sprite is intersecting any frustum
     * from the camera array.
     *
     * @param {Sprite} sprite - The sprite to test.
     * @param {Object} cameraArray - An object with a cameras property containing an array of cameras.
     * @return {boolean} Whether the sprite is visible in any camera.
     */
    intersectsSprite(sprite: Sprite, cameraArray: Object): boolean;
    /**
     * Returns `true` if the given bounding sphere is intersecting any frustum
     * from the camera array.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @param {Object} cameraArray - An object with a cameras property containing an array of cameras.
     * @return {boolean} Whether the sphere is visible in any camera.
     */
    intersectsSphere(sphere: Sphere, cameraArray: Object): boolean;
    /**
     * Returns `true` if the given bounding box is intersecting any frustum
     * from the camera array.
     *
     * @param {Box3} box - The bounding box to test.
     * @param {Object} cameraArray - An object with a cameras property containing an array of cameras.
     * @return {boolean} Whether the box is visible in any camera.
     */
    intersectsBox(box: Box3, cameraArray: Object): boolean;
    /**
     * Returns `true` if the given point lies within any frustum
     * from the camera array.
     *
     * @param {Vector3} point - The point to test.
     * @param {Object} cameraArray - An object with a cameras property containing an array of cameras.
     * @return {boolean} Whether the point is visible in any camera.
     */
    containsPoint(point: Vector3, cameraArray: Object): boolean;
    /**
     * Returns a new frustum array with copied values from this instance.
     *
     * @return {FrustumArray} A clone of this instance.
     */
    clone(): FrustumArray;
}
