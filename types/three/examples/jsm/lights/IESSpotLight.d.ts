import { SpotLight, Texture } from 'three';

export class IESSpotLight extends SpotLight {
    iesMap: Texture | null;
}
