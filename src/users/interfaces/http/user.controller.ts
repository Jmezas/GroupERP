import { Request, Response } from "express";
import { Trace } from "../../../shared/helprs/trace.helper";
import { Logger } from "../../../shared/helprs/logging.helper";
import { UserApplication } from "../../application/user.application";
import { UserFactory } from "../../../users/domain/models/user.factory";
import RedisBooststrap from "../../../bootstrap/redis.bootstrap";
export class UserController {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findOne = this.findOne.bind(this);
  }
  async list(req: Request, res: Response) {
    Logger.getLogger().info({
      typeElement: "UserController",
      typeAction: "list",
      traceId: Trace.TraceId(true),
      message: "Listing all Users",
      query: JSON.stringify({}),
      datetime: new Date(),
    });
    const users = await this.application.findAll({}, ["roles"], {});
    RedisBooststrap.set(res.locals.cachekey, JSON.stringify(users));
    console.log("prueba");
    return res.json(users);
  }
  async findOne(req: Request, res: Response) {
    Trace.TraceId(true);
    const id = +req.params.id;
    const users = await this.application.findByOne({ id }, ["roles"]);
    res.json(users);
  }
  async add(req: Request, res: Response) {
    Trace.TraceId(true);
    const users = new UserFactory().create(req.body);
    const result = await this.application.add(users);
    RedisBooststrap.clear("user");
    return res.json(result);
  }
  async update(req: Request, res: Response) {
    Trace.TraceId(true);
    const userToInsert = { id: req.params.id, ...req.body };
    const driver = new UserFactory().create(userToInsert);
    const result = await this.application.update(driver, {}, []);
    res.json(result);
  }
  async delete(req: Request, res: Response) {
    Trace.TraceId(true);
    const id = +req.params.id;
    const users = await this.application.delete({ id });
    res.json(users);
  }
}
