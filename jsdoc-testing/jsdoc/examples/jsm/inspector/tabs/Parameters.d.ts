export class Parameters extends Tab {
    constructor(options?: {});
    paramList: List;
    groups: any[];
    createGroup(name: any): ParametersGroup;
}
import { Tab } from '../ui/Tab.js';
import { List } from '../ui/List.js';
declare class ParametersGroup {
    constructor(parameters: any, name: any);
    parameters: any;
    name: any;
    paramList: Item;
    objects: any[];
    close(): this;
    add(object: any, property: any, ...params: any[]): ValueNumber | ValueCheckbox | ValueSlider | ValueSelect | ValueButton | ValueString | null;
    _addInfo(editor: any, itemNode: any): void;
    _addParameter(object: any, property: any, editor: any, subItem: any): void;
    _registerParameter(object: any, property: any, editor: any, subItem: any): void;
    addString(object: any, property: any): ValueString;
    addFolder(name: any): ParametersGroup;
    addBoolean(object: any, property: any): ValueCheckbox;
    addSelect(object: any, property: any, options: any): ValueSelect;
    addColor(object: any, property: any): ValueColor;
    addSlider(object: any, property: any, min?: number, max?: number, step?: number): ValueSlider;
    addNumber(object: any, property: any, ...params: any[]): ValueNumber;
    addButton(object: any, property: any): ValueButton;
}
import { Item } from '../ui/Item.js';
import { ValueNumber } from '../ui/Values.js';
import { ValueCheckbox } from '../ui/Values.js';
import { ValueSlider } from '../ui/Values.js';
import { ValueSelect } from '../ui/Values.js';
import { ValueButton } from '../ui/Values.js';
import { ValueString } from '../ui/Values.js';
import { ValueColor } from '../ui/Values.js';
export {};
