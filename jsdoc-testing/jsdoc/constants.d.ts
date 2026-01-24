export const REVISION: "183dev";
/**
 * Represents mouse buttons and interaction types in context of controls.
 *
 * @type {ConstantsMouse}
 * @constant
 */
export const MOUSE: ConstantsMouse;
/**
 * Represents touch interaction types in context of controls.
 *
 * @type {ConstantsTouch}
 * @constant
 */
export const TOUCH: ConstantsTouch;
/**
 * Disables face culling.
 *
 * @type {number}
 * @constant
 */
export const CullFaceNone: number;
/**
 * Culls back faces.
 *
 * @type {number}
 * @constant
 */
export const CullFaceBack: number;
/**
 * Culls front faces.
 *
 * @type {number}
 * @constant
 */
export const CullFaceFront: number;
/**
 * Culls both front and back faces.
 *
 * @type {number}
 * @constant
 */
export const CullFaceFrontBack: number;
/**
 * Gives unfiltered shadow maps - fastest, but lowest quality.
 *
 * @type {number}
 * @constant
 */
export const BasicShadowMap: number;
/**
 * Filters shadow maps using the Percentage-Closer Filtering (PCF) algorithm.
 *
 * @type {number}
 * @constant
 */
export const PCFShadowMap: number;
/**
 * Filters shadow maps using the Percentage-Closer Filtering (PCF) algorithm with
 * better soft shadows especially when using low-resolution shadow maps.
 *
 * @type {number}
 * @constant
 */
export const PCFSoftShadowMap: number;
/**
 * Filters shadow maps using the Variance Shadow Map (VSM) algorithm.
 * When using VSMShadowMap all shadow receivers will also cast shadows.
 *
 * @type {number}
 * @constant
 */
export const VSMShadowMap: number;
/**
 * Only front faces are rendered.
 *
 * @type {number}
 * @constant
 */
export const FrontSide: number;
/**
 * Only back faces are rendered.
 *
 * @type {number}
 * @constant
 */
export const BackSide: number;
/**
 * Both front and back faces are rendered.
 *
 * @type {number}
 * @constant
 */
export const DoubleSide: number;
/**
 * No blending is performed which effectively disables
 * alpha transparency.
 *
 * @type {number}
 * @constant
 */
export const NoBlending: number;
/**
 * The default blending.
 *
 * @type {number}
 * @constant
 */
export const NormalBlending: number;
/**
 * Represents additive blending.
 *
 * @type {number}
 * @constant
 */
export const AdditiveBlending: number;
/**
 * Represents subtractive blending.
 *
 * @type {number}
 * @constant
 */
export const SubtractiveBlending: number;
/**
 * Represents multiply blending.
 *
 * @type {number}
 * @constant
 */
export const MultiplyBlending: number;
/**
 * Represents custom blending.
 *
 * @type {number}
 * @constant
 */
export const CustomBlending: number;
/**
 * Represents material blending.
 *
 * @type {number}
 * @constant
 */
export const MaterialBlending: number;
/**
 * A `source + destination` blending equation.
 *
 * @type {number}
 * @constant
 */
export const AddEquation: number;
/**
 * A `source - destination` blending equation.
 *
 * @type {number}
 * @constant
 */
export const SubtractEquation: number;
/**
 * A `destination - source` blending equation.
 *
 * @type {number}
 * @constant
 */
export const ReverseSubtractEquation: number;
/**
 * A blend equation that uses the minimum of source and destination.
 *
 * @type {number}
 * @constant
 */
export const MinEquation: number;
/**
 * A blend equation that uses the maximum of source and destination.
 *
 * @type {number}
 * @constant
 */
export const MaxEquation: number;
/**
 * Multiplies all colors by `0`.
 *
 * @type {number}
 * @constant
 */
export const ZeroFactor: number;
/**
 * Multiplies all colors by `1`.
 *
 * @type {number}
 * @constant
 */
export const OneFactor: number;
/**
 * Multiplies all colors by the source colors.
 *
 * @type {number}
 * @constant
 */
