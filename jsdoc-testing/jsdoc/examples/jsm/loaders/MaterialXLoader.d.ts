export class MaterialXLoader extends Loader {
    constructor(manager: any);
    archiveDisposer: (() => void) | null;
    dispose(): this;
    load(url: any, onLoad: any, onProgress: any, onError: any, options?: {}): this;
    loadAsync(url: any, onProgress: any, options?: {}): Promise<any>;
    parseBuffer(data: any, url?: string, options?: {}): {
        materials: any;
        log: any;
        errors: any;
        warnings: any;
    };
    parse(text: any, options?: {}): {
        materials: any;
        log: any;
        errors: any;
        warnings: any;
    };
}
import { Loader } from 'three/webgpu';
