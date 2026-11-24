import { IUniform } from "three";

export const TriangleBlurShader: {
    name: string;
    uniforms: {
        tDiffuse: IUniform;
        delta: IUniform;
    };
    vertexShader: string;
    fragmentShader: string;
};
