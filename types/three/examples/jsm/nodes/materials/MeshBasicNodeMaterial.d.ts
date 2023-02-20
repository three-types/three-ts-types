import NodeMaterial from './NodeMaterial.js';
import Node from '../core/Node.js';
import { ShaderMaterialParameters } from '../../../../src/Three.js';

export default class MeshBasicNodeMaterial extends NodeMaterial {
    isMeshBasicNodeMaterial: true;
    lights: true;

    colorNode: Node | null;
    opacityNode: Node | null;

    alphaTestNode: Node | null;
    lightNode: Node | null;

    positionNode: Node | null;

    constructor(paramters?: ShaderMaterialParameters);
    copy(source: MeshBasicNodeMaterial): this;
}
