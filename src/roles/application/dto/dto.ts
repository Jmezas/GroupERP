import { RoleModel } from "../../domain/models/Role.model";
import Result from "../../../shared/application/interface/result.interface"; 
import { DTOabstract } from "../../../shared/application/dto/abstract.dto";

const FilterfielActivedRole = (role: RoleModel) => {
  const obj = Object.assign({}, role)
  delete obj.active;
  return obj;
};

export interface CB<T>{
  cb(result:Result<T>):Result<T>
} 
 
export class RoleDTO extends DTOabstract<RoleModel> {
  callback(result: Result<RoleModel>): Result<RoleModel> {
    const data = result.payload.data 
    if (Array.isArray(data)) { 
      result.payload.data = data.map(FilterfielActivedRole);
    } else { 
      delete (result.payload.data as RoleModel).active;
    }

    return result;
  }
}
