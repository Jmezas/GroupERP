import express, { Application, Request, Response } from "express";
import RoutesUser from "./users/interfaces/http/users.routes";
import RoutesDrivers from "./drivers/interfaces/drivers.routes";  
import { HandlerError } from "./shared/helprs/error.helper";
class App {
  expressApp: Application;
  constructor() {
    this.expressApp = express(); 
    this.mountMiddelwares();
    this.mountHealthCheck();
    this.mountRoutes();
    this.mountErrors();
  } 
  
  mountMiddelwares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true })); //req.body 
  }

  mountRoutes(): void {
   // this.expressApp.use("/users", new RoutesUser().expressRouter);
    this.expressApp.use("/drivers", new RoutesDrivers().expressRouter);
  }
  mountHealthCheck(): void {
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("All is Good??!");
    });
    this.expressApp.get("/healthCheck", (req: Request, res: Response) => {
      res.send("All is Good!");
    });
  }
  mountErrors(){
    this.expressApp.use(HandlerError.notFound);
    this.expressApp.use(HandlerError.generic);
  }
}

export default new App().expressApp;
