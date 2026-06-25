export class Console extends Tab {
    constructor(options?: {});
    filters: {
        info: boolean;
        warn: boolean;
        error: boolean;
    };
    filterText: string;
    unreadErrors: number;
    unreadWarns: number;
    tabBadgeContainer: HTMLSpanElement;
    tabErrorBadge: HTMLSpanElement;
    tabWarnBadge: HTMLSpanElement;
    logContainer: HTMLDivElement;
    buildHeader(): void;
    applyFilters(): void;
    copyAll(button: any): void;
    _getIcon(type: any, subType: any): string | undefined;
    _formatMessage(type: any, text: any): DocumentFragment;
    clearUnread(): void;
    updateBadges(): void;
    addMessage(type: any, text: any): void;
}
import { Tab } from '../ui/Tab.js';
