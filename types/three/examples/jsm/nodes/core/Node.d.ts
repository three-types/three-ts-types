import { NodeTypeOption, NodeUpdateTypeOption } from './constants';
import NodeBuilder from './NodeBuilder';
import NodeFrame from './NodeFrame';

export default class Node {
    uuid: string;
    type: string;
    isNode: true;
    nodeType: NodeTypeOption;
    updateType: NodeUpdateTypeOption;
    id: number;

    constructor(nodeType?: NodeTypeOption);

    getChildren(): Node[];
    getHash(builder: NodeBuilder): string;
    getUpdateType(builder: NodeBuilder): NodeUpdateTypeOption;
    getNodeType(builder: NodeBuilder, output?: string | null): NodeTypeOption | null;
    getConstructHash(builder: NodeBuilder): string;
    getReference(builder: NodeBuilder): Node;
    construct(builder: NodeBuilder): Node | null;
    analyze(builder: NodeBuilder): void;
    generate(builder: NodeBuilder, output?: string | null): string;
    update(frame: NodeFrame): void;
    build(builder: NodeBuilder, output?: string | null): string;
    serialize(json: any): void;
    deserialize(json: any): void;
    toJSON(meta?: string | { textures: {}; images: {}; nodes: {} }): any;
}
