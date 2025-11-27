import { Color } from "../../math/Color.js";
import { Matrix2 } from "../../math/Matrix2.js";
import { Matrix3 } from "../../math/Matrix3.js";
import { Matrix4 } from "../../math/Matrix4.js";
import { Vector2 } from "../../math/Vector2.js";
import { Vector3 } from "../../math/Vector3.js";
import { Vector4 } from "../../math/Vector4.js";
import ConstNode from "../core/ConstNode.js";
import Node, { NumOrBoolType } from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";
import StackNode from "../core/StackNode.js";

export function addMethodChaining(name: string, nodeElement: unknown): void;

declare module "../core/Node.js" {
    interface NodeElements {
        assign: (sourceNode: Node | number) => this;
        get: (value: string) => Node;
    }
}

type NumOrBoolToVec = {
    float: "vec";
    int: "ivec";
    uint: "uvec";
    bool: "bvec";
};
type NumOrBoolToJsType = {
    float: number;
    int: number;
    uint: number;
    bool: boolean;
};
type NumOrBoolToVec2<TNumOrBool extends NumOrBoolType> = `${NumOrBoolToVec[TNumOrBool]}2`;
type NumOrBoolToVec3<TNumOrBool extends NumOrBoolType> = `${NumOrBoolToVec[TNumOrBool]}3`;
type NumOrBoolToVec4<TNumOrBool extends NumOrBoolType> = `${NumOrBoolToVec[TNumOrBool]}4`;
type NumOrBool<TNumOrBool extends NumOrBoolType> = Node<TNumOrBool> | NumOrBoolToJsType[TNumOrBool];
type NumOrBoolVec2OrLess<TNumOrBool extends NumOrBoolType> = NumOrBool<TNumOrBool> | Node<NumOrBoolToVec2<TNumOrBool>>;
type NumOrBoolVec3OrLess<TNumOrBool extends NumOrBoolType> =
    | NumOrBoolVec2OrLess<TNumOrBool>
    | Node<NumOrBoolToVec3<TNumOrBool>>;
type NumOrBoolVec4OrLess<TNumOrBool extends NumOrBoolType> =
    | NumOrBoolVec3OrLess<TNumOrBool>
    | Node<NumOrBoolToVec4<TNumOrBool>>;

interface Swizzle1In1Out<TNumOrBool extends NumOrBoolType> {
    get x(): Node<TNumOrBool>;
    set x(value: NumOrBool<TNumOrBool>);
    get r(): Node<TNumOrBool>;
    set r(value: NumOrBool<TNumOrBool>);
    get s(): Node<TNumOrBool>;
    set s(value: NumOrBool<TNumOrBool>);
}

interface Swizzle2In1Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In1Out<TNumOrBool> {
    get y(): Node<TNumOrBool>;
    set y(value: NumOrBool<TNumOrBool>);
    get g(): Node<TNumOrBool>;
    set g(value: NumOrBool<TNumOrBool>);
    get t(): Node<TNumOrBool>;
    set t(value: NumOrBool<TNumOrBool>);
}

interface Swizzle3In1Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In1Out<TNumOrBool> {
    get z(): Node<TNumOrBool>;
    set z(value: NumOrBool<TNumOrBool>);
    get b(): Node<TNumOrBool>;
    set b(value: NumOrBool<TNumOrBool>);
    get p(): Node<TNumOrBool>;
    set p(value: NumOrBool<TNumOrBool>);
}

interface Swizzle4In1Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In1Out<TNumOrBool> {
    get w(): Node<TNumOrBool>;
    set w(value: NumOrBool<TNumOrBool>);
    get a(): Node<TNumOrBool>;
    set a(value: NumOrBool<TNumOrBool>);
    get q(): Node<TNumOrBool>;
    set q(value: NumOrBool<TNumOrBool>);
}

