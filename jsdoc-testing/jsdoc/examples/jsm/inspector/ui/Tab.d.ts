/**
 * Tab class
 * @param {string} title - The title of the tab
 * @param {Object} options - Options for the tab
 * @param {boolean} [options.allowDetach=true] - Whether the tab can be detached into a separate window
 * @param {boolean} [options.builtin=false] - Whether the tab should appear in the profiler-toggle button
 * @param {string} [options.icon] - SVG icon HTML for the builtin button
 *
 * @example
 * // Create a tab that can be detached (default behavior)
 * const tab1 = new Tab('My Tab');
 *
 * // Create a tab that cannot be detached
 * const tab2 = new Tab('Fixed Tab', { allowDetach: false });
 *
 * // Create a builtin tab that appears in the profiler-toggle
 * const tab3 = new Tab('Builtin Tab', { builtin: true });
 *
 * // Create a builtin tab with custom icon
 * const tab4 = new Tab('Settings', { builtin: true, icon: '<svg>...</svg>' });
 *
 * // Control builtin tab visibility
 * tab3.showBuiltin(); // Show the builtin button and mini-content
 * tab3.hideBuiltin(); // Hide the builtin button and mini-content
 */
export class Tab extends EventDispatcher {
    constructor(title: any, options?: {});
    id: any;
    button: HTMLButtonElement;
    content: HTMLDivElement;
    _isActive: boolean;
    isVisible: boolean;
    isDetached: boolean;
    detachedWindow: any;
    allowDetach: any;
    builtin: any;
    icon: any;
    builtinButton: any;
    miniContent: any;
    profiler: any;
    onVisibilityChange: any;
    get inspector(): any;
    set isActive(value: boolean);
    get isActive(): boolean;
    init(): void;
    update(): void;
    setActive(isActive: any): void;
    show(): void;
    hide(): void;
    showBuiltin(): void;
    hideBuiltin(): void;
}
import { EventDispatcher } from 'three';
