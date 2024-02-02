import { Color, MeshPhysicalMaterialParameters, Texture, Vector2 } from "../../../../src/Three.js";

import Node from "../core/Node.js";
import MeshStandardNodeMaterial, { MeshStandardNodeMaterialParameters } from "./MeshStandardNodeMaterial.js";

export interface MeshPhysicalNodeMaterialParameters extends MeshStandardNodeMaterialParameters, MeshPhysicalMaterialParameters {
}

export default class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {
    readonly isMeshPhysicalNodeMaterial: true;

    clearcoatNode: Node | null;
    clearcoatRoughnessNode: Node | null;
    clearcoatNormalNode: Node | null;

    sheenNode: Node | null;
    sheenRoughnessNode: Node | null;

    iridescenceNode: Node | null;
    iridescenceIORNode: Node | null;
    iridescenceThicknessNode: Node | null;

    iorNode?: Node | null;

    specularIntensityNode: Node | null;
    specularColorNode: Node | null;

    transmissionNode: Node | null;
    thicknessNode: Node | null;
    attenuationDistanceNode: Node | null;
    attenuationColorNode: Node | null;

    // Properties from MeshPhysicalMaterial
    readonly isMeshPhysicalMaterial: true;
    clearcoat: number;
    clearcoatMap: Texture | null;
    clearcoatRoughness: number;
    clearcoatRoughnessMap: Texture | null;
    clearcoatNormalScale: Vector2;
    clearcoatNormalMap: Texture | null;
    reflectivity: number;
    ior: number;
    sheen: number;
    sheenColor: Color;
    sheenColorMap: Texture | null;
    sheenRoughness: number;
    sheenRoughnessMap: Texture | null;
    transmission: number;
    transmissionMap: Texture | null;
    thickness: number;
    thicknessMap: Texture | null;
    attenuationDistance: number;
    attenuationColor: Color;
    specularIntensity: number;
    specularColor: Color;
    specularIntensityMap: Texture | null;
    specularColorMap: Texture | null;
    iridescenceMap: Texture | null;
    iridescenceIOR: number;
    iridescence: number;
    iridescenceThicknessRange: [number, number];
    iridescenceThicknessMap: Texture | null;
    anisotropy?: number;
    anisotropyRotation?: number;
    anisotropyMap?: Texture | null;

    constructor(parameters?: MeshPhysicalNodeMaterialParameters);
}
