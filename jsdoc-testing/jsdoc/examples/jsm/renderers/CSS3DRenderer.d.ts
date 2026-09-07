/**
 * ~Parameters
 */
export type CSS3DRenderer = {
    /**
     * - A DOM element where the renderer appends its child-elements.
     * If not passed in here, a new div element will be created.
     */
    element?: HTMLElement | undefined;
};
/**
 * The base 3D object that is supported by {@link CSS3DRenderer}.
 *
 * @augments Object3D
 * @three_import import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
 */
export class CSS3DObject extends Object3D {
    /**
     * Constructs a new CSS3D object.
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
    readonly isCSS3DObject: boolean;
    /**
     * The DOM element which defines the appearance of this 3D object.
     *
     * @type {HTMLElement}
     * @readonly
     * @default true
     */
    readonly element: HTMLElement;
    copy(source: any, recursive: any): this;
}
/**
 * A specialized version of {@link CSS3DObject} that represents
 * DOM elements as sprites.
 *
 * @augments CSS3DObject
 * @three_import import { CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js';
 */
export class CSS3DSprite extends CSS3DObject {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCSS3DSprite: boolean;
    /**
     * The sprite's rotation in radians.
     *
     * @type {number}
     * @default 0
     */
    rotation2D: number;
    copy(source: any, recursive: any): this;
}
/**
 * This renderer can be used to apply hierarchical 3D transformations to DOM elements
 * via the CSS3 [transform](https://www.w3schools.com/cssref/css3_pr_transform.asp) property.
 * `CSS3DRenderer` is particularly interesting if you want to apply 3D effects to a website without
 * canvas based rendering. It can also be used in order to combine DOM elements with WebGL content.
 *
 * There are, however, some important limitations:
 *
 * - It's not possible to use the material system of *three.js*.
 * - It's also not possible to use geometries.
 * - The renderer only supports 100% browser and display zoom.
 *
 * So `CSS3DRenderer` is just focused on ordinary DOM elements. These elements are wrapped into special
 * 3D objects ({@link CSS3DObject} or {@link CSS3DSprite}) and then added to the scene graph.
 *
 * @three_import import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
 */
export class CSS3DRenderer {
    /**
     * Constructs a new CSS3D renderer.
     *
     * @param {CSS3DRenderer~Parameters} [parameters] - The parameters.
     */
    constructor(parameters?: {});
    /**
     * The DOM where the renderer appends its child-elements.
     *
     * @type {HTMLElement}
     */
    domElement: HTMLElement;
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
