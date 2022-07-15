import { DriverModel } from "../../domain/models/driver.model";
import Result from "../../../shared/application/interface/result.interface"; 

const FilterfielActivedDriver = (driver: DriverModel) => ({
  id: driver.id,
  name: driver.name,
  lastname: driver.lastname,
});

export interface CB<T>{
  cb(result:Result<T>):Result<T>
}

export abstract class DTOabstract<T> {
  abstract callback(result: Result<T>): Result<T>;
 //abstract listFunction:CB<T>[];

//  execute(callback:CB<T>):CB<T>{
//   const result=callback()
//   return this.execute(callback.cb(result));
//  }

  mapping(result: Result<T>): Result<T> {
    return this.callback(result)
    //  this.execute(this.listFunction[0])
  } 
}
export class DriverDTO extends DTOabstract<DriverModel> {
  callback(result: Result<DriverModel>): Result<DriverModel> {
    const data = result.payload.data 
    if (Array.isArray(data)) { 
      result.payload.data = data.map(FilterfielActivedDriver);
    } else { 
      delete (result.payload.data as DriverModel).active;
    }

    return result;
  }
}
