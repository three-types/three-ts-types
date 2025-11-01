import * as THREE from 'three';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, clock: THREE.Clock;

init();

function init() {
    const container = document.getElementById('container')!;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 25);

    scene = new THREE.Scene();
    camera.lookAt(scene.position);

    clock = new THREE.Clock();

    // geometry

    const geometry1 = new THREE.TetrahedronGeometry();
    const geometry2 = new THREE.BoxGeometry();

    // texture

    const texture = new THREE.TextureLoader().load('textures/crate.gif');
    texture.colorSpace = THREE.SRGBColorSpace;

    // uniforms groups

    // Camera and lighting related data are perfect examples of using UBOs since you have to store these
    // data just once. They can be shared across all shader programs.

    const cameraUniformsGroup = new THREE.UniformsGroup();
    cameraUniformsGroup.setName('ViewData');
    cameraUniformsGroup.add(new THREE.Uniform(camera.projectionMatrix)); // projection matrix
    cameraUniformsGroup.add(new THREE.Uniform(camera.matrixWorldInverse)); // view matrix

    const lightingUniformsGroup = new THREE.UniformsGroup();
    lightingUniformsGroup.setName('LightingData');
    lightingUniformsGroup.add(new THREE.Uniform(new THREE.Vector3(0, 0, 10))); // light position
    lightingUniformsGroup.add(new THREE.Uniform(new THREE.Color(0x7c7c7c))); // ambient color
    lightingUniformsGroup.add(new THREE.Uniform(new THREE.Color(0xd5d5d5))); // diffuse color
    lightingUniformsGroup.add(new THREE.Uniform(new THREE.Color(0xe7e7e7))); // specular color
    lightingUniformsGroup.add(new THREE.Uniform(64)); // shininess

    // materials

    const material1 = new THREE.RawShaderMaterial({
        uniforms: {
            modelMatrix: { value: null },
            normalMatrix: { value: null },
            color: { value: null },
        },
        vertexShader: document.getElementById('vertexShader1')!.textContent!,
        fragmentShader: document.getElementById('fragmentShader1')!.textContent!,
        glslVersion: THREE.GLSL3,
    });

    const material2 = new THREE.RawShaderMaterial({
        uniforms: {
            modelMatrix: { value: null },
            diffuseMap: { value: null },
        },
        vertexShader: document.getElementById('vertexShader2')!.textContent!,
        fragmentShader: document.getElementById('fragmentShader2')!.textContent!,
        glslVersion: THREE.GLSL3,
    });

    // meshes

    for (let i = 0; i < 200; i++) {
        let mesh;

        if (i % 2 === 0) {
            mesh = new THREE.Mesh(geometry1, material1.clone());

            mesh.material.uniformsGroups = [cameraUniformsGroup, lightingUniformsGroup];
            mesh.material.uniforms.modelMatrix.value = mesh.matrixWorld;
            mesh.material.uniforms.normalMatrix.value = mesh.normalMatrix;
            mesh.material.uniforms.color.value = new THREE.Color(0xffffff * Math.random());
        } else {
            mesh = new THREE.Mesh(geometry2, material2.clone());

            mesh.material.uniformsGroups = [cameraUniformsGroup, lightingUniformsGroup];
            mesh.material.uniforms.modelMatrix.value = mesh.matrixWorld;
            mesh.material.uniforms.diffuseMap.value = texture;
        }

        scene.add(mesh);

        const s = 1 + Math.random() * 0.5;

        mesh.scale.x = s;
        mesh.scale.y = s;
        mesh.scale.z = s;

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        mesh.position.x = Math.random() * 40 - 20;
        mesh.position.y = Math.random() * 40 - 20;
        mesh.position.z = Math.random() * 20 - 10;
    }

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    const delta = clock.getDelta();

    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            child.rotation.x += delta * 0.5;
            child.rotation.y += delta * 0.3;
        }
    });

    renderer.render(scene, camera);
}
