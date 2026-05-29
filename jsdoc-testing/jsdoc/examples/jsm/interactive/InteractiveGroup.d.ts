/**
 * This class can be used to group 3D objects in an interactive group.
 * The group itself can listen to Pointer, Mouse or XR controller events to
 * detect selections of descendant 3D objects. If a 3D object is selected,
 * the respective event is going to dispatched to it.
 *
 * ```js
 * const group = new InteractiveGroup();
 * group.listenToPointerEvents( renderer, camera );
 * group.listenToXRControllerEvents( controller1 );
 * group.listenToXRControllerEvents( controller2 );
 * scene.add( group );
 *
 * // now add objects that should be interactive
 * group.add( mesh1, mesh2, mesh3 );
 * ```
 * @augments Group
 * @three_import import { InteractiveGroup } from 'three/addons/interactive/InteractiveGroup.js';
 */
export class InteractiveGroup extends Group {
    /**
     * The internal raycaster.
     *
     * @type {Raycaster}
     */
    raycaster: Raycaster;
    /**
     * The internal raycaster.
     *
     * @type {?HTMLElement}
     * @default null
     */
    element: HTMLElement | null;
    /**
     * The camera used for raycasting.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    /**
     * An array of XR controllers.
     *
     * @type {Array<Group>}
     */
    controllers: Array<Group>;
    _onPointerEvent: (event: any) => void;
    _onXRControllerEvent: (event: any) => void;
    onPointerEvent(event: any): void;
    onXRControllerEvent(event: any): void;
    /**
     * Calling this method makes sure the interactive group listens to Pointer and Mouse events.
     * The target is the `domElement` of the given renderer. The camera is required for the internal
     * raycasting so 3D objects can be detected based on the events.
     *
     * @param {(WebGPURenderer|WebGLRenderer)} renderer - The renderer.
     * @param {Camera} camera - The camera.
     */
    listenToPointerEvents(renderer: (WebGPURenderer | WebGLRenderer), camera: Camera): void;
    /**
     * Disconnects this interactive group from all Pointer and Mouse Events.
     */
    disconnectionPointerEvents(): void;
    /**
     * Calling this method makes sure the interactive group listens to events of
     * the given XR controller.
     *
     * @param {Group} controller - The XR controller.
     */
    listenToXRControllerEvents(controller: Group): void;
    /**
     * Disconnects this interactive group from all XR controllers.
     */
    disconnectXrControllerEvents(): void;
    /**
     * Disconnects this interactive group from the DOM and all XR controllers.
     */
    disconnect(): void;
}
import { Group } from 'three';
import { Raycaster } from 'three';
