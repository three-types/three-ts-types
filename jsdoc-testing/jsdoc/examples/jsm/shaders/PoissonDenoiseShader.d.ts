export function generatePdSamplePointInitializer(samples: any, rings: any, radiusExponent: any): string;
/**
 * @module PoissonDenoiseShader
 * @three_import import { PoissonDenoiseShader } from 'three/addons/shaders/PoissonDenoiseShader.js';
 */
/**
 * Poisson Denoise Shader.
 *
 * References:
 * - [Self-Supervised Poisson-Gaussian Denoising](https://openaccess.thecvf.com/content/WACV2021/papers/Khademi_Self-Supervised_Poisson-Gaussian_Denoising_WACV_2021_paper.pdf).
 * - [Poisson2Sparse: Self-Supervised Poisson Denoising From a Single Image](https://arxiv.org/pdf/2206.01856.pdf)
 *
 * @constant
 * @type {ShaderMaterial~Shader}
 */
export const PoissonDenoiseShader: ShaderMaterial;
