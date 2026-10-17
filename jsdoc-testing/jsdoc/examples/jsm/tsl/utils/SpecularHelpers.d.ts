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
export const getSpecularDominantFactor: any;
/**
 * Importance-samples the GGX/VNDF specular lobe for one pixel and returns the reflected
 * ray direction plus the Monte-Carlo weight to apply to the gathered radiance, along with
 * the GGX terms the SSR env-miss MIS fallback needs.
 *
 * @param {Node<vec3>} N - View-space shading normal (normalized).
 * @param {Node<vec3>} V - View-space surface→camera direction (normalized).
 * @param {Node<float>} roughness - Perceptual roughness in `[0,1]`.
 * @param {Node<float>} metalness - Metalness in `[0,1]`.
 * @param {Node<vec3>} albedo - Surface base color; tints the metal Fresnel reflectance (`f0`).
 * @param {Node<vec4>} Xi - Per-pixel random numbers; only `.xy` are used.
 * @return {ggxReflectionStruct}
 */
export const ggxReflectionSample: () => void;
/**
 * Equirectangular direction / UV / PDF helpers and MIS weighting shared by environment sampling code.
 * Env-miss MIS integration lives in {@link ImportanceSampledEnvironment}.
 *
 * Equirectangular parameterization helpers used with CDF importance sampling are adapted from
 * [three-gpu-pathtracer](https://github.com/gkjohnson/three-gpu-pathtracer).
 *
 * @see {@link https://github.com/gkjohnson/three-gpu-pathtracer}
 */
export const equirectUvToDir: any;
export const equirectDirPdf: any;
/**
 * MIS power heuristic with β = 2: `pdfA² / (pdfA² + pdfB²)`.
 * Weights the contribution of the strategy that produced `pdfA` against the other strategy.
 *
 * @see Eric Veach, *Optimally Combining Sampling Techniques for Monte Carlo Rendering*
 * @tsl
 */
export const misPowerHeuristic: any;
