import SpriteNodeMaterial, { SpriteNodeMaterialParameters } from "./SpriteNodeMaterial.js";

export interface PointsNodeMaterialParameters extends SpriteNodeMaterialParameters {
}

export default class PointsNodeMaterial extends SpriteNodeMaterial {
    sizeNode: Node | null;

    readonly isPointsNodeMaterial: true;

    constructor(parameters?: PointsNodeMaterialParameters);
}
