
import { BaseRepository } from '../../shared/domian/repository/base-repository';
import { DriverModel } from '../domain/models/driver.model';
import { DriverRepository } from '../domain/repositories/driver.respository';

export class DriverApplication {
    constructor(private repositoryDriver: DriverRepository) { }
    async add(Driver: DriverModel) {
        return await this.repositoryDriver.insert(Driver);
    }
    async update(Driver: DriverModel) {
        return await this.repositoryDriver.update(Driver);
    }
    async delete(id: number) {
        return await this.repositoryDriver.delete(id);
    } 
    async findById(id: number) {
        return await this.repositoryDriver.findById(id);
    }
    async find() {
        return await this.repositoryDriver.findAll();
    }
    async reportByDriver(id:number){
        return await this.repositoryDriver.reportByDriver(id);
    }
}
