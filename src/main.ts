/*import Table from "cli-table3";

const bootstrap = () => {
  const table = new Table({
    head: ['MANAGER', 'SERVER', 'CLIENT'],
    colWidths: [30, 30, 30]
  });


  console.clear(); e
  table.push(['aaaa', 'bbbb', 'cccc']);
  console.log(table.toString());
}
*/

import "reflect-metadata";
import { Manager } from "./core/manager";
//import { ClientProcess } from "./processes/client.process";
import { ServerProcess } from "./processes/server.process";

const bootstrap = () => {
  const app = Manager.create(
    //ClientProcess,
    ServerProcess
  );

  app.start();
}

bootstrap();
