import { ACESFilmicToneMapping } from './three.core.js';
import { AddEquation } from './three.core.js';
import { AddOperation } from './three.core.js';
import { AdditiveBlending } from './three.core.js';
import { AgXToneMapping } from './three.core.js';
import { AlphaFormat } from './three.core.js';
import { AlwaysCompare } from './three.core.js';
import { AlwaysDepth } from './three.core.js';
import { ArrayCamera } from './three.core.js';
import { BackSide } from './three.core.js';
import { BoxGeometry } from './three.core.js';
import { BufferAttribute } from './three.core.js';
import { BufferGeometry } from './three.core.js';
import { ByteType } from './three.core.js';
import { CineonToneMapping } from './three.core.js';
import { ClampToEdgeWrapping } from './three.core.js';
import { Color } from './three.core.js';
import { ColorManagement } from './three.core.js';
import { ConstantAlphaFactor } from './three.core.js';
import { ConstantColorFactor } from './three.core.js';
import { CubeCamera } from './three.core.js';
import { CubeDepthTexture } from './three.core.js';
import { CubeReflectionMapping } from './three.core.js';
import { CubeRefractionMapping } from './three.core.js';
import { CubeTexture } from './three.core.js';
import { CubeUVReflectionMapping } from './three.core.js';
import { CullFaceBack } from './three.core.js';
import { CullFaceFront } from './three.core.js';
import { CullFaceNone } from './three.core.js';
import { CustomBlending } from './three.core.js';
import { CustomToneMapping } from './three.core.js';
import { Data3DTexture } from './three.core.js';
import { DataArrayTexture } from './three.core.js';
import { DataTexture } from './three.core.js';
import { DepthFormat } from './three.core.js';
import { DepthStencilFormat } from './three.core.js';
import { DepthTexture } from './three.core.js';
import { DoubleSide } from './three.core.js';
import { DstAlphaFactor } from './three.core.js';
import { DstColorFactor } from './three.core.js';
import { EqualCompare } from './three.core.js';
import { EqualDepth } from './three.core.js';
import { EquirectangularReflectionMapping } from './three.core.js';
import { EquirectangularRefractionMapping } from './three.core.js';
import { EventDispatcher } from './three.core.js';
import { ExternalTexture } from './three.core.js';
import { Float32BufferAttribute } from './three.core.js';
import { FloatType } from './three.core.js';
import { FrontSide } from './three.core.js';
import { Frustum } from './three.core.js';
import { GLSL3 } from './three.core.js';
import { GreaterCompare } from './three.core.js';
import { GreaterDepth } from './three.core.js';
import { GreaterEqualCompare } from './three.core.js';
import { GreaterEqualDepth } from './three.core.js';
import { HalfFloatType } from './three.core.js';
import { IntType } from './three.core.js';
import { Layers } from './three.core.js';
import { LessCompare } from './three.core.js';
import { LessDepth } from './three.core.js';
import { LessEqualCompare } from './three.core.js';
import { LessEqualDepth } from './three.core.js';
import { LinearFilter } from './three.core.js';
import { LinearMipmapLinearFilter } from './three.core.js';
import { LinearMipmapNearestFilter } from './three.core.js';
import { LinearSRGBColorSpace } from './three.core.js';
import { LinearToneMapping } from './three.core.js';
import { LinearTransfer } from './three.core.js';
import { Matrix3 } from './three.core.js';
import { Matrix4 } from './three.core.js';
import { MaxEquation } from './three.core.js';
import { Mesh } from './three.core.js';
import { MeshBasicMaterial } from './three.core.js';
import { MeshDepthMaterial } from './three.core.js';
import { MeshDistanceMaterial } from './three.core.js';
import { MinEquation } from './three.core.js';
import { MirroredRepeatWrapping } from './three.core.js';
import { MixOperation } from './three.core.js';
import { MultiplyBlending } from './three.core.js';
import { MultiplyOperation } from './three.core.js';
import { NearestFilter } from './three.core.js';
import { NearestMipmapLinearFilter } from './three.core.js';
import { NearestMipmapNearestFilter } from './three.core.js';
import { NeutralToneMapping } from './three.core.js';
import { NeverCompare } from './three.core.js';
import { NeverDepth } from './three.core.js';
import { NoBlending } from './three.core.js';
import { NoColorSpace } from './three.core.js';
import { NoToneMapping } from './three.core.js';
import { NormalBlending } from './three.core.js';
import { NotEqualCompare } from './three.core.js';
import { NotEqualDepth } from './three.core.js';
import { ObjectSpaceNormalMap } from './three.core.js';
import { OneFactor } from './three.core.js';
import { OneMinusConstantAlphaFactor } from './three.core.js';
import { OneMinusConstantColorFactor } from './three.core.js';
import { OneMinusDstAlphaFactor } from './three.core.js';
import { OneMinusDstColorFactor } from './three.core.js';
import { OneMinusSrcAlphaFactor } from './three.core.js';
import { OneMinusSrcColorFactor } from './three.core.js';
import { OrthographicCamera } from './three.core.js';
import { PCFShadowMap } from './three.core.js';
import { PCFSoftShadowMap } from './three.core.js';
/**
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map
 * (PMREM) from a cubeMap environment texture. This allows different levels of
 * blur to be quickly accessed based on material roughness. It is packed into a
 * special CubeUV format that allows us to perform custom interpolation so that
 * we can support nonlinear formats such as RGBE. Unlike a traditional mipmap
 * chain, it only goes down to the LOD_MIN level (above), and then creates extra
 * even more filtered 'mips' at the same LOD_MIN resolution, associated with
 * higher roughness levels. In this way we maintain resolution to smoothly
 * interpolate diffuse lighting while limiting sampling computation.
 *
 * The prefiltering uses GGX VNDF (Visible Normal Distribution Function)
 * importance sampling based on "Sampling the GGX Distribution of Visible Normals"
 * (Heitz, 2018) to generate environment maps that accurately match the GGX BRDF
 * used in material rendering for physically-based image-based lighting.
 */