export const SrcColorFactor: number;
/**
 * Multiplies all colors by `1` minus each source color.
 *
 * @type {number}
 * @constant
 */
export const OneMinusSrcColorFactor: number;
/**
 * Multiplies all colors by the source alpha value.
 *
 * @type {number}
 * @constant
 */
export const SrcAlphaFactor: number;
/**
 * Multiplies all colors by 1 minus the source alpha value.
 *
 * @type {number}
 * @constant
 */
export const OneMinusSrcAlphaFactor: number;
/**
 * Multiplies all colors by the destination alpha value.
 *
 * @type {number}
 * @constant
 */
export const DstAlphaFactor: number;
/**
 * Multiplies all colors by `1` minus the destination alpha value.
 *
 * @type {number}
 * @constant
 */
export const OneMinusDstAlphaFactor: number;
/**
 * Multiplies all colors by the destination color.
 *
 * @type {number}
 * @constant
 */
export const DstColorFactor: number;
/**
 * Multiplies all colors by `1` minus each destination color.
 *
 * @type {number}
 * @constant
 */
export const OneMinusDstColorFactor: number;
/**
 * Multiplies the RGB colors by the smaller of either the source alpha
 * value or the value of `1` minus the destination alpha value. The alpha
 * value is multiplied by `1`.
 *
 * @type {number}
 * @constant
 */
export const SrcAlphaSaturateFactor: number;
/**
 * Multiplies all colors by a constant color.
 *
 * @type {number}
 * @constant
 */
export const ConstantColorFactor: number;
/**
 * Multiplies all colors by `1` minus a constant color.
 *
 * @type {number}
 * @constant
 */
export const OneMinusConstantColorFactor: number;
/**
 * Multiplies all colors by a constant alpha value.
 *
 * @type {number}
 * @constant
 */
export const ConstantAlphaFactor: number;
/**
 * Multiplies all colors by 1 minus a constant alpha value.
 *
 * @type {number}
 * @constant
 */
export const OneMinusConstantAlphaFactor: number;
/**
 * Never pass.
 *
 * @type {number}
 * @constant
 */
export const NeverDepth: number;
/**
 * Always pass.
 *
 * @type {number}
 * @constant
 */
export const AlwaysDepth: number;
/**
 * Pass if the incoming value is less than the depth buffer value.
 *
 * @type {number}
 * @constant
 */
export const LessDepth: number;
/**
 * Pass if the incoming value is less than or equal to the depth buffer value.
 *
 * @type {number}
 * @constant
 */
export const LessEqualDepth: number;
/**
 * Pass if the incoming value equals the depth buffer value.
 *
 * @type {number}
 * @constant
 */
export const EqualDepth: number;
/**
 * Pass if the incoming value is greater than or equal to the depth buffer value.
 *
 * @type {number}
 * @constant
 */
export const GreaterEqualDepth: number;
/**
 * Pass if the incoming value is greater than the depth buffer value.
 *
 * @type {number}
 * @constant
 */
export const GreaterDepth: number;
/**
 * Pass if the incoming value is not equal to the depth buffer value.
 *
 * @type {number}
 * @constant
 */
export const NotEqualDepth: number;
/**
 * Multiplies the environment map color with the surface color.
 *
 * @type {number}
 * @constant
 */
export const MultiplyOperation: number;
/**
 * Uses reflectivity to blend between the two colors.
 *
 * @type {number}
 * @constant
 */
export const MixOperation: number;
/**
 * Adds the two colors.
 *
 * @type {number}
 * @constant
 */
export const AddOperation: number;
/**
 * No tone mapping is applied.
 *
 * @type {number}
 * @constant
 */
export const NoToneMapping: number;
/**
 * Linear tone mapping.
 *
 * @type {number}
 * @constant
 */
export const LinearToneMapping: number;
/**
 * Reinhard tone mapping.
 *
 * @type {number}
 * @constant
 */
export const ReinhardToneMapping: number;
/**
 * Cineon tone mapping.
 *
 * @type {number}
 * @constant
 */
