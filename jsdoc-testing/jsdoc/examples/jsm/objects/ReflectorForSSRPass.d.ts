/**
 * ~Options
 */
export type ReflectorForSSRPass = {
    /**
     * - The reflector's color.
     */
    color?: string | number | Color | undefined;
    /**
     * - The texture width. A higher value results in more clear reflections but is also more expensive.
     */
    textureWidth?: number | undefined;
    /**
     * - The texture height. A higher value results in more clear reflections but is also more expensive.
     */
    textureHeight?: number | undefined;
    /**
     * - The clip bias.
     */
    clipBias?: number | undefined;
    /**
     * - Can be used to pass in a custom shader that defines how the reflective view is projected onto the reflector's geometry.
     */
    shader?: Object | undefined;
    /**
     * - Whether to store depth values in a texture or not.
     */
    useDepthTexture?: boolean | undefined;
    /**
     * - Resolution for the Reflector Pass.
     */
    resolution?: Vector2 | undefined;
};
import { Color } from 'three';
import { Vector2 } from 'three';
/**
 * A special version of {@link Reflector} for usage with {@link SSRPass}.
 *
 * @augments Mesh
 * @three_import import { ReflectorForSSRPass } from 'three/addons/objects/ReflectorForSSRPass.js';
 */
export class ReflectorForSSRPass extends Mesh {
    /**
     * Constructs a new reflector.
     *
     * @param {BufferGeometry} geometry - The reflector's geometry.
     * @param {ReflectorForSSRPass~Options} [options] - The configuration options.
     */
    constructor(geometry: BufferGeometry, options?: {});
    isReflectorForSSRPass: boolean;
    needsUpdate: boolean;
    maxDistance: number;
    opacity: number;
    color: Color;
    resolution: any;
    _distanceAttenuation: boolean;
    _fresnel: boolean;
    material: ShaderMaterial;
    doRender: (renderer: any, scene: any, camera: any) => void;
    /**
     * Returns the reflector's internal render target.
     *
     * @return {WebGLRenderTarget} The internal render target
     */
    getRenderTarget: () => WebGLRenderTarget;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose: () => void;
}
export namespace ReflectorForSSRPass {
    namespace ReflectorShader {
        let name: string;
        namespace defines {
            let DISTANCE_ATTENUATION: boolean;
            let FRESNEL: boolean;
        }
        namespace uniforms {
            namespace color {
                let value: null;
            }
            namespace tDiffuse {
                let value_1: null;
                export { value_1 as value };
            }
            namespace tDepth {
                let value_2: null;
                export { value_2 as value };
            }
            namespace textureMatrix {
                let value_3: Matrix4;
                export { value_3 as value };
            }
            namespace maxDistance {
                let value_4: number;
                export { value_4 as value };
            }
            namespace opacity {
                let value_5: number;
                export { value_5 as value };
            }
            namespace fresnelCoe {
                let value_6: null;
                export { value_6 as value };
            }
            namespace virtualCameraNear {
                let value_7: null;
                export { value_7 as value };
            }
            namespace virtualCameraFar {
                let value_8: null;
                export { value_8 as value };
            }
            namespace virtualCameraProjectionMatrix {
                let value_9: Matrix4;
                export { value_9 as value };
            }
            namespace virtualCameraMatrixWorld {
                let value_10: Matrix4;
                export { value_10 as value };
            }
            namespace virtualCameraProjectionMatrixInverse {
                let value_11: Matrix4;
                export { value_11 as value };
            }
            namespace resolution {
                let value_12: Vector2;
                export { value_12 as value };
            }
        }
        let vertexShader: string;
        let fragmentShader: string;
    }
}
import { Mesh } from 'three';
import { ShaderMaterial } from 'three';
import { WebGLRenderTarget } from 'three';
import { Matrix4 } from 'three';
