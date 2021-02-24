import {
    Color,
    MeshNormalMaterial,
    MeshBasicMaterial,
    ShaderMaterial,
    WebGLRenderTarget,
    Scene,
    WebGLRenderer,
    Camera,
    TextureEncoding,
    Mesh,
    Material,
} from '../../../src/Three';
import { Pass } from '../postprocessing/Pass';
import { SSRShader } from '../shaders/SSRShader';
import { Reflector } from '../objects/ReflectorForSSRPass';

interface SSRPassParams {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;
    width?: number;
    height?: number;
    selects: Mesh[] | null;
    encoding: TextureEncoding;
    isPerspectiveCamera?: boolean;
    isBouncing?: boolean;
    morphTargets?: boolean;
    groundReflector: Reflector | null;
}

export class SSRPass extends Pass {
    width: number;
    height: number;
    clear: boolean;
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;
    groundReflector: Reflector;
    opacity: SSRShader['uniforms']['opacity']['value'];
    output: number;
    maxDistance: SSRShader['uniforms']['maxDistance']['value'];
    surfDist: SSRShader['uniforms']['surfDist']['value'];
    encoding: TextureEncoding;
    tempColor: Color;

    _selects: Mesh[] | null;
    isSelective: boolean;
    _isBouncing: boolean;
    isBlur: boolean;
    _isDistanceAttenuation: SSRShader['defines']['isDistanceAttenuation'];
    _isFresnel: SSRShader['defines']['isFresnel'];
    _isInfiniteThick: SSRShader['defines']['isInfiniteThick'];
    thickTolerance: SSRShader['uniforms']['thickTolerance']['value'];

    beautyRenderTarget: WebGLRenderTarget;
    prevRenderTarget: WebGLRenderTarget;
    normalRenderTarget: WebGLRenderTarget;
    metalnessRenderTarget: WebGLRenderTarget;
    ssrRenderTarget: WebGLRenderTarget;

    blurRenderTarget: WebGLRenderTarget;
    blurRenderTarget2: WebGLRenderTarget;

    ssrMaterial: ShaderMaterial;

    normalMaterial: MeshNormalMaterial;

    metalnessOnMaterial: MeshBasicMaterial;

    metalnessOffMaterial: MeshBasicMaterial;

    blurMaterial: ShaderMaterial;
    blurMaterial2: ShaderMaterial;

    depthRenderMaterial: ShaderMaterial;

    copyMaterial: ShaderMaterial;

    fsQuad: Pass.FullScreenQuad;

    originalClearColor: Color;

    OUTPUT: {
        Default: 0;
        SSR: 1;
        Beauty: 3;
        Depth: 4;
        Normal: 5;
        Metalness: 7;
    };

    constructor(params: SSRPassParams);

    dispose: () => void;

    renderPass: <TMaterial extends Material = Material>(
        renderer: WebGLRenderer,
        passMaterial: TMaterial,
        renderTarget: WebGLRenderTarget,
        clearColor: Color | string | number,
        clearAlpha: Color | string | number,
    ) => void;

    renderOverride: <TMaterial extends Material = Material>(
        renderer: WebGLRenderer,
        passMaterial: TMaterial,
        renderTarget: WebGLRenderTarget,
        clearColor: Color | string | number,
        clearAlpha: Color | string | number,
    ) => void;

    renderMetalness: <TMaterial extends Material = Material>(
        renderer: WebGLRenderer,
        passMaterial: TMaterial,
        renderTarget: WebGLRenderTarget,
        clearColor: Color | string | number,
        clearAlpha: Color | string | number,
    ) => void;
}
