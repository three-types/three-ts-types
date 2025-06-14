import Node from "../../nodes/core/Node.js";
import { MapColorPropertiesToColorRepresentations } from "../Material.js";
import { MeshStandardMaterialProperties } from "../MeshStandardMaterial.js";
import NodeMaterial, { NodeMaterialNodeProperties } from "./NodeMaterial.js";

export interface MeshStandardNodeMaterialNodeProperties extends NodeMaterialNodeProperties {
    emissiveNode: Node | null;

    metalnessNode: Node | null;
    roughnessNode: Node | null;
}

export interface MeshStandardNodeMaterialProperties
    extends MeshStandardNodeMaterialNodeProperties, MeshStandardMaterialProperties
{
}

export interface MeshStandardNodeMaterialParameters
    extends Partial<MapColorPropertiesToColorRepresentations<MeshStandardNodeMaterialProperties>>
{
}

declare class MeshStandardNodeMaterial extends NodeMaterial {
    readonly isMeshStandardNodeMaterial: true;

    constructor(parameters?: MeshStandardNodeMaterialParameters);
}

interface MeshStandardNodeMaterial extends MeshStandardNodeMaterialProperties {
}

export default MeshStandardNodeMaterial;