export const CineonToneMapping: number;
/**
 * ACES Filmic tone mapping.
 *
 * @type {number}
 * @constant
 */
export const ACESFilmicToneMapping: number;
/**
 * Custom tone mapping.
 *
 * Expects a custom implementation by modifying shader code of the material's fragment shader.
 *
 * @type {number}
 * @constant
 */
export const CustomToneMapping: number;
/**
 * AgX tone mapping.
 *
 * @type {number}
 * @constant
 */
export const AgXToneMapping: number;
/**
 * Neutral tone mapping.
 *
 * Implementation based on the Khronos 3D Commerce Group standard tone mapping.
 *
 * @type {number}
 * @constant
 */
export const NeutralToneMapping: number;
/**
 * The skinned mesh shares the same world space as the skeleton.
 *
 * @type {string}
 * @constant
 */
export const AttachedBindMode: string;
/**
 * The skinned mesh does not share the same world space as the skeleton.
 * This is useful when a skeleton is shared across multiple skinned meshes.
 *
 * @type {string}
 * @constant
 */
export const DetachedBindMode: string;
/**
 * Maps textures using the geometry's UV coordinates.
 *
 * @type {number}
 * @constant
 */
export const UVMapping: number;
/**
 * Reflection mapping for cube textures.
 *
 * @type {number}
 * @constant
 */
export const CubeReflectionMapping: number;
/**
 * Refraction mapping for cube textures.
 *
 * @type {number}
 * @constant
 */
export const CubeRefractionMapping: number;
/**
 * Reflection mapping for equirectangular textures.
 *
 * @type {number}
 * @constant
 */
export const EquirectangularReflectionMapping: number;
/**
 * Refraction mapping for equirectangular textures.
 *
 * @type {number}
 * @constant
 */
export const EquirectangularRefractionMapping: number;
/**
 * Reflection mapping for PMREM textures.
 *
 * @type {number}
 * @constant
 */
export const CubeUVReflectionMapping: number;
/**
 * The texture will simply repeat to infinity.
 *
 * @type {number}
 * @constant
 */
export const RepeatWrapping: number;
/**
 * The last pixel of the texture stretches to the edge of the mesh.
 *
 * @type {number}
 * @constant
 */
export const ClampToEdgeWrapping: number;
/**
 * The texture will repeats to infinity, mirroring on each repeat.
 *
 * @type {number}
 * @constant
 */
export const MirroredRepeatWrapping: number;
/**
 * Returns the value of the texture element that is nearest (in Manhattan distance)
 * to the specified texture coordinates.
 *
 * @type {number}
 * @constant
 */
export const NearestFilter: number;
/**
 * Chooses the mipmap that most closely matches the size of the pixel being textured
 * and uses the `NearestFilter` criterion (the texel nearest to the center of the pixel)
 * to produce a texture value.
 *
 * @type {number}
 * @constant
 */
export const NearestMipmapNearestFilter: number;
export const NearestMipMapNearestFilter: 1004;
/**
 * Chooses the two mipmaps that most closely match the size of the pixel being textured and
 * uses the `NearestFilter` criterion to produce a texture value from each mipmap.
 * The final texture value is a weighted average of those two values.
 *
 * @type {number}
 * @constant
 */
export const NearestMipmapLinearFilter: number;
export const NearestMipMapLinearFilter: 1005;
/**
 * Returns the weighted average of the four texture elements that are closest to the specified
 * texture coordinates, and can include items wrapped or repeated from other parts of a texture,
 * depending on the values of `wrapS` and `wrapT`, and on the exact mapping.
 *
 * @type {number}
 * @constant
 */
export const LinearFilter: number;
/**
 * Chooses the mipmap that most closely matches the size of the pixel being textured and uses
 * the `LinearFilter` criterion (a weighted average of the four texels that are closest to the
 * center of the pixel) to produce a texture value.
 *
 * @type {number}
 * @constant
 */
