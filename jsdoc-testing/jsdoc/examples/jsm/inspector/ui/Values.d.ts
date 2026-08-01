export class Value extends EventDispatcher {
    domElement: HTMLDivElement;
    _onChangeFunction: any;
    setValue(): this;
    getValue(): null;
    dispatchChange(): void;
    onChange(callback: any): this;
    show(): this;
    hide(): this;
}
export class ValueNumber extends Value {
    constructor({ value, step, min, max }: {
        value?: number | undefined;
        step?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
    });
    input: HTMLInputElement;
    _onChangeValue(): void;
    addDragHandler(): void;
    setValue(val: any): this;
    getValue(): number;
}
export class ValueString extends Value {
    constructor({ value }: {
        value?: string | undefined;
    });
    input: HTMLInputElement;
    setValue(val: any): this;
    getValue(): string;
}
export class ValueCheckbox extends Value {
    constructor({ value }: {
        value?: boolean | undefined;
    });
    checkbox: HTMLInputElement;
    setValue(val: any): this;
    getValue(): boolean;
}
export class ValueSlider extends Value {
    constructor({ value, min, max, step }: {
        value?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        step?: number | undefined;
    });
    slider: HTMLInputElement;
    numberInput: HTMLInputElement;
    setValue(val: any): this;
    getValue(): number;
    step(value: any): this;
}
export class ValueSelect extends Value {
    constructor({ options, value }: {
        options?: never[] | undefined;
        value?: string | undefined;
    });
    options: any[];
    select: HTMLSelectElement;
    setValue(val: any): this;
    getValue(): any;
}
export class ValueColor extends Value {
    constructor({ value }: {
        value?: string | undefined;
    });
    colorInput: HTMLInputElement;
    _value: string;
    setValue(val: any): this;
    _getColorHex(color: any): any;
    getValue(): string;
}
export class ValueButton extends Value {
    constructor({ text, value }: {
        text?: string | undefined;
        value?: (() => void) | undefined;
    });
}
import { EventDispatcher } from 'three';
