export class WhiteBalanceModule extends Module {
    constructor(params?: {}, onChange?: null, onRemove?: null, id?: string);
    temperatureControl: HTMLDivElement;
    tintControl: HTMLDivElement;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