export class PMREMGenerator {
    /**
     * Constructs a new PMREM generator.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    constructor(renderer: WebGLRenderer);
    _renderer: WebGLRenderer;
    _pingPongRenderTarget: any;
    _lodMax: number;
    _cubeSize: number;
    _sizeLods: any[];
    _sigmas: any[];
    _lodMeshes: any[];
    _backgroundBox: Mesh | null;
    _cubemapMaterial: ShaderMaterial | null;
    _equirectMaterial: ShaderMaterial | null;
    _blurMaterial: ShaderMaterial | null;
    _ggxMaterial: ShaderMaterial | null;
    /**
     * Generates a PMREM from a supplied Scene, which can be faster than using an
     * image if networking bandwidth is low. Optional sigma specifies a blur radius
     * in radians to be applied to the scene before PMREM generation. Optional near
     * and far planes ensure the scene is rendered in its entirety.
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @return {WebGLRenderTarget} The resulting PMREM.
     */
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
    }): WebGLRenderTarget;
    /**
     * Generates a PMREM from an equirectangular texture, which can be either LDR
     * or HDR. The ideal input image size is 1k (1024 x 512), as this matches best
     * with the 256 x 256 cubemap output. The minimum supported input image size
     * is 64 x 32.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
     * @return {WebGLRenderTarget} The resulting PMREM.
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: WebGLRenderTarget | null): WebGLRenderTarget;
    /**
     * Generates a PMREM from an cubemap texture, which can be either LDR
     * or HDR. The ideal input cube size is 256 x 256, as this matches best
     * with the 256 x 256 cubemap output. The minimum supported input cube
     * size is 16 x 16 per face.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
     * @return {WebGLRenderTarget} The resulting PMREM.
     */
    fromCubemap(cubemap: Texture, renderTarget?: WebGLRenderTarget | null): WebGLRenderTarget;
    /**
     * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     */
    compileCubemapShader(): void;
    /**
     * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     */
    compileEquirectangularShader(): void;
    /**
     * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
     * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
     * one of them will cause any others to also become unusable.
     */
    dispose(): void;
    _setSize(cubeSize: any): void;
    _dispose(): void;
    _cleanup(outputTarget: any): void;
    _fromTexture(texture: any, renderTarget: any): any;
    _allocateTargets(): WebGLRenderTarget;
    _compileMaterial(material: any): void;
    _sceneToCubeUV(scene: any, near: any, far: any, cubeUVRenderTarget: any, position: any): void;
    _textureToCubeUV(texture: any, cubeUVRenderTarget: any): void;
    _applyPMREM(cubeUVRenderTarget: any): void;
    /**
     * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
     * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
     * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
     * applies incremental roughness filtering to avoid over-blurring.
     *
     * @private
     * @param {WebGLRenderTarget} cubeUVRenderTarget
     * @param {number} lodIn - Source LOD level to read from
     * @param {number} lodOut - Target LOD level to write to
     */
    private _applyGGXFilter;
    /**
     * This is a two-pass Gaussian blur for a cubemap. Normally this is done
     * vertically and horizontally, but this breaks down on a cube. Here we apply
     * the blur latitudinally (around the poles), and then longitudinally (towards
     * the poles) to approximate the orthogonally-separable blur. It is least
     * accurate at the poles, but still does a decent job.
     *
     * Used for initial scene blur in fromScene() method when sigma > 0.
     *
     * @private
     * @param {WebGLRenderTarget} cubeUVRenderTarget
     * @param {number} lodIn
     * @param {number} lodOut
     * @param {number} sigma
     * @param {Vector3} [poleAxis]
     */
    private _blur;
    _halfBlur(targetIn: any, targetOut: any, lodIn: any, lodOut: any, sigmaRadians: any, direction: any, poleAxis: any): void;
}
import { PerspectiveCamera } from './three.core.js';
import { Plane } from './three.core.js';
import { PlaneGeometry } from './three.core.js';
import { R11_EAC_Format } from './three.core.js';
import { RED_GREEN_RGTC2_Format } from './three.core.js';
import { RED_RGTC1_Format } from './three.core.js';
import { REVISION } from './three.core.js';
import { RG11_EAC_Format } from './three.core.js';
import { RGBAFormat } from './three.core.js';
import { RGBAIntegerFormat } from './three.core.js';
import { RGBA_ASTC_10x10_Format } from './three.core.js';
import { RGBA_ASTC_10x5_Format } from './three.core.js';
import { RGBA_ASTC_10x6_Format } from './three.core.js';
import { RGBA_ASTC_10x8_Format } from './three.core.js';
import { RGBA_ASTC_12x10_Format } from './three.core.js';
import { RGBA_ASTC_12x12_Format } from './three.core.js';
import { RGBA_ASTC_4x4_Format } from './three.core.js';
import { RGBA_ASTC_5x4_Format } from './three.core.js';
import { RGBA_ASTC_5x5_Format } from './three.core.js';
import { RGBA_ASTC_6x5_Format } from './three.core.js';
import { RGBA_ASTC_6x6_Format } from './three.core.js';
import { RGBA_ASTC_8x5_Format } from './three.core.js';
import { RGBA_ASTC_8x6_Format } from './three.core.js';
import { RGBA_ASTC_8x8_Format } from './three.core.js';
import { RGBA_BPTC_Format } from './three.core.js';
import { RGBA_ETC2_EAC_Format } from './three.core.js';
import { RGBA_PVRTC_2BPPV1_Format } from './three.core.js';
import { RGBA_PVRTC_4BPPV1_Format } from './three.core.js';
import { RGBA_S3TC_DXT1_Format } from './three.core.js';
import { RGBA_S3TC_DXT3_Format } from './three.core.js';
import { RGBA_S3TC_DXT5_Format } from './three.core.js';
import { RGBFormat } from './three.core.js';
import { RGB_BPTC_SIGNED_Format } from './three.core.js';
import { RGB_BPTC_UNSIGNED_Format } from './three.core.js';
import { RGB_ETC1_Format } from './three.core.js';
import { RGB_ETC2_Format } from './three.core.js';
import { RGB_PVRTC_2BPPV1_Format } from './three.core.js';
import { RGB_PVRTC_4BPPV1_Format } from './three.core.js';
import { RGB_S3TC_DXT1_Format } from './three.core.js';
import { RGFormat } from './three.core.js';
import { RGIntegerFormat } from './three.core.js';
import { RawShaderMaterial } from './three.core.js';
import { RedFormat } from './three.core.js';
import { RedIntegerFormat } from './three.core.js';
import { ReinhardToneMapping } from './three.core.js';
import { RepeatWrapping } from './three.core.js';
import { ReverseSubtractEquation } from './three.core.js';
import { SIGNED_R11_EAC_Format } from './three.core.js';
import { SIGNED_RED_GREEN_RGTC2_Format } from './three.core.js';
import { SIGNED_RED_RGTC1_Format } from './three.core.js';
import { SIGNED_RG11_EAC_Format } from './three.core.js';
import { SRGBColorSpace } from './three.core.js';
import { SRGBTransfer } from './three.core.js';
export namespace ShaderChunk {
    export { alphahash_fragment };
    export { alphahash_pars_fragment };
    export { alphamap_fragment };
    export { alphamap_pars_fragment };
    export { alphatest_fragment };
    export { alphatest_pars_fragment };
    export { aomap_fragment };
    export { aomap_pars_fragment };
    export { batching_pars_vertex };
    export { batching_vertex };
    export { begin_vertex };
    export { beginnormal_vertex };
    export { bsdfs };
    export { iridescence_fragment };
    export { bumpmap_pars_fragment };
    export { clipping_planes_fragment };
    export { clipping_planes_pars_fragment };
    export { clipping_planes_pars_vertex };
    export { clipping_planes_vertex };
    export { color_fragment };
    export { color_pars_fragment };
    export { color_pars_vertex };
    export { color_vertex };
    export { common };
    export { cube_uv_reflection_fragment };
    export { defaultnormal_vertex };
    export { displacementmap_pars_vertex };
    export { displacementmap_vertex };
    export { emissivemap_fragment };
    export { emissivemap_pars_fragment };
    export { colorspace_fragment };
    export { colorspace_pars_fragment };
    export { envmap_fragment };
    export { envmap_common_pars_fragment };
    export { envmap_pars_fragment };
    export { envmap_pars_vertex };
    export { envmap_physical_pars_fragment };
    export { envmap_vertex };
    export { fog_vertex };
    export { fog_pars_vertex };
    export { fog_fragment };
    export { fog_pars_fragment };
    export { gradientmap_pars_fragment };
    export { lightmap_pars_fragment };
    export { lights_lambert_fragment };
    export { lights_lambert_pars_fragment };
    export { lights_pars_begin };
    export { lights_toon_fragment };
    export { lights_toon_pars_fragment };
    export { lights_phong_fragment };
    export { lights_phong_pars_fragment };
    export { lights_physical_fragment };
    export { lights_physical_pars_fragment };
    export { lights_fragment_begin };
    export { lights_fragment_maps };
    export { lights_fragment_end };
    export { lightprobes_pars_fragment };
    export { logdepthbuf_fragment };
    export { logdepthbuf_pars_fragment };
    export { logdepthbuf_pars_vertex };
    export { logdepthbuf_vertex };
    export { map_fragment };
    export { map_pars_fragment };
    export { map_particle_fragment };
    export { map_particle_pars_fragment };
    export { metalnessmap_fragment };
    export { metalnessmap_pars_fragment };
    export { morphinstance_vertex };
    export { morphcolor_vertex };
    export { morphnormal_vertex };
    export { morphtarget_pars_vertex };
    export { morphtarget_vertex };
    export { normal_fragment_begin };
    export { normal_fragment_maps };
    export { normal_pars_fragment };
    export { normal_pars_vertex };
    export { normal_vertex };
    export { normalmap_pars_fragment };
    export { clearcoat_normal_fragment_begin };
    export { clearcoat_normal_fragment_maps };
    export { clearcoat_pars_fragment };
    export { iridescence_pars_fragment };
    export { opaque_fragment };
    export { packing };
    export { premultiplied_alpha_fragment };
    export { project_vertex };
    export { dithering_fragment };
    export { dithering_pars_fragment };
    export { roughnessmap_fragment };
    export { roughnessmap_pars_fragment };
    export { shadowmap_pars_fragment };
    export { shadowmap_pars_vertex };
    export { shadowmap_vertex };
    export { shadowmask_pars_fragment };
    export { skinbase_vertex };
    export { skinning_pars_vertex };
    export { skinning_vertex };
    export { skinnormal_vertex };
    export { specularmap_fragment };
    export { specularmap_pars_fragment };
    export { tonemapping_fragment };
    export { tonemapping_pars_fragment };
    export { transmission_fragment };
    export { transmission_pars_fragment };
    export { uv_pars_fragment };
    export { uv_pars_vertex };
    export { uv_vertex };
    export { worldpos_vertex };
    export { vertex$h as background_vert };
    export { fragment$h as background_frag };
    export { vertex$g as backgroundCube_vert };
    export { fragment$g as backgroundCube_frag };
    export { vertex$f as cube_vert };
    export { fragment$f as cube_frag };
    export { vertex$e as depth_vert };
    export { fragment$e as depth_frag };
    export { vertex$d as distance_vert };
    export { fragment$d as distance_frag };
    export { vertex$c as equirect_vert };
    export { fragment$c as equirect_frag };
    export { vertex$b as linedashed_vert };
    export { fragment$b as linedashed_frag };
    export { vertex$a as meshbasic_vert };
    export { fragment$a as meshbasic_frag };
    export { vertex$9 as meshlambert_vert };
    export { fragment$9 as meshlambert_frag };
    export { vertex$8 as meshmatcap_vert };
    export { fragment$8 as meshmatcap_frag };
    export { vertex$7 as meshnormal_vert };
    export { fragment$7 as meshnormal_frag };
    export { vertex$6 as meshphong_vert };
    export { fragment$6 as meshphong_frag };
    export { vertex$5 as meshphysical_vert };
    export { fragment$5 as meshphysical_frag };
    export { vertex$4 as meshtoon_vert };
    export { fragment$4 as meshtoon_frag };
    export { vertex$3 as points_vert };
    export { fragment$3 as points_frag };
    export { vertex$2 as shadow_vert };
    export { fragment$2 as shadow_frag };
    export { vertex$1 as sprite_vert };
    export { fragment$1 as sprite_frag };
}
export namespace ShaderLib {
    namespace physical {
        export let uniforms: Object;
        import vertexShader = ShaderChunk.meshphysical_vert;
        export { vertexShader };
        import fragmentShader = ShaderChunk.meshphysical_frag;
        export { fragmentShader };
    }
}
import { ShaderMaterial } from './three.core.js';
import { ShortType } from './three.core.js';
import { SrcAlphaFactor } from './three.core.js';
import { SrcAlphaSaturateFactor } from './three.core.js';
import { SrcColorFactor } from './three.core.js';
import { SubtractEquation } from './three.core.js';
import { SubtractiveBlending } from './three.core.js';
import { TangentSpaceNormalMap } from './three.core.js';
import { Texture } from './three.core.js';
import { Uint16BufferAttribute } from './three.core.js';
import { Uint32BufferAttribute } from './three.core.js';
export namespace UniformsLib {
    export namespace common_1 {
        namespace diffuse {
            let value: Color;
        }
        namespace opacity {
            let value_1: number;
            export { value_1 as value };
        }
        namespace map {
            let value_2: null;
            export { value_2 as value };
        }
        namespace mapTransform {
            let value_3: Matrix3;
            export { value_3 as value };
        }
        namespace alphaMap {
            let value_4: null;
            export { value_4 as value };
        }
        namespace alphaMapTransform {
            let value_5: Matrix3;
            export { value_5 as value };
        }
        namespace alphaTest {
            let value_6: number;
            export { value_6 as value };
        }
    }
    export { common_1 as common };
    export namespace specularmap {
        namespace specularMap {
            let value_7: null;
            export { value_7 as value };
        }
        namespace specularMapTransform {
            let value_8: Matrix3;
            export { value_8 as value };
        }
    }
    export namespace envmap {
        namespace envMap {
            let value_9: null;
            export { value_9 as value };
        }
        namespace envMapRotation {
            let value_10: Matrix3;
            export { value_10 as value };
        }
        namespace reflectivity {
            let value_11: number;
            export { value_11 as value };
        }
        namespace ior {
            let value_12: number;
            export { value_12 as value };
        }
        namespace refractionRatio {
            let value_13: number;
            export { value_13 as value };
        }
        namespace dfgLUT {
            let value_14: null;
            export { value_14 as value };
        }
    }
    export namespace aomap {
        namespace aoMap {
            let value_15: null;
            export { value_15 as value };
        }
        namespace aoMapIntensity {
            let value_16: number;
            export { value_16 as value };
        }
        namespace aoMapTransform {
            let value_17: Matrix3;
            export { value_17 as value };
        }
    }
    export namespace lightmap {
        namespace lightMap {
            let value_18: null;
            export { value_18 as value };
        }
        namespace lightMapIntensity {
            let value_19: number;
            export { value_19 as value };
        }
        namespace lightMapTransform {
            let value_20: Matrix3;
            export { value_20 as value };
        }
    }
    export namespace bumpmap {
        namespace bumpMap {
            let value_21: null;
            export { value_21 as value };
        }
        namespace bumpMapTransform {
            let value_22: Matrix3;
            export { value_22 as value };
        }
        namespace bumpScale {
            let value_23: number;
            export { value_23 as value };
        }
    }
    export namespace normalmap {
        namespace normalMap {
            let value_24: null;
            export { value_24 as value };
        }
        namespace normalMapTransform {
            let value_25: Matrix3;
            export { value_25 as value };
        }
        namespace normalScale {
            let value_26: Vector2;
            export { value_26 as value };
        }
    }
    export namespace displacementmap {
        namespace displacementMap {
            let value_27: null;
            export { value_27 as value };
        }
        namespace displacementMapTransform {
            let value_28: Matrix3;
            export { value_28 as value };
        }
        namespace displacementScale {
            let value_29: number;
            export { value_29 as value };
        }
        namespace displacementBias {
            let value_30: number;
            export { value_30 as value };
        }
    }
    export namespace emissivemap {
        namespace emissiveMap {
            let value_31: null;
            export { value_31 as value };
        }
        namespace emissiveMapTransform {
            let value_32: Matrix3;
            export { value_32 as value };
        }
    }
    export namespace metalnessmap {
        namespace metalnessMap {
            let value_33: null;
            export { value_33 as value };
        }
        namespace metalnessMapTransform {
            let value_34: Matrix3;
            export { value_34 as value };
        }
    }
    export namespace roughnessmap {
        namespace roughnessMap {
            let value_35: null;
            export { value_35 as value };
        }
        namespace roughnessMapTransform {
            let value_36: Matrix3;
            export { value_36 as value };
        }
    }
    export namespace gradientmap {
        namespace gradientMap {
            let value_37: null;
            export { value_37 as value };
        }
    }
    export namespace fog {
        namespace fogDensity {
            let value_38: number;
            export { value_38 as value };
        }
        namespace fogNear {
            let value_39: number;
            export { value_39 as value };
        }
        namespace fogFar {
            let value_40: number;
            export { value_40 as value };
        }
        namespace fogColor {
            let value_41: Color;
            export { value_41 as value };
        }
    }
    export namespace lights {
        namespace ambientLightColor {
            let value_42: never[];
            export { value_42 as value };
        }
        namespace lightProbe {
            let value_43: never[];
            export { value_43 as value };
        }
        namespace directionalLights {
            let value_44: never[];
            export { value_44 as value };
            export namespace properties {
                let direction: {};
                let color: {};
            }
        }
        namespace directionalLightShadows {
            let value_45: never[];
            export { value_45 as value };
            export namespace properties_1 {
                let shadowIntensity: number;
                let shadowBias: {};
                let shadowNormalBias: {};
                let shadowRadius: {};
                let shadowMapSize: {};
            }
            export { properties_1 as properties };
        }
        namespace directionalShadowMatrix {
            let value_46: never[];
            export { value_46 as value };
        }
        namespace spotLights {
            let value_47: never[];
            export { value_47 as value };
            export namespace properties_2 {
                let color_1: {};
                export { color_1 as color };
                export let position: {};
                let direction_1: {};
                export { direction_1 as direction };
                export let distance: {};
                export let coneCos: {};
                export let penumbraCos: {};
                export let decay: {};
            }
            export { properties_2 as properties };
        }
        namespace spotLightShadows {
            let value_48: never[];
            export { value_48 as value };
            export namespace properties_3 {
                let shadowIntensity_1: number;
                export { shadowIntensity_1 as shadowIntensity };
                let shadowBias_1: {};
                export { shadowBias_1 as shadowBias };
                let shadowNormalBias_1: {};
                export { shadowNormalBias_1 as shadowNormalBias };
                let shadowRadius_1: {};
                export { shadowRadius_1 as shadowRadius };
                let shadowMapSize_1: {};
                export { shadowMapSize_1 as shadowMapSize };
            }
            export { properties_3 as properties };
        }
        namespace spotLightMap {
            let value_49: never[];
            export { value_49 as value };
        }
        namespace spotLightMatrix {
            let value_50: never[];
            export { value_50 as value };
        }
        namespace pointLights {
            let value_51: never[];
            export { value_51 as value };
            export namespace properties_4 {
                let color_2: {};
                export { color_2 as color };
                let position_1: {};
                export { position_1 as position };
                let decay_1: {};
                export { decay_1 as decay };
                let distance_1: {};
                export { distance_1 as distance };
            }
            export { properties_4 as properties };
        }
        namespace pointLightShadows {
            let value_52: never[];
            export { value_52 as value };
            export namespace properties_5 {
                let shadowIntensity_2: number;
                export { shadowIntensity_2 as shadowIntensity };
                let shadowBias_2: {};
                export { shadowBias_2 as shadowBias };
                let shadowNormalBias_2: {};
                export { shadowNormalBias_2 as shadowNormalBias };
                let shadowRadius_2: {};
                export { shadowRadius_2 as shadowRadius };
                let shadowMapSize_2: {};
                export { shadowMapSize_2 as shadowMapSize };
                export let shadowCameraNear: {};
                export let shadowCameraFar: {};
            }
            export { properties_5 as properties };
        }
        namespace pointShadowMatrix {
            let value_53: never[];
            export { value_53 as value };
        }
        namespace hemisphereLights {
            let value_54: never[];
            export { value_54 as value };
            export namespace properties_6 {
                let direction_2: {};
                export { direction_2 as direction };
                export let skyColor: {};
                export let groundColor: {};
            }
            export { properties_6 as properties };
        }
        namespace rectAreaLights {
            let value_55: never[];
            export { value_55 as value };
            export namespace properties_7 {
                let color_3: {};
                export { color_3 as color };
                let position_2: {};
                export { position_2 as position };
                export let width: {};
                export let height: {};
            }
            export { properties_7 as properties };
        }
        namespace ltc_1 {
            let value_56: null;
            export { value_56 as value };
        }
        namespace ltc_2 {
            let value_57: null;
            export { value_57 as value };
        }
        namespace probesSH {
            let value_58: null;
            export { value_58 as value };
        }
        namespace probesMin {
            let value_59: Vector3;
            export { value_59 as value };
        }
        namespace probesMax {
            let value_60: Vector3;
            export { value_60 as value };
        }
        namespace probesResolution {
            let value_61: Vector3;
            export { value_61 as value };
        }
    }
    export namespace points {
        export namespace diffuse_1 {
            let value_62: Color;
            export { value_62 as value };
        }
        export { diffuse_1 as diffuse };
        export namespace opacity_1 {
            let value_63: number;
            export { value_63 as value };
        }
        export { opacity_1 as opacity };
        export namespace size {
            let value_64: number;
            export { value_64 as value };
        }
        export namespace scale {
            let value_65: number;
            export { value_65 as value };
        }
        export namespace map_1 {
            let value_66: null;
            export { value_66 as value };
        }
        export { map_1 as map };
        export namespace alphaMap_1 {
            let value_67: null;
            export { value_67 as value };
        }
        export { alphaMap_1 as alphaMap };
        export namespace alphaMapTransform_1 {
            let value_68: Matrix3;
            export { value_68 as value };
        }
        export { alphaMapTransform_1 as alphaMapTransform };
        export namespace alphaTest_1 {
            let value_69: number;
            export { value_69 as value };
        }
        export { alphaTest_1 as alphaTest };
        export namespace uvTransform {
            let value_70: Matrix3;
            export { value_70 as value };
        }
    }
    export namespace sprite {
        export namespace diffuse_2 {
            let value_71: Color;
            export { value_71 as value };
        }
        export { diffuse_2 as diffuse };
        export namespace opacity_2 {
            let value_72: number;
            export { value_72 as value };
        }
        export { opacity_2 as opacity };
        export namespace center {
            let value_73: Vector2;
            export { value_73 as value };
        }
        export namespace rotation {
            let value_74: number;
            export { value_74 as value };
        }
        export namespace map_2 {
            let value_75: null;
            export { value_75 as value };
        }
        export { map_2 as map };
        export namespace mapTransform_1 {
            let value_76: Matrix3;
            export { value_76 as value };
        }
        export { mapTransform_1 as mapTransform };
        export namespace alphaMap_2 {
            let value_77: null;
            export { value_77 as value };
        }
        export { alphaMap_2 as alphaMap };
        export namespace alphaMapTransform_2 {
            let value_78: Matrix3;
            export { value_78 as value };
        }
        export { alphaMapTransform_2 as alphaMapTransform };
        export namespace alphaTest_2 {
            let value_79: number;
            export { value_79 as value };
        }
        export { alphaTest_2 as alphaTest };
    }
}
import { UniformsUtils } from './three.core.js';
import { UnsignedByteType } from './three.core.js';
import { UnsignedInt101111Type } from './three.core.js';
import { UnsignedInt248Type } from './three.core.js';
import { UnsignedInt5999Type } from './three.core.js';
import { UnsignedIntType } from './three.core.js';
import { UnsignedShort4444Type } from './three.core.js';
import { UnsignedShort5551Type } from './three.core.js';
import { UnsignedShortType } from './three.core.js';
import { VSMShadowMap } from './three.core.js';
import { Vector2 } from './three.core.js';
import { Vector3 } from './three.core.js';
import { Vector4 } from './three.core.js';
import { WebGLCoordinateSystem } from './three.core.js';
/**
 * A cube render target used in context of {@link WebGLRenderer}.
 *
 * @augments WebGLRenderTarget
 */
