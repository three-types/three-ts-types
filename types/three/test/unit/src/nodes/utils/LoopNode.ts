import { bool, Break, float, Fn, int, Loop, uint, vec2 } from "three/tsl";
import { Node } from "three/webgpu";

Fn(() => {
    Loop(
        { name: "bucket", type: "uint", start: uint(0), end: uint(4) },
        ({ bucket }) => {
            const index: Node<"uint"> = bucket;
            bucket.add(1);
            // @ts-expect-error A named uint loop does not expose an int index.
            const wrong: Node<"int"> = bucket;
        },
    );

    Loop({ end: 4 }, ({ i }) => {
        const index: Node<"int"> = i;
    });
    Loop({ start: 4 }, ({ i }) => {
        const index: Node<"int"> = i;
    });
    Loop({ start: uint(0), end: uint(4) }, ({ i }) => {
        const index: Node<"int"> = i;
    });
    Loop(uint(4), ({ i }) => {
        const index: Node<"int"> = i;
    });
    Loop(float(4), ({ i }) => {
        const index: Node<"int"> = i;
    });

    Loop(4, 2, ({ i, j }) => {
        const first: Node<"int"> = i;
        const second: Node<"int"> = j;
        i.add(j);
    });
    Loop(4, 2, 3, 1, ({ i, j, k, l }) => {
        const third: Node<"int"> = k;
        const fourth: Node<"int"> = l;
        i.add(j).add(k).add(l);
    });

    Loop({ type: "uint", end: uint(4) }, { type: "float", end: float(1) }, ({ i, j }) => {
        const first: Node<"uint"> = i;
        const second: Node<"float"> = j;
        // @ts-expect-error Each loop parameter determines its own index type.
        const wrong: Node<"uint"> = j;
    });

    Loop(
        { name: "value", type: "float", start: float(0), end: float(1) },
        { name: "bucket", type: "uint", start: uint(0), end: uint(4) },
        inputs => {
            const { value, bucket } = inputs;
            const first: Node<"float"> = value;
            const second: Node<"uint"> = bucket;
            // @ts-expect-error Named loops do not introduce a default i key.
            inputs.i;
        },
    );

    Loop(
        4,
        { name: "bucket", type: "uint", end: uint(4) },
        int(2),
        ({ i, bucket, k }) => {
            const first: Node<"int"> = i;
            const second: Node<"uint"> = bucket;
            const third: Node<"int"> = k;
        },
    );

    const parameters = [
        2,
        { name: "value", type: "float", start: float(0), end: float(1) },
    ] as const;
    Loop(...parameters, ({ i, value }) => {
        const first: Node<"int"> = i;
        const second: Node<"float"> = value;
    });

    Loop(bool(false), () => {
        Break();
    });
    Loop(() => {
        Break();
    });

    // @ts-expect-error A range must provide start or end.
    Loop({}, () => {});
    // @ts-expect-error Vector nodes are not scalar loop bounds.
    Loop(vec2(1), () => {});
    // @ts-expect-error The loop variable type must be numeric.
    Loop({ type: "bool", end: 4 }, () => {});
    // @ts-expect-error An explicit uint range requires uint nodes or JS numbers.
    Loop({ type: "uint", start: float(0), end: uint(4) }, () => {});
    // @ts-expect-error Boolean conditions do not provide a numeric loop variable.
    Loop(bool(false), ({ i }) => {
        i.add(1);
    });
    // @ts-expect-error A named loop does not expose its default variable name.
    Loop({ name: "bucket", end: 4 }, ({ i }) => {
        i.add(1);
    });
});
