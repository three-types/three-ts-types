export default opentype;
export type GlyphOptions = {
    unicode?: number | undefined;
    unicodes?: any[] | undefined;
    xMin?: number | undefined;
    yMin?: number | undefined;
    xMax?: number | undefined;
    yMax?: number | undefined;
    advanceWidth?: number | undefined;
};
export type ContextParams = {
    /**
     * current item index
     */
    currentIndex: number;
};
export type SubstitutionAction = {
    /**
     * feature tag
     */
    tag: string;
    /**
     * substitution value(s)
     */
    substitution: any;
};
export type FontOptions = {
    familyName: string;
    styleName: string;
    fullName?: string | undefined;
    postScriptName?: string | undefined;
    designer?: string | undefined;
    designerURL?: string | undefined;
    manufacturer?: string | undefined;
    manufacturerURL?: string | undefined;
    license?: string | undefined;
    licenseURL?: string | undefined;
    version?: string | undefined;
    description?: string | undefined;
    copyright?: string | undefined;
    trademark?: string | undefined;
    unitsPerEm: number;
    ascender: number;
    descender: number;
    createdTimestamp: number;
    weightClass?: string | undefined;
    widthClass?: string | undefined;
    fsSelection?: string | undefined;
};
export type TableData = {
    /**
     * - The data offset.
     */
    offset: number;
};
export type FQuery = {};
export type GlyphRenderOptions = {
    /**
     * - language system used to determine which features to apply.
     *    See https://www.microsoft.com/typography/developers/opentype/languagetags.aspx
     */
    language?: string | undefined;
    /**
     * - whether to include kerning values
     */
    kerning?: boolean | undefined;
    /**
     * - OpenType Layout feature tags. Used to enable or disable the features of the given script/language system.
     *    See https://www.microsoft.com/typography/otspec/featuretags.htm
     */
    features?: object | undefined;
};
declare var opentype: Readonly<{
    __proto__: null;
    Font: typeof Font;
    Glyph: typeof Glyph;
    Path: typeof Path;
    BoundingBox: typeof BoundingBox;
    _parse: {
        getByte: typeof getByte;
        getCard8: typeof getByte;
        getUShort: typeof getUShort;
        getCard16: typeof getUShort;
        getShort: typeof getShort;
        getULong: typeof getULong;
        getFixed: typeof getFixed;
        getTag: typeof getTag;
        getOffset: typeof getOffset;
        getBytes: typeof getBytes;
        bytesToString: typeof bytesToString;
        Parser: typeof Parser;
    };
    parse: typeof parseBuffer;
    load: typeof load;
}>;
/**
 * A bounding box is an enclosing box that describes the smallest measure within which all the points lie.
 * It is used to calculate the bounding box of a glyph or text path.
 *
 * On initialization, x1/y1/x2/y2 will be NaN. Check if the bounding box is empty using `isEmpty()`.
 *
 * @exports opentype.BoundingBox
 * @class
 * @constructor
 */
