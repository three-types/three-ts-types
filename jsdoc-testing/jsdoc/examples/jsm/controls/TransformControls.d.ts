/**
 * This class can be used to transform objects in 3D space by adapting a similar interaction model
 * of DCC tools like Blender. Unlike other controls, it is not intended to transform the scene's camera.
 *
 * `TransformControls` expects that its attached 3D object is part of the scene graph.
 *
 * @augments Controls
 * @three_import import { TransformControls } from 'three/addons/controls/TransformControls.js';
 */
export class TransformControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Camera} camera - The camera of the rendered scene.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(camera: Camera, domElement?: HTMLElement | null);
    _root: TransformControlsRoot;
    _gizmo: TransformControlsGizmo;
    _plane: TransformControlsPlane;
    /**
     * The viewport rectangle, in logical (CSS) pixels with the origin at the lower-left
     * of the canvas. Set this when the renderer uses a sub-canvas viewport so pointer
     * coordinates map to the correct region. If `null`, the full canvas is used.
     *
     * @name TransformControls#viewport
     * @type {?Vector4}
     * @default null
     */
    viewport: Vector4 | null;
    _offset: Vector3;
    _startNorm: Vector3;
    _endNorm: Vector3;
    _cameraScale: Vector3;
    _parentPosition: Vector3;
    _parentQuaternion: Quaternion;
    _parentQuaternionInv: Quaternion;
    _parentScale: Vector3;
    _worldScaleStart: Vector3;
    _worldQuaternionInv: Quaternion;
    _worldScale: Vector3;
    _positionStart: Vector3;
    _quaternionStart: Quaternion;
    _scaleStart: Vector3;
    _getPointer: typeof getPointer;
    _onPointerDown: typeof onPointerDown;
    _onPointerHover: typeof onPointerHover;
    _onPointerMove: typeof onPointerMove;
    _onPointerUp: typeof onPointerUp;
    connect(element: any): void;
    /**
     * Returns the visual representation of the controls. Add the helper to your scene to
     * visually transform the attached  3D object.
     *
     * @return {TransformControlsRoot} The helper.
     */
    getHelper(): TransformControlsRoot;
    pointerHover(pointer: any): void;
    axis: any;
    pointerDown(pointer: any): void;
    dragging: boolean | undefined;
    pointerMove(pointer: any): void;
    rotationAngle: any;
    pointerUp(pointer: any): void;
    /**
     * Sets the 3D object that should be transformed and ensures the controls UI is visible.
     *
     * @param {Object3D} object -  The 3D object that should be transformed.
     * @return {TransformControls} A reference to this controls.
     */
    attach(object: Object3D): TransformControls;
    /**
     * Removes the current 3D object from the controls and makes the helper UI invisible.
     *
     * @return {TransformControls} A reference to this controls.
     */
    detach(): TransformControls;
    /**
     * Resets the object's position, rotation and scale to when the current transform began.
     */
    reset(): void;
    /**
     * Returns the raycaster that is used for user interaction. This object is shared between all
     * instances of `TransformControls`.
     *
     * @returns {Raycaster} The internal raycaster.
     */
    getRaycaster(): Raycaster;
    /**
     * Returns the transformation mode.
     *
     * @returns {'translate'|'rotate'|'scale'} The transformation mode.
     */
    getMode(): "translate" | "rotate" | "scale";
    /**
     * Sets the given transformation mode.
     *
     * @param {'translate'|'rotate'|'scale'} mode - The transformation mode to set.
     */
    setMode(mode: "translate" | "rotate" | "scale"): void;
    mode: "rotate" | "scale" | "translate" | undefined;
    /**
     * Sets the translation snap.
     *
     * @param {?number} translationSnap - The translation snap to set.
     */
    setTranslationSnap(translationSnap: number | null): void;
    translationSnap: number | null | undefined;
    /**
     * Sets the rotation snap.
     *
     * @param {?number} rotationSnap - The rotation snap to set.
     */
    setRotationSnap(rotationSnap: number | null): void;
    rotationSnap: number | null | undefined;
    /**
     * Sets the scale snap.
     *
     * @param {?number} scaleSnap - The scale snap to set.
     */
    setScaleSnap(scaleSnap: number | null): void;
    scaleSnap: number | null | undefined;
    /**
     * Sets the size of the helper UI.
     *
     * @param {number} size - The size to set.
     */
    setSize(size: number): void;
    size: number | undefined;
    /**
     * Sets the coordinate space in which transformations are applied.
     *
     * @param {'world'|'local'} space - The space to set.
     */
    setSpace(space: "world" | "local"): void;
    space: "world" | "local" | undefined;
    /**
     * Sets the colors of the control's gizmo.
     *
     * @param {number|Color|string} xAxis - The x-axis color.
     * @param {number|Color|string} yAxis - The y-axis color.
     * @param {number|Color|string} zAxis - The z-axis color.
     * @param {number|Color|string} active - The color for active elements.
     */
    setColors(xAxis: number | Color | string, yAxis: number | Color | string, zAxis: number | Color | string, active: number | Color | string): void;
}
export class TransformControlsGizmo extends Object3D {
    isTransformControlsGizmo: boolean;
    type: string;
    materialLib: {
        xAxis: import("three").Material;
        yAxis: import("three").Material;
        zAxis: import("three").Material;
        active: import("three").Material;
        xAxisTransparent: import("three").Material;
        yAxisTransparent: import("three").Material;
        zAxisTransparent: import("three").Material;
        activeTransparent: import("three").Material;
    };
    gizmo: {};
    picker: {};
    helper: {};
    updateMatrixWorld(force: any): void;
}
export class TransformControlsPlane extends Mesh {
    constructor();
    isTransformControlsPlane: boolean;
    updateMatrixWorld(force: any): void;
}
import { Controls } from 'three';
declare class TransformControlsRoot extends Object3D {
    constructor(controls: any);
    isTransformControlsRoot: boolean;
    controls: any;
    updateMatrixWorld(force: any): void;
    dispose(): void;
}
import { Vector3 } from 'three';
import { Quaternion } from 'three';
declare function getPointer(event: any): {
    x: number;
    y: number;
    button: any;
};
declare function onPointerDown(event: any): void;
declare function onPointerHover(event: any): void;
declare function onPointerMove(event: any): void;
declare function onPointerUp(event: any): void;
import { Object3D } from 'three';
import { Raycaster } from 'three';
import { Mesh } from 'three';
export {};
