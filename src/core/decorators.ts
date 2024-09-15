import { METHOD_METADATA } from "./constants";

export function methodDecoratorFactory(event: string) {
  return (target: object, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    const methods = Reflect.getMetadata(METHOD_METADATA, target.constructor) ?? [];

    methods.push({ methodName, event });

    Reflect.defineMetadata(METHOD_METADATA, methods, target.constructor);

    return descriptor;
  };
}
