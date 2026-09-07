/**
 * Pass for color grading via lookup tables.
 *
 * ```js
 * const lutPass = new LUTPass( { lut: lut.texture3D } );
 * composer.addPass( lutPass );
 * ```
 *
 * @augments ShaderPass
 * @three_import import { LUTPass } from 'three/addons/postprocessing/LUTPass.js';
 */
export class LUTPass extends ShaderPass {
    /**
     * Constructs a LUT pass.
     *
     * @param {{lut:Data3DTexture,intensity:number}} [options={}] - The pass options.
     */
    constructor(options?: {
        lut: Data3DTexture;
        intensity: number;
    });
    set lut(v: any);
    get lut(): any;
    set intensity(v: any);
    get intensity(): any;
}
import { ShaderPass } from './ShaderPass.js';
