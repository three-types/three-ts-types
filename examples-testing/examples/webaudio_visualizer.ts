import * as THREE from "three";

let scene, camera, renderer, analyser, uniforms;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);

function init() {
    const fftSize = 128;

    //

    const overlay = document.getElementById("overlay");
    overlay.remove();

    //

    const container = document.getElementById("container");

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.Camera();

    //

    const listener = new THREE.AudioListener();

    const audio = new THREE.Audio(listener);
    const file = "./sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3";

    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        const loader = new THREE.AudioLoader();
        loader.load(file, function (buffer) {
            audio.setBuffer(buffer);
            audio.play();
        });
    } else {
        const mediaElement = new Audio(file);
        mediaElement.play();

        audio.setMediaElementSource(mediaElement);
    }

    analyser = new THREE.AudioAnalyser(audio, fftSize);

    //

    const format = (renderer.capabilities.isWebGL2) ? THREE.RedFormat : THREE.LuminanceFormat;

    uniforms = {
        tAudioData: { value: new THREE.DataTexture(analyser.data, fftSize / 2, 1, format) },
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent,
    });

    const geometry = new THREE.PlaneGeometry(1, 1);

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //

    window.addEventListener("resize", onWindowResize);

    animate();
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    analyser.getFrequencyData();

    uniforms.tAudioData.value.needsUpdate = true;

    renderer.render(scene, camera);
}
