import Node from "../../nodes/core/Node.js";
import NodeMaterial, { NodeMaterialParameters } from "./NodeMaterial.js";

export interface VolumeNodeMaterialParameters extends NodeMaterialParameters {
    steps?: number | undefined;

    scatteringNode?: Node | null | undefined;
}

export default class VolumeNodeMaterial extends NodeMaterial {
    readonly isVolumeNodeMaterial: true;

    steps: number;

    scatteringNode: Node | null;

    constructor(parameters?: NodeMaterialParameters);
}