export const LinearMipmapNearestFilter: number;
export const LinearMipMapNearestFilter: 1007;
/**
 * Chooses the two mipmaps that most closely match the size of the pixel being textured and uses
 * the `LinearFilter` criterion to produce a texture value from each mipmap. The final texture value
 * is a weighted average of those two values.
 *
 * @type {number}
 * @constant
 */
export const LinearMipmapLinearFilter: number;
export const LinearMipMapLinearFilter: 1008;
/**
 * An unsigned byte data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedByteType: number;
/**
 * A byte data type for textures.
 *
 * @type {number}
 * @constant
 */
export const ByteType: number;
/**
 * A short data type for textures.
 *
 * @type {number}
 * @constant
 */
export const ShortType: number;
/**
 * An unsigned short data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedShortType: number;
/**
 * An int data type for textures.
 *
 * @type {number}
 * @constant
 */
export const IntType: number;
/**
 * An unsigned int data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedIntType: number;
/**
 * A float data type for textures.
 *
 * @type {number}
 * @constant
 */
export const FloatType: number;
/**
 * A half float data type for textures.
 *
 * @type {number}
 * @constant
 */
export const HalfFloatType: number;
/**
 * An unsigned short 4_4_4_4 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedShort4444Type: number;
/**
 * An unsigned short 5_5_5_1 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedShort5551Type: number;
/**
 * An unsigned int 24_8 data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedInt248Type: number;
/**
 * An unsigned int 5_9_9_9 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedInt5999Type: number;
/**
 * An unsigned int 10_11_11 (packed) data type for textures.
 *
 * @type {number}
 * @constant
 */
export const UnsignedInt101111Type: number;
/**
 * Discards the red, green and blue components and reads just the alpha component.
 *
 * @type {number}
 * @constant
 */
export const AlphaFormat: number;
/**
 * Discards the alpha component and reads the red, green and blue component.
 *
 * @type {number}
 * @constant
 */
export const RGBFormat: number;
/**
 * Reads the red, green, blue and alpha components.
 *
 * @type {number}
 * @constant
 */
export const RGBAFormat: number;
/**
 * Reads each element as a single depth value, converts it to floating point, and clamps to the range `[0,1]`.
 *
 * @type {number}
 * @constant
 */
export const DepthFormat: number;
/**
 * Reads each element is a pair of depth and stencil values. The depth component of the pair is interpreted as
 * in `DepthFormat`. The stencil component is interpreted based on the depth + stencil internal format.
 *
 * @type {number}
 * @constant
 */
export const DepthStencilFormat: number;
/**
 * Discards the green, blue and alpha components and reads just the red component.
 *
 * @type {number}
 * @constant
 */
export const RedFormat: number;
/**
 * Discards the green, blue and alpha components and reads just the red component. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
export const RedIntegerFormat: number;
/**
 * Discards the alpha, and blue components and reads the red, and green components.
 *
 * @type {number}
 * @constant
 */
export const RGFormat: number;
/**
 * Discards the alpha, and blue components and reads the red, and green components. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
export const RGIntegerFormat: number;
/**
 * Discards the alpha component and reads the red, green and blue component. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
export const RGBIntegerFormat: number;
/**
 * Reads the red, green, blue and alpha components. The texels are read as integers instead of floating point.
 *
 * @type {number}
 * @constant
 */
export const RGBAIntegerFormat: number;
/**
 * A DXT1-compressed image in an RGB image format.
 *
 * @type {number}
 * @constant
 */
export const RGB_S3TC_DXT1_Format: number;
/**
 * A DXT1-compressed image in an RGB image format with a simple on/off alpha value.
 *
 * @type {number}
 * @constant
 */
export const RGBA_S3TC_DXT1_Format: number;
/**
 * A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression.
 *
 * @type {number}
 * @constant
 */
export const RGBA_S3TC_DXT3_Format: number;
/**
 * A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3
 * compression in how the alpha compression is done.
 *
 * @type {number}
 * @constant
 */
export const RGBA_S3TC_DXT5_Format: number;
/**
 * PVRTC RGB compression in 4-bit mode. One block for each 4×4 pixels.
 *
 * @type {number}
 * @constant
 */
