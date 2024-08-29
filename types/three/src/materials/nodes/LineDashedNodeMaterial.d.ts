import Node from "../../nodes/core/Node.js";
import { LineDashedMaterialParameters } from "../LineDashedMaterial.js";
import NodeMaterial, { NodeMaterialParameters } from "./NodeMaterial.js";

export interface LineDashedNodeMaterialParameters extends NodeMaterialParameters, LineDashedMaterialParameters {}

declare class LineDashedNodeMaterial extends NodeMaterial {
    readonly isLineDashedNodeMaterial: true;

    offsetNode: Node | null;
    dashScaleNode: Node | null;
    dashSizeNode: Node | null;
    gapSizeNode: Node | null;

    // Properties from LineDashedMaterial
    readonly isLineDashedMaterial: true;
    scale: number;
    dashSize: number;
    gapSize: number;

    constructor(parameters?: LineDashedMaterialParameters);
}

export default LineDashedNodeMaterial;
