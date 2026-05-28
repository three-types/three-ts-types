import * as THREE from 'three/webgpu';
import { If, vec4, uv, ivec2, texture, Fn } from 'three/tsl';

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

    const colorNode = texture();
    const depthNode = texture();

    material.colorNode = Fn(() => {
        const color = vec4(1).toVar();

        const vuv = uv().toVar();

        If(vuv.y.greaterThan(0.5), () => {
            color.assign(colorNode.sample(vuv.mul(10)).offset(ivec2(0, 7)).gather(0));
        }).Else(() => {
            color.assign(depthNode.sample(vuv).offset(ivec2(0, 7)).gather(0).compare(1));
        });

        return color;
    })();

    //

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    const renderer = new THREE.WebGPURenderer({ antialias: false, forceWebGL: forceWebGL });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setAnimationLoop(animate);
    await renderer.init();

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

    const depthTexture = new THREE.DepthTexture();
    depthTexture.compareFunction = THREE.LessEqualCompare;
    const rt = new THREE.RenderTarget(100, 100, {
        depthTexture,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
    });
    rt.texture.wrapS = THREE.RepeatWrapping;
    rt.texture.wrapT = THREE.RepeatWrapping;

    const cameraZ = 2.5;
    const rtScene = new THREE.Scene();
    rtScene.background = new THREE.Color(0x808080);
    const rtCamera = new THREE.PerspectiveCamera(50, 1, cameraZ - 0.5 * Math.sqrt(3), cameraZ + 0.5 * Math.sqrt(3));
    rtCamera.position.z = cameraZ;

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set(1, 1, 0);
    rtScene.add(dirLight);
    rtScene.add(new THREE.AmbientLight(0xffffff, 0.1));

    const box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardNodeMaterial({ color: 0xff0000 }));
    box.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    rtScene.add(box);

    renderer.setRenderTarget(rt);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    colorNode.value = rt.texture;
    depthNode.value = rt.depthTexture;

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
