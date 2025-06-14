import Node from "../../nodes/core/Node.js";
import { ShaderNodeObject } from "../../nodes/tsl/TSLCore.js";
import { MapColorPropertiesToColorRepresentations } from "../Material.js";
import { MeshPhysicalMaterialProperties } from "../MeshPhysicalMaterial.js";
import MeshStandardNodeMaterial, { MeshStandardNodeMaterialNodeProperties } from "./MeshStandardNodeMaterial.js";

export interface MeshPhysicalNodeMaterialNodeProperties extends MeshStandardNodeMaterialNodeProperties {
    clearcoatNode: Node | null;
    clearcoatRoughnessNode: Node | null;
    clearcoatNormalNode: Node | null;

    sheenNode: Node | null;
    sheenRoughnessNode: Node | null;

    iridescenceNode: Node | null;
    iridescenceIORNode: Node | null;
    iridescenceThicknessNode: Node | null;

    iorNode: Node | null;

    specularIntensityNode: Node | null;
    specularColorNode: Node | null;

    transmissionNode: Node | null;
    thicknessNode: Node | null;
    attenuationDistanceNode: Node | null;
    attenuationColorNode: Node | null;
    dispersionNode: Node | null;

    anisotropyNode: Node | null;
}

export interface MeshPhysicalNodeMaterialProperties
    extends MeshPhysicalNodeMaterialNodeProperties, MeshPhysicalMaterialProperties
{
}

export interface MeshStandardNodeMaterialParameters
    extends Partial<MapColorPropertiesToColorRepresentations<MeshPhysicalNodeMaterialProperties>>
{
}

declare class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {
    readonly isMeshPhysicalNodeMaterial: true;

    constructor(parameters?: MeshStandardNodeMaterialParameters);

    get useClearcoat(): boolean;
    get useIridescence(): boolean;
    get useSheen(): boolean;
    get useAnisotropy(): boolean;
    get useTransmission(): boolean;
    get useDispersion(): boolean;

    setupClearcoatNormal(): ShaderNodeObject<Node>;
}

interface MeshPhysicalNodeMaterial extends MeshPhysicalNodeMaterialProperties {
}

export default MeshPhysicalNodeMaterial;
