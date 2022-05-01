import { Line, PositionalAudio } from '../../../src/Three';

export class PositionalAudioHelper extends Line {
    constructor(audio: PositionalAudio, range?: number, divisionsInnerAngle?: number, divisionsOuterAngle?: number);

    audio: PositionalAudio;
    range: number;
    divisionsInnerAngle: number;
    divisionsOuterAngle: number;

    dispose(): void;
    update(): void;
}

export interface PositionalAudioHelperConstructor {
    new (
        audio: PositionalAudio,
        range?: number,
        divisionsInnerAngle?: number,
        divisionsOuterAngle?: number,
    ): PositionalAudioHelper;
    prototype: PositionalAudioHelper;
}
