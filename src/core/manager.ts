import { spawn } from "child_process";
import { Container } from "./container";
import { Reflector } from "./reflector";
import { ClassConstructor } from "./types";

const concatExt = (command: string, path: string) => {
  switch(command) {
    case 'node': 
      return path.concat('.js');
      break;
    case 'python':
      return path.concat('.py');
      break;
    default:
      return path;
  }
} 

export class Manager {
  constructor(
    private readonly container: Container,
    private readonly reflector: Reflector
  ) {}

  static create(...processes: ClassConstructor[]): Manager {
    const container = new Container();
    container.provide(processes);

    const reflector = new Reflector();
    return new Manager(container, reflector);
  }

  private scan() {
    const processes = this.container.getProviders();
    return processes.map(
      (proc: ClassConstructor) => {
        const meta = this.reflector.getProcessMetadata(proc);
        const type = this.container.get(proc);
        return { type, ...meta };
      }
    );
  }
    
  private resolve() {
    const records = this.scan();
    records.forEach(({ command, path }) => {
      const extProcess = spawn(command, [concatExt(command, path)]);
      
      extProcess.stdout.on('data', (data) => {
        console.log("STDOUT", data.toString())
      })

       extProcess.stderr.on('data', (data) => {
        console.log("STERR", data)
      })

      extProcess.on('close', (code) => {
        console.log("CLOSE", code)
      })

      //console.log(command, path)
    })
  }

  start() {
    try {
      this.resolve()
      console.log("start");
    } catch(e) {}
  }
}
