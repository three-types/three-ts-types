/**
 * @module BokehShader2
 * @three_import import { BokehShader, BokehDepthShader } from 'three/addons/shaders/BokehShader2.js';
 */
/**
 * Depth-of-field shader with bokeh ported from
 * [GLSL shader by Martins Upitis](http://blenderartists.org/forum/showthread.php?237488-GLSL-depth-of-field-with-bokeh-v2-4-(update)).
 *
 * Requires #define RINGS and SAMPLES integers
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const BokehShader: ShaderMaterial;
export namespace BokehDepthShader {
    let name: string;
    namespace uniforms {
        namespace mNear {
            let value: number;
        }
        namespace mFar {
            let value_1: number;
            export { value_1 as value };
        }
    }
    let vertexShader: string;
    let fragmentShader: string;
}
