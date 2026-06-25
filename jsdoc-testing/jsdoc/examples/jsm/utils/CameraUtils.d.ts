/**
 * Set projection matrix and the orientation of a perspective camera
 * to exactly frame the corners of an arbitrary rectangle.
 * NOTE: This function ignores the standard parameters;
 * do not call `updateProjectionMatrix()` after this.
 *
 * @param {PerspectiveCamera} camera - The camera.
 * @param {Vector3} bottomLeftCorner - The bottom-left corner point.
 * @param {Vector3} bottomRightCorner - The bottom-right corner point.
 * @param {Vector3} topLeftCorner - The top-left corner point.
 * @param {boolean} [estimateViewFrustum=false] - If set to `true`, the function tries to estimate the camera's FOV.
 */
export function frameCorners(camera: PerspectiveCamera, bottomLeftCorner: Vector3, bottomRightCorner: Vector3, topLeftCorner: Vector3, estimateViewFrustum?: boolean): void;
import { Vector3 } from 'three';
