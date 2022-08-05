import express, { Application, Request, Response } from "express";
import RoutesUser from "./users/interfaces/http/users.routes";
import RoutesDrivers from "./drivers/interfaces/drivers.routes"; 
import RoutesMedics from "./medics/interfaces/medic.routes";
import { HandlerError } from "./shared/helprs/error.helper";
import RoutesAuth from "./auth/interfaces/auth.routes";
import { Authentication } from "./shared/middleware/authentication.guard";
import { Authorization } from "./shared/middleware/authorization.guard";
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
    this.expressApp.use(
      "/users",
      Authentication.canActivate,
      Authorization.canActivate("ADMINISTRADOR"),
      new RoutesUser().expressRouter
    );
    this.expressApp.use(
      "/drivers",
      Authentication.canActivate,
      Authorization.canActivate("OPERADOR"),
      new RoutesDrivers().expressRouter
    );
    //  this.expressApp.use("/roles",Authentication.canActivate, new RoutesRoles().expressRouter);
    this.expressApp.use(
      "/meidcs",
      Authentication.canActivate,
      new RoutesMedics().expressRouter
    );
    this.expressApp.use("/auth", new RoutesAuth().expressRouter);
  }
  mountHealthCheck(): void {
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("All is Good??!");
    });
    this.expressApp.get("/healthCheck", (req: Request, res: Response) => {
      res.send("All is Good!");
    });
  }
  mountErrors() {
    this.expressApp.use(HandlerError.notFound);
    this.expressApp.use(HandlerError.generic);
  }
}

export default new App().expressApp;
