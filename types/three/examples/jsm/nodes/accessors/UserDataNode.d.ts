import { NodeTypeOption } from '../core/constants';
import ReferenceNode from './ReferenceNode';

export default class UserDataNode extends ReferenceNode {
    userData: any;

    constructor(property: string, inputType: NodeTypeOption, userData?: any);
}
