import { EmptyEvent } from './Three';

export interface DisposableEventMap {
    dispose: EmptyEvent;
}

export interface Disposable {
    /**
     * Frees resources allocated by this instance.
     * @remarks Call this method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
