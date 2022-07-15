import { DataSource, DataSourceOptions } from "typeorm";
import { DatabaseListen } from "./bootstrap";
import yenv from "yenv";

const env = yenv();
let source: DataSource;

export default class DatabaseBootstrap extends DatabaseListen {
  static get dataSource() {
    return source;
  }
  listen(): void {
    throw new Error("Method not implemented.");
  }
  initialize(): Promise<DataSource | Error> {
    const parameterConection = {
      type: "postgres",
      host: env.DATABASE.PG.HOST || "localhost",
      port: env.DATABASE.PG.PORT || 5200,
      username: env.DATABASE.PG.USERNAME || "user",
      password: env.DATABASE.PG.PASSWORD || "pssql",
      database: env.DATABASE.PG.NAME || "postgres",
      entities: env.DATABASE.PG.ENTITIES || ["src/**/**/*.entity.ts"],
      synchronize: env.DATABASE.PG.SYNCHRONIZE || true,
      logging: env.DATABASE.PG.LOGGING || false,
    } as DataSourceOptions;

    const data = new DataSource(parameterConection);
    source = data;
    return data.initialize();
  }
}