export const RGB_PVRTC_4BPPV1_Format: number;
/**
 * PVRTC RGB compression in 2-bit mode. One block for each 8×4 pixels.
 *
 * @type {number}
 * @constant
 */
export const RGB_PVRTC_2BPPV1_Format: number;
/**
 * PVRTC RGBA compression in 4-bit mode. One block for each 4×4 pixels.
 *
 * @type {number}
 * @constant
 */
export const RGBA_PVRTC_4BPPV1_Format: number;
/**
 * PVRTC RGBA compression in 2-bit mode. One block for each 8×4 pixels.
 *
 * @type {number}
 * @constant
 */
export const RGBA_PVRTC_2BPPV1_Format: number;
/**
 * ETC1 RGB format.
 *
 * @type {number}
 * @constant
 */
export const RGB_ETC1_Format: number;
/**
 * ETC2 RGB format.
 *
 * @type {number}
 * @constant
 */
export const RGB_ETC2_Format: number;
/**
 * ETC2 RGBA format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ETC2_EAC_Format: number;
/**
 * EAC R11 UNORM format.
 *
 * @type {number}
 * @constant
 */
export const R11_EAC_Format: number;
/**
 * EAC R11 SNORM format.
 *
 * @type {number}
 * @constant
 */
export const SIGNED_R11_EAC_Format: number;
/**
 * EAC RG11 UNORM format.
 *
 * @type {number}
 * @constant
 */
export const RG11_EAC_Format: number;
/**
 * EAC RG11 SNORM format.
 *
 * @type {number}
 * @constant
 */
export const SIGNED_RG11_EAC_Format: number;
/**
 * ASTC RGBA 4x4 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_4x4_Format: number;
/**
 * ASTC RGBA 5x4 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_5x4_Format: number;
/**
 * ASTC RGBA 5x5 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_5x5_Format: number;
/**
 * ASTC RGBA 6x5 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_6x5_Format: number;
/**
 * ASTC RGBA 6x6 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_6x6_Format: number;
/**
 * ASTC RGBA 8x5 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_8x5_Format: number;
/**
 * ASTC RGBA 8x6 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_8x6_Format: number;
/**
 * ASTC RGBA 8x8 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_8x8_Format: number;
/**
 * ASTC RGBA 10x5 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_10x5_Format: number;
/**
 * ASTC RGBA 10x6 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_10x6_Format: number;
/**
 * ASTC RGBA 10x8 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_10x8_Format: number;
/**
 * ASTC RGBA 10x10 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_10x10_Format: number;
/**
 * ASTC RGBA 12x10 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_12x10_Format: number;
/**
 * ASTC RGBA 12x12 format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_ASTC_12x12_Format: number;
/**
 * BPTC RGBA format.
 *
 * @type {number}
 * @constant
 */
export const RGBA_BPTC_Format: number;
/**
 * BPTC Signed RGB format.
 *
 * @type {number}
 * @constant
 */
export const RGB_BPTC_SIGNED_Format: number;
/**
 * BPTC Unsigned RGB format.
 *
 * @type {number}
 * @constant
 */
export const RGB_BPTC_UNSIGNED_Format: number;
/**
 * RGTC1 Red format.
 *
 * @type {number}
 * @constant
 */
export const RED_RGTC1_Format: number;
/**
 * RGTC1 Signed Red format.
 *
 * @type {number}
 * @constant
 */
export const SIGNED_RED_RGTC1_Format: number;
/**
 * RGTC2 Red Green format.
 *
 * @type {number}
 * @constant
 */
export const RED_GREEN_RGTC2_Format: number;
/**
 * RGTC2 Signed Red Green format.
 *
 * @type {number}
 * @constant
 */
export const SIGNED_RED_GREEN_RGTC2_Format: number;
/**
 * Animations are played once.
 *
 * @type {number}
 * @constant
 */
export const LoopOnce: number;
/**
 * Animations are played with a chosen number of repetitions, each time jumping from
 * the end of the clip directly to its beginning.
 *
 * @type {number}
 * @constant
 */
