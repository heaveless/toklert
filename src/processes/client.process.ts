import { Process } from "@core/decorators/process";
import { OnSuccess, OnError, On } from "@core/decorators/events";

@Process({
  command: 'python',
  path: 'main'
})
export class ClientProcess {
  constructor() {}

  @OnSuccess('data')
  success(data: any): string {
    return 'aaa';
  }

  @OnError('data')
  error(data: any): string {
    return 'bbbb';
  }

  @On('close')
  close(code: number): string {
    return 'ccc';
  }
}
