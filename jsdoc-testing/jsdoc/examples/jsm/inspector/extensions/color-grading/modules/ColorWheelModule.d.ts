export class ColorWheelModule extends Module {
    constructor(mode: any, title: any, initialParams?: {}, onChange?: null, onRemove?: null, id?: null);
    mode: any;
    onRemove: any;
    wheel: ColorWheel;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
import { ColorWheel } from '../ColorWheel.js';