export const LoopRepeat: number;
/**
 * Animations are played with a chosen number of repetitions, alternately playing forward
 * and backward.
 *
 * @type {number}
 * @constant
 */
export const LoopPingPong: number;
/**
 * Discrete interpolation mode for keyframe tracks.
 *
 * @type {number}
 * @constant
 */
export const InterpolateDiscrete: number;
/**
 * Linear interpolation mode for keyframe tracks.
 *
 * @type {number}
 * @constant
 */
export const InterpolateLinear: number;
/**
 * Smooth interpolation mode for keyframe tracks.
 *
 * @type {number}
 * @constant
 */
export const InterpolateSmooth: number;
/**
 * Zero curvature ending for animations.
 *
 * @type {number}
 * @constant
 */
export const ZeroCurvatureEnding: number;
/**
 * Zero slope ending for animations.
 *
 * @type {number}
 * @constant
 */
export const ZeroSlopeEnding: number;
/**
 * Wrap around ending for animations.
 *
 * @type {number}
 * @constant
 */
export const WrapAroundEnding: number;
/**
 * Default animation blend mode.
 *
 * @type {number}
 * @constant
 */
export const NormalAnimationBlendMode: number;
/**
 * Additive animation blend mode. Can be used to layer motions on top of
 * each other to build complex performances from smaller re-usable assets.
 *
 * @type {number}
 * @constant
 */
export const AdditiveAnimationBlendMode: number;
/**
 * For every three vertices draw a single triangle.
 *
 * @type {number}
 * @constant
 */
export const TrianglesDrawMode: number;
/**
 * For each vertex draw a triangle from the last three vertices.
 *
 * @type {number}
 * @constant
 */
export const TriangleStripDrawMode: number;
/**
 * For each vertex draw a triangle from the first vertex and the last two vertices.
 *
 * @type {number}
 * @constant
 */
export const TriangleFanDrawMode: number;
/**
 * The depth value is inverted (1.0 - z) for visualization purposes.
 *
 * @type {number}
 * @constant
 */
export const BasicDepthPacking: number;
/**
 * The depth value is packed into 32 bit RGBA.
 *
 * @type {number}
 * @constant
 */
export const RGBADepthPacking: number;
/**
 * The depth value is packed into 24 bit RGB.
 *
 * @type {number}
 * @constant
 */
export const RGBDepthPacking: number;
/**
 * The depth value is packed into 16 bit RG.
 *
 * @type {number}
 * @constant
 */
export const RGDepthPacking: number;
/**
 * Normal information is relative to the underlying surface.
 *
 * @type {number}
 * @constant
 */
export const TangentSpaceNormalMap: number;
/**
 * Normal information is relative to the object orientation.
 *
 * @type {number}
 * @constant
 */
export const ObjectSpaceNormalMap: number;
/**
 * No color space.
 *
 * @type {string}
 * @constant
 */
export const NoColorSpace: string;
/**
 * sRGB color space.
 *
 * @type {string}
 * @constant
 */
export const SRGBColorSpace: string;
/**
 * sRGB-linear color space.
 *
 * @type {string}
 * @constant
 */
export const LinearSRGBColorSpace: string;
/**
 * Linear transfer function.
 *
 * @type {string}
 * @constant
 */
export const LinearTransfer: string;
/**
 * sRGB transfer function.
 *
 * @type {string}
 * @constant
 */
export const SRGBTransfer: string;
/**
 * No normal map packing.
 *
 * @type {string}
 * @constant
 */
export const NoNormalPacking: string;
/**
 * Normal RG packing.
 *
 * @type {string}
 * @constant
 */
export const NormalRGPacking: string;
/**
 * Normal GA packing.
 *
 * @type {string}
 * @constant
 */
export const NormalGAPacking: string;
/**
 * Sets the stencil buffer value to `0`.
 *
 * @type {number}
 * @constant
 */
export const ZeroStencilOp: number;
/**
 * Keeps the current value.
 *
 * @type {number}
 * @constant
 */
