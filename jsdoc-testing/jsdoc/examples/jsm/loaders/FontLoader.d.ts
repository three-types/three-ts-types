/**
 * A loader for loading fonts.
 *
 * You can convert fonts online using [facetype.js](https://gero3.github.io/facetype.js/).
 *
 * ```js
 * const loader = new FontLoader();
 * const font = await loader.loadAsync( 'fonts/helvetiker_regular.typeface.json' );
 * ```
 *
 * @augments Loader
 * @three_import import { FontLoader } from 'three/addons/loaders/FontLoader.js';
 */
export class FontLoader extends Loader {
    /**
     * Constructs a new font loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    /**
     * Starts loading from the given URL and passes the loaded font
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Font)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Font) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given font data and returns the resulting font.
     *
     * @param {Object} json - The raw font data as a JSON object.
     * @return {Font} The font.
     */
    parse(json: Object): Font;
}
/**
 * Class representing a font.
 */
export class Font {
    /**
     * Constructs a new font.
     *
     * @param {Object} data - The font data as JSON.
     */
    constructor(data: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isFont: boolean;
    type: string;
    /**
     * The font data as JSON.
     *
     * @type {Object}
     */
    data: Object;
    /**
     * Generates geometry shapes from the given text and size. The result of this method
     * should be used with {@link ShapeGeometry} to generate the actual geometry data.
     *
     * @param {string} text - The text.
     * @param {number} [size=100] - The text size.
     * @param {string} [direction='ltr'] - Char direction: ltr(left to right), rtl(right to left) & tb(top bottom).
     * @return {Array<Shape>} An array of shapes representing the text.
     */
    generateShapes(text: string, size?: number, direction?: string): Array<Shape>;
}
import { Loader } from 'three';
