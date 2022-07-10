import { DataSource, DataSourceOptions } from "typeorm";
import { DatabaseListen } from "./bootstrap";

let source: DataSource;

export default class DatabaseBootstrap extends DatabaseListen {
    static get dataSource(){
        return source;
    };
  listen(): void {
    throw new Error("Method not implemented.");
  }
  initialize(): Promise<DataSource | Error> {
    const parametersConnection = {
      type: "postgres",
      location: "localhost",
      port: 5200,
      user: "user",
      password: "pssql",
      database: "postgres",
      entities: ["src/**/**/*entity.ts"], 
      synchronize: true,
      logging: true,
    } as DataSourceOptions;
    const data = new DataSource(parametersConnection); 
    source = data;
    return data.initialize();
  }
}
