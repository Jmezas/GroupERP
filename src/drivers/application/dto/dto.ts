import { DriverModel } from "../../domain/models/driver.model";
import Result from "../../../shared/application/interface/result.interface"; 
import { DTOabstract } from "../../../shared/application/dto/abstract.dto";

const FilterfielActivedDriver = (driver: DriverModel) => {
  const obj = Object.assign({}, driver)
  delete obj.active;
  return obj;
};

export interface CB<T>{
  cb(result:Result<T>):Result<T>
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
