export class Item {
    constructor(...data: any[]);
    children: any[];
    isOpen: boolean;
    isCollapsible: boolean;
    childrenContainer: HTMLDivElement | null;
    parent: any;
    domElement: HTMLDivElement;
    itemRow: HTMLDivElement;
    userData: {};
    data: any[];
    onItemClick(e: any): void;
    add(item: any, index?: number): this;
    remove(item: any): this;
    updateToggler(): void;
    setCollapsible(collapsible: any): this;
    toggle(): this;
    close(): this;
    show(): this;
    hide(): this;
    setValue(index: any, value: any): this;
    getValue(index: any): any;
}
