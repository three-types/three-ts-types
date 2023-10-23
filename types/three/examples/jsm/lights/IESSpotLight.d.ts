import { SpotLight, Texture } from 'three';

class IESSpotLight extends SpotLight {
    iesMap: Texture | null;
}

export default IESSpotLight;
