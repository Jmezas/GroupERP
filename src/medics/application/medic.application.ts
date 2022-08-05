import { BaseApplication } from "../../shared/application/interface/base-application";
import { MedicModel } from "../domain/models/medic.model";
import { MedicRepository } from "../domain/repositories/medic.respository";
import { MedicDTO } from "./dto/dto";

export class MedicApplication extends BaseApplication<MedicModel> {
  constructor(private repositoryMedic: MedicRepository) {
    super(repositoryMedic,new MedicDTO(),"MedicApplication");
  }
  async reportByMedic(id: number) {
    return await this.repositoryMedic.reportByMedic(id);
  }
}
