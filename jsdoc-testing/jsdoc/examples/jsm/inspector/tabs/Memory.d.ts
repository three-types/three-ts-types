export class Memory extends Tab {
    constructor(options?: {});
    memoryStats: Item;
    attributes: Item;
    geometries: Item;
    indexAttributes: Item;
    indirectStorageAttributes: Item;
    programs: Item;
    readbackBuffers: Item;
    renderTargets: Item;
    storageAttributes: Item;
    textures: Item;
    uniformBuffers: Item;
    graph: Graph;
    updateGraph(inspector: any): void;
    updateText(inspector: any): void;
}
import { Tab } from '../ui/Tab.js';
import { Item } from '../ui/Item.js';
import { Graph } from '../ui/Graph.js';
