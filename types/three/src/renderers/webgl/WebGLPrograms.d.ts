import { Material } from '../../materials/Material.js';
import { Object3D } from '../../core/Object3D.js';
import { Light } from '../../lights/Light.js';
import { Scene } from '../../scenes/Scene.js';
import { IUniform } from '../shaders/UniformsLib.js';
import { WebGLRenderer } from '../WebGLRenderer.js';
import { WebGLBindingStates } from './WebGLBindingStates.js';
import { WebGLCapabilities } from './WebGLCapabilities.js';
import { WebGLClipping } from './WebGLClipping.js';
import { WebGLCubeMaps } from './WebGLCubeMaps.js';
import { WebGLExtensions } from './WebGLExtensions.js';
import { WebGLLightsState } from './WebGLLights.js';
import { WebGLProgram } from './WebGLProgram.js';
import {
    ColorSpace,
    Combine,
    DepthPackingStrategies,
    GLSLVersion,
    ShadowMapType,
    ToneMapping,
} from '../../constants.js';

export interface WebGLProgramParameters {
    isWebGL2: boolean;

    shaderID: string;
    shaderType: string;
    shaderName: string;

    vertexShader: string;
    fragmentShader: string;
    defines?: { [define: string]: string | number | boolean };

    customVertexShaderID?: string;
    customFragmentShaderID?: string;

    isRawShaderMaterial: boolean;
    glslVersion?: GLSLVersion;

    precision: 'lowp' | 'mediump' | 'highp';

    batching: boolean;
    instancing: boolean;
    instancingColor: boolean;

    supportsVertexTextures: boolean;
    outputColorSpace: ColorSpace;

    map: boolean;
    matcap: boolean;
    envMap: boolean;
    envMapMode: boolean;
    envMapCubeUVHeight: number | null;
    aoMap: boolean;
    lightMap: boolean;
    bumpMap: boolean;
    normalMap: boolean;
    displacementMap: boolean;
    emissiveMap: boolean;

    normalMapObjectSpace: boolean;
    normalMapTangentSpace: boolean;

    metalnessMap: boolean;
    roughnessMap: boolean;

    anisotropy: boolean;
    anisotropyMap: boolean;

    clearcoat: boolean;
    clearcoatMap: boolean;
    clearcoatNormalMap: boolean;
    clearcoatRoughnessMap: boolean;

    iridescence: boolean;
    iridescenceMap: boolean;
    iridescenceThicknessMap: boolean;

    sheen: boolean;
    sheenColorMap: boolean;
    sheenRoughnessMap: boolean;

    specularMap: boolean;
    specularColorMap: boolean;
    specularIntensityMap: boolean;

    transmission: boolean;
    transmissionMap: boolean;
    thicknessMap: boolean;

    gradientMap: boolean;

    opaque: boolean;

    alphaMap: boolean;
    alphaTest: boolean;
    alphaHash: boolean;

    combine: Combine;

    //

    mapUv: boolean;
    aoMapUv: boolean;
    lightMapUv: boolean;
    bumpMapUv: boolean;
    normalMapUv: boolean;
    displacementMapUv: boolean;
    emissiveMapUv: boolean;

    metalnessMapUv: boolean;
    roughnessMapUv: boolean;

    anisotropyMapUv: boolean;

    clearcoatMapUv: boolean;
    clearcoatNormalMapUv: boolean;
    clearcoatRoughnessMapUv: boolean;

    iridescenceMapUv: boolean;
    iridescenceThicknessMapUv: boolean;

    sheenColorMapUv: boolean;
    sheenRoughnessMapUv: boolean;

    specularMapUv: boolean;
    specularColorMapUv: boolean;
    specularIntensityMapUv: boolean;

    transmissionMapUv: boolean;
    thicknessMapUv: boolean;

    alphaMapUv: boolean;

    //

    vertexTangents: boolean;
    vertexColors: boolean;
    vertexAlphas: boolean;
    vertexUv1s: boolean;
    vertexUv2s: boolean;
    vertexUv3s: boolean;

    pointsUvs: boolean;

    fog: boolean;
    useFog: boolean;
    fogExp2: boolean | null; // null is possible because of a bug: ( fog && fog.isFogExp2 )

    flatShading: boolean;

    sizeAttenuation: boolean;
    logarithmicDepthBuffer: boolean;

    skinning: boolean;

    morphTargets: boolean;
    morphNormals: boolean;
    morphColors: boolean;
    morphTargetsCount: number;
    morphTextureStride: number;

    numDirLights: number;
    numPointLights: number;
    numSpotLights: number;
    numSpotLightMaps: number;
    numRectAreaLights: number;
    numHemiLights: number;

    numDirLightShadows: number;
    numPointLightShadows: number;
    numSpotLightShadows: number;
    numSpotLightShadowsWithMaps: number;

    numLightProbes: number;

    numClippingPlanes: number;
    numClipIntersection: number;

    dithering: boolean;

    shadowMapEnabled: boolean;
    shadowMapType: ShadowMapType;

    toneMapping: ToneMapping;
    useLegacyLights: boolean;

    decodeVideoTexture: boolean;

    premultipliedAlpha: boolean;

    doubleSided: boolean;
    flipSided: boolean;

    useDepthPacking: boolean;
    depthPacking: DepthPackingStrategies;

    index0AttributeName: string;

    extensionDerivatives: boolean;
    extensionFragDepth: boolean;
    extensionDrawBuffers: boolean;
    extensionShaderTextureLOD: boolean;
    extensionClipCullDistance: boolean;

    rendererExtensionFragDepth: boolean;
    rendererExtensionDrawBuffers: boolean;
    rendererExtensionShaderTextureLod: boolean;
    rendererExtensionParallelShaderCompile: boolean;

    customProgramCacheKey: string;
}

export class WebGLPrograms {
    constructor(
        renderer: WebGLRenderer,
        cubemaps: WebGLCubeMaps,
        extensions: WebGLExtensions,
        capabilities: WebGLCapabilities,
        bindingStates: WebGLBindingStates,
        clipping: WebGLClipping,
    );

    programs: WebGLProgram[];

    getParameters(
        material: Material,
        lights: WebGLLightsState,
        shadows: Light[],
        scene: Scene,
        object: Object3D,
    ): WebGLProgramParameters;

    getProgramCacheKey(parameters: WebGLProgramParameters): string;
    getUniforms(material: Material): { [uniform: string]: IUniform };
    acquireProgram(parameters: WebGLProgramParameters, cacheKey: string): WebGLProgram;
    releaseProgram(program: WebGLProgram): void;
}
