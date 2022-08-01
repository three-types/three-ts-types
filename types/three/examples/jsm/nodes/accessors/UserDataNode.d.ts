import { NodeTypeOption } from '../core/constants';
import ReferenceNode from './ReferenceNode';

export default class UserDataNode extends ReferenceNode<{ [key: string]: any }> {
    userData: { [key: string]: any } | null;
    constructor(property: string, inputType: NodeTypeOption, userData?: { [key: string]: any });
}
