export class Performance extends Tab {
    constructor(options?: {});
    graphFpsCounter: HTMLSpanElement;
    graphMsCounter: HTMLSpanElement;
    notInUse: Map<any, any>;
    perfList: List;
    timelineRuler: Element | null;
    frameStats: Item;
    graphStats: Item;
    graph: Graph;
    miscellaneous: Item;
    currentRender: any;
    currentItem: any;
    frameItems: Map<any, any>;
    resolveStats(inspector: any, stats: any): void;
    updateTimeline(inspector: any, frame: any): void;
    updateGraph(inspector: any, frame: any): void;
    addNotInUse(cid: any, item: any): void;
    updateNotInUse(cid: any): void;
    updateText(inspector: any, frame: any): void;
}
import { Tab } from '../ui/Tab.js';
import { List } from '../ui/List.js';
import { Item } from '../ui/Item.js';
import { Graph } from '../ui/Graph.js';
