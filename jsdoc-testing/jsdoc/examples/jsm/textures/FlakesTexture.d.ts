/**
 * Utility class for generating a flakes texture image. This image might be used
 * as a normal map to produce a car paint like effect.
 *
 * @three_import import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';
 */
export class FlakesTexture {
    /**
     * Generates a new flakes texture image. The result is a canvas
     * that can be used as an input for {@link CanvasTexture}.
     *
     * @param {number} [width=512] - The width of the image.
     * @param {number} [height=512] - The height of the image.
     * @return {HTMLCanvasElement} The generated image.
     */
    constructor(width?: number, height?: number);
}
