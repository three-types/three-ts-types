/**
 * Texture library for {@link RectAreaLight}. This class holds the LTC BRDF data
 * in data textures for further use in the renderer.
 *
 * Reference: Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
 * by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt. [Code](https://github.com/selfshadow/ltc_code/).
 *
 * NOTE: This is a temporary location for the BRDF approximation texture data
 * based off of Eric Heitz's work (see citation). BRDF data for
 * `RectAreaLight` is currently approximated using a precomputed texture
 * of roughly 80kb in size. The hope is to find a better way to include
 * the large texture data before including the full RectAreaLight implementation
 * in the main build files.
 *
 * @hideconstructor
 * @three_import import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';
 */
export class RectAreaLightTexturesLib {
    /**
     * Inits the texture library.
     *
     * @return {RectAreaLightTexturesLib}
     */
    static init(): RectAreaLightTexturesLib;
}
export namespace RectAreaLightTexturesLib {
    let LTC_HALF_1: DataTexture | null | undefined;
    let LTC_HALF_2: DataTexture | null | undefined;
    let LTC_FLOAT_1: DataTexture | null | undefined;
    let LTC_FLOAT_2: DataTexture | null | undefined;
}
import { DataTexture } from 'three';
