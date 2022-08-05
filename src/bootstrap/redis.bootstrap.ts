import IORedis from 'ioredis';
import yenv from "yenv";

const env = yenv();
let client: any;
export default class RedisBooststrap {
  private client: IORedis.Redis; 
  initialize(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const connectioParamets = {
        host: env.DATABASE.REDIS.HOST,
        port: env.DATABASE.REDIS.PORT,
        password: env.DATABASE.REDIS.PASS,
        maxRetriesPerRequiest: 5,
      };
      this.client = new IORedis(connectioParamets);
      this.client
        .on("Connect", () => {
          console.log("Redis connected");
          resolve(true);
        })
        .on("error", (error: Error) => {
          console.log("Redis error", error);
          reject(error);
        });
      client = this.client;
    });
  }
  getConnection() {
    return this.client;
  }
  static async get(key: string) {
    return await client.get(key);
  }
  static async set(key: string, value: string) {
    return await client.set(key, value, "EX", 24 * 60 * 60 * 1000);
  }
  static async clear(prefix: string = "") {
    const keys = await client.keys(`${prefix}*`);
    const pipeline = client.pipeline();
    keys.forEach((key: string) => {
      pipeline.del(key);
    });
    return pipeline.exec();
  }
}
