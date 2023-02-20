import { IUniform } from '../../../src/Three.js';

export const ToneMapShader: {
    uniforms: {
        tDiffuse: IUniform;
        averageLuminance: IUniform;
        luminanceMap: IUniform;
        maxLuminance: IUniform;
        minLuminance: IUniform;
        middleGrey: IUniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
