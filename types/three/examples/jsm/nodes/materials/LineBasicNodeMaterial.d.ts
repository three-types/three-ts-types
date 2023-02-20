import NodeMaterial from './NodeMaterial.js';
import { ShaderMaterialParameters } from '../../../../src/Three.js';
import { Node } from '../Nodes.js';

export default class LineBasicNodeMaterial extends NodeMaterial {
    isLineBasicNodeMaterial: true;

    colorNode: Node | null;
    opacityNode: Node | null;
    alphaTestNode: Node | null;
    lightNode: Node | null;
    positionNode: Node | null;

    constructor(parameters?: ShaderMaterialParameters);
    copy(source: LineBasicNodeMaterial): this;
}
