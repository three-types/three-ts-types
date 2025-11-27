const swizzleA = ["x", "y", "z", "w"];
const swizzleB = ["r", "g", "b", "a"];
const swizzleC = ["s", "t", "p", "q"];

let swizzleOptions = [];
for (let i = 0; i < 4; i++) {
    swizzleOptions[i] = [];
    for (let j = 0; j < 4; j++) {
        swizzleOptions[i][j] = [];
    }
}

function setProtoSwizzle(a, b, c, d) {
    let prop = swizzleA[a];
    let altA = swizzleB[a];
    let altB = swizzleC[a];

    if (b != null) {
        prop += swizzleA[b];
        altA += swizzleB[b];
        altB += swizzleC[b];
    }

    if (c != null) {
        prop += swizzleA[c];
        altA += swizzleB[c];
        altB += swizzleC[c];
    }

    if (d != null) {
        prop += swizzleA[d];
        altA += swizzleB[d];
        altB += swizzleC[d];
    }

    const validChars = [a, b, c, d].filter(x => x != null);
    const numChars = validChars.length;
    const maxCharNum = Math.max(...validChars);

    swizzleOptions[numChars - 1][maxCharNum].push(prop);
    swizzleOptions[numChars - 1][maxCharNum].push(altA);
    swizzleOptions[numChars - 1][maxCharNum].push(altB);
}

for (let a = 0; a < 4; a++) {
    setProtoSwizzle(a, null, null, null);
    for (let b = 0; b < 4; b++) {
        setProtoSwizzle(a, b, null, null);
        for (let c = 0; c < 4; c++) {
            setProtoSwizzle(a, b, c, null);
            for (let d = 0; d < 4; d++) {
                setProtoSwizzle(a, b, c, d);
            }
        }
    }
}

const getType = [
    "Node<TNumOrBool>",
    "Node<NumOrBoolToVec2<TNumOrBool>>",
    "Node<NumOrBoolToVec3<TNumOrBool>>",
    "Node<NumOrBoolToVec4<TNumOrBool>>",
];

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        let interfaceLine = `interface Swizzle${j + 1}In${i + 1}Out<TNumOrBool extends NumOrBoolType>`;
        if (j > 0) interfaceLine += ` extends Swizzle${j}In${i + 1}Out<TNumOrBool>`;
        interfaceLine += " {";
        console.log(interfaceLine);
        const arr = swizzleOptions[i][j];
        for (const val of arr) {
            console.log(`    get ${val}(): ${getType[i]};`);
            console.log(`    set ${val}(value: NumOrBoolVec4OrLess<TNumOrBool>);`);
        }
        console.log("}");
        console.log();
    }
}
