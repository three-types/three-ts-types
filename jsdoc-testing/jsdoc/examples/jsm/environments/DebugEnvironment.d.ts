/**
 * This class represents a scene with a very basic room setup that can be used as
 * input for {@link PMREMGenerator#fromScene}. The resulting PMREM represents the room's
 * lighting and can be used for Image Based Lighting by assigning it to {@link Scene#environment}
 * or directly as an environment map to PBR materials.
 *
 * This class uses a simple room setup and should only be used for development purposes.
 * A more appropriate setup for production is {@link RoomEnvironment}.
 *
 * ```js
 * const environment = new DebugEnvironment();
 * const pmremGenerator = new THREE.PMREMGenerator( renderer );
 *
 * const envMap = pmremGenerator.fromScene( environment ).texture;
 * scene.environment = envMap;
 * ```
 *
 * @augments Scene
 * @three_import import { DebugEnvironment } from 'three/addons/environments/DebugEnvironment.js';
 */
export class DebugEnvironment extends Scene {
    /**
     * Frees internal resources. This method should be called
     * when the environment is no longer required.
     */
    dispose(): void;
}
import { Scene } from 'three';
