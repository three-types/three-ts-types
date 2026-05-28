/**
 * ~Parameters
 */
export type CSS2DRenderer = {
    /**
     * - A DOM element where the renderer appends its child-elements.
     * If not passed in here, a new div element will be created.
     */
    element?: HTMLElement | undefined;
};
/**
 * The only type of 3D object that is supported by {@link CSS2DRenderer}.
 *
 * @augments Object3D
 * @three_import import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
 */
export class CSS2DObject extends Object3D {
    /**
     * Constructs a new CSS2D object.
     *
     * @param {HTMLElement} [element] - The DOM element.
     */
    constructor(element?: HTMLElement);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCSS2DObject: boolean;
    /**
     * The DOM element which defines the appearance of this 3D object.
     *
     * @type {HTMLElement}
     * @readonly
     * @default true
     */
    readonly element: HTMLElement;
    /**
     * The 3D objects center point.
     * `( 0, 0 )` is the lower left, `( 1, 1 )` is the top right.
     *
     * @type {Vector2}
     * @default (0.5,0.5)
     */
    center: Vector2;
    copy(source: any, recursive: any): this;
}
/**
 * This renderer is a simplified version of {@link CSS3DRenderer}. The only transformation that is
 * supported is translation.
 *
 * The renderer is very useful if you want to combine HTML based labels with 3D objects. Here too,
 * the respective DOM elements are wrapped into an instance of {@link CSS2DObject} and added to the
 * scene graph. All other types of renderable 3D objects (like meshes or point clouds) are ignored.
 *
 * `CSS2DRenderer` only supports 100% browser and display zoom.
 *
 * @three_import import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
 */
export class CSS2DRenderer {
    /**
     * Constructs a new CSS2D renderer.
     *
     * @param {CSS2DRenderer~Parameters} [parameters] - The parameters.
     */
    constructor(parameters?: {});
    /**
     * The DOM where the renderer appends its child-elements.
     *
     * @type {HTMLElement}
     */
    domElement: HTMLElement;
    /**
     * Controls whether the renderer assigns `z-index` values to CSS2DObject DOM elements.
     * If set to `true`, z-index values are assigned first based on the `renderOrder`
     * and secondly - the distance to the camera. If set to `false`, no z-index values are assigned.
     *
     * @type {boolean}
     * @default true
     */
    sortObjects: boolean;
    /**
     * Returns an object containing the width and height of the renderer.
     *
     * @return {{width:number,height:number}} The size of the renderer.
     */
    getSize: () => {
        width: number;
        height: number;
    };
    /**
     * Renders the given scene using the given camera.
     *
     * @param {Object3D} scene - A scene or any other type of 3D object.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * Resizes the renderer to the given width and height.
     *
     * @param {number} width - The width of the renderer.
     * @param {number} height - The height of the renderer.
     */
    setSize: (width: number, height: number) => void;
}
import { Object3D } from 'three';
import { Vector2 } from 'three';
