import { Matrix4, Vector2, Texture } from '../../../src/Three';
/**
 * References:
 * https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html
 */

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
        tDiffuse: { value: Texture };
        tNormal: { value: Texture };
        tMetalness: { value: Texture };
        tDepth: { value: Texture };
        cameraNear: { value: number };
        cameraFar: { value: number };
        resolution: { value: Vector2 };
        cameraProjectionMatrix: { value: Matrix4 };
        cameraInverseProjectionMatrix: { value: Matrix4 };
        opacity: { value: number };
        maxDistance: { value: number };
        cameraRange: { value: number };
        surfDist: { value: number };
        thickTolerance: { value: number };
    };
    vertexShader: string;
    fragmentShader: string;
}

export interface SSRDepthShader {
    defines: {
        PERSPECTIVE_CAMERA: number;
    };
    uniforms: {
        tDepth: { value: Texture };
        cameraNear: { value: number };
        cameraFar: { value: number };
    };
    vertexShader: string;
    fragmentShader: string;
}

export interface SSRBlurShader {
    uniforms: {
        tDiffuse: { value: Texture };
        resolution: { value: Vector2 };
        opacity: { value: number };
    };
    vertexShader: string;
    fragmentShader: string;
}