interface Swizzle1In2Out<TNumOrBool extends NumOrBoolType> {
    get xx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xx(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rr(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set rr(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ss(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ss(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle2In2Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In2Out<TNumOrBool> {
    get xy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xy(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set rg(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get st(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set st(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yx(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gr(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set gr(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ts(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ts(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yy(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set gg(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tt(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set tt(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle3In2Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In2Out<TNumOrBool> {
    get xz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xz(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set rb(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set sp(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yz(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set gb(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set tp(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zx(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get br(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set br(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ps(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ps(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zy(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set bg(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pt(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set pt(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zz(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set bb(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set pp(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle4In2Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In2Out<TNumOrBool> {
    get xw(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xw(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ra(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ra(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set sq(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yw(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yw(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ga(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ga(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set tq(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zw(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zw(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ba(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ba(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set pq(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set wx(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ar(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ar(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qs(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qs(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set wy(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ag(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ag(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qt(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qt(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set wz(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ab(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ab(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qp(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ww(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ww(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aa(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set aa(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qq(value: Node<NumOrBoolToVec2<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle1In3Out<TNumOrBool extends NumOrBoolType> {
    get xxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rrr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sss(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle2In3Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In3Out<TNumOrBool> {
    get xxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rrg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sst(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sts(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tss(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tst(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ggr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tts(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ggg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ttt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle3In3Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In3Out<TNumOrBool> {
    get xxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rrb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ssp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sps(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tsp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ggb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ttp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tps(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tpt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tpp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pss(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pst(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set psp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pts(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ptt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ptp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bbr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pps(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bbg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ppt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bbb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ppp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle4In3Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In3Out<TNumOrBool> {
    get xxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rra(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ssq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rga(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rba(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xwx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rar(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqs(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xwy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rag(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xwz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rab(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xww(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set raa(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gra(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tsq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gga(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ttq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gba(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tpq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gar(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqs(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gag(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gab(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yww(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gaa(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bra(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set psq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bga(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ptq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bba(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ppq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zwx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bar(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqs(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zwy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bag(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zwz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bab(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zww(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set baa(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set arr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qss(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set arg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qst(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set arb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qsp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ara(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ara(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qsq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qts(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aga(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set abr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qps(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set abg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qpt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set abb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qpp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aba(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qpq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wwx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aar(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqs(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wwy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aag(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wwz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aab(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get www(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set www(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aaa(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle1In4Out<TNumOrBool extends NumOrBoolType> {
    get xxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle2In4Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In4Out<TNumOrBool> {
    get xxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sstt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rggr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rggg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sttt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tstt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gggr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gggg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tttt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle3In4Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In4Out<TNumOrBool> {
    get xxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sssp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sstp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sspt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sspp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rggb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sttp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sppt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sppp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tssp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tstp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gggb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tttp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tptt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tptp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tppt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tppp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pssp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pspt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pspp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bggr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bggg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pttt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bggb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pttp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pptt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pptp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pppt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pppp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

interface Swizzle4In4Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In4Out<TNumOrBool> {
    get xxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sssq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sstq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sspq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rrab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rraa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rraa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ssqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sttq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sppq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rarr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rarr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rarg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rarg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rarb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rarb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rara(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ragr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ragg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ragb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get raaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tssq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tstq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get graa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set graa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tttq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yywx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yywy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yywz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ggaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ttqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tptq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tppq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get garr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get garg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get garb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gara(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gagr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gagg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqtt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gagb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqtp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqtq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gaaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pssq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pspq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get braa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set braa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pttq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pptq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pppq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ppqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get barr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get barg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get barb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bara(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqtt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqtp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqtq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get babr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set babr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get babg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set babg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get babb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set babb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get baaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qssp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qssq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get argr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get argg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get argb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get araa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set araa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qsqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aggr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aggg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qttt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aggb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qttp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qttq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wywx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wywy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wywz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qptt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qptp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qptq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qppt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abbb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qppp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qppq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aarr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aarr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqss(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aarg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aarg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aarb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aarb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aara(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aagr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aagg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqtt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aagb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqtp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqtq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aabr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aabg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aabb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqpp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwww(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get aaaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaaa(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
}

type X = "x";
type R = "r";
type S = "s";
type NumOrBoolSwizzleMethods<TNumOrBool extends NumOrBoolType> =
    & {
        [Key in X | R | S as `set${Uppercase<Key>}`]: (value: NumOrBoolVec4OrLess<TNumOrBool>) => Node<TNumOrBool>;
    }
    & {
        [Key in X | R | S as `flip${Uppercase<Key>}`]: () => Node<TNumOrBool>;
    }
    & {
        [Key in `${X}${X}` | `${R}${R}` | `${S}${S}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<TNumOrBool>;
    }
    & {
        [Key in `${X}${X}` | `${R}${R}` | `${S}${S}` as `flip${Uppercase<Key>}`]: () => Node<TNumOrBool>;
    }
    & {
        [Key in `${X}${X}${X}` | `${R}${R}${R}` | `${S}${S}${S}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<TNumOrBool>;
    }
    & {
        [Key in `${X}${X}${X}` | `${R}${R}${R}` | `${S}${S}${S}` as `flip${Uppercase<Key>}`]: () => Node<TNumOrBool>;
    }
    & {
        [Key in `${X}${X}${X}${X}` | `${R}${R}${R}${R}` | `${S}${S}${S}${S}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<TNumOrBool>;
    }
    & {
        [Key in `${X}${X}${X}${X}` | `${R}${R}${R}${R}` | `${S}${S}${S}${S}` as `flip${Uppercase<Key>}`]: () => Node<
            TNumOrBool
        >;
    };
type XY = "x" | "y";
type RG = "r" | "g";
type ST = "s" | "t";
type Vec2SwizzleMethods<TNumOrBool extends NumOrBoolType> =
    & {
        [Key in XY | RG | ST as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec2<TNumOrBool>>;
    }
    & {
        [Key in XY | RG | ST as `flip${Uppercase<Key>}`]: () => Node<NumOrBoolToVec2<TNumOrBool>>;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec2<TNumOrBool>>;
    }
    & {
        [Key in `${XY}${XY}` | `${RG}${RG}` | `${ST}${ST}` as `flip${Uppercase<Key>}`]: () => Node<
            NumOrBoolToVec2<TNumOrBool>
        >;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec2<TNumOrBool>>;
    }
    & {
        [Key in `${XY}${XY}${XY}` | `${RG}${RG}${RG}` | `${ST}${ST}${ST}` as `flip${Uppercase<Key>}`]: () => Node<
            NumOrBoolToVec2<TNumOrBool>
        >;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec2<TNumOrBool>>;
    }
    & {
        [Key in `${XY}${XY}${XY}${XY}` | `${RG}${RG}${RG}${RG}` | `${ST}${ST}${ST}${ST}` as `flip${Uppercase<Key>}`]:
            () => Node<NumOrBoolToVec2<TNumOrBool>>;
    };
type XYZ = "x" | "y" | "z";
type RGB = "r" | "g" | "b";
type STP = "s" | "t" | "p";
type Vec3SwizzleMethods<TNumOrBool extends NumOrBoolType> =
    & {
        [Key in XYZ | RGB | STP as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec3<TNumOrBool>>;
    }
    & {
        [Key in XYZ | RGB | STP as `flip${Uppercase<Key>}`]: () => Node<NumOrBoolToVec3<TNumOrBool>>;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec3<TNumOrBool>>;
    }
    & {
        [Key in `${XYZ}${XYZ}` | `${RGB}${RGB}` | `${STP}${STP}` as `flip${Uppercase<Key>}`]: () => Node<
            NumOrBoolToVec3<TNumOrBool>
        >;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec3<TNumOrBool>>;
    }
    & {
        [Key in `${XYZ}${XYZ}${XYZ}` | `${RGB}${RGB}${RGB}` | `${STP}${STP}${STP}` as `flip${Uppercase<Key>}`]: () =>
            Node<NumOrBoolToVec3<TNumOrBool>>;
    }
    & {
        [
            Key in
                | `${XYZ}${XYZ}${XYZ}${XYZ}`
                | `${RGB}${RGB}${RGB}${RGB}`
                | `${STP}${STP}${STP}${STP}` as `set${Uppercase<Key>}`
        ]: (value: NumOrBoolVec4OrLess<TNumOrBool>) => Node<NumOrBoolToVec3<TNumOrBool>>;
    }
    & {
        [
            Key in
                | `${XYZ}${XYZ}${XYZ}${XYZ}`
                | `${RGB}${RGB}${RGB}${RGB}`
                | `${STP}${STP}${STP}${STP}` as `flip${Uppercase<Key>}`
        ]: () => Node<NumOrBoolToVec3<TNumOrBool>>;
    };
type XYZW = "x" | "y" | "z" | "w";
type RGBA = "r" | "g" | "b" | "a";
type STPQ = "s" | "t" | "p" | "q";
type Vec4SwizzleMethods<TNumOrBool extends NumOrBoolType> =
    & {
        [Key in XYZW | RGBA | STPQ as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec4<TNumOrBool>>;
    }
    & {
        [Key in XYZW | RGBA | STPQ as `flip${Uppercase<Key>}`]: () => Node<NumOrBoolToVec4<TNumOrBool>>;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}` as `set${Uppercase<Key>}`]: (
            value: NumOrBoolVec4OrLess<TNumOrBool>,
        ) => Node<NumOrBoolToVec4<TNumOrBool>>;
    }
    & {
        [Key in `${XYZW}${XYZW}` | `${RGBA}${RGBA}` | `${STPQ}${STPQ}` as `flip${Uppercase<Key>}`]: () => Node<
            NumOrBoolToVec4<TNumOrBool>
        >;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}` as `set${Uppercase<Key>}`]:
            (value: NumOrBoolVec4OrLess<TNumOrBool>) => Node<NumOrBoolToVec4<TNumOrBool>>;
    }
    & {
        [Key in `${XYZW}${XYZW}${XYZW}` | `${RGBA}${RGBA}${RGBA}` | `${STPQ}${STPQ}${STPQ}` as `flip${Uppercase<Key>}`]:
            () => Node<NumOrBoolToVec4<TNumOrBool>>;
    }
    & {
        [
            Key in
                | `${XYZW}${XYZW}${XYZW}${XYZW}`
                | `${RGBA}${RGBA}${RGBA}${RGBA}`
                | `${STPQ}${STPQ}${STPQ}${STPQ}` as `set${Uppercase<Key>}`
        ]: (value: NumOrBoolVec4OrLess<TNumOrBool>) => Node<NumOrBoolToVec4<TNumOrBool>>;
    }
    & {
        [
            Key in
                | `${XYZW}${XYZW}${XYZW}${XYZW}`
                | `${RGBA}${RGBA}${RGBA}${RGBA}`
                | `${STPQ}${STPQ}${STPQ}${STPQ}` as `flip${Uppercase<Key>}`
        ]: () => Node<NumOrBoolToVec4<TNumOrBool>>;
    };

declare module "../core/Node.js" {
    interface NumOrBoolExtensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle1In1Out<TNumOrBool>,
            Swizzle1In2Out<TNumOrBool>,
            Swizzle1In3Out<TNumOrBool>,
            Swizzle1In4Out<TNumOrBool>,
            NumOrBoolSwizzleMethods<TNumOrBool>
    {
    }

    interface NumOrBoolVec2Extensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle2In1Out<TNumOrBool>,
            Swizzle2In2Out<TNumOrBool>,
            Swizzle2In3Out<TNumOrBool>,
            Swizzle2In4Out<TNumOrBool>,
            Vec2SwizzleMethods<TNumOrBool>
    {
    }

    interface NumOrBoolVec3Extensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle3In1Out<TNumOrBool>,
            Swizzle3In2Out<TNumOrBool>,
            Swizzle3In3Out<TNumOrBool>,
            Swizzle3In4Out<TNumOrBool>,
            Vec3SwizzleMethods<TNumOrBool>
    {
    }

    interface ColorExtensions
        extends
            Swizzle3In1Out<"float">,
            Swizzle3In2Out<"float">,
            Swizzle3In3Out<"float">,
            Swizzle3In4Out<"float">,
            Vec3SwizzleMethods<"float">
    {
    }

    interface NumOrBoolVec4Extensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle4In1Out<TNumOrBool>,
            Swizzle4In2Out<TNumOrBool>,
            Swizzle4In3Out<TNumOrBool>,
            Swizzle4In4Out<TNumOrBool>,
            Vec4SwizzleMethods<TNumOrBool>
    {
    }
}

/** anything that can be passed to {@link nodeObject} */
export type NodeObjectOption = Node | number | string;

// same logic as in ShaderNodeObject: number,boolean,node->node, otherwise do nothing
export type NodeObject<T> = T extends Node ? T
    : T extends number ? Node<"float">
    : T extends boolean ? Node<"bool">
    : T;

// opposite of NodeObject: node -> node|boolean|number, otherwise do nothing
type Proxied<T> = T extends Node | number ? Node | number : T;
// https://github.com/microsoft/TypeScript/issues/42435#issuecomment-765557874
export type ProxiedTuple<T extends readonly [...unknown[]]> = [...{ [index in keyof T]: Proxied<T[index]> }];
export type ProxiedObject<T> = { [index in keyof T]: Proxied<T[index]> };
type RemoveTail<T extends readonly [...unknown[]]> = T extends [unknown, ...infer X] ? X : [];
type RemoveHeadAndTail<T extends readonly [...unknown[]]> = T extends [unknown, ...infer X, unknown] ? X : [];

/**
 * Temporary type to save signatures of 4 constructors. Each element may be tuple or undefined.
 *
 * We use an object instead of tuple or union as it makes stuff easier, especially in Typescript 4.0.
 */
interface Constructors<
    A extends undefined | [...unknown[]],
    B extends undefined | [...unknown[]],
    C extends undefined | [...unknown[]],
    D extends undefined | [...unknown[]],
> {
    a: A;
    b: B;
    c: C;
    d: D;
}

/**
 * Returns all constructors
 *
 * <https://github.com/microsoft/TypeScript/issues/37079>
 * <https://stackoverflow.com/a/52761156/1623826>
 */
type OverloadedConstructorsOf<T> = T extends {
    new(...args: infer A1): unknown;
    new(...args: infer A2): unknown;
    new(...args: infer A3): unknown;
    new(...args: infer A4): unknown;
} ? Constructors<A1, A2, A3, A4>
    : T extends {
        new(...args: infer A1): unknown;
        new(...args: infer A2): unknown;
        new(...args: infer A3): unknown;
    } ? Constructors<A1, A2, A3, undefined>
    : T extends {
        new(...args: infer A1): unknown;
        new(...args: infer A2): unknown;
    } ? Constructors<A1, A2, undefined, undefined>
    : T extends new(...args: infer A) => unknown ? Constructors<A, undefined, undefined, undefined>
    : Constructors<undefined, undefined, undefined, undefined>;

type AnyConstructors = Constructors<any, any, any, any>;

/**
 * Returns all constructors where the first parameter is assignable to given "scope"
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type FilterConstructorsByScope<T extends AnyConstructors, S> = {
    a: S extends T["a"][0] ? T["a"] : undefined;
    b: S extends T["b"][0] ? T["b"] : undefined;
    c: S extends T["c"][0] ? T["c"] : undefined;
    d: S extends T["d"][0] ? T["d"] : undefined;
};
/**
 * "flattens" the tuple into an union type
 */
type ConstructorUnion<T extends AnyConstructors> =
    | Exclude<T["a"], undefined>
    | Exclude<T["b"], undefined>
    | Exclude<T["c"], undefined>
    | Exclude<T["d"], undefined>;

/**
 * Extract list of possible scopes - union of the first parameter
 * of all constructors, should it be string
 */
type ExtractScopes<T extends AnyConstructors> =
    | (T["a"][0] extends string ? T["a"][0] : never)
    | (T["b"][0] extends string ? T["b"][0] : never)
    | (T["c"][0] extends string ? T["c"][0] : never)
    | (T["d"][0] extends string ? T["d"][0] : never);

type GetConstructorsByScope<T, S> = ConstructorUnion<FilterConstructorsByScope<OverloadedConstructorsOf<T>, S>>;
type GetConstructors<T> = ConstructorUnion<OverloadedConstructorsOf<T>>;
type GetPossibleScopes<T> = ExtractScopes<OverloadedConstructorsOf<T>>;

type NodeArray<T extends NodeObjectOption[]> = { [index in keyof T]: NodeObject<T[index]> };
type NodeObjects<T> = { [key in keyof T]: T[key] extends NodeObjectOption ? NodeObject<T[key]> : T[key] };
type ConstructedNode<T> = T extends new(...args: any[]) => infer R ? (R extends Node ? R : never) : never;

export type NodeOrType = Node | string;

type ShaderCallNodeInternal<TNodeType> = Node<TNodeType>;

type ShaderNodeInternal<TNodeType> = Node<TNodeType>;

export const defined: (v: unknown) => unknown;

export const getConstNodeType: (value: NodeOrType) => string | null;

export class ShaderNode<T = {}, R extends Node = Node> {
    constructor(jsFunc: (inputs: NodeObjects<T>, builder: NodeBuilder) => R);
    call: (
        inputs: { [key in keyof T]: T[key] extends Node ? Node : T[key] },
        builder?: NodeBuilder,
    ) => R;
}

export function nodeObject<T extends NodeObjectOption>(obj: T): NodeObject<T>;
export function nodeObjectIntent<T extends NodeObjectOption>(obj: T): NodeObject<T>;
export function nodeObjects<T>(obj: T): NodeObjects<T>;

export function nodeArray<T extends NodeObjectOption[]>(obj: readonly [...T]): NodeArray<T>;

export function nodeProxy<T>(
    nodeClass: T,
): (...params: ProxiedTuple<GetConstructors<T>>) => ConstructedNode<T>;

export function nodeProxy<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
): (...params: ProxiedTuple<RemoveTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

export function nodeProxy<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
    factor: NodeObjectOption,
): (...params: ProxiedTuple<RemoveHeadAndTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

export function nodeImmutable<T>(
    nodeClass: T,
    ...params: ProxiedTuple<GetConstructors<T>>
): ConstructedNode<T>;

export function nodeProxyIntent<T>(
    nodeClass: T,
): (...params: ProxiedTuple<GetConstructors<T>>) => ConstructedNode<T>;

export function nodeProxyIntent<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
): (...params: ProxiedTuple<RemoveTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

export function nodeProxyIntent<T, S extends GetPossibleScopes<T>>(
    nodeClass: T,
    scope: S,
    factor: NodeObjectOption,
): (...params: ProxiedTuple<RemoveHeadAndTail<GetConstructorsByScope<T, S>>>) => ConstructedNode<T>;

interface Layout {
    name: string;
    type: string;
    inputs: {
        name: string;
        type: string;
        qualifier?: "in" | "out" | "inout";
    }[];
}

export interface FnNode<Args extends readonly unknown[], TReturn> {
    (...args: Args): TReturn extends void ? ShaderCallNodeInternal<void> : TReturn;

    shaderNode: ShaderNodeInternal<TReturn>;
    id: number;

    getNodeType: (builder: NodeBuilder) => string | null;
    getCacheKey: (force?: boolean) => number;

    setLayout: (layout: Layout) => this;

    once: (subBuilds?: string[] | null) => this;
}

export function Fn<TReturn>(
    jsFunc: (builder: NodeBuilder) => TReturn,
    layout?: string | Record<string, string>,
): FnNode<[], TReturn>;
export function Fn<TArgs extends readonly unknown[], TReturn>(
    jsFunc: (args: TArgs, builder: NodeBuilder) => TReturn,
    layout?: string | Record<string, string>,
): FnNode<ProxiedTuple<TArgs>, TReturn>;
export function Fn<TArgs extends { readonly [key: string]: unknown }, TReturn>(
    jsFunc: (args: TArgs, builder: NodeBuilder) => TReturn,
    layout?: string | Record<string, string>,
): FnNode<[ProxiedObject<TArgs>], TReturn>;

export const setCurrentStack: (stack: StackNode | null) => void;

export const getCurrentStack: () => StackNode | null;

export const If: (boolNode: Node, method: () => void) => StackNode;
export const Switch: (expression: Node) => StackNode;

export function Stack(node: Node): Node;

declare module "../core/Node.js" {
    interface NodeElements {
        toStack: () => Node;
        toStackAssign: () => this;
    }
}

interface ColorFunction {
    // The first branch in `ConvertType` will forward the parameters to the `Color` constructor if there are no
    //   parameters or all the parameters are non-objects
    (color?: string | number): ConstNode<"color", Color>;
    (r: number, g: number, b: number): ConstNode<"color", Color>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (color: Color): ConstNode<"color", Color>;
    (node: Node): Node<"color">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object. Not sure which cases are worth considering here.
}

export const color: ColorFunction;

interface FloatFunction {
    (value?: number): ConstNode<"float", number>;
    (node: Node): Node<"float">;
}

export const float: FloatFunction;

interface IntFunction {
    (value?: number): ConstNode<"int", number>;
    (node: Node): Node<"int">;
}

export const int: IntFunction;

interface UintFunction {
    (value?: number): ConstNode<"uint", number>;
    (node: Node): Node<"uint">;
}

export const uint: UintFunction;

interface BooleanFunction {
    (value?: boolean): ConstNode<"bool", number>;
    (node: Node): Node<"bool">;
}

export const bool: BooleanFunction;

interface Vector2Function {
    // The first branch in `ConvertType` will forward the parameters to the `Vector2` constructor if there are no
    //   parameters or all the parameters are non-objects
    (x?: number, y?: number): ConstNode<"vec2", Vector2>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (value: Vector2): ConstNode<"vec2", Vector2>;
    (node: Node): Node<"vec2">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object.
    (x: Node | number, y: Node | number): Node<"vec2">;
}

export const vec2: Vector2Function;
export const ivec2: (node: Node) => Node<"ivec2">;
export const uvec2: (x: Node<"uint">, y: Node<"uint">) => Node<"uvec2">;
export const bvec2: (node: Node) => Node<"bvec2">;

interface Vector3Function {
    // The first branch in `ConvertType` will forward the parameters to the `Vector3` constructor if there are no
    //   parameters or all the parameters are non-objects
    (x?: number, y?: number, z?: number): ConstNode<"vec3", Vector3>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (value: Vector3): ConstNode<"vec3", Vector3>;
    (node: Node): Node<"vec3">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object.
    (x: Node | number, y: Node | number, z?: Node | number): Node<"vec3">;
}

export const vec3: Vector3Function;
export const ivec3: (node: Node) => Node<"ivec3">;
export const uvec3: (node: Node) => Node<"uvec3">;
export const bvec3: (node: Node) => Node<"bvec3">;

interface Vector4Function {
    // The first branch in `ConvertType` will forward the parameters to the `Vector4` constructor if there are no
    //   parameters or all the parameters are non-objects
    (x?: number, y?: number, z?: number, w?: number): ConstNode<"vec4", Vector4>;

    // The second branch does not apply because `cacheMap` is `null`

    // The third branch will be triggered if there is a single parameter.
    (value: Vector4): ConstNode<"vec4", Vector4>;
    (node: Node): Node<"vec4">;

    // The fall-through branch will be triggered if there is more than one parameter, or one of the parameters is an
    // object.
    (x: Node | number, y: Node | number, z?: Node | number, w?: Node | number): Node<"vec4">;
}

export const vec4: Vector4Function;
export const ivec4: (node: Node) => Node<"ivec4">;
export const uvec4: (node: Node) => Node<"uvec4">;
export const bvec4: (node: Node) => Node<"bvec4">;

interface Matrix2Function {
    (value: Matrix2): ConstNode<"mat2", Matrix2>;
    (node: Node): Node<"mat2">;
}

export const mat2: Matrix2Function;

interface Matrix3Function {
    (value: Matrix3): ConstNode<"mat3", Matrix3>;
    (
        n11: number | Node,
        n12: number | Node,
        n13: number | Node,
        n21: number | Node,
        n22: number | Node,
        n23: number | Node,
        n31: number | Node,
        n32: number | Node,
        n33: number | Node,
    ): Node<"mat3">;
    (): ConstNode<"mat3", Matrix3>;
    (
        p1: Node,
        p2: Node,
        p3: Node,
    ): Node<"mat3">;
    (node: Node): Node<"mat3">;
}

export const mat3: Matrix3Function;

interface Matrix4Function {
    (value: Matrix4): ConstNode<"mat4", Matrix4>;
    (
        n11: number | Node,
        n12: number | Node,
        n13: number | Node,
        n14: number | Node,
        n21: number | Node,
        n22: number | Node,
        n23: number | Node,
        n24: number | Node,
        n31: number | Node,
        n32: number | Node,
        n33: number | Node,
        n34: number | Node,
        n41: number | Node,
        n42: number | Node,
        n43: number | Node,
        n44: number | Node,
    ): Node<"mat4">;
    (): ConstNode<"mat4", Matrix4>;
    (
        p1: Node,
        p2: Node,
        p3: Node,
        p4: Node,
    ): Node<"mat4">;
    (node: Node): Node<"mat4">;
}

export const mat4: Matrix4Function;

export const string: (value?: string) => Node<"string">;
export const arrayBuffer: (value: ArrayBuffer) => Node<"ArrayBuffer">;

declare module "../core/Node.js" {
    interface NodeElements {
        toColor: () => Node<"color">;
        toColorAssign: () => this;

        toFloat: () => Node<"float">;
        toFloatAssign: () => this;

        toInt: () => Node<"int">;
        toIntAssign: () => this;

        toUint: () => Node<"uint">;
        toUintAssign: () => this;

        toBool: () => Node<"bool">;
        toBoolAssign: () => this;

        toVec2: () => Node<"vec2">;
        toVec2Assign: () => this;

        toIVec2: () => Node<"ivec2">;
        toIVec2Assign: () => this;

        toUVec2: () => Node<"uvec2">;
        toUVec2Assign: () => this;

        toBVec2: () => Node<"bvec2">;
        toBVec2Assign: () => this;

        toVec3: () => Node<"vec3">;
        toVec3Assign: () => this;

        toIVec3: () => Node<"ivec3">;
        toIVec3Assign: () => this;

        toUVec3: () => Node<"uvec3">;
        toUVec3Assign: () => this;

        toBVec3: () => Node<"bvec3">;
        toBVec3Assign: () => this;

        toVec4: () => Node<"vec4">;
        toVec4Assign: () => this;

        toIVec4: () => Node<"ivec4">;
        toIVec4Assign: () => this;

        toUVec4: () => Node<"uvec4">;
        toUVec4Assign: () => this;

        toBVec4: () => Node<"bvec4">;
        toBVec4Assign: () => this;

        toMat2: () => Node<"mat2">;
        toMat2Assign: () => this;

        toMat3: () => Node<"mat3">;
        toMat3Assign: () => this;

        toMat4: () => Node<"mat4">;
        toMat4Assign: () => this;
    }
}

export const element: (node: Node, indexNode: Node) => Node;
export const convert: (node: Node, types: string) => Node;
export const split: (node: Node, channels?: string) => Node;

declare module "../core/Node.js" {
    interface NodeElements {
        element: (indexNode: Node) => Node;
        elementAssign: (indexNode: Node) => this;

        convert: (types: string) => Node;
        convertAssign: (types: string) => this;
    }
}

/**
 * @deprecated append() has been renamed to Stack().
 */
export const append: (node: Node) => Node;

declare module "../core/Node.js" {
    interface NodeElements {
        /**
         * @deprecated append() has been renamed to Stack().
         */
        append: () => Node;
        /**
         * @deprecated append() has been renamed to Stack().
         */
        appendAssign: () => this;
    }
}

export {};
