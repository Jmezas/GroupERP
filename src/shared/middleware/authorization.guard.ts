import { Request, Response, NextFunction } from "express";
import { IError } from "../helprs/error.helper";

export class Authorization {
  static canActivate(...rolesAllwed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const roles = res.locals.roles;
      if (rolesAllwed.some((role) => roles.includes(role))) {
        next();
      } else {
        const error: IError = new Error("you are not authorized");
        error.status = 401;
        next(error);
      }
    };
  }
  //   static canActivate(req: Request, res: Response, next: NextFunction) {
  //         const roles =res.locals.roles;
  //         if(roles.includes("SuADMINISTRADOR")){
  //             next();
  //         }
  //         else{
  //             const error: IError = new Error("you are not authorized");
  //             error.status = 401;
  //             next(error);
  //         }
  //   }
}
