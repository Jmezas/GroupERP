import express from "express";
import CacheRedis from "../helprs/cache.helper";
import { HandlerError } from "../helprs/error.helper";
export abstract class BaseRouter {
  expressRouter: express.Router;

  constructor(private Controller: any,private tagName:string="") {
    this.expressRouter = express.Router();
    this.mountRoutesCommons();
    this.mountRoutes();
  }
  abstract mountRoutes(): void;

  mountRoutesCommons(): void {
    this.expressRouter.get("/",CacheRedis.handle(this.tagName), HandlerError.catchError(this.Controller.list));
    this.expressRouter.post("/",CacheRedis.handle(this.tagName), HandlerError.catchError(this.Controller.add));
    this.expressRouter.put(
      "/:id",
      CacheRedis.handle(this.tagName),
      HandlerError.catchError(this.Controller.update)
    );
    this.expressRouter.delete(
      "/:id",
      HandlerError.catchError(this.Controller.delete)
    );
    this.expressRouter.get(
      "/:id",
      CacheRedis.handle(this.tagName),
      HandlerError.catchError(this.Controller.findOne)
    );
  }
}
