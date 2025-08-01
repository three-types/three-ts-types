
import { Fn, vec3, struct, float } from "three/tsl";


const Complex = struct({
    real:'float',
    imaginary:'float',
});

const multiply = Fn(([a,b]:[a:ReturnType<typeof Complex>,b:ReturnType<typeof Complex>])=>{
    const ar=a.get("real");
    const ai=a.get("imaginary");
    const br=b.get("real");
    const bi=b.get("imaginary");
    return Complex({
        real: ar.mul(br).sub(ai.mul(bi)),
        imaginary: ar.mul(bi).add(ai.mul(br))
    });
})

const complexA = Complex(float(2),float(1));
const complexB = Complex({
    real:float(2),
    imaginary:float(-1),
});
const complexC = multiply(complexA,complexB);
complexC.get("real");
complexC.get("imaginary");


// https://github.com/mrdoob/three.js/pull/30394
const BoundingBox = struct( {
	min: 'vec3',
	max: 'vec3'
} );

// style 1
const bb1 = BoundingBox( vec3( 0 ), vec3( 1 ) );

// style 1 - default value
const bb2 = BoundingBox();

// style 2
const bb3 = BoundingBox( {
	min: vec3( 0 ), 
	max: vec3( 1 ) 
} );

// style 2 - optional values
const bb4 = BoundingBox( {
	// min: vec3( 0 ),  // use optional value
	max: vec3( 1 ) 
} );

// assigns in TSL Fn
const bbFn = Fn( () => {

	const bb = BoundingBox();

	const bbMax = bb.get( 'max' );
	bbMax.assign( vec3( 1 ) );
	// or -> bb.get( 'max' ).assign( vec3( 1 ) );

	return bb;

} );

// debug
/* material.colorNode = */bbFn().get( 'max' );