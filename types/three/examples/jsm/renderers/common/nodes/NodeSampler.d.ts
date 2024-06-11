import TextureNode from '../../../nodes/accessors/TextureNode.js';
import Sampler from '../Sampler.js';

declare class NodeSampler extends Sampler {
	textureNode: TextureNode | undefined;
	constructor(name: string, textureNode: TextureNode | undefined);
	update(): void;
}

export default NodeSampler;