import { UniformsGroup } from '../../core/UniformsGroup.js';
import { IUniform } from './UniformsLib.js';

export function cloneUniforms(uniformsSrc: { [uniform: string]: IUniform }): { [uniform: string]: IUniform };
export function mergeUniforms(uniforms: { [uniform: string]: IUniform }): { [uniform: string]: IUniform };

export function cloneUniformsGroups(src: UniformsGroup[]): UniformsGroup[];

export namespace UniformsUtils {
    export { mergeUniforms as merge, cloneUniforms as clone };
}
