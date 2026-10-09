import { colorSpaceToWorking, convertColorSpace, vec4, workingToColorSpace } from "three/tsl";
import { ColorSpaceNode, LinearSRGBColorSpace, Node, SRGBColorSpace } from "three/webgpu";

const converted: Node<"vec4"> = convertColorSpace(vec4(1), SRGBColorSpace, LinearSRGBColorSpace);
const working: Node<"vec4"> = colorSpaceToWorking(vec4(1), SRGBColorSpace);
const output: Node<"vec4"> = workingToColorSpace(vec4(1), SRGBColorSpace);
const chainedWorking: Node<"vec4"> = vec4(1).colorSpaceToWorking(SRGBColorSpace);
const chainedOutput: Node<"vec4"> = vec4(1).workingToColorSpace(SRGBColorSpace);
const direct: Node<"vec4"> = new ColorSpaceNode(vec4(1), SRGBColorSpace, LinearSRGBColorSpace);
convertColorSpace(vec4(1), SRGBColorSpace, LinearSRGBColorSpace).rgb.mul(2);

// @ts-expect-error ColorSpaceNode's result is vec4.
const wrong: Node<"vec3"> = converted;
