import { AuthApplication } from "../applications/auth.application";
import { AuthInfrastructure } from "../infrastructure/auth.infrastructure";
import { AuthController } from "./auth.controller";
import express from "express";
import { HandlerError } from "../../shared/helprs/error.helper";
import { AuthRepository } from "../domain/repositories/auth.respository";

export default class AuthRouter {
  expressRouter: express.Router;
  controller:AuthController
  constructor() {
    const infrastructure:AuthRepository = new AuthInfrastructure(); 
    const application= new AuthApplication(infrastructure);
    this.controller = new AuthController(application);
    this.expressRouter = express.Router();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.expressRouter.post(
      "/login",
      HandlerError.catchError(this.controller.login)
    );
    this.expressRouter.get("/get-new-acces-token/:refreshToken", HandlerError.catchError(this.controller.getNewAccessToken));
  }
}
