export default BlendMode;
/**
 * Represents blending configuration.
 *
 * This class encapsulates all blending-related properties that control how
 * a material's colors are combined with the colors already in the frame buffer.
 */
declare class BlendMode {
    /**
     * Constructs a new blending configuration.
     *
     * @param {(NoBlending|NormalBlending|AdditiveBlending|SubtractiveBlending|MultiplyBlending|CustomBlending|MaterialBlending)} [blending=NormalBlending] - The blending mode.
     */
    constructor(blending?: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending | MaterialBlending));
    /**
     * Defines the blending type.
     *
     * It must be set to `CustomBlending` if custom blending properties like
     * {@link BlendMode#blendSrc}, {@link BlendMode#blendDst} or {@link BlendMode#blendEquation}
     * should have any effect.
     *
     * @type {(NoBlending|NormalBlending|AdditiveBlending|SubtractiveBlending|MultiplyBlending|CustomBlending|MaterialBlending)}
     * @default NormalBlending
     */
    blending: (NoBlending | number | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending | MaterialBlending);
    /**
     * Defines the blending source factor.
     *
     * This determines how the source (incoming) fragment color is factored before being added
     * to the destination (existing) fragment color in the frame buffer.
     *
     * @type {(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default SrcAlphaFactor
     */
    blendSrc: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
    /**
     * Defines the blending destination factor.
     *
     * This determines how the destination (existing) fragment color in the frame buffer
     * is factored before being combined with the source (incoming) fragment color.
     *
     * @type {(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default OneMinusSrcAlphaFactor
     */
    blendDst: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor);
    /**
     * Defines the blending equation.
     *
     * This determines how the source and destination colors are combined.
     *
     * @type {(AddEquation|SubtractEquation|ReverseSubtractEquation|MinEquation|MaxEquation)}
     * @default AddEquation
     */
    blendEquation: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation);
    /**
     * Defines the blending source alpha factor.
     *
     * When set, this allows separate control of the alpha channel's source blending factor.
     * If `null`, {@link BlendMode#blendSrc} is used for the alpha channel as well.
     *
     * @type {?(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default null
     */
    blendSrcAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
    /**
     * Defines the blending destination alpha factor.
     *
     * When set, this allows separate control of the alpha channel's destination blending factor.
     * If `null`, {@link BlendMode#blendDst} is used for the alpha channel as well.
     *
     * @type {?(ZeroFactor|OneFactor|SrcColorFactor|OneMinusSrcColorFactor|SrcAlphaFactor|OneMinusSrcAlphaFactor|DstAlphaFactor|OneMinusDstAlphaFactor|DstColorFactor|OneMinusDstColorFactor|SrcAlphaSaturateFactor|ConstantColorFactor|OneMinusConstantColorFactor|ConstantAlphaFactor|OneMinusConstantAlphaFactor)}
     * @default null
     */
    blendDstAlpha: (ZeroFactor | OneFactor | SrcColorFactor | OneMinusSrcColorFactor | number | number | DstAlphaFactor | OneMinusDstAlphaFactor | DstColorFactor | OneMinusDstColorFactor | SrcAlphaSaturateFactor | ConstantColorFactor | OneMinusConstantColorFactor | ConstantAlphaFactor | OneMinusConstantAlphaFactor) | null;
    /**
     * Defines the blending equation of the alpha channel.
     *
     * When set, this allows separate control of the alpha channel's blending equation.
     * If `null`, {@link BlendMode#blendEquation} is used for the alpha channel as well.
     *
     * @type {?(AddEquation|SubtractEquation|ReverseSubtractEquation|MinEquation|MaxEquation)}
     * @default null
     */
    blendEquationAlpha: (number | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation) | null;
    /**
     * Defines whether to premultiply the alpha (transparency) value.
     *
     * If `true`, the RGB color of the texture or material is multiplied by its alpha value.
     * This is useful for transparent textures/materials where the color data
     * should already include the transparency information.
     *
     * @type {boolean}
     * @default false
     */
    premultiplyAlpha: boolean;
    /**
     * Copies the blending properties from the given source to this instance.
     *
     * @param {BlendMode} source - The blending configuration to copy from.
     * @return {BlendMode} A reference to this instance.
     */
    copy(source: BlendMode): BlendMode;
    /**
     * Returns a clone of this blending configuration.
     *
     * @return {BlendMode} A new Blending instance with the same properties.
     */
    clone(): BlendMode;
}
