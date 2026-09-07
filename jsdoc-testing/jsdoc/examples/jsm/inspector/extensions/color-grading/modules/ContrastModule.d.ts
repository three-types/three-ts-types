export class ContrastModule extends Module {
    constructor(params?: {}, onChange?: null, onRemove?: null, id?: string);
    contrastControl: HTMLDivElement;
    pivotControl: HTMLDivElement;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
