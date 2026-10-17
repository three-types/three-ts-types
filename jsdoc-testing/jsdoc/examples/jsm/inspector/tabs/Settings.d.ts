export class Settings extends Parameters {
    constructor();
    extensions: {};
    setActiveExtension(name: any, value: any): Promise<void>;
    _updateExtensionUI(extension: any): void;
    _unloadExtension(inspector: any, extension: any): Promise<void>;
    _loadExtension(inspector: any, extension: any): Promise<void>;
    _getExtensions(): Promise<{
        name: string;
        url: string;
    }[]>;
}
import { Parameters } from './Parameters.js';
