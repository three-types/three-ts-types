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
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | 
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
        OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
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
        clippingPlanes: Array<Plane> | null;
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
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | 
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
        OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
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
        clippingPlanes: Array<Plane> | null;
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
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | 
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
        OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
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
        clippingPlanes: Array<Plane> | null;
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
        blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | 
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
        OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
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
        clippingPlanes: Array<Plane> | null;
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
import { Mesh } from '../objects/Mesh.js';
import { Color } from '../math/Color.js';
import { Vector3 } from '../math/Vector3.js';
import { WebGLRenderTarget } from '../renderers/WebGLRenderTarget.js';
