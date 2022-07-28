import { Uniform } from '../../core/Uniform';
import { UniformsGroup } from '../../core/UniformsGroup';

export function cloneUniforms(uniforms_src: Uniform): Uniform;
export function mergeUniforms(uniforms: Uniform[]): Uniform;

export function cloneUniformsGroups(src: UniformsGroup[]): UniformsGroup[];

export namespace UniformsUtils {
    export { mergeUniforms as merge, cloneUniforms as clone };
}
