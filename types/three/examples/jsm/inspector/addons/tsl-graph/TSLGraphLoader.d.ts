import { FileLoader, LoadingManager } from "three";

declare class TSLGraphLoaderApplier {
    tslGraphFns: unknown;

    constructor(tslGraphFns: unknown);
}

export class TSLGraphLoader extends FileLoader<TSLGraphLoaderApplier> {
    constructor(manager?: LoadingManager);
}
