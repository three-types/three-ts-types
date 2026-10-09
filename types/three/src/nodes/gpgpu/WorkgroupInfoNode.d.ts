import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";

declare class WorkgroupInfoNode<TElementType extends string = string> extends Node {
    bufferType: TElementType;
    bufferCount: number;

    isAtomic: boolean;

    readonly isWorkgroupInfoNode: true;

    elementType: TElementType;

    scope: string;

    constructor(scope: string, bufferType: TElementType, bufferCount?: number);

    setName(name: string): this;

    /**
     * @deprecated "label()" has been deprecated. Use "setName()" instead.
     */
    label(name: string): this;

    setScope(scope: string): this;

    getElementType(builder?: NodeBuilder): TElementType;

    getInputType(builder?: NodeBuilder): string;

    element(indexNode: Node): Node<TElementType>;

    setAtomic(value: boolean): this;

    toAtomic(): this;
}

export default WorkgroupInfoNode;

export const workgroupArray: <const TElementType extends string>(
    type: TElementType,
    count?: number,
) => WorkgroupInfoNode<TElementType>;
