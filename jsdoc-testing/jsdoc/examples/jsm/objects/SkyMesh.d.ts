/**
 * Represents a skydome for scene backgrounds. Based on [A Practical Analytic Model for Daylight](https://www.researchgate.net/publication/220720443_A_Practical_Analytic_Model_for_Daylight)
 * aka The Preetham Model, the de facto standard for analytical skydomes.
 *
 * Note that this class can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, use {@link Sky}.
 *
 * More references:
 *
 * - {@link http://simonwallner.at/project/atmospheric-scattering/}
 * - {@link http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR}
 *
 * ```js
 * const sky = new SkyMesh();
 * sky.scale.setScalar( 10000 );
 * scene.add( sky );
 * ```
 *
 * It can be useful to hide the sun disc when generating an environment map to avoid artifacts
 *
 * ```js
 * // disable before rendering environment map
 * sky.showSunDisc.value = false;
 * // ...
 * // re-enable before scene sky box rendering
 * sky.showSunDisc.value = true;
 * ```
 *
 * @augments Mesh
 * @three_import import { SkyMesh } from 'three/addons/objects/SkyMesh.js';
 */
export class SkyMesh extends Mesh {
    /**
     * Constructs a new skydome.
     */
    constructor();
    /**
     * The turbidity uniform.
     *
     * @type {UniformNode<float>}
     */
    turbidity: UniformNode<any>;
    /**
     * The rayleigh uniform.
     *
     * @type {UniformNode<float>}
     */
    rayleigh: UniformNode<any>;
    /**
     * The mieCoefficient uniform.
     *
     * @type {UniformNode<float>}
     */
    mieCoefficient: UniformNode<any>;
    /**
     * The mieDirectionalG uniform.
     *
     * @type {UniformNode<float>}
     */
    mieDirectionalG: UniformNode<any>;
    /**
     * The sun position uniform.
     *
     * @type {UniformNode<vec3>}
     */
    sunPosition: UniformNode<any>;
    /**
     * The up position.
     *
     * @type {UniformNode<vec3>}
     */
    upUniform: UniformNode<any>;
    /**
     * The cloud scale uniform.
     *
     * @type {UniformNode<float>}
     */
    cloudScale: UniformNode<any>;
    /**
     * The cloud speed uniform.
     *
     * @type {UniformNode<float>}
     */
    cloudSpeed: UniformNode<any>;
    /**
     * The cloud coverage uniform.
     *
     * @type {UniformNode<float>}
     */
    cloudCoverage: UniformNode<any>;
    /**
     * The cloud density uniform.
     *
     * @type {UniformNode<float>}
     */
    cloudDensity: UniformNode<any>;
    /**
     * The cloud elevation uniform.
     *
     * @type {UniformNode<float>}
     */
    cloudElevation: UniformNode<any>;
    /**
     * Whether to render the solar disc.
     *
     * @type {UniformNode<float>}
     */
    showSunDisc: UniformNode<any>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     * @deprecated Use isSkyMesh instead.
     */
    readonly isSky: boolean;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSkyMesh: boolean;
}
import { Mesh } from 'three/webgpu';
