import { IUniform } from '../../../src/Three';

export const OutputShader: {
    uniforms: {
        tDiffuse: IUniform;
        toneMappingExposure: IUniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