export function BoundingBox(): void;
export class BoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /**
     * Returns true if the bounding box is empty, that is, no points have been added to the box yet.
     */
    isEmpty(): boolean;
    /**
     * Add the point to the bounding box.
     * The x1/y1/x2/y2 coordinates of the bounding box will now encompass the given point.
     * @param {number} x - The X coordinate of the point.
     * @param {number} y - The Y coordinate of the point.
     */
    addPoint(x: number, y: number): void;
    /**
     * Add a X coordinate to the bounding box.
     * This extends the bounding box to include the X coordinate.
     * This function is used internally inside of addBezier.
     * @param {number} x - The X coordinate of the point.
     */
    addX(x: number): void;
    /**
     * Add a Y coordinate to the bounding box.
     * This extends the bounding box to include the Y coordinate.
     * This function is used internally inside of addBezier.
     * @param {number} y - The Y coordinate of the point.
     */
    addY(y: number): void;
    /**
     * Add a Bézier curve to the bounding box.
     * This extends the bounding box to include the entire Bézier.
     * @param {number} x0 - The starting X coordinate.
     * @param {number} y0 - The starting Y coordinate.
     * @param {number} x1 - The X coordinate of the first control point.
     * @param {number} y1 - The Y coordinate of the first control point.
     * @param {number} x2 - The X coordinate of the second control point.
     * @param {number} y2 - The Y coordinate of the second control point.
     * @param {number} x - The ending X coordinate.
     * @param {number} y - The ending Y coordinate.
     */
    addBezier(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x: number, y: number): void;
    /**
     * Add a quadratic curve to the bounding box.
     * This extends the bounding box to include the entire quadratic curve.
     * @param {number} x0 - The starting X coordinate.
     * @param {number} y0 - The starting Y coordinate.
     * @param {number} x1 - The X coordinate of the control point.
     * @param {number} y1 - The Y coordinate of the control point.
     * @param {number} x - The ending X coordinate.
     * @param {number} y - The ending Y coordinate.
     */
    addQuad(x0: number, y0: number, x1: number, y1: number, x: number, y: number): void;
}
/**
 * @typedef FontOptions
 * @type Object
 * @property {Boolean} empty - whether to create a new empty font
 * @property {string} familyName
 * @property {string} styleName
 * @property {string=} fullName
 * @property {string=} postScriptName
 * @property {string=} designer
 * @property {string=} designerURL
 * @property {string=} manufacturer
 * @property {string=} manufacturerURL
 * @property {string=} license
 * @property {string=} licenseURL
 * @property {string=} version
 * @property {string=} description
 * @property {string=} copyright
 * @property {string=} trademark
 * @property {Number} unitsPerEm
 * @property {Number} ascender
 * @property {Number} descender
 * @property {Number} createdTimestamp
 * @property {string=} weightClass
 * @property {string=} widthClass
 * @property {string=} fsSelection
 */
/**
 * A Font represents a loaded OpenType font file.
 * It contains a set of glyphs and methods to draw text on a drawing context,
 * or to get a path representing the text.
 * @exports opentype.Font
 * @class
 * @param {FontOptions}
 * @constructor
 */
