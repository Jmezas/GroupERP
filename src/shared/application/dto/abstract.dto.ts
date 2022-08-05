import Result from "../interface/result.interface";

export abstract class DTOabstract<T> {
    abstract callback(result: Result<T>): Result<T>; 
    mapping(result: Result<T>): Result<T> {
      return this.callback(result) 
    } 
  }