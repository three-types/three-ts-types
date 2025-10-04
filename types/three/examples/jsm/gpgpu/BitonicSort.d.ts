import { ShaderNodeObject } from "three/tsl";
import { Node, Renderer } from "three/webgpu";

export const getBitonicFlipIndices: (index: Node, blockHeight: Node) => ShaderNodeObject<Node>;

export const getBitonicDisperseIndices: (index: Node, swapSpan: Node) => ShaderNodeObject<Node>;

export interface BitonicSortOptions {
    workgroupSize?: number | undefined;
}

export class BitonicSort {
    constructor(renderer: Renderer, dataBuffer, options?: BitonicSortOptions);
}