export const KeepStencilOp: number;
/**
 * Sets the stencil buffer value to the specified reference value.
 *
 * @type {number}
 * @constant
 */
export const ReplaceStencilOp: number;
/**
 * Increments the current stencil buffer value. Clamps to the maximum representable unsigned value.
 *
 * @type {number}
 * @constant
 */
export const IncrementStencilOp: number;
/**
 * Decrements the current stencil buffer value. Clamps to `0`.
 *
 * @type {number}
 * @constant
 */
export const DecrementStencilOp: number;
/**
 * Increments the current stencil buffer value. Wraps stencil buffer value to zero when incrementing
 * the maximum representable unsigned value.
 *
 * @type {number}
 * @constant
 */
export const IncrementWrapStencilOp: number;
/**
 * Decrements the current stencil buffer value. Wraps stencil buffer value to the maximum representable
 * unsigned value when decrementing a stencil buffer value of `0`.
 *
 * @type {number}
 * @constant
 */
export const DecrementWrapStencilOp: number;
/**
 * Inverts the current stencil buffer value bitwise.
 *
 * @type {number}
 * @constant
 */
export const InvertStencilOp: number;
/**
 * Will never return true.
 *
 * @type {number}
 * @constant
 */
export const NeverStencilFunc: number;
/**
 * Will return true if the stencil reference value is less than the current stencil value.
 *
 * @type {number}
 * @constant
 */
export const LessStencilFunc: number;
/**
 * Will return true if the stencil reference value is equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
export const EqualStencilFunc: number;
/**
 * Will return true if the stencil reference value is less than or equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
export const LessEqualStencilFunc: number;
/**
 * Will return true if the stencil reference value is greater than the current stencil value.
 *
 * @type {number}
 * @constant
 */
export const GreaterStencilFunc: number;
/**
 * Will return true if the stencil reference value is not equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
export const NotEqualStencilFunc: number;
/**
 * Will return true if the stencil reference value is greater than or equal to the current stencil value.
 *
 * @type {number}
 * @constant
 */
export const GreaterEqualStencilFunc: number;
/**
 * Will always return true.
 *
 * @type {number}
 * @constant
 */
export const AlwaysStencilFunc: number;
/**
 * Never pass.
 *
 * @type {number}
 * @constant
 */
export const NeverCompare: number;
/**
 * Pass if the incoming value is less than the texture value.
 *
 * @type {number}
 * @constant
 */
export const LessCompare: number;
/**
 * Pass if the incoming value equals the texture value.
 *
 * @type {number}
 * @constant
 */
export const EqualCompare: number;
/**
 * Pass if the incoming value is less than or equal to the texture value.
 *
 * @type {number}
 * @constant
 */
export const LessEqualCompare: number;
/**
 * Pass if the incoming value is greater than the texture value.
 *
 * @type {number}
 * @constant
 */
export const GreaterCompare: number;
/**
 * Pass if the incoming value is not equal to the texture value.
 *
 * @type {number}
 * @constant
 */
export const NotEqualCompare: number;
/**
 * Pass if the incoming value is greater than or equal to the texture value.
 *
 * @type {number}
 * @constant
 */
export const GreaterEqualCompare: number;
/**
 * Always pass.
 *
 * @type {number}
 * @constant
 */
export const AlwaysCompare: number;
/**
 * The contents are intended to be specified once by the application, and used many
 * times as the source for drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
export const StaticDrawUsage: number;
/**
 * The contents are intended to be respecified repeatedly by the application, and
 * used many times as the source for drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
export const DynamicDrawUsage: number;
/**
 * The contents are intended to be specified once by the application, and used at most
 * a few times as the source for drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
export const StreamDrawUsage: number;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and queried
 * many times by the application.
 *
 * @type {number}
 * @constant
 */
export const StaticReadUsage: number;
/**
 * The contents are intended to be respecified repeatedly by reading data from the 3D API, and queried
 * many times by the application.
 *
 * @type {number}
 * @constant
 */
