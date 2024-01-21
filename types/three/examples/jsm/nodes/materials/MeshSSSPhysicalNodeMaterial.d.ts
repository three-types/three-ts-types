import { ShaderMaterialParameters } from '../../../../src/Three.js';
import Node from '../core/Node.js';
import MeshPhysicalNodeMaterial from './MeshPhysicalNodeMaterial.js';

export default class MeshSSSPhysicalNodeMaterial extends MeshPhysicalNodeMaterial {
    thicknessColorNode: Node | null;
    thicknessDistortionNode: Node;
    thicknessAmbientNode: Node;
    thicknessAttenuationNode: Node;
    thicknessPowerNode: Node;
    thicknessScaleNode: Node;

    constructor(parameters?: ShaderMaterialParameters);

    get useSSS(): boolean;
}
