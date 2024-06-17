import TextureNode from "../../nodes/accessors/TextureNode";
import Binding from "./Binding";

declare class Sampler extends Binding {
    texture: TextureNode | null;
    version: number;
    readonly isSampler: true;
    constructor(name: string, texture: TextureNode | null);
}

export default Sampler;
