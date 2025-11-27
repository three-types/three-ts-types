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

interface Swizzle1From1<TNumOrBool extends NumOrBoolType> {
    get x(): Node<TNumOrBool>;
    set x(value: NumOrBool<TNumOrBool>);
    get r(): Node<TNumOrBool>;
    set r(value: NumOrBool<TNumOrBool>);
    get s(): Node<TNumOrBool>;
    set s(value: NumOrBool<TNumOrBool>);
}

interface Swizzle1From2<TNumOrBool extends NumOrBoolType> extends Swizzle1From1<TNumOrBool> {
    get y(): Node<TNumOrBool>;
    set y(value: NumOrBool<TNumOrBool>);
    get g(): Node<TNumOrBool>;
    set g(value: NumOrBool<TNumOrBool>);
    get t(): Node<TNumOrBool>;
    set t(value: NumOrBool<TNumOrBool>);
}

interface Swizzle1From3<TNumOrBool extends NumOrBoolType> extends Swizzle1From2<TNumOrBool> {
    get z(): Node<TNumOrBool>;
    set z(value: NumOrBool<TNumOrBool>);
    get b(): Node<TNumOrBool>;
    set b(value: NumOrBool<TNumOrBool>);
    get p(): Node<TNumOrBool>;
    set p(value: NumOrBool<TNumOrBool>);
}

interface Swizzle1From4<TNumOrBool extends NumOrBoolType> extends Swizzle1From3<TNumOrBool> {
    get w(): Node<TNumOrBool>;
    set w(value: NumOrBool<TNumOrBool>);
    get a(): Node<TNumOrBool>;
    set a(value: NumOrBool<TNumOrBool>);
    get q(): Node<TNumOrBool>;
    set q(value: NumOrBool<TNumOrBool>);
}

interface Swizzle2From1<TNumOrBool extends NumOrBoolType> {
    get xx(): Node<NumOrBoolToVec2<TNumOrBool>>;
    get rr(): Node<NumOrBoolToVec2<TNumOrBool>>;
    get ss(): Node<NumOrBoolToVec2<TNumOrBool>>;
}

interface Swizzle2From2<TNumOrBool extends NumOrBoolType> extends Swizzle2From1<TNumOrBool> {
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
    get gg(): Node<NumOrBoolToVec2<TNumOrBool>>;
    get tt(): Node<NumOrBoolToVec2<TNumOrBool>>;
}

interface Swizzle2From3<TNumOrBool extends NumOrBoolType> extends Swizzle2From2<TNumOrBool> {
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
    get bb(): Node<NumOrBoolToVec2<TNumOrBool>>;
    get pp(): Node<NumOrBoolToVec2<TNumOrBool>>;
}

interface Swizzle2From4<TNumOrBool extends NumOrBoolType> extends Swizzle2From3<TNumOrBool> {
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
    get aa(): Node<NumOrBoolToVec2<TNumOrBool>>;
    get qq(): Node<NumOrBoolToVec2<TNumOrBool>>;
}

interface Swizzle3From1<TNumOrBool extends NumOrBoolType> {
    get xxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rrr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get sss(): Node<NumOrBoolToVec3<TNumOrBool>>;
}

interface Swizzle3From2<TNumOrBool extends NumOrBoolType> extends Swizzle3From1<TNumOrBool> {
    get xxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rrg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get sst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get xyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rgr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get sts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get xyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rgg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get stt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get grr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get grg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ggr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ggg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ttt(): Node<NumOrBoolToVec3<TNumOrBool>>;
}

