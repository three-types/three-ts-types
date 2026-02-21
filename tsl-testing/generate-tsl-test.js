import * as fs from "node:fs";
import * as path from "node:path";

import prettier from "prettier";

const filePath = "../three.js/src/nodes/tsl/TSLCore.js";
const outFile = "./tsl-test/TSLCore.test.js";

const fileContents = fs.readFileSync(filePath, { encoding: "utf-8" });
const options = await prettier.resolveConfig(filePath);
const formattedFile = await prettier.format(fileContents, {
  ...options,
  parser: "babel",
});

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, formattedFile);