export const DynamicReadUsage: number;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and queried at most
 * a few times by the application
 *
 * @type {number}
 * @constant
 */
export const StreamReadUsage: number;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and used many times as
 * the source for WebGL drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
export const StaticCopyUsage: number;
/**
 * The contents are intended to be respecified repeatedly by reading data from the 3D API, and used many times
 * as the source for WebGL drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
export const DynamicCopyUsage: number;
/**
 * The contents are intended to be specified once by reading data from the 3D API, and used at most a few times
 * as the source for WebGL drawing and image specification commands.
 *
 * @type {number}
 * @constant
 */
export const StreamCopyUsage: number;
/**
 * GLSL 1 shader code.
 *
 * @type {string}
 * @constant
 */
export const GLSL1: string;
/**
 * GLSL 3 shader code.
 *
 * @type {string}
 * @constant
 */
export const GLSL3: string;
/**
 * WebGL coordinate system.
 *
 * @type {number}
 * @constant
 */
export const WebGLCoordinateSystem: number;
/**
 * WebGPU coordinate system.
 *
 * @type {number}
 * @constant
 */
export const WebGPUCoordinateSystem: number;
/**
 * Represents the different timestamp query types.
 *
 * @type {ConstantsTimestampQuery}
 * @constant
 */
export const TimestampQuery: ConstantsTimestampQuery;
/**
 * Represents mouse buttons and interaction types in context of controls.
 *
 * @type {ConstantsInterpolationSamplingType}
 * @constant
 */
export const InterpolationSamplingType: ConstantsInterpolationSamplingType;
/**
 * Represents the different interpolation sampling modes.
 *
 * @type {ConstantsInterpolationSamplingMode}
 * @constant
 */
export const InterpolationSamplingMode: ConstantsInterpolationSamplingMode;
/**
 * Compatibility flags for features that may not be supported across all platforms.
 *
 * @type {Object}
 * @constant
 */
export const Compatibility: Object;
/**
 * This type represents mouse buttons and interaction types in context of controls.
 */
export type ConstantsMouse = {
    /**
     * - The left mouse button.
     */
    MIDDLE: number;
    /**
     * - The middle mouse button.
     */
    LEFT: number;
    /**
     * - The right mouse button.
     */
    RIGHT: number;
    /**
     * - A rotate interaction.
     */
    ROTATE: number;
    /**
     * - A dolly interaction.
     */
    DOLLY: number;
    /**
     * - A pan interaction.
     */
    PAN: number;
};
/**
 * This type represents touch interaction types in context of controls.
 */
export type ConstantsTouch = {
    /**
     * - A rotate interaction.
     */
    ROTATE: number;
    /**
     * - A pan interaction.
     */
    PAN: number;
    /**
     * - The dolly-pan interaction.
     */
    DOLLY_PAN: number;
    /**
     * - A dolly-rotate interaction.
     */
    DOLLY_ROTATE: number;
};
/**
 * This type represents the different timestamp query types.
 */
export type ConstantsTimestampQuery = {
    /**
     * - A `compute` timestamp query.
     */
    COMPUTE: string;
    /**
     * - A `render` timestamp query.
     */
    RENDER: string;
};
/**
 * Represents the different interpolation sampling types.
 */
export type ConstantsInterpolationSamplingType = {
    /**
     * - Perspective-correct interpolation.
     */
    PERSPECTIVE: string;
    /**
     * - Linear interpolation.
     */
    LINEAR: string;
    /**
     * - Flat interpolation.
     */
    FLAT: string;
};
/**
 * Represents the different interpolation sampling modes.
 */
export type ConstantsInterpolationSamplingMode = {
    /**
     * - Normal sampling mode.
     */
    NORMAL: string;
    /**
     * - Centroid sampling mode.
     */
    CENTROID: string;
    /**
     * - Sample-specific sampling mode.
     */
    SAMPLE: string;
    /**
     * - Flat interpolation using the first vertex.
     */
    FIRST: string;
    /**
     * - Flat interpolation using either vertex.
     */
    EITHER: string;
};
