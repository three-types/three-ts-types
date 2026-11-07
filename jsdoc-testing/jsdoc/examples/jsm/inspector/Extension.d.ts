export class Extension extends Tab {
    isExtension: boolean;
    init(inspector: any): void;
    _inspector: any;
    _handleLayout: ((event: any) => void) | null | undefined;
    serialize(): {};
    deserialize(): void;
    save(): void;
    onOrientationChange(): void;
    onLayoutChange(): void;
}
import { Tab } from 'three/addons/inspector/ui/Tab.js';
