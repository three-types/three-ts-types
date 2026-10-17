export class CurvesModule extends Module {
    constructor(params?: {}, onChange?: null, onRemove?: null, id?: string);
    curveEditor: CurveEditor;
    domElement: HTMLDivElement;
}
import { Module } from './Module.js';
import { CurveEditor } from '../CurveEditor.js';
