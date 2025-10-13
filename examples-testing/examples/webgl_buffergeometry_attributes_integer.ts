import * as THREE from 'three';

let camera, scene, renderer, mesh;

init();

function init() {
    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 2500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    // geometry

    const triangles = 10000;

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const uvs = [];
    const textureIndices = [];

    const n = 800,
        n2 = n / 2; // triangles spread in the cube
    const d = 50,
        d2 = d / 2; // individual triangle size

    for (let i = 0; i < triangles; i++) {
        // positions

        const x = Math.random() * n - n2;
        const y = Math.random() * n - n2;
        const z = Math.random() * n - n2;

        const ax = x + Math.random() * d - d2;
        const ay = y + Math.random() * d - d2;
        const az = z + Math.random() * d - d2;

        const bx = x + Math.random() * d - d2;
        const by = y + Math.random() * d - d2;
        const bz = z + Math.random() * d - d2;

        const cx = x + Math.random() * d - d2;
        const cy = y + Math.random() * d - d2;
        const cz = z + Math.random() * d - d2;

        positions.push(ax, ay, az);
        positions.push(bx, by, bz);
        positions.push(cx, cy, cz);

        // uvs

        uvs.push(0, 0);
        uvs.push(0.5, 1);
        uvs.push(1, 0);

        // texture indices

        const t = i % 3;
        textureIndices.push(t, t, t);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('textureIndex', new THREE.Int16BufferAttribute(textureIndices, 1));
    geometry.attributes.textureIndex.gpuType = THREE.IntType;

    geometry.computeBoundingSphere();

    // material

    const loader = new THREE.TextureLoader();

    const map1 = loader.load('textures/crate.gif');
    const map2 = loader.load('textures/floors/FloorsCheckerboard_S_Diffuse.jpg');
    const map3 = loader.load('textures/terrain/grasslight-big.jpg');

    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTextures: {
                value: [map1, map2, map3],
            },
        },
        vertexShader: /* glsl */ `
						in int textureIndex;

						flat out int vIndex; // "flat" indicates that the value will not be interpolated (required for integer attributes)
						out vec2 vUv;

						void main()	{

							vIndex = textureIndex;
							vUv = uv;

							gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

						}
					`,
        fragmentShader: /* glsl */ `
						flat in int vIndex;
						in vec2 vUv;

						uniform sampler2D uTextures[ 3 ];

						out vec4 outColor;

						void main()	{

							if ( vIndex == 0 ) outColor = texture( uTextures[ 0 ], vUv );
							else if ( vIndex == 1 ) outColor = texture( uTextures[ 1 ], vUv );
							else if ( vIndex == 2 ) outColor = texture( uTextures[ 2 ], vUv );

						}
					`,
        side: THREE.DoubleSide,
        glslVersion: THREE.GLSL3,
    });

    // mesh

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    const time = Date.now() * 0.001;

    mesh.rotation.x = time * 0.25;
    mesh.rotation.y = time * 0.5;

    renderer.render(scene, camera);
}
