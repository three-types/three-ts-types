import { IUniform } from "three";

export const LuminosityHighPassShader: {
    name: string;
    shaderID: string;
    uniforms: {
        tDiffuse: IUniform;
        luminosityThreshold: IUniform;
        smoothWidth: IUniform;
        defaultColor: IUniform;
        defaultOpacity: IUniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
