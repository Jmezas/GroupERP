import { BaseApplication } from "../../shared/application/interface/base-application"; 
import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.respository";
import { DriverDTO } from "./dto/dto";

export class DriverApplication extends BaseApplication<DriverModel> {
  constructor(private repositoryDriver: DriverRepository) {
    super(repositoryDriver,new DriverDTO())
  }
 async getAll(){
    return await this.repositoryDriver.getAll({});

 }
  async reportByDriver(id: number) {
    return await this.repositoryDriver.reportByDriver(id);
  }
}
