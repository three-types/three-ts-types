export class HueModule extends Module {
    constructor(params?: {}, onChange?: null, onRemove?: null, id?: string);
    hueShiftControl: HTMLDivElement;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
