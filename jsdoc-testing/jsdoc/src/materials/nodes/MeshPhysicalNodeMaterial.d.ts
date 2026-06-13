export default MeshPhysicalNodeMaterial;
/**
 * Node material version of {@link MeshPhysicalMaterial}.
 *
 * @augments MeshStandardNodeMaterial
 */
declare class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshPhysicalNodeMaterial: boolean;
    /**
     * The clearcoat of physical materials is by default inferred from the `clearcoat`
     * and `clearcoatMap` properties. This node property allows to overwrite the default
     * and define the clearcoat with a node instead.
     *
     * If you don't want to overwrite the clearcoat but modify the existing
     * value instead, use {@link materialClearcoat}.
     *
     * @type {?Node<float>}
     * @default null
     */
    clearcoatNode: Node<any> | null;
    /**
     * The clearcoat roughness of physical materials is by default inferred from the `clearcoatRoughness`
     * and `clearcoatRoughnessMap` properties. This node property allows to overwrite the default
     * and define the clearcoat roughness with a node instead.
     *
     * If you don't want to overwrite the clearcoat roughness but modify the existing
     * value instead, use {@link materialClearcoatRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    clearcoatRoughnessNode: Node<any> | null;
    /**
     * The clearcoat normal of physical materials is by default inferred from the `clearcoatNormalMap`
     * property. This node property allows to overwrite the default
     * and define the clearcoat normal with a node instead.
     *
     * If you don't want to overwrite the clearcoat normal but modify the existing
     * value instead, use {@link materialClearcoatNormal}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    clearcoatNormalNode: Node<any> | null;
    /**
     * The sheen of physical materials is by default inferred from the `sheen`, `sheenColor`
     * and `sheenColorMap` properties. This node property allows to overwrite the default
     * and define the sheen with a node instead.
     *
     * If you don't want to overwrite the sheen but modify the existing
     * value instead, use {@link materialSheen}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    sheenNode: Node<any> | null;
    /**
     * The sheen roughness of physical materials is by default inferred from the `sheenRoughness` and
     * `sheenRoughnessMap` properties. This node property allows to overwrite the default
     * and define the sheen roughness with a node instead.
     *
     * If you don't want to overwrite the sheen roughness but modify the existing
     * value instead, use {@link materialSheenRoughness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    sheenRoughnessNode: Node<any> | null;
    /**
     * The iridescence of physical materials is by default inferred from the `iridescence`
     * property. This node property allows to overwrite the default
     * and define the iridescence with a node instead.
     *
     * If you don't want to overwrite the iridescence but modify the existing
     * value instead, use {@link materialIridescence}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iridescenceNode: Node<any> | null;
    /**
     * The iridescence IOR of physical materials is by default inferred from the `iridescenceIOR`
     * property. This node property allows to overwrite the default
     * and define the iridescence IOR with a node instead.
     *
     * If you don't want to overwrite the iridescence IOR but modify the existing
     * value instead, use {@link materialIridescenceIOR}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iridescenceIORNode: Node<any> | null;
    /**
     * The iridescence thickness of physical materials is by default inferred from the `iridescenceThicknessRange`
     * and `iridescenceThicknessMap` properties. This node property allows to overwrite the default
     * and define the iridescence thickness with a node instead.
     *
     * If you don't want to overwrite the iridescence thickness but modify the existing
     * value instead, use {@link materialIridescenceThickness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iridescenceThicknessNode: Node<any> | null;
    /**
     * The specular intensity of physical materials is by default inferred from the `specularIntensity`
     * and `specularIntensityMap` properties. This node property allows to overwrite the default
     * and define the specular intensity with a node instead.
     *
     * If you don't want to overwrite the specular intensity but modify the existing
     * value instead, use {@link materialSpecularIntensity}.
     *
     * @type {?Node<float>}
     * @default null
     */
    specularIntensityNode: Node<any> | null;
    /**
     * The specular color of physical materials is by default inferred from the `specularColor`
     * and `specularColorMap` properties. This node property allows to overwrite the default
     * and define the specular color with a node instead.
     *
     * If you don't want to overwrite the specular color but modify the existing
     * value instead, use {@link materialSpecularColor}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    specularColorNode: Node<any> | null;
    /**
     * The ior of physical materials is by default inferred from the `ior`
     * property. This node property allows to overwrite the default
     * and define the ior with a node instead.
     *
     * If you don't want to overwrite the ior but modify the existing
     * value instead, use {@link materialIOR}.
     *
     * @type {?Node<float>}
     * @default null
     */
    iorNode: Node<any> | null;
    /**
     * The transmission of physical materials is by default inferred from the `transmission` and
     * `transmissionMap` properties. This node property allows to overwrite the default
     * and define the transmission with a node instead.
     *
     * If you don't want to overwrite the transmission but modify the existing
     * value instead, use {@link materialTransmission}.
     *
     * @type {?Node<float>}
     * @default null
     */
    transmissionNode: Node<any> | null;
    /**
     * The thickness of physical materials is by default inferred from the `thickness` and
     * `thicknessMap` properties. This node property allows to overwrite the default
     * and define the thickness with a node instead.
     *
     * If you don't want to overwrite the thickness but modify the existing
     * value instead, use {@link materialThickness}.
     *
     * @type {?Node<float>}
     * @default null
     */
    thicknessNode: Node<any> | null;
    /**
     * The attenuation distance of physical materials is by default inferred from the
     * `attenuationDistance` property. This node property allows to overwrite the default
     * and define the attenuation distance with a node instead.
     *
     * If you don't want to overwrite the attenuation distance but modify the existing
     * value instead, use {@link materialAttenuationDistance}.
     *
     * @type {?Node<float>}
     * @default null
     */
    attenuationDistanceNode: Node<any> | null;
    /**
     * The attenuation color of physical materials is by default inferred from the
     * `attenuationColor` property. This node property allows to overwrite the default
     * and define the attenuation color with a node instead.
     *
     * If you don't want to overwrite the attenuation color but modify the existing
     * value instead, use {@link materialAttenuationColor}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    attenuationColorNode: Node<any> | null;
    /**
     * The dispersion of physical materials is by default inferred from the
     * `dispersion` property. This node property allows to overwrite the default
     * and define the dispersion with a node instead.
     *
     * If you don't want to overwrite the dispersion but modify the existing
     * value instead, use {@link materialDispersion}.
     *
     * @type {?Node<float>}
     * @default null
     */
    dispersionNode: Node<any> | null;
    /**
     * The anisotropy of physical materials is by default inferred from the
     * `anisotropy` property. This node property allows to overwrite the default
     * and define the anisotropy with a node instead.
     *
     * If you don't want to overwrite the anisotropy but modify the existing
     * value instead, use {@link materialAnisotropy}.
     *
     * @type {?Node<float>}
     * @default null
     */
    anisotropyNode: Node<any> | null;
    /**
     * Whether the lighting model should use clearcoat or not.
     *
     * @type {boolean}
     * @default true
     */
    get useClearcoat(): boolean;
    /**
     * Whether the lighting model should use iridescence or not.
     *
     * @type {boolean}
     * @default true
     */
    get useIridescence(): boolean;
    /**
     * Whether the lighting model should use sheen or not.
     *
     * @type {boolean}
     * @default true
     */
    get useSheen(): boolean;
    /**
     * Whether the lighting model should use anisotropy or not.
     *
     * @type {boolean}
     * @default true
     */
    get useAnisotropy(): boolean;
    /**
     * Whether the lighting model should use transmission or not.
     *
     * @type {boolean}
     * @default true
     */
    get useTransmission(): boolean;
    /**
     * Whether the lighting model should use dispersion or not.
     *
     * @type {boolean}
     * @default true
     */
    get useDispersion(): boolean;
    /**
     * Setups the physical specific node variables.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupVariants(builder: NodeBuilder): void;
    /**
     * Setups the clearcoat normal node.
     *
     * @return {Node<vec3>} The clearcoat normal.
     */
    setupClearcoatNormal(): Node<any>;
    setup(builder: any): void;
}
import MeshStandardNodeMaterial from './MeshStandardNodeMaterial.js';
