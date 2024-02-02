import { Color, LineBasicMaterialParameters, Texture } from "../../../../src/Three.js";
import NodeMaterial from "./NodeMaterial.js";

export default class LineBasicNodeMaterial extends NodeMaterial {
    readonly isLineBasicNodeMaterial: true;

    // Properties from LineBasicMaterial
    readonly isLineBasicMaterial: true;
    color: Color;
    linecap: string;
    linejoin: string;
    map: Texture | null;

    constructor(parameters?: LineBasicMaterialParameters);
}
