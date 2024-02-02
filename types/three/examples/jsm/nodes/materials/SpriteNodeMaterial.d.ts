import { Color, SpriteMaterialParameters, Texture } from "../../../../src/Three.js";
import Node from "../core/Node.js";
import NodeMaterial from "./NodeMaterial.js";

export default class SpriteNodeMaterial extends NodeMaterial {
    isSpriteNodeMaterial: true;

    rotationNode: Node | null;
    scaleNode: Node | null;

    // Properties from SpriteMaterial
    readonly isSpriteMaterial: true;
    color: Color;
    map: Texture | null;
    alphaMap: Texture | null;
    rotation: number;
    sizeAttenuation: boolean;

    constructor(parameters?: SpriteMaterialParameters);
}
