import { NodeFrame } from '../Nodes';
import Object3DNode, { OObject3DNodeScope } from './Object3DNode';

/**
 * Similar to {@link Object3DNode} aber the object comes from {@link NodeFrame.object}
 */
export default class ModelNode extends Object3DNode {
    constructor(scope?: OObject3DNodeScope);
}
