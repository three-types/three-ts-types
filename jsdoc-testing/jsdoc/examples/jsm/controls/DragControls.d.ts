/**
 * This class can be used to provide a drag'n'drop interaction.
 *
 * ```js
 * const controls = new DragControls( objects, camera, renderer.domElement );
 *
 * // add event listener to highlight dragged objects
 * controls.addEventListener( 'dragstart', function ( event ) {
 *
 * 	event.object.material.emissive.set( 0xaaaaaa );
 *
 * } );
 *
 * controls.addEventListener( 'dragend', function ( event ) {
 *
 * 	event.object.material.emissive.set( 0x000000 );
 *
 * } );
 * ```
 *
 * @augments Controls
 * @three_import import { DragControls } from 'three/addons/controls/DragControls.js';
 */
export class DragControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Array<Object3D>} objects - An array of draggable 3D objects.
     * @param {Camera} camera - The camera of the rendered scene.
     * @param {?HTMLElement} [domElement=null] - The HTML DOM element used for event listeners.
     */
    constructor(objects: Array<Object3D>, camera: Camera, domElement?: HTMLElement | null);
    /**
     * An array of draggable 3D objects.
     *
     * @type {Array<Object3D>}
     */
    objects: Array<Object3D>;
    /**
     * Whether children of draggable objects can be dragged independently from their parent.
     *
     * @type {boolean}
     * @default true
     */
    recursive: boolean;
    /**
     * This option only works if the `objects` array contains a single draggable  group object.
     * If set to `true`, the controls does not transform individual objects but the entire group.
     *
     * @type {boolean}
     * @default false
     */
    transformGroup: boolean;
    /**
     * The speed at which the object will rotate when dragged in `rotate` mode.
     * The higher the number the faster the rotation.
     *
     * @type {number}
     * @default 1
     */
    rotateSpeed: number;
    /**
     * The raycaster used for detecting 3D objects.
     *
     * @type {Raycaster}
     */
    raycaster: Raycaster;
    mouseButtons: {
        LEFT: number;
        MIDDLE: number;
        RIGHT: number;
    };
    touches: {
        ONE: number;
    };
    _onPointerMove: typeof onPointerMove;
    _onPointerDown: typeof onPointerDown;
    _onPointerCancel: typeof onPointerCancel;
    _onContextMenu: typeof onContextMenu;
    connect(element: any): void;
    _updatePointer(event: any): void;
    _updateState(event: any): void;
}
import { Controls } from 'three';
import { Raycaster } from 'three';
declare function onPointerMove(event: any): void;
declare function onPointerDown(event: any): void;
declare function onPointerCancel(): void;
declare class onPointerCancel {
    state: number | undefined;
}
declare function onContextMenu(event: any): void;
export {};
