import Result from "../../../shared/application/interface/result.interface";
import { BaseRepository } from "../../../shared/domian/repository/base-repository";
import { DriverModel } from "../models/driver.model";
export interface DriverRepository  extends BaseRepository<DriverModel,number>{
    getAll(where :object):Promise<Result<DriverModel>>
    reportByDriver(id: number): Promise<DriverModel[]>;
}