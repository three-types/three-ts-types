import Transpiler from 'three/addons/transpiler/Transpiler.js';
import GLSLDecoder from 'three/addons/transpiler/GLSLDecoder.js';
import WGSLEncoder from 'three/addons/transpiler/WGSLEncoder.js';
import TSLEncoder from 'three/addons/transpiler/TSLEncoder.js';

init();

function init() {
    // editor

    window.require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });

    require(['vs/editor/editor.main'], () => {
        const options = {
            decoder: 'GLSL',
            encoder: 'TSL',
        };

        const encoderLanguages = {
            TSL: 'javascript',
            WGSL: 'wgsl',
        };

        let timeout = null;

        const editorDOM = document.getElementById('source');
        const resultDOM = document.getElementById('result');

        const glslCode = `/*
 * Perlin noise
 * https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
 */

const float PI = 3.141592653589793;

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
	float unit = 1./freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(PI*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistence = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistence;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}
`;

        const editor = window.monaco.editor.create(editorDOM, {
            value: glslCode,
            language: 'c',
            theme: 'vs-dark',
            automaticLayout: true,
            wordWrap: 'on',
            minimap: { enabled: false },
        });

        const result = window.monaco.editor.create(resultDOM, {
            value: '',
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            wordWrap: 'on',
            readOnly: true,
            minimap: { enabled: false },
        });

        const showCode = code => {
            result.setValue(code);
            result.revealLine(1);
        };

        const build = () => {
            try {
                let encoder;

                if (options.encoder === 'TSL') {
                    encoder = new TSLEncoder();
                } else if (options.encoder === 'WGSL') {
                    encoder = new WGSLEncoder();
                } else {
                    throw new Error('Unknown encoder: ' + options.encoder);
                }

                //

                const glsl = editor.getValue();

                const decoder = new GLSLDecoder();

                const transpiler = new Transpiler(decoder, encoder);
                const tsl = transpiler.parse(glsl);

                showCode(tsl);
            } catch (e) {
                result.setValue('Error: ' + e.message);
            }
        };

        build();

        editor.getModel().onDidChangeContent(() => {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(build, 1000);
        });

        // dropdowns

        const decoderSelect = document.getElementById('decoder-select');
        const encoderSelect = document.getElementById('encoder-select');

        decoderSelect.addEventListener('change', () => {
            options.decoder = decoderSelect.value;
            build();
        });

        encoderSelect.addEventListener('change', () => {
            options.encoder = encoderSelect.value;

            const language = encoderLanguages[encoderSelect.value];
            window.monaco.editor.setModelLanguage(result.getModel(), language);

            build();
        });
    });
}
