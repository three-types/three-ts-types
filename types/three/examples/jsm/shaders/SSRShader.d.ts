import { Matrix4, Vector2, Texture, UniformBuilder, Uniform } from '../../../src/Three';
/**
 * References:
 * https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html
 */

export const SSRShader: SSRShader;
export interface SSRShader {
    defines: {
        MAX_STEP: number;
        isPerspectiveCamera: boolean;
        isDistanceAttenuation: boolean;
        isFresnel: boolean;
        isInfiniteThick: boolean;
        isSelective: boolean;
    };
    uniforms: {
        tDiffuse: UniformBuilder<Texture | null>;
        tNormal: UniformBuilder<Texture | null>;
        tMetalness: UniformBuilder<Texture | null>;
        tDepth: UniformBuilder<Texture | null>;
        cameraNear: UniformBuilder<number>;
        cameraFar: UniformBuilder<number>;
        resolution: UniformBuilder<Vector2>;
        cameraProjectionMatrix: UniformBuilder<Matrix4>;
        cameraInverseProjectionMatrix: UniformBuilder<Matrix4>;
        opacity: UniformBuilder<number>;
        maxDistance: UniformBuilder<number>;
        cameraRange: UniformBuilder<number>;
        surfDist: UniformBuilder<number>;
        thickTolerance: UniformBuilder<number>;
    };
    vertexShader: string;
    fragmentShader: string;
}

export const SSRDepthShader: SSRDepthShader;
export interface SSRDepthShader {
    defines: {
        PERSPECTIVE_CAMERA: number;
    };
    uniforms: {
        tDepth: UniformBuilder<Texture | null>;
        cameraNear: UniformBuilder<number>;
        cameraFar: UniformBuilder<number>;
    };
    vertexShader: string;
    fragmentShader: string;
}

export const SSRBlurShader: SSRBlurShader;
export interface SSRBlurShader {
    uniforms: {
        tDiffuse: UniformBuilder<Texture | null>;
        resolution: UniformBuilder<Vector2>;
        opacity: UniformBuilder<number>;
    };
    vertexShader: string;
    fragmentShader: string;
}
