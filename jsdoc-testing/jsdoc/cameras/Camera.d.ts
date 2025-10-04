/**
 * Abstract base class for cameras. This class should always be inherited
 * when you build a new camera.
 *
 * @abstract
 * @augments Object3D
 */
export class Camera extends Object3D {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCamera: boolean;
    type: string;
    /**
     * The inverse of the camera's world matrix.
     *
     * @type {Matrix4}
     */
    matrixWorldInverse: Matrix4;
    /**
     * The camera's projection matrix.
     *
     * @type {Matrix4}
     */
    projectionMatrix: Matrix4;
    /**
     * The inverse of the camera's projection matrix.
     *
     * @type {Matrix4}
     */
    projectionMatrixInverse: Matrix4;
    /**
     * The coordinate system in which the camera is used.
     *
     * @type {(WebGLCoordinateSystem|WebGPUCoordinateSystem)}
     */
    coordinateSystem: (number | WebGPUCoordinateSystem);
    _reversedDepth: boolean;
    /**
     * The flag that indicates whether the camera uses a reversed depth buffer.
     *
     * @type {boolean}
     * @default false
     */
    get reversedDepth(): boolean;
    copy(source: any, recursive: any): this;
    /**
     * Returns a vector representing the ("look") direction of the 3D object in world space.
     *
     * This method is overwritten since cameras have a different forward vector compared to other
     * 3D objects. A camera looks down its local, negative z-axis by default.
     *
     * @param {Vector3} target - The target vector the result is stored to.
     * @return {Vector3} The 3D object's direction in world space.
     */
    getWorldDirection(target: Vector3): Vector3;
    updateMatrixWorld(force: any): void;
    updateWorldMatrix(updateParents: any, updateChildren: any): void;
    clone(): any;
}
import { Object3D } from '../core/Object3D.js';
import { Matrix4 } from '../math/Matrix4.js';