export function Font(options: any): void;
export class Font {
    /**
     * @typedef FontOptions
     * @type Object
     * @property {Boolean} empty - whether to create a new empty font
     * @property {string} familyName
     * @property {string} styleName
     * @property {string=} fullName
     * @property {string=} postScriptName
     * @property {string=} designer
     * @property {string=} designerURL
     * @property {string=} manufacturer
     * @property {string=} manufacturerURL
     * @property {string=} license
     * @property {string=} licenseURL
     * @property {string=} version
     * @property {string=} description
     * @property {string=} copyright
     * @property {string=} trademark
     * @property {Number} unitsPerEm
     * @property {Number} ascender
     * @property {Number} descender
     * @property {Number} createdTimestamp
     * @property {string=} weightClass
     * @property {string=} widthClass
     * @property {string=} fsSelection
     */
    /**
     * A Font represents a loaded OpenType font file.
     * It contains a set of glyphs and methods to draw text on a drawing context,
     * or to get a path representing the text.
     * @exports opentype.Font
     * @class
     * @param {FontOptions}
     * @constructor
     */
    constructor(options: any);
    names: {
        fontFamily: {
            en: any;
        };
        fontSubfamily: {
            en: any;
        };
        fullName: {
            en: any;
        };
        postScriptName: {
            en: any;
        };
        designer: {
            en: any;
        };
        designerURL: {
            en: any;
        };
        manufacturer: {
            en: any;
        };
        manufacturerURL: {
            en: any;
        };
        license: {
            en: any;
        };
        licenseURL: {
            en: any;
        };
        version: {
            en: any;
        };
        description: {
            en: any;
        };
        copyright: {
            en: any;
        };
        trademark: {
            en: any;
        };
    } | undefined;
    unitsPerEm: any;
    ascender: any;
    descender: any;
    createdTimestamp: any;
    tables: any;
    supported: boolean;
    glyphs: GlyphSet;
    encoding: DefaultEncoding;
    position: Position;
    substitution: Substitution;
    _push: any;
    _hmtxTableData: {};
    /**
     * Check if the font has a glyph for the given character.
     * @param  {string}
     * @return {Boolean}
     */
    hasChar(c: any): boolean;
    /**
     * Convert the given character to a single glyph index.
     * Note that this function assumes that there is a one-to-one mapping between
     * the given character and a glyph; for complex scripts this might not be the case.
     * @param  {string}
     * @return {Number}
     */
    charToGlyphIndex(s: any): number;
    /**
     * Convert the given character to a single Glyph object.
     * Note that this function assumes that there is a one-to-one mapping between
     * the given character and a glyph; for complex scripts this might not be the case.
     * @param  {string}
     * @return {opentype.Glyph}
     */
    charToGlyph(c: any): opentype.Glyph;
    /**
     * Update features
     * @param {any} options features options
     */
    updateFeatures(options: any): {
        script: string;
        tags: string[];
    }[];
    /**
     * Convert the given text to a list of Glyph objects.
     * Note that there is no strict one-to-one mapping between characters and
     * glyphs, so the list of returned glyphs can be larger or smaller than the
     * length of the given string.
     * @param  {string}
     * @param  {GlyphRenderOptions} [options]
     * @return {opentype.Glyph[]}
     */
    stringToGlyphs(s: any, options?: GlyphRenderOptions): opentype.Glyph[];
    /**
     * @param  {string}
     * @return {Number}
     */
    nameToGlyphIndex(name: any): number;
    /**
     * @param  {string}
     * @return {opentype.Glyph}
     */
    nameToGlyph(name: any): opentype.Glyph;
    /**
     * @param  {Number}
     * @return {String}
     */
    glyphIndexToName(gid: any): string;
    /**
     * Retrieve the value of the kerning pair between the left glyph (or its index)
     * and the right glyph (or its index). If no kerning pair is found, return 0.
     * The kerning value gets added to the advance width when calculating the spacing
     * between glyphs.
     * For GPOS kerning, this method uses the default script and language, which covers
     * most use cases. To have greater control, use font.position.getKerningValue .
     * @param  {opentype.Glyph} leftGlyph
     * @param  {opentype.Glyph} rightGlyph
     * @return {Number}
     */
    getKerningValue(leftGlyph: opentype.Glyph, rightGlyph: opentype.Glyph): number;
    /**
     * @typedef GlyphRenderOptions
     * @type Object
     * @property {string} [script] - script used to determine which features to apply. By default, 'DFLT' or 'latn' is used.
     *                               See https://www.microsoft.com/typography/otspec/scripttags.htm
     * @property {string} [language='dflt'] - language system used to determine which features to apply.
     *                                        See https://www.microsoft.com/typography/developers/opentype/languagetags.aspx
     * @property {boolean} [kerning=true] - whether to include kerning values
     * @property {object} [features] - OpenType Layout feature tags. Used to enable or disable the features of the given script/language system.
     *                                 See https://www.microsoft.com/typography/otspec/featuretags.htm
     */
    defaultRenderOptions: {
        kerning: boolean;
        features: {
            script: string;
            tags: string[];
        }[];
    };
    /**
     * Helper function that invokes the given callback for each glyph in the given text.
     * The callback gets `(glyph, x, y, fontSize, options)`.* @param  {string} text
     * @param {string} text - The text to apply.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {GlyphRenderOptions=} options
     * @param  {Function} callback
     */
    forEachGlyph(text: string, x?: number, y?: number, fontSize?: number, options?: GlyphRenderOptions | undefined, callback: Function): number;
    /**
     * Create a Path object that represents the given text.
     * @param  {string} text - The text to create.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {GlyphRenderOptions=} options
     * @return {opentype.Path}
     */
    getPath(text: string, x?: number, y?: number, fontSize?: number, options?: GlyphRenderOptions | undefined): opentype.Path;
    /**
     * Create an array of Path objects that represent the glyphs of a given text.
     * @param  {string} text - The text to create.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {GlyphRenderOptions=} options
     * @return {opentype.Path[]}
     */
    getPaths(text: string, x?: number, y?: number, fontSize?: number, options?: GlyphRenderOptions | undefined): opentype.Path[];
    /**
     * Returns the advance width of a text.
     *
     * This is something different than Path.getBoundingBox() as for example a
     * suffixed whitespace increases the advanceWidth but not the bounding box
     * or an overhanging letter like a calligraphic 'f' might have a quite larger
     * bounding box than its advance width.
     *
     * This corresponds to canvas2dContext.measureText(text).width
     *
     * @param  {string} text - The text to create.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {GlyphRenderOptions=} options
     * @return advance width
     */
    getAdvanceWidth(text: string, fontSize?: number, options?: GlyphRenderOptions | undefined): number;
    /**
     * Draw the text on the given drawing context.
     * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
     * @param  {string} text - The text to create.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {GlyphRenderOptions=} options
     */
    draw(ctx: CanvasRenderingContext2D, text: string, x?: number, y?: number, fontSize?: number, options?: GlyphRenderOptions | undefined): void;
    /**
     * Draw the points of all glyphs in the text.
     * On-curve points will be drawn in blue, off-curve points will be drawn in red.
     * @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
     * @param {string} text - The text to create.
     * @param {number} [x=0] - Horizontal position of the beginning of the text.
     * @param {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param {GlyphRenderOptions=} options
     */
    drawPoints(ctx: CanvasRenderingContext2D, text: string, x?: number, y?: number, fontSize?: number, options?: GlyphRenderOptions | undefined): void;
    /**
     * Draw lines indicating important font measurements for all glyphs in the text.
     * Black lines indicate the origin of the coordinate system (point 0,0).
     * Blue lines indicate the glyph bounding box.
     * Green line indicates the advance width of the glyph.
     * @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
     * @param {string} text - The text to create.
     * @param {number} [x=0] - Horizontal position of the beginning of the text.
     * @param {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param {GlyphRenderOptions=} options
     */
    drawMetrics(ctx: CanvasRenderingContext2D, text: string, x?: number, y?: number, fontSize?: number, options?: GlyphRenderOptions | undefined): void;
    /**
     * @param  {string}
     * @return {string}
     */
    getEnglishName(name: any): string;
    /**
     * Validate
     */
    validate(): void;
    /**
     * Convert the font object to a SFNT data structure.
     * This structure contains all the necessary tables and metadata to create a binary OTF file.
     * @return {opentype.Table}
     */
    toTables(): opentype.Table;
    /**
     * @deprecated Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.
     */
    toBuffer(): ArrayBuffer;
    /**
     * Converts a `opentype.Font` into an `ArrayBuffer`
     * @return {ArrayBuffer}
     */
    toArrayBuffer(): ArrayBuffer;
    /**
     * Initiate a download of the OpenType font.
     */
    download(fileName: any): void;
    /**
     * @private
     */
    private fsSelectionValues;
    /**
     * @private
     */
    private usWidthClasses;
    /**
     * @private
     */
    private usWeightClasses;
}
/**
 * @typedef GlyphOptions
 * @type Object
 * @property {string} [name] - The glyph name
 * @property {number} [unicode]
 * @property {Array} [unicodes]
 * @property {number} [xMin]
 * @property {number} [yMin]
 * @property {number} [xMax]
 * @property {number} [yMax]
 * @property {number} [advanceWidth]
 */
