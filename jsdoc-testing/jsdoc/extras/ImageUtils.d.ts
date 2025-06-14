/**
 * A class containing utility functions for images.
 *
 * @hideconstructor
 */
export class ImageUtils {
    /**
     * Returns a data URI containing a representation of the given image.
     *
     * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
     * @param {string} [type='image/png'] - Indicates the image format.
     * @return {string} The data URI.
     */
    static getDataURL(image: (HTMLImageElement | HTMLCanvasElement), type?: string): string;
    /**
     * Converts the given sRGB image data to linear color space.
     *
     * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
     * @return {HTMLCanvasElement|Object} The converted image.
     */
    static sRGBToLinear(image: (HTMLImageElement | HTMLCanvasElement | ImageBitmap | Object)): HTMLCanvasElement | Object;
}
