import { PROCESS_METADATA, METHOD_METADATA } from "./constants";
import { ClassConstructor } from "./types";

export class Reflector {
  getProcessMetadata(process: ClassConstructor) {
    const metadata = Reflect.getMetadata(PROCESS_METADATA, process) ?? {};
    const methods = Reflect.getMetadata(METHOD_METADATA, process) ?? [];

    return { ...metadata, methods };
  }

  getMetadata(key: string, target: any, propertyKey: string) {
    return Reflect.getMetadata(key, target, propertyKey);
  }
}
