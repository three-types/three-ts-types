export class Uniform<T = any> {
    constructor(value: T);

    value: T;

    clone(): Uniform<T>;
}
