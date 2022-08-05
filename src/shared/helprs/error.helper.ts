import { NextFunction, Request, Response } from "express";
import { Trace } from "./trace.helper";

export interface IError extends Error {
  status?: number;
  traceId?: string;
}
export class HandlerError {
  static notFound(req: Request, res: Response, next: NextFunction) {
    const error: Partial<IError> = new Error("Not Found");
    error.status = 404;
    next(error);
  }
  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const objError: Partial<IError> = {
      traceId: Trace.TraceId(),
      name: error.name,
      status: error.status || 500,
      message: error.message,
    };
    if (process.env.NODE_ENV !== "production") {
      objError.stack = error.stack;
    }
    res.status(error.status).json(objError);
  }
  static catchError(
    ftn: (req: Request, resp: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, resp: Response, next: NextFunction) => {
      return ftn(req, resp, next).catch((error) => {
        const err: Partial<IError> = new Error("falla intermitente");
        err.message = error.message;
        err.stack = error.stack;
        err.status = 409;
        next(err);
      });
    };
  }
}
