/**
 * Generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) for
 * image-based lighting. The result is a cube render target whose mip levels
 * store GGX-filtered radiance at increasing roughness, from a mirror at level 0
 * to roughness 1. See {@link PMREMGenerator.lodToRoughness} for the mapping.
 *
 * Filtering assumes the view direction equals the surface normal. Sharp levels
 * use GGX visible normal sampling (Heitz, 2018), while rough levels integrate a
 * lower-resolution source cubemap.
 *
 * @see {@link https://jcgt.org/published/0007/04/01/ | Sampling the GGX Distribution of Visible Normals}
 */
export class PMREMGenerator {
    /**
     * Returns the roughness a mip level of a PMREM has been prefiltered for.
     * The inverse mapping is used by the renderers when sampling a PMREM.
     *
     * @param {number} lod - The mip level.
     * @param {number} maxLod - The last mip level of the PMREM.
     * @return {number} The roughness.
     */
    static lodToRoughness(lod: number, maxLod: number): number;
    /**
     * Constructs a new PMREM generator.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    constructor(renderer: WebGLRenderer);
    _renderer: WebGLRenderer;
    _cubeSize: number;
    _sourceTarget: any;
    _cubeCamera: CubeCamera;
    _boxMesh: Mesh;
    _cubemapMaterial: {
        readonly isShaderMaterial: boolean;
        type: string;
        defines: Object;
        uniforms: Object;
        uniformsGroups: Array<UniformsGroup>;
        vertexShader: string;
        fragmentShader: string;
        linewidth: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        fog: boolean;
        lights: boolean;
        clipping: boolean;
        forceSinglePass: boolean;
        extensions: {
            clipCullDistance: false;
            multiDraw: false;
        };
        defaultAttributeValues: Object;
        index0AttributeName: string | undefined;
        uniformsNeedUpdate: boolean;
        glslVersion: (GLSL1 | GLSL3) | null;
        copy(source: any): /*elided*/ any;
        toJSON(meta: any): Object;
        fromJSON(json: Object, textures: {
            [x: string]: Texture;
        }): /*elided*/ any;
        readonly isMaterial: boolean;
        readonly uuid: string;
        name: string;
        blending: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending);
        side: (number | BackSide | DoubleSide);
        vertexColors: boolean;
        opacity: number;
        transparent: boolean;
        alphaHash: boolean;
        blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
        blendColor: Color;
        blendAlpha: number;
        depthFunc: (NeverDepth | AlwaysDepth | LessDepth | number | EqualDepth | GreaterEqualDepth | GreaterDepth | NotEqualDepth);
        depthTest: boolean;
        depthWrite: boolean;
        stencilWriteMask: number;
        stencilFunc: NeverStencilFunc | LessStencilFunc | EqualStencilFunc | LessEqualStencilFunc | GreaterStencilFunc | NotEqualStencilFunc | GreaterEqualStencilFunc | number;
        stencilRef: number;
        stencilFuncMask: number;
        stencilFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZPass: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilWrite: boolean;
        clippingPlanes: Array<import("../Three.Core.js").Plane> | null;
        clipIntersection: boolean;
        clipShadows: boolean;
        shadowSide: (number | BackSide | DoubleSide) | null;
        colorWrite: boolean;
        precision: ("highp" | "mediump" | "lowp") | null;
        polygonOffset: boolean;
        polygonOffsetFactor: number;
        polygonOffsetUnits: number;
        dithering: boolean;
        alphaToCoverage: boolean;
        premultipliedAlpha: boolean;
        allowOverride: boolean;
        visible: boolean;
        toneMapped: boolean;
        userData: Object;
        readonly version: number;
        _alphaTest: number;
        get alphaTest(): number;
        set alphaTest(value: number);
        onBeforeRender(): void;
        onBeforeCompile(): void;
        customProgramCacheKey(): string;
        setValues(values?: Object): void;
        clone(): Material;
        dispose(): void;
        set needsUpdate(value: boolean);
        addEventListener(type: string, listener: Function): void;
        _listeners: {} | undefined;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: Object): void;
    } | null;
    _equirectMaterial: {
        readonly isShaderMaterial: boolean;
        type: string;
        defines: Object;
        uniforms: Object;
        uniformsGroups: Array<UniformsGroup>;
        vertexShader: string;
        fragmentShader: string;
        linewidth: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        fog: boolean;
        lights: boolean;
        clipping: boolean;
        forceSinglePass: boolean;
        extensions: {
            clipCullDistance: false;
            multiDraw: false;
        };
        defaultAttributeValues: Object;
        index0AttributeName: string | undefined;
        uniformsNeedUpdate: boolean;
        glslVersion: (GLSL1 | GLSL3) | null;
        copy(source: any): /*elided*/ any;
        toJSON(meta: any): Object;
        fromJSON(json: Object, textures: {
            [x: string]: Texture;
        }): /*elided*/ any;
        readonly isMaterial: boolean;
        readonly uuid: string;
        name: string;
        blending: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending);
        side: (number | BackSide | DoubleSide);
        vertexColors: boolean;
        opacity: number;
        transparent: boolean;
        alphaHash: boolean;
        blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
        blendColor: Color;
        blendAlpha: number;
        depthFunc: (NeverDepth | AlwaysDepth | LessDepth | number | EqualDepth | GreaterEqualDepth | GreaterDepth | NotEqualDepth);
        depthTest: boolean;
        depthWrite: boolean;
        stencilWriteMask: number;
        stencilFunc: NeverStencilFunc | LessStencilFunc | EqualStencilFunc | LessEqualStencilFunc | GreaterStencilFunc | NotEqualStencilFunc | GreaterEqualStencilFunc | number;
        stencilRef: number;
        stencilFuncMask: number;
        stencilFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZPass: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilWrite: boolean;
        clippingPlanes: Array<import("../Three.Core.js").Plane> | null;
        clipIntersection: boolean;
        clipShadows: boolean;
        shadowSide: (number | BackSide | DoubleSide) | null;
        colorWrite: boolean;
        precision: ("highp" | "mediump" | "lowp") | null;
        polygonOffset: boolean;
        polygonOffsetFactor: number;
        polygonOffsetUnits: number;
        dithering: boolean;
        alphaToCoverage: boolean;
        premultipliedAlpha: boolean;
        allowOverride: boolean;
        visible: boolean;
        toneMapped: boolean;
        userData: Object;
        readonly version: number;
        _alphaTest: number;
        get alphaTest(): number;
        set alphaTest(value: number);
        onBeforeRender(): void;
        onBeforeCompile(): void;
        customProgramCacheKey(): string;
        setValues(values?: Object): void;
        clone(): Material;
        dispose(): void;
        set needsUpdate(value: boolean);
        addEventListener(type: string, listener: Function): void;
        _listeners: {} | undefined;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: Object): void;
    } | null;
    _blurMaterial: {
        readonly isShaderMaterial: boolean;
        type: string;
        defines: Object;
        uniforms: Object;
        uniformsGroups: Array<UniformsGroup>;
        vertexShader: string;
        fragmentShader: string;
        linewidth: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        fog: boolean;
        lights: boolean;
        clipping: boolean;
        forceSinglePass: boolean;
        extensions: {
            clipCullDistance: false;
            multiDraw: false;
        };
        defaultAttributeValues: Object;
        index0AttributeName: string | undefined;
        uniformsNeedUpdate: boolean;
        glslVersion: (GLSL1 | GLSL3) | null;
        copy(source: any): /*elided*/ any;
        toJSON(meta: any): Object;
        fromJSON(json: Object, textures: {
            [x: string]: Texture;
        }): /*elided*/ any;
        readonly isMaterial: boolean;
        readonly uuid: string;
        name: string;
        blending: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending);
        side: (number | BackSide | DoubleSide);
        vertexColors: boolean;
        opacity: number;
        transparent: boolean;
        alphaHash: boolean;
        blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
        blendColor: Color;
        blendAlpha: number;
        depthFunc: (NeverDepth | AlwaysDepth | LessDepth | number | EqualDepth | GreaterEqualDepth | GreaterDepth | NotEqualDepth);
        depthTest: boolean;
        depthWrite: boolean;
        stencilWriteMask: number;
        stencilFunc: NeverStencilFunc | LessStencilFunc | EqualStencilFunc | LessEqualStencilFunc | GreaterStencilFunc | NotEqualStencilFunc | GreaterEqualStencilFunc | number;
        stencilRef: number;
        stencilFuncMask: number;
        stencilFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZPass: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilWrite: boolean;
        clippingPlanes: Array<import("../Three.Core.js").Plane> | null;
        clipIntersection: boolean;
        clipShadows: boolean;
        shadowSide: (number | BackSide | DoubleSide) | null;
        colorWrite: boolean;
        precision: ("highp" | "mediump" | "lowp") | null;
        polygonOffset: boolean;
        polygonOffsetFactor: number;
        polygonOffsetUnits: number;
        dithering: boolean;
        alphaToCoverage: boolean;
        premultipliedAlpha: boolean;
        allowOverride: boolean;
        visible: boolean;
        toneMapped: boolean;
        userData: Object;
        readonly version: number;
        _alphaTest: number;
        get alphaTest(): number;
        set alphaTest(value: number);
        onBeforeRender(): void;
        onBeforeCompile(): void;
        customProgramCacheKey(): string;
        setValues(values?: Object): void;
        clone(): Material;
        dispose(): void;
        set needsUpdate(value: boolean);
        addEventListener(type: string, listener: Function): void;
        _listeners: {} | undefined;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: Object): void;
    } | null;
    _ggxMaterial: {
        readonly isShaderMaterial: boolean;
        type: string;
        defines: Object;
        uniforms: Object;
        uniformsGroups: Array<UniformsGroup>;
        vertexShader: string;
        fragmentShader: string;
        linewidth: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        fog: boolean;
        lights: boolean;
        clipping: boolean;
        forceSinglePass: boolean;
        extensions: {
            clipCullDistance: false;
            multiDraw: false;
        };
        defaultAttributeValues: Object;
        index0AttributeName: string | undefined;
        uniformsNeedUpdate: boolean;
        glslVersion: (GLSL1 | GLSL3) | null;
        copy(source: any): /*elided*/ any;
        toJSON(meta: any): Object;
        fromJSON(json: Object, textures: {
            [x: string]: Texture;
        }): /*elided*/ any;
        readonly isMaterial: boolean;
        readonly uuid: string;
        name: string;
        blending: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending);
        side: (number | BackSide | DoubleSide);
        vertexColors: boolean;
        opacity: number;
        transparent: boolean;
        alphaHash: boolean;
        blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
        blendColor: Color;
        blendAlpha: number;
        depthFunc: (NeverDepth | AlwaysDepth | LessDepth | number | EqualDepth | GreaterEqualDepth | GreaterDepth | NotEqualDepth);
        depthTest: boolean;
        depthWrite: boolean;
        stencilWriteMask: number;
        stencilFunc: NeverStencilFunc | LessStencilFunc | EqualStencilFunc | LessEqualStencilFunc | GreaterStencilFunc | NotEqualStencilFunc | GreaterEqualStencilFunc | number;
        stencilRef: number;
        stencilFuncMask: number;
        stencilFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZPass: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilWrite: boolean;
        clippingPlanes: Array<import("../Three.Core.js").Plane> | null;
        clipIntersection: boolean;
        clipShadows: boolean;
        shadowSide: (number | BackSide | DoubleSide) | null;
        colorWrite: boolean;
        precision: ("highp" | "mediump" | "lowp") | null;
        polygonOffset: boolean;
        polygonOffsetFactor: number;
        polygonOffsetUnits: number;
        dithering: boolean;
        alphaToCoverage: boolean;
        premultipliedAlpha: boolean;
        allowOverride: boolean;
        visible: boolean;
        toneMapped: boolean;
        userData: Object;
        readonly version: number;
        _alphaTest: number;
        get alphaTest(): number;
        set alphaTest(value: number);
        onBeforeRender(): void;
        onBeforeCompile(): void;
        customProgramCacheKey(): string;
        setValues(values?: Object): void;
        clone(): Material;
        dispose(): void;
        set needsUpdate(value: boolean);
        addEventListener(type: string, listener: Function): void;
        _listeners: {} | undefined;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: Object): void;
    } | null;
    _integrationMaterial: {
        readonly isShaderMaterial: boolean;
        type: string;
        defines: Object;
        uniforms: Object;
        uniformsGroups: Array<UniformsGroup>;
        vertexShader: string;
        fragmentShader: string;
        linewidth: number;
        wireframe: boolean;
        wireframeLinewidth: number;
        fog: boolean;
        lights: boolean;
        clipping: boolean;
        forceSinglePass: boolean;
        extensions: {
            clipCullDistance: false;
            multiDraw: false;
        };
        defaultAttributeValues: Object;
        index0AttributeName: string | undefined;
        uniformsNeedUpdate: boolean;
        glslVersion: (GLSL1 | GLSL3) | null;
        copy(source: any): /*elided*/ any;
        toJSON(meta: any): Object;
        fromJSON(json: Object, textures: {
            [x: string]: Texture;
        }): /*elided*/ any;
        readonly isMaterial: boolean;
        readonly uuid: string;
        name: string;
        blending: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending);
        side: (number | BackSide | DoubleSide);
        vertexColors: boolean;
        opacity: number;
        transparent: boolean;
        alphaHash: boolean;
        blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
        blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
        blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
        blendColor: Color;
        blendAlpha: number;
        depthFunc: (NeverDepth | AlwaysDepth | LessDepth | number | EqualDepth | GreaterEqualDepth | GreaterDepth | NotEqualDepth);
        depthTest: boolean;
        depthWrite: boolean;
        stencilWriteMask: number;
        stencilFunc: NeverStencilFunc | LessStencilFunc | EqualStencilFunc | LessEqualStencilFunc | GreaterStencilFunc | NotEqualStencilFunc | GreaterEqualStencilFunc | number;
        stencilRef: number;
        stencilFuncMask: number;
        stencilFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZFail: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilZPass: ZeroStencilOp | number | ReplaceStencilOp | IncrementStencilOp | DecrementStencilOp | IncrementWrapStencilOp | DecrementWrapStencilOp | InvertStencilOp;
        stencilWrite: boolean;
        clippingPlanes: Array<import("../Three.Core.js").Plane> | null;
        clipIntersection: boolean;
        clipShadows: boolean;
        shadowSide: (number | BackSide | DoubleSide) | null;
        colorWrite: boolean;
        precision: ("highp" | "mediump" | "lowp") | null;
        polygonOffset: boolean;
        polygonOffsetFactor: number;
        polygonOffsetUnits: number;
        dithering: boolean;
        alphaToCoverage: boolean;
        premultipliedAlpha: boolean;
        allowOverride: boolean;
        visible: boolean;
        toneMapped: boolean;
        userData: Object;
        readonly version: number;
        _alphaTest: number;
        get alphaTest(): number;
        set alphaTest(value: number);
        onBeforeRender(): void;
        onBeforeCompile(): void;
        customProgramCacheKey(): string;
        setValues(values?: Object): void;
        clone(): Material;
        dispose(): void;
        set needsUpdate(value: boolean);
        addEventListener(type: string, listener: Function): void;
        _listeners: {} | undefined;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: Object): void;
    } | null;
    /**
     * Generates a PMREM from a scene, optionally applying a Gaussian blur before
     * GGX filtering.
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM, rounded down to a power of two and at least 256.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @return {WebGLCubeRenderTarget} The resulting PMREM.
     */
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
    }): WebGLCubeRenderTarget;
    /**
     * Generates a PMREM from an LDR or HDR equirectangular texture. The cube face
     * size is one quarter of the image width, rounded down to a power of two and
     * at least 256.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?WebGLCubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {WebGLCubeRenderTarget} The resulting PMREM.
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: WebGLCubeRenderTarget | null): WebGLCubeRenderTarget;
    /**
     * Generates a PMREM from an LDR or HDR cubemap. The cube face size matches
     * the input, rounded down to a power of two and at least 256.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?WebGLCubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {WebGLCubeRenderTarget} The resulting PMREM.
     */
    fromCubemap(cubemap: Texture, renderTarget?: WebGLCubeRenderTarget | null): WebGLCubeRenderTarget;
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
     * Disposes of the PMREMGenerator's internal memory. The PMREMs it returned
     * belong to the caller and are not disposed.
     */
    dispose(): void;
    _setSize(cubeSize: any): void;
    _fromTexture(texture: any, renderTarget: any): any;
    _allocateTarget(): WebGLCubeRenderTarget;
    _getSourceTarget(depthBuffer?: boolean): WebGLCubeRenderTarget | null;
    _compileMaterial(material: any): void;
    /**
     * Renders the box mesh with the given material into all six faces of a cube render target.
     *
     * @private
     * @param {WebGLCubeRenderTarget} target - The render target.
     * @param {number} lod - The mip level to render into.
     * @param {ShaderMaterial} material - The material.
     */
    private _renderCube;
    _textureToCubemap(texture: any): void;
    /**
     * Prefilters the source cubemap into the mip levels of the PMREM. The sharp levels
     * integrate the GGX lobe of their roughness with VNDF importance sampling, reading the
     * mip level of the source that matches the solid angle of each sample. The rough
     * levels weight every texel of a small source mip with the GGX lobe instead.
     *
     * @private
     * @param {WebGLCubeRenderTarget} pmremTarget - The PMREM.
     */
    private _applyPMREM;
    /**
     * Applies the initial fromScene() blur in two passes using a golden-angle
     * spiral kernel. Level 0 of the PMREM serves as the intermediate target.
     *
     * @private
     * @param {WebGLCubeRenderTarget} pmremTarget - The PMREM.
     * @param {number} sigma - The blur radius in radians.
     */
    private _blur;
}
import { CubeCamera } from '../cameras/CubeCamera.js';
import { Mesh } from '../objects/Mesh.js';
import { Color } from '../math/Color.js';
import { Vector3 } from '../math/Vector3.js';
import { WebGLCubeRenderTarget } from '../renderers/WebGLCubeRenderTarget.js';
