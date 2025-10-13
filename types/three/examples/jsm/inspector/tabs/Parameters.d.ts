import { Tab } from "../ui/Tab.js";
import { ValueCheckbox, ValueColor, ValueNumber, ValueSelect } from "../ui/Values.js";

type KeyToValueOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

interface ValueSelectWithName<T = Record<string, unknown>, K extends keyof T = keyof T> extends ValueSelect<T, K> {
    name: (name: string) => this;
}

interface ValueNumberWithName<
    T = Record<string, unknown>,
    K extends KeyToValueOfType<T, number> = KeyToValueOfType<T, number>,
> extends ValueNumber<T, K> {
    name: (name: string) => this;
}

interface ValueCheckboxWithName<
    T = Record<string, unknown>,
    K extends KeyToValueOfType<T, boolean> = KeyToValueOfType<T, boolean>,
> extends ValueCheckbox<T, K> {
    name: (name: string) => this;
}

interface ValueColorWithName<
    T = Record<string, unknown>,
    K extends keyof T = keyof T,
> extends ValueColor<T, K> {
    name: (name: string) => this;
}

declare class ParametersGroup {
    name: string;

    constructor(parameters: never, name: string);

    add<T, K extends keyof T>(
        object: T,
        property: K,
        options: ReadonlyArray<T[K]> | Record<string, T[K]>,
    ): ValueSelectWithName<T, K>;
    add<T, K extends KeyToValueOfType<T, number>>(
        object: T,
        property: K,
        min?: number,
        max?: number,
        step?: number,
    ): ValueNumberWithName<T, K>;
    add<T, K extends KeyToValueOfType<T, boolean>>(
        object: T,
        property: K,
        options?: never,
    ): ValueCheckboxWithName<T, K>;

    addFolder(name: string): ParametersGroup;

    addColor<T, K extends keyof T>(object: T, property: K, rgbScale?: number): ValueColorWithName<T, K>;
}

declare class Parameters extends Tab {
    createGroup(name: string): ParametersGroup;
}

export { Parameters };
export type { ParametersGroup };
