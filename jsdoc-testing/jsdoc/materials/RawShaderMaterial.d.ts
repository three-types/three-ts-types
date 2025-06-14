declare const RawShaderMaterial_base: {
    new (parameters?: Object): {
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
        blendColor: import("../math/Color.js").Color;
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
        alphaTest: number;
        onBeforeRender(): void;
        onBeforeCompile(): void;
        customProgramCacheKey(): string;
        setValues(values?: Object): void;
        clone(): Material;
        dispose(): void;
        needsUpdate: boolean;
        addEventListener(type: string, listener: Function): void;
        _listeners: {} | undefined;
        hasEventListener(type: string, listener: Function): boolean;
        removeEventListener(type: string, listener: Function): void;
        dispatchEvent(event: Object): void;
    };
};
/**
 * This class works just like {@link ShaderMaterial}, except that definitions
 * of built-in uniforms and attributes are not automatically prepended to the
 * GLSL shader code.
 *
 * `RawShaderMaterial` can only be used with {@link WebGLRenderer}.
 *
 * @augments ShaderMaterial
 */
export class RawShaderMaterial extends RawShaderMaterial_base {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isRawShaderMaterial: boolean;
}
export {};
