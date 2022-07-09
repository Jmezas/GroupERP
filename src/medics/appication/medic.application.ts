import { MedicModel } from '../domain/models/medic.model';
import { MedicRepository } from '../domain/repositories/medic.respository';

export class MedicApplication {
    constructor(private repositoryMedic: MedicRepository) { }
    async add(Medic: MedicModel) {
        return await this.repositoryMedic.insert(Medic);
    }
    async update(Medic: MedicModel) {
        return await this.repositoryMedic.update(Medic);
    }
    async delete(id: number) {
        return await this.repositoryMedic.delete(id);
    } 
    async findById(id: number) {
        return await this.repositoryMedic.findById(id);
    }
    async find() {
        return await this.repositoryMedic.findAll();
    }
    async reportByMedic(id:number){
        return await this.repositoryMedic.reportByMedic(id);
    }
}
