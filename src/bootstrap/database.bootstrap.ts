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
    const parameterConection ={
      type: "postgres",
      host: process.env.DATABASE_PG_HOST|| "localhost",
      port: process.env.DATABASE_PG_PORT || 5200,
      username: process.env.DATABASE_PG_USERNAME|| "user",
      password:process.env.DATABASE_PG_PASSWORD ||  "pssql",
      database:process.env.DATABASE_PG_NAME||  "postgres",
      entities: [process.env.DATABASE_PG_ENTITIES|| "src/**/**/*entity.ts"], 
      synchronize: process.env.DATABASE_PG_SYNCHRONIZE|| true,
      logging:process.env.DATABASE_PG_LOGGING|| false,
    }as DataSourceOptions 

    const data = new DataSource(parameterConection); 
    source = data;
    return data.initialize();
  }
}