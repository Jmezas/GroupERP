import { NextFunction, Request, Response } from "express";
import RedisBooststrap from "../../bootstrap/redis.bootstrap";

export default class CacheRedis {
  static handle(Tagname: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let key = Tagname;
      if (req.query) {
        for (const prop in req.query) {
          key += `_${req.query[prop]}`;
        }
      }
      if (req.params) {
        for (const prop in req.params) {
          key += `_${req.params[prop]}`;
        }
      }
      if (req.body) {
        for (const prop in req.body) {
          key += `_${req.body[prop]}`;
        }
      }
      const results: any = await RedisBooststrap.get(key); 
      if (results) {
        console.log("extrar desde cache");
        res.json(JSON.parse(results));
      } else {
        res.locals.cachekey = key;
        next();
      }
    };
  }
}
