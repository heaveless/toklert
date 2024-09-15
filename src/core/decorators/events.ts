import { methodDecoratorFactory } from "../decorators";

export function OnSuccess(event: string) {
  return methodDecoratorFactory(event);
}

export function OnError(event: string) {
  return methodDecoratorFactory(event);
}

export function On(event: string) {
  return methodDecoratorFactory(event);
}
