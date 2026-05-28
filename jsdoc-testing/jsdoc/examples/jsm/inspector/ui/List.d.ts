export class List {
    constructor(...headers: any[]);
    headers: any[];
    children: any[];
    domElement: HTMLDivElement;
    id: string;
    gridStyleElement: HTMLStyleElement;
    setGridStyle(gridTemplate: any): void;
    add(item: any): void;
    remove(item: any): this;
}
