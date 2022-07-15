import { BaseApplication } from '../../shared/application/interface/base-application';
import { MedicModel } from '../domain/models/medic.model';
import { MedicRepository } from '../domain/repositories/medic.respository';

export class MedicApplication extends BaseApplication<MedicModel> {
    constructor(private repositoryMedic: MedicRepository) {
        super(repositoryMedic);
    }
    async reportByMedic(id:number){
        return await this.repositoryMedic.reportByMedic(id);
    }
}
