/**
 * A special type of helper that visualizes the camera's transformation
 * in a small viewport area as an axes helper. Such a helper is often wanted
 * in 3D modeling tools or scene editors like the [three.js editor](https://threejs.org/editor).
 *
 * The helper allows to click on the X, Y and Z axes which animates the camera
 * so it looks along the selected axis.
 *
 * @augments Object3D
 * @three_import import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
 */
export class ViewHelper extends Object3D {
    /**
     * Constructs a new view helper.
     *
     * @param {Camera} camera - The camera whose transformation should be visualized.
     * @param {HTMLElement} [domElement] - The DOM element that is used to render the view.
     */
    constructor(camera: Camera, domElement?: HTMLElement);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isViewHelper: boolean;
    /**
     * The camera whose transformation is visualized. It can be reassigned at
     * any time to rebind the helper to a different camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * Whether the helper is currently animating or not.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    readonly animating: boolean;
    /**
     * The helper's center point.
     *
     * @type {Vector3}
     */
    center: Vector3;
    /**
     * Controls the position of the helper in the viewport.
     * Use `top`/`bottom` for vertical positioning and `left`/`right` for horizontal.
     * If `left` is `null`, `right` is used. If `top` is `null`, `bottom` is used.
     *
     * @type {{top: number|null, right: number, bottom: number, left: number|null}}
     */
    location: {
        top: number | null;
        right: number;
        bottom: number;
        left: number | null;
    };
    _domElement: HTMLElement | undefined;
    _options: {};
    _orthoCamera: OrthographicCamera;
    _geometry: import("three").BufferGeometry;
    _xAxis: Mesh;
    _yAxis: Mesh;
    _zAxis: Mesh;
    _posXAxisHelper: Sprite;
    _posYAxisHelper: Sprite;
    _posZAxisHelper: Sprite;
    _negXAxisHelper: Sprite;
    _negYAxisHelper: Sprite;
    _negZAxisHelper: Sprite;
    _interactiveObjects: Sprite[];
    _targetPosition: Vector3;
    _targetQuaternion: Quaternion;
    _q1: Quaternion;
    _q2: Quaternion;
    _radius: number;
    /**
     * Renders the helper in a separate view in the viewport.
     * Position is controlled by the `location` property.
     *
     * @param {WebGLRenderer|WebGPURenderer} renderer - The renderer.
     */
    render(renderer: WebGLRenderer | WebGPURenderer): void;
    /**
     * This method should be called when a click or pointer event
     * has happened in the app.
     *
     * @param {PointerEvent} event - The event to process.
     * @return {boolean} Whether an intersection with the helper has been detected or not.
     */
    handleClick(event: PointerEvent): boolean;
    /**
     * Sets labels for each axis. By default, they are unlabeled.
     *
     * @param {string|undefined} labelX - The label for the x-axis.
     * @param {string|undefined} labelY - The label for the y-axis.
     * @param {string|undefined} labelZ - The label for the z-axis.
     */
    setLabels(labelX: string | undefined, labelY: string | undefined, labelZ: string | undefined): void;
    /**
     * Sets the label style. Has no effect when the axes are unlabeled.
     *
     * @param {string} [font='24px Arial'] - The label font.
     * @param {string} [color='#000000'] - The label color.
     * @param {number} [radius=14] - The label radius.
     */
    setLabelStyle(font?: string, color?: string, radius?: number): void;
    /**
     * Updates the helper. This method should be called in the app's animation
     * loop.
     *
     * @param {number} delta - The delta time in seconds.
     */
    update(delta: number): void;
    _prepareAnimationData(object: any, focusPoint: any): void;
    _updateLabels(): void;
}
import { Object3D } from 'three';
import { Vector3 } from 'three';
import { OrthographicCamera } from 'three';
import { Mesh } from 'three';
import { Sprite } from 'three';
import { Quaternion } from 'three';
