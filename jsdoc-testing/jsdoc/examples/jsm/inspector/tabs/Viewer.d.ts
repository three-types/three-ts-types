export class Viewer extends Tab {
    constructor(options?: {});
    itemLibrary: Map<any, any>;
    folderLibrary: Map<any, any>;
    canvasNodes: Map<any, any>;
    currentDataList: any[];
    nodeList: List;
    nodes: Item;
    getFolder(name: any): any;
    addNodeItem(canvasData: any): any;
    getCanvasDataByNode(renderer: any, node: any): any;
    update(inspector: any): void;
}
import { Tab } from '../ui/Tab.js';
import { List } from '../ui/List.js';
import { Item } from '../ui/Item.js';
