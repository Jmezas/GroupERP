import { BaseApplication } from "../../shared/application/interface/base-application";
import { RoleModel } from "../domain/models/Role.model";
import { RoleRepository } from "../domain/repositories/role.repository";
import { RoleDTO } from "./dto/dto";

export class RoleApplication extends BaseApplication<RoleModel> {
  constructor(private repositoryRole: RoleRepository) {
    super(repositoryRole,new RoleDTO(),"RoleApplication");
  } 
}
