import { PROCESS_METADATA } from "../constants";
import { ClassConstructor } from "../types";

interface ProcessOptions {
  command: string;
  path: string;
}

export function Process(opts: ProcessOptions) {
  return (target: ClassConstructor) => {
    Reflect.defineMetadata(PROCESS_METADATA, opts, target);
  }
}
