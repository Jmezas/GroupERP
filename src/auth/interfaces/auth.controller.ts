import { Logger } from "../../shared/helprs/logging.helper";
import { Trace } from "../../shared/helprs/trace.helper";
import { AuthApplication } from "../applications/auth.application";
import { Request, Response } from "express";

export class AuthController {
  constructor(private application: AuthApplication) {
    this.login = this.login.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
  }
  async login(req: Request, res: Response) { 
    const { email, password } = req.body;
    Logger.getLogger().info({
      typeElement: "AuthController", 
      typeAction: "login",
      traceId: Trace.TraceId(true),
      message: "login",
      query: JSON.stringify({}),
      datetime: new Date(),
    });
    const result = await this.application.login({email,password});
    return res.json(result);
  }
  async getNewAccessToken (req: Request, res: Response) {
    const { refreshToken } = req.params;
    Logger.getLogger().info({
      typeElement: "AuthController", 
      typeAction: "getNewAccessToken",
      traceId: Trace.TraceId(true),
      message: "GEt new access token",
      query: JSON.stringify({}),
      datetime: new Date(),
    });
    const result=await this.application.getNewAccessToken(refreshToken);
    res.json(result);
  }
}
