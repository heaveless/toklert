import { ID_METADATA } from "./constants";
import { ClassConstructor } from "./types";

export class Container {
  providers = new Map<string, ClassConstructor>;

  get<T>(injectable: ClassConstructor): T {
    const token = injectable.name;
    return this.resolve(token);
  }

  getAll(): ClassConstructor[] {
    return Array.from(this.providers.keys())
      .map(x => this.resolve(x));
  }

  getProviders(): ClassConstructor[] {
    return Array.from(this.providers.values());
  }

  set(injectable: ClassConstructor) {
    const token = injectable.name;
    this.providers.set(token, injectable);
  }

  provide(providers: ClassConstructor[]) {
    providers.forEach(provider => this.set(provider));
  }

  private resolve(token: string) {
    const provider = this.providers.get(token);

    if (!provider) {
      throw new Error("Missing provider error.");
    }

    return new provider();
  }
}
