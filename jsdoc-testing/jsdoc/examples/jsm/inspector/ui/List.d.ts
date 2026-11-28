export class List {
    constructor(...headers: any[]);
    headers: any[];
    children: any[];
    domElement: HTMLDivElement;
    setGridStyle(gridTemplate: any): void;
    setViewMode(mode: any): void;
    add(item: any): void;
    remove(item: any): this;
}
