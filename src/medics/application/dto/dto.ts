import { MedicModel } from "../../domain/models/Medic.model";
import Result from "../../../shared/application/interface/result.interface"; 
import { DTOabstract } from "../../../shared/application/dto/abstract.dto";

const FilterfielActivedMedic = (medic: MedicModel) => {
  const obj = Object.assign({}, medic)
  delete obj.active;
  return obj;
};

export interface CB<T>{
  cb(result:Result<T>):Result<T>
} 
 
export class MedicDTO extends DTOabstract<MedicModel> {
  callback(result: Result<MedicModel>): Result<MedicModel> {
    const data = result.payload.data 
    if (Array.isArray(data)) { 
      result.payload.data = data.map(FilterfielActivedMedic);
    } else { 
      delete (result.payload.data as MedicModel).active;
    }

    return result;
  }
}
