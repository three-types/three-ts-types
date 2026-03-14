import { Material } from "../../../../../src/materials/Material.js";
import { Scene } from "../../../../../src/scenes/Scene.js";
import { Tab, TabEventMap } from "../../ui/Tab.js";

interface TSLGraphEditorEventMap extends TabEventMap {
    change: { material: Material };
    remove: { graphId: string };
}

export class TSLGraphEditor extends Tab<TSLGraphEditorEventMap> {
    constructor();

    get hasGraphs(): boolean;

    apply(scene: Scene): this;

    restoreMaterial(material: Material): void;

    setMaterial(material: Material): Promise<void>;
}
