import Node from "./Node.js";

export default class UniformGroupNode extends Node {
    readonly isUniformGroup: true;
    name: string;
    version: number;

    constructor(name: string, shared?: boolean);

    set needsUpdate(value: boolean);
}

export const uniformGroup: (name: string) => UniformGroupNode;
export const sharedUniformGroup: (name: string) => UniformGroupNode;
