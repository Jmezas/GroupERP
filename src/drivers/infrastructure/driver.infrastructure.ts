import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.respository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { DriverEntity } from "../domain/models/driver.entity"; 
import Result from "../../shared/application/interface/result.interface";
import {  Repository } from "typeorm";
import DatabaseBootstrap from "../../bootstrap/database.bootstrap";
import { ResponseDto } from "../../shared/application/dto/response.dt";


export class DriverInfrastructure
  extends BaseInfrastructure<DriverModel>
  implements DriverRepository
{
  constructor() {
    super(DriverEntity)
  } 
 async getAll(where: object={}): Promise<Result<DriverModel>> {
    const dataSource=DatabaseBootstrap.dataSource
    const respository:Repository<DriverModel>=dataSource.getRepository(DriverModel)
    const data:DriverModel[]=await respository.find({where})
    return ResponseDto("",data);
  }
  reportByDriver(id: number): Promise<DriverModel[]> {
    throw new Error("Method not implemented.");
  }
}