interface Swizzle3From3<TNumOrBool extends NumOrBoolType> extends Swizzle3From2<TNumOrBool> {
    get xxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rrb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ssp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get xyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xyz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rgb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set stp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get sps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get xzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set xzy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set rbg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set spt(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get spp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set grb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tsp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ggb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ttp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yzx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gbr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tps(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get gbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tpt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get gbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tpp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get brr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get pss(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zxy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zxy(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set brg(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pst(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pst(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get brb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get psp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set zyx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set bgr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set pts(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get bgg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ptt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get bgb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ptp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zzx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get bbr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get pps(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zzy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get bbg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ppt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zzz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get bbb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ppp(): Node<NumOrBoolToVec3<TNumOrBool>>;
}

interface Swizzle3From4<TNumOrBool extends NumOrBoolType> extends Swizzle3From3<TNumOrBool> {
    get xxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get rra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ssq(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get rar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get sqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get raa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get sqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get yxw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set yxw(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gra(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gra(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tsq(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get gga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ttq(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get gag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ywz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set ywz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set gab(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set tqp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get gaa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get tqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get bba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get ppq(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get bab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get pqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get zww(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get baa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get pqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wxx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get arr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qss(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get ara(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qsq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wyx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyx(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agr(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agr(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qts(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qts(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get agg(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qtt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wyz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set wyz(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set agb(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    set qtp(value: Node<NumOrBoolToVec3<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get aga(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qtq(): Node<NumOrBoolToVec3<TNumOrBool>>;
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
    get abb(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qpp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wzw(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get aba(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qpq(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wwx(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get aar(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qqs(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wwy(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get aag(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qqt(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get wwz(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get aab(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qqp(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get www(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get aaa(): Node<NumOrBoolToVec3<TNumOrBool>>;
    get qqq(): Node<NumOrBoolToVec3<TNumOrBool>>;
}

interface Swizzle4From1<TNumOrBool extends NumOrBoolType> {
    get xxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssss(): Node<NumOrBoolToVec4<TNumOrBool>>;
}

interface Swizzle4From2<TNumOrBool extends NumOrBoolType> extends Swizzle4From1<TNumOrBool> {
    get xxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
}

interface Swizzle4From3<TNumOrBool extends NumOrBoolType> extends Swizzle4From2<TNumOrBool> {
    get xxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
}

interface Swizzle4From4<TNumOrBool extends NumOrBoolType> extends Swizzle4From3<TNumOrBool> {
    get xxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rrab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rraa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ssqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xyzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stpq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xywz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rgab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rgab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get stqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set stqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rgaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get stqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sptq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xzwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rbag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get spqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set spqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get spqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rarr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rarg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rarb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ragr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ragg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ragb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ragb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqtp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get raga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set xwzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get rabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set rabg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get sqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set sqpt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get xwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get rabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get raba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get raar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get raag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get raab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get xwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get raaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get sqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxzw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grba(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tspq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get grag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yxwz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get grab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set grab(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tsqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tsqp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get graa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tsqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ggaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ttqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set yzwx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gbar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tpqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tpqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get yzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get yzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tpqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get garr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get garg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get garb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set garb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gaga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ywzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get gabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set gabr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get tqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set tqps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ywzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gaba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gaar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gaag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gaab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ywww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get gaaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get tqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxyw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brga(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pstq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zxwy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get brag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set brag(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get psqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set psqt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get brab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get braa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get psqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zyxw(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgra(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptsq(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zywx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bgar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bgar(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get ptqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set ptqs(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bgaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ptqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bbaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get ppqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get barr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get barg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set barg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get barb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set zwyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get bagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set bagr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get pqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set pqts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get zwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get bagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get baga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get babr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get babg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get babb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get baba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get baar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get baag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get baab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get zwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get baaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get pqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qssp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qssq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get argr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get argg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qstt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxyz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get argb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set argb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qstp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qstp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qstq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wxzy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get arbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set arbg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qspt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qspt(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wxzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qspp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qspq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get arab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wxww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get araa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qsqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyxz(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agrb(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtsp(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aggr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aggg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qttt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aggb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qttp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qttq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wyzx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get agbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set agbr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qtps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qtps(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wyzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wywx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wywy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wywz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wyww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get agaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qtqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abrr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzxy(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abrg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abrg(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpst(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abrb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abra(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set wzyx(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get abgr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set abgr(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get qpts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    set qpts(value: Node<NumOrBoolToVec4<TNumOrBool>> | NumOrBool<TNumOrBool>);
    get wzyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abgg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qptt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abgb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qptp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qptq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abbr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abbg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qppt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abbb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qppp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qppq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wzww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get abaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qpqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwxx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aarr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqss(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwxy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aarg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqst(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwxz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aarb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqsp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwxw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aara(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqsq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwyx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aagr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqts(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwyy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aagg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqtt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwyz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aagb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqtp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwyw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aaga(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqtq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwzx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aabr(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqps(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwzy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aabg(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqpt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwzz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aabb(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqpp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwzw(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aaba(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqpq(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwwx(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aaar(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqqs(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwwy(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aaag(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqqt(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwwz(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aaab(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqqp(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get wwww(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get aaaa(): Node<NumOrBoolToVec4<TNumOrBool>>;
    get qqqq(): Node<NumOrBoolToVec4<TNumOrBool>>;
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
            Swizzle1From1<TNumOrBool>,
            Swizzle2From1<TNumOrBool>,
            Swizzle3From1<TNumOrBool>,
            Swizzle4From1<TNumOrBool>,
            NumOrBoolSwizzleMethods<TNumOrBool>
    {
    }

    interface NumOrBoolVec2Extensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle1From2<TNumOrBool>,
            Swizzle2From2<TNumOrBool>,
            Swizzle3From2<TNumOrBool>,
            Swizzle4From2<TNumOrBool>,
            Vec2SwizzleMethods<TNumOrBool>
    {
    }

    interface NumOrBoolVec3Extensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle1From3<TNumOrBool>,
            Swizzle2From3<TNumOrBool>,
            Swizzle3From3<TNumOrBool>,
            Swizzle4From3<TNumOrBool>,
            Vec3SwizzleMethods<TNumOrBool>
    {
    }

    interface ColorExtensions
        extends
            Swizzle1From3<"float">,
            Swizzle2From3<"float">,
            Swizzle3From3<"float">,
            Swizzle4From3<"float">,
            Vec3SwizzleMethods<"float">
    {
    }

    interface NumOrBoolVec4Extensions<TNumOrBool extends NumOrBoolType>
        extends
            Swizzle1From4<TNumOrBool>,
            Swizzle2From4<TNumOrBool>,
            Swizzle3From4<TNumOrBool>,
            Swizzle4From4<TNumOrBool>,
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
