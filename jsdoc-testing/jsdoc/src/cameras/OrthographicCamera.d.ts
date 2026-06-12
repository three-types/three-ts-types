/**
 * Camera that uses [orthographic projection](https://en.wikipedia.org/wiki/Orthographic_projection).
 *
 * In this projection mode, an object's size in the rendered image stays
 * constant regardless of its distance from the camera. This can be useful
 * for rendering 2D scenes and UI elements, amongst other things.
 *
 * ```js
 * const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
 * scene.add( camera );
 * ```
 *
 * @augments Camera
 */
export class OrthographicCamera extends Camera {
    /**
     * Constructs a new orthographic camera.
     *
     * @param {number} [left=-1] - The left plane of the camera's frustum.
     * @param {number} [right=1] - The right plane of the camera's frustum.
     * @param {number} [top=1] - The top plane of the camera's frustum.
     * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
     * @param {number} [near=0.1] - The camera's near plane.
     * @param {number} [far=2000] - The camera's far plane.
     */
    constructor(left?: number, right?: number, top?: number, bottom?: number, near?: number, far?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOrthographicCamera: boolean;
    /**
     * The zoom factor of the camera.
     *
     * @type {number}
     * @default 1
     */
    zoom: number;
    /**
     * Represents the frustum window specification. This property should not be edited
     * directly but via {@link PerspectiveCamera#setViewOffset} and {@link PerspectiveCamera#clearViewOffset}.
     *
     * @type {?Object}
     * @default null
     */
    view: Object | null;
    /**
     * The left plane of the camera's frustum.
     *
     * @type {number}
     * @default -1
     */
    left: number;
    /**
     * The right plane of the camera's frustum.
     *
     * @type {number}
     * @default 1
     */
    right: number;
    /**
     * The top plane of the camera's frustum.
     *
     * @type {number}
     * @default 1
     */
    top: number;
    /**
     * The bottom plane of the camera's frustum.
     *
     * @type {number}
     * @default -1
     */
    bottom: number;
    /**
     * The camera's near plane. The valid range is greater than `0`
     * and less than the current value of {@link OrthographicCamera#far}.
     *
     * Note that, unlike for the {@link PerspectiveCamera}, `0` is a
     * valid value for an orthographic camera's near plane.
     *
     * @type {number}
     * @default 0.1
     */
    near: number;
    /**
     * The camera's far plane. Must be greater than the
     * current value of {@link OrthographicCamera#near}.
     *
     * @type {number}
     * @default 2000
     */
    far: number;
    copy(source: any, recursive: any): this;
    /**
     * Sets an offset in a larger frustum. This is useful for multi-window or
     * multi-monitor/multi-machine setups.
     *
     * @param {number} fullWidth - The full width of multiview setup.
     * @param {number} fullHeight - The full height of multiview setup.
     * @param {number} x - The horizontal offset of the subcamera.
     * @param {number} y - The vertical offset of the subcamera.
     * @param {number} width - The width of subcamera.
     * @param {number} height - The height of subcamera.
     * @see {@link PerspectiveCamera#setViewOffset}
     */
    setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void;
    /**
     * Removes the view offset from the projection matrix.
     */
    clearViewOffset(): void;
    /**
     * Updates the camera's projection matrix. Must be called after any change of
     * camera properties.
     */
    updateProjectionMatrix(): void;
    toJSON(meta: any): Object;
}
import { Camera } from './Camera.js';
