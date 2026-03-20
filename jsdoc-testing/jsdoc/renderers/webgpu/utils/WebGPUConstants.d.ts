export namespace GPUPrimitiveTopology {
    let PointList: string;
    let LineList: string;
    let LineStrip: string;
    let TriangleList: string;
    let TriangleStrip: string;
}
export const GPUShaderStage: any;
export namespace GPUCompareFunction {
    let Never: string;
    let Less: string;
    let Equal: string;
    let LessEqual: string;
    let Greater: string;
    let NotEqual: string;
    let GreaterEqual: string;
    let Always: string;
}
export namespace GPUStoreOp {
    let Store: string;
    let Discard: string;
}
export namespace GPULoadOp {
    let Load: string;
    let Clear: string;
}
export namespace GPUFrontFace {
    let CCW: string;
    let CW: string;
}
export namespace GPUCullMode {
    let None: string;
    let Front: string;
    let Back: string;
}
export namespace GPUIndexFormat {
    let Uint16: string;
    let Uint32: string;
}
export namespace GPUVertexFormat {
    export let Uint8x2: string;
    export let Uint8x4: string;
    export let Sint8x2: string;
    export let Sint8x4: string;
    export let Unorm8x2: string;
    export let Unorm8x4: string;
    export let Snorm8x2: string;
    export let Snorm8x4: string;
    export let Uint16x2: string;
    export let Uint16x4: string;
    export let Sint16x2: string;
    export let Sint16x4: string;
    export let Unorm16x2: string;
    export let Unorm16x4: string;
    export let Snorm16x2: string;
    export let Snorm16x4: string;
    export let Float16x2: string;
    export let Float16x4: string;
    export let Float32: string;
    export let Float32x2: string;
    export let Float32x3: string;
    export let Float32x4: string;
    let Uint32_1: string;
    export { Uint32_1 as Uint32 };
    export let Uint32x2: string;
    export let Uint32x3: string;
    export let Uint32x4: string;
    export let Sint32: string;
    export let Sint32x2: string;
    export let Sint32x3: string;
    export let Sint32x4: string;
}
export namespace GPUTextureFormat {
    let R8Unorm: string;
    let R8Snorm: string;
    let R8Uint: string;
    let R8Sint: string;
    let R16Uint: string;
    let R16Sint: string;
    let R16Float: string;
    let RG8Unorm: string;
    let RG8Snorm: string;
    let RG8Uint: string;
    let RG8Sint: string;
    let R32Uint: string;
    let R32Sint: string;
    let R32Float: string;
    let RG16Uint: string;
    let RG16Sint: string;
    let RG16Float: string;
    let RGBA8Unorm: string;
    let RGBA8UnormSRGB: string;
    let RGBA8Snorm: string;
    let RGBA8Uint: string;
    let RGBA8Sint: string;
    let BGRA8Unorm: string;
    let BGRA8UnormSRGB: string;
    let RGB9E5UFloat: string;
    let RGB10A2Unorm: string;
    let RG11B10UFloat: string;
    let RG32Uint: string;
    let RG32Sint: string;
    let RG32Float: string;
    let RGBA16Uint: string;
    let RGBA16Sint: string;
    let RGBA16Float: string;
    let RGBA32Uint: string;
    let RGBA32Sint: string;
    let RGBA32Float: string;
    let Stencil8: string;
    let Depth16Unorm: string;
    let Depth24Plus: string;
    let Depth24PlusStencil8: string;
    let Depth32Float: string;
    let Depth32FloatStencil8: string;
    let BC1RGBAUnorm: string;
    let BC1RGBAUnormSRGB: string;
    let BC2RGBAUnorm: string;
    let BC2RGBAUnormSRGB: string;
    let BC3RGBAUnorm: string;
    let BC3RGBAUnormSRGB: string;
    let BC4RUnorm: string;
    let BC4RSnorm: string;
    let BC5RGUnorm: string;
    let BC5RGSnorm: string;
    let BC6HRGBUFloat: string;
    let BC6HRGBFloat: string;
    let BC7RGBAUnorm: string;
    let BC7RGBAUnormSRGB: string;
    let ETC2RGB8Unorm: string;
    let ETC2RGB8UnormSRGB: string;
    let ETC2RGB8A1Unorm: string;
    let ETC2RGB8A1UnormSRGB: string;
    let ETC2RGBA8Unorm: string;
    let ETC2RGBA8UnormSRGB: string;
    let EACR11Unorm: string;
    let EACR11Snorm: string;
    let EACRG11Unorm: string;
    let EACRG11Snorm: string;
    let ASTC4x4Unorm: string;
    let ASTC4x4UnormSRGB: string;
    let ASTC5x4Unorm: string;
    let ASTC5x4UnormSRGB: string;
    let ASTC5x5Unorm: string;
    let ASTC5x5UnormSRGB: string;
    let ASTC6x5Unorm: string;
    let ASTC6x5UnormSRGB: string;
    let ASTC6x6Unorm: string;
    let ASTC6x6UnormSRGB: string;
    let ASTC8x5Unorm: string;
    let ASTC8x5UnormSRGB: string;
    let ASTC8x6Unorm: string;
    let ASTC8x6UnormSRGB: string;
    let ASTC8x8Unorm: string;
    let ASTC8x8UnormSRGB: string;
    let ASTC10x5Unorm: string;
    let ASTC10x5UnormSRGB: string;
    let ASTC10x6Unorm: string;
    let ASTC10x6UnormSRGB: string;
    let ASTC10x8Unorm: string;
    let ASTC10x8UnormSRGB: string;
    let ASTC10x10Unorm: string;
    let ASTC10x10UnormSRGB: string;
    let ASTC12x10Unorm: string;
    let ASTC12x10UnormSRGB: string;
    let ASTC12x12Unorm: string;
    let ASTC12x12UnormSRGB: string;
}
export namespace GPUAddressMode {
    let ClampToEdge: string;
    let Repeat: string;
    let MirrorRepeat: string;
}
export namespace GPUFilterMode {
    let Linear: string;
    let Nearest: string;
}
export namespace GPUBlendFactor {
    let Zero: string;
    let One: string;
    let Src: string;
    let OneMinusSrc: string;
    let SrcAlpha: string;
    let OneMinusSrcAlpha: string;
    let Dst: string;
    let OneMinusDst: string;
    let DstAlpha: string;
    let OneMinusDstAlpha: string;
    let SrcAlphaSaturated: string;
    let Constant: string;
    let OneMinusConstant: string;
}
export namespace GPUBlendOperation {
    let Add: string;
    let Subtract: string;
    let ReverseSubtract: string;
    let Min: string;
    let Max: string;
}
export namespace GPUColorWriteFlags {
    let None_1: number;
    export { None_1 as None };
    export let Red: number;
    export let Green: number;
    export let Blue: number;
    export let Alpha: number;
    export let All: number;
}
export namespace GPUStencilOperation {
    export let Keep: string;
    let Zero_1: string;
    export { Zero_1 as Zero };
    export let Replace: string;
    export let Invert: string;
    export let IncrementClamp: string;
    export let DecrementClamp: string;
    export let IncrementWrap: string;
    export let DecrementWrap: string;
}
export namespace GPUBufferBindingType {
    let Uniform: string;
    let Storage: string;
    let ReadOnlyStorage: string;
}
export namespace GPUStorageTextureAccess {
    let WriteOnly: string;
    let ReadOnly: string;
    let ReadWrite: string;
}
export namespace GPUSamplerBindingType {
    let Filtering: string;
    let NonFiltering: string;
    let Comparison: string;
}
export namespace GPUTextureSampleType {
    let Float: string;
    let UnfilterableFloat: string;
    let Depth: string;
    let SInt: string;
    let UInt: string;
}
export namespace GPUTextureDimension {
    let OneD: string;
    let TwoD: string;
    let ThreeD: string;
}
export namespace GPUTextureViewDimension {
    let OneD_1: string;
    export { OneD_1 as OneD };
    let TwoD_1: string;
    export { TwoD_1 as TwoD };
    export let TwoDArray: string;
    export let Cube: string;
    export let CubeArray: string;
    let ThreeD_1: string;
    export { ThreeD_1 as ThreeD };
}
export namespace GPUTextureAspect {
    let All_1: string;
    export { All_1 as All };
    export let StencilOnly: string;
    export let DepthOnly: string;
}
export namespace GPUInputStepMode {
    let Vertex: string;
    let Instance: string;
}
export namespace GPUFeatureName {
    export let CoreFeaturesAndLimits: string;
    export let DepthClipControl: string;
    let Depth32FloatStencil8_1: string;
    export { Depth32FloatStencil8_1 as Depth32FloatStencil8 };
    export let TextureCompressionBC: string;
    export let TextureCompressionBCSliced3D: string;
    export let TextureCompressionETC2: string;
    export let TextureCompressionASTC: string;
    export let TextureCompressionASTCSliced3D: string;
    export let TimestampQuery: string;
    export let IndirectFirstInstance: string;
    export let ShaderF16: string;
    let RG11B10UFloat_1: string;
    export { RG11B10UFloat_1 as RG11B10UFloat };
    export let BGRA8UNormStorage: string;
    export let Float32Filterable: string;
    export let Float32Blendable: string;
    export let ClipDistances: string;
    export let DualSourceBlending: string;
    export let Subgroups: string;
    export let TextureFormatsTier1: string;
    export let TextureFormatsTier2: string;
}
export const GPUFeatureMap: {
    'texture-compression-s3tc': string;
    'texture-compression-etc1': string;
};
