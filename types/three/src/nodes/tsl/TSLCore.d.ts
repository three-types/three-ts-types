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
    set x(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get r(): Node<TNumOrBool>;
    set r(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get s(): Node<TNumOrBool>;
    set s(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle2In1Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In1Out<TNumOrBool> {
    get y(): Node<TNumOrBool>;
    set y(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get g(): Node<TNumOrBool>;
    set g(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get t(): Node<TNumOrBool>;
    set t(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle3In1Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In1Out<TNumOrBool> {
    get z(): Node<TNumOrBool>;
    set z(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get b(): Node<TNumOrBool>;
    set b(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get p(): Node<TNumOrBool>;
    set p(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle4In1Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In1Out<TNumOrBool> {
    get w(): Node<TNumOrBool>;
    set w(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get a(): Node<TNumOrBool>;
    set a(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get q(): Node<TNumOrBool>;
    set q(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle1In2Out<TNumOrBool extends NumOrBoolType> {
    get xx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rr(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set rr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ss(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ss(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle2In2Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In2Out<TNumOrBool> {
    get xy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set rg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get st(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set st(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gr(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set gr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ts(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set gg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tt(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set tt(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle3In2Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In2Out<TNumOrBool> {
    get xz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set rb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set sp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set gb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set tp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get br(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set br(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ps(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set bg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pt(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set pt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set bb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set pp(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle4In2Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In2Out<TNumOrBool> {
    get xw(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set xw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ra(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set sq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yw(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set yw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ga(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set tq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zw(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set zw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ba(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set pq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set wx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ar(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qs(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wy(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set wy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ag(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qt(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wz(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set wz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ab(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qp(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ww(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set ww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aa(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set aa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qq(): Node<NumOrBoolToVec2<TNumOrBool>>;
    set qq(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle1In3Out<TNumOrBool extends NumOrBoolType> {
    get xxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sss(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle2In3Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In3Out<TNumOrBool> {
    get xxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ggr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ggg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ttt(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle3In3Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In3Out<TNumOrBool> {
    get xxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ssp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ggb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ttp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set psp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ptt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ptp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ppt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ppp(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle4In3Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In3Out<TNumOrBool> {
    get xxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ssq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set raa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set sqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ttq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set psq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ptq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ppq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set baa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set arr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set arg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set arb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ara(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ara(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set abr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set abg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set abb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get www(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set www(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set aaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle1In4Out<TNumOrBool extends NumOrBoolType> {
    get xxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssss(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle2In4Out<TNumOrBool extends NumOrBoolType> extends Swizzle1In4Out<TNumOrBool> {
    get xxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sstt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rggr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rggg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sttt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tstt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gggr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gggg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tttt(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle3In4Out<TNumOrBool extends NumOrBoolType> extends Swizzle2In4Out<TNumOrBool> {
    get xxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sssp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sstp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sspt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sspp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rggb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sttp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sppt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sppp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tssp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tstp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gggb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tttp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tptt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tptp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tppt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tppp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pssp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pspt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pspp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bggr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bggg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pttt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bggb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pttp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pptt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pptp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pppt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pppp(value: NumOrBoolVec4OrLess<TNumOrBool>);
}

interface Swizzle4In4Out<TNumOrBool extends NumOrBoolType> extends Swizzle3In4Out<TNumOrBool> {
    get xxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sssq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sstq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sspq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rrab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rrab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xxww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rraa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rraa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ssqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ssqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sttq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rgaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get stqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sppq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get spqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rarr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rarr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rarg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rarg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rarb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rarb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rara(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ragr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ragg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ragb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get rabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get xwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get raaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set raaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get sqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tssq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tstq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get grab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get graa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set graa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tsqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tttq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yywx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yywy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yywz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yyww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ggaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ggaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ttqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ttqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tptq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tppq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get yzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tpqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get garr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get garg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get garb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gara(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gagr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gagg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqtt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gagb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqtp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqtq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ywww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get gaaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gaaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get tqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pssq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pspq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get brab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get braa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set braa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get psqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pttq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bgaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ptqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pptq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pppq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zzww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bbaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get ppqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ppqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get barr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get barg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get barb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bara(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqtt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get bagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqtp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqtq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get babr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set babr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get babg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set babg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get babb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set babb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get zwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get baaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set baaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get pqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qssp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qssq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get argr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get argg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get argb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get arab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get araa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set araa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qsqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qsqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aggr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aggg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qttt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aggb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qttp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qttq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wywx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wywy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wywz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get agaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qtqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abra(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qptt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qptp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qptq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abbr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abbg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qppt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abbb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qppp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qppq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get abaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qpqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aarr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aarr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqss(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aarg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aarg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqst(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aarb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aarb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqsp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwxw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aara(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqsq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aagr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqts(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aagg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqtt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aagb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqtp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwyw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaga(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqtq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aabr(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqps(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aabg(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqpt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aabb(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqpp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwzw(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaba(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqpq(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwwx(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaar(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqs(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwwy(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaag(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqt(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwwz(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaab(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqp(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get wwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wwww(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get aaaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set aaaa(value: NumOrBoolVec4OrLess<TNumOrBool>);
    get qqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qqqq(value: NumOrBoolVec4OrLess<TNumOrBool>);
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
