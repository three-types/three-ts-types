/**
 * ~Options
 */
export type TextGeometry = {
    /**
     * - The font.
     */
    font?: Font | undefined;
    /**
     * - The text size.
     */
    size?: number | undefined;
    /**
     * - Depth to extrude the shape.
     */
    depth?: number | undefined;
    /**
     * - Number of points on the curves.
     */
    curveSegments?: number | undefined;
    /**
     * - Number of points used for subdividing segments along the depth of the extruded spline.
     */
    steps?: number | undefined;
    /**
     * - Whether to beveling to the shape or not.
     */
    bevelEnabled?: boolean | undefined;
    /**
     * - How deep into the original shape the bevel goes.
     */
    bevelThickness?: number | undefined;
    /**
     * - Distance from the shape outline that the bevel extends.
     */
    bevelSize?: number | undefined;
    /**
     * - Distance from the shape outline that the bevel starts.
     */
    bevelOffset?: number | undefined;
    /**
     * - Number of bevel layers.
     */
    bevelSegments?: number | undefined;
    /**
     * - Char direction: ltr(left to right), rtl(right to left) & tb(top bottom).
     */
    direction?: string | undefined;
    /**
     * - A 3D spline path along which the shape should be extruded. Bevels not supported for path extrusion.
     */
    extrudePath?: Curve | null;
    /**
     * - An object that provides UV generator functions for custom UV generation.
     */
    UVGenerator?: Object | undefined;
};
import { Font } from '../loaders/FontLoader.js';
/**
 * A class for generating text as a single geometry. It is constructed by providing a string of text, and a set of
 * parameters consisting of a loaded font and extrude settings.
 *
 * See the {@link FontLoader} page for additional details.
 *
 * `TextGeometry` uses [typeface.json](http://gero3.github.io/facetype.js/) generated fonts.
 * Some existing fonts can be found located in `/examples/fonts`.
 *
 * ```js
 * const loader = new FontLoader();
 * const font = await loader.loadAsync( 'fonts/helvetiker_regular.typeface.json' );
 * const geometry = new TextGeometry( 'Hello three.js!', {
 * 	font: font,
 * 	size: 80,
 * 	depth: 5,
 * 	curveSegments: 12
 * } );
 * ```
 *
 * @augments ExtrudeGeometry
 * @three_import import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
 */
export class TextGeometry extends ExtrudeGeometry {
    static fromJSON(data: any): TextGeometry;
    /**
     * Constructs a new text geometry.
     *
     * @param {string} text - The text that should be transformed into a geometry.
     * @param {TextGeometry~Options} [parameters] - The text settings.
     */
    constructor(text: string, parameters?: {});
}
import { ExtrudeGeometry } from 'three';
