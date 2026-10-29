/**
 * Specular / microfacet BRDF helpers: VNDF sampling, GTR distribution, Smith geometry,
 * Fresnel, reflection importance sampling, parallax-corrected ray-length terms, and
 * equirectangular environment sampling / MIS helpers.
 * Pure TSL functions of their inputs (no scene/camera state).
 */
/**
 * Sentinel ray length the SSR pass writes for environment misses (no screen-space hit), set far above
 * any real hit distance so a single magnitude test separates misses from hits and survives `.max( 0 )`.
 *
 * @type {number}
 */
export const ENV_RAY_LENGTH: number;
/**
 * Classification threshold for {@link ENV_RAY_LENGTH}: above this is an env miss, below a real hit.
 * An order of magnitude under the sentinel, robust to fp16 storage and bilinear blending at borders.
 *
 * @type {number}
 */
export const ENV_RAY_LENGTH_THRESHOLD: number;
export const D_GTR: () => void;
export const SmithG: () => void;
export const GeometryTerm: () => void;
/**
 * Fresnel reflectance for the Schlick approximation.
 */
export const F_Schlick: () => void;
/**
 * Specular dominant factor for parallax-corrected ray length.
 * From REBLUR: A Hierarchical Recurrent Denoiser (NRD).
 */
export const getSpecularDominantFactor: () => void;
export function ggxReflectionSample(N: Node<any>, V: Node<any>, roughness: Node<any>, metalness: Node<any>, albedo: Node<any>, Xi: Node<vec4>, f0?: Node<any> | null, f90?: Node<any> | number): Function;
/**
 * Equirectangular direction / UV / PDF helpers and MIS weighting shared by environment sampling code.
 * Env-miss MIS integration lives in {@link ImportanceSampledEnvironment}.
 *
 * Equirectangular parameterization helpers used with CDF importance sampling are adapted from
 * [three-gpu-pathtracer](https://github.com/gkjohnson/three-gpu-pathtracer).
 *
 * @see {@link https://github.com/gkjohnson/three-gpu-pathtracer}
 */
export const equirectUvToDir: () => void;
export const equirectDirPdf: () => void;
/**
 * MIS power heuristic with β = 2: `pdfA² / (pdfA² + pdfB²)`.
 * Weights the contribution of the strategy that produced `pdfA` against the other strategy.
 *
 * @see Eric Veach, *Optimally Combining Sampling Techniques for Monte Carlo Rendering*
 * @tsl
 */
export const misPowerHeuristic: () => void;