export class WebGLCubeRenderTarget extends WebGLRenderTarget {
    /**
     * Constructs a new cube render target.
     *
     * @param {number} [size=1] - The size of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(size?: number, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLCubeRenderTarget: boolean;
    /**
     * Converts the given equirectangular texture to a cube map.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {Texture} texture - The equirectangular texture.
     * @return {WebGLCubeRenderTarget} A reference to this cube render target.
     */
    fromEquirectangularTexture(renderer: WebGLRenderer, texture: Texture): WebGLCubeRenderTarget;
    /**
     * Clears this cube render target.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear(renderer: WebGLRenderer, color?: boolean, depth?: boolean, stencil?: boolean): void;
}
import { WebGLRenderTarget } from './three.core.js';
/**
 * This renderer uses WebGL 2 to display scenes.
 *
 * WebGL 1 is not supported since `r163`.
 */
export class WebGLRenderer {
    /**
     * Constructs a new WebGL renderer.
     *
     * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
     */
    constructor(parameters?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLRenderer: boolean;
    /**
     * A canvas where the renderer draws its output. This is automatically created by the renderer
     * in the constructor (if not provided already); you just need to add it to your page like so:
     * ```js
     * document.body.appendChild( renderer.domElement );
     * ```
     *
     * @type {HTMLCanvasElement|OffscreenCanvas}
     */
    domElement: HTMLCanvasElement | OffscreenCanvas;
    /**
     * A object with debug configuration settings.
     *
     * - `checkShaderErrors`: If it is `true`, defines whether material shader programs are
     * checked for errors during compilation and linkage process. It may be useful to disable
     * this check in production for performance gain. It is strongly recommended to keep these
     * checks enabled during development. If the shader does not compile and link, it will not
     * work and associated material will not render.
     * - `onShaderError(gl, program, glVertexShader,glFragmentShader)`: A callback function that
     * can be used for custom error reporting. The callback receives the WebGL context, an instance
     * of WebGLProgram as well two instances of WebGLShader representing the vertex and fragment shader.
     * Assigning a custom function disables the default error reporting.
     *
     * @type {Object}
     */
    debug: Object;
    /**
     * Whether the renderer should automatically clear its output before rendering a frame or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClear: boolean;
    /**
     * If {@link WebGLRenderer#autoClear} set to `true`, whether the renderer should clear
     * the color buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClearColor: boolean;
    /**
     * If {@link WebGLRenderer#autoClear} set to `true`, whether the renderer should clear
     * the depth buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClearDepth: boolean;
    /**
     * If {@link WebGLRenderer#autoClear} set to `true`, whether the renderer should clear
     * the stencil buffer or not.
     *
     * @type {boolean}
     * @default true
     */
    autoClearStencil: boolean;
    /**
     * Whether the renderer should sort objects or not.
     *
     * Note: Sorting is used to attempt to properly render objects that have some
     * degree of transparency. By definition, sorting objects may not work in all
     * cases. Depending on the needs of application, it may be necessary to turn
     * off sorting and use other methods to deal with transparency rendering e.g.
     * manually determining each object's rendering order.
     *
     * @type {boolean}
     * @default true
     */
    sortObjects: boolean;
    /**
     * User-defined clipping planes specified in world space. These planes apply globally.
     * Points in space whose dot product with the plane is negative are cut away.
     *
     * @type {Array<Plane>}
     */
    clippingPlanes: Array<Plane>;
    /**
     * Whether the renderer respects object-level clipping planes or not.
     *
     * @type {boolean}
     * @default false
     */
    localClippingEnabled: boolean;
    /**
     * The tone mapping technique of the renderer.
     *
     * @type {(NoToneMapping|LinearToneMapping|ReinhardToneMapping|CineonToneMapping|ACESFilmicToneMapping|CustomToneMapping|AgXToneMapping|NeutralToneMapping)}
     * @default NoToneMapping
     */
    toneMapping: (number | number | number | number | number | number | number | number);
    /**
     * Exposure level of tone mapping.
     *
     * @type {number}
     * @default 1
     */
    toneMappingExposure: number;
    /**
     * The normalized resolution scale for the transmission render target, measured in percentage
     * of viewport dimensions. Lowering this value can result in significant performance improvements
     * when using {@link MeshPhysicalMaterial#transmission}.
     *
     * @type {number}
     * @default 1
     */
    transmissionResolutionScale: number;
    _outputColorSpace: string;
    /**
     * A reference to the XR manager.
     *
     * @type {WebXRManager}
     */
    xr: WebXRManager;
    /**
     * Returns the rendering context.
     *
     * @return {WebGL2RenderingContext} The rendering context.
     */
    getContext: () => WebGL2RenderingContext;
    /**
     * Returns the rendering context attributes.
     *
     * @return {WebGLContextAttributes} The rendering context attributes.
     */
    getContextAttributes: () => WebGLContextAttributes;
    /**
     * Simulates a loss of the WebGL context. This requires support for the `WEBGL_lose_context` extension.
     */
    forceContextLoss: () => void;
    /**
     * Simulates a restore of the WebGL context. This requires support for the `WEBGL_lose_context` extension.
     */
    forceContextRestore: () => void;
    /**
     * Returns the pixel ratio.
     *
     * @return {number} The pixel ratio.
     */
    getPixelRatio: () => number;
    /**
     * Sets the given pixel ratio and resizes the canvas if necessary.
     *
     * @param {number} value - The pixel ratio.
     */
    setPixelRatio: (value: number) => void;
    /**
     * Returns the renderer's size in logical pixels. This method does not honor the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The renderer's size in logical pixels.
     */
    getSize: (target: Vector2) => Vector2;
    /**
     * Resizes the output canvas to (width, height) with device pixel ratio taken
     * into account, and also sets the viewport to fit that size, starting in (0,
     * 0). Setting `updateStyle` to false prevents any style changes to the output canvas.
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     * @param {boolean} [updateStyle=true] - Whether to update the `style` attribute of the canvas or not.
     */
    setSize: (width: number, height: number, updateStyle?: boolean) => void;
    /**
     * Returns the drawing buffer size in physical pixels. This method honors the pixel ratio.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The drawing buffer size.
     */
    getDrawingBufferSize: (target: Vector2) => Vector2;
    /**
     * This method allows to define the drawing buffer size by specifying
     * width, height and pixel ratio all at once. The size of the drawing
     * buffer is computed with this formula:
     * ```js
     * size.x = width * pixelRatio;
     * size.y = height * pixelRatio;
     * ```
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     * @param {number} pixelRatio - The pixel ratio.
     */
    setDrawingBufferSize: (width: number, height: number, pixelRatio: number) => void;
    /**
     * Sets the post-processing effects to be applied after rendering.
     *
     * @param {Array} effects - An array of post-processing effects.
     */
    setEffects: (effects: any[]) => void;
    /**
     * Returns the current viewport definition.
     *
     * @param {Vector2} target - The method writes the result in this target object.
     * @return {Vector2} The current viewport definition.
     */
    getCurrentViewport: (target: Vector2) => Vector2;
    /**
     * Returns the viewport definition.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The viewport definition.
     */
    getViewport: (target: Vector4) => Vector4;
    /**
     * Sets the viewport to render from `(x, y)` to `(x + width, y + height)`.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.
     * Or alternatively a four-component vector specifying all the parameters of the viewport.
     * @param {number} y - The vertical coordinate for the lower left corner of the viewport origin  in logical pixel unit.
     * @param {number} width - The width of the viewport in logical pixel unit.
     * @param {number} height - The height of the viewport in logical pixel unit.
     */
    setViewport: (x: number | Vector4, y: number, width: number, height: number) => void;
    /**
     * Returns the scissor region.
     *
     * @param {Vector4} target - The method writes the result in this target object.
     * @return {Vector4} The scissor region.
     */
    getScissor: (target: Vector4) => Vector4;
    /**
     * Sets the scissor region to render from `(x, y)` to `(x + width, y + height)`.
     *
     * @param {number | Vector4} x - The horizontal coordinate for the lower left corner of the scissor region origin in logical pixel unit.
     * Or alternatively a four-component vector specifying all the parameters of the scissor region.
     * @param {number} y - The vertical coordinate for the lower left corner of the scissor region origin  in logical pixel unit.
     * @param {number} width - The width of the scissor region in logical pixel unit.
     * @param {number} height - The height of the scissor region in logical pixel unit.
     */
    setScissor: (x: number | Vector4, y: number, width: number, height: number) => void;
    /**
     * Returns `true` if the scissor test is enabled.
     *
     * @return {boolean} Whether the scissor test is enabled or not.
     */
    getScissorTest: () => boolean;
    /**
     * Enable or disable the scissor test. When this is enabled, only the pixels
     * within the defined scissor area will be affected by further renderer
     * actions.
     *
     * @param {boolean} boolean - Whether the scissor test is enabled or not.
     */
    setScissorTest: (boolean: boolean) => void;
    /**
     * Sets a custom opaque sort function for the render lists. Pass `null`
     * to use the default `painterSortStable` function.
     *
     * @param {?Function} method - The opaque sort function.
     */
    setOpaqueSort: (method: Function | null) => void;
    /**
     * Sets a custom transparent sort function for the render lists. Pass `null`
     * to use the default `reversePainterSortStable` function.
     *
     * @param {?Function} method - The opaque sort function.
     */
    setTransparentSort: (method: Function | null) => void;
    /**
     * Returns the clear color.
     *
     * @param {Color} target - The method writes the result in this target object.
     * @return {Color} The clear color.
     */
    getClearColor: (target: Color) => Color;
    /**
     * Sets the clear color and alpha.
     *
     * @param {Color} color - The clear color.
     * @param {number} [alpha=1] - The clear alpha.
     */
    setClearColor: (...args: any[]) => void;
    /**
     * Returns the clear alpha. Ranges within `[0,1]`.
     *
     * @return {number} The clear alpha.
     */
    getClearAlpha: () => number;
    /**
     * Sets the clear alpha.
     *
     * @param {number} alpha - The clear alpha.
     */
    setClearAlpha: (...args: any[]) => void;
    /**
     * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
     * This method initializes the buffers to the current clear color values.
     *
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear: (color?: boolean, depth?: boolean, stencil?: boolean) => void;
    /**
     * Clears the color buffer. Equivalent to calling `renderer.clear( true, false, false )`.
     */
    clearColor: () => void;
    /**
     * Clears the depth buffer. Equivalent to calling `renderer.clear( false, true, false )`.
     */
    clearDepth: () => void;
    /**
     * Clears the stencil buffer. Equivalent to calling `renderer.clear( false, false, true )`.
     */
    clearStencil: () => void;
    /**
     * Sets a compatibility node builder for rendering node materials with WebGLRenderer.
     * This enables using TSL (Three.js Shading Language) node materials to prepare
     * for migration to WebGPURenderer.
     *
     * @param {WebGLNodesHandler} nodesHandler - The node builder instance.
     */
    setNodesHandler: (nodesHandler: WebGLNodesHandler) => void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose: () => void;
    renderBufferDirect: (camera: any, scene: any, geometry: any, material: any, object: any, group: any) => void;
    /**
     * Compiles all materials in the scene with the camera. This is useful to precompile shaders
     * before the first rendering. If you want to add a 3D object to an existing scene, use the third
     * optional parameter for applying the target scene.
     *
     * Note that the (target) scene's lighting and environment must be configured before calling this method.
     *
     * @param {Object3D} scene - The scene or another type of 3D object to precompile.
     * @param {Camera} camera - The camera.
     * @param {?Scene} [targetScene=null] - The target scene.
     * @return {Set<Material>} The precompiled materials.
     */
    compile: (scene: Object3D, camera: Camera, targetScene?: Scene | null) => Set<Material>;
    /**
     * Asynchronous version of {@link WebGLRenderer#compile}.
     *
     * This method makes use of the `KHR_parallel_shader_compile` WebGL extension. Hence,
     * it is recommended to use this version of `compile()` whenever possible.
     *
     * @async
     * @param {Object3D} scene - The scene or another type of 3D object to precompile.
     * @param {Camera} camera - The camera.
     * @param {?Scene} [targetScene=null] - The target scene.
     * @return {Promise} A Promise that resolves when the given scene can be rendered without unnecessary stalling due to shader compilation.
     */
    compileAsync: (scene: Object3D, camera: Camera, targetScene?: Scene | null) => Promise<any>;
    /**
     * Applications are advised to always define the animation loop
     * with this method and not manually with `requestAnimationFrame()`
     * for best compatibility.
     *
     * @param {?onAnimationCallback} callback - The application's animation loop.
     */
    setAnimationLoop: (callback: onAnimationCallback | null) => void;
    /**
     * Renders the given scene (or other type of 3D object) using the given camera.
     *
     * The render is done to a previously specified render target set by calling {@link WebGLRenderer#setRenderTarget}
     * or to the canvas as usual.
     *
     * By default render buffers are cleared before rendering but you can prevent
     * this by setting the property `autoClear` to `false`. If you want to prevent
     * only certain buffers being cleared you can `autoClearColor`, `autoClearDepth`
     * or `autoClearStencil` to `false`. To force a clear, use {@link WebGLRenderer#clear}.
     *
     * @param {Object3D} scene - The scene to render.
     * @param {Camera} camera - The camera.
     */
    render: (scene: Object3D, camera: Camera) => void;
    /**
     * Returns the active cube face.
     *
     * @return {number} The active cube face.
     */
    getActiveCubeFace: () => number;
    /**
     * Returns the active mipmap level.
     *
     * @return {number} The active mipmap level.
     */
    getActiveMipmapLevel: () => number;
    /**
     * Returns the active render target.
     *
     * @return {?WebGLRenderTarget} The active render target. Returns `null` if no render target
     * is currently set.
     */
    getRenderTarget: () => WebGLRenderTarget | null;
    setRenderTargetTextures: (renderTarget: any, colorTexture: any, depthTexture: any) => void;
    setRenderTargetFramebuffer: (renderTarget: any, defaultFramebuffer: any) => void;
    /**
     * Sets the active rendertarget.
     *
     * @param {?WebGLRenderTarget} renderTarget - The render target to set. When `null` is given,
     * the canvas is set as the active render target instead.
     * @param {number} [activeCubeFace=0] - The active cube face when using a cube render target.
     * Indicates the z layer to render in to when using 3D or array render targets.
     * @param {number} [activeMipmapLevel=0] - The active mipmap level.
     */
    setRenderTarget: (renderTarget: WebGLRenderTarget | null, activeCubeFace?: number, activeMipmapLevel?: number) => void;
    /**
     * Reads the pixel data from the given render target into the given buffer.
     *
     * @param {WebGLRenderTarget} renderTarget - The render target to read from.
     * @param {number} x - The `x` coordinate of the copy region's origin.
     * @param {number} y - The `y` coordinate of the copy region's origin.
     * @param {number} width - The width of the copy region.
     * @param {number} height - The height of the copy region.
     * @param {TypedArray} buffer - The result buffer.
     * @param {number} [activeCubeFaceIndex] - The active cube face index.
     * @param {number} [textureIndex=0] - The texture index of an MRT render target.
     */
    readRenderTargetPixels: (renderTarget: WebGLRenderTarget, x: number, y: number, width: number, height: number, buffer: TypedArray, activeCubeFaceIndex?: number, textureIndex?: number) => void;
    /**
     * Asynchronous, non-blocking version of {@link WebGLRenderer#readRenderTargetPixels}.
     *
     * It is recommended to use this version of `readRenderTargetPixels()` whenever possible.
     *
     * @async
     * @param {WebGLRenderTarget} renderTarget - The render target to read from.
     * @param {number} x - The `x` coordinate of the copy region's origin.
     * @param {number} y - The `y` coordinate of the copy region's origin.
     * @param {number} width - The width of the copy region.
     * @param {number} height - The height of the copy region.
     * @param {TypedArray} buffer - The result buffer.
     * @param {number} [activeCubeFaceIndex] - The active cube face index.
     * @param {number} [textureIndex=0] - The texture index of an MRT render target.
     * @return {Promise<TypedArray>} A Promise that resolves when the read has been finished. The resolve provides the read data as a typed array.
     */
    readRenderTargetPixelsAsync: (renderTarget: WebGLRenderTarget, x: number, y: number, width: number, height: number, buffer: TypedArray, activeCubeFaceIndex?: number, textureIndex?: number) => Promise<TypedArray>;
    /**
     * Copies pixels from the current bound framebuffer into the given texture.
     *
     * @param {FramebufferTexture} texture - The texture.
     * @param {?Vector2} [position=null] - The start position of the copy operation.
     * @param {number} [level=0] - The mip level. The default represents the base mip.
     */
    copyFramebufferToTexture: (texture: FramebufferTexture, position?: Vector2 | null, level?: number) => void;
    /**
     * Copies data of the given source texture into a destination texture.
     *
     * When using render target textures as `srcTexture` and `dstTexture`, you must make sure both render targets are initialized
     * {@link WebGLRenderer#initRenderTarget}.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     * @param {?(Box2|Box3)} [srcRegion=null] - A bounding box which describes the source region. Can be two or three-dimensional.
     * @param {?(Vector2|Vector3)} [dstPosition=null] - A vector that represents the origin of the destination region. Can be two or three-dimensional.
     * @param {number} [srcLevel=0] - The source mipmap level to copy.
     * @param {?number} [dstLevel=0] - The destination mipmap level.
     */
    copyTextureToTexture: (srcTexture: Texture, dstTexture: Texture, srcRegion?: (Box2 | Box3) | null, dstPosition?: (Vector2 | Vector3) | null, srcLevel?: number, dstLevel?: number | null) => void;
    /**
     * Initializes the given WebGLRenderTarget memory. Useful for initializing a render target so data
     * can be copied into it using {@link WebGLRenderer#copyTextureToTexture} before it has been
     * rendered to.
     *
     * @param {WebGLRenderTarget} target - The render target.
     */
    initRenderTarget: (target: WebGLRenderTarget) => void;
    /**
     * Initializes the given texture. Useful for preloading a texture rather than waiting until first
     * render (which can cause noticeable lags due to decode and GPU upload overhead).
     *
     * @param {Texture} texture - The texture.
     */
    initTexture: (texture: Texture) => void;
    /**
     * Can be used to reset the internal WebGL state. This method is mostly
     * relevant for applications which share a single WebGL context across
     * multiple WebGL libraries.
     */
    resetState: () => void;
    /**
     * Defines the coordinate system of the renderer.
     *
     * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
     *
     * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
     * @default WebGLCoordinateSystem
     * @readonly
     */
    readonly get coordinateSystem(): number | WebGPUCoordinateSystem;
    set outputColorSpace(colorSpace: string | string);
    /**
     * Defines the output color space of the renderer.
     *
     * @type {SRGBColorSpace|LinearSRGBColorSpace}
     * @default SRGBColorSpace
     */
    get outputColorSpace(): string | string;
}
export function WebGLUtils(gl: any, extensions: any): {
    convert: (p: any, colorSpace?: string) => any;
};
import { WebXRController } from './three.core.js';
import { ZeroFactor } from './three.core.js';
import { createCanvasElement } from './three.core.js';
import { error } from './three.core.js';
import { log } from './three.core.js';
import { warn } from './three.core.js';
import { warnOnce } from './three.core.js';
declare var alphahash_fragment: string;
declare var alphahash_pars_fragment: string;
declare var alphamap_fragment: string;
declare var alphamap_pars_fragment: string;
declare var alphatest_fragment: string;
declare var alphatest_pars_fragment: string;
declare var aomap_fragment: string;
declare var aomap_pars_fragment: string;
declare var batching_pars_vertex: string;
declare var batching_vertex: string;
declare var begin_vertex: string;
declare var beginnormal_vertex: string;
declare var bsdfs: string;
declare var iridescence_fragment: string;
declare var bumpmap_pars_fragment: string;
declare var clipping_planes_fragment: string;
declare var clipping_planes_pars_fragment: string;
declare var clipping_planes_pars_vertex: string;
declare var clipping_planes_vertex: string;
declare var color_fragment: string;
declare var color_pars_fragment: string;
declare var color_pars_vertex: string;
declare var color_vertex: string;
declare var common: string;
declare var cube_uv_reflection_fragment: string;
declare var defaultnormal_vertex: string;
declare var displacementmap_pars_vertex: string;
declare var displacementmap_vertex: string;
declare var emissivemap_fragment: string;
declare var emissivemap_pars_fragment: string;
declare var colorspace_fragment: string;
declare var colorspace_pars_fragment: string;
declare var envmap_fragment: string;
declare var envmap_common_pars_fragment: string;
declare var envmap_pars_fragment: string;
declare var envmap_pars_vertex: string;
declare var envmap_physical_pars_fragment: string;
declare var envmap_vertex: string;
declare var fog_vertex: string;
declare var fog_pars_vertex: string;
declare var fog_fragment: string;
declare var fog_pars_fragment: string;
declare var gradientmap_pars_fragment: string;
declare var lightmap_pars_fragment: string;
declare var lights_lambert_fragment: string;
declare var lights_lambert_pars_fragment: string;
declare var lights_pars_begin: string;
declare var lights_toon_fragment: string;
declare var lights_toon_pars_fragment: string;
declare var lights_phong_fragment: string;
declare var lights_phong_pars_fragment: string;
declare var lights_physical_fragment: string;
declare var lights_physical_pars_fragment: string;
declare var lights_fragment_begin: string;
declare var lights_fragment_maps: string;
declare var lights_fragment_end: string;
declare var lightprobes_pars_fragment: string;
declare var logdepthbuf_fragment: string;
declare var logdepthbuf_pars_fragment: string;
declare var logdepthbuf_pars_vertex: string;
declare var logdepthbuf_vertex: string;
declare var map_fragment: string;
declare var map_pars_fragment: string;
declare var map_particle_fragment: string;
declare var map_particle_pars_fragment: string;
declare var metalnessmap_fragment: string;
declare var metalnessmap_pars_fragment: string;
declare var morphinstance_vertex: string;
declare var morphcolor_vertex: string;
declare var morphnormal_vertex: string;
declare var morphtarget_pars_vertex: string;
declare var morphtarget_vertex: string;
declare var normal_fragment_begin: string;
declare var normal_fragment_maps: string;
declare var normal_pars_fragment: string;
declare var normal_pars_vertex: string;
declare var normal_vertex: string;
declare var normalmap_pars_fragment: string;
declare var clearcoat_normal_fragment_begin: string;
declare var clearcoat_normal_fragment_maps: string;
declare var clearcoat_pars_fragment: string;
declare var iridescence_pars_fragment: string;
declare var opaque_fragment: string;
declare var packing: string;
declare var premultiplied_alpha_fragment: string;
declare var project_vertex: string;
declare var dithering_fragment: string;
declare var dithering_pars_fragment: string;
declare var roughnessmap_fragment: string;
declare var roughnessmap_pars_fragment: string;
declare var shadowmap_pars_fragment: string;
declare var shadowmap_pars_vertex: string;
declare var shadowmap_vertex: string;
declare var shadowmask_pars_fragment: string;
declare var skinbase_vertex: string;
declare var skinning_pars_vertex: string;
declare var skinning_vertex: string;
declare var skinnormal_vertex: string;
declare var specularmap_fragment: string;
declare var specularmap_pars_fragment: string;
declare var tonemapping_fragment: string;
declare var tonemapping_pars_fragment: string;
declare var transmission_fragment: string;
declare var transmission_pars_fragment: string;
declare var uv_pars_fragment: string;
declare var uv_pars_vertex: string;
declare var uv_vertex: string;
declare var worldpos_vertex: string;
declare const vertex$h: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";
declare const fragment$h: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";
declare const vertex$g: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";
declare const fragment$g: "#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";
declare const vertex$f: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";
declare const fragment$f: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";
declare const vertex$e: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}";
declare const fragment$e: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\tfloat fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n\t#else\n\t\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n\t#endif\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#elif DEPTH_PACKING == 3202\n\t\tgl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n\t#elif DEPTH_PACKING == 3203\n\t\tgl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n\t#endif\n}";
declare const vertex$d: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";
declare const fragment$d: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}";
declare const vertex$c: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";
declare const fragment$c: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}";
declare const vertex$b: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$b: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
declare const vertex$a: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$a: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
declare const vertex$9: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$9: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
declare const vertex$8: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";
declare const fragment$8: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
declare const vertex$7: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";
declare const fragment$7: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}";
declare const vertex$6: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$6: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
declare const vertex$5: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}";
declare const fragment$5: "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n\tuniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n \n\t\toutgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n \t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
declare const vertex$4: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$4: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
declare const vertex$3: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$3: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
declare const vertex$2: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$2: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
declare const vertex$1: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix[ 3 ];\n\tvec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
declare const fragment$1: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}";
/**
 * This class represents an abstraction of the WebXR Device API and is
 * internally used by {@link WebGLRenderer}. `WebXRManager` also provides a public
 * interface that allows users to enable/disable XR and perform XR related
 * tasks like for instance retrieving controllers.
 *
 * @augments EventDispatcher
 * @hideconstructor
 */
