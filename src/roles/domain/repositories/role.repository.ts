import { BaseRepository } from "../../../shared/domain/repository/base-repository";
import { RoleEntity } from "../models/role.entity";
import { RoleModel } from "../models/role.model";
export interface RoleRepository extends BaseRepository<RoleModel,string> {
  findByIds(ids:number[]):Promise<RoleEntity[]>; 
}
