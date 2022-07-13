import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import { DataSource } from "typeorm";

const serverBootstrap = new ServerBootstrap();
const databaseBootstrap = new DatabaseBootstrap();

export interface Options {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;
  logging: boolean;
}

(async () => {
  try {
    const task = [serverBootstrap.initialize(), databaseBootstrap.initialize()];
    const taskComplete = await Promise.all(task);

    const options: Options = Object.assign(
      {},
      (taskComplete[1] as DataSource).options
    ) as Options;

    // await serverBootstrap.initialize();
    // await databaseBootstrap.initialize();
    console.log("Conneted to database=>", 
    options.database,
    options.host,
    options.port);
  } catch (err) {
    console.log("error", err);
  }
})();
