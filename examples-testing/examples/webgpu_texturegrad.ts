import * as THREE from 'three/webgpu';
import { If, vec4, float, time, cos, pow, vec2, uv, texture, Fn } from 'three/tsl';

// WebGPU Backend
init();

// WebGL Backend
init(true);

async function init(forceWebGL = false) {
    const aspect = window.innerWidth / 2 / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-aspect, aspect);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    // texture

    const material = new THREE.MeshBasicNodeMaterial({ color: 0xffffff });

    // load async brick_diffuse
    const map = await new THREE.TextureLoader().loadAsync('textures/uv_grid_opengl.jpg');

    material.colorNode = Fn(() => {
        const color = vec4(1).toVar();

        const vuv = uv().toVar();
        const blur = pow(
            float(0.0625)
                .sub(cos(vuv.x.mul(20.0).add(time)))
                .mul(0.0625),
            2.0,
        );

        const grad = vec2(blur).toVar();

        If(vuv.y.greaterThan(0.5), () => {
            grad.assign(0);
        });

        color.assign(
            texture(map, vuv.add(vec2(blur, blur).mul(0.5)))
                .grad(grad, grad)
                .mul(0.25)
                .add(
                    texture(map, vuv.add(vec2(blur, blur.negate()).mul(0.5)))
                        .grad(grad, grad)
                        .mul(0.25),
                )
                .add(
                    texture(map, vuv.add(vec2(blur.negate(), blur).mul(0.5)))
                        .grad(grad, grad)
                        .mul(0.25),
                )
                .add(
                    texture(map, vuv.add(vec2(blur.negate(), blur.negate()).mul(0.5)))
                        .grad(grad, grad)
                        .mul(0.25),
                ),
        );

        If(vuv.y.greaterThan(0.497).and(vuv.y.lessThan(0.503)), () => {
            color.assign(1);
        });

        return color;
    })();

    //

    const box = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(box);

    const renderer = new THREE.WebGPURenderer({ antialias: false, forceWebGL: forceWebGL });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setAnimationLoop(animate);

    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '50%';
    renderer.domElement.style.height = '100%';

    if (forceWebGL) {
        renderer.domElement.style.left = '50%';

        scene.background = new THREE.Color(0x212121);
    } else {
        scene.background = new THREE.Color(0x313131);
    }

    //

    function animate() {
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
        renderer.setSize(window.innerWidth / 2, window.innerHeight);

        const aspect = window.innerWidth / 2 / window.innerHeight;

        const frustumHeight = camera.top - camera.bottom;

        camera.left = (-frustumHeight * aspect) / 2;
        camera.right = (frustumHeight * aspect) / 2;

        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    }
}