/**
 * @exports opentype.Glyph
 * @class
 * @param {GlyphOptions}
 * @constructor
 */
export function Glyph(options: any): void;
export class Glyph {
    /**
     * @typedef GlyphOptions
     * @type Object
     * @property {string} [name] - The glyph name
     * @property {number} [unicode]
     * @property {Array} [unicodes]
     * @property {number} [xMin]
     * @property {number} [yMin]
     * @property {number} [xMax]
     * @property {number} [yMax]
     * @property {number} [advanceWidth]
     */
    /**
     * @exports opentype.Glyph
     * @class
     * @param {GlyphOptions}
     * @constructor
     */
    constructor(options: any);
    /**
     * @param  {GlyphOptions}
     */
    bindConstructorValues(options: any): void;
    index: any;
    name: any;
    unicode: any;
    unicodes: any[] | undefined;
    xMin: any;
    yMin: any;
    xMax: any;
    yMax: any;
    advanceWidth: any;
    /**
     * @param {number}
     */
    addUnicode(unicode: any): void;
    /**
     * Calculate the minimum bounding box for this glyph.
     * @return {opentype.BoundingBox}
     */
    getBoundingBox(): opentype.BoundingBox;
    /**
     * Convert the glyph to a Path we can draw on a drawing context.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {Object=} options - xScale, yScale to stretch the glyph.
     * @param  {opentype.Font} if hinting is to be used, the font
     * @return {opentype.Path}
     */
    getPath(x?: number, y?: number, fontSize?: number, options?: Object | undefined, font: any): opentype.Path;
    /**
     * Split the glyph into contours.
     * This function is here for backwards compatibility, and to
     * provide raw access to the TrueType glyph outlines.
     * @return {Array}
     */
    getContours(): any[];
    /**
     * Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
     * @return {Object}
     */
    getMetrics(): Object;
    /**
     * Draw the glyph on the given context.
     * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     * @param  {Object=} options - xScale, yScale to stretch the glyph.
     */
    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, fontSize?: number, options?: Object | undefined): void;
    /**
     * Draw the points of the glyph.
     * On-curve points will be drawn in blue, off-curve points will be drawn in red.
     * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     */
    drawPoints(ctx: CanvasRenderingContext2D, x?: number, y?: number, fontSize?: number): void;
    /**
     * Draw lines indicating important font measurements.
     * Black lines indicate the origin of the coordinate system (point 0,0).
     * Blue lines indicate the glyph bounding box.
     * Green line indicates the advance width of the glyph.
     * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
     * @param  {number} [x=0] - Horizontal position of the beginning of the text.
     * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
     * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
     */
    drawMetrics(ctx: CanvasRenderingContext2D, x?: number, y?: number, fontSize?: number): void;
}
/**
 * A bézier path containing a set of path commands similar to a SVG path.
 * Paths can be drawn on a context using `draw`.
 * @exports opentype.Path
 * @class
 * @constructor
 */
