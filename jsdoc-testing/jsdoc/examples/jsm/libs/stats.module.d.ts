export default Stats;
declare function Stats(): {
    REVISION: number;
    dom: HTMLDivElement;
    addPanel: (panel: any) => any;
    showPanel: (id: any) => void;
    begin: () => void;
    end: () => number;
    update: () => void;
    domElement: HTMLDivElement;
    setMode: (id: any) => void;
};
declare namespace Stats {
    function Panel(name: any, fg: any, bg: any): {
        dom: HTMLCanvasElement;
        update: (value: any, maxValue: any) => void;
    };
}
