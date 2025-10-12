import Node from "./Node.js";
import NodeCache from "./NodeCache.js";

export default class CacheNode extends Node {
    node: Node;
    parent: boolean;

    readonly isCacheNode: true;

    constructor(node: Node, parent?: boolean);
}

export const cache: (node: Node, cache?: NodeCache) => CacheNode;

declare module "../Nodes.js" {
    interface Node {
        cache: (cache?: NodeCache) => CacheNode;
        cacheAssign: (cache?: NodeCache) => this;
    }
}