declare class WebXRManager extends EventDispatcher {
    /**
     * Constructs a new WebGL renderer.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGL2RenderingContext} gl - The rendering context.
     */
    constructor(renderer: WebGLRenderer, gl: WebGL2RenderingContext);
    /**
     * Whether the manager's XR camera should be automatically updated or not.
     *
     * @type {boolean}
     * @default true
     */
    cameraAutoUpdate: boolean;
    /**
     * This flag notifies the renderer to be ready for XR rendering. Set it to `true`
     * if you are going to use XR in your app.
     *
     * @type {boolean}
     * @default false
     */
    enabled: boolean;
    /**
     * Whether XR presentation is active or not.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    readonly isPresenting: boolean;
    /**
     * Returns a group representing the `target ray` space of the XR controller.
     * Use this space for visualizing 3D objects that support the user in pointing
     * tasks like UI interaction.
     *
     * @param {number} index - The index of the controller.
     * @return {Group} A group representing the `target ray` space.
     */
    getController: (index: number) => Group;
    /**
     * Returns a group representing the `grip` space of the XR controller.
     * Use this space for visualizing 3D objects that support the user in pointing
     * tasks like UI interaction.
     *
     * Note: If you want to show something in the user's hand AND offer a
     * pointing ray at the same time, you'll want to attached the handheld object
     * to the group returned by `getControllerGrip()` and the ray to the
     * group returned by `getController()`. The idea is to have two
     * different groups in two different coordinate spaces for the same WebXR
     * controller.
     *
     * @param {number} index - The index of the controller.
     * @return {Group} A group representing the `grip` space.
     */
    getControllerGrip: (index: number) => Group;
    /**
     * Returns a group representing the `hand` space of the XR controller.
     * Use this space for visualizing 3D objects that support the user in pointing
     * tasks like UI interaction.
     *
     * @param {number} index - The index of the controller.
     * @return {Group} A group representing the `hand` space.
     */
    getHand: (index: number) => Group;
    /**
     * Sets the framebuffer scale factor.
     *
     * This method can not be used during a XR session.
     *
     * @param {number} value - The framebuffer scale factor.
     */
    setFramebufferScaleFactor: (value: number) => void;
    /**
     * Sets the reference space type. Can be used to configure a spatial relationship with the user's physical
     * environment. Depending on how the user moves in 3D space, setting an appropriate reference space can
     * improve tracking. Default is `local-floor`. Valid values can be found here
     * https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace#reference_space_types.
     *
     * This method can not be used during a XR session.
     *
     * @param {string} value - The reference space type.
     */
    setReferenceSpaceType: (value: string) => void;
    /**
     * Returns the XR reference space.
     *
     * @return {XRReferenceSpace} The XR reference space.
     */
    getReferenceSpace: () => XRReferenceSpace;
    /**
     * Sets a custom XR reference space.
     *
     * @param {XRReferenceSpace} space - The XR reference space.
     */
    setReferenceSpace: (space: XRReferenceSpace) => void;
    /**
     * Returns the current base layer.
     *
     * This is an `XRProjectionLayer` when the targeted XR device supports the
     * WebXR Layers API, or an `XRWebGLLayer` otherwise.
     *
     * @return {?(XRWebGLLayer|XRProjectionLayer)} The XR base layer.
     */
    getBaseLayer: () => (XRWebGLLayer | XRProjectionLayer) | null;
    /**
     * Returns the current XR binding.
     *
     * Creates a new binding if needed and the browser is
     * capable of doing so.
     *
     * @return {?XRWebGLBinding} The XR binding. Returns `null` if one cannot be created.
     */
    getBinding: () => XRWebGLBinding | null;
    /**
     * Returns the current XR frame.
     *
     * @return {?XRFrame} The XR frame. Returns `null` when used outside a XR session.
     */
    getFrame: () => XRFrame | null;
    /**
     * Returns the current XR session.
     *
     * @return {?XRSession} The XR session. Returns `null` when used outside a XR session.
     */
    getSession: () => XRSession | null;
    /**
     * After a XR session has been requested usually with one of the `*Button` modules, it
     * is injected into the renderer with this method. This method triggers the start of
     * the actual XR rendering.
     *
     * @async
     * @param {XRSession} value - The XR session to set.
     * @return {Promise} A Promise that resolves when the session has been set.
     */
    setSession: (value: XRSession) => Promise<any>;
    /**
     * Returns the environment blend mode from the current XR session.
     *
     * @return {'opaque'|'additive'|'alpha-blend'|undefined} The environment blend mode. Returns `undefined` when used outside of a XR session.
     */
    getEnvironmentBlendMode: () => "opaque" | "additive" | "alpha-blend" | undefined;
    /**
     * Returns the current depth texture computed via depth sensing.
     *
     * See {@link WebXRDepthSensing#getDepthTexture}.
     *
     * @return {?Texture} The depth texture.
     */
    getDepthTexture: () => Texture | null;
    /**
     * Updates the state of the XR camera. Use this method on app level if you
     * set `cameraAutoUpdate` to `false`. The method requires the non-XR
     * camera of the scene as a parameter. The passed in camera's transformation
     * is automatically adjusted to the position of the XR camera when calling
     * this method.
     *
     * @param {Camera} camera - The camera.
     */
    updateCamera: (camera: Camera) => void;
    /**
     * Returns an instance of {@link ArrayCamera} which represents the XR camera
     * of the active XR session. For each view it holds a separate camera object.
     *
     * The camera's `fov` is currently not used and does not reflect the fov of
     * the XR camera. If you need the fov on app level, you have to compute in
     * manually from the XR camera's projection matrices.
     *
     * @return {ArrayCamera} The XR camera.
     */
    getCamera: () => ArrayCamera;
    /**
     * Returns the amount of foveation used by the XR compositor for the projection layer.
     *
     * @return {number|undefined} The amount of foveation.
     */
    getFoveation: () => number | undefined;
    /**
     * Sets the foveation value.
     *
     * @param {number} value - A number in the range `[0,1]` where `0` means no foveation (full resolution)
     * and `1` means maximum foveation (the edges render at lower resolution).
     */
    setFoveation: (value: number) => void;
    /**
     * Returns `true` if depth sensing is supported.
     *
     * @return {boolean} Whether depth sensing is supported or not.
     */
    hasDepthSensing: () => boolean;
    /**
     * Returns the depth sensing mesh.
     *
     * See {@link WebXRDepthSensing#getMesh}.
     *
     * @return {Mesh} The depth sensing mesh.
     */
    getDepthSensingMesh: () => Mesh;
    /**
     * Retrieves an opaque texture from the view-aligned {@link XRCamera}.
     * Only available during the current animation loop.
     *
     * @param {XRCamera} xrCamera - The camera to query.
     * @return {?Texture} An opaque texture representing the current raw camera frame.
     */
    getCameraTexture: (xrCamera: XRCamera) => Texture | null;
    setAnimationLoop: (callback: any) => void;
    dispose: () => void;
}
export { ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveBlending, AgXToneMapping, AlphaFormat, AlwaysCompare, AlwaysDepth, ArrayCamera, BackSide, BoxGeometry, BufferAttribute, BufferGeometry, ByteType, CineonToneMapping, ClampToEdgeWrapping, Color, ColorManagement, ConstantAlphaFactor, ConstantColorFactor, CubeCamera, CubeDepthTexture, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeUVReflectionMapping, CullFaceBack, CullFaceFront, CullFaceNone, CustomBlending, CustomToneMapping, Data3DTexture, DataArrayTexture, DataTexture, DepthFormat, DepthStencilFormat, DepthTexture, DoubleSide, DstAlphaFactor, DstColorFactor, EqualCompare, EqualDepth, EquirectangularReflectionMapping, EquirectangularRefractionMapping, EventDispatcher, ExternalTexture, Float32BufferAttribute, FloatType, FrontSide, Frustum, GLSL3, GreaterCompare, GreaterDepth, GreaterEqualCompare, GreaterEqualDepth, HalfFloatType, IntType, Layers, LessCompare, LessDepth, LessEqualCompare, LessEqualDepth, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearSRGBColorSpace, LinearToneMapping, LinearTransfer, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeutralToneMapping, NeverCompare, NeverDepth, NoBlending, NoColorSpace, NoToneMapping, NormalBlending, NotEqualCompare, NotEqualDepth, ObjectSpaceNormalMap, OneFactor, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PerspectiveCamera, Plane, PlaneGeometry, R11_EAC_Format, RED_GREEN_RGTC2_Format, RED_RGTC1_Format, REVISION, RG11_EAC_Format, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBFormat, RGB_BPTC_SIGNED_Format, RGB_BPTC_UNSIGNED_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGFormat, RGIntegerFormat, RawShaderMaterial, RedFormat, RedIntegerFormat, ReinhardToneMapping, RepeatWrapping, ReverseSubtractEquation, SIGNED_R11_EAC_Format, SIGNED_RED_GREEN_RGTC2_Format, SIGNED_RED_RGTC1_Format, SIGNED_RG11_EAC_Format, SRGBColorSpace, SRGBTransfer, ShaderMaterial, ShortType, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, SubtractEquation, SubtractiveBlending, TangentSpaceNormalMap, Texture, Uint16BufferAttribute, Uint32BufferAttribute, UniformsUtils, UnsignedByteType, UnsignedInt101111Type, UnsignedInt248Type, UnsignedInt5999Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, WebGLCoordinateSystem, WebGLRenderTarget, WebXRController, ZeroFactor, createCanvasElement, error, log, warn, warnOnce };
export { AdditiveAnimationBlendMode, AlwaysStencilFunc, AmbientLight, AnimationAction, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrowHelper, AttachedBindMode, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BasicDepthPacking, BasicShadowMap, BatchedMesh, BezierInterpolant, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxHelper, BufferGeometryLoader, Cache, Camera, CameraHelper, CanvasTexture, CapsuleGeometry, CatmullRomCurve3, CircleGeometry, Clock, ColorKeyframeTrack, Compatibility, CompressedArrayTexture, CompressedCubeTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, Controls, CubeTextureLoader, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceFrontBack, Curve, CurvePath, CylinderGeometry, Cylindrical, DataTextureLoader, DataUtils, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DetachedBindMode, DirectionalLight, DirectionalLightHelper, DiscreteInterpolant, DodecahedronGeometry, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, EqualStencilFunc, Euler, ExtrudeGeometry, FileLoader, Float16BufferAttribute, Fog, FogExp2, FramebufferTexture, FrustumArray, GLBufferAttribute, GLSL1, GreaterEqualStencilFunc, GreaterStencilFunc, GridHelper, Group, HTMLTexture, HemisphereLight, HemisphereLightHelper, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16BufferAttribute, Int32BufferAttribute, Int8BufferAttribute, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateBezier, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InterpolationSamplingMode, InterpolationSamplingType, InvertStencilOp, KeepStencilOp, KeyframeTrack, LOD, LatheGeometry, LessEqualStencilFunc, LessStencilFunc, Light, LightProbe, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LineSegments, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, Loader, LoaderUtils, LoadingManager, LoopOnce, LoopPingPong, LoopRepeat, MOUSE, Material, MaterialBlending, MaterialLoader, MathUtils, Matrix2, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NeverStencilFunc, NoNormalPacking, NormalAnimationBlendMode, NormalGAPacking, NormalRGPacking, NotEqualStencilFunc, NumberKeyframeTrack, Object3D, ObjectLoader, OctahedronGeometry, Path, PlaneHelper, PointLight, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, RGBADepthPacking, RGBDepthPacking, RGBIntegerFormat, RGDepthPacking, Ray, Raycaster, RectAreaLight, RenderTarget, RenderTarget3D, ReplaceStencilOp, RingGeometry, Scene, ShadowMaterial, Shape, ShapeGeometry, ShapePath, ShapeUtils, Skeleton, SkeletonHelper, SkinnedMesh, Source, Sphere, SphereGeometry, Spherical, SphericalHarmonics3, SplineCurve, SpotLight, SpotLightHelper, Sprite, SpriteMaterial, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, TOUCH, TetrahedronGeometry, TextureLoader, TextureUtils, Timer, TimestampQuery, TorusGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeGeometry, UVMapping, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsGroup, VectorKeyframeTrack, VideoFrameTexture, VideoTexture, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGPUCoordinateSystem, WireframeGeometry, WrapAroundEnding, ZeroCurvatureEnding, ZeroSlopeEnding, ZeroStencilOp, getConsoleFunction, setConsoleFunction } from "./three.core.js";
