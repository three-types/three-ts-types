import { IUniform } from '../../../src/Three';

export const DOFMipMapShader: {
    uniforms: {
        tColor: IUniform;
        tDepth: IUniform;
        focus: IUniform;
        maxblur: IUniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
