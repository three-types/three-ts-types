export class SatVibranceModule extends Module {
    constructor(params?: {}, onChange?: null, onRemove?: null, id?: string);
    saturationControl: HTMLDivElement;
    vibranceControl: HTMLDivElement;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