export function Path(): void;
export class Path {
    commands: any[];
    fill: string;
    stroke: any;
    strokeWidth: number;
    /**
     * @param  {number} x
     * @param  {number} y
     */
    moveTo(x: number, y: number): void;
    /**
     * @param  {number} x
     * @param  {number} y
     */
    lineTo(x: number, y: number): void;
    /**
     * Draws cubic curve
     * @function
     * curveTo
     * @memberof opentype.Path.prototype
     * @param  {number} x1 - x of control 1
     * @param  {number} y1 - y of control 1
     * @param  {number} x2 - x of control 2
     * @param  {number} y2 - y of control 2
     * @param  {number} x - x of path point
     * @param  {number} y - y of path point
     */
    /**
     * Draws cubic curve
     * @function
     * bezierCurveTo
     * @memberof opentype.Path.prototype
     * @param  {number} x1 - x of control 1
     * @param  {number} y1 - y of control 1
     * @param  {number} x2 - x of control 2
     * @param  {number} y2 - y of control 2
     * @param  {number} x - x of path point
     * @param  {number} y - y of path point
     * @see curveTo
     */
    curveTo: (x1: number, y1: number, x2: number, y2: number, x: number, y: number) => void;
    bezierCurveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): void;
    /**
     * Draws quadratic curve
     * @function
     * quadraticCurveTo
     * @memberof opentype.Path.prototype
     * @param  {number} x1 - x of control
     * @param  {number} y1 - y of control
     * @param  {number} x - x of path point
     * @param  {number} y - y of path point
     */
    /**
     * Draws quadratic curve
     * @function
     * quadTo
     * @memberof opentype.Path.prototype
     * @param  {number} x1 - x of control
     * @param  {number} y1 - y of control
     * @param  {number} x - x of path point
     * @param  {number} y - y of path point
     */
    quadTo: (x1: number, y1: number, x: number, y: number) => void;
    quadraticCurveTo(x1: number, y1: number, x: number, y: number): void;
    /**
     * Closes the path
     * @function closePath
     * @memberof opentype.Path.prototype
     */
    /**
     * Close the path
     * @function close
     * @memberof opentype.Path.prototype
     */
    close: () => void;
    closePath(): void;
    /**
     * Add the given path or list of commands to the commands of this path.
     * @param  {Array} pathOrCommands - another opentype.Path, an opentype.BoundingBox, or an array of commands.
     */
    extend(pathOrCommands: any[]): void;
    /**
     * Calculate the bounding box of the path.
     * @returns {opentype.BoundingBox}
     */
    getBoundingBox(): opentype.BoundingBox;
    /**
     * Draw the path to a 2D context.
     * @param {CanvasRenderingContext2D} ctx - A 2D drawing context.
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * Convert the Path to a string of path data instructions
     * See http://www.w3.org/TR/SVG/paths.html#PathData
     * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
     * @return {string}
     */
    toPathData(decimalPlaces?: number): string;
    /**
     * Convert the path to an SVG <path> element, as a string.
     * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
     * @return {string}
     */
    toSVG(decimalPlaces?: number): string;
    /**
     * Convert the path to a DOM element.
     * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
     * @return {SVGPathElement}
     */
    toDOMElement(decimalPlaces?: number): SVGPathElement;
}
declare namespace parse {
    export { getByte };
    export { getByte as getCard8 };
    export { getUShort };
    export { getUShort as getCard16 };
    export { getShort };
    export { getULong };
    export { getFixed };
    export { getTag };
    export { getOffset };
    export { getBytes };
    export { bytesToString };
    export { Parser };
}
/**
 * Asynchronously load the font from a URL or a filesystem. When done, call the callback
 * with two arguments `(err, font)`. The `err` will be null on success,
 * the `font` is a Font object.
 * We use the node.js callback convention so that
 * opentype.js can integrate with frameworks like async.js.
 * @alias opentype.load
 * @param  {string} url - The URL of the font to load.
 * @param  {Function} callback - The callback.
 */
