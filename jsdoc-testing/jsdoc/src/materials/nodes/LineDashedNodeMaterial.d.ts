export default LineDashedNodeMaterial;
/**
 * Node material version of  {@link LineDashedMaterial}.
 *
 * @augments NodeMaterial
 */
declare class LineDashedNodeMaterial extends NodeMaterial {
    /**
     * Constructs a new line dashed node material.
     *
     * @param {Object} [parameters] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineDashedNodeMaterial: boolean;
    /**
     * The dash offset.
     *
     * @type {number}
     * @default 0
     */
    dashOffset: number;
    /**
     * The offset of dash materials is by default inferred from the `dashOffset`
     * property. This node property allows to overwrite the default
     * and define the offset with a node instead.
     *
     * If you don't want to overwrite the offset but modify the existing
     * value instead, use {@link materialLineDashOffset}.
     *
     * @type {?Node<float>}
     * @default null
     */
    offsetNode: Node<any> | null;
    /**
     * The scale of dash materials is by default inferred from the `scale`
     * property. This node property allows to overwrite the default
     * and define the scale with a node instead.
     *
     * If you don't want to overwrite the scale but modify the existing
     * value instead, use {@link materialLineScale}.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashScaleNode: Node<any> | null;
    /**
     * The dash size of dash materials is by default inferred from the `dashSize`
     * property. This node property allows to overwrite the default
     * and define the dash size with a node instead.
     *
     * If you don't want to overwrite the dash size but modify the existing
     * value instead, use {@link materialLineDashSize}.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashSizeNode: Node<any> | null;
    /**
     * The gap size of dash materials is by default inferred from the `gapSize`
     * property. This node property allows to overwrite the default
     * and define the gap size with a node instead.
     *
     * If you don't want to overwrite the gap size but modify the existing
     * value instead, use {@link materialLineGapSize}.
     *
     * @type {?Node<float>}
     * @default null
     */
    gapSizeNode: Node<any> | null;
}
import NodeMaterial from './NodeMaterial.js';
