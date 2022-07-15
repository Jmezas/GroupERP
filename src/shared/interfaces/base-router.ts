import express from "express";
import { HandlerError } from "../helprs/error.helper";
export abstract class BaseRouter {
  expressRouter: express.Router;

  constructor(private Controller: any) {
    this.expressRouter = express.Router();
    this.mountRoutesCommons();
    this.mountRoutes();
  }
  abstract mountRoutes(): void;

  mountRoutesCommons(): void {
    this.expressRouter.get("/", HandlerError.catchError(this.Controller.list));
    this.expressRouter.post("/", HandlerError.catchError(this.Controller.add));
    this.expressRouter.put(
      "/:id",
      HandlerError.catchError(this.Controller.update)
    );
    this.expressRouter.delete(
      "/:id",
      HandlerError.catchError(this.Controller.delete)
    );
    this.expressRouter.get(
      "/:id",
      HandlerError.catchError(this.Controller.findOne)
    );
  }
}
