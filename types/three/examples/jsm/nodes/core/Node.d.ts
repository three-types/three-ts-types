import { AnyJson, NodeTypeOption, NodeUpdateType } from './constants.js';
import NodeBuilder from './NodeBuilder.js';
import NodeFrame from './NodeFrame.js';

export default abstract class Node {
    uuid: string;
    type: string;
    isNode: true;
    nodeType: NodeTypeOption | null;
    updateType: NodeUpdateType;
    id: number;

    constructor(nodeType?: NodeTypeOption | null);

    isGlobal(builder: NodeBuilder): boolean;
    getChildren(): Node[];
    getHash(builder: NodeBuilder): string;
    getUpdateType(builder: NodeBuilder): NodeUpdateType;
    getNodeType(builder: NodeBuilder, output?: string | null): NodeTypeOption | null;
    getReference(builder: NodeBuilder): Node;
    setup(builder: NodeBuilder): Node | null;
    analyze(builder: NodeBuilder): void;
    generate(builder: NodeBuilder, output?: string | null): string;
    /** This method must be overriden when {@link updateType} !== 'none' */
    update(frame: NodeFrame): void;
    build(builder: NodeBuilder, output?: string | null): string;
    serialize(json: AnyJson): void;
    deserialize(json: AnyJson): void;
    toJSON(meta?: string | { textures: {}; images: {}; nodes: {} }): AnyJson;
    getCacheKey(): string;
}
