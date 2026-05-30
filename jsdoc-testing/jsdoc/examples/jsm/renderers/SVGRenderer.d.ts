/**
 * Can be used to wrap SVG elements into a 3D object.
 *
 * @augments Object3D
 * @three_import import { SVGObject } from 'three/addons/renderers/SVGRenderer.js';
 */
export class SVGObject extends Object3D {
    /**
     * Constructs a new SVG object.
     *
     * @param {SVGElement} node - The SVG element.
     */
    constructor(node: SVGElement);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSVGObject: boolean;
    /**
     * This SVG element.
     *
     * @type {SVGElement}
     */
    node: SVGElement;
}
/**
 * This renderer an be used to render geometric data using SVG. The produced vector
 * graphics are particular useful in the following use cases:
 *
 * - Animated logos or icons.
 * - Interactive 2D/3D diagrams or graphs.
 * - Interactive maps.
 * - Complex or animated user interfaces.
 *
 * `SVGRenderer` has various advantages. It produces crystal-clear and sharp output which
 * is independent of the actual viewport resolution.SVG elements can be styled via CSS.
 * And they have good accessibility since it's possible to add metadata like title or description
 * (useful for search engines or screen readers).
 *
 * There are, however, some important limitations:
 * - No advanced shading.
 * - No texture support.
 * - No shadow support.
 *
 * @three_import import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
 */
export class SVGRenderer {
    /**
     * The DOM where the renderer appends its child-elements.
     *
     * @type {SVGSVGElement}
     */
    domElement: SVGSVGElement;
    /**
     * Whether to automatically perform a clear before a render call or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClear: boolean;
    /**
     * Whether to sort 3D objects or not.
     *
     * @type {boolean}
     * @default true
     */
    sortObjects: boolean;
    /**
     * Whether to sort elements or not.
     *
     * @type {boolean}
     * @default true
     */
    sortElements: boolean;
    /**
     * Number of fractional pixels to enlarge polygons in order to
     * prevent anti-aliasing gaps. Range is `[0,1]`.
     *
     * @type {number}
     * @default 0.5
     */
    overdraw: number;
    /**
     * The output color space.
     *
     * @type {(SRGBColorSpace|LinearSRGBColorSpace)}
     * @default SRGBColorSpace
     */
    outputColorSpace: (string | LinearSRGBColorSpace);
    /**
     * Provides information about the number of
     * rendered vertices and faces.
     *
     * @type {Object}
     */
    info: Object;
    /**
     * Sets the render quality. Setting to `high` makes the browser improve SVG quality
     * over rendering speed and geometric precision.
     *
     * @param {('low'|'high')} quality - The quality.
     */
    setQuality: (quality: ("low" | "high")) => void;
    /**
     * Sets the clear color.
     *
     * @param {(number|Color|string)} color - The clear color to set.
     */
    setClearColor: (color: (number | Color | string)) => void;
    setPixelRatio: () => void;
    /**
     * Resizes the renderer to the given width and height.
     *
     * @param {number} width - The width of the renderer.
     * @param {number} height - The height of the renderer.
     */
    setSize: (width: number, height: number) => void;
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
     * Sets the precision of the data used to create a paths.
     *
     * @param {number} precision - The precision to set.
     */
    setPrecision: (precision: number) => void;
    /**
     * Performs a manual clear with the defined clear color.
     */
    clear: () => void;
    /**
     * Renders the given scene using the given camera.
     *
     * @param {Object3D} scene - A scene or any other type of 3D object.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
}
import { Object3D } from 'three';
import { Color } from 'three';
import { Camera } from 'three';
