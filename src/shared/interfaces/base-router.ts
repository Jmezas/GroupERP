import express from "express";
export abstract class BaseRouter {
  expressRouter: express.Router;

  constructor(private Controller: any) {
    this.expressRouter = express.Router();
    this.mountRoutesCommons();
    this.mountRoutes();
  }
  abstract mountRoutes(): void;

  mountRoutesCommons(): void {
    this.expressRouter.get("/", this.Controller.list);
    this.expressRouter.post("/", this.Controller.add);
    this.expressRouter.put("/:id", this.Controller.update)
    this.expressRouter.delete("/:id", this.Controller.delete);
  }
}
