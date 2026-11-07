import { BufferGeometry, Camera, Material, NodeBuilder, Scene } from "three/webgpu";

function readContext(builder: NodeBuilder) {
    const camera: Camera | null = builder.camera;
    const scene: Scene | null = builder.scene;
    const material: Material | null = builder.material;
    const geometry: BufferGeometry | null = builder.geometry;

    // @ts-expect-error The builder camera can be null before a render object is assigned.
    const unsafeCamera: Camera = builder.camera;
    // @ts-expect-error The builder scene can be null before a render object is assigned.
    const unsafeScene: Scene = builder.scene;
    // @ts-expect-error Compute builders and objects without materials can have no material.
    const unsafeMaterial: Material = builder.material;
    // @ts-expect-error Compute builders and objects without geometry can have no geometry.
    const unsafeGeometry: BufferGeometry = builder.geometry;

    if (builder.camera !== null) {
        const currentCamera: Camera = builder.camera;
    }
    if (builder.scene !== null) {
        const currentScene: Scene = builder.scene;
    }
    if (builder.material !== null) {
        const currentMaterial: Material = builder.material;
    }
    if (builder.geometry !== null) {
        const currentGeometry: BufferGeometry = builder.geometry;
    }

    builder.camera = null;
    builder.scene = null;
    builder.material = null;
    builder.geometry = null;
}
