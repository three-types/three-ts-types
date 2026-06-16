/**
 * Represents a skydome for scene backgrounds. Based on [A Practical Analytic Model for Daylight](https://www.researchgate.net/publication/220720443_A_Practical_Analytic_Model_for_Daylight)
 * aka The Preetham Model, the de facto standard for analytical skydomes.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link SkyMesh}.
 *
 * More references:
 *
 * - {@link http://simonwallner.at/project/atmospheric-scattering/}
 * - {@link http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR}
 *
 *
 * ```js
 * const sky = new Sky();
 * sky.scale.setScalar( 10000 );
 * scene.add( sky );
 * ```
 *
 * It can be useful to hide the sun disc when generating an environment map to avoid artifacts
 *
 * ```js
 * // disable before rendering environment map
 * sky.material.uniforms.showSunDisc.value = false;
 * // ...
 * // re-enable before scene sky box rendering
 * sky.material.uniforms.showSunDisc.value = true;
 * ```
 *
 * @augments Mesh
 * @three_import import { Sky } from 'three/addons/objects/Sky.js';
 */
export class Sky extends Mesh {
    /**
     * Constructs a new skydome.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSky: boolean;
}
export namespace Sky {
    namespace SkyShader {
        let name: string;
        namespace uniforms {
            namespace turbidity {
                let value: number;
            }
            namespace rayleigh {
                let value_1: number;
                export { value_1 as value };
            }
            namespace mieCoefficient {
                let value_2: number;
                export { value_2 as value };
            }
            namespace mieDirectionalG {
                let value_3: number;
                export { value_3 as value };
            }
            namespace sunPosition {
                let value_4: Vector3;
                export { value_4 as value };
            }
            namespace up {
                let value_5: Vector3;
                export { value_5 as value };
            }
            namespace cloudScale {
                let value_6: number;
                export { value_6 as value };
            }
            namespace cloudSpeed {
                let value_7: number;
                export { value_7 as value };
            }
            namespace cloudCoverage {
                let value_8: number;
                export { value_8 as value };
            }
            namespace cloudDensity {
                let value_9: number;
                export { value_9 as value };
            }
            namespace cloudElevation {
                let value_10: number;
                export { value_10 as value };
            }
            namespace showSunDisc {
                let value_11: number;
                export { value_11 as value };
            }
            namespace time {
                let value_12: number;
                export { value_12 as value };
            }
        }
        let vertexShader: string;
        let fragmentShader: string;
    }
}
import { Mesh } from 'three';
import { Vector3 } from 'three';
