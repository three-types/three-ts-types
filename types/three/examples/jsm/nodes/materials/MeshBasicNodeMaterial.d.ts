import { Color, Combine, MeshBasicMaterialParameters, Texture } from "../../../../src/Three.js";
import NodeMaterial from "./NodeMaterial.js";

export default class MeshBasicNodeMaterial extends NodeMaterial {
    readonly isMeshBasicNodeMaterial: true;

    // Properties from MeshBasicMaterial
    readonly isMeshBasicMaterial: true;
    color: Color;
    map: Texture | null;
    lightMap: Texture | null;
    lightMapIntensity: number;
    aoMap: Texture | null;
    aoMapIntensity: number;
    specularMap: Texture | null;
    alphaMap: Texture | null;
    envMap: Texture | null;
    combine: Combine;
    reflectivity: number;
    refractionRatio: number;
    wireframeLinecap: string;
    wireframeLinejoin: string;

    constructor(parameters?: MeshBasicMaterialParameters);
}