export function load(url: string, callback: Function, opt: any): Promise<any>;
/**
 * Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
 * Throws an error if the font could not be parsed.
 * @param  {ArrayBuffer}
 * @param  {Object} opt - options for parsing
 * @return {opentype.Font}
 */
declare function parseBuffer(buffer: any, opt: Object): opentype.Font;
declare function getByte(dataView: any, offset: any): any;
declare function getUShort(dataView: any, offset: any): any;
declare function getShort(dataView: any, offset: any): any;
declare function getULong(dataView: any, offset: any): any;
declare function getFixed(dataView: any, offset: any): any;
declare function getTag(dataView: any, offset: any): string;
declare function getOffset(dataView: any, offset: any, offSize: any): number;
declare function getBytes(dataView: any, startOffset: any, endOffset: any): any[];
declare function bytesToString(bytes: any): string;
declare function Parser(data: any, offset: any): void;
declare class Parser {
    constructor(data: any, offset: any);
    data: any;
    offset: any;
    relativeOffset: number;
    parseByte(): any;
    parseChar(): any;
    parseCard8: any;
    parseUShort(): any;
    parseCard16: any;
    parseSID: any;
    parseOffset16: any;
    parseShort(): any;
    parseF2Dot14(): number;
    parseULong(): any;
    parseOffset32: any;
    parseFixed(): any;
    parseString(length: any): string;
    parseTag(): string;
    parseLongDateTime(): any;
    parseVersion(minorBase: any): any;
    skip(type: any, amount: any): void;
    parseULongList(count: any): any[];
    parseOffset16List: (count: any) => any[];
    parseUShortList(count: any): any[];
    parseShortList(count: any): any[];
    parseByteList(count: any): any[];
    /**
     * Parse a list of items.
     * Record count is optional, if omitted it is read from the stream.
     * itemCallback is one of the Parser methods.
     */
    parseList(count: any, itemCallback: any): any[];
    parseList32(count: any, itemCallback: any): any[];
    /**
     * Parse a list of records.
     * Record count is optional, if omitted it is read from the stream.
     * Example of recordDescription: { sequenceIndex: Parser.uShort, lookupListIndex: Parser.uShort }
     */
    parseRecordList(count: any, recordDescription: any): any[];
    parseRecordList32(count: any, recordDescription: any): any[];
    parseStruct(description: any): any;
    /**
     * Parse a GPOS valueRecord
     * https://docs.microsoft.com/en-us/typography/opentype/spec/gpos#value-record
     * valueFormat is optional, if omitted it is read from the stream.
     */
    parseValueRecord(valueFormat: any): {
        xPlacement: any;
        yPlacement: any;
        xAdvance: any;
        yAdvance: any;
        xPlaDevice: any;
        yPlaDevice: any;
        xAdvDevice: any;
        yAdvDevice: any;
    } | undefined;
    /**
     * Parse a list of GPOS valueRecords
     * https://docs.microsoft.com/en-us/typography/opentype/spec/gpos#value-record
     * valueFormat and valueCount are read from the stream.
     */
    parseValueRecordList(): any[];
    parsePointer(description: any): any;
    parsePointer32(description: any): any;
    /**
     * Parse a list of offsets to lists of 16-bit integers,
     * or a list of offsets to lists of offsets to any kind of items.
     * If itemCallback is not provided, a list of list of UShort is assumed.
     * If provided, itemCallback is called on each item and must parse the item.
     * See examples in tables/gsub.js
     */
    parseListOfLists(itemCallback: any): any[];
    parseCoverage(): {
        format: number;
        glyphs: any[];
        ranges?: undefined;
    } | {
        format: number;
        ranges: any[];
        glyphs?: undefined;
    };
    parseClassDef(): {
        format: number;
        startGlyph: any;
        classes: any[];
        ranges?: undefined;
    } | {
        format: number;
        ranges: any[];
        startGlyph?: undefined;
        classes?: undefined;
    };
    parseScriptList(): any;
    parseFeatureList(): any;
    parseLookupList(lookupTableParsers: any): any;
    parseFeatureVariationsList(): any;
}
declare namespace Parser {
    function list(count: any, itemCallback: any): () => any;
    function list32(count: any, itemCallback: any): () => any;
    function recordList(count: any, recordDescription: any): () => any;
    function recordList32(count: any, recordDescription: any): () => any;
    function pointer(description: any): () => any;
    function pointer32(description: any): () => any;
    let tag: any;
    let byte: any;
    let uShort: any;
    let offset16: any;
    let uShortList: any;
    let uLong: any;
    let offset32: any;
    let uLongList: any;
    let struct: any;
    let coverage: any;
    let classDef: any;
}
/**
 * A GlyphSet represents all glyphs available in the font, but modelled using
 * a deferred glyph loader, for retrieving glyphs only once they are absolutely
 * necessary, to keep the memory footprint down.
 * @exports opentype.GlyphSet
 * @class
 * @param {opentype.Font}
 * @param {Array}
 */
