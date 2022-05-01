export class ImprovedNoise {
    constructor();
    noise(x: number, y: number, z: number): number;
}

export interface ImprovedNoiseConstructor {
    new (): ImprovedNoise;
    prototype: ImprovedNoise;
}
