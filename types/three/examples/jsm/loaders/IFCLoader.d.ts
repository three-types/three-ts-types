import { IFCManager } from './IFC/Components/IFCManager';
import { Loader, LoadingManager } from 'three';
import { IFCModel } from './IFC/Components/IFCModel';
declare class IFCLoader extends Loader {
    ifcManager: IFCManager;
    constructor(manager?: LoadingManager);
    load(
        url: any,
        onLoad: (ifc: IFCModel) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    parse(buffer: ArrayBuffer): Promise<IFCModel>;
}
export { IFCLoader };