declare function GlyphSet(font: any, glyphs: any): void;
declare class GlyphSet {
    /**
     * A GlyphSet represents all glyphs available in the font, but modelled using
     * a deferred glyph loader, for retrieving glyphs only once they are absolutely
     * necessary, to keep the memory footprint down.
     * @exports opentype.GlyphSet
     * @class
     * @param {opentype.Font}
     * @param {Array}
     */
    constructor(font: any, glyphs: any);
    font: any;
    glyphs: {};
    length: any;
    /**
     * @param  {number} index
     * @return {opentype.Glyph}
     */
    get(index: number): opentype.Glyph;
    /**
     * @param  {number} index
     * @param  {Object}
     */
    push(index: number, loader: any): void;
}
/**
 * This is the encoding used for fonts created from scratch.
 * It loops through all glyphs and finds the appropriate unicode value.
 * Since it's linear time, other encodings will be faster.
 * @exports opentype.DefaultEncoding
 * @class
 * @constructor
 * @param {opentype.Font}
 */
declare function DefaultEncoding(font: any): void;
declare class DefaultEncoding {
    /**
     * This is the encoding used for fonts created from scratch.
     * It loops through all glyphs and finds the appropriate unicode value.
     * Since it's linear time, other encodings will be faster.
     * @exports opentype.DefaultEncoding
     * @class
     * @constructor
     * @param {opentype.Font}
     */
    constructor(font: any);
    font: any;
    charToGlyphIndex(c: any): number | null;
}
/**
 * @exports opentype.Position
 * @class
 * @extends opentype.Layout
 * @param {opentype.Font}
 * @constructor
 */
