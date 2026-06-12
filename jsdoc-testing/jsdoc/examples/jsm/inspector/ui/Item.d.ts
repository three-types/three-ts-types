export class Item {
    constructor(...data: any[]);
    children: any[];
    isOpen: boolean;
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
    toggle(): this;
    close(): this;
}
