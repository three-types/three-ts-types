import Binding from "./Binding";
import TextureNode from "../../nodes/accessors/TextureNode";

declare class Sampler extends Binding {
	texture: TextureNode | null;
	version: number;
	readonly isSampler: true;
	constructor(name: string, texture: TextureNode | null);
}

export default Sampler;