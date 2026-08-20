export class ExposureHueModule extends Module {
    constructor(params?: {}, onChange?: null, onRemove?: null, id?: string);
    exposureControl: HTMLDivElement;
    hueShiftControl: HTMLDivElement;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
