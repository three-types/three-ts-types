import { ShaderMaterialParameters } from '../../../../src/Three';
import { Swizzable, CheckerNode, Node } from '../Nodes';

import MeshStandardNodeMaterial from './MeshStandardNodeMaterial';

export default class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {
    iridescenceNode: null | Swizzable<CheckerNode>;
    iridescenceIORNode: null | Swizzable<Node>;
    iridescenceThicknessNode: null | Swizzable<Node>;

    constructor(parameters: ShaderMaterialParameters);

    copy(source: MeshPhysicalNodeMaterial): this;
}
