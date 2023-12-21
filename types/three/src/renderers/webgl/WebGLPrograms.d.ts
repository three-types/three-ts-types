import { Material } from '../../materials/Material.js';
import { Object3D } from '../../core/Object3D.js';
import { Light } from '../../lights/Light.js';
import { Scene } from '../../scenes/Scene.js';
import { IUniform } from '../shaders/UniformsLib.js';
import { WebGLRenderer } from '../WebGLRenderer.js';
import { WebGLBindingStates } from './WebGLBindingStates.js';
import { WebGLCapabilities } from './WebGLCapabilities.js';
import { WebGLClipping } from './WebGLClipping.js';
import { WebGLCubeMaps } from './WebGLCubeMaps.js';
import { WebGLExtensions } from './WebGLExtensions.js';
import { WebGLLightsState } from './WebGLLights.js';
import { WebGLProgram } from './WebGLProgram.js';
import { WebGLProgramParameters } from './WebGLProgramParameters.js';

export class WebGLPrograms {
    constructor(
        renderer: WebGLRenderer,
        cubemaps: WebGLCubeMaps,
        extensions: WebGLExtensions,
        capabilities: WebGLCapabilities,
        bindingStates: WebGLBindingStates,
        clipping: WebGLClipping,
    );

    programs: WebGLProgram[];

    getParameters(
        material: Material,
        lights: WebGLLightsState,
        shadows: Light[],
        scene: Scene,
        object: Object3D
    ): WebGLProgramParameters;

    getProgramCacheKey(parameters: WebGLProgramParameters): string;
    getUniforms(material: Material): { [uniform: string]: IUniform };
    acquireProgram(parameters: WebGLProgramParameters, cacheKey: string): WebGLProgram;
    releaseProgram(program: WebGLProgram): void;
}
