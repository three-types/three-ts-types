export default ImportanceSampledEnvironment;
/**
 * Manages a preprocessed HDR environment map (CDF textures, uniforms) and exposes
 * TSL helpers for BRDF-direction lookups and MIS importance sampling.
 *
 * @see {@link https://github.com/gkjohnson/three-gpu-pathtracer}
 */
declare class ImportanceSampledEnvironment {
    /**
     * @param {boolean} [importanceSampling=false] - When `true`, builds luminance CDF tables and enables MIS env sampling.
     */
    constructor(importanceSampling?: boolean);
    _importanceSampling: boolean;
    _cdf: EnvMapCDFGenerator;
    _totalSum: import("three/webgpu").UniformNode;
    _size: import("three/webgpu").UniformNode;
    intensity: import("three/webgpu").UniformNode;
    _mapNode: import("three/webgpu").TextureNode | null;
    _marginalNode: import("three/webgpu").TextureNode | null;
    _conditionalNode: import("three/webgpu").TextureNode | null;
    /**
     * @param {Texture} hdr - Equirectangular HDR environment map.
     */
    updateFrom(hdr: Texture): void;
    clear(): void;
    /**
     * Simple environment lookup along the reflected direction (no MIS).
     *
     * @param {Object} params
     * @param {UniformNode<Matrix4>} params.cameraWorldMatrix
     * @param {Node<vec3>} params.viewReflectDir
     * @param {Node<float>} [params.sampleWeight] - Optional radiance scale (defaults to 1).
     * @return {Node<vec3>}
     */
    sampleReflect({ cameraWorldMatrix, viewReflectDir, sampleWeight }: {
        cameraWorldMatrix: UniformNode<Matrix4>;
        viewReflectDir: Node<vec3>;
        sampleWeight?: Node<any>;
    }): Node<vec3>;
    /**
     * Environment reflection for a screen-space miss using only the BRDF / reflected-ray direction.
     *
     * @param {Object} params
     * @param {UniformNode<Matrix4>} params.cameraWorldMatrix
     * @param {Node<vec3>} params.viewReflectDir - View-space GGX-sampled reflected ray.
     * @param {Node<vec3>} params.N - View-space shading normal.
     * @param {Node<vec3>} params.V - View-space direction to camera.
     * @param {Node<float>} params.alpha - GGX roughness (alpha).
     * @param {Node<vec3>} params.f0
     * @return {Node<vec3>}
     */
    sampleEnvironmentBRDF({ cameraWorldMatrix, viewReflectDir, N, V, alpha, f0 }: {
        cameraWorldMatrix: UniformNode<Matrix4>;
        viewReflectDir: Node<vec3>;
        N: Node<vec3>;
        V: Node<vec3>;
        alpha: Node<any>;
        f0: Node<vec3>;
    }): Node<vec3>;
    /**
     * Environment reflection for a screen-space miss, estimated with multiple importance
     * sampling (MIS) between the BRDF / reflected-ray direction and the env-luminance CDF
     * direction. Both techniques use consistent solid-angle PDFs (`D·G1(N·V)/(4·N·V)`), so
     * the power heuristic is unbiased. Adapted from three-gpu-pathtracer.
     *
     * @see {@link https://github.com/gkjohnson/three-gpu-pathtracer}
     *
     * @param {Object} params
     * @param {UniformNode<Matrix4>} params.cameraWorldMatrix
     * @param {Node<vec3>} params.viewReflectDir - View-space GGX-sampled reflected ray.
     * @param {Node<vec3>} params.N - View-space shading normal.
     * @param {Node<vec3>} params.V - View-space direction to camera.
     * @param {Node<float>} params.alpha - GGX roughness (alpha).
     * @param {Node<vec3>} params.f0
     * @param {Node<vec4>} params.Xi2 - Second blue-noise sample (zw used for the CDF).
     * @return {Node<vec3>}
     */
    sampleEnvironmentMIS({ cameraWorldMatrix, viewReflectDir, N, V, alpha, f0, Xi2 }: {
        cameraWorldMatrix: UniformNode<Matrix4>;
        viewReflectDir: Node<vec3>;
        N: Node<vec3>;
        V: Node<vec3>;
        alpha: Node<any>;
        f0: Node<vec3>;
        Xi2: Node<any>;
    }): Node<vec3>;
    dispose(): void;
}
/**
 * Precomputes marginal and conditional CDF textures from an equirectangular HDR environment map
 * for luminance importance sampling.
 */
declare class EnvMapCDFGenerator {
    map: any;
    marginalWeights: DataTexture | null;
    conditionalWeights: DataTexture | null;
    totalSum: number;
    updateFrom(hdr: any): void;
    updateMapOnly(hdr: any): void;
    dispose(): void;
}
import { DataTexture } from 'three/webgpu';
