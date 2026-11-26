export class RendererModule extends Module {
    constructor(params?: {}, onChange?: null, onRendererChange?: null);
    defaultToneMapping: any;
    defaultExposure: any;
    onRendererChange: any;
    toneMappingSelect: HTMLSelectElement;
    exposureNumInput: HTMLInputElement;
    exposureSlider: HTMLInputElement;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
