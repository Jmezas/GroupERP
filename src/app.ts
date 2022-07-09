import express, { Application, Request, Response } from "express";
import RoutersUser from "./users/interfaces/http/users.routes";
import routesDrivers from "./drivers/interfaces/drivers.routes";

class App {
    expressApp: Application;
    constructor() {
        this.expressApp = express(); 
        this.mountHealthCheck();
        this.mountRoutes();
       
    }

    mountRoutes(): void { 
        this.expressApp.use("/users", new RoutersUser().expressRouter);
        this.expressApp.use("/drivers", routesDrivers);
    }
    mountHealthCheck(): void {
        this.expressApp.use("/", (req:Request, res:Response) => {
            res.send("All is Good!")
        })
        this.expressApp.get("/healthCheck", (req:Request, res:Response) => {
            res.send("All is Good!")
        })
    }
}
  
export default new App().expressApp;