declare function Position(font: any): void;
declare class Position {
    /**
     * @exports opentype.Position
     * @class
     * @extends opentype.Layout
     * @param {opentype.Font}
     * @constructor
     */
    constructor(font: any);
    /**
     * Init some data for faster and easier access later.
     */
    init(): void;
    defaultKerningTables: object[] | undefined;
    /**
     * Find a glyph pair in a list of lookup tables of type 2 and retrieve the xAdvance kerning value.
     *
     * @param {integer} leftIndex - left glyph index
     * @param {integer} rightIndex - right glyph index
     * @returns {integer}
     */
    getKerningValue(kerningLookups: any, leftIndex: integer, rightIndex: integer): integer;
    /**
     * List all kerning lookup tables.
     *
     * @param {string} [script='DFLT'] - use font.position.getDefaultScriptName() for a better default value
     * @param {string} [language='dflt']
     * @return {object[]} The list of kerning lookup tables (may be empty), or undefined if there is no GPOS table (and we should use the kern table)
     */
    getKerningTables(script?: string, language?: string): object[];
}
/**
 * @exports opentype.Substitution
 * @class
 * @extends opentype.Layout
 * @param {opentype.Font}
 * @constructor
 */
declare function Substitution(font: any): void;
declare class Substitution {
    /**
     * @exports opentype.Substitution
     * @class
     * @extends opentype.Layout
     * @param {opentype.Font}
     * @constructor
     */
    constructor(font: any);
    /**
     * Create a default GSUB table.
     * @return {Object} gsub - The GSUB table.
     */
    createDefaultTable(): Object;
    /**
     * List all single substitutions (lookup type 1) for a given script, language, and feature.
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     * @param {string} feature - 4-character feature name ('aalt', 'salt', 'ss01'...)
     * @return {Array} substitutions - The list of substitutions.
     */
    getSingle(feature: string, script?: string, language?: string): any[];
    /**
     * List all multiple substitutions (lookup type 2) for a given script, language, and feature.
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     * @param {string} feature - 4-character feature name ('ccmp', 'stch')
     * @return {Array} substitutions - The list of substitutions.
     */
    getMultiple(feature: string, script?: string, language?: string): any[];
    /**
     * List all alternates (lookup type 3) for a given script, language, and feature.
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     * @param {string} feature - 4-character feature name ('aalt', 'salt'...)
     * @return {Array} alternates - The list of alternates
     */
    getAlternates(feature: string, script?: string, language?: string): any[];
    /**
     * List all ligatures (lookup type 4) for a given script, language, and feature.
     * The result is an array of ligature objects like { sub: [ids], by: id }
     * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     * @return {Array} ligatures - The list of ligatures.
     */
    getLigatures(feature: string, script?: string, language?: string): any[];
    /**
     * Add or modify a single substitution (lookup type 1)
     * Format 2, more flexible, is always used.
     * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
     * @param {Object} substitution - { sub: id, by: id } (format 1 is not supported)
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     */
    addSingle(feature: string, substitution: Object, script?: string, language?: string): void;
    /**
     * Add or modify a multiple substitution (lookup type 2)
     * @param {string} feature - 4-letter feature name ('ccmp', 'stch')
     * @param {Object} substitution - { sub: id, by: [id] } for format 2.
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     */
    addMultiple(feature: string, substitution: Object, script?: string, language?: string): void;
    /**
     * Add or modify an alternate substitution (lookup type 3)
     * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
     * @param {Object} substitution - { sub: id, by: [ids] }
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     */
    addAlternate(feature: string, substitution: Object, script?: string, language?: string): void;
    /**
     * Add a ligature (lookup type 4)
     * Ligatures with more components must be stored ahead of those with fewer components in order to be found
     * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
     * @param {Object} ligature - { sub: [ids], by: id }
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     */
    addLigature(feature: string, ligature: Object, script?: string, language?: string): void;
    /**
     * List all feature data for a given script and language.
     * @param {string} feature - 4-letter feature name
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     * @return {Array} substitutions - The list of substitutions.
     */
    getFeature(feature: string, script?: string, language?: string): any[];
    /**
     * Add a substitution to a feature for a given script and language.
     * @param {string} feature - 4-letter feature name
     * @param {Object} sub - the substitution to add (an object like { sub: id or [ids], by: id or [ids] })
     * @param {string} [script='DFLT']
     * @param {string} [language='dflt']
     */
    add(feature: string, sub: Object, script?: string, language?: string): void;
}
export { parse as _parse, parseBuffer as parse };
