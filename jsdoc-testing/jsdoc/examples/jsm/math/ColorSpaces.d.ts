/**
 * Display-P3 color space.
 *
 * @type {string}
 * @constant
 */
export const DisplayP3ColorSpace: string;
/**
 * Display-P3-Linear color space.
 *
 * @type {string}
 * @constant
 */
export const LinearDisplayP3ColorSpace: string;
/**
 * Implementation object for the Display-P3 color space.
 *
 * @type {module:ColorSpaces~ColorSpaceImpl}
 * @constant
 */
export const DisplayP3ColorSpaceImpl: any;
/**
 * Implementation object for the Display-P3-Linear color space.
 *
 * @type {module:ColorSpaces~ColorSpaceImpl}
 * @constant
 */
export const LinearDisplayP3ColorSpaceImpl: any;
/**
 * Rec2020-Linear color space.
 *
 * @type {string}
 * @constant
 */
export const LinearRec2020ColorSpace: string;
/**
 * Implementation object for the Rec2020-Linear color space.
 *
 * @type {module:ColorSpaces~ColorSpaceImpl}
 * @constant
 */
export const LinearRec2020ColorSpaceImpl: any;
/**
 * Extended-sRGB color space.
 *
 * @type {string}
 * @constant
 */
export const ExtendedSRGBColorSpace: string;
/**
 * Implementation object for the Extended-sRGB color space.
 *
 * @type {module:ColorSpaces~ColorSpaceImpl}
 * @constant
 */
export const ExtendedSRGBColorSpaceImpl: any;
/**
 * :ColorSpaces~ColorSpaceImpl
 */
export type module = {
    /**
     * - The primaries.
     */
    primaries: Array<number>;
    /**
     * - The white point.
     */
    whitePoint: Array<number>;
    /**
     * - A color space conversion matrix, converting to CIE XYZ.
     */
    toXYZ: Matrix3;
    /**
     * - A color space conversion matrix, converting from CIE XYZ.
     */
    fromXYZ: Matrix3;
    /**
     * - The luminance coefficients.
     */
    luminanceCoefficients: Array<number>;
    /**
     * - The working color space config.
     */
    workingColorSpaceConfig?: {
        unpackColorSpace: string;
    } | undefined;
    /**
     * - The drawing buffer color space config.
     */
    outputColorSpaceConfig?: {
        drawingBufferColorSpace: string;
    } | undefined;
};
import { Matrix3 } from 'three';
