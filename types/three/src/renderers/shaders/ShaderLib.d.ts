import { WebGLProgramParameters } from '../webgl/WebGLProgramParameters.js';
import { IUniform } from './UniformsLib.js';

export interface Shader extends WebGLProgramParameters {
    uniforms: { [uniform: string]: IUniform };
}

export let ShaderLib: {
    [name: string]: Shader;
    basic: Shader;
    lambert: Shader;
    phong: Shader;
    standard: Shader;
    matcap: Shader;
    points: Shader;
    dashed: Shader;
    depth: Shader;
    normal: Shader;
    sprite: Shader;
    background: Shader;
    cube: Shader;
    equirect: Shader;
    distanceRGBA: Shader;
    shadow: Shader;
    physical: Shader;
};
