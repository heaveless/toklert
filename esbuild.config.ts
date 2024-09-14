import * as esbuild from "esbuild";
import * as path from "path";
import * as glob from "glob";
import * as tsJson from "./tsconfig.json"

const sourcePath = path.resolve(__dirname, tsJson.compilerOptions.rootDir);
const distributionPath = path.resolve(__dirname, tsJson.compilerOptions.outDir);

const entryPoints = glob.globSync("**/*.ts", {
  cwd: sourcePath,
}).map((file) => path.resolve(sourcePath, file));

const buildOptions: esbuild.BuildOptions = {
  entryPoints,
  bundle: true,
  platform: "node",
  outdir: distributionPath,
  external: [],
  format: "cjs",
};

esbuild.build(buildOptions);
