/**
 * This class is only relevant when using {@link RectAreaLight} with {@link WebGLRenderer}.
 *
 * Before rect area lights can be used, the internal uniform library of the renderer must be
 * enhanced with the following code.
 *
 * ```js
 * RectAreaLightUniformsLib.init();
 * ```
 *
 * @hideconstructor
 * @three_import import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
 */
export class RectAreaLightUniformsLib {
    /**
     * Inits the uniform library required when using rect area lights.
     */
    static init(): void;
}
