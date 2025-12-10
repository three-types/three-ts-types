export default Line2NodeMaterial;
/**
 * This node material can be used to render lines with a size larger than one
 * by representing them as instanced meshes.
 *
 * @augments NodeMaterial
 */
declare class Line2NodeMaterial extends NodeMaterial {
    /**
     * Constructs a new node material for wide line rendering.
     *
     * @param {Object} [parameters={}] - The configuration parameter.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLine2NodeMaterial: boolean;
    /**
     * Whether vertex colors should be used or not.
     *
     * @type {boolean}
     * @default false
     */
    useColor: boolean;
    /**
     * The dash offset.
     *
     * @type {number}
     * @default 0
     */
    dashOffset: number;
    /**
     * Defines the lines color.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    lineColorNode: Node<any> | null;
    /**
     * Defines the offset.
     *
     * @type {?Node<float>}
     * @default null
     */
    offsetNode: Node<any> | null;
    /**
     * Defines the dash scale.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashScaleNode: Node<any> | null;
    /**
     * Defines the dash size.
     *
     * @type {?Node<float>}
     * @default null
     */
    dashSizeNode: Node<any> | null;
    /**
     * Defines the gap size.
     *
     * @type {?Node<float>}
     * @default null
     */
    gapSizeNode: Node<any> | null;
    _useDash: any;
    _useAlphaToCoverage: boolean;
    _useWorldUnits: boolean;
    set worldUnits(value: boolean);
    /**
     * Whether the lines should sized in world units or not.
     * When set to `false` the unit is pixel.
     *
     * @type {boolean}
     * @default false
     */
    get worldUnits(): boolean;
    set dashed(value: boolean);
    /**
     * Whether the lines should be dashed or not.
     *
     * @type {boolean}
     * @default false
     */
    get dashed(): boolean;
}
import NodeMaterial from './NodeMaterial.js';
